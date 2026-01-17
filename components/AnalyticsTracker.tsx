'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

// Generate a unique visitor ID
function generateVisitorId(): string {
  const array = new Uint32Array(4);
  crypto.getRandomValues(array);
  return Array.from(array, x => x.toString(16).padStart(8, '0')).join('');
}

// Get browser info
function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let browserVersion = '';
  
  if (ua.includes('Firefox/')) {
    browser = 'Firefox';
    browserVersion = ua.match(/Firefox\/(\d+)/)?.[1] || '';
  } else if (ua.includes('Edg/')) {
    browser = 'Edge';
    browserVersion = ua.match(/Edg\/(\d+)/)?.[1] || '';
  } else if (ua.includes('Chrome/')) {
    browser = 'Chrome';
    browserVersion = ua.match(/Chrome\/(\d+)/)?.[1] || '';
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    browser = 'Safari';
    browserVersion = ua.match(/Version\/(\d+)/)?.[1] || '';
  } else if (ua.includes('Opera') || ua.includes('OPR/')) {
    browser = 'Opera';
    browserVersion = ua.match(/(?:Opera|OPR)\/(\d+)/)?.[1] || '';
  }

  return { browser, browserVersion };
}

// Get device type
function getDeviceType(): string {
  const ua = navigator.userAgent;
  
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return 'tablet';
  }
  
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
    return 'mobile';
  }
  
  return 'desktop';
}

// Get OS info
function getOS(): string {
  const ua = navigator.userAgent;
  
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  
  return 'Unknown';
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string | null>(null);
  const visitorIdRef = useRef<string | null>(null);
  const pageStartTimeRef = useRef<number>(Date.now());

  // Get or create visitor ID
  const getVisitorId = useCallback(() => {
    if (visitorIdRef.current) return visitorIdRef.current;
    
    let id = localStorage.getItem('visitor_id');
    if (!id) {
      id = generateVisitorId();
      localStorage.setItem('visitor_id', id);
    }
    visitorIdRef.current = id;
    return id;
  }, []);

  // Get or create session ID
  const getSessionId = useCallback(() => {
    if (sessionIdRef.current) return sessionIdRef.current;
    
    const stored = sessionStorage.getItem('session_id');
    if (stored) {
      sessionIdRef.current = stored;
      return stored;
    }
    return null;
  }, []);

  // Track page view
  const trackPageView = useCallback(async () => {
    // Don't track admin pages
    if (pathname?.startsWith('/admin')) return;

    try {
      const { browser, browserVersion } = getBrowserInfo();
      const visitorId = getVisitorId();

      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'pageview',
          visitorId,
          sessionId: getSessionId(),
          path: pathname,
          title: document.title,
          referrer: document.referrer,
          device: getDeviceType(),
          browser,
          browserVersion,
          os: getOS(),
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          language: navigator.language,
        }),
      });

      const data = await response.json();
      
      if (data.sessionId && !sessionIdRef.current) {
        sessionIdRef.current = data.sessionId;
        sessionStorage.setItem('session_id', data.sessionId);
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }, [pathname, getVisitorId, getSessionId]);

  // Track session end
  const trackSessionEnd = useCallback(async () => {
    const sessionId = getSessionId();
    if (!sessionId) return;

    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'session_end',
          sessionId,
        }),
        keepalive: true,
      });
    } catch (error) {
      console.error('Session end tracking error:', error);
    }
  }, [getSessionId]);

  // Track page view on route change
  useEffect(() => {
    pageStartTimeRef.current = Date.now();
    trackPageView();
  }, [pathname, trackPageView]);

  // Track session end on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      trackSessionEnd();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackSessionEnd();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [trackSessionEnd]);

  return null;
}

// Helper function to track chatbot usage (can be imported and called from Chatbot component)
export async function trackChatbotStart(userName?: string, userPhone?: string) {
  const visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) return null;

  try {
    const response = await fetch('/api/analytics/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'chat_start',
        visitorId,
        userName,
        userPhone,
      }),
    });

    const data = await response.json();
    return data.chatSessionId;
  } catch (error) {
    console.error('Chat tracking error:', error);
    return null;
  }
}

export async function trackChatMessage(chatSessionId: string, message: string, sender: 'user' | 'bot') {
  try {
    await fetch('/api/analytics/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'chat_message',
        chatSessionId,
        message,
        sender,
      }),
    });
  } catch (error) {
    console.error('Chat message tracking error:', error);
  }
}

export async function trackChatEnd(chatSessionId: string) {
  try {
    await fetch('/api/analytics/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'chat_end',
        chatSessionId,
      }),
    });
  } catch (error) {
    console.error('Chat end tracking error:', error);
  }
}

// Track contact click (email, phone, whatsapp)
export function trackContactClick(contactType: 'email' | 'phone' | 'whatsapp', value: string) {
  console.log('🔔 trackContactClick called:', contactType, value);
  try {
    let visitorId = localStorage.getItem('visitor_id');
    
    // Generate visitor ID if not exists
    if (!visitorId) {
      const array = new Uint32Array(4);
      crypto.getRandomValues(array);
      visitorId = Array.from(array, x => x.toString(16).padStart(8, '0')).join('');
      localStorage.setItem('visitor_id', visitorId);
    }

    const data = JSON.stringify({
      type: 'contact_click',
      visitorId,
      contactType,
      value,
      timestamp: new Date().toISOString()
    });

    console.log('🔔 Sending contact click data:', data);

    // Use sendBeacon for reliable delivery (works even when page is unloading)
    if (navigator.sendBeacon) {
      const blob = new Blob([data], { type: 'application/json' });
      const success = navigator.sendBeacon('/api/analytics/track', blob);
      console.log('🔔 Contact click tracked via sendBeacon:', success, contactType, value);
    } else {
      // Fallback to fetch with keepalive
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
        keepalive: true
      })
      .then(res => console.log('🔔 Contact click fetch response:', res.status))
      .catch(err => console.error('Contact click tracking error:', err));
    }
  } catch (error) {
    console.error('Contact click tracking error:', error);
  }
}
