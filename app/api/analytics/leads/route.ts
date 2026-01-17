import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Telefon numarası regex patternleri
const phonePatterns = [
  // Uluslararası formatlar
  /(?:\+|00)?(?:41|33|90|1|44|49)\s?[0-9]{2,3}[\s.-]?[0-9]{2,4}[\s.-]?[0-9]{2,4}[\s.-]?[0-9]{0,4}/g,
  // İsviçre formatları
  /(?:0|\+41|0041)?\s?(?:7[5-9]|2[1-9]|3[1-9]|4[1-9]|5[1-9]|6[1-9]|8[1-9])\s?[0-9]{3}[\s.-]?[0-9]{2}[\s.-]?[0-9]{2}/g,
  // Genel telefon formatı
  /\b[0-9]{10,14}\b/g,
  // Boşluklu telefon
  /\b[0-9]{2,4}[\s.-][0-9]{2,4}[\s.-][0-9]{2,4}[\s.-]?[0-9]{0,4}\b/g
];

// Email regex
const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Mesajlardan telefon numarası çıkar
function extractPhoneFromMessages(messages: any[]): string | null {
  for (const msg of messages) {
    if (msg.sender === 'user') {
      for (const pattern of phonePatterns) {
        const matches = msg.message.match(pattern);
        if (matches) {
          // En uzun eşleşmeyi al (daha güvenilir)
          const validMatch = matches
            .map((m: string) => m.replace(/[\s.-]/g, ''))
            .filter((m: string) => m.length >= 9 && m.length <= 15)
            .sort((a: string, b: string) => b.length - a.length)[0];
          if (validMatch) return validMatch;
        }
      }
    }
  }
  return null;
}

// Mesajlardan email çıkar
function extractEmailFromMessages(messages: any[]): string | null {
  for (const msg of messages) {
    if (msg.sender === 'user') {
      const matches = msg.message.match(emailPattern);
      if (matches && matches.length > 0) {
        return matches[0];
      }
    }
  }
  return null;
}

// Lead puanı hesapla
function calculateLeadScore(session: any): number {
  let score = 0;
  
  // İsim varsa
  if (session.userName) score += 25;
  
  // Telefon varsa
  if (session.userPhone) score += 35;
  
  // Mesajlardan çıkarılan telefon
  const extractedPhone = extractPhoneFromMessages(session.messages || []);
  if (extractedPhone) score += 30;
  
  // Email varsa
  const extractedEmail = extractEmailFromMessages(session.messages || []);
  if (extractedEmail) score += 20;
  
  // Intent bazlı
  const intentScores: Record<string, number> = {
    'randevu': 30,
    'devis': 25,
    'fiyat': 20,
    'urgence': 25,
    'contact': 15,
    'bilgi': 10,
    'sikayet': 5,
    'merci': 5,
    'diger': 0
  };
  score += intentScores[session.intent] || 0;
  
  // Mesaj sayısına göre
  const msgCount = session.messageCount || 0;
  if (msgCount >= 10) score += 15;
  else if (msgCount >= 5) score += 10;
  else if (msgCount >= 2) score += 5;
  
  return Math.min(score, 100);
}

export async function GET() {
  try {
    const chatbotPath = path.join(process.cwd(), 'data', 'chatbot-sessions.json');
    
    let sessions: any = {};
    try {
      const chatbotData = await fs.readFile(chatbotPath, 'utf-8');
      const parsed = JSON.parse(chatbotData);
      sessions = parsed.sessions || {};
    } catch (e) {
      // Dosya yoksa boş döndür
      return NextResponse.json({ leads: [] });
    }

    // Lead'leri grupla (visitorId bazında)
    const leadsMap: Map<string, any> = new Map();

    Object.values(sessions).forEach((session: any) => {
      const extractedPhone = extractPhoneFromMessages(session.messages || []);
      const extractedEmail = extractEmailFromMessages(session.messages || []);
      
      // Sadece iletişim bilgisi olan session'ları al
      const hasContactInfo = session.userName || session.userPhone || extractedPhone || extractedEmail;
      
      if (!hasContactInfo) return;

      const visitorId = session.visitorId;
      const existing = leadsMap.get(visitorId);

      if (existing) {
        // Mevcut lead'i güncelle
        existing.messageCount += session.messageCount || 0;
        existing.messages = [...existing.messages, ...(session.messages || [])];
        
        // En son değerleri al
        if (session.userName && !existing.userName) existing.userName = session.userName;
        if (session.userPhone && !existing.userPhone) existing.userPhone = session.userPhone;
        if (extractedPhone && !existing.extractedPhone) existing.extractedPhone = extractedPhone;
        if (extractedEmail && !existing.email) existing.email = extractedEmail;
        
        // Tarih güncellemeleri
        const sessionStart = new Date(session.startTime);
        if (sessionStart < new Date(existing.firstContact)) {
          existing.firstContact = session.startTime;
        }
        if (sessionStart > new Date(existing.lastContact)) {
          existing.lastContact = session.startTime;
          existing.intent = session.intent || existing.intent;
        }

        // Source güncelle
        if (session.userName || session.userPhone) {
          existing.source = existing.source === 'chat' ? 'both' : 'form';
        } else if (extractedPhone || extractedEmail) {
          existing.source = existing.source === 'form' ? 'both' : 'chat';
        }
      } else {
        // Yeni lead oluştur
        leadsMap.set(visitorId, {
          id: session.id,
          visitorId: session.visitorId,
          userName: session.userName || null,
          userPhone: session.userPhone || null,
          extractedPhone: extractedPhone,
          email: extractedEmail,
          ip: session.ip || '',
          device: session.device || '',
          browser: session.browser || '',
          location: session.location || { country: '', city: '', region: '' },
          intent: session.intent || 'diger',
          messageCount: session.messageCount || 0,
          firstContact: session.startTime,
          lastContact: session.startTime,
          messages: session.messages || [],
          source: (session.userName || session.userPhone) ? 'form' : 'chat',
          score: 0
        });
      }
    });

    // Lead'leri array'e çevir ve puanları hesapla
    const leads = Array.from(leadsMap.values())
      .map(lead => ({
        ...lead,
        score: calculateLeadScore(lead),
        // Mesajları zaman sırasına göre sırala
        messages: lead.messages.sort((a: any, b: any) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
      }))
      // Puana göre sırala (yüksekten düşüğe)
      .sort((a, b) => b.score - a.score);

    return NextResponse.json({ 
      leads,
      stats: {
        total: leads.length,
        withPhone: leads.filter(l => l.userPhone || l.extractedPhone).length,
        withName: leads.filter(l => l.userName).length,
        withEmail: leads.filter(l => l.email).length,
        highPotential: leads.filter(l => l.score >= 80).length
      }
    });

  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json({ leads: [], error: 'Failed to fetch leads' }, { status: 500 });
  }
}
