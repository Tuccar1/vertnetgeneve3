import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import RouteProgressBar from '@/components/RouteProgressBar'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Genève Nettoyage - Excellence en Nettoyage Professionnel',
    template: '%s | Genève Nettoyage',
  },
  description: 'Services de nettoyage professionnel de qualité supérieure à Genève. Disponible 24h/24 et 7j/7. Canapés, Fin de Bail, Fin de Chantier, Conciergerie, Immeubles, Bureaux, Toiture, Vitres, Façade.',
  keywords: 'nettoyage, Genève, Suisse, nettoyage professionnel, nettoyage commercial, nettoyage résidentiel',
  authors: [{ name: 'Vernetgeneve' }],
  creator: 'Genève Nettoyage',
  publisher: 'Genève Nettoyage',
  metadataBase: new URL('https://www.genevenettoyage.ch'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: 'https://www.genevenettoyage.ch',
    siteName: 'Genève Nettoyage',
    title: 'Genève Nettoyage - Excellence en Nettoyage Professionnel',
    description: 'Services de nettoyage professionnel de qualité supérieure à Genève',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Genève Nettoyage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Genève Nettoyage - Excellence en Nettoyage Professionnel',
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
    <html lang="fr" className="overflow-x-hidden" style={{ width: '100%', maxWidth: '100vw' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <link rel="stylesheet" href="/critical.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function applyScale() {
                  var rootDiv = document.body ? document.body.querySelector('div:first-child') : null;
                  if (!rootDiv && document.body) {
                    var observer = new MutationObserver(function(mutations) {
                      var div = document.body.querySelector('div:first-child');
                      if (div) {
                        observer.disconnect();
                        applyScaleToDiv(div);
                      }
                    });
                    observer.observe(document.body, { childList: true, subtree: true });
                    setTimeout(function() { observer.disconnect(); }, 5000);
                    return;
                  }
                  if (rootDiv) {
                    applyScaleToDiv(rootDiv);
                  }
                }
                function applyScaleToDiv(div) {
                  var isDesktop = window.innerWidth >= 769 && window.matchMedia('(min-width: 769px)').matches;
                  if (isDesktop) {
                    div.style.cssText += 'transform: scale(0.8) !important; transform-origin: top left !important; width: 125% !important; height: 125% !important; overflow-x: hidden !important; position: relative !important; margin: 0 !important; padding: 0 !important;';
                  } else {
                    div.style.cssText += 'transform: scale(1) !important; width: 100% !important; height: 100% !important; overflow-x: hidden !important;';
                  }
                }
                if (document.body) {
                  applyScale();
                } else {
                  document.addEventListener('DOMContentLoaded', applyScale);
                }
                setTimeout(applyScale, 0);
                setTimeout(applyScale, 1);
                setTimeout(applyScale, 5);
                setTimeout(applyScale, 10);
                setTimeout(applyScale, 50);
                setTimeout(applyScale, 100);
                setTimeout(applyScale, 200);
                if (window.requestAnimationFrame) {
                  requestAnimationFrame(applyScale);
                  requestAnimationFrame(function() { requestAnimationFrame(applyScale); });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden" style={{ width: '100%', maxWidth: '100vw' }}>
        {/* SEO: Genève yerleşim yerleri - görünmez ama Google'da çıkacak */}
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
            padding: 0,
            transform: 'none',
            transformOrigin: 'unset'
          }}
        >
          <h1>Nettoyage Genève - Services de nettoyage professionnel à Genève</h1>
          <p>Genève nettoyage, Genève temizlik, Genève çatı temizliği, Genève vitre temizliği, Genève façade nettoyage, Genève fin de bail, Genève fin de chantier, Genève conciergerie, Genève bureaux nettoyage, Genève immeubles nettoyage, Genève canapés nettoyage, Genève matelas nettoyage, Genève toiture nettoyage, Genève nettoyage professionnel, Genève nettoyage commercial, Genève nettoyage résidentiel, nettoyage entreprise Genève, société de nettoyage Genève, entreprise nettoyage Genève, service nettoyage Genève, nettoyage Genève prix, devis nettoyage Genève, nettoyage Genève 24h, nettoyage Genève pas cher, meilleur nettoyage Genève, nettoyage écologique Genève, nettoyage bio Genève</p>
        </div>
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
