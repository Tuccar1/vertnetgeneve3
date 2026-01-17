'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';
import {
  Users,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  MapPin,
  Download,
  RefreshCw,
  Search,
  User,
  Clock,
  Target,
  Star,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Lead {
  id: string;
  visitorId: string;
  userName: string | null;
  userPhone: string | null;
  extractedPhone: string | null;
  email: string | null;
  ip: string;
  device: string;
  browser: string;
  location: {
    country: string;
    city: string;
    region: string;
  };
  intent: string;
  messageCount: number;
  firstContact: string;
  lastContact: string;
  messages: {
    sender: string;
    message: string;
    timestamp: string;
  }[];
  source: 'form' | 'chat' | 'both';
  score: number;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeads = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/analytics/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (lead.userName?.toLowerCase().includes(searchLower)) ||
      (lead.userPhone?.includes(searchTerm)) ||
      (lead.extractedPhone?.includes(searchTerm)) ||
      (lead.email?.toLowerCase().includes(searchLower)) ||
      (lead.location?.city?.toLowerCase().includes(searchLower))
    );
  });

  const exportToCSV = () => {
    const headers = ['İsim', 'Telefon', 'Email', 'Şehir', 'Ülke', 'Niyet', 'Mesaj Sayısı', 'İlk İletişim', 'Son İletişim', 'Kaynak'];
    const rows = filteredLeads.map(lead => [
      lead.userName || '-',
      lead.userPhone || lead.extractedPhone || '-',
      lead.email || '-',
      lead.location?.city || '-',
      lead.location?.country || '-',
      lead.intent || '-',
      lead.messageCount,
      new Date(lead.firstContact).toLocaleString('tr-TR'),
      new Date(lead.lastContact).toLocaleString('tr-TR'),
      lead.source
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getIntentLabel = (intent: string) => {
    const labels: Record<string, { text: string; color: string }> = {
      'randevu': { text: '📅 Randevu', color: 'bg-green-100 text-green-700' },
      'fiyat': { text: '💰 Fiyat', color: 'bg-blue-100 text-blue-700' },
      'bilgi': { text: '📋 Bilgi', color: 'bg-purple-100 text-purple-700' },
      'sikayet': { text: '⚠️ Şikayet', color: 'bg-red-100 text-red-700' },
      'devis': { text: '📝 Teklif', color: 'bg-amber-100 text-amber-700' },
      'urgence': { text: '🚨 Acil', color: 'bg-red-100 text-red-700' },
      'contact': { text: '📞 İletişim', color: 'bg-indigo-100 text-indigo-700' },
      'merci': { text: '🙏 Teşekkür', color: 'bg-emerald-100 text-emerald-700' },
      'diger': { text: '💬 Diğer', color: 'bg-gray-100 text-gray-700' }
    };
    return labels[intent] || labels['diger'];
  };

  const getSourceBadge = (source: string) => {
    if (source === 'form') return { text: 'Form', color: 'bg-blue-500' };
    if (source === 'chat') return { text: 'Sohbet', color: 'bg-purple-500' };
    return { text: 'Her İkisi', color: 'bg-green-500' };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-100';
    if (score >= 50) return 'text-amber-600 bg-amber-100';
    return 'text-gray-600 bg-gray-100';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-indigo-600" />
            Müşteri Leads
          </h1>
          <p className="text-gray-600 mt-1">
            Chatbot üzerinden iletişim bilgisi bırakan potansiyel müşteriler
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={fetchLeads}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
          <Button onClick={exportToCSV} disabled={filteredLeads.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            CSV İndir
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Toplam Lead</p>
              <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Telefon Numarası</p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.userPhone || l.extractedPhone).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">İsim Bilgisi</p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.userName).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Yüksek Potansiyel</p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter(l => l.score >= 80).length}
              </p>
            </div>
            <div className="p-3 bg-amber-100 rounded-xl">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="İsim, telefon, email veya şehir ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </Card>

      {/* Leads List */}
      {filteredLeads.length === 0 ? (
        <Card className="p-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'Sonuç bulunamadı' : 'Henüz lead yok'}
          </h3>
          <p className="text-gray-500">
            {searchTerm 
              ? 'Farklı arama terimleri deneyin' 
              : 'Chatbot üzerinden iletişim bilgisi bırakan ziyaretçiler burada görünecek'}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map((lead) => {
            const intentInfo = getIntentLabel(lead.intent);
            const sourceBadge = getSourceBadge(lead.source);
            const isExpanded = expandedLead === lead.id;

            return (
              <Card key={lead.id} className="overflow-hidden">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getScoreColor(lead.score)}`}>
                        {lead.userName ? (
                          <span className="text-lg font-bold">
                            {lead.userName.charAt(0).toUpperCase()}
                          </span>
                        ) : (
                          <User className="w-6 h-6" />
                        )}
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">
                            {lead.userName || 'İsimsiz Ziyaretçi'}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${intentInfo.color}`}>
                            {intentInfo.text}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${sourceBadge.color}`}>
                            {sourceBadge.text}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                          {(lead.userPhone || lead.extractedPhone) && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4 text-green-500" />
                              {lead.userPhone || lead.extractedPhone}
                            </span>
                          )}
                          {lead.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4 text-blue-500" />
                              {lead.email}
                            </span>
                          )}
                          {lead.location?.city && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-red-500" />
                              {lead.location.city}, {lead.location.country}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4 text-purple-500" />
                            {lead.messageCount} mesaj
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            İlk: {new Date(lead.firstContact).toLocaleString('tr-TR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Son: {new Date(lead.lastContact).toLocaleString('tr-TR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Score */}
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(lead.score)}`}>
                        {lead.score} puan
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && lead.messages.length > 0 && (
                  <div className="border-t bg-gray-50 p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Sohbet Geçmişi</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {lead.messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg text-sm ${
                            msg.sender === 'user'
                              ? 'bg-indigo-100 text-indigo-900 ml-8'
                              : 'bg-white text-gray-700 mr-8 border'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">
                              {msg.sender === 'user' ? '👤 Ziyaretçi' : '🤖 Bot'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(msg.timestamp).toLocaleString('tr-TR')}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      {(lead.userPhone || lead.extractedPhone) && (
                        <a
                          href={`tel:${lead.userPhone || lead.extractedPhone}`}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Phone className="w-4 h-4" />
                          Ara
                        </a>
                      )}
                      {(lead.userPhone || lead.extractedPhone) && (
                        <a
                          href={`https://wa.me/${(lead.userPhone || lead.extractedPhone)?.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </a>
                      )}
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
