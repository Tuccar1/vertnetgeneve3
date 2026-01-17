import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData, scheduleSave } from '@/lib/analytics-memory';
import { loadContactClicksFromFile, saveContactClicksToFile } from '@/lib/analytics-storage';

// Global contact clicks storage
interface ContactClick {
  id: string;
  visitorId: string;
  contactType: 'email' | 'phone' | 'whatsapp';
  value: string;
  timestamp: Date;
  ip: string;
}

declare global {
  var contactClicks: ContactClick[] | undefined;
  var contactClicksLoaded: boolean | undefined;
}

async function getContactClicks(): Promise<ContactClick[]> {
  if (!global.contactClicks) {
    global.contactClicks = [];
  }
  
  // Load from file on first access
  if (!global.contactClicksLoaded) {
    global.contactClicksLoaded = true;
    const savedClicks = await loadContactClicksFromFile();
    if (savedClicks.length > 0) {
      global.contactClicks = savedClicks.map(c => ({
        ...c,
        timestamp: new Date(c.timestamp)
      }));
      console.log(`Loaded ${global.contactClicks.length} contact clicks from file`);
    }
  }
  
  return global.contactClicks;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { 
      visitorId, 
      type, 
      path, 
      title, 
      referrer, 
      device, 
      browser, 
      browserVersion,
      os,
      screenWidth,
      screenHeight,
      language,
      sessionId,
      duration,
      scrollDepth
    } = data;

    // Get IP from headers
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    const analyticsData = await getAnalyticsData();

    if (type === 'pageview') {
      // Find or create visitor
      let visitor = analyticsData.visitors.get(visitorId);

      if (!visitor) {
        visitor = {
          id: generateId(),
          visitorId,
          ip,
          device: device || 'unknown',
          browser: browser || 'Unknown',
          browserVersion: browserVersion || '',
          os: os || 'Unknown',
          screenWidth: screenWidth || 0,
          screenHeight: screenHeight || 0,
          language: language || '',
          referrer: referrer || '',
          firstVisit: new Date(),
          lastVisit: new Date(),
          totalVisits: 1,
          hasChatted: false
        };
        analyticsData.visitors.set(visitorId, visitor);
      } else {
        // Update existing visitor
        visitor.lastVisit = new Date();
        visitor.totalVisits++;
        if (ip && ip !== 'unknown') visitor.ip = ip;
      }

      // Find or create session
      let session = sessionId ? analyticsData.sessions.get(sessionId) : null;

      if (!session) {
        const newSessionId = generateId();
        session = {
          id: newSessionId,
          visitorId,
          startTime: new Date(),
          isActive: true
        };
        analyticsData.sessions.set(newSessionId, session);
      }

      // Create page view
      analyticsData.pageViews.push({
        id: generateId(),
        visitorId,
        path: path || '/',
        timestamp: new Date()
      });

      // Limit page views to last 10000 to prevent memory issues
      if (analyticsData.pageViews.length > 10000) {
        analyticsData.pageViews = analyticsData.pageViews.slice(-5000);
      }

      // Schedule save to file
      scheduleSave();

      return NextResponse.json({ 
        success: true, 
        visitorId: visitor.id,
        sessionId: session.id 
      });

    } else if (type === 'session_end') {
      // Update session end time and duration
      if (sessionId) {
        const session = analyticsData.sessions.get(sessionId);

        if (session) {
          const durationSeconds = Math.floor((new Date().getTime() - session.startTime.getTime()) / 1000);
          session.endTime = new Date();
          session.duration = durationSeconds;
          session.isActive = false;
          scheduleSave();
        }
      }

      return NextResponse.json({ success: true });

    } else if (type === 'chat_start') {
      // Track chatbot usage
      const visitor = analyticsData.visitors.get(visitorId);
      if (visitor) {
        visitor.hasChatted = true;
      }

      analyticsData.chatSessions.push({
        visitorId,
        startTime: new Date()
      });

      // Limit chat sessions
      if (analyticsData.chatSessions.length > 1000) {
        analyticsData.chatSessions = analyticsData.chatSessions.slice(-500);
      }

      scheduleSave();
      return NextResponse.json({ success: true });
    
    } else if (type === 'contact_click') {
      // Track contact clicks (email, phone, whatsapp)
      const { contactType, value } = data;
      
      console.log('📞 Contact click received:', { contactType, value, visitorId });
      
      // Load existing clicks first if not loaded
      await getContactClicks();
      
      // Store in global contact clicks array
      if (!global.contactClicks) {
        global.contactClicks = [];
      }
      
      global.contactClicks.push({
        id: generateId(),
        visitorId,
        contactType,
        value,
        timestamp: new Date(),
        ip
      });
      
      console.log('📞 Total contact clicks:', global.contactClicks.length);
      
      // Limit contact clicks
      if (global.contactClicks.length > 1000) {
        global.contactClicks = global.contactClicks.slice(-500);
      }
      
      // Save to file immediately
      await saveContactClicksToFile(global.contactClicks);
      
      scheduleSave();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Analytics tracking endpoint' });
}
