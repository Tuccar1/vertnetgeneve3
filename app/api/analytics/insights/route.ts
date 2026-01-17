import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData } from '@/lib/analytics-memory';

export async function GET(request: NextRequest) {
  try {
    const analyticsData = await getAnalyticsData();
    const visitors = Array.from(analyticsData.visitors.values());
    const pageViews = analyticsData.pageViews;
    
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    // Today's visitors
    const todayVisitors = visitors.filter(v => 
      new Date(v.lastVisit) >= today
    ).length;

    // Yesterday's visitors for comparison
    const yesterdayVisitors = visitors.filter(v => {
      const visitDate = new Date(v.lastVisit);
      return visitDate >= yesterday && visitDate < today;
    }).length;

    // Calculate growth
    const visitorGrowth = yesterdayVisitors > 0 
      ? Math.round(((todayVisitors - yesterdayVisitors) / yesterdayVisitors) * 100)
      : todayVisitors > 0 ? 100 : 0;

    // Most visited pages
    const pageViewCounts: Record<string, number> = {};
    pageViews.forEach(pv => {
      pageViewCounts[pv.path] = (pageViewCounts[pv.path] || 0) + 1;
    });

    const topPages = Object.entries(pageViewCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([path, count]) => ({ path, count }));

    // Browser distribution
    const browserCounts: Record<string, number> = {};
    visitors.forEach(v => {
      browserCounts[v.browser] = (browserCounts[v.browser] || 0) + 1;
    });

    const browsers = Object.entries(browserCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Device distribution
    const deviceCounts: Record<string, number> = {};
    visitors.forEach(v => {
      deviceCounts[v.device] = (deviceCounts[v.device] || 0) + 1;
    });

    const devices = Object.entries(deviceCounts)
      .map(([name, count]) => ({ name, count }));

    // Peak hours
    const hourCounts: Record<number, number> = {};
    pageViews.forEach(pv => {
      const hour = new Date(pv.timestamp).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const peakHour = Object.entries(hourCounts)
      .sort((a, b) => b[1] - a[1])[0];

    // Funnel data
    const totalVisitors = visitors.length;
    const chatbotUsers = visitors.filter(v => v.hasChatted).length;
    const contactPageViews = pageViews.filter(pv => pv.path.includes('/contact')).length;
    const conversionRate = totalVisitors > 0 
      ? Math.round((chatbotUsers / totalVisitors) * 100) 
      : 0;

    return NextResponse.json({
      todayVisitors,
      visitorGrowth,
      topPages,
      browsers,
      devices,
      peakHour: peakHour ? { hour: parseInt(peakHour[0]), count: peakHour[1] } : null,
      funnel: {
        visitors: totalVisitors,
        chatbotUsers: chatbotUsers,
        contactAttempts: contactPageViews,
        conversionRate: conversionRate
      },
      insights: [
        {
          type: 'info',
          title: 'Bugünkü Ziyaretçiler',
          description: `Bugün ${todayVisitors} ziyaretçi sitenizi ziyaret etti.`,
          value: todayVisitors
        },
        {
          type: visitorGrowth >= 0 ? 'success' : 'warning',
          title: 'Ziyaretçi Değişimi',
          description: `Dünle karşılaştırıldığında ${visitorGrowth >= 0 ? '+' : ''}${visitorGrowth}% değişim.`,
          value: visitorGrowth
        },
        {
          type: 'info',
          title: 'En Popüler Sayfa',
          description: topPages[0] ? `${topPages[0].path} - ${topPages[0].count} görüntüleme` : 'Henüz veri yok',
          value: topPages[0]?.count || 0
        }
      ]
    });

  } catch (error) {
    console.error('Insights API error:', error);
    return NextResponse.json({
      todayVisitors: 0,
      visitorGrowth: 0,
      topPages: [],
      browsers: [],
      devices: [],
      peakHour: null,
      funnel: {
        visitors: 0,
        chatbotUsers: 0,
        contactAttempts: 0,
        conversionRate: 0
      },
      insights: []
    });
  }
}
