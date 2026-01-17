'use client';

import { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Mail, 
  Bell, 
  Shield, 
  Palette, 
  BarChart3,
  Database,
  Save,
  Eye,
  EyeOff,
  Check,
  RefreshCw,
  Trash2,
  Download,
  MessageSquare,
  Clock,
  MapPin,
  Phone,
  Link,
  Sun,
  Moon,
  Monitor,
  Key,
  AlertTriangle
} from 'lucide-react';
import { Card } from '@/components/admin/Card';
import { Button } from '@/components/admin/Button';

type TabType = 'general' | 'contact' | 'chatbot' | 'notifications' | 'security' | 'appearance' | 'analytics' | 'data';

interface SiteSettings {
  general: {
    siteName: string;
    siteUrl: string;
    siteDescription: string;
    language: string;
    timezone: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    workingHours: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      linkedin: string;
      twitter: string;
    };
  };
  chatbot: {
    enabled: boolean;
    welcomeMessage: string;
    apiEndpoint: string;
    apiKey: string;
    position: 'bottom-right' | 'bottom-left';
    primaryColor: string;
    autoOpen: boolean;
    responseDelay: number;
  };
  notifications: {
    emailNotifications: boolean;
    newMessageAlert: boolean;
    newReservationAlert: boolean;
    dailyReport: boolean;
    weeklyReport: boolean;
    notificationEmail: string;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    ipWhitelist: string;
    maxLoginAttempts: number;
    passwordExpiry: number;
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    primaryColor: string;
    logoUrl: string;
    faviconUrl: string;
    compactMode: boolean;
  };
  analytics: {
    googleAnalyticsId: string;
    trackingEnabled: boolean;
    cookieConsent: boolean;
    dataRetentionDays: number;
    anonymizeIp: boolean;
  };
}

const defaultSettings: SiteSettings = {
  general: {
    siteName: 'Vertnetgeneve',
    siteUrl: 'https://vertnetgeneve.ch',
    siteDescription: 'Services de nettoyage professionnel et écologique à Genève - Nettoyage résidentiel, commercial et industriel',
    language: 'fr',
    timezone: 'Europe/Zurich',
  },
  contact: {
    email: 'contact@vertnetgeneve.ch',
    phone: '+41 22 123 45 67',
    address: 'Genève, Suisse',
    workingHours: 'Lun-Ven: 7h-19h, Sam: 8h-16h, Dim: Sur demande',
    socialMedia: {
      facebook: 'https://facebook.com/vertnetgeneve',
      instagram: 'https://instagram.com/vertnetgeneve',
      linkedin: 'https://linkedin.com/company/vertnetgeneve',
      twitter: '',
    },
  },
  chatbot: {
    enabled: true,
    welcomeMessage: 'Bonjour! Je suis votre assistant Vertnetgeneve. Comment puis-je vous aider?',
    apiEndpoint: 'https://flowise.chatdeskiyo.com/api/v1/prediction/3fadc7bf-109d-4649-af1f-c66773105a26',
    apiKey: '',
    position: 'bottom-right',
    primaryColor: '#10b981',
    autoOpen: false,
    responseDelay: 500,
  },
  notifications: {
    emailNotifications: true,
    newMessageAlert: true,
    newReservationAlert: true,
    dailyReport: false,
    weeklyReport: true,
    notificationEmail: 'admin@vertnetgeneve.ch',
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    ipWhitelist: '',
    maxLoginAttempts: 5,
    passwordExpiry: 90,
  },
  appearance: {
    theme: 'light',
    primaryColor: '#2563eb',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
    compactMode: false,
  },
  analytics: {
    googleAnalyticsId: '',
    trackingEnabled: true,
    cookieConsent: true,
    dataRetentionDays: 365,
    anonymizeIp: true,
  },
};

