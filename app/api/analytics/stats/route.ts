import { NextRequest, NextResponse } from 'next/server';
import { loadAnalyticsFromFile, saveAnalyticsToFile, convertToStorageFormat, convertFromStorageFormat, loadContactClicksFromFile } from '@/lib/analytics-storage';
import { promises as fs } from 'fs';
import path from 'path';

// In-memory storage for analytics (persists during server runtime)
interface VisitorData {
  id: string;
  visitorId: string;
  ip: string;
  device: string;
  browser: string;
  browserVersion: string;
  os: string;
  screenWidth: number;
  screenHeight: number;
  language: string;
  referrer: string;
  firstVisit: Date;
  lastVisit: Date;
  totalVisits: number;
  hasChatted: boolean;
}

interface PageViewData {
  id: string;
  visitorId: string;
  path: string;
  timestamp: Date;
}

interface SessionData {
  id: string;
  visitorId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  isActive: boolean;
}

interface ChatSessionData {
  visitorId: string;
  startTime: Date;
}

interface InMemoryAnalytics {
  visitors: Map<string, VisitorData>;
  pageViews: PageViewData[];
  sessions: Map<string, SessionData>;
  chatSessions: ChatSessionData[];
}

// Global in-memory storage
declare global {
  var analyticsData: InMemoryAnalytics | undefined;
  var analyticsLoaded: boolean | undefined;
}

export async function getAnalyticsData(): Promise<InMemoryAnalytics> {
  if (!global.analyticsData) {
    global.analyticsData = {
      visitors: new Map(),
      pageViews: [],
      sessions: new Map(),
      chatSessions: []
    };
    
    // Try to load from file on first access
    if (!global.analyticsLoaded) {
      global.analyticsLoaded = true;
      const savedData = await loadAnalyticsFromFile();
      if (savedData) {
        const converted = convertFromStorageFormat(savedData);
        global.analyticsData.visitors = converted.visitors;
        global.analyticsData.pageViews = converted.pageViews;
        global.analyticsData.sessions = converted.sessions;
        global.analyticsData.chatSessions = converted.chatSessions;
        console.log('Analytics data loaded from file');
      }
    }
  }
  return global.analyticsData;
}

// Save data periodically
let saveTimeout: NodeJS.Timeout | null = null;
export function scheduleSave() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    if (global.analyticsData) {
      const storageData = convertToStorageFormat(global.analyticsData);
      await saveAnalyticsToFile(storageData);
      console.log('Analytics data saved to file');
    }
  }, 5000); // Save 5 seconds after last change
}

