import { NextRequest, NextResponse } from 'next/server';
import { loadAnalyticsFromFile, loadContactClicksFromFile } from '@/lib/analytics-storage';
import { promises as fs } from 'fs';
import path from 'path';

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  visitorId: string;
  userName: string | null;
  userPhone: string | null;
  ip: string;
  device: string;
  browser: string;
  location: {
    country: string;
    city: string;
    region: string;
  };
  messageCount: number;
  startTime: string;
  endTime: string | null;
  duration: number;
  intent: string;
  messages: ChatMessage[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const visitorId = params.id;
    
    // Load all data
    const analyticsData = await loadAnalyticsFromFile();
    const contactClicks = await loadContactClicksFromFile();
    
    // Load chatbot sessions
    let chatSessions: Record<string, ChatSession> = {};
    try {
      const chatbotPath = path.join(process.cwd(), 'data', 'chatbot-sessions.json');
      const chatbotData = await fs.readFile(chatbotPath, 'utf-8');
      const parsed = JSON.parse(chatbotData);
      chatSessions = parsed.sessions || {};
    } catch (e) {
      console.log('No chatbot sessions file found');
    }
    
    if (!analyticsData) {
      return NextResponse.json({ error: 'Analytics data not found' }, { status: 404 });
    }
    
    // Find visitor
    const visitor = analyticsData.visitors[visitorId];
    if (!visitor) {
      return NextResponse.json({ error: 'Visitor not found' }, { status: 404 });
    }
    
    // Get all page views for this visitor
    const pageViews = analyticsData.pageViews
      .filter(p => p.visitorId === visitorId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .map(p => ({
        path: p.path,
        timestamp: p.timestamp,
        formattedTime: new Date(p.timestamp).toLocaleString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }));
    
    // Get contact clicks for this visitor
    const visitorContactClicks = contactClicks
      .filter(c => c.visitorId === visitorId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .map(c => ({
        type: c.contactType,
        value: c.value,
        timestamp: c.timestamp,
        formattedTime: new Date(c.timestamp).toLocaleString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }));
    
    // Get chatbot sessions for this visitor
    const visitorChatSessions = Object.values(chatSessions)
      .filter(session => session.visitorId === visitorId)
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
      .map(session => ({
        id: session.id,
        startTime: session.startTime,
        formattedTime: new Date(session.startTime).toLocaleString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        messageCount: session.messageCount,
        intent: session.intent,
        userName: session.userName,
        userPhone: session.userPhone,
        messages: session.messages.map(m => ({
          sender: m.sender,
          message: m.message,
          time: new Date(m.timestamp).toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }))
      }));
    
    // Extract user info from chat sessions (name and phone)
    let userName: string | null = null;
    let userPhone: string | null = null;
    
    for (const session of visitorChatSessions) {
      if (session.userName && !userName) {
        userName = session.userName;
      }
      if (session.userPhone && !userPhone) {
        userPhone = session.userPhone;
      }
      if (userName && userPhone) break;
    }
    
    // Try to extract name/phone from chat messages if not directly stored
    if (!userName || !userPhone) {
      for (const session of visitorChatSessions) {
        for (const msg of session.messages) {
          if (msg.sender === 'user') {
            // Check for phone number pattern
            if (!userPhone) {
              const phoneMatch = msg.message.match(/(\+?\d{10,15}|\d{3}[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2})/);
              if (phoneMatch) {
                userPhone = phoneMatch[0];
              }
            }
            // Check for name (if message starts with "Ben" or contains "adım")
            if (!userName) {
              const nameMatch = msg.message.match(/(?:ben\s+|adım\s+|ismim\s+)([A-ZÇĞİÖŞÜa-zçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜa-zçğıöşü]+)?)/i);
              if (nameMatch) {
                userName = nameMatch[1];
              }
            }
          }
        }
        if (userName && userPhone) break;
      }
    }
    
    // Check if visitor has a booking (randevu)
    const bookingKeywords = [
      'randevu', 'rendez-vous', 'rdv', 'appointment', 'booking', 'réservation',
      'randevunuz', 'randevusu', 'tarihi', 'saati', 'onaylandı', 'confirmé',
      'confirmed', 'planifié', 'scheduled', 'planlanmış', 'alındı'
    ];
    
    let hasBooking = false;
    const visitorSessions = Object.values(chatSessions).filter(s => s.visitorId === visitorId);
    for (const session of visitorSessions) {
      if (session.intent === 'randevu') {
        // Check bot messages for booking confirmation
        const botMessages = session.messages
          .filter(m => m.sender === 'bot')
          .map(m => m.message.toLowerCase());
        
        hasBooking = botMessages.some(msg => 
          bookingKeywords.some(keyword => msg.includes(keyword)) &&
          (msg.includes('onay') || msg.includes('confirm') || msg.includes('alın') || 
           msg.includes('tamamla') || msg.includes('planla') || msg.includes('kaydedil'))
        );
        
        if (hasBooking) break;
      }
    }
    
    // Calculate total time spent (approximate from page views)
    let totalTimeSpent = 0;
    if (pageViews.length > 1) {
      const sortedViews = [...pageViews].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      
      // Group by session (views within 30 min of each other)
      let sessionStart = new Date(sortedViews[0].timestamp).getTime();
      let lastView = sessionStart;
      
      for (let i = 1; i < sortedViews.length; i++) {
        const viewTime = new Date(sortedViews[i].timestamp).getTime();
        const gap = viewTime - lastView;
        
        if (gap > 30 * 60 * 1000) {
          // New session
          totalTimeSpent += lastView - sessionStart;
          sessionStart = viewTime;
        }
        lastView = viewTime;
      }
      totalTimeSpent += lastView - sessionStart;
      totalTimeSpent = Math.round(totalTimeSpent / 1000); // Convert to seconds
    }
    
    // Format time spent
    const formatDuration = (seconds: number) => {
      if (seconds < 60) return `${seconds} saniye`;
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      if (minutes < 60) return `${minutes} dakika ${secs} saniye`;
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours} saat ${mins} dakika`;
    };
    
    // Get unique pages visited
    const uniquePagesSet = new Set(pageViews.map(p => p.path));
    const uniquePages = Array.from(uniquePagesSet);
    
    return NextResponse.json({
      visitor: {
        id: visitor.id,
        visitorId: visitor.visitorId,
        ip: visitor.ip,
        device: visitor.device,
        browser: visitor.browser,
        browserVersion: visitor.browserVersion,
        os: visitor.os,
        screenWidth: visitor.screenWidth,
        screenHeight: visitor.screenHeight,
        language: visitor.language,
        referrer: visitor.referrer || 'Doğrudan',
        firstVisit: visitor.firstVisit,
        lastVisit: visitor.lastVisit,
        totalVisits: visitor.totalVisits,
        hasChatted: visitor.hasChatted,
        userName: userName,
        userPhone: userPhone,
        hasBooking: hasBooking,
        firstVisitFormatted: new Date(visitor.firstVisit).toLocaleString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        lastVisitFormatted: new Date(visitor.lastVisit).toLocaleString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      },
      stats: {
        totalPageViews: pageViews.length,
        uniquePages: uniquePages.length,
        totalContactClicks: visitorContactClicks.length,
        emailClicks: visitorContactClicks.filter(c => c.type === 'email').length,
        phoneClicks: visitorContactClicks.filter(c => c.type === 'phone').length,
        whatsappClicks: visitorContactClicks.filter(c => c.type === 'whatsapp').length,
        totalChatSessions: visitorChatSessions.length,
        totalChatMessages: visitorChatSessions.reduce((acc, s) => acc + s.messageCount, 0),
        timeSpent: totalTimeSpent,
        timeSpentFormatted: formatDuration(totalTimeSpent)
      },
      pageViews,
      uniquePages,
      contactClicks: visitorContactClicks,
      chatSessions: visitorChatSessions
    });
    
  } catch (error) {
    console.error('Error fetching visitor details:', error);
    return NextResponse.json({ error: 'Failed to fetch visitor details' }, { status: 500 });
  }
}
