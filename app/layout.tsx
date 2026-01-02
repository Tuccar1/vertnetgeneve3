import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import RouteProgressBar from '@/components/RouteProgressBar'

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
    <html lang="fr">
      <body className="antialiased">
        <GoogleAnalytics />
        <RouteProgressBar />
        {children}
      </body>
    </html>
  )
}
