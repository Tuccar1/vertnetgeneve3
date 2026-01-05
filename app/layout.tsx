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
  authors: [{ name: 'Vertnetgeneve' }], // Düzeltildi
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
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        {/* critical.css dosyasının var olduğundan emin olun */}
        <link rel="stylesheet" href="/critical.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Vertnetgeneve',
              description: 'Services de nettoyage professionnel de qualité supérieure à Genève. Disponible 24h/24 et 7j/7.',
              url: 'https://www.vertnetgeneve.ch',
              telephone: '+41766212183',
              email: 'info@vertnetgeneve.ch',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Genève',
                addressCountry: 'CH',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '46.2044',
                longitude: '6.1432',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                opens: '00:00',
                closes: '23:59',
              },
              priceRange: '$$',
              image: 'https://www.vertnetgeneve.ch/og-image.jpg',
              sameAs: ['https://www.vertnetgeneve.ch'],
              areaServed: {
                '@type': 'City',
                name: 'Genève',
              },
              serviceType: [
                'Nettoyage de canapés',
                'Nettoyage fin de bail',
                'Nettoyage fin de chantier',
                'Conciergerie',
                "Nettoyage d'immeubles",
                'Nettoyage de bureaux',
                'Nettoyage de toiture',
                'Nettoyage de vitres',
                'Nettoyage de façade',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white" suppressHydrationWarning>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <main className="flex-1 w-full">
          {children}
        </main>
        <Chatbot />
      </body>
    </html>
  )
}