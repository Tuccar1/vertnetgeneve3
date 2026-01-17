// Profesyonel Tema Şablonları
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
  headingWeight: number;
  bodyWeight: number;
}

export interface ThemeComponents {
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  buttons: {
    borderRadius: string;
    paddingX: string;
    paddingY: string;
  };
  cards: {
    borderRadius: string;
    shadow: string;
  };
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  components: ThemeComponents;
}

export const themePresets: ThemePreset[] = [
  {
    id: 'professional-blue',
    name: 'Profesyonel Mavi',
    description: 'Kurumsal ve güvenilir görünüm',
    thumbnail: '🏢',
    colors: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textMuted: '#64748b',
      border: '#e2e8f0',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      headingWeight: 700,
      bodyWeight: 400,
    },
    components: {
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      },
      buttons: {
        borderRadius: '0.5rem',
        paddingX: '1.5rem',
        paddingY: '0.75rem',
      },
      cards: {
        borderRadius: '0.75rem',
        shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      },
    },
  },
  {
    id: 'modern-green',
    name: 'Modern Yeşil',
    description: 'Eko-dostu ve doğal',
    thumbnail: '🌿',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#f97316',
      background: '#ffffff',
      surface: '#f0fdf4',
      text: '#1f2937',
      textMuted: '#6b7280',
      border: '#d1fae5',
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter',
      headingWeight: 600,
      bodyWeight: 400,
    },
    components: {
      borderRadius: {
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      shadows: {
        sm: '0 1px 3px 0 rgb(16 185 129 / 0.1)',
        md: '0 4px 6px -1px rgb(16 185 129 / 0.1)',
        lg: '0 10px 15px -3px rgb(16 185 129 / 0.1)',
      },
      buttons: {
        borderRadius: '9999px',
        paddingX: '2rem',
        paddingY: '0.875rem',
      },
      cards: {
        borderRadius: '1rem',
        shadow: '0 4px 6px -1px rgb(16 185 129 / 0.1)',
      },
    },
  },
  {
    id: 'minimalist-gray',
    name: 'Minimalist Gri',
    description: 'Sade ve şık tasarım',
    thumbnail: '⬜',
    colors: {
      primary: '#374151',
      secondary: '#4b5563',
      accent: '#3b82f6',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
      textMuted: '#9ca3af',
      border: '#e5e7eb',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      headingWeight: 500,
      bodyWeight: 400,
    },
    components: {
      borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
        md: '0 2px 4px -1px rgb(0 0 0 / 0.06)',
        lg: '0 4px 6px -2px rgb(0 0 0 / 0.05)',
      },
      buttons: {
        borderRadius: '0.375rem',
        paddingX: '1.25rem',
        paddingY: '0.625rem',
      },
      cards: {
        borderRadius: '0.5rem',
        shadow: '0 1px 3px 0 rgb(0 0 0 / 0.05)',
      },
    },
  },
  {
    id: 'vibrant-orange',
    name: 'Canlı Turuncu',
    description: 'Enerjik ve dikkat çekici',
    thumbnail: '🔥',
    colors: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#0ea5e9',
      background: '#fffbeb',
      surface: '#fef3c7',
      text: '#1c1917',
      textMuted: '#78716c',
      border: '#fed7aa',
    },
    fonts: {
      heading: 'Poppins',
      body: 'Open Sans',
      headingWeight: 700,
      bodyWeight: 400,
    },
    components: {
      borderRadius: {
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      shadows: {
        sm: '0 2px 4px 0 rgb(249 115 22 / 0.15)',
        md: '0 6px 12px -2px rgb(249 115 22 / 0.2)',
        lg: '0 12px 24px -4px rgb(249 115 22 / 0.25)',
      },
      buttons: {
        borderRadius: '0.75rem',
        paddingX: '1.75rem',
        paddingY: '0.875rem',
      },
      cards: {
        borderRadius: '1rem',
        shadow: '0 6px 12px -2px rgb(249 115 22 / 0.15)',
      },
    },
  },
  {
    id: 'elegant-purple',
    name: 'Elegant Mor',
    description: 'Premium ve sofistike',
    thumbnail: '👑',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#ec4899',
      background: '#faf5ff',
      surface: '#f3e8ff',
      text: '#1e1b4b',
      textMuted: '#6b7280',
      border: '#ddd6fe',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
      headingWeight: 600,
      bodyWeight: 400,
    },
    components: {
      borderRadius: {
        sm: '0.375rem',
        md: '0.625rem',
        lg: '1rem',
        xl: '1.25rem',
      },
      shadows: {
        sm: '0 2px 4px 0 rgb(139 92 246 / 0.1)',
        md: '0 8px 16px -4px rgb(139 92 246 / 0.15)',
        lg: '0 16px 32px -8px rgb(139 92 246 / 0.2)',
      },
      buttons: {
        borderRadius: '0.625rem',
        paddingX: '2rem',
        paddingY: '0.875rem',
      },
      cards: {
        borderRadius: '1rem',
        shadow: '0 8px 16px -4px rgb(139 92 246 / 0.12)',
      },
    },
  },
];

