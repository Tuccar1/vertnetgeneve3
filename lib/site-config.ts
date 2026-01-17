// Site Ayarları Yapılandırması
import { ThemePreset, defaultThemeSettings } from './theme-presets';

// İçerik ayarları interface'i (mevcut sistemden)
export interface SiteContent {
  hero: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    ctaButton: string;
    secondaryButton: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    features: {
      title: string;
      description: string;
    }[];
    missionTitle: string;
    missionDescription: string;
  };
  services: {
    title: string;
    subtitle: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    formLabels: {
      name: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
    };
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  footer: {
    description: string;
    copyright: string;
    links: {
      title: string;
      items: string[];
    }[];
  };
  chatbot: {
    welcomeMessage: string;
    placeholder: string;
    greeting: string;
  };
}

// Tam site ayarları
export interface SiteSettingsData {
  theme: ThemePreset;
  content: SiteContent;
  branding: {
    logo: string | null;
    favicon: string | null;
    siteTitle: string;
    siteDescription: string;
  };
}

// Varsayılan içerik (mevcut sistemden)
export const defaultContent: SiteContent = {
  hero: {
    badge: '✨ Excellence en Nettoyage Professionnel ✨',
    title1: 'Votre Partenaire de',
    title2: 'Confiance en Propreté',
    description: 'Des services de nettoyage professionnels et écologiques pour particuliers et entreprises. Qualité garantie, disponibilité 24/7.',
    ctaButton: 'Demander un Devis Gratuit',
    secondaryButton: 'Découvrir Nos Services',
  },
  about: {
    title: 'À Propos de Notre Entreprise',
    subtitle: "L'excellence dans les Services de Nettoyage",
    description: "Chez Vertnetgeneve, nous ne sommes pas seulement un prestataire de services de nettoyage—nous sommes votre partenaire de confiance pour maintenir un environnement propre, sain et durable.",
    features: [
      {
        title: 'Disponibilité 24h/24 et 7j/7',
        description: "Nous comprenons que la vie ne s'arrête pas, et nous non plus. Nos services de nettoyage sont disponibles 24h/24 et 7j/7.",
      },
      {
        title: 'Garantie de satisfaction client à 100%',
        description: "Votre satisfaction est notre objectif ultime. Si vous n'êtes pas entièrement satisfait, nous continuerons jusqu'à ce que tout soit parfait.",
      },
      {
        title: 'Approche écologique',
        description: "Nous avons à cœur de protéger la planète. C'est pourquoi nous utilisons des produits de nettoyage écologiques.",
      },
      {
        title: 'Durabilité au cœur de nos valeurs',
        description: "La durabilité n'est pas qu'un mot à la mode pour nous—c'est une valeur fondamentale.",
      },
    ],
    missionTitle: 'Notre Mission',
    missionDescription: "Offrir des services de nettoyage de qualité supérieure tout en respectant l'environnement.",
  },
  services: {
    title: 'Nos Services',
    subtitle: 'Des Solutions Adaptées à Vos Besoins',
    description: 'Découvrez notre gamme complète de services de nettoyage professionnel.',
    items: [
      { title: 'Canapés et fauteuils', description: 'Nettoyage professionnel de canapés et fauteuils.' },
      { title: 'Fin de Bail', description: 'Service de nettoyage pour fin de bail.' },
      { title: 'Fin de Chantier', description: 'Nettoyage après travaux.' },
      { title: 'Conciergerie', description: 'Services de conciergerie.' },
      { title: 'Immeubles', description: "Nettoyage d'immeubles." },
      { title: 'Bureaux', description: 'Nettoyage de bureaux.' },
      { title: 'Toiture', description: 'Nettoyage de toiture.' },
      { title: 'Vitres', description: 'Nettoyage de vitres.' },
    ],
  },
  contact: {
    title: 'Contactez-Nous',
    subtitle: 'Nous Sommes à Votre Écoute',
    description: "N'hésitez pas à nous contacter pour toute question ou demande de devis.",
    formLabels: {
      name: 'Nom complet',
      email: 'Adresse e-mail',
      phone: 'Numéro de téléphone',
      message: 'Votre message',
      submit: 'Envoyer le Message',
    },
  },
  testimonials: {
    title: 'Témoignages',
    subtitle: 'Ce Que Disent Nos Clients',
  },
  footer: {
    description: 'Votre partenaire de confiance pour tous vos besoins en nettoyage professionnel.',
    copyright: '© 2024 Vertnetgeneve. Tous droits réservés.',
    links: [
      { title: 'Services', items: ['Nettoyage Résidentiel', 'Nettoyage Commercial', 'Nettoyage Industriel'] },
      { title: 'Entreprise', items: ['À Propos', 'Contact', 'Blog'] },
      { title: 'Légal', items: ['Politique de Confidentialité', "Conditions d'Utilisation"] },
    ],
  },
  chatbot: {
    welcomeMessage: 'Bonjour! Comment puis-je vous aider?',
    placeholder: 'Écrivez votre message...',
    greeting: 'Je suis votre assistant virtuel. Posez-moi vos questions!',
  },
};

// Varsayılan site ayarları
export const defaultSiteSettings: SiteSettingsData = {
  theme: defaultThemeSettings,
  content: defaultContent,
  branding: {
    logo: null,
    favicon: null,
    siteTitle: 'Vertnetgeneve',
    siteDescription: 'Excellence en Nettoyage Professionnel à Genève',
  },
};

// History item
export interface HistoryItem {
  id: string;
  timestamp: Date;
  changes: {
    path: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  settings: SiteSettingsData;
}

// Yardımcı fonksiyonlar
export function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const keys = path.split('.');
  const newObj = JSON.parse(JSON.stringify(obj));
  let current = newObj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  
  current[keys[keys.length - 1]] = value;
  return newObj;
}

export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }
  
  return current;
}
