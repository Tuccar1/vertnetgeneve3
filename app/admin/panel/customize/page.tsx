'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Save, RefreshCw, Monitor, Smartphone, Tablet, Check, ChevronRight, RotateCcw, X } from 'lucide-react';

// Site içeriği tipi
interface SiteContent {
  // Header
  headerPhone1: string;
  headerPhone2: string;
  headerEmail: string;
  headerTagline: string;
  
  // Hero
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroButton1: string;
  heroButton2: string;
  
  // Hakkımızda
  aboutTitle: string;
  aboutSubtitle: string;
  aboutDescription: string;
  aboutMission: string;
  
  // Hizmetler
  servicesTitle: string;
  servicesSubtitle: string;
  
  // İletişim
  contactTitle: string;
  contactSubtitle: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  contactHours: string;
  
  // Yorumlar
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  
  // Footer
  footerDescription: string;
  footerCopyright: string;
  
  // Chatbot
  chatbotTitle: string;
  chatbotWelcome: string;
  
  // Rezervasyon
  bookingTitle: string;
  bookingSubtitle: string;
  
  // Blog
  blogTitle: string;
  blogSubtitle: string;
  
  // Portfolio
  portfolioTitle: string;
  portfolioSubtitle: string;
}

// Varsayılan içerik
const defaultContent: SiteContent = {
  headerPhone1: '+41 76 621 21 83',
  headerPhone2: '+41 78 531 89 03',
  headerEmail: 'info@vertnetgeneve.ch',
  headerTagline: 'Nettoyage Professionnel à Genève',
  
  heroBadge: '✨ Excellence en Nettoyage Professionnel ✨',
  heroTitle1: 'Votre Partenaire de',
  heroTitle2: 'Confiance',
  heroButton1: 'Demander un Devis',
  heroButton2: 'Nos Services',
  
  aboutTitle: 'À Propos de Nous',
  aboutSubtitle: "L'excellence dans les Services",
  aboutDescription: 'Chez Vertnetgeneve, nous sommes votre partenaire de confiance pour un environnement propre et sain.',
  aboutMission: 'Offrir des services de nettoyage de qualité supérieure.',
  
  servicesTitle: 'Nos Services',
  servicesSubtitle: 'Des Solutions Adaptées',
  
  contactTitle: 'Contactez-Nous',
  contactSubtitle: 'Nous Sommes à Votre Écoute',
  contactPhone: '+41 76 621 21 83',
  contactEmail: 'info@vertnetgeneve.ch',
  contactAddress: 'Genève, Suisse',
  contactHours: 'Lun - Sam: 7h00 - 20h00',
  
  testimonialsTitle: 'Témoignages',
  testimonialsSubtitle: 'Ce que nos clients disent',
  
  footerDescription: 'Services de nettoyage professionnel de qualité supérieure à Genève.',
  footerCopyright: '© 2024 Vertnetgeneve. Tous droits réservés.',
  
  chatbotTitle: 'Assistant Vertnetgeneve',
  chatbotWelcome: 'Bonjour! Comment puis-je vous aider?',
  
  bookingTitle: 'Réservation',
  bookingSubtitle: 'Planifiez votre service',
  
  blogTitle: 'Notre Blog',
  blogSubtitle: 'Actualités et conseils',
  
  portfolioTitle: 'Notre Portfolio',
  portfolioSubtitle: 'Nos réalisations',
};

