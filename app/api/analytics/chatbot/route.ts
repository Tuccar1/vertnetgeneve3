import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData } from '../stats/route';
import { saveChatbotToFile, loadChatbotToMemory } from '@/lib/analytics-storage';

// Intent detection keywords - Français, Anglais, Turc
const intentKeywords: Record<string, string[]> = {
  'randevu': [
    // Français
    'rendez-vous', 'rendez vous', 'rdv', 'réservation', 'réserver', 'prendre rendez', 'disponible', 'disponibilité',
    'quand', 'date', 'horaire', 'créneau', 'planning', 'calendrier', 'programmer', 'fixer', 'convenir',
    'intervention', 'passer', 'venir', 'visite', 'passage',
    // English
    'appointment', 'book', 'booking', 'schedule', 'reserve', 'available', 'availability', 'when',
    // Türkçe
    'randevu', 'rezervasyon', 'ayırt', 'müsait', 'uygun', 'gelebilir', 'ne zaman', 'tarih'
  ],
  'fiyat': [
    // Français
    'prix', 'tarif', 'tarifs', 'coût', 'coûte', 'coûter', 'combien', 'devis', 'estimation', 'budget',
    'facture', 'facturation', 'payer', 'paiement', 'euro', 'euros', 'chf', 'francs', 'cher', 'moins cher',
    'forfait', 'offre', 'promotion', 'réduction', 'remise', 'gratuit', 'frais', 'montant', 'somme',
    'coute', 'cout', 'estimer', 'evaluer', 'évaluer', 'prix m2', 'prix heure', 'taux horaire',
    // English
    'price', 'cost', 'rate', 'rates', 'quote', 'estimate', 'how much', 'expensive', 'cheap', 'fee', 'fees',
    // Türkçe
    'fiyat', 'ücret', 'ne kadar', 'kaç para', 'maliyet', 'teklif', 'ödeme'
  ],
  'bilgi': [
    // Français
    'information', 'informations', 'renseignement', 'renseignements', 'comment', 'quoi', 'quel', 'quelle',
    'expliquer', 'explication', 'détail', 'détails', 'savoir', 'connaître', 'comprendre', 'question',
    'demande', 'précision', 'préciser', 'plus', 'encore', 'autre', 'services', 'service', 'proposez',
    'offrez', 'faites', 'travaux', 'prestation', 'prestations', 'méthode', 'produit', 'produits',
    'nettoyage', 'ménage', 'entretien',
    // English
    'info', 'information', 'how', 'what', 'which', 'explain', 'detail', 'details', 'know', 'about',
    // Türkçe
    'bilgi', 'nasıl', 'nedir', 'açıkla', 'anlat', 'detay', 'hakkında'
  ],
  'sikayet': [
    // Français
    'plainte', 'réclamation', 'problème', 'probleme', 'souci', 'insatisfait', 'mécontent', 'mecontent',
    'déçu', 'déception', 'mal fait', 'pas bien', 'mauvais', 'nul', 'catastrophe', 'désastre',
    'inacceptable', 'scandale', 'honteux', 'refaire', 'recommencer', 'rembourser', 'remboursement',
    // English
    'complaint', 'problem', 'issue', 'unhappy', 'dissatisfied', 'bad', 'terrible', 'worst', 'refund',
    // Türkçe
    'şikayet', 'sorun', 'problem', 'memnun değil', 'kötü', 'berbat', 'rezalet'
  ],
  'contact': [
    // Français
    'contacter', 'contact', 'appeler', 'téléphone', 'telephone', 'mail', 'email', 'adresse',
    'joindre', 'numéro', 'numero', 'rappeler', 'rappel', 'message', 'écrire', 'envoyer',
    // English
    'contact', 'call', 'phone', 'email', 'address', 'reach',
    // Türkçe
    'iletişim', 'telefon', 'arama', 'ulaşmak'
  ],
  'devis': [
    // Français - Devis spécifique
    'devis', 'estimation gratuite', 'devis gratuit', 'demande de devis', 'faire un devis',
    'établir devis', 'obtenir devis', 'recevoir devis', 'envoyer devis',
    // English
    'quote', 'quotation', 'free estimate',
    // Türkçe
    'teklif', 'fiyat teklifi'
  ],
  'urgence': [
    // Français
    'urgent', 'urgence', 'vite', 'rapidement', 'immédiat', 'immediatement', 'aujourd\'hui', 'maintenant',
    'tout de suite', 'au plus vite', 'dès que possible', 'asap', 'emergency', 'pressé',
    // English
    'urgent', 'emergency', 'asap', 'immediately', 'quick', 'fast', 'now', 'today',
    // Türkçe
    'acil', 'hemen', 'şimdi', 'bugün'
  ],
  'merci': [
    // Français
    'merci', 'remercie', 'remercier', 'merci beaucoup', 'grand merci', 'super', 'parfait', 'excellent',
    'génial', 'formidable', 'bravo', 'satisfait', 'content', 'bien reçu',
    // English
    'thank', 'thanks', 'great', 'perfect', 'excellent', 'awesome',
    // Türkçe
    'teşekkür', 'sağol', 'mükemmel', 'harika'
  ]
};

