'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Clock,
  Eye,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  User,
  Calendar,
  MapPin,
  MousePointer,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';

interface VisitorDetail {
  visitor: {
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
    userName: string | null;
    userPhone: string | null;
    hasBooking: boolean;
    firstVisitFormatted: string;
    lastVisitFormatted: string;
  };
  stats: {
    totalPageViews: number;
    uniquePages: number;
    totalContactClicks: number;
    emailClicks: number;
    phoneClicks: number;
    whatsappClicks: number;
    totalChatSessions: number;
    totalChatMessages: number;
    timeSpent: number;
    timeSpentFormatted: string;
  };
  pageViews: {
    path: string;
    timestamp: string;
    formattedTime: string;
  }[];
  uniquePages: string[];
  contactClicks: {
    type: string;
    value: string;
    timestamp: string;
    formattedTime: string;
  }[];
  chatSessions: {
    id: string;
    startTime: string;
    formattedTime: string;
    messageCount: number;
    intent: string;
    userName: string | null;
    userPhone: string | null;
    messages: {
      sender: string;
      message: string;
      time: string;
    }[];
  }[];
}

interface VisitorDetailModalProps {
  visitorId: string;
  onClose: () => void;
}

function calculateCustomerPotential(stats: VisitorDetail['stats'], visitor: VisitorDetail['visitor']) {
  let score = 0;
  if (visitor.hasBooking) score += 80;
  score += (stats.whatsappClicks || 0) * 40;
  score += (stats.phoneClicks || 0) * 35;
  score += (stats.emailClicks || 0) * 30;
  if (stats.totalChatMessages > 10) score += 35;
  else if (stats.totalChatMessages > 5) score += 25;
  else if (stats.totalChatMessages > 0) score += 15;
  if (visitor.userName) score += 25;
  if (visitor.userPhone) score += 30;
  if (stats.timeSpent > 300) score += 25;
  else if (stats.timeSpent > 120) score += 15;
  else if (stats.timeSpent > 60) score += 10;
  if (visitor.totalVisits > 5) score += 20;
  else if (visitor.totalVisits > 2) score += 10;
  else if (visitor.totalVisits > 1) score += 5;
  if (stats.uniquePages > 5) score += 15;
  else if (stats.uniquePages > 3) score += 10;
  else if (stats.uniquePages > 1) score += 5;
  return score;
}

function getPotentialLabel(score: number): { label: string; color: string; bgColor: string; emoji: string } {
  if (score >= 70) {
    return { label: 'Yüksek Potansiyel', color: 'text-emerald-700', bgColor: 'bg-emerald-100 border-emerald-300', emoji: '🔥' };
  } else if (score >= 30) {
    return { label: 'Orta Potansiyel', color: 'text-amber-700', bgColor: 'bg-amber-100 border-amber-300', emoji: '⚡' };
  } else {
    return { label: 'Düşük Potansiyel', color: 'text-gray-600', bgColor: 'bg-gray-100 border-gray-300', emoji: '❄️' };
  }
}