function getDateRange(filter: string, startDate?: string, endDate?: string): { start: Date; end: Date } {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  let start = new Date();
  start.setHours(0, 0, 0, 0);

  switch (filter) {
    case 'today':
      // start is already today at 00:00
      break;
    case '7days':
      start.setDate(start.getDate() - 7);
      break;
    case '30days':
      start.setDate(start.getDate() - 30);
      break;
    case 'custom':
      if (startDate && endDate) {
        start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const customEnd = new Date(endDate);
        customEnd.setHours(23, 59, 59, 999);
        return { start, end: customEnd };
      }
      break;
    case 'all':
    default:
      start = new Date(0); // Beginning of time
      break;
  }

  return { start, end };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all';
    const customStartDate = searchParams.get('startDate') || undefined;
    const customEndDate = searchParams.get('endDate') || undefined;

    const { start: filterStart, end: filterEnd } = getDateRange(filter, customStartDate, customEndDate);

    const data = await getAnalyticsData();
    
    // Load chatbot sessions for user info and stats
    interface ChatSessionInfo {
      visitorId: string;
      userName: string | null;
      userPhone: string | null;
      hasBooking: boolean;
      intent: string | null;
      city: string | null;
      country: string | null;
    }
    let chatSessionUserInfo: Map<string, ChatSessionInfo> = new Map();
    let chatbotSessionsData: any[] = [];
    try {
      const chatbotPath = path.join(process.cwd(), 'data', 'chatbot-sessions.json');
      const chatbotData = await fs.readFile(chatbotPath, 'utf-8');
      const parsed = JSON.parse(chatbotData);
      const sessions = parsed.sessions || {};
      
      // Convert sessions object to array for counting
      chatbotSessionsData = Object.values(sessions).map((session: any) => ({
        visitorId: session.visitorId,
        startTime: new Date(session.startTime)
      }));
      
      // Randevu anahtar kelimeleri (Türkçe, Fransızca, İngilizce)
      const bookingKeywords = [
        'randevu', 'rendez-vous', 'rdv', 'appointment', 'booking', 'réservation',
        'randevunuz', 'randevusu', 'tarihi', 'saati', 'onaylandı', 'confirmé',
        'confirmed', 'planifié', 'scheduled', 'planlanmış', 'alındı'
      ];
      
      // Extract user info from each session
      Object.values(sessions).forEach((session: any) => {
        if (session.visitorId) {
          const existing = chatSessionUserInfo.get(session.visitorId);
          
          // Randevu alınıp alınmadığını kontrol et
          let hasBooking = existing?.hasBooking || false;
          if (!hasBooking && session.messages) {
            // Bot mesajlarında randevu onayı ara
            const botMessages = session.messages
              .filter((m: any) => m.sender === 'bot')
              .map((m: any) => m.message.toLowerCase());
            
            // Ayrıca intent kontrolü
            if (session.intent === 'randevu') {
              // Randevu intent'i varsa ve bot onay benzeri mesaj göndermiş mi kontrol et
              hasBooking = botMessages.some((msg: string) => 
                bookingKeywords.some(keyword => msg.includes(keyword)) &&
                (msg.includes('onay') || msg.includes('confirm') || msg.includes('alın') || 
                 msg.includes('tamamla') || msg.includes('planla') || msg.includes('kaydedil'))
              );
            }
          }
          
          // Location bilgisi
          const city = session.location?.city || existing?.city || null;
          const country = session.location?.country || existing?.country || null;
          
          // Intent bilgisi (son session'dan al veya mevcut olanı koru)
          const intent = session.intent || existing?.intent || null;
          
          chatSessionUserInfo.set(session.visitorId, {
            visitorId: session.visitorId,
            userName: session.userName || existing?.userName || null,
            userPhone: session.userPhone || existing?.userPhone || null,
            hasBooking,
            intent,
            city,
            country
          });
        }
      });
    } catch (e) {
      // No chatbot sessions file
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Filter visitors by date range
    const allVisitors = Array.from(data.visitors.values());
    const filteredVisitors = filter === 'all' 
      ? allVisitors 
      : allVisitors.filter(v => {
          const visitDate = new Date(v.lastVisit);
          return visitDate >= filterStart && visitDate <= filterEnd;
        });

    const sessions = Array.from(data.sessions.values());
    const filteredSessions = filter === 'all'
      ? sessions
      : sessions.filter(s => {
          const sessionDate = new Date(s.startTime);
          return sessionDate >= filterStart && sessionDate <= filterEnd;
        });

    const filteredPageViews = filter === 'all'
      ? data.pageViews
      : data.pageViews.filter(p => {
          const viewDate = new Date(p.timestamp);
          return viewDate >= filterStart && viewDate <= filterEnd;
        });

    const filteredChatSessions = filter === 'all'
      ? data.chatSessions
      : data.chatSessions.filter(c => {
          const chatDate = new Date(c.startTime);
          return chatDate >= filterStart && chatDate <= filterEnd;
        });

    // Total unique visitors (filtered)
    const totalUniqueVisitors = filteredVisitors.length;

    // Today's unique visitors
    const todayVisitors = allVisitors.filter(v => new Date(v.lastVisit) >= today).length;
    const yesterdayVisitors = allVisitors.filter(v => {
      const visit = new Date(v.lastVisit);
      return visit >= yesterday && visit < today;
    }).length;

    // Total page views (filtered)
    const totalPageViews = filteredPageViews.length;
    const todayPageViews = data.pageViews.filter(p => new Date(p.timestamp) >= today).length;

    // Total sessions (filtered)
    const totalSessions = filteredSessions.length;

    // Active sessions - Count sessions with recent activity (last 30 minutes)
    // Check both session start time and recent page views
    const thirtyMinutesAgo = new Date();
    thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);
    
    const recentPageViewVisitors = new Set(
      data.pageViews
        .filter(p => new Date(p.timestamp) >= thirtyMinutesAgo)
        .map(p => p.visitorId)
    );
    
    const activeSessions = Array.from(recentPageViewVisitors).length;

    // Average session duration (filtered)
    const sessionsWithDuration = filteredSessions.filter(s => s.duration);
    const avgSessionDuration = sessionsWithDuration.length > 0
      ? Math.round(sessionsWithDuration.reduce((acc, s) => acc + (s.duration || 0), 0) / sessionsWithDuration.length)
      : 0;

    // Chatbot users - Use loaded chatbot sessions data instead of in-memory
    const chatbotUsersToday = chatbotSessionsData.filter(c => c.startTime >= today).length;
    const totalChatbotUsers = filter === 'all'
      ? chatbotSessionsData.length
      : chatbotSessionsData.filter(c => c.startTime >= filterStart && c.startTime <= filterEnd).length;

    // Device breakdown (filtered)
    const deviceBreakdown = {
      mobile: 0,
      desktop: 0,
      tablet: 0,
      unknown: 0
    };

    filteredVisitors.forEach(v => {
      const device = (v.device || 'unknown').toLowerCase();
      if (device in deviceBreakdown) {
        deviceBreakdown[device as keyof typeof deviceBreakdown]++;
      } else {
        deviceBreakdown.unknown++;
      }
    });

    // Browser breakdown (filtered)
    const browserBreakdown: Record<string, number> = {};
    filteredVisitors.forEach(v => {
      const browser = v.browser || 'Unknown';
      browserBreakdown[browser] = (browserBreakdown[browser] || 0) + 1;
    });

    // Top pages (filtered)
    const pageCount: Record<string, number> = {};
    filteredPageViews.forEach(p => {
      pageCount[p.path] = (pageCount[p.path] || 0) + 1;
    });
    const topPages = Object.entries(pageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, views]) => ({ path, views }));

    // Visitor change percentage
    const visitorChange = yesterdayVisitors > 0 
      ? Math.round(((todayVisitors - yesterdayVisitors) / yesterdayVisitors) * 100)
      : todayVisitors > 0 ? 100 : 0;

    // Recent visitors (filtered)
    const recentVisitors = filteredVisitors
      .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
      .slice(0, 20)
      .map(v => {
        const userInfo = chatSessionUserInfo.get(v.visitorId);
        return {
          id: v.id,
          visitorId: v.visitorId,
          ip: v.ip,
          device: v.device,
          browser: v.browser,
          os: v.os,
          country: userInfo?.country || null as string | null,
          city: userInfo?.city || null as string | null,
          firstVisit: v.firstVisit,
          lastVisit: v.lastVisit,
          totalVisits: v.totalVisits,
          recentPages: filteredPageViews
            .filter(p => p.visitorId === v.visitorId)
            .slice(-5)
            .map(p => p.path),
          hasChatted: v.hasChatted,
          userName: userInfo?.userName || null,
          userPhone: userInfo?.userPhone || null,
          hasBooking: userInfo?.hasBooking || false
        };
      });

    // Country stats (empty for now)
    const countryStats: { country: string; count: number }[] = [];

    // Daily trend data (last 30 days)
    const dailyTrend: { date: string; visitors: number; pageViews: number; chatbotUsers: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const dayVisitors = allVisitors.filter(v => {
        const vDate = new Date(v.firstVisit);
        return vDate >= date && vDate < nextDate;
      }).length;
      
      const dayPageViews = data.pageViews.filter(p => {
        const pDate = new Date(p.timestamp);
        return pDate >= date && pDate < nextDate;
      }).length;
      
      const dayChatbotUsers = chatbotSessionsData.filter(c => {
        return c.startTime >= date && c.startTime < nextDate;
      }).length;
      
      dailyTrend.push({
        date: date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
        visitors: dayVisitors,
        pageViews: dayPageViews,
        chatbotUsers: dayChatbotUsers
      });
    }

    // Group visitors by day for detailed listing
    interface VisitorByDay {
      id: string;
      visitorId: string;
      ip: string;
      device: string;
      browser: string;
      os: string;
      country: string | null;
      city: string | null;
      firstVisit: Date;
      lastVisit: Date;
      totalVisits: number;
      recentPages: string[];
      hasChatted: boolean;
      userName: string | null;
      userPhone: string | null;
      hasBooking: boolean;
      intent: string | null;
    }
    const visitorsByDay: Record<string, VisitorByDay[]> = {};
    const allVisitorsSorted = filteredVisitors
      .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime());
    
    allVisitorsSorted.forEach(v => {
      const dateKey = new Date(v.lastVisit).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      
      if (!visitorsByDay[dateKey]) {
        visitorsByDay[dateKey] = [];
      }
      
      // Get user info from chatbot sessions
      const userInfo = chatSessionUserInfo.get(v.visitorId);
      
      visitorsByDay[dateKey].push({
        id: v.id,
        visitorId: v.visitorId,
        ip: v.ip,
        device: v.device,
        browser: v.browser,
        os: v.os,
        country: userInfo?.country || null,
        city: userInfo?.city || null,
        firstVisit: v.firstVisit,
        lastVisit: v.lastVisit,
        totalVisits: v.totalVisits,
        recentPages: filteredPageViews
          .filter(p => p.visitorId === v.visitorId)
          .slice(-5)
          .map(p => p.path),
        hasChatted: v.hasChatted,
        userName: userInfo?.userName || null,
        userPhone: userInfo?.userPhone || null,
        hasBooking: userInfo?.hasBooking || false,
        intent: userInfo?.intent || null
      });
    });

    // Contact clicks stats - load from file if not in memory
    let contactClicks = global.contactClicks || [];
    if (contactClicks.length === 0) {
      const savedClicks = await loadContactClicksFromFile();
      if (savedClicks.length > 0) {
        contactClicks = savedClicks.map(c => ({
          ...c,
          timestamp: new Date(c.timestamp)
        }));
        global.contactClicks = contactClicks;
        console.log(`Loaded ${contactClicks.length} contact clicks from file for stats`);
      }
    }
    const contactClickStats = {
      email: contactClicks.filter((c: any) => c.contactType === 'email').length,
      phone: contactClicks.filter((c: any) => c.contactType === 'phone').length,
      whatsapp: contactClicks.filter((c: any) => c.contactType === 'whatsapp').length,
      total: contactClicks.length,
      todayEmail: contactClicks.filter((c: any) => c.contactType === 'email' && new Date(c.timestamp) >= today).length,
      todayPhone: contactClicks.filter((c: any) => c.contactType === 'phone' && new Date(c.timestamp) >= today).length,
      todayWhatsapp: contactClicks.filter((c: any) => c.contactType === 'whatsapp' && new Date(c.timestamp) >= today).length,
    };

    return NextResponse.json({
      overview: {
        totalUniqueVisitors,
        todayVisitors,
        yesterdayVisitors,
        visitorChange,
        totalPageViews,
        todayPageViews,
        totalSessions,
        activeSessions,
        avgSessionDuration,
        chatbotUsersToday,
        totalChatbotUsers,
      },
      deviceBreakdown,
      browserBreakdown,
      topPages,
      last7DaysStats: [],
      recentVisitors,
      visitorsByDay,
      countryStats,
      dailyTrend,
      contactClickStats,
      filter: {
        type: filter,
        startDate: filterStart.toISOString(),
        endDate: filterEnd.toISOString()
      }
    });

  } catch (error) {
    console.error('Analytics stats error:', error);
    return NextResponse.json({ 
      overview: {
        totalUniqueVisitors: 0,
        todayVisitors: 0,
        yesterdayVisitors: 0,
        visitorChange: 0,
        totalPageViews: 0,
        todayPageViews: 0,
        totalSessions: 0,
        activeSessions: 0,
        avgSessionDuration: 0,
        chatbotUsersToday: 0,
        totalChatbotUsers: 0,
      },
      deviceBreakdown: { mobile: 0, desktop: 0, tablet: 0, unknown: 0 },
      browserBreakdown: {},
      topPages: [],
      last7DaysStats: [],
      recentVisitors: [],
      countryStats: [],
      dailyTrend: [],
      contactClickStats: { email: 0, phone: 0, whatsapp: 0, total: 0, todayEmail: 0, todayPhone: 0, todayWhatsapp: 0 }
    });
  }
}
