'use client';

import { useEffect, useCallback } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // DOM içeriğini güncelle - id attribute'larına göre
  const updateDOM = useCallback((content: Record<string, unknown>) => {
    Object.entries(content).forEach(([key, value]) => {
      // ID ile elementi bul (live-edit- prefix ile)
      const el = document.getElementById(`live-edit-${key}`);
      if (!el) return;
      
      if (typeof value === 'string') {
        // Element türüne göre güncelle
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          (el as HTMLInputElement).value = value;
        } else {
          el.textContent = value;
        }
      }
    });
    
    console.log('DOM güncellendi:', Object.keys(content).length, 'alan');
  }, []);

  useEffect(() => {
    // PostMessage dinleyici
    const handleMessage = (event: MessageEvent) => {
      const { type, content } = event.data || {};
      
      if (type === 'LIVE_UPDATE' && content) {
        console.log('LIVE_UPDATE alındı');
        updateDOM(content);
      }
      
      if (type === 'PING') {
        window.parent.postMessage({ type: 'PONG' }, '*');
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Parent'a hazır olduğunu bildir (iframe içindeyse)
    if (window.parent !== window) {
      console.log('Preview modunda, PREVIEW_READY gönderiliyor');
      window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');
    }

    return () => window.removeEventListener('message', handleMessage);
  }, [updateDOM]);

  return <>{children}</>;
}

export default ThemeProvider;