// Kategoriler ve alanları
const categories = [
  {
    id: 'header',
    name: '📞 Üst Bar (Header)',
    page: '/',
    fields: [
      { key: 'headerPhone1', label: 'Telefon 1' },
      { key: 'headerPhone2', label: 'Telefon 2' },
      { key: 'headerEmail', label: 'E-posta' },
      { key: 'headerTagline', label: 'Slogan' },
    ]
  },
  {
    id: 'hero',
    name: '🏠 Ana Sayfa (Hero)',
    page: '/',
    fields: [
      { key: 'heroBadge', label: 'Rozet Yazısı' },
      { key: 'heroTitle1', label: 'Başlık 1' },
      { key: 'heroTitle2', label: 'Başlık 2' },
      { key: 'heroButton1', label: 'Buton 1' },
      { key: 'heroButton2', label: 'Buton 2' },
    ]
  },
  {
    id: 'about',
    name: 'ℹ️ Hakkımızda',
    page: '/a-propos',
    fields: [
      { key: 'aboutTitle', label: 'Başlık' },
      { key: 'aboutSubtitle', label: 'Alt Başlık' },
      { key: 'aboutDescription', label: 'Açıklama', multiline: true },
      { key: 'aboutMission', label: 'Misyon' },
    ]
  },
  {
    id: 'services',
    name: '🛠️ Hizmetler',
    page: '/services',
    fields: [
      { key: 'servicesTitle', label: 'Başlık' },
      { key: 'servicesSubtitle', label: 'Alt Başlık' },
    ]
  },
  {
    id: 'contact',
    name: '📧 İletişim',
    page: '/contact',
    fields: [
      { key: 'contactTitle', label: 'Başlık' },
      { key: 'contactSubtitle', label: 'Alt Başlık' },
      { key: 'contactPhone', label: 'Telefon' },
      { key: 'contactEmail', label: 'E-posta' },
      { key: 'contactAddress', label: 'Adres' },
      { key: 'contactHours', label: 'Çalışma Saatleri' },
    ]
  },
  {
    id: 'testimonials',
    name: '⭐ Müşteri Yorumları',
    page: '/',
    fields: [
      { key: 'testimonialsTitle', label: 'Başlık' },
      { key: 'testimonialsSubtitle', label: 'Alt Başlık' },
    ]
  },
  {
    id: 'booking',
    name: '📅 Rezervasyon',
    page: '/booking',
    fields: [
      { key: 'bookingTitle', label: 'Başlık' },
      { key: 'bookingSubtitle', label: 'Alt Başlık' },
    ]
  },
  {
    id: 'blog',
    name: '📝 Blog',
    page: '/blog',
    fields: [
      { key: 'blogTitle', label: 'Başlık' },
      { key: 'blogSubtitle', label: 'Alt Başlık' },
    ]
  },
  {
    id: 'portfolio',
    name: '🖼️ Portfolio',
    page: '/portfolio',
    fields: [
      { key: 'portfolioTitle', label: 'Başlık' },
      { key: 'portfolioSubtitle', label: 'Alt Başlık' },
    ]
  },
  {
    id: 'chatbot',
    name: '💬 Chatbot',
    page: '/',
    fields: [
      { key: 'chatbotTitle', label: 'Başlık' },
      { key: 'chatbotWelcome', label: 'Karşılama Mesajı' },
    ]
  },
  {
    id: 'footer',
    name: '📋 Footer',
    page: '/',
    fields: [
      { key: 'footerDescription', label: 'Açıklama' },
      { key: 'footerCopyright', label: 'Telif Hakkı' },
    ]
  },
];

