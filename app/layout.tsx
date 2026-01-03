import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import RouteProgressBar from '@/components/RouteProgressBar'
import Chatbot from '@/components/Chatbot'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Vertnetgeneve - Excellence en Nettoyage Professionnel',
    template: '%s | Vertnetgeneve',
  },
  description: 'Services de nettoyage professionnel de qualité supérieure à Genève. Disponible 24h/24 et 7j/7. Canapés, Fin de Bail, Fin de Chantier, Conciergerie, Immeubles, Bureaux, Toiture, Vitres, Façade.',
  keywords: 'nettoyage, Genève, Suisse, nettoyage professionnel, nettoyage commercial, nettoyage résidentiel',
  authors: [{ name: 'Vernetgeneve' }],
  creator: 'Vertnetgeneve',
  publisher: 'Vertnetgeneve',
  metadataBase: new URL('https://www.vertnetgeneve.ch'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: 'https://www.vertnetgeneve.ch',
    siteName: 'Vertnetgeneve',
    title: 'Vertnetgeneve - Excellence en Nettoyage Professionnel',
    description: 'Services de nettoyage professionnel de qualité supérieure à Genève',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vertnetgeneve',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vertnetgeneve - Excellence en Nettoyage Professionnel',
    description: 'Services de nettoyage professionnel de qualité supérieure à Genève',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="overflow-x-hidden" style={{ width: '100%', maxWidth: '100vw' }} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <link rel="stylesheet" href="/critical.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Vertnetgeneve",
              "description": "Services de nettoyage professionnel de qualité supérieure à Genève. Disponible 24h/24 et 7j/7.",
              "url": "https://www.vertnetgeneve.ch",
              "telephone": "+41772152255",
              "email": "info@vertnetgeneve.ch",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Genève",
                "addressCountry": "CH"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "46.2044",
                "longitude": "6.1432"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "priceRange": "$$",
              "image": "https://www.vertnetgeneve.ch/og-image.jpg",
              "sameAs": [
                "https://www.vertnetgeneve.ch"
              ],
              "areaServed": {
                "@type": "City",
                "name": "Genève"
              },
              "serviceType": [
                "Nettoyage de canapés",
                "Nettoyage fin de bail",
                "Nettoyage fin de chantier",
                "Conciergerie",
                "Nettoyage d'immeubles",
                "Nettoyage de bureaux",
                "Nettoyage de toiture",
                "Nettoyage de vitres",
                "Nettoyage de façade"
              ]
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function adjustScaledHeight() {
                  if (window.innerWidth < 769) {
                    var wrapper = document.getElementById('page-wrapper');
                    var body = document.body;
                    var html = document.documentElement;
                    if (wrapper) {
                      wrapper.style.height = '';
                      wrapper.style.minHeight = '';
                    }
                    body.style.height = '';
                    body.style.minHeight = '';
                    html.style.height = '';
                    html.style.overflowY = '';
                    return;
                  }
                  
                  var wrapper = document.getElementById('page-wrapper');
                  if (!wrapper) {
                    setTimeout(adjustScaledHeight, 100);
                    return;
                  }
                  
                  var body = document.body;
                  var html = document.documentElement;
                  
                  wrapper.style.transform = 'none';
                  wrapper.style.width = '100%';
                  wrapper.style.height = 'auto';
                  wrapper.style.minHeight = 'auto';
                  void wrapper.offsetHeight;
                  
                  var originalHeight = Math.max(
                    wrapper.scrollHeight,
                    wrapper.offsetHeight,
                    wrapper.clientHeight
                  );
                  
                  var footer = wrapper.querySelector('footer');
                  if (footer) {
                    var footerRect = footer.getBoundingClientRect();
                    var wrapperRect = wrapper.getBoundingClientRect();
                    var footerBottom = footerRect.bottom - wrapperRect.top;
                    if (footerBottom > originalHeight) {
                      originalHeight = footerBottom;
                    }
                  }
                  
                  wrapper.style.transform = 'scale(0.75)';
                  wrapper.style.transformOrigin = 'top left';
                  wrapper.style.width = '133.333%';
                  
                  var scaledHeight = Math.ceil(originalHeight * 0.75);
                  
                  wrapper.style.height = scaledHeight + 'px';
                  wrapper.style.minHeight = scaledHeight + 'px';
                  wrapper.style.maxHeight = scaledHeight + 'px';
                  
                  body.style.height = scaledHeight + 'px';
                  body.style.minHeight = scaledHeight + 'px';
                  body.style.maxHeight = scaledHeight + 'px';
                  html.style.height = scaledHeight + 'px';
                  html.style.minHeight = scaledHeight + 'px';
                  html.style.maxHeight = scaledHeight + 'px';
                  html.style.overflowY = 'auto';
                }
                
                function init() {
                  if (document.body) {
                    adjustScaledHeight();
                  } else {
                    document.addEventListener('DOMContentLoaded', adjustScaledHeight);
                  }
                  
                  setTimeout(adjustScaledHeight, 0);
                  setTimeout(adjustScaledHeight, 100);
                  setTimeout(adjustScaledHeight, 500);
                }
                
                init();
                
                window.addEventListener('resize', function() {
                  setTimeout(adjustScaledHeight, 50);
                });
                
                if (typeof window !== 'undefined') {
                  var originalPushState = history.pushState;
                  history.pushState = function() {
                    originalPushState.apply(this, arguments);
                    setTimeout(adjustScaledHeight, 300);
                  };
                  
                  window.addEventListener('popstate', function() {
                    setTimeout(adjustScaledHeight, 300);
                  });
                }
                
                if (typeof MutationObserver !== 'undefined') {
                  var observer = new MutationObserver(function() {
                    setTimeout(adjustScaledHeight, 100);
                  });
                  
                  observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['style', 'class']
                  });
                }
                
                if (typeof ResizeObserver !== 'undefined') {
                  setTimeout(function() {
                    var wrapper = document.getElementById('page-wrapper');
                    if (wrapper) {
                      var resizeObserver = new ResizeObserver(function() {
                        setTimeout(adjustScaledHeight, 50);
                      });
                      resizeObserver.observe(wrapper);
                    }
                  }, 500);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden" style={{ width: '100%', maxWidth: '100vw' }} suppressHydrationWarning>
        <div 
          className="seo-hidden-content"
          suppressHydrationWarning
          style={{ 
            position: 'fixed',
            top: '-9999px',
            left: '-9999px', 
            width: '1px', 
            height: '1px', 
            overflow: 'hidden',
            opacity: 0,
            pointerEvents: 'none',
            visibility: 'hidden',
            zIndex: -9999,
            margin: 0,
            padding: 0
          }}
        >
          <h1>Nettoyage Genève - Services de nettoyage professionnel à Genève</h1>
          <p>Genève nettoyage, Genève temizlik, Genève çatı temizliği, Genève vitre temizliği, Genève façade nettoyage, Genève fin de bail, Genève fin de chantier, Genève conciergerie, Genève bureaux nettoyage, Genève immeubles nettoyage, Genève canapés nettoyage, Genève matelas nettoyage, Genève toiture nettoyage, Genève nettoyage professionnel, Genève nettoyage commercial, Genève nettoyage résidentiel, nettoyage entreprise Genève, société de nettoyage Genève, entreprise nettoyage Genève, service nettoyage Genève, nettoyage Genève prix, devis nettoyage Genève, nettoyage Genève 24h, nettoyage Genève pas cher, meilleur nettoyage Genève, nettoyage écologique Genève, nettoyage bio Genève</p>
        </div>
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <div id="page-wrapper">
          <div id="content-scaler">
            {children}
          </div>
        </div>
        <Chatbot />
      </body>
    </html>
  )
}