const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'general', label: 'Genel', icon: Globe },
  { id: 'contact', label: 'İletişim', icon: Mail },
  { id: 'chatbot', label: 'Chatbot', icon: MessageSquare },
  { id: 'notifications', label: 'Bildirimler', icon: Bell },
  { id: 'security', label: 'Güvenlik', icon: Shield },
  { id: 'appearance', label: 'Görünüm', icon: Palette },
  { id: 'analytics', label: 'Analitik', icon: BarChart3 },
  { id: 'data', label: 'Veri Yönetimi', icon: Database },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setSaving(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTestChatbotConnection = async () => {
    setTestingConnection(true);
    setConnectionStatus('idle');
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: 'test' }),
      });
      if (response.ok) {
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
      }
    } catch {
      setConnectionStatus('error');
    }
    setTestingConnection(false);
  };

  const handleExportData = () => {
    const data = {
      settings,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `settings-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleClearAnalytics = () => {
    if (confirm('Tüm analitik verileri silinecek. Emin misiniz?')) {
      localStorage.removeItem('analyticsData');
      alert('Analitik verileri temizlendi.');
    }
  };

  const updateSetting = <T extends keyof SiteSettings>(
    category: T,
    key: keyof SiteSettings[T],
    value: SiteSettings[T][keyof SiteSettings[T]]
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const updateNestedSetting = (
    category: 'contact',
    parent: 'socialMedia',
    key: string,
    value: string
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parent]: {
          ...(prev[category] as typeof prev.contact)[parent],
          [key]: value,
        },
      },
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Adı</label>
              <input
                type="text"
                value={settings.general.siteName}
                onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
              <input
                type="url"
                value={settings.general.siteUrl}
                onChange={(e) => updateSetting('general', 'siteUrl', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Açıklaması</label>
              <textarea
                value={settings.general.siteDescription}
                onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dil</label>
                <select
                  value={settings.general.language}
                  onChange={(e) => updateSetting('general', 'language', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="tr">Türkçe</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Saat Dilimi</label>
                <select
                  value={settings.general.timezone}
                  onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                  <option value="Europe/Istanbul">Europe/Istanbul (GMT+3)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="America/New_York">America/New_York (GMT-5)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline-block w-4 h-4 mr-1" /> E-posta
                </label>
                <input
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) => updateSetting('contact', 'email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline-block w-4 h-4 mr-1" /> Telefon
                </label>
                <input
                  type="tel"
                  value={settings.contact.phone}
                  onChange={(e) => updateSetting('contact', 'phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline-block w-4 h-4 mr-1" /> Adres
              </label>
              <textarea
                value={settings.contact.address}
                onChange={(e) => updateSetting('contact', 'address', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline-block w-4 h-4 mr-1" /> Çalışma Saatleri
              </label>
              <input
                type="text"
                value={settings.contact.workingHours}
                onChange={(e) => updateSetting('contact', 'workingHours', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                <Link className="inline-block w-4 h-4 mr-1" /> Sosyal Medya Bağlantıları
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(settings.contact.socialMedia).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-500 mb-1 capitalize">{key}</label>
                    <input
                      type="url"
                      value={value}
                      onChange={(e) => updateNestedSetting('contact', 'socialMedia', key, e.target.value)}
                      placeholder={`https://${key}.com/...`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'chatbot':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Chatbot Durumu</h4>
                <p className="text-sm text-gray-500">Chatbot&apos;u aktif/pasif yapın</p>
              </div>
              <button
                onClick={() => updateSetting('chatbot', 'enabled', !settings.chatbot.enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.chatbot.enabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.chatbot.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Karşılama Mesajı</label>
              <textarea
                value={settings.chatbot.welcomeMessage}
                onChange={(e) => updateSetting('chatbot', 'welcomeMessage', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Endpoint</label>
              <input
                type="url"
                value={settings.chatbot.apiEndpoint}
                onChange={(e) => updateSetting('chatbot', 'apiEndpoint', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Key className="inline-block w-4 h-4 mr-1" /> API Anahtarı
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={settings.chatbot.apiKey}
                  onChange={(e) => updateSetting('chatbot', 'apiKey', e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Konum</label>
                <select
                  value={settings.chatbot.position}
                  onChange={(e) => updateSetting('chatbot', 'position', e.target.value as 'bottom-right' | 'bottom-left')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="bottom-right">Sağ Alt</option>
                  <option value="bottom-left">Sol Alt</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ana Renk</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.chatbot.primaryColor}
                    onChange={(e) => updateSetting('chatbot', 'primaryColor', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.chatbot.primaryColor}
                    onChange={(e) => updateSetting('chatbot', 'primaryColor', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Yanıt Gecikmesi (ms)</label>
              <input
                type="number"
                value={settings.chatbot.responseDelay}
                onChange={(e) => updateSetting('chatbot', 'responseDelay', parseInt(e.target.value))}
                min={0}
                max={5000}
                step={100}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Otomatik Aç</h4>
                <p className="text-sm text-gray-500">Sayfa yüklendiğinde chatbot&apos;u otomatik aç</p>
              </div>
              <button
                onClick={() => updateSetting('chatbot', 'autoOpen', !settings.chatbot.autoOpen)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.chatbot.autoOpen ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.chatbot.autoOpen ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={handleTestChatbotConnection}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${testingConnection ? 'animate-spin' : ''}`} />
                Bağlantıyı Test Et
              </Button>
              {connectionStatus === 'success' && (
                <span className="flex items-center gap-1 text-green-600">
                  <Check className="w-4 h-4" /> Bağlantı başarılı
                </span>
              )}
              {connectionStatus === 'error' && (
                <span className="flex items-center gap-1 text-red-600">
                  <AlertTriangle className="w-4 h-4" /> Bağlantı hatası
                </span>
              )}
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bildirim E-postası</label>
              <input
                type="email"
                value={settings.notifications.notificationEmail}
                onChange={(e) => updateSetting('notifications', 'notificationEmail', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'E-posta Bildirimleri', desc: 'Tüm e-posta bildirimlerini etkinleştir' },
                { key: 'newMessageAlert', label: 'Yeni Mesaj Bildirimi', desc: 'Yeni mesaj geldiğinde bildir' },
                { key: 'newReservationAlert', label: 'Yeni Rezervasyon', desc: 'Yeni rezervasyon yapıldığında bildir' },
                { key: 'dailyReport', label: 'Günlük Rapor', desc: 'Her gün özet rapor gönder' },
                { key: 'weeklyReport', label: 'Haftalık Rapor', desc: 'Her hafta özet rapor gönder' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">{item.label}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => updateSetting('notifications', item.key as keyof typeof settings.notifications, !settings.notifications[item.key as keyof typeof settings.notifications])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications[item.key as keyof typeof settings.notifications] ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications[item.key as keyof typeof settings.notifications] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">İki Faktörlü Doğrulama</h4>
                <p className="text-sm text-gray-500">Ekstra güvenlik katmanı ekle</p>
              </div>
              <button
                onClick={() => updateSetting('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.security.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Oturum Zaman Aşımı (dk)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                  min={5}
                  max={1440}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maks. Giriş Denemesi</label>
                <input
                  type="number"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                  min={1}
                  max={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Şifre Süresi (gün)</label>
              <input
                type="number"
                value={settings.security.passwordExpiry}
                onChange={(e) => updateSetting('security', 'passwordExpiry', parseInt(e.target.value))}
                min={0}
                max={365}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">0 = Sınırsız</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">IP Beyaz Listesi</label>
              <textarea
                value={settings.security.ipWhitelist}
                onChange={(e) => updateSetting('security', 'ipWhitelist', e.target.value)}
                placeholder="192.168.1.1&#10;10.0.0.0/24"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Her satıra bir IP veya CIDR</p>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Tema</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'light', label: 'Açık', icon: Sun },
                  { value: 'dark', label: 'Koyu', icon: Moon },
                  { value: 'auto', label: 'Otomatik', icon: Monitor },
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => updateSetting('appearance', 'theme', theme.value as 'light' | 'dark' | 'auto')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                      settings.appearance.theme === theme.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <theme.icon className={`w-6 h-6 ${settings.appearance.theme === theme.value ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${settings.appearance.theme === theme.value ? 'text-blue-600' : 'text-gray-700'}`}>
                      {theme.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ana Renk</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.appearance.primaryColor}
                  onChange={(e) => updateSetting('appearance', 'primaryColor', e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.appearance.primaryColor}
                  onChange={(e) => updateSetting('appearance', 'primaryColor', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                <input
                  type="text"
                  value={settings.appearance.logoUrl}
                  onChange={(e) => updateSetting('appearance', 'logoUrl', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Favicon URL</label>
                <input
                  type="text"
                  value={settings.appearance.faviconUrl}
                  onChange={(e) => updateSetting('appearance', 'faviconUrl', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Kompakt Mod</h4>
                <p className="text-sm text-gray-500">Daha az boşlukla daha fazla içerik göster</p>
              </div>
              <button
                onClick={() => updateSetting('appearance', 'compactMode', !settings.appearance.compactMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.appearance.compactMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.appearance.compactMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
              <input
                type="text"
                value={settings.analytics.googleAnalyticsId}
                onChange={(e) => updateSetting('analytics', 'googleAnalyticsId', e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Veri Saklama Süresi (gün)</label>
              <input
                type="number"
                value={settings.analytics.dataRetentionDays}
                onChange={(e) => updateSetting('analytics', 'dataRetentionDays', parseInt(e.target.value))}
                min={30}
                max={730}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {[
              { key: 'trackingEnabled', label: 'İzleme Etkin', desc: 'Kullanıcı davranışlarını izle' },
              { key: 'cookieConsent', label: 'Çerez Onayı', desc: 'Çerez onay banner\'ı göster' },
              { key: 'anonymizeIp', label: 'IP Anonimleştir', desc: 'Kullanıcı IP adreslerini anonimleştir' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{item.label}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => updateSetting('analytics', item.key as keyof typeof settings.analytics, !settings.analytics[item.key as keyof typeof settings.analytics])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.analytics[item.key as keyof typeof settings.analytics] ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.analytics[item.key as keyof typeof settings.analytics] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Download className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Ayarları Dışa Aktar</h4>
                    <p className="text-sm text-gray-500 mt-1">Tüm ayarlarınızı JSON formatında indirin</p>
                    <Button variant="secondary" onClick={handleExportData} className="mt-4">
                      Dışa Aktar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <RefreshCw className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Ayarları Sıfırla</h4>
                    <p className="text-sm text-gray-500 mt-1">Tüm ayarları varsayılan değerlerine döndürün</p>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        if (confirm('Tüm ayarlar varsayılan değerlerine döndürülecek. Emin misiniz?')) {
                          setSettings(defaultSettings);
                        }
                      }}
                      className="mt-4"
                    >
                      Sıfırla
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Analitik Verilerini Temizle</h4>
                    <p className="text-sm text-gray-500 mt-1">Tüm ziyaretçi ve etkileşim verilerini sil</p>
                    <Button variant="danger" onClick={handleClearAnalytics} className="mt-4">
                      Verileri Temizle
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Dikkat</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Veri silme işlemleri geri alınamaz. İşlem yapmadan önce yedek almayı unutmayın.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Ayarlar</h1>
            <p className="text-sm text-gray-500">Site ve sistem yapılandırması</p>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={handleSave}
          className="flex items-center gap-2"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? 'Kaydedildi!' : 'Değişiklikleri Kaydet'}
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Tabs */}
        <div className="w-64 flex-shrink-0">
          <Card>
            <nav className="p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          <Card>
            <div className="p-6">
              {renderTabContent()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
