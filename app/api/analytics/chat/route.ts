import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData, scheduleSave } from '@/lib/analytics-memory';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { visitorId, type } = data;

    const analyticsData = await getAnalyticsData();

    if (type === 'chat_start') {
      // Track chatbot usage
      const visitor = analyticsData.visitors.get(visitorId);
      if (visitor) {
        visitor.hasChatted = true;
      }

      analyticsData.chatSessions.push({
        visitorId,
        startTime: new Date()
      });

      // Limit chat sessions to prevent memory issues
      if (analyticsData.chatSessions.length > 1000) {
        analyticsData.chatSessions = analyticsData.chatSessions.slice(-500);
      }

      scheduleSave();

      return NextResponse.json({ 
        success: true, 
        chatSessionId: Math.random().toString(36).substring(2, 15)
      });

    } else if (type === 'chat_message') {
      // Just acknowledge the message
      return NextResponse.json({ success: true });

    } else if (type === 'chat_end') {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Chat tracking error:', error);
    return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
  }
}
