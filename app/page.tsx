import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'

// Dynamic imports - client-side only, no SSR
const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false })
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false })
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false })

export const metadata: Metadata = {
  title: 'Accueil - Excellence en Nettoyage Professionnel à Genève',
  description: 'Services de nettoyage professionnel de qualité supérieure à Genève. Disponible 24h/24 et 7j/7. Canapés, Fin de Bail, Fin de Chantier, Conciergerie, Immeubles, Bureaux, Toiture, Vitres, Façade.',
  keywords: 'nettoyage Genève, nettoyage professionnel, nettoyage commercial, nettoyage résidentiel, nettoyage fin de bail, nettoyage fin de chantier, conciergerie Genève',
  authors: [{ name: 'Vertnetgeneve' }],
  creator: 'Vertnetgeneve',
  publisher: 'Vertnetgeneve',
  metadataBase: new URL('https://www.vertnetgeneve.ch'),
  openGraph: {
    title: 'Vertnetgeneve - Excellence en Nettoyage Professionnel à Genève',
    description: 'Services de nettoyage professionnel de qualité supérieure à Genève. Disponible 24h/24 et 7j/7.',
    url: 'https://www.vertnetgeneve.ch',
    siteName: 'Vertnetgeneve',
    locale: 'fr_CH',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vertnetgeneve - Nettoyage Professionnel Genève',
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
  alternates: {
    canonical: 'https://www.vertnetgeneve.ch',
  },
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Global Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/11ssss.jpg"
          alt="Vertnetgeneve - Nettoyage Professionnel à Genève"
          fill
          className="object-cover"
          style={{
            filter: 'brightness(1.15) contrast(1.15) saturate(1.2)',
          }}
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <WhyChooseUs />
        <Testimonials />
        <Footer />
      </div>
    </div>
  )
}