// Fonction de normalisation du texte (supprime accents, Türkçe karakterleri dönüştür)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    // Türkçe karakterleri dönüştür
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"');
}

function detectIntent(messages: string[]): string {
  const allText = normalizeText(messages.join(' '));
  
  // Score chaque intent avec priorité pour le français
  const scores: Record<string, number> = {};
  
  // Mots-clés français (priorité plus élevée)
  const frenchKeywords: Record<string, string[]> = {
    'randevu': ['rendez-vous', 'rendez vous', 'rdv', 'réservation', 'réserver', 'prendre rendez', 'disponible', 'disponibilité', 'quand', 'date', 'horaire', 'créneau', 'planning', 'calendrier', 'programmer', 'fixer', 'convenir', 'intervention', 'passer', 'venir', 'visite', 'passage'],
    'fiyat': ['prix', 'tarif', 'tarifs', 'coût', 'coûte', 'coûter', 'combien', 'estimation', 'budget', 'facture', 'facturation', 'payer', 'paiement', 'euro', 'euros', 'chf', 'francs', 'cher', 'moins cher', 'forfait', 'offre', 'promotion', 'réduction', 'remise', 'gratuit', 'frais', 'montant', 'somme', 'coute', 'cout', 'estimer', 'evaluer', 'évaluer', 'prix m2', 'prix heure', 'taux horaire'],
    'bilgi': ['information', 'informations', 'renseignement', 'renseignements', 'comment', 'quoi', 'quel', 'quelle', 'expliquer', 'explication', 'détail', 'détails', 'savoir', 'connaître', 'comprendre', 'question', 'demande', 'précision', 'préciser', 'services', 'service', 'proposez', 'offrez', 'faites', 'travaux', 'prestation', 'prestations', 'méthode', 'produit', 'produits', 'nettoyage', 'ménage', 'entretien'],
    'sikayet': ['plainte', 'réclamation', 'problème', 'probleme', 'souci', 'insatisfait', 'mécontent', 'mecontent', 'déçu', 'déception', 'mal fait', 'pas bien', 'mauvais', 'nul', 'catastrophe', 'désastre', 'inacceptable', 'scandale', 'honteux', 'refaire', 'recommencer', 'rembourser', 'remboursement'],
    'contact': ['contacter', 'contact', 'appeler', 'téléphone', 'telephone', 'mail', 'email', 'adresse', 'joindre', 'numéro', 'numero', 'rappeler', 'rappel', 'message', 'écrire', 'envoyer'],
    'devis': ['devis', 'estimation gratuite', 'devis gratuit', 'demande de devis', 'faire un devis', 'établir devis', 'obtenir devis', 'recevoir devis', 'envoyer devis'],
    'urgence': ['urgent', 'urgence', 'vite', 'rapidement', 'immédiat', 'immediatement', 'aujourd\'hui', 'maintenant', 'tout de suite', 'au plus vite', 'dès que possible', 'pressé'],
    'merci': ['merci', 'remercie', 'remercier', 'merci beaucoup', 'grand merci', 'super', 'parfait', 'excellent', 'génial', 'formidable', 'bravo', 'satisfait', 'content', 'bien reçu']
  };
  
  for (const [intent, keywords] of Object.entries(intentKeywords)) {
    scores[intent] = 0;
    for (const keyword of keywords) {
      const normalizedKeyword = normalizeText(keyword);
      const regex = new RegExp(normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = allText.match(regex);
      if (matches) {
        // Vérifier si c'est un mot-clé français (bonus x2)
        const isFrench = frenchKeywords[intent]?.some(fk => normalizeText(fk) === normalizedKeyword);
        const multiplier = isFrench ? 2 : 1;
        
        scores[intent] += matches.length * multiplier;
        
        // Bonus pour les mots-clés plus spécifiques (plus longs)
        if (normalizedKeyword.length > 5) {
          scores[intent] += 0.5 * multiplier;
        }
      }
    }
  }
  
  // Trouve l'intent avec le score le plus élevé
  let maxScore = 0;
  let detectedIntent = 'diger';
  
  for (const [intent, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedIntent = intent;
    }
  }
  
  // Priorité spéciale: si devis est détecté, le prioriser sur fiyat
  if (scores['devis'] > 0 && scores['devis'] >= scores['fiyat'] * 0.5) {
    detectedIntent = 'devis';
  }
  
  // Mapping vers les noms d'affichage
  const intentMapping: Record<string, string> = {
    'randevu': 'randevu',
    'fiyat': 'fiyat',
    'bilgi': 'bilgi',
    'sikayet': 'sikayet',
    'contact': 'contact',
    'devis': 'devis',
    'urgence': 'urgence',
    'merci': 'merci'
  };
  
  return intentMapping[detectedIntent] || 'diger';
}

function getDateRange(filter: string, startDate?: string, endDate?: string): { start: Date; end: Date } {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  let start = new Date();
  start.setHours(0, 0, 0, 0);

  switch (filter) {
    case 'today':
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
      start = new Date(0);
      break;
  }

  return { start, end };
}

// Extended chat session storage
interface ExtendedChatSession {
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
  startTime: Date;
  endTime: Date | null;
  duration: number;
  intent: string;
  messages: {
    sender: string;
    message: string;
    timestamp: Date;
  }[];
}

declare global {
  var chatSessionsExtended: Map<string, ExtendedChatSession> | undefined;
  var chatSessionsLoaded: boolean | undefined;
}

export async function getChatSessions(): Promise<Map<string, ExtendedChatSession>> {
  if (!global.chatSessionsExtended) {
    global.chatSessionsExtended = new Map();
  }
  
  // Load from file on first access
  if (!global.chatSessionsLoaded) {
    const savedSessions = await loadChatbotToMemory();
    savedSessions.forEach((session, key) => {
      global.chatSessionsExtended!.set(key, session as ExtendedChatSession);
    });
    global.chatSessionsLoaded = true;
  }
  
  return global.chatSessionsExtended;
}

// Save sessions periodically
async function saveSessions() {
  if (global.chatSessionsExtended) {
    await saveChatbotToFile(global.chatSessionsExtended);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all';
    const customStartDate = searchParams.get('startDate') || undefined;
    const customEndDate = searchParams.get('endDate') || undefined;

    const { start: filterStart, end: filterEnd } = getDateRange(filter, customStartDate, customEndDate);

    const chatSessions = await getChatSessions();
    const allSessions = Array.from(chatSessions.values());

    // Filter sessions by date
    const filteredSessions = filter === 'all'
      ? allSessions
      : allSessions.filter(s => {
          const sessionDate = new Date(s.startTime);
          return sessionDate >= filterStart && sessionDate <= filterEnd;
        });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate stats
    const totalChats = filteredSessions.length;
    const todayChats = allSessions.filter(s => new Date(s.startTime) >= today).length;
    
    const avgMessageCount = totalChats > 0
      ? filteredSessions.reduce((acc, s) => acc + s.messageCount, 0) / totalChats
      : 0;

    const avgDuration = totalChats > 0
      ? Math.round(filteredSessions.reduce((acc, s) => acc + (s.duration || 0), 0) / totalChats)
      : 0;

    // Count intents
    const intentBreakdown: Record<string, number> = {};
    filteredSessions.forEach(s => {
      intentBreakdown[s.intent] = (intentBreakdown[s.intent] || 0) + 1;
    });

    const appointmentRequests = intentBreakdown['randevu'] || 0;
    const priceInquiries = intentBreakdown['fiyat'] || 0;
    const infoRequests = intentBreakdown['bilgi'] || 0;

    // Format sessions for response
    const sessions = filteredSessions
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
      .slice(0, 50)
      .map(s => ({
        id: s.id,
        visitorId: s.visitorId,
        userName: s.userName,
        userPhone: s.userPhone,
        ip: s.ip,
        device: s.device,
        browser: s.browser,
        location: s.location,
        messageCount: s.messageCount,
        startTime: s.startTime,
        endTime: s.endTime,
        duration: s.duration,
        intent: s.intent,
        messages: s.messages.map(m => ({
          sender: m.sender,
          message: m.message,
          timestamp: m.timestamp
        }))
      }));

    // Extract most frequently asked questions (user messages only)
    const userMessages: { message: string; timestamp: Date; intent: string }[] = [];
    filteredSessions.forEach(s => {
      s.messages
        .filter(m => m.sender === 'user')
        .forEach(m => {
          userMessages.push({
            message: m.message,
            timestamp: m.timestamp,
            intent: s.intent
          });
        });
    });

    // Group similar questions and count frequency
    const questionFrequency: Record<string, { count: number; examples: string[]; intent: string }> = {};
    
    // Define question patterns to group similar questions
    const questionPatterns = [
      { pattern: /prix|tarif|co[uû]t|combien|devis|budget|franc|chf|euro/i, category: 'Fiyat/Tarif Soruları' },
      { pattern: /rendez.?vous|rdv|r[eé]serv|disponible|date|horaire|quand|cr[eé]neau/i, category: 'Randevu Soruları' },
      { pattern: /service|nettoyage|m[eé]nage|entretien|proposez|offrez|travaux/i, category: 'Hizmet Bilgisi' },
      { pattern: /canap[eé]|matelas|meuble|tapis|moquette|textile/i, category: 'Mobilya/Tekstil Temizliği' },
      { pattern: /fin.?de.?bail|d[eé]m[eé]nagement|appartement|logement|locataire/i, category: 'Fin de Bail (Taşınma)' },
      { pattern: /vitre|fen[eê]tre|verre|baie/i, category: 'Cam Temizliği' },
      { pattern: /bureau|entreprise|local|commerce|professionnel/i, category: 'Kurumsal Temizlik' },
      { pattern: /immeuble|copropri[eé]t[eé]|escalier|commun/i, category: 'Bina/Apartman Temizliği' },
      { pattern: /toiture|fa[çc]ade|toit|ext[eé]rieur/i, category: 'Dış Cephe/Çatı' },
      { pattern: /urgent|vite|rapide|aujourd.?hui|maintenant|imm[eé]diat/i, category: 'Acil Talepler' },
      { pattern: /contact|t[eé]l[eé]phone|appeler|num[eé]ro|mail|adresse/i, category: 'İletişim Bilgisi' },
      { pattern: /g[eé]n[eé]ral|zone|gen[eè]ve|lausanne|vaud|secteur|r[eé]gion/i, category: 'Bölge/Kapsam Soruları' },
      { pattern: /merci|parfait|super|excellent|satisfait|bien/i, category: 'Teşekkür/Memnuniyet' },
      { pattern: /bonjour|salut|hello|bonsoir/i, category: 'Selamlaşma' },
    ];

    userMessages.forEach(({ message, intent }) => {
      const normalizedMsg = message.trim();
      if (normalizedMsg.length < 3) return; // Skip very short messages
      
      let matched = false;
      for (const { pattern, category } of questionPatterns) {
        if (pattern.test(normalizedMsg)) {
          if (!questionFrequency[category]) {
            questionFrequency[category] = { count: 0, examples: [], intent };
          }
          questionFrequency[category].count++;
          // Store up to 3 example questions per category
          if (questionFrequency[category].examples.length < 3 && 
              !questionFrequency[category].examples.includes(normalizedMsg) &&
              normalizedMsg.length > 10) {
            questionFrequency[category].examples.push(normalizedMsg);
          }
          matched = true;
          break;
        }
      }
      
      // If no pattern matched, put in "Other" category
      if (!matched && normalizedMsg.length > 15) {
        const category = 'Diğer Sorular';
        if (!questionFrequency[category]) {
          questionFrequency[category] = { count: 0, examples: [], intent: 'diger' };
        }
        questionFrequency[category].count++;
        if (questionFrequency[category].examples.length < 3) {
          questionFrequency[category].examples.push(normalizedMsg);
        }
      }
    });

    // Sort by frequency and get top questions
    const topQuestions = Object.entries(questionFrequency)
      .map(([category, data]) => ({
        category,
        count: data.count,
        examples: data.examples,
        intent: data.intent,
        percentage: totalChats > 0 ? Math.round((data.count / userMessages.length) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return NextResponse.json({
      overview: {
        totalChats,
        todayChats,
        avgMessageCount,
        avgDuration,
        appointmentRequests,
        priceInquiries,
        infoRequests
      },
      intentBreakdown,
      sessions,
      topQuestions
    });

  } catch (error) {
    console.error('Chatbot analytics error:', error);
    return NextResponse.json({
      overview: {
        totalChats: 0,
        todayChats: 0,
        avgMessageCount: 0,
        avgDuration: 0,
        appointmentRequests: 0,
        priceInquiries: 0,
        infoRequests: 0
      },
      intentBreakdown: {},
      sessions: []
    });
  }
}

// Helper function to get location from IP using free API
async function getLocationFromIP(ipAddress: string): Promise<{ country: string; city: string; region: string } | null> {
  try {
    // Skip for localhost/unknown IPs
    if (ipAddress === 'unknown' || ipAddress === '127.0.0.1' || ipAddress === '::1' || ipAddress.startsWith('192.168.') || ipAddress.startsWith('10.')) {
      return { country: 'Yerel', city: 'Localhost', region: '-' };
    }
    
    const response = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,country,city,regionName`);
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success') {
        return {
          country: data.country || 'Bilinmiyor',
          city: data.city || 'Bilinmiyor',
          region: data.regionName || ''
        };
      }
    }
    return null;
  } catch {
    return null;
  }
}

// Track chat session
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { type, sessionId, visitorId, userName, userPhone, message, sender } = data;

    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    const chatSessions = await getChatSessions();
    const analyticsData = await getAnalyticsData();
    const visitor = analyticsData.visitors.get(visitorId);

    if (type === 'start') {
      // Get location info from IP
      const location = await getLocationFromIP(ip);

      const newSession: ExtendedChatSession = {
        id: sessionId || Math.random().toString(36).substring(2, 15),
        visitorId,
        userName: userName || null,
        userPhone: userPhone || null,
        ip,
        device: visitor?.device || 'unknown',
        browser: visitor?.browser || 'Unknown',
        location,
        messageCount: 0,
        startTime: new Date(),
        endTime: null,
        duration: 0,
        intent: 'diger',
        messages: []
      };

      chatSessions.set(newSession.id, newSession);
      await saveSessions(); // Save to file

      // Update visitor chatted status
      if (visitor) {
        visitor.hasChatted = true;
      }

      return NextResponse.json({ success: true, sessionId: newSession.id });

    } else if (type === 'message') {
      const session = chatSessions.get(sessionId);
      if (session) {
        session.messages.push({
          sender: sender || 'user',
          message: message || '',
          timestamp: new Date()
        });
        session.messageCount++;

        // Update intent based on all user messages
        const userMessages = session.messages
          .filter(m => m.sender === 'user')
          .map(m => m.message);
        session.intent = detectIntent(userMessages);
        
        await saveSessions(); // Save to file
      }

      return NextResponse.json({ success: true });

    } else if (type === 'user_info') {
      const session = chatSessions.get(sessionId);
      if (session) {
        if (userName) session.userName = userName;
        if (userPhone) session.userPhone = userPhone;
        await saveSessions(); // Save to file
      }

      return NextResponse.json({ success: true });

    } else if (type === 'end') {
      const session = chatSessions.get(sessionId);
      if (session) {
        session.endTime = new Date();
        session.duration = Math.floor((session.endTime.getTime() - session.startTime.getTime()) / 1000);
        await saveSessions(); // Save to file
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Chat tracking error:', error);
    return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
  }
}

// Re-analyze all sessions and update intents
export async function PUT(request: NextRequest) {
  try {
    const chatSessions = await getChatSessions();
    let updatedCount = 0;

    for (const [id, session] of Array.from(chatSessions.entries())) {
      const userMessages = session.messages
        .filter((m: { sender: string; message: string; timestamp: Date }) => m.sender === 'user')
        .map((m: { sender: string; message: string; timestamp: Date }) => m.message);
      
      const oldIntent = session.intent;
      const newIntent = detectIntent(userMessages);
      
      if (oldIntent !== newIntent) {
        session.intent = newIntent;
        updatedCount++;
        console.log(`Session ${id}: ${oldIntent} -> ${newIntent}`);
      }
    }

    await saveSessions();

    return NextResponse.json({ 
      success: true, 
      message: `${updatedCount} sessions updated`,
      totalSessions: chatSessions.size
    });

  } catch (error) {
    console.error('Re-analyze error:', error);
    return NextResponse.json({ error: 'Re-analyze failed' }, { status: 500 });
  }
}
