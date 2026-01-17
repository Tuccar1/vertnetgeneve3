import { prisma } from './prisma';

// Visitor işlemleri
export async function getOrCreateVisitor(visitorId: string, data: {
  ip?: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  browserVersion?: string;
  os?: string;
  screenWidth?: number;
  screenHeight?: number;
  language?: string;
  referrer?: string;
}) {
  const existing = await prisma.visitor.findUnique({
    where: { visitorId }
  });

  if (existing) {
    return prisma.visitor.update({
      where: { visitorId },
      data: {
        lastVisit: new Date(),
        totalVisits: { increment: 1 },
        ...data
      }
    });
  }

  return prisma.visitor.create({
    data: {
      visitorId,
      ...data
    }
  });
}

// Session işlemleri
export async function createSession(visitorId: string) {
  // Önce visitor var mı kontrol et
  const visitor = await prisma.visitor.findUnique({
    where: { visitorId }
  });

  if (!visitor) {
    throw new Error('Visitor not found');
  }

  // Aktif session varsa kapat
  await prisma.session.updateMany({
    where: {
      visitorId: visitor.id,
      isActive: true
    },
    data: {
      isActive: false,
      endTime: new Date()
    }
  });

  return prisma.session.create({
    data: {
      visitorId: visitor.id,
      isActive: true
    }
  });
}

export async function endSession(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId }
  });

  if (session) {
    const duration = Math.floor((Date.now() - session.startTime.getTime()) / 1000);
    return prisma.session.update({
      where: { id: sessionId },
      data: {
        isActive: false,
        endTime: new Date(),
        duration
      }
    });
  }
}

// PageView işlemleri
export async function trackPageView(visitorId: string, data: {
  path: string;
  title?: string;
  referrer?: string;
  sessionId?: string;
}) {
  const visitor = await prisma.visitor.findUnique({
    where: { visitorId }
  });

  if (!visitor) return null;

  return prisma.pageView.create({
    data: {
      visitorId: visitor.id,
      sessionId: data.sessionId,
      path: data.path,
      title: data.title,
      referrer: data.referrer
    }
  });
}

// ChatSession işlemleri
export async function createChatSession(visitorId: string, userName?: string, userPhone?: string) {
  const visitor = await prisma.visitor.findUnique({
    where: { visitorId }
  });

  if (!visitor) return null;

  return prisma.chatSession.create({
    data: {
      visitorId: visitor.id,
      userName,
      userPhone
    }
  });
}

export async function addChatMessage(chatSessionId: string, sender: string, message: string) {
  await prisma.chatSession.update({
    where: { id: chatSessionId },
    data: {
      messageCount: { increment: 1 }
    }
  });

  return prisma.chatMessage.create({
    data: {
      chatSessionId,
      sender,
      message
    }
  });
}

export async function updateChatSessionUser(chatSessionId: string, userName?: string, userPhone?: string) {
  return prisma.chatSession.update({
    where: { id: chatSessionId },
    data: {
      userName,
      userPhone
    }
  });
}