// Varsayılan tema
export const defaultThemeSettings = themePresets[0];

// Tema ayarlarından CSS değişkenleri oluştur
export function generateCSSVariables(preset: ThemePreset): Record<string, string> {
  return {
    '--color-primary': preset.colors.primary,
    '--color-secondary': preset.colors.secondary,
    '--color-accent': preset.colors.accent,
    '--color-background': preset.colors.background,
    '--color-surface': preset.colors.surface,
    '--color-text': preset.colors.text,
    '--color-text-muted': preset.colors.textMuted,
    '--color-border': preset.colors.border,
    '--font-heading': preset.fonts.heading,
    '--font-body': preset.fonts.body,
    '--font-heading-weight': String(preset.fonts.headingWeight),
    '--font-body-weight': String(preset.fonts.bodyWeight),
    '--radius-sm': preset.components.borderRadius.sm,
    '--radius-md': preset.components.borderRadius.md,
    '--radius-lg': preset.components.borderRadius.lg,
    '--radius-xl': preset.components.borderRadius.xl,
    '--shadow-sm': preset.components.shadows.sm,
    '--shadow-md': preset.components.shadows.md,
    '--shadow-lg': preset.components.shadows.lg,
    '--btn-radius': preset.components.buttons.borderRadius,
    '--btn-px': preset.components.buttons.paddingX,
    '--btn-py': preset.components.buttons.paddingY,
    '--card-radius': preset.components.cards.borderRadius,
    '--card-shadow': preset.components.cards.shadow,
  };
}

// Google Fonts
export const googleFonts = [
  { name: 'Inter', url: 'Inter:wght@300;400;500;600;700' },
  { name: 'Poppins', url: 'Poppins:wght@300;400;500;600;700' },
  { name: 'Roboto', url: 'Roboto:wght@300;400;500;700' },
  { name: 'Open Sans', url: 'Open+Sans:wght@300;400;500;600;700' },
  { name: 'Montserrat', url: 'Montserrat:wght@300;400;500;600;700' },
  { name: 'Playfair Display', url: 'Playfair+Display:wght@400;500;600;700' },
];

export function getGoogleFontsUrl(fonts: string[]): string {
  const filtered = fonts.filter(Boolean);
  const uniqueFonts = filtered.filter((font, index) => filtered.indexOf(font) === index);
  const fontUrls = uniqueFonts
    .map(font => googleFonts.find(f => f.name === font)?.url)
    .filter(Boolean);
  
  if (fontUrls.length === 0) return '';
  
  return `https://fonts.googleapis.com/css2?${fontUrls.map(f => `family=${f}`).join('&')}&display=swap`;
}
