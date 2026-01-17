import { useState, useCallback, useRef, useEffect } from 'react';
import { SiteSettingsData, defaultSiteSettings, setNestedValue, HistoryItem } from '@/lib/site-config';
import { ThemePreset, themePresets } from '@/lib/theme-presets';

const MAX_HISTORY = 100; // 100+ geçmiş kaydı

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function useCustomizer() {
  // Ana state
  const [settings, setSettings] = useState<SiteSettingsData>(defaultSiteSettings);
  const [publishedSettings, setPublishedSettings] = useState<SiteSettingsData>(defaultSiteSettings);
  
  // History state
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Ref to track if we should add to history
  const skipHistoryRef = useRef(false);
  
  // Undo/Redo durumları
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;
  
  // LocalStorage'dan yükle
  useEffect(() => {
    const loadSettings = () => {
      setIsLoading(true);
      try {
        // Taslak ayarları yükle
        const savedDraft = localStorage.getItem('siteSettingsDraft');
        if (savedDraft) {
          const parsed = JSON.parse(savedDraft);
          setSettings(parsed);
        }
        
        // Yayınlanmış ayarları yükle
        const savedPublished = localStorage.getItem('siteSettingsPublished');
        if (savedPublished) {
          const parsed = JSON.parse(savedPublished);
          setPublishedSettings(parsed);
        }
        
        // Mevcut içerik sisteminden yükle (geriye uyumluluk)
        const savedContent = localStorage.getItem('siteContent');
        if (savedContent && !savedDraft) {
          const parsed = JSON.parse(savedContent);
          setSettings(prev => ({
            ...prev,
            content: { ...prev.content, ...parsed }
          }));
        }
        
        // History yükle
        const savedHistory = localStorage.getItem('siteSettingsHistory');
        if (savedHistory) {
          const parsed = JSON.parse(savedHistory);
          setHistory(parsed.slice(-MAX_HISTORY));
          setCurrentIndex(parsed.length - 1);
        }
      } catch (error) {
        console.error('Ayarlar yüklenirken hata:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, []);
  
  // Ayar güncelle
  const updateSetting = useCallback((path: string, value: unknown) => {
    setSettings(prev => {
      const newSettings = setNestedValue(prev as unknown as Record<string, unknown>, path, value) as unknown as SiteSettingsData;
      
      // History'e ekle (skipHistory false ise)
      if (!skipHistoryRef.current) {
        const historyItem: HistoryItem = {
          id: generateId(),
          timestamp: new Date(),
          changes: [{ path, oldValue: null, newValue: value }],
          settings: newSettings,
        };
        
        setHistory(prevHistory => {
          // Eğer mevcut indexten sonra kayıtlar varsa sil
          const truncated = prevHistory.slice(0, currentIndex + 1);
          const newHistory = [...truncated, historyItem].slice(-MAX_HISTORY);
          
          // LocalStorage'a kaydet
          try {
            localStorage.setItem('siteSettingsHistory', JSON.stringify(newHistory));
          } catch (e) {
            console.error('History kaydedilemedi:', e);
          }
          
          return newHistory;
        });
        
        setCurrentIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
      }
      
      // Taslağı kaydet
      try {
        localStorage.setItem('siteSettingsDraft', JSON.stringify(newSettings));
      } catch (e) {
        console.error('Taslak kaydedilemedi:', e);
      }
      
      return newSettings;
    });
  }, [currentIndex]);
  
  // Tema değiştir
  const applyThemePreset = useCallback((presetId: string) => {
    const preset = themePresets.find(p => p.id === presetId);
    if (preset) {
      updateSetting('theme', preset);
    }
  }, [updateSetting]);
  
  // Renk güncelle
  const updateColor = useCallback((colorKey: string, value: string) => {
    updateSetting(`theme.colors.${colorKey}`, value);
  }, [updateSetting]);
  
  // Font güncelle
  const updateFont = useCallback((fontKey: string, value: string | number) => {
    updateSetting(`theme.fonts.${fontKey}`, value);
  }, [updateSetting]);
  
  // Bileşen ayarı güncelle
  const updateComponent = useCallback((componentPath: string, value: string) => {
    updateSetting(`theme.components.${componentPath}`, value);
  }, [updateSetting]);
  
  // İçerik güncelle
  const updateContent = useCallback((contentPath: string, value: unknown) => {
    updateSetting(`content.${contentPath}`, value);
  }, [updateSetting]);
  
  // Geri al (Undo)
  const undo = useCallback(() => {
    if (!canUndo) return;
    
    skipHistoryRef.current = true;
    const prevIndex = currentIndex - 1;
    const prevSettings = history[prevIndex]?.settings || defaultSiteSettings;
    
    setSettings(prevSettings);
    setCurrentIndex(prevIndex);
    
    try {
      localStorage.setItem('siteSettingsDraft', JSON.stringify(prevSettings));
    } catch (e) {
      console.error('Undo kaydedilemedi:', e);
    }
    
    skipHistoryRef.current = false;
  }, [canUndo, currentIndex, history]);
  
  // İleri al (Redo)
  const redo = useCallback(() => {
    if (!canRedo) return;
    
    skipHistoryRef.current = true;
    const nextIndex = currentIndex + 1;
    const nextSettings = history[nextIndex]?.settings || settings;
    
    setSettings(nextSettings);
    setCurrentIndex(nextIndex);
    
    try {
      localStorage.setItem('siteSettingsDraft', JSON.stringify(nextSettings));
    } catch (e) {
      console.error('Redo kaydedilemedi:', e);
    }
    
    skipHistoryRef.current = false;
  }, [canRedo, currentIndex, history, settings]);
  
  // Yayınlanmış ayarlara sıfırla
  const resetToPublished = useCallback(() => {
    skipHistoryRef.current = true;
    setSettings(publishedSettings);
    
    try {
      localStorage.setItem('siteSettingsDraft', JSON.stringify(publishedSettings));
    } catch (e) {
      console.error('Sıfırlama kaydedilemedi:', e);
    }
    
    skipHistoryRef.current = false;
  }, [publishedSettings]);
  
  // Varsayılana sıfırla
  const resetToDefault = useCallback(() => {
    skipHistoryRef.current = true;
    setSettings(defaultSiteSettings);
    
    try {
      localStorage.setItem('siteSettingsDraft', JSON.stringify(defaultSiteSettings));
    } catch (e) {
      console.error('Varsayılana sıfırlama kaydedilemedi:', e);
    }
    
    skipHistoryRef.current = false;
  }, []);
  
  // Yayınla
  const publish = useCallback(async () => {
    setIsSaving(true);
    
    try {
      // Simüle API çağrısı (gerçek uygulamada API'ye gönderilir)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPublishedSettings(settings);
      
      // LocalStorage'a kaydet
      localStorage.setItem('siteSettingsPublished', JSON.stringify(settings));
      
      // Mevcut içerik sistemine de kaydet (geriye uyumluluk)
      localStorage.setItem('siteContent', JSON.stringify(settings.content));
      
      return true;
    } catch (error) {
      console.error('Yayınlama hatası:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [settings]);
  
  // Değişiklik var mı?
  const hasChanges = JSON.stringify(settings) !== JSON.stringify(publishedSettings);
  
  return {
    // State
    settings,
    publishedSettings,
    history,
    currentIndex,
    
    // Loading
    isLoading,
    isSaving,
    
    // Undo/Redo
    canUndo,
    canRedo,
    undo,
    redo,
    
    // Güncellemeler
    updateSetting,
    applyThemePreset,
    updateColor,
    updateFont,
    updateComponent,
    updateContent,
    
    // Aksiyonlar
    resetToPublished,
    resetToDefault,
    publish,
    
    // Durum
    hasChanges,
  };
}
