import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Vernetgeneve - Excellence en Nettoyage Professionnel',
  description: 'Services de nettoyage professionnel de qualité supérieure à Genève et en Suisse. Nettoyage commercial, résidentiel, médical et industriel.',
  keywords: 'nettoyage, Genève, Suisse, nettoyage professionnel, nettoyage commercial, nettoyage résidentiel',
  authors: [{ name: 'Vernetgeneve' }],
  openGraph: {
    title: 'Vernetgeneve - Excellence en Nettoyage Professionnel',
    description: 'Services de nettoyage professionnel de qualité supérieure',
    type: 'website',
    locale: 'fr_CH',
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
        <Navigation />
        {children}
      </body>
    </html>
  )
}