// İstatistik sorgulama
export async function getAnalyticsStats(filter: string = 'all') {
  const now = new Date();
  let startDate: Date | undefined;

  switch (filter) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case '7days':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30days':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = undefined;
  }

  const whereClause = startDate ? { firstVisit: { gte: startDate } } : {};
  const pageViewWhere = startDate ? { timestamp: { gte: startDate } } : {};
  const sessionWhere = startDate ? { startTime: { gte: startDate } } : {};
  const chatWhere = startDate ? { startTime: { gte: startDate } } : {};

  // Toplam benzersiz ziyaretçi
  const totalUniqueVisitors = await prisma.visitor.count({ where: whereClause });

  // Bugünkü ziyaretçiler
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayVisitors = await prisma.visitor.count({
    where: { lastVisit: { gte: todayStart } }
  });

  // Dünkü ziyaretçiler (karşılaştırma için)
  const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);
  const yesterdayVisitors = await prisma.visitor.count({
    where: {
      lastVisit: { gte: yesterdayStart, lt: todayStart }
    }
  });

  // Değişim yüzdesi
  const visitorChange = yesterdayVisitors > 0
    ? Math.round(((todayVisitors - yesterdayVisitors) / yesterdayVisitors) * 100)
    : todayVisitors > 0 ? 100 : 0;

  // Aktif oturumlar (son 30 dakika)
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
  const activeSessions = await prisma.session.count({
    where: {
      isActive: true,
      startTime: { gte: thirtyMinutesAgo }
    }
  });

  // Chatbot kullanımı
  const totalChatbotUsers = await prisma.chatSession.count({ where: chatWhere });
  const chatbotUsersToday = await prisma.chatSession.count({
    where: { startTime: { gte: todayStart } }
  });

  // Top sayfalar
  const topPagesRaw = await prisma.pageView.groupBy({
    by: ['path'],
    where: pageViewWhere,
    _count: { path: true },
    orderBy: { _count: { path: 'desc' } },
    take: 10
  });

  const topPages = topPagesRaw.map(p => ({
    page: p.path,
    views: p._count.path
  }));

  // Cihaz istatistikleri
  const deviceStatsRaw = await prisma.visitor.groupBy({
    by: ['device'],
    where: whereClause,
    _count: { device: true }
  });

  const deviceStats = deviceStatsRaw.reduce((acc, d) => {
    if (d.device) acc[d.device] = d._count.device;
    return acc;
  }, {} as Record<string, number>);

  // Tarayıcı istatistikleri
  const browserStatsRaw = await prisma.visitor.groupBy({
    by: ['browser'],
    where: whereClause,
    _count: { browser: true }
  });

  const browserStats = browserStatsRaw.reduce((acc, b) => {
    if (b.browser) acc[b.browser] = b._count.browser;
    return acc;
  }, {} as Record<string, number>);

  // Ülke istatistikleri
  const countryStatsRaw = await prisma.visitor.groupBy({
    by: ['country'],
    where: whereClause,
    _count: { country: true },
    orderBy: { _count: { country: 'desc' } },
    take: 10
  });

  const countryStats = countryStatsRaw.map(c => ({
    country: c.country || 'Unknown',
    visitors: c._count.country
  }));

  // Günlük trend (son 30 gün)
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const dailyTrendRaw = await prisma.visitor.groupBy({
    by: ['lastVisit'],
    where: { lastVisit: { gte: thirtyDaysAgo } },
    _count: true
  });

  // Günlere göre grupla
  const dailyMap = new Map<string, { visitors: number; chatbotUsers: number }>();
  
  // Son 30 günü doldur
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    dailyMap.set(dateStr, { visitors: 0, chatbotUsers: 0 });
  }

  // Ziyaretçileri ekle
  const visitorsByDay = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
    SELECT DATE("lastVisit") as date, COUNT(*) as count 
    FROM "Visitor" 
    WHERE "lastVisit" >= ${thirtyDaysAgo}
    GROUP BY DATE("lastVisit")
    ORDER BY date
  `;

  visitorsByDay.forEach(v => {
    const dateStr = new Date(v.date).toISOString().split('T')[0];
    if (dailyMap.has(dateStr)) {
      dailyMap.get(dateStr)!.visitors = Number(v.count);
    }
  });

  // Chatbot kullanıcılarını ekle
  const chatByDay = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
    SELECT DATE("startTime") as date, COUNT(*) as count 
    FROM "ChatSession" 
    WHERE "startTime" >= ${thirtyDaysAgo}
    GROUP BY DATE("startTime")
    ORDER BY date
  `;

  chatByDay.forEach(c => {
    const dateStr = new Date(c.date).toISOString().split('T')[0];
    if (dailyMap.has(dateStr)) {
      dailyMap.get(dateStr)!.chatbotUsers = Number(c.count);
    }
  });

  const dailyTrend = Array.from(dailyMap.entries()).map(([date, data]) => ({
    date: new Date(date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' }),
    visitors: data.visitors,
    chatbotUsers: data.chatbotUsers
  }));

  // Ziyaretçi listesi (detaylı)
  const visitors = await prisma.visitor.findMany({
    where: whereClause,
    include: {
      sessions: {
        orderBy: { startTime: 'desc' },
        take: 5
      },
      pageViews: {
        orderBy: { timestamp: 'desc' },
        take: 20
      },
      chatSessions: {
        include: {
          messages: {
            orderBy: { timestamp: 'asc' }
          }
        }
      }
    },
    orderBy: { lastVisit: 'desc' },
    take: 100
  });

  // Günlere göre grupla
  const visitorsByDayGrouped: Record<string, typeof visitors> = {};
  visitors.forEach(v => {
    const dateStr = v.lastVisit.toLocaleDateString('tr-TR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    if (!visitorsByDayGrouped[dateStr]) {
      visitorsByDayGrouped[dateStr] = [];
    }
    visitorsByDayGrouped[dateStr].push(v);
  });

  return {
    overview: {
      totalUniqueVisitors,
      todayVisitors,
      visitorChange,
      activeSessions,
      totalChatbotUsers,
      chatbotUsersToday
    },
    topPages,
    deviceStats,
    browserStats,
    countryStats,
    dailyTrend,
    visitorsByDay: visitorsByDayGrouped
  };
}

// Tek ziyaretçi detayı
export async function getVisitorDetails(visitorId: string) {
  return prisma.visitor.findUnique({
    where: { visitorId },
    include: {
      sessions: {
        orderBy: { startTime: 'desc' }
      },
      pageViews: {
        orderBy: { timestamp: 'desc' }
      },
      chatSessions: {
        include: {
          messages: {
            orderBy: { timestamp: 'asc' }
          }
        },
        orderBy: { startTime: 'desc' }
      }
    }
  });
}

// Contact click tracking
export async function trackContactClick(type: 'email' | 'phone' | 'whatsapp', visitorId?: string) {
  // Bu basit bir counter olarak tutulabilir veya ayrı bir tablo olabilir
  // Şimdilik DailyStats'a ekleyelim
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Ayrı ContactClick modeli olmadığı için basit bir implementasyon
  // İsterseniz ContactClick tablosu ekleyebiliriz
  console.log(`Contact click tracked: ${type} from ${visitorId}`);
}

// Chatbot sessions
export async function getChatbotSessions(filter: string = 'all') {
  const now = new Date();
  let startDate: Date | undefined;

  switch (filter) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case '7days':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30days':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = undefined;
  }

  const whereClause = startDate ? { startTime: { gte: startDate } } : {};

  return prisma.chatSession.findMany({
    where: whereClause,
    include: {
      visitor: true,
      messages: {
        orderBy: { timestamp: 'asc' }
      }
    },
    orderBy: { startTime: 'desc' }
  });
}