export default function CustomizePage() {
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [originalContent, setOriginalContent] = useState<SiteContent>(defaultContent); // Orijinal içerik
  const [activeCategory, setActiveCategory] = useState('hero');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false); // Değişiklik var mı?
  const [previewUrl, setPreviewUrl] = useState('/');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Client-side mount
  useEffect(() => {
    setMounted(true);
    
    // localStorage'dan yükle
    try {
      const saved = localStorage.getItem('siteContent');
      if (saved) {
        const loadedContent = { ...defaultContent, ...JSON.parse(saved) };
        setContent(loadedContent);
        setOriginalContent(loadedContent); // Orijinali de kaydet
      } else {
        setOriginalContent(defaultContent);
      }
    } catch (e) {
      console.error('Yükleme hatası:', e);
    }
  }, []);

  // İçerik değiştiğinde iframe'e gönder
  const sendToPreview = useCallback((newContent: SiteContent) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'LIVE_UPDATE',
        content: newContent
      }, '*');
    }
  }, []);

  // Alan değişikliği
  const handleChange = (key: keyof SiteContent, value: string) => {
    const newContent = { ...content, [key]: value };
    setContent(newContent);
    sendToPreview(newContent);
    setSaved(false);
    setHasChanges(true);
  };

  // Değişiklikleri iptal et (son kaydedilene dön)
  const handleCancel = () => {
    setContent(originalContent);
    sendToPreview(originalContent);
    setHasChanges(false);
    setSaved(false);
  };

  // Tümünü varsayılana sıfırla
  const handleResetAll = () => {
    if (confirm('Tüm içerik varsayılan değerlere sıfırlanacak. Emin misiniz?')) {
      setContent(defaultContent);
      setOriginalContent(defaultContent);
      sendToPreview(defaultContent);
      localStorage.removeItem('siteContent');
      setHasChanges(false);
      setSaved(false);
    }
  };

  // Kategori değişikliği - önizlemeyi o sayfaya götür
  const handleCategoryClick = (category: typeof categories[0]) => {
    setActiveCategory(category.id);
    if (category.page !== previewUrl) {
      setPreviewUrl(category.page);
    }
  };

  // Kaydet
  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('siteContent', JSON.stringify(content));
      setOriginalContent(content); // Kaydedileni orijinal yap
      setSaved(true);
      setHasChanges(false);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error('Kaydetme hatası:', e);
    }
    setSaving(false);
  };

  // Önizlemeyi yenile
  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  // iframe yüklendiğinde içerik gönder
  const handleIframeLoad = () => {
    setTimeout(() => sendToPreview(content), 500);
  };

  // Device boyutları
  const deviceSizes = {
    desktop: { width: '100%', maxWidth: '100%' },
    tablet: { width: '768px', maxWidth: '768px' },
    mobile: { width: '375px', maxWidth: '375px' },
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const currentCategory = categories.find(c => c.id === activeCategory);

  return (
    <div className="flex h-screen bg-gray-100 -m-6 -mt-4">
      {/* Sol Panel - Düzenleyici */}
      <div className="w-80 bg-white border-r flex flex-col">
        {/* Başlık */}
        <div className="p-4 border-b bg-emerald-50">
          <h1 className="text-lg font-bold text-emerald-800">✏️ Site Düzenleyici</h1>
          <p className="text-xs text-emerald-600 mt-1">Değişiklikler anında görünür</p>
        </div>

        {/* Kategoriler */}
        <div className="flex-1 overflow-y-auto">
          {categories.map((cat) => (
            <div key={cat.id}>
              {/* Kategori Başlığı */}
              <button
                onClick={() => handleCategoryClick(cat)}
                className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-emerald-100 text-emerald-800 border-l-4 border-emerald-500'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="font-medium text-sm">{cat.name}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  activeCategory === cat.id ? 'rotate-90' : ''
                }`} />
              </button>

              {/* Kategori Alanları */}
              {activeCategory === cat.id && (
                <div className="bg-gray-50 px-4 py-3 space-y-3">
                  {cat.fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {field.label}
                      </label>
                      {field.multiline ? (
                        <textarea
                          value={content[field.key as keyof SiteContent]}
                          onChange={(e) => handleChange(field.key as keyof SiteContent, e.target.value)}
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                          rows={3}
                        />
                      ) : (
                        <input
                          type="text"
                          value={content[field.key as keyof SiteContent]}
                          onChange={(e) => handleChange(field.key as keyof SiteContent, e.target.value)}
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Kaydet ve İptal Butonları */}
        <div className="p-4 border-t bg-white space-y-2">
          {/* Değişiklik varsa iptal butonu göster */}
          {hasChanges && (
            <button
              onClick={handleCancel}
              className="w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
            >
              <X className="w-4 h-4" />
              Değişiklikleri İptal Et
            </button>
          )}
          
          {/* Kaydet Butonu */}
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : hasChanges
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {saving ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : saved ? (
              <>
                <Check className="w-5 h-5" />
                Kaydedildi!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {hasChanges ? 'Değişiklikleri Kaydet' : 'Değişiklik Yok'}
              </>
            )}
          </button>
          
          {/* Tümünü Sıfırla */}
          <button
            onClick={handleResetAll}
            className="w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-red-600 hover:bg-red-50 border border-red-200"
          >
            <RotateCcw className="w-4 h-4" />
            Tümünü Varsayılana Sıfırla
          </button>
        </div>
      </div>

      {/* Sağ Panel - Önizleme */}
      <div className="flex-1 flex flex-col">
        {/* Önizleme Araç Çubuğu */}
        <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Önizleme:</span>
            <span className="text-sm font-medium text-emerald-600">{currentCategory?.name}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Cihaz Seçimi */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'desktop' ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Masaüstü"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'tablet' ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Tablet"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'mobile' ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Mobil"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Yenile */}
            <button
              onClick={refreshPreview}
              className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Önizlemeyi Yenile"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* iframe Önizleme */}
        <div className="flex-1 bg-gray-200 p-4 flex items-start justify-center overflow-auto">
          <div
            className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300"
            style={{
              width: deviceSizes[device].width,
              maxWidth: deviceSizes[device].maxWidth,
              height: device === 'desktop' ? '100%' : '85vh',
            }}
          >
            <iframe
              ref={iframeRef}
              src={`${previewUrl}?preview=true`}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