export default function VisitorDetailModal({ visitorId, onClose }: VisitorDetailModalProps) {
  const [data, setData] = useState<VisitorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    basicInfo: false,
    intent: false,
    stats: false,
    contactStats: false,
    pageViews: false,
    contactClicks: false,
    chatSessions: false
  });
  const [expandedChats, setExpandedChats] = useState<string[]>([]);

  useEffect(() => {
    const fetchVisitorDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/analytics/visitor/${visitorId}`);
        if (!response.ok) throw new Error('Ziyaretçi bilgisi alınamadı');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
    fetchVisitorDetails();
  }, [visitorId]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleChat = (chatId: string) => {
    setExpandedChats(prev => prev.includes(chatId) ? prev.filter(id => id !== chatId) : [...prev, chatId]);
  };

  const getDeviceIcon = (device: string) => {
    switch (device?.toLowerCase()) {
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'tablet': return <Tablet className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4 text-blue-500" />;
      case 'phone': return <Phone className="w-4 h-4 text-green-500" />;
      case 'whatsapp': return <MessageCircle className="w-4 h-4 text-emerald-500" />;
      default: return <MousePointer className="w-4 h-4" />;
    }
  };

  const getContactLabel = (type: string) => {
    switch (type) {
      case 'email': return 'E-posta';
      case 'phone': return 'Telefon';
      case 'whatsapp': return 'WhatsApp';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-700">Yükleniyor...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md">
          <div className="text-red-600 mb-4">Hata: {error}</div>
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Kapat</button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const potential = getPotentialLabel(calculateCustomerPotential(data.stats, data.visitor));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-slate-800">{data.visitor.userName || 'Ziyaretçi Detayları'}</h2>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${potential.bgColor} ${potential.color}`}>
                  {potential.emoji} {potential.label}
                </span>
                {data.visitor.hasBooking && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">📅 Randevu Aldı</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm mt-1">
                {data.visitor.userPhone && (
                  <>
                    <Phone className="w-3.5 h-3.5" />
                    <span className="font-medium">{data.visitor.userPhone}</span>
                    <span className="mx-1">•</span>
                  </>
                )}
                <span className="text-slate-500 font-mono text-xs">ID: {visitorId.slice(0, 12)}...</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          
          {/* Temel Bilgiler - Collapsible */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('basicInfo')}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-slate-500" />
                <span className="font-medium text-slate-800">Temel Bilgiler</span>
              </div>
              {expandedSections.basicInfo ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {expandedSections.basicInfo && (
              <div className="border-t border-slate-200 p-4 bg-slate-50/30">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    {getDeviceIcon(data.visitor.device)}
                    <div>
                      <div className="text-xs text-slate-500">Cihaz</div>
                      <div className="font-medium text-slate-800">{data.visitor.device}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500">Tarayıcı</div>
                      <div className="font-medium text-slate-800">{data.visitor.browser} {data.visitor.browserVersion}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500">İlk Ziyaret</div>
                      <div className="font-medium text-slate-800">{data.visitor.firstVisitFormatted}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500">Son Ziyaret</div>
                      <div className="font-medium text-slate-800">{data.visitor.lastVisitFormatted}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500">Toplam Ziyaret</div>
                      <div className="font-medium text-slate-800">{data.visitor.totalVisits}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500">Sitede Geçirilen Süre</div>
                      <div className="font-medium text-slate-800">{data.stats.timeSpentFormatted}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ziyaretçi Amacı - Collapsible */}
          {data.chatSessions && data.chatSessions.length > 0 && data.chatSessions[0].intent && (
            <div className="border border-indigo-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('intent')}
                className="w-full flex items-center justify-between p-4 hover:bg-indigo-50/50 transition-colors bg-gradient-to-r from-indigo-50/50 to-purple-50/50"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-indigo-900">Ziyaretçi Amacı</span>
                  <span className="text-indigo-600 font-semibold">
                    {data.chatSessions[0].intent === 'diger' ? '💬 Diğer' :
                     data.chatSessions[0].intent === 'fiyat' ? '💰 Fiyat' :
                     data.chatSessions[0].intent === 'randevu' ? '📅 Randevu' :
                     data.chatSessions[0].intent === 'bilgi' ? 'ℹ️ Bilgi' :
                     data.chatSessions[0].intent === 'sikayet' ? '😤 Şikayet' :
                     data.chatSessions[0].intent === 'destek' ? '🛠️ Destek' :
                     data.chatSessions[0].intent}
                  </span>
                </div>
                {expandedSections.intent ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-indigo-600" />}
              </button>
              {expandedSections.intent && (
                <div className="border-t border-indigo-200 p-4 bg-indigo-50/30">
                  <p className="text-indigo-700">
                    Bu ziyaretçi chatbot ile <strong>{
                      data.chatSessions[0].intent === 'diger' ? 'genel sohbet' :
                      data.chatSessions[0].intent === 'fiyat' ? 'fiyat sorgusu' :
                      data.chatSessions[0].intent === 'randevu' ? 'randevu talebi' :
                      data.chatSessions[0].intent === 'bilgi' ? 'bilgi talebi' :
                      data.chatSessions[0].intent === 'sikayet' ? 'şikayet bildirimi' :
                      data.chatSessions[0].intent === 'destek' ? 'destek talebi' :
                      data.chatSessions[0].intent
                    }</strong> amacıyla iletişime geçti.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* İstatistikler - Collapsible */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('stats')}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-slate-500" />
                <span className="font-medium text-slate-800">İstatistikler</span>
                <span className="text-slate-500 text-sm">
                  ({data.stats.totalPageViews} görüntüleme, {data.stats.totalChatMessages} mesaj)
                </span>
              </div>
              {expandedSections.stats ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {expandedSections.stats && (
              <div className="border-t border-slate-200 p-4 bg-slate-50/30">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{data.stats.totalPageViews}</div>
                    <div className="text-xs text-slate-500">Sayfa Görüntüleme</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{data.stats.uniquePages}</div>
                    <div className="text-xs text-slate-500">Benzersiz Sayfa</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{data.stats.totalContactClicks}</div>
                    <div className="text-xs text-slate-500">İletişim Tıklaması</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{data.stats.totalChatMessages}</div>
                    <div className="text-xs text-slate-500">Chat Mesajı</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* İletişim Tıklamaları - Collapsible */}
          {data.stats.totalContactClicks > 0 && (
            <div className="border border-amber-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('contactStats')}
                className="w-full flex items-center justify-between p-4 hover:bg-amber-50/50 transition-colors bg-amber-50/30"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-amber-600" />
                  <span className="font-medium text-slate-800">İletişim Tıklamaları</span>
                  <span className="text-amber-600 text-sm font-medium">({data.stats.totalContactClicks} tıklama)</span>
                </div>
                {expandedSections.contactStats ? <ChevronUp className="w-5 h-5 text-amber-600" /> : <ChevronDown className="w-5 h-5 text-amber-600" />}
              </button>
              {expandedSections.contactStats && (
                <div className="border-t border-amber-200 p-4 bg-amber-50/20">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span className="text-slate-700">{data.stats.emailClicks} Email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span className="text-slate-700">{data.stats.phoneClicks} Telefon</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-slate-700">{data.stats.whatsappClicks} WhatsApp</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sayfa Görüntülemeleri - Expandable */}
          {data.pageViews.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('pageViews')}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-slate-500" />
                  <span className="font-medium text-slate-800">Sayfa Görüntülemeleri</span>
                  <span className="text-slate-500 text-sm">({data.pageViews.length})</span>
                </div>
                {expandedSections.pageViews ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedSections.pageViews && (
                <div className="border-t border-slate-200 max-h-48 overflow-y-auto">
                  {data.pageViews.map((pv, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-0">
                      <span className="text-slate-700 font-mono text-sm">{pv.path}</span>
                      <span className="text-slate-500 text-xs">{pv.formattedTime}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* İletişim Geçmişi - Expandable */}
          {data.contactClicks.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('contactClicks')}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MousePointer className="w-5 h-5 text-slate-500" />
                  <span className="font-medium text-slate-800">İletişim Geçmişi</span>
                  <span className="text-slate-500 text-sm">({data.contactClicks.length})</span>
                </div>
                {expandedSections.contactClicks ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedSections.contactClicks && (
                <div className="border-t border-slate-200 max-h-48 overflow-y-auto">
                  {data.contactClicks.map((cc, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-2">
                        {getContactIcon(cc.type)}
                        <span className="text-slate-800">{getContactLabel(cc.type)}</span>
                        <span className="text-slate-500 text-sm">{cc.value}</span>
                      </div>
                      <span className="text-slate-500 text-xs">{cc.formattedTime}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Chat Oturumları - Expandable */}
          {data.chatSessions.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('chatSessions')}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-slate-500" />
                  <span className="font-medium text-slate-800">Chat Oturumları</span>
                  <span className="text-slate-500 text-sm">({data.chatSessions.length})</span>
                </div>
                {expandedSections.chatSessions ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedSections.chatSessions && (
                <div className="border-t border-slate-200">
                  {data.chatSessions.map((session) => (
                    <div key={session.id} className="border-b border-slate-100 last:border-0">
                      <button
                        onClick={() => toggleChat(session.id)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-800">{session.formattedTime}</span>
                            <span className="text-slate-500 text-sm">({session.messageCount} mesaj)</span>
                          </div>
                          {session.intent && (
                            <div className="text-sm text-indigo-600 mt-1">Amaç: {session.intent}</div>
                          )}
                        </div>
                        {expandedChats.includes(session.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expandedChats.includes(session.id) && (
                        <div className="px-4 pb-4 space-y-2 max-h-64 overflow-y-auto bg-slate-50">
                          {session.messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                                msg.sender === 'user' 
                                  ? 'bg-blue-500 text-white' 
                                  : 'bg-white border border-slate-200 text-slate-800'
                              }`}>
                                <div>{msg.message}</div>
                                <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                                  {msg.time}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-slate-50 flex justify-end">
          <button onClick={onClose} className="px-6 py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors">
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
