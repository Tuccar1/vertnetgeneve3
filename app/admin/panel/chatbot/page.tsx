'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Bot,
  MessageCircle,
  User,
  Phone,
  Clock,
  Calendar,
  CalendarDays,
  RefreshCw,
  Download,
  Filter,
  ChevronDown,
  ChevronUp,
  MapPin,
  Globe,
  Target,
  TrendingUp,
  MessageSquare,
  X,
  Send,
  Smartphone,
  Monitor,
  Laptop,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  HelpCircle,
  BarChart3
} from 'lucide-react';

type DateFilter = 'today' | '7days' | '30days' | 'all' | 'custom';

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

interface ChatSessionData {
  id: string;
  visitorId: string;
  userName: string | null;
  userPhone: string | null;
  ip: string;
  device: string;
  browser: string;
  location?: {
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

interface ChatAnalyticsData {
  overview: {
    totalChats: number;
    todayChats: number;
    avgMessageCount: number;
    avgDuration: number;
    appointmentRequests: number;
    infoRequests: number;
    priceInquiries: number;
  };
  intentBreakdown: Record<string, number>;
  sessions: ChatSessionData[];
  topQuestions?: TopQuestion[];
}

interface TopQuestion {
  category: string;
  count: number;
  examples: string[];
  intent: string;
  percentage: number;
}

// Niyet renkleri ve Türkçe karşılıkları (Light theme - Viva Goals style)
const intentConfig: Record<string, { label: string; color: string; bgColor: string; icon: string }> = {
  'randevu': { label: 'Randevu Talebi', color: 'text-green-700', bgColor: 'bg-green-50', icon: '📅' },
  'fiyat': { label: 'Fiyat Sorgusu', color: 'text-blue-700', bgColor: 'bg-blue-50', icon: '💰' },
  'bilgi': { label: 'Bilgi Alma', color: 'text-amber-700', bgColor: 'bg-amber-50', icon: 'ℹ️' },
  'sikayet': { label: 'Şikayet', color: 'text-red-700', bgColor: 'bg-red-50', icon: '⚠️' },
  'contact': { label: 'İletişim', color: 'text-cyan-700', bgColor: 'bg-cyan-50', icon: '📞' },
  'devis': { label: 'Teklif Talebi', color: 'text-indigo-700', bgColor: 'bg-indigo-50', icon: '📋' },
  'urgence': { label: 'Acil Talep', color: 'text-orange-700', bgColor: 'bg-orange-50', icon: '🚨' },
  'merci': { label: 'Teşekkür', color: 'text-emerald-700', bgColor: 'bg-emerald-50', icon: '🙏' },
  'diger': { label: 'Diğer', color: 'text-gray-600', bgColor: 'bg-gray-100', icon: '💬' }
};

export default function ChatbotAnalytics() {
  const [analytics, setAnalytics] = useState<ChatAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [intentFilter, setIntentFilter] = useState<string>('all');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [connectionError, setConnectionError] = useState<string>('');
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  // Flowise bağlantısını kontrol et
  const checkFlowiseConnection = async () => {
    setConnectionStatus('checking');
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Bonjour' }),
      });
      const data = await response.json();
      
      // Hata mesajları kontrolü
      const errorMessages = [
        'difficultés techniques',
        'temporairement indisponible',
        'problème de configuration',
        'problème technique'
      ];
      
      const hasError = errorMessages.some(msg => data.answer?.includes(msg));
      
      if (data.answer && !hasError) {
        setConnectionStatus('connected');
        setConnectionError('');
      } else {
        setConnectionStatus('error');
        if (data.answer?.includes('configuration')) {
          setConnectionError('Flowise chatflow credential hatası. Flowise panelinden Agent node credential\'larını kontrol edin.');
        } else {
          setConnectionError('Flowise bağlantısında sorun var. Flowise panelini kontrol edin.');
        }
      }
    } catch (error) {
      setConnectionStatus('error');
      setConnectionError('Flowise API bağlantısı kurulamadı.');
    }
  };

  const fetchAnalytics = async (filter?: DateFilter, startDate?: string, endDate?: string) => {
    try {
      const params = new URLSearchParams();
      params.append('filter', filter || dateFilter);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(`/api/analytics/chatbot?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch chatbot analytics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    checkFlowiseConnection();
    const interval = setInterval(() => fetchAnalytics(), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAnalytics(dateFilter, customStartDate, customEndDate);
  };

  const handleDateFilterChange = (filter: DateFilter) => {
    setDateFilter(filter);
    if (filter !== 'custom') {
      setShowDatePicker(false);
      fetchAnalytics(filter);
    } else {
      setShowDatePicker(true);
    }
  };

  const handleCustomDateApply = () => {
    if (customStartDate && customEndDate) {
      fetchAnalytics('custom', customStartDate, customEndDate);
      setShowDatePicker(false);
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds} saniye`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes < 60) return `${minutes} dk ${secs} sn`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} saat ${mins} dk`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateKey = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // yyyy-mm-dd
  };

  const formatDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDeviceIcon = (device: string) => {
    const d = device?.toLowerCase() || '';
    if (d.includes('mobile') || d.includes('android') || d.includes('iphone')) {
      return <Smartphone className="w-4 h-4" />;
    } else if (d.includes('tablet') || d.includes('ipad')) {
      return <Laptop className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
  };

  const exportToCSV = () => {
    if (!analytics) return;

    const csv = [
      ['ID', 'İsim', 'Telefon', 'IP', 'Ülke', 'Şehir', 'Cihaz', 'Tarayıcı', 'Mesaj Sayısı', 'Süre (sn)', 'Niyet', 'Başlangıç Tarihi'].join(','),
      ...analytics.sessions.map(s => [
        s.id,
        s.userName || 'Anonim',
        s.userPhone || '-',
        s.ip || '-',
        s.location?.country || '-',
        s.location?.city || '-',
        s.device || '-',
        s.browser || '-',
        s.messageCount,
        s.duration,
        intentConfig[s.intent]?.label || s.intent,
        s.startTime
      ].join(','))
    ].join('\n');

    const now = new Date().toISOString().split('T')[0];
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chatbot_konusmalari_${dateFilter}_${now}.csv`;
    link.click();
  };

  // Filtrelenmiş oturumlar
  const filteredSessions = useMemo(() => 
    analytics?.sessions.filter(s => 
      intentFilter === 'all' || s.intent === intentFilter
    ) || []
  , [analytics?.sessions, intentFilter]);

  const groupedByDate = useMemo(() => 
    filteredSessions.reduce<Record<string, ChatSessionData[]>>((acc, session) => {
      const key = formatDateKey(session.startTime);
      if (!acc[key]) acc[key] = [];
      acc[key].push(session);
      return acc;
    }, {})
  , [filteredSessions]);

  const sortedDateKeys = useMemo(() => 
    Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a))
  , [groupedByDate]);

  // Track if initial selection has been made
  const initializedRef = useRef(false);

  useEffect(() => {
    if (sortedDateKeys.length === 0) {
      setSelectedSessionId(null);
      setExpandedDates(new Set());
      initializedRef.current = false;
      return;
    }

    // Only set initial values once
    if (!initializedRef.current) {
      initializedRef.current = true;
      setExpandedDates(new Set([sortedDateKeys[0]]));
      const flatSessions = sortedDateKeys.flatMap((k) => groupedByDate[k]);
      setSelectedSessionId(flatSessions[0]?.id || null);
    }
  }, [sortedDateKeys, groupedByDate]);

  const selectedSession = filteredSessions.find(s => s.id === selectedSessionId) || null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500">Chatbot verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Flowise Bağlantı Durumu Banner */}
      {connectionStatus === 'error' && (
        <div className="admin-card p-4 border-l-4 border-l-red-500 bg-red-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-red-800">Flowise Bağlantı Hatası</h3>
              <p className="text-sm text-red-600 mt-1">{connectionError}</p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={checkFlowiseConnection}
                  className="text-sm px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
                >
                  Yeniden Dene
                </button>
                <a
                  href="https://flowise.chatdeskiyo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors flex items-center gap-1"
                >
                  Flowise Paneli <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {connectionStatus === 'connected' && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-green-200 bg-green-50">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex-1">
            <span className="font-medium text-green-800">Chatbot Aktif</span>
            <span className="text-green-400 mx-2">•</span>
            <span className="text-sm text-green-600">Flowise bağlantısı başarılı</span>
          </div>
        </div>
      )}
      
      {connectionStatus === 'checking' && (
        <div className="admin-card p-4">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-gray-400 animate-spin" />
            <p className="text-sm text-gray-500">Flowise bağlantısı kontrol ediliyor...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="admin-card p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-gray-900">Chatbot Konuşmaları</h1>
            <p className="text-sm text-gray-500">Tüm etkileşimler, formlar ve kategoriler tek ekranda</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-white hover:bg-gray-50 text-gray-700 rounded-md transition-colors border border-gray-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Yenile
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Dışa Aktar
            </button>
          </div>
        </div>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="admin-card p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Toplam Konuşma</p>
          <p className="text-2xl font-bold text-gray-900">{analytics?.overview.totalChats || 0}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Bugün</p>
          <p className="text-2xl font-bold text-green-600">{analytics?.overview.todayChats || 0}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Ort. Mesaj</p>
          <p className="text-2xl font-bold text-gray-900">{analytics?.overview.avgMessageCount?.toFixed(1) || 0}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Ort. Süre</p>
          <p className="text-2xl font-bold text-gray-900">{formatDuration(analytics?.overview.avgDuration || 0)}</p>
        </div>
      </div>

      {/* Tarih Filtreleri */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 admin-card-muted p-1.5">
          {[
            { key: 'today', label: 'Bugün' },
            { key: '7days', label: '7 Gün' },
            { key: '30days', label: '30 Gün' },
            { key: 'all', label: 'Tümü' },
            { key: 'custom', label: 'Özel' }
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => handleDateFilterChange(f.key as DateFilter)}
              className={`px-3 py-1.5 text-sm rounded-md transition-all admin-pill ${
                dateFilter === f.key
                  ? 'admin-pill-active font-medium'
                  : ''
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Özel Tarih Seçici */}
        {showDatePicker && (
          <div className="flex items-center gap-2 admin-card-muted p-2">
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="px-3 py-1.5 rounded text-sm"
            />
            <span className="text-gray-400">—</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="px-3 py-1.5 rounded text-sm"
            />
            <button
              onClick={handleCustomDateApply}
              className="px-3 py-1.5 bg-indigo-600 text-white font-medium rounded text-sm hover:bg-indigo-700 transition-colors"
            >
              Uygula
            </button>
          </div>
        )}
      </div>

      {/* Niyet İstatistikleri - Kompakt */}
      <div className="admin-card p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-500 mr-2">Kategoriler:</span>
          {Object.entries(intentConfig).map(([key, config]) => {
            const count = analytics?.intentBreakdown[key] || 0;
            const isActive = intentFilter === key;
            
            return (
              <button
                key={key}
                onClick={() => setIntentFilter(isActive ? 'all' : key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{config.icon}</span>
                <span>{config.label}</span>
                <span className={`ml-1 px-1.5 py-0.5 rounded text-xs ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* En Çok Sorulan Sorular */}
      {analytics?.topQuestions && analytics.topQuestions.length > 0 && (
        <div className="admin-card overflow-hidden">
          <div className="p-4 admin-card-header flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <h2 className="font-semibold text-gray-900">En Çok Sorulan Sorular</h2>
            </div>
            <span className="text-xs text-gray-500 bg-amber-50 text-amber-700 px-2 py-1 rounded">
              Müşteriler Ne Soruyor?
            </span>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analytics.topQuestions.map((question, index) => {
                // Kategori ikonları
                const categoryIcons: Record<string, string> = {
                  'Fiyat/Tarif Soruları': '💰',
                  'Randevu Soruları': '📅',
                  'Hizmet Bilgisi': 'ℹ️',
                  'Mobilya/Tekstil Temizliği': '🛋️',
                  'Fin de Bail (Taşınma)': '🏠',
                  'Cam Temizliği': '🪟',
                  'Kurumsal Temizlik': '🏢',
                  'Bina/Apartman Temizliği': '🏗️',
                  'Dış Cephe/Çatı': '🏚️',
                  'Acil Talepler': '🚨',
                  'İletişim Bilgisi': '📞',
                  'Bölge/Kapsam Soruları': '📍',
                  'Teşekkür/Memnuniyet': '🙏',
                  'Selamlaşma': '👋',
                  'Diğer Sorular': '💬'
                };

                // Kategori renkleri
                const categoryColors: Record<string, { bg: string; text: string; bar: string }> = {
                  'Fiyat/Tarif Soruları': { bg: 'bg-blue-50', text: 'text-blue-700', bar: 'bg-blue-500' },
                  'Randevu Soruları': { bg: 'bg-green-50', text: 'text-green-700', bar: 'bg-green-500' },
                  'Hizmet Bilgisi': { bg: 'bg-amber-50', text: 'text-amber-700', bar: 'bg-amber-500' },
                  'Mobilya/Tekstil Temizliği': { bg: 'bg-purple-50', text: 'text-purple-700', bar: 'bg-purple-500' },
                  'Fin de Bail (Taşınma)': { bg: 'bg-orange-50', text: 'text-orange-700', bar: 'bg-orange-500' },
                  'Cam Temizliği': { bg: 'bg-cyan-50', text: 'text-cyan-700', bar: 'bg-cyan-500' },
                  'Kurumsal Temizlik': { bg: 'bg-indigo-50', text: 'text-indigo-700', bar: 'bg-indigo-500' },
                  'Bina/Apartman Temizliği': { bg: 'bg-teal-50', text: 'text-teal-700', bar: 'bg-teal-500' },
                  'Dış Cephe/Çatı': { bg: 'bg-slate-50', text: 'text-slate-700', bar: 'bg-slate-500' },
                  'Acil Talepler': { bg: 'bg-red-50', text: 'text-red-700', bar: 'bg-red-500' },
                  'İletişim Bilgisi': { bg: 'bg-pink-50', text: 'text-pink-700', bar: 'bg-pink-500' },
                  'Bölge/Kapsam Soruları': { bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-500' },
                  'Teşekkür/Memnuniyet': { bg: 'bg-lime-50', text: 'text-lime-700', bar: 'bg-lime-500' },
                  'Selamlaşma': { bg: 'bg-sky-50', text: 'text-sky-700', bar: 'bg-sky-500' },
                  'Diğer Sorular': { bg: 'bg-gray-50', text: 'text-gray-700', bar: 'bg-gray-500' }
                };

                const icon = categoryIcons[question.category] || '💬';
                const colors = categoryColors[question.category] || { bg: 'bg-gray-50', text: 'text-gray-700', bar: 'bg-gray-500' };

                return (
                  <div 
                    key={question.category} 
                    className={`${colors.bg} rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{icon}</span>
                        <span className={`font-medium text-sm ${colors.text}`}>{question.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">{question.count}</span>
                        <span className="text-xs text-gray-500">soru</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-200 rounded-full mb-3 overflow-hidden">
                      <div 
                        className={`h-full ${colors.bar} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(question.percentage * 2, 100)}%` }}
                      />
                    </div>

                    {/* Percentage */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500">Tüm mesajların</span>
                      <span className={`text-sm font-semibold ${colors.text}`}>%{question.percentage}</span>
                    </div>

                    {/* Example Questions */}
                    {question.examples.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500 font-medium">Örnek sorular:</p>
                        {question.examples.slice(0, 2).map((example, exIndex) => (
                          <p 
                            key={exIndex} 
                            className="text-xs text-gray-600 bg-white/60 rounded px-2 py-1.5 line-clamp-2"
                            title={example}
                          >
                            "{example.length > 80 ? example.substring(0, 80) + '...' : example}"
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Özet İstatistik */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BarChart3 className="w-4 h-4" />
                <span>
                  Toplam {analytics.topQuestions.reduce((sum, q) => sum + q.count, 0)} kullanıcı mesajı analiz edildi
                </span>
              </div>
              <div className="text-xs text-gray-400">
                Seçilen tarih aralığına göre
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Konuşma Geçmişi - Profesyonel Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Sol: Konuşma Listesi (Tarihe göre gruplanmış) */}
        <div className="xl:col-span-1 admin-card overflow-hidden">
          <div className="p-4 admin-card-header flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-indigo-500" />
              Konuşma Geçmişi
            </h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{filteredSessions.length} kayıt</span>
          </div>

          {filteredSessions.length === 0 ? (
            <div className="p-12 text-center">
              <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Henüz chatbot konuşması bulunmuyor</p>
              <p className="text-sm text-gray-400 mt-1">Kullanıcılar chatbot ile etkileşime geçtiğinde burada görünecek</p>
            </div>
          ) : (
            <div className="max-h-[720px] overflow-y-auto">
              {sortedDateKeys.map((dateKey) => {
                const sessions = groupedByDate[dateKey];
                const isExpanded = expandedDates.has(dateKey);
                return (
                  <div key={dateKey}>
                    <button
                      onClick={() => setExpandedDates(prev => {
                        const next = new Set(prev);
                        if (next.has(dateKey)) next.delete(dateKey); else next.add(dateKey);
                        return next;
                      })}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <CalendarDays className="w-4 h-4 text-indigo-500" />
                        <span className="font-semibold text-gray-900">{formatDateLabel(dateKey)}</span>
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{sessions.length} konuşma</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="border-t border-gray-100 divide-y divide-gray-100">
                        {sessions.map((session) => {
                          const isSelected = selectedSessionId === session.id;
                          const intent = intentConfig[session.intent] || intentConfig['diger'];
                          const hasContact = Boolean(session.userName || session.userPhone);

                          return (
                            <button
                              key={session.id}
                              onClick={() => setSelectedSessionId(session.id)}
                              className={`w-full px-4 py-4 text-left transition-colors ${
                                isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-gray-900 truncate">
                                      {session.userName || 'Anonim Ziyaretçi'}
                                    </span>
                                    {session.userPhone && (
                                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                                        {session.userPhone}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>{session.messageCount} mesaj</span>
                                    <span>•</span>
                                    <span>{formatDuration(session.duration)}</span>
                                    <span>•</span>
                                    <span>{formatTime(session.startTime)}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <span className={`text-[11px] px-2 py-0.5 rounded ${intent.bgColor} ${intent.color}`}>
                                    {intent.icon} {intent.label}
                                  </span>
                                  <span className={`text-[10px] px-2 py-0.5 rounded ${
                                    hasContact ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                                  }`}>
                                    {hasContact ? 'Form Dolduruldu' : 'Form Yok'}
                                  </span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sağ: Konuşma Detayı */}
        <div className="xl:col-span-2 admin-card overflow-hidden">
          <div className="p-4 admin-card-header">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Konuşma Detayı</h2>
                <p className="text-sm text-gray-500">Seçilen kişiyle tüm mesajlar</p>
              </div>
              {selectedSession && (
                <span className="text-xs text-gray-500">{formatDate(selectedSession.startTime)}</span>
              )}
            </div>
          </div>

          {!selectedSession ? (
            <div className="p-12 text-center">
              <MessageSquare className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Detayları görmek için soldan bir kişi seçin</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Profil Özeti */}
              <div className="lg:col-span-1 border-r border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
                    {(selectedSession.userName || 'A')[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {selectedSession.userName || 'Anonim Ziyaretçi'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedSession.userPhone || 'Telefon bilgisi yok'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{selectedSession.location?.country || 'Bilinmiyor'} / {selectedSession.location?.city || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(selectedSession.device)}
                    <span>{selectedSession.device || 'Cihaz bilgisi yok'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{selectedSession.messageCount} mesaj</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(selectedSession.duration)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs text-gray-500">Kategori</span>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      (intentConfig[selectedSession.intent] || intentConfig['diger']).bgColor
                    } ${(intentConfig[selectedSession.intent] || intentConfig['diger']).color}`}>
                      {(intentConfig[selectedSession.intent] || intentConfig['diger']).icon} {(intentConfig[selectedSession.intent] || intentConfig['diger']).label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mesaj Akışı */}
              <div className="lg:col-span-2 p-4">
                <div className="space-y-3 max-h-[560px] overflow-y-auto">
                  {selectedSession.messages.length === 0 ? (
                    <p className="text-center text-gray-400 py-6 text-sm">
                      Bu konuşmada mesaj kaydı bulunmuyor
                    </p>
                  ) : (
                    selectedSession.messages.map((msg, msgIndex) => (
                      <div
                        key={msgIndex}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="max-w-[75%]">
                          <div className={`px-3 py-2 rounded-lg text-sm ${
                            msg.sender === 'user'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                          </div>
                          <span className="text-xs text-gray-400 mt-1 block px-1">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500">
                  {selectedSession.messages.filter(m => m.sender === 'user').length} kullanıcı • {selectedSession.messages.filter(m => m.sender === 'bot').length} bot • {formatDuration(selectedSession.duration)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
