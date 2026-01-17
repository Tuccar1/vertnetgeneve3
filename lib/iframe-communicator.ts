// Iframe İletişim Sistemi
export interface IframeMessage {
  type: 'UPDATE_SETTINGS' | 'UPDATE_THEME' | 'UPDATE_CONTENT' | 'SYNC_REQUEST' | 'SYNC_RESPONSE' | 'IFRAME_READY' | 'SETTINGS_APPLIED';
  payload?: unknown;
}

// Iframe'e mesaj gönder
export function sendToIframe(iframe: HTMLIFrameElement, message: IframeMessage) {
  if (iframe.contentWindow) {
    iframe.contentWindow.postMessage(message, '*');
  }
}

// Iframe mesajlarını dinle
export function listenToIframe(callback: (message: IframeMessage) => void) {
  const handler = (event: MessageEvent) => {
    if (event.data && event.data.type) {
      callback(event.data);
    }
  };
  
  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
}

// Iframe içine enjekte edilecek script
export const previewScript = `
(function() {
  'use strict';
  
  // Zaten yüklenmişse çık
  if (window.__PREVIEW_SCRIPT_LOADED__) return;
  window.__PREVIEW_SCRIPT_LOADED__ = true;
  
  console.log('🎨 Preview script loaded');
  
  // Mesaj dinleyici
  window.addEventListener('message', function(event) {
    const { type, payload } = event.data || {};
    
    switch (type) {
      case 'UPDATE_SETTINGS':
        applyFullSettings(payload);
        break;
      case 'UPDATE_THEME':
        applyThemeSettings(payload);
        break;
      case 'UPDATE_CONTENT':
        applyContentSettings(payload);
        break;
      case 'SYNC_REQUEST':
        window.parent.postMessage({ type: 'SYNC_RESPONSE', payload: getCurrentSettings() }, '*');
        break;
    }
  });
  
  // Tam ayarları uygula
  function applyFullSettings(settings) {
    if (!settings) return;
    
    if (settings.theme) {
      applyThemeSettings(settings.theme);
    }
    
    if (settings.content) {
      applyContentSettings(settings.content);
    }
    
    notifyParent('SETTINGS_APPLIED');
  }
  
  // Tema ayarlarını uygula (CSS değişkenleri)
  function applyThemeSettings(theme) {
    if (!theme) return;
    
    const root = document.documentElement;
    
    // Renkler
    if (theme.colors) {
      root.style.setProperty('--color-primary', theme.colors.primary);
      root.style.setProperty('--color-secondary', theme.colors.secondary);
      root.style.setProperty('--color-accent', theme.colors.accent);
      root.style.setProperty('--color-background', theme.colors.background);
      root.style.setProperty('--color-surface', theme.colors.surface);
      root.style.setProperty('--color-text', theme.colors.text);
      root.style.setProperty('--color-text-muted', theme.colors.textMuted);
      root.style.setProperty('--color-border', theme.colors.border);
    }
    
    // Fontlar
    if (theme.fonts) {
      root.style.setProperty('--font-heading', theme.fonts.heading + ', system-ui, sans-serif');
      root.style.setProperty('--font-body', theme.fonts.body + ', system-ui, sans-serif');
      root.style.setProperty('--font-heading-weight', theme.fonts.headingWeight);
      root.style.setProperty('--font-body-weight', theme.fonts.bodyWeight);
      
      // Google Fonts yükle
      loadGoogleFonts([theme.fonts.heading, theme.fonts.body]);
    }
    
    // Bileşenler
    if (theme.components) {
      // Border radius
      if (theme.components.borderRadius) {
        root.style.setProperty('--radius-sm', theme.components.borderRadius.sm);
        root.style.setProperty('--radius-md', theme.components.borderRadius.md);
        root.style.setProperty('--radius-lg', theme.components.borderRadius.lg);
        root.style.setProperty('--radius-xl', theme.components.borderRadius.xl);
      }
      
      // Gölgeler
      if (theme.components.shadows) {
        root.style.setProperty('--shadow-sm', theme.components.shadows.sm);
        root.style.setProperty('--shadow-md', theme.components.shadows.md);
        root.style.setProperty('--shadow-lg', theme.components.shadows.lg);
      }
      
      // Butonlar
      if (theme.components.buttons) {
        root.style.setProperty('--btn-radius', theme.components.buttons.borderRadius);
        root.style.setProperty('--btn-px', theme.components.buttons.paddingX);
        root.style.setProperty('--btn-py', theme.components.buttons.paddingY);
      }
      
      // Kartlar
      if (theme.components.cards) {
        root.style.setProperty('--card-radius', theme.components.cards.borderRadius);
        root.style.setProperty('--card-shadow', theme.components.cards.shadow);
      }
    }
    
    console.log('🎨 Theme applied:', theme.id || 'custom');
  }
  
  // İçerik ayarlarını uygula
  function applyContentSettings(content) {
    if (!content) return;
    
    // data-editable attribute'ları bul ve güncelle
    const editableElements = {
      // Hero
      'hero-badge': content.hero?.badge,
      'hero-title1': content.hero?.title1,
      'hero-title2': content.hero?.title2,
      'hero-description': content.hero?.description,
      'hero-cta': content.hero?.ctaButton,
      'hero-secondary': content.hero?.secondaryButton,
      
      // About
      'about-title': content.about?.title,
      'about-subtitle': content.about?.subtitle,
      'about-description': content.about?.description,
      'about-mission-title': content.about?.missionTitle,
      'about-mission-description': content.about?.missionDescription,
      
      // Services
      'services-title': content.services?.title,
      'services-subtitle': content.services?.subtitle,
      'services-description': content.services?.description,
      
      // Contact
      'contact-title': content.contact?.title,
      'contact-subtitle': content.contact?.subtitle,
      'contact-description': content.contact?.description,
      
      // Testimonials
      'testimonials-title': content.testimonials?.title,
      'testimonials-subtitle': content.testimonials?.subtitle,
      
      // Footer
      'footer-description': content.footer?.description,
      'footer-copyright': content.footer?.copyright,
    };
    
    Object.entries(editableElements).forEach(([selector, text]) => {
      if (text !== undefined) {
        const elements = document.querySelectorAll('[data-editable="' + selector + '"]');
        elements.forEach(el => {
          el.textContent = text;
        });
      }
    });
    
    console.log('📝 Content applied');
  }
  
  // Google Fonts yükle
  function loadGoogleFonts(fonts) {
    const uniqueFonts = [...new Set(fonts.filter(Boolean))];
    const fontUrls = {
      'Inter': 'Inter:wght@300;400;500;600;700',
      'Poppins': 'Poppins:wght@300;400;500;600;700',
      'Roboto': 'Roboto:wght@300;400;500;700',
      'Open Sans': 'Open+Sans:wght@300;400;500;600;700',
      'Montserrat': 'Montserrat:wght@300;400;500;600;700',
      'Playfair Display': 'Playfair+Display:wght@400;500;600;700',
    };
    
    uniqueFonts.forEach(font => {
      if (fontUrls[font]) {
        const linkId = 'google-font-' + font.replace(/\\s+/g, '-').toLowerCase();
        if (!document.getElementById(linkId)) {
          const link = document.createElement('link');
          link.id = linkId;
          link.rel = 'stylesheet';
          link.href = 'https://fonts.googleapis.com/css2?family=' + fontUrls[font] + '&display=swap';
          document.head.appendChild(link);
        }
      }
    });
  }
  
  // Mevcut ayarları getir
  function getCurrentSettings() {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    
    return {
      colors: {
        primary: style.getPropertyValue('--color-primary').trim(),
        secondary: style.getPropertyValue('--color-secondary').trim(),
        accent: style.getPropertyValue('--color-accent').trim(),
      }
    };
  }
  
  // Ana pencereye bildir
  function notifyParent(type, payload) {
    window.parent.postMessage({ type, payload }, '*');
  }
  
  // Sayfa yüklendiğinde hazır olduğunu bildir
  if (document.readyState === 'complete') {
    notifyParent('IFRAME_READY');
  } else {
    window.addEventListener('load', function() {
      notifyParent('IFRAME_READY');
    });
  }
})();
`;

// Script'i HTML string olarak döndür
export function getPreviewScriptTag(): string {
  return `<script>${previewScript}</script>`;
}
