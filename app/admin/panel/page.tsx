'use client';

import { useState, useEffect } from 'react';
import { Card, StatCard } from '@/components/admin/Card';
import { DataTable, Badge } from '@/components/admin/DataTable';
import { Button } from '@/components/admin/Button';
import VisitorDetailModal from '@/components/admin/VisitorDetailModal';
import Link from 'next/link';
import {
  Users,
  FileText,
  MessageSquare,
  Calendar,
  Eye,
  Plus,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  MousePointer,
  MessageCircle,
  RefreshCw,
  Download,
  Filter,
  CalendarDays,
  AlertTriangle,
  AlertCircle,
  ArrowRight,
  Target,
  Lightbulb,
  DollarSign,
  Star,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  User
} from 'lucide-react';

type DateFilter = 'today' | '7days' | '30days' | 'all' | 'custom';

interface AnalyticsData {
  overview: {
    totalUniqueVisitors: number;
    todayVisitors: number;
    yesterdayVisitors: number;
    visitorChange: number;
    totalPageViews: number;
    todayPageViews: number;
    totalSessions: number;
    activeSessions: number;
    avgSessionDuration: number;
    chatbotUsersToday: number;
    totalChatbotUsers: number;
  };
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
    unknown: number;
  };
  browserBreakdown: Record<string, number>;
  topPages: { path: string; views: number }[];
  recentVisitors: {
    id: string;
    visitorId: string;
    ip: string;
    device: string;
    browser: string;
    os: string;
    country: string;
    city: string;
    firstVisit: string;
    lastVisit: string;
    totalVisits: number;
    recentPages: string[];
    hasChatted: boolean;
  }[];
  visitorsByDay?: Record<string, {
    id: string;
    visitorId: string;
    ip: string;
    device: string;
    browser: string;
    os: string;
    country: string | null;
    city: string | null;
    firstVisit: string;
    lastVisit: string;
    totalVisits: number;
    recentPages: string[];
    hasChatted: boolean;
    userName: string | null;
    userPhone: string | null;
    hasBooking: boolean;
    intent: string | null;
  }[]>;
  countryStats: { country: string; count: number }[];
  dailyTrend?: { date: string; visitors: number; pageViews: number; chatbotUsers: number }[];
  contactClickStats?: {
    email: number;
    phone: number;
    whatsapp: number;
    total: number;
    todayEmail: number;
    todayPhone: number;
    todayWhatsapp: number;
  };
}

interface InsightsData {
  anomalies: { type: string; message: string; severity: 'low' | 'medium' | 'high' }[];
  funnel: {
    visitors: number;
    pageViewers: number;
    chatbotUsers: number;
    contactAttempts: number;
    conversionRate: number;
  };
}

