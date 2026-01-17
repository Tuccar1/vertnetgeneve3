import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');
const CHATBOT_FILE = path.join(DATA_DIR, 'chatbot-sessions.json');
const CONTACT_CLICKS_FILE = path.join(DATA_DIR, 'contact-clicks.json');

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
  firstVisit: string;
  lastVisit: string;
  totalVisits: number;
  hasChatted: boolean;
}

interface PageViewData {
  id: string;
  visitorId: string;
  path: string;
  timestamp: string;
}

interface SessionData {
  id: string;
  visitorId: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  isActive: boolean;
}

interface ChatSessionData {
  visitorId: string;
  startTime: string;
}

interface AnalyticsStorage {
  visitors: Record<string, VisitorData>;
  pageViews: PageViewData[];
  sessions: Record<string, SessionData>;
  chatSessions: ChatSessionData[];
  lastSaved: string;
}

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Load analytics data from file
export async function loadAnalyticsFromFile(): Promise<AnalyticsStorage | null> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(ANALYTICS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// Save analytics data to file
export async function saveAnalyticsToFile(data: AnalyticsStorage): Promise<void> {
  try {
    await ensureDataDir();
    data.lastSaved = new Date().toISOString();
    await fs.writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save analytics:', error);
  }
}

// Convert in-memory format to storage format
export function convertToStorageFormat(memoryData: {
  visitors: Map<string, any>;
  pageViews: any[];
  sessions: Map<string, any>;
  chatSessions: any[];
}): AnalyticsStorage {
  const visitors: Record<string, VisitorData> = {};
  memoryData.visitors.forEach((v, key) => {
    visitors[key] = {
      ...v,
      firstVisit: v.firstVisit instanceof Date ? v.firstVisit.toISOString() : v.firstVisit,
      lastVisit: v.lastVisit instanceof Date ? v.lastVisit.toISOString() : v.lastVisit,
    };
  });

  const sessions: Record<string, SessionData> = {};
  memoryData.sessions.forEach((s, key) => {
    sessions[key] = {
      ...s,
      startTime: s.startTime instanceof Date ? s.startTime.toISOString() : s.startTime,
      endTime: s.endTime instanceof Date ? s.endTime.toISOString() : s.endTime,
    };
  });

  const pageViews = memoryData.pageViews.map(p => ({
    ...p,
    timestamp: p.timestamp instanceof Date ? p.timestamp.toISOString() : p.timestamp,
  }));

  const chatSessions = memoryData.chatSessions.map(c => ({
    ...c,
    startTime: c.startTime instanceof Date ? c.startTime.toISOString() : c.startTime,
  }));

  return {
    visitors,
    pageViews,
    sessions,
    chatSessions,
    lastSaved: new Date().toISOString()
  };
}

// Convert storage format to in-memory format
export function convertFromStorageFormat(storageData: AnalyticsStorage): {
  visitors: Map<string, any>;
  pageViews: any[];
  sessions: Map<string, any>;
  chatSessions: any[];
} {
  const visitors = new Map();
  Object.entries(storageData.visitors).forEach(([key, v]) => {
    visitors.set(key, {
      ...v,
      firstVisit: new Date(v.firstVisit),
      lastVisit: new Date(v.lastVisit),
    });
  });

  const sessions = new Map();
  Object.entries(storageData.sessions).forEach(([key, s]) => {
    sessions.set(key, {
      ...s,
      startTime: new Date(s.startTime),
      endTime: s.endTime ? new Date(s.endTime) : undefined,
    });
  });

  const pageViews = storageData.pageViews.map(p => ({
    ...p,
    timestamp: new Date(p.timestamp),
  }));

  const chatSessions = storageData.chatSessions.map(c => ({
    ...c,
    startTime: new Date(c.startTime),
  }));

  return { visitors, pageViews, sessions, chatSessions };
}

// Read raw analytics data for API endpoints
export async function readAnalyticsData(): Promise<AnalyticsStorage | null> {
  return loadAnalyticsFromFile();
}

// Read chat analytics data for API endpoints
export async function readChatAnalyticsData(): Promise<ChatSessionData[]> {
  const data = await loadAnalyticsFromFile();
  return data?.chatSessions || [];
}

// Chatbot session storage interface
interface ChatbotMessage {
  sender: string;
  message: string;
  timestamp: string;
}

interface ChatbotSession {
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
  } | null;
  messageCount: number;
  startTime: string;
  endTime: string | null;
  duration: number;
  intent: string;
  messages: ChatbotMessage[];
}

interface ChatbotStorage {
  sessions: Record<string, ChatbotSession>;
  lastSaved: string;
}

// Load chatbot sessions from file
export async function loadChatbotFromFile(): Promise<ChatbotStorage | null> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(CHATBOT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// Save chatbot sessions to file
export async function saveChatbotToFile(sessions: Map<string, any>): Promise<void> {
  try {
    await ensureDataDir();
    
    const storageSessions: Record<string, ChatbotSession> = {};
    sessions.forEach((session, key) => {
      storageSessions[key] = {
        ...session,
        startTime: session.startTime instanceof Date ? session.startTime.toISOString() : session.startTime,
        endTime: session.endTime instanceof Date ? session.endTime.toISOString() : session.endTime,
        messages: session.messages.map((m: any) => ({
          ...m,
          timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp
        }))
      };
    });

    const data: ChatbotStorage = {
      sessions: storageSessions,
      lastSaved: new Date().toISOString()
    };

    await fs.writeFile(CHATBOT_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Chatbot sessions saved to file');
  } catch (error) {
    console.error('Failed to save chatbot sessions:', error);
  }
}

// Load chatbot sessions to memory
export async function loadChatbotToMemory(): Promise<Map<string, any>> {
  const data = await loadChatbotFromFile();
  const sessions = new Map<string, any>();
  
  if (data) {
    Object.entries(data.sessions).forEach(([key, session]) => {
      sessions.set(key, {
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : null,
        messages: session.messages.map(m => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }))
      });
    });
    console.log(`Loaded ${sessions.size} chatbot sessions from file`);
  }
  
  return sessions;
}

// Contact clicks storage interface
interface ContactClickData {
  id: string;
  visitorId: string;
  contactType: 'email' | 'phone' | 'whatsapp';
  value: string;
  timestamp: string;
  ip: string;
}

interface ContactClicksStorage {
  clicks: ContactClickData[];
  lastSaved: string;
}

// Load contact clicks from file
export async function loadContactClicksFromFile(): Promise<ContactClickData[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(CONTACT_CLICKS_FILE, 'utf-8');
    const parsed: ContactClicksStorage = JSON.parse(data);
    return parsed.clicks || [];
  } catch {
    return [];
  }
}

// Save contact clicks to file
export async function saveContactClicksToFile(clicks: any[]): Promise<void> {
  try {
    await ensureDataDir();
    
    const data: ContactClicksStorage = {
      clicks: clicks.map(c => ({
        ...c,
        timestamp: c.timestamp instanceof Date ? c.timestamp.toISOString() : c.timestamp
      })),
      lastSaved: new Date().toISOString()
    };

    await fs.writeFile(CONTACT_CLICKS_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Contact clicks saved to file');
  } catch (error) {
    console.error('Failed to save contact clicks:', error);
  }
}
