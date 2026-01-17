// Shared analytics memory store
// Bu dosya route.ts dosyalarından import edilebilir

import { loadAnalyticsFromFile, saveAnalyticsToFile, convertToStorageFormat, convertFromStorageFormat } from './analytics-storage';

// In-memory storage for analytics (persists during server runtime)
export interface VisitorData {
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

export interface PageViewData {
  id: string;
  visitorId: string;
  path: string;
  timestamp: Date;
}

export interface SessionData {
  id: string;
  visitorId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  isActive: boolean;
}

export interface ChatSessionData {
  visitorId: string;
  startTime: Date;
}

export interface InMemoryAnalytics {
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