interface ActivityEvent {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(null);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);

  const fetchAnalytics = async (filter?: DateFilter, startDate?: string, endDate?: string) => {
    try {
      const params = new URLSearchParams();
      params.append('filter', filter || dateFilter);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(`/api/analytics/stats?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
        
        // Auto-expand today's visitors or first day
        if (data?.visitorsByDay && expandedDays.length === 0) {
          const today = new Date().toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          if (data.visitorsByDay[today]) {
            setExpandedDays([today]);
          } else {
            const firstDay = Object.keys(data.visitorsByDay)[0];
            if (firstDay) setExpandedDays([firstDay]);
          }
        }
        
        // Save to localStorage for persistence
        localStorage.setItem('analytics_data', JSON.stringify({
          data,
          timestamp: Date.now(),
          filter: filter || dateFilter
        }));
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Try to load from localStorage
      const cached = localStorage.getItem('analytics_data');
      if (cached) {
        const { data } = JSON.parse(cached);
        setAnalytics(data);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchInsights = async () => {
    try {
      const response = await fetch('/api/analytics/insights');
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
      }
    } catch (error) {
      console.error('Failed to fetch insights:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/analytics/activity');
      if (response.ok) {
        const data = await response.json();
        setActivities(data.activities.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  useEffect(() => {
    // Load cached data first
    const cached = localStorage.getItem('analytics_data');
    if (cached) {
      const { data, filter } = JSON.parse(cached);
      setAnalytics(data);
      setDateFilter(filter || 'all');
      setLoading(false);
      
      // Auto-expand today's visitors
      if (data?.visitorsByDay) {
        const today = new Date().toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        if (data.visitorsByDay[today]) {
          setExpandedDays([today]);
        } else {
          // Expand the first day if today doesn't exist
          const firstDay = Object.keys(data.visitorsByDay)[0];
          if (firstDay) setExpandedDays([firstDay]);
        }
      }
    }
    
    fetchAnalytics();
    fetchInsights();
    fetchActivities();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(() => {
      fetchAnalytics();
      fetchInsights();
      fetchActivities();
    }, 30000);
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

  // Export data as CSV
  const exportToCSV = () => {
    if (!analytics) return;

    // Visitors CSV
    const visitorsCSV = [
      ['ID', 'IP', 'Cihaz', 'Tarayıcı', 'İşletim Sistemi', 'İlk Ziyaret', 'Son Ziyaret', 'Toplam Ziyaret', 'Chatbot Kullandı'].join(','),
      ...analytics.recentVisitors.map(v => [
        v.id,
        v.ip || 'Bilinmiyor',
        v.device || 'Bilinmiyor',
        v.browser || 'Bilinmiyor',
        v.os || 'Bilinmiyor',
        v.firstVisit,
        v.lastVisit,
        v.totalVisits,
        v.hasChatted ? 'Evet' : 'Hayır'
      ].join(','))
    ].join('\n');

    // Summary CSV
    const summaryCSV = [
      'Metrik,Değer',
      `Toplam Benzersiz Ziyaretçi,${analytics.overview.totalUniqueVisitors}`,
      `Bugün Ziyaretçi,${analytics.overview.todayVisitors}`,
      `Dünkü Ziyaretçi,${analytics.overview.yesterdayVisitors}`,
      `Toplam Sayfa Görüntüleme,${analytics.overview.totalPageViews}`,
      `Bugün Sayfa Görüntüleme,${analytics.overview.todayPageViews}`,
      `Toplam Oturum,${analytics.overview.totalSessions}`,
      `Aktif Oturum,${analytics.overview.activeSessions}`,
      `Ortalama Oturum Süresi (sn),${analytics.overview.avgSessionDuration}`,
      `Bugün Chatbot Kullanımı,${analytics.overview.chatbotUsersToday}`,
      `Toplam Chatbot Kullanımı,${analytics.overview.totalChatbotUsers}`,
      '',
      'Cihaz Dağılımı',
      `Desktop,${analytics.deviceBreakdown.desktop}`,
      `Mobile,${analytics.deviceBreakdown.mobile}`,
      `Tablet,${analytics.deviceBreakdown.tablet}`,
      '',
      'En Çok Ziyaret Edilen Sayfalar',
      ...analytics.topPages.map(p => `${p.path},${p.views}`)
    ].join('\n');

    // Create download
    const now = new Date().toISOString().split('T')[0];
    const filterText = dateFilter === 'custom' ? `${customStartDate}_${customEndDate}` : dateFilter;
    
    // Download visitors
    const visitorsBlob = new Blob(['\uFEFF' + visitorsCSV], { type: 'text/csv;charset=utf-8;' });
    const visitorsUrl = URL.createObjectURL(visitorsBlob);
    const visitorsLink = document.createElement('a');
    visitorsLink.href = visitorsUrl;
    visitorsLink.download = `ziyaretciler_${filterText}_${now}.csv`;
    visitorsLink.click();

    // Download summary
    setTimeout(() => {
      const summaryBlob = new Blob(['\uFEFF' + summaryCSV], { type: 'text/csv;charset=utf-8;' });
      const summaryUrl = URL.createObjectURL(summaryBlob);
      const summaryLink = document.createElement('a');
      summaryLink.href = summaryUrl;
      summaryLink.download = `ozet_istatistikler_${filterText}_${now}.csv`;
      summaryLink.click();
    }, 500);
  };

  // Export as JSON
  const exportToJSON = () => {
    if (!analytics) return;

    const now = new Date().toISOString().split('T')[0];
    const filterText = dateFilter === 'custom' ? `${customStartDate}_${customEndDate}` : dateFilter;
    
    const jsonBlob = new Blob([JSON.stringify(analytics, null, 2)], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = `analytics_${filterText}_${now}.json`;
    jsonLink.click();
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}dk ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDeviceIcon = (device: string) => {
    switch (device?.toLowerCase()) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const getBrowserColor = (browser: string) => {
    const colors: Record<string, string> = {
      'Chrome': 'bg-yellow-500',
      'Firefox': 'bg-orange-500',
      'Safari': 'bg-blue-500',
      'Edge': 'bg-cyan-500',
      'Opera': 'bg-red-500',
    };
    return colors[browser] || 'bg-slate-500';
  };

  // Visitor table columns
  const visitorColumns = [
    { 
      key: 'device', 
      header: 'Cihaz',
      render: (item: AnalyticsData['recentVisitors'][0]) => (
        <div className="flex items-center gap-2">
          {getDeviceIcon(item.device)}
          <span className="text-xs text-slate-400">{item.device || 'Unknown'}</span>
        </div>
      )
    },
    { key: 'browser', header: 'Tarayıcı' },
    { key: 'os', header: 'İşletim Sistemi' },
    { 
      key: 'ip', 
      header: 'IP Adresi',
      render: (item: AnalyticsData['recentVisitors'][0]) => (
        <span className="font-mono text-sm min-w-[120px] inline-block">{item.ip || 'Bilinmiyor'}</span>
      )
    },
    { 
      key: 'totalVisits', 
      header: 'Ziyaret Sayısı',
      render: (item: AnalyticsData['recentVisitors'][0]) => (
        <Badge variant="info">{item.totalVisits}</Badge>
      )
    },
    { 
      key: 'hasChatted', 
      header: 'Chatbot',
      render: (item: AnalyticsData['recentVisitors'][0]) => (
        <Badge variant={item.hasChatted ? 'success' : 'default'}>
          {item.hasChatted ? 'Konuştu' : 'Hayır'}
        </Badge>
      )
    },
    { 
      key: 'lastVisit', 
      header: 'Son Ziyaret',
      render: (item: AnalyticsData['recentVisitors'][0]) => (
        <span className="text-xs text-slate-400">{formatDate(item.lastVisit)}</span>
      )
    }
  ];

  // Top pages table columns
  const topPagesColumns = [
    { 
      key: 'path', 
      header: 'Sayfa',
      render: (item: { path: string; views: number }) => (
        <span className="font-mono text-sm">{item.path}</span>
      )
    },
    { 
      key: 'views', 
      header: 'Görüntülenme',
      render: (item: { path: string; views: number }) => (
        <Badge variant="info">{item.views}</Badge>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const totalDevices = analytics?.deviceBreakdown 
    ? Object.values(analytics.deviceBreakdown).reduce((a, b) => a + b, 0) 
    : 0;

  return (
    <div className="space-y-6 admin-fade-in">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold admin-title">Analytics Dashboard</h1>
          <p className="admin-subtitle mt-1">Gerçek zamanlı ziyaretçi istatistikleri</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Filter Buttons */}
          <div className="flex items-center gap-1 admin-card-muted p-1.5">
            <button
              onClick={() => handleDateFilterChange('today')}
              className={`px-3 py-1.5 text-sm rounded-md transition-all admin-pill ${
                dateFilter === 'today' 
                  ? 'admin-pill-active font-medium' 
                  : ''
              }`}
            >
              Bugün
            </button>
            <button
              onClick={() => handleDateFilterChange('7days')}
              className={`px-3 py-1.5 text-sm rounded-md transition-all admin-pill ${
                dateFilter === '7days' 
                  ? 'admin-pill-active font-medium' 
                  : ''
              }`}
            >
              7 Gün
            </button>
            <button
              onClick={() => handleDateFilterChange('30days')}
              className={`px-3 py-1.5 text-sm rounded-md transition-all admin-pill ${
                dateFilter === '30days' 
                  ? 'admin-pill-active font-medium' 
                  : ''
              }`}
            >
              30 Gün
            </button>
            <button
              onClick={() => handleDateFilterChange('all')}
              className={`px-3 py-1.5 text-sm rounded-md transition-all admin-pill ${
                dateFilter === 'all' 
                  ? 'admin-pill-active font-medium' 
                  : ''
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => handleDateFilterChange('custom')}
              className={`px-3 py-1.5 text-sm rounded-md transition-all flex items-center gap-1 admin-pill ${
                dateFilter === 'custom' 
                  ? 'admin-pill-active font-medium' 
                  : ''
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Özel
            </button>
          </div>

          {/* Custom Date Picker */}
          {showDatePicker && (
            <div className="flex items-center gap-2 admin-card-muted p-2">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="px-2 py-1 rounded text-sm"
              />
              <span className="text-slate-500">—</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="px-2 py-1 rounded text-sm"
              />
              <Button size="sm" onClick={handleCustomDateApply}>
                Uygula
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              onClick={exportToCSV}
            >
              CSV
            </Button>
            <Button 
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              onClick={exportToJSON}
            >
              JSON
            </Button>
            <Button 
              icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              Yenile
            </Button>
          </div>
        </div>
      </div>

      {/* Anomali Uyarıları */}
      {insights?.anomalies && insights.anomalies.length > 0 && (
        <div className="space-y-2">
          {insights.anomalies.map((anomaly, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
                anomaly.severity === 'high' 
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : anomaly.severity === 'medium'
                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                    : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}
            >
              {anomaly.severity === 'high' ? (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="font-medium text-sm">{anomaly.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Filter Info */}
      {dateFilter !== 'all' && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-2 flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span className="text-sm text-indigo-700">
            {dateFilter === 'today' && 'Bugünün verileri gösteriliyor'}
            {dateFilter === '7days' && 'Son 7 günün verileri gösteriliyor'}
            {dateFilter === '30days' && 'Son 30 günün verileri gösteriliyor'}
            {dateFilter === 'custom' && customStartDate && customEndDate && 
              `${customStartDate} - ${customEndDate} tarihleri arası gösteriliyor`}
          </span>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Toplam Benzersiz Ziyaretçi"
          value={analytics?.overview?.totalUniqueVisitors?.toLocaleString() || '0'}
          change="Tüm zamanlar"
          changeType="neutral"
          icon={<Users className="w-6 h-6 text-white" />}
          iconColor="bg-indigo-600"
        />
        <StatCard
          title="Bugün Ziyaretçi"
          value={analytics?.overview?.todayVisitors?.toLocaleString() || '0'}
          change={analytics?.overview?.visitorChange !== undefined 
            ? `${analytics.overview.visitorChange >= 0 ? '+' : ''}${analytics.overview.visitorChange}% düne göre`
            : 'Henüz veri yok'}
          changeType={analytics?.overview?.visitorChange !== undefined 
            ? (analytics.overview.visitorChange >= 0 ? 'positive' : 'negative')
            : 'neutral'}
          icon={<Eye className="w-6 h-6 text-white" />}
          iconColor="bg-teal-600"
        />
        <StatCard
          title="Aktif Oturum"
          value={analytics?.overview?.activeSessions?.toString() || '0'}
          change="Son 30 dakika"
          changeType="neutral"
          icon={<Activity className="w-6 h-6 text-white" />}
          iconColor="bg-amber-600"
        />
        <StatCard
          title="Chatbot Kullanımı"
          value={analytics?.overview?.totalChatbotUsers?.toString() || '0'}
          change={`Bugün: ${analytics?.overview?.chatbotUsersToday || 0}`}
          changeType="positive"
          icon={<MessageCircle className="w-6 h-6 text-white" />}
          iconColor="bg-violet-600"
        />
      </div>

      {/* Recent Visitors Table - Grouped by Day */}
      <Card 
        title="Son Ziyaretçiler" 
        subtitle="Günlük ziyaretçi listesi - tıklayarak detay görün"
        action={
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Activity className="w-4 h-4 text-teal-500 animate-pulse" />
            Canlı güncelleniyor
          </div>
        }
      >
        {/* Puanlama Skalası Açıklaması */}
        <div className="mb-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-slate-700">📊 Puanlama Skalası</span>
          </div>
          
          {/* Potansiyel Seviyeleri */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg border border-teal-200">
              <span className="text-xl">🔥</span>
              <div className="text-center">
                <span className="font-bold text-teal-700">50+ Puan</span>
                <span className="text-teal-600 text-xs block">Yüksek Potansiyel</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <span className="text-xl">⚡</span>
              <div className="text-center">
                <span className="font-bold text-amber-700">20-49 Puan</span>
                <span className="text-amber-600 text-xs block">Orta Potansiyel</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg border border-slate-300">
              <span className="text-xl">❄️</span>
              <div className="text-center">
                <span className="font-bold text-slate-600">0-19 Puan</span>
                <span className="text-slate-500 text-xs block">Düşük Potansiyel</span>
              </div>
            </div>
          </div>
          
          {/* Puan Kriterleri */}
          <div className="grid grid-cols-5 gap-2 text-xs">
            <div className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-slate-200">
              <span>📝</span>
              <span className="text-slate-600">İsim</span>
              <span className="font-bold text-indigo-600">+30</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-slate-200">
              <span>📞</span>
              <span className="text-slate-600">Telefon</span>
              <span className="font-bold text-indigo-600">+35</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-slate-200">
              <span>💬</span>
              <span className="text-slate-600">Chatbot</span>
              <span className="font-bold text-indigo-600">+20</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-slate-200">
              <span>🔄</span>
              <span className="text-slate-600">3+ Ziyaret</span>
              <span className="font-bold text-indigo-600">+15</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-slate-200">
              <span>📅</span>
              <span className="text-slate-600">Randevu</span>
              <span className="font-bold text-indigo-600">+50</span>
            </div>
          </div>
        </div>

        {analytics?.visitorsByDay && Object.keys(analytics.visitorsByDay).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(analytics.visitorsByDay).map(([date, visitors]) => (
              <div key={date} className="border border-slate-200 rounded-xl overflow-hidden">
                {/* Day Header - Clickable */}
                <button
                  onClick={() => setExpandedDays(prev => 
                    prev.includes(date) 
                      ? prev.filter(d => d !== date)
                      : [...prev, date]
                  )}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-800">{date}</p>
                      <p className="text-sm text-slate-500">{visitors.length} ziyaretçi</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="info">{visitors.length}</Badge>
                    {expandedDays.includes(date) ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Visitors List - Expandable */}
                {expandedDays.includes(date) && (
                  <div>
                    {/* Tablo Başlıkları */}
                    <div className="flex items-center gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      <div className="w-10"></div>
                      <div className="w-32">Ad</div>
                      <div className="w-16">Puan</div>
                      <div className="w-24">Potansiyel</div>
                      <div className="w-28">Amaç</div>
                      <div className="w-20">Chatbot</div>
                      <div className="flex-1">Şehir</div>
                      <div className="w-32">Telefon</div>
                      <div className="w-20 text-center">Ziyaret</div>
                      <div className="w-16 text-right">Saat</div>
                      <div className="w-8"></div>
                    </div>
                    
                    <div className="divide-y divide-slate-100">
                    {visitors.map((visitor) => {
                      // Basit potansiyel hesaplama (liste görünümü için)
                      let quickScore = 0;
                      if (visitor.userName) quickScore += 30;
                      if (visitor.userPhone) quickScore += 35;
                      if (visitor.hasChatted) quickScore += 20;
                      if (visitor.totalVisits > 2) quickScore += 15;
                      if (visitor.hasBooking) quickScore += 50;
                      
                      const quickPotential = quickScore >= 50 
                        ? { emoji: '🔥', color: 'text-teal-700', bg: 'bg-teal-50/60', label: 'Yüksek', border: 'border-teal-200' }
                        : quickScore >= 20 
                        ? { emoji: '⚡', color: 'text-amber-700', bg: 'bg-amber-50/60', label: 'Orta', border: 'border-amber-200' }
                        : { emoji: '❄️', color: 'text-slate-600', bg: 'bg-slate-50/60', label: 'Düşük', border: 'border-slate-200' };
                      
                      // Intent'i Türkçe'ye çevir
                      const getIntentLabel = (intent: string | null) => {
                        if (!intent) return null;
                        switch(intent.toLowerCase()) {
                          case 'fiyat': return { icon: '💰', label: 'Fiyat', color: 'text-blue-700', bg: 'bg-blue-50/50' };
                          case 'randevu': return { icon: '📅', label: 'Randevu', color: 'text-purple-700', bg: 'bg-purple-50/50' };
                          case 'bilgi': return { icon: 'ℹ️', label: 'Bilgi', color: 'text-cyan-700', bg: 'bg-cyan-50/50' };
                          case 'sikayet': return { icon: '😤', label: 'Şikayet', color: 'text-red-700', bg: 'bg-red-50/50' };
                          case 'destek': return { icon: '🛠️', label: 'Destek', color: 'text-indigo-700', bg: 'bg-indigo-50/50' };
                          case 'diger': return { icon: '💬', label: 'Diğer', color: 'text-slate-600', bg: 'bg-slate-50/50' };
                          default: return { icon: '💬', label: intent, color: 'text-slate-600', bg: 'bg-slate-50/50' };
                        }
                      };
                      
                      const intentData = getIntentLabel(visitor.intent);
                      
                      return (
                      <button
                        key={visitor.visitorId}
                        onClick={() => setSelectedVisitorId(visitor.visitorId)}
                        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50/80 transition-all duration-150 text-left border-l-2 border-transparent hover:border-l-indigo-400"
                      >
                        {/* Potansiyel İkonu */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${quickPotential.bg} border ${quickPotential.border}`}>
                          <span className="text-base">{quickPotential.emoji}</span>
                        </div>

                        {/* Ad */}
                        <div className="w-32">
                          <span className={`text-sm font-semibold ${visitor.userName ? 'text-slate-800' : 'text-slate-400 italic'}`}>
                            {visitor.userName || 'Anonim'}
                          </span>
                        </div>
                        
                        {/* Puan */}
                        <div className="w-16">
                          <span className={`inline-flex items-center justify-center w-10 h-7 rounded-md text-xs font-bold ${
                            quickScore >= 50 
                              ? 'bg-teal-100 text-teal-700 border border-teal-300' 
                              : quickScore >= 20 
                              ? 'bg-amber-100 text-amber-700 border border-amber-300' 
                              : 'bg-slate-100 text-slate-600 border border-slate-300'
                          }`}>
                            {quickScore}
                          </span>
                        </div>
                        
                        {/* Potansiyel */}
                        <div className="w-24">
                          <span className={`inline-block text-xs px-2.5 py-1 rounded-md ${quickPotential.bg} ${quickPotential.color} font-medium border ${quickPotential.border}`}>
                            {quickPotential.label}
                          </span>
                        </div>
                        
                        {/* Amaç/Intent */}
                        <div className="w-28">
                          {intentData ? (
                            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md ${intentData.bg} ${intentData.color} font-medium`}>
                              <span>{intentData.icon}</span>
                              <span>{intentData.label}</span>
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">-</span>
                          )}
                        </div>
                        
                        {/* Chatbot */}
                        <div className="w-20">
                          <span className={`inline-block text-xs px-2.5 py-1 rounded-md font-medium ${
                            visitor.hasChatted 
                              ? 'bg-teal-50/60 text-teal-700 border border-teal-200' 
                              : 'bg-slate-50/60 text-slate-500 border border-slate-200'
                          }`}>
                            {visitor.hasChatted ? '✓ Evet' : '✗ Hayır'}
                          </span>
                        </div>
                        
                        {/* Şehir */}
                        <div className="flex-1">
                          <span className="text-sm text-slate-600 font-medium">
                            {visitor.city && visitor.city !== 'Localhost' 
                              ? `📍 ${visitor.city}` 
                              : visitor.country && visitor.country !== 'Yerel'
                              ? `🌍 ${visitor.country}`
                              : <span className="text-slate-400">-</span>}
                          </span>
                        </div>
                        
                        {/* Telefon */}
                        <div className="w-32">
                          {visitor.userPhone ? (
                            <span className="inline-block text-xs bg-amber-50/60 text-amber-800 px-2.5 py-1 rounded-md font-medium border border-amber-200">
                              📞 {visitor.userPhone}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">-</span>
                          )}
                        </div>

                        {/* Ziyaret Sayısı */}
                        <div className="w-20 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 border border-slate-200">
                            <span className="text-sm font-bold text-slate-700">{visitor.totalVisits}</span>
                          </span>
                        </div>
                        
                        {/* Saat */}
                        <div className="w-16 text-right">
                          <span className="text-xs text-slate-500 font-mono">
                            {new Date(visitor.lastVisit).toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        
                        {/* Arrow */}
                        <div className="w-8 flex justify-end">
                          <ArrowRight className="w-4 h-4 text-slate-300" />
                        </div>
                      </button>
                    )})}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">Henüz ziyaretçi verisi yok</p>
        )}
      </Card>

      {/* Visitor Detail Modal */}
      {selectedVisitorId && (
        <VisitorDetailModal
          visitorId={selectedVisitorId}
          onClose={() => setSelectedVisitorId(null)}
        />
      )}

      {/* Mini Dönüşüm Hunisi + Mini Aktivite Akışı */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ziyaretçi Trendi Çizgi Grafiği */}
        <Card title="📈 Ziyaretçi Trendi" subtitle="Son 30 günlük ziyaretçi değişimi">
          <div className="h-48 flex items-end gap-1 px-2">
            {analytics?.dailyTrend && analytics.dailyTrend.length > 0 ? (
              <>
                {/* Y axis labels */}
                <div className="flex flex-col justify-between h-full text-xs text-slate-400 pr-2">
                  {(() => {
                    const maxVal = Math.max(...analytics.dailyTrend.map(d => d.visitors), 5);
                    return (
                      <>
                        <span>{maxVal}</span>
                        <span>{Math.round(maxVal / 2)}</span>
                        <span>0</span>
                      </>
                    );
                  })()}
                </div>
                {/* Chart area */}
                <div className="flex-1 relative h-full">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-t border-slate-200"></div>
                    <div className="border-t border-slate-200"></div>
                    <div className="border-t border-slate-200"></div>
                  </div>
                  {/* Line chart with SVG */}
                  <svg className="w-full h-full" viewBox="0 0 100 160" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="visitorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
                      </linearGradient>
                    </defs>
                    {/* Area under line */}
                    {(() => {
                      const maxVal = Math.max(...analytics.dailyTrend.map(t => t.visitors), 5);
                      const points = analytics.dailyTrend.map((d, i) => {
                        const x = analytics.dailyTrend.length === 1 ? 50 : (i / (analytics.dailyTrend.length - 1)) * 100;
                        const y = 160 - (d.visitors / maxVal) * 140;
                        return `${x},${y}`;
                      });
                      return (
                        <path
                          d={`M 0,160 L ${points[0].split(',')[0]},${points[0].split(',')[1]} ${points.map(p => `L ${p}`).join(' ')} L ${points[points.length - 1].split(',')[0]},160 Z`}
                          fill="url(#visitorGradient)"
                        />
                      );
                    })()}
                    {/* Line */}
                    {(() => {
                      const maxVal = Math.max(...analytics.dailyTrend.map(t => t.visitors), 5);
                      const points = analytics.dailyTrend.map((d, i) => {
                        const x = analytics.dailyTrend.length === 1 ? 50 : (i / (analytics.dailyTrend.length - 1)) * 100;
                        const y = 160 - (d.visitors / maxVal) * 140;
                        return `${x},${y}`;
                      });
                      return (
                        <polyline
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={points.join(' ')}
                          vectorEffect="non-scaling-stroke"
                        />
                      );
                    })()}
                  </svg>
                  {/* Data points overlay */}
                  <div className="absolute inset-0 flex justify-between items-end" style={{ paddingBottom: '0px' }}>
                    {analytics.dailyTrend.map((d, i) => {
                      const maxVal = Math.max(...analytics.dailyTrend.map(t => t.visitors), 5);
                      const heightPercent = (d.visitors / maxVal) * 87.5; // 140/160 = 87.5%
                      return (
                        <div key={i} className="relative flex flex-col items-center" style={{ height: '100%' }}>
                          <div 
                            className="absolute w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-md"
                            style={{ bottom: `${heightPercent}%` }}
                            title={`${d.visitors} ziyaretçi`}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {/* X axis labels */}
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    {analytics.dailyTrend.map((d, i) => (
                      <span key={i} className="text-center">{d.date.split(' ')[0]}</span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400">
                Henüz yeterli veri yok
              </div>
            )}
          </div>
        </Card>

        {/* Chatbot Kullanım Trendi */}
        <Card title="🤖 Chatbot Kullanım Trendi" subtitle="Son 30 günlük chatbot etkileşimi">
          <div className="h-48 flex items-end gap-1 px-2">
            {analytics?.dailyTrend && analytics.dailyTrend.length > 0 ? (
              <>
                {/* Y axis labels */}
                <div className="flex flex-col justify-between h-full text-xs text-slate-400 pr-2">
                  {(() => {
                    const maxVal = Math.max(...analytics.dailyTrend.map(d => d.chatbotUsers), 5);
                    return (
                      <>
                        <span>{maxVal}</span>
                        <span>{Math.round(maxVal / 2)}</span>
                        <span>0</span>
                      </>
                    );
                  })()}
                </div>
                {/* Chart area */}
                <div className="flex-1 relative h-full">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-t border-slate-200"></div>
                    <div className="border-t border-slate-200"></div>
                    <div className="border-t border-slate-200"></div>
                  </div>
                  {/* Line chart with SVG */}
                  <svg className="w-full h-full" viewBox="0 0 100 160" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chatbotGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.05"/>
                      </linearGradient>
                    </defs>
                    {/* Area under line */}
                    {(() => {
                      const maxVal = Math.max(...analytics.dailyTrend.map(t => t.chatbotUsers), 5);
                      const points = analytics.dailyTrend.map((d, i) => {
                        const x = analytics.dailyTrend.length === 1 ? 50 : (i / (analytics.dailyTrend.length - 1)) * 100;
                        const y = 160 - (d.chatbotUsers / maxVal) * 140;
                        return `${x},${y}`;
                      });
                      return (
                        <path
                          d={`M 0,160 L ${points[0].split(',')[0]},${points[0].split(',')[1]} ${points.map(p => `L ${p}`).join(' ')} L ${points[points.length - 1].split(',')[0]},160 Z`}
                          fill="url(#chatbotGradient)"
                        />
                      );
                    })()}
                    {/* Line */}
                    {(() => {
                      const maxVal = Math.max(...analytics.dailyTrend.map(t => t.chatbotUsers), 5);
                      const points = analytics.dailyTrend.map((d, i) => {
                        const x = analytics.dailyTrend.length === 1 ? 50 : (i / (analytics.dailyTrend.length - 1)) * 100;
                        const y = 160 - (d.chatbotUsers / maxVal) * 140;
                        return `${x},${y}`;
                      });
                      return (
                        <polyline
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={points.join(' ')}
                          vectorEffect="non-scaling-stroke"
                        />
                      );
                    })()}
                  </svg>
                  {/* Data points overlay */}
                  <div className="absolute inset-0 flex justify-between items-end" style={{ paddingBottom: '0px' }}>
                    {analytics.dailyTrend.map((d, i) => {
                      const maxVal = Math.max(...analytics.dailyTrend.map(t => t.chatbotUsers), 5);
                      const heightPercent = (d.chatbotUsers / maxVal) * 87.5; // 140/160 = 87.5%
                      return (
                        <div key={i} className="relative flex flex-col items-center" style={{ height: '100%' }}>
                          <div 
                            className="absolute w-3 h-3 bg-teal-500 rounded-full border-2 border-white shadow-md"
                            style={{ bottom: `${heightPercent}%` }}
                            title={`${d.chatbotUsers} chatbot kullanıcısı`}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {/* X axis labels */}
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    {analytics.dailyTrend.map((d, i) => (
                      <span key={i} className="text-center">{d.date.split(' ')[0]}</span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400">
                Henüz yeterli veri yok
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* İletişim Tıklama İstatistikleri */}
      <Card title="📞 İletişim Tıklamaları" subtitle="Mail, Telefon ve WhatsApp tıklama istatistikleri">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto bg-indigo-600 rounded-full flex items-center justify-center mb-3">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-indigo-700">{analytics?.contactClickStats?.email || 0}</p>
            <p className="text-sm text-indigo-600">Email Tıklaması</p>
            <p className="text-xs text-indigo-500 mt-1">Bugün: {analytics?.contactClickStats?.todayEmail || 0}</p>
          </div>
          
          {/* Phone */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto bg-teal-600 rounded-full flex items-center justify-center mb-3">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-teal-700">{analytics?.contactClickStats?.phone || 0}</p>
            <p className="text-sm text-teal-600">Telefon Tıklaması</p>
            <p className="text-xs text-teal-500 mt-1">Bugün: {analytics?.contactClickStats?.todayPhone || 0}</p>
          </div>
          
          {/* WhatsApp */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto bg-emerald-600 rounded-full flex items-center justify-center mb-3">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-emerald-700">{analytics?.contactClickStats?.whatsapp || 0}</p>
            <p className="text-sm text-emerald-600">WhatsApp Tıklaması</p>
            <p className="text-xs text-emerald-500 mt-1">Bugün: {analytics?.contactClickStats?.todayWhatsapp || 0}</p>
          </div>
        </div>
      </Card>

      {/* Top Pages */}
      <Card 
        title="En Çok Ziyaret Edilen Sayfalar" 
        subtitle="Sayfa görüntülenme istatistikleri"
      >
        {analytics?.topPages && analytics.topPages.length > 0 ? (
          <DataTable data={analytics.topPages} columns={topPagesColumns} />
        ) : (
          <p className="text-slate-500 text-center py-8">Henüz sayfa görüntüleme verisi yok</p>
        )}
      </Card>

      {/* Country Stats */}
      {analytics?.countryStats && analytics.countryStats.length > 0 && (
        <Card title="Ülke Dağılımı" subtitle="Ziyaretçi lokasyonları">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {analytics.countryStats.map((stat) => (
              <div key={stat.country} className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
                <Globe className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                <p className="font-medium text-gray-900">{stat.country}</p>
                <p className="text-sm text-gray-500">{stat.count} ziyaretçi</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
