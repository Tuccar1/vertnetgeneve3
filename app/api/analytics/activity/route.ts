import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData } from '../stats/route';

interface Activity {
  id: string;
  type: 'visit' | 'page_view' | 'chat' | 'return_visit';
  description: string;
  timestamp: Date;
  details?: {
    path?: string;
    browser?: string;
    device?: string;
    country?: string;
    city?: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const analyticsData = await getAnalyticsData();
    const visitors = Array.from(analyticsData.visitors.values());
    const pageViews = analyticsData.pageViews;
    
    const activities: Activity[] = [];
    
    // Add recent page views as activities
    const recentPageViews = [...pageViews]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 20);

    recentPageViews.forEach(pv => {
      const visitor = visitors.find(v => v.visitorId === pv.visitorId);
      activities.push({
        id: pv.id,
        type: 'page_view',
        description: `Sayfa görüntüleme: ${pv.path}`,
        timestamp: new Date(pv.timestamp),
        details: {
          path: pv.path,
          browser: visitor?.browser,
          device: visitor?.device
        }
      });
    });

    // Add recent visits
    const recentVisitors = [...visitors]
      .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
      .slice(0, 10);

    recentVisitors.forEach(v => {
      const isReturn = v.totalVisits > 1;
      activities.push({
        id: `visit-${v.id}`,
        type: isReturn ? 'return_visit' : 'visit',
        description: isReturn 
          ? `Geri dönen ziyaretçi (${v.totalVisits}. ziyaret)`
          : 'Yeni ziyaretçi',
        timestamp: new Date(v.lastVisit),
        details: {
          browser: v.browser,
          device: v.device
        }
      });
    });

    // Sort all activities by timestamp
    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Format for response
    const formattedActivities = activities.slice(0, 20).map(a => ({
      ...a,
      timestamp: a.timestamp.toISOString(),
      timeAgo: getTimeAgo(a.timestamp)
    }));

    return NextResponse.json({
      activities: formattedActivities,
      total: activities.length
    });

  } catch (error) {
    console.error('Activity API error:', error);
    return NextResponse.json({
      activities: [],
      total: 0
    });
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Az önce';
  if (diffMin < 60) return `${diffMin} dakika önce`;
  if (diffHour < 24) return `${diffHour} saat önce`;
  if (diffDay < 7) return `${diffDay} gün önce`;
  
  return date.toLocaleDateString('tr-TR');
}
