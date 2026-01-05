import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Accueil - Excellence en Nettoyage Professionnel à Genève',
  description: 'Services de nettoyage professionnel de qualité supérieure à Genève. Disponible 24h/24 et 7j/7. Canapés, Fin de Bail, Fin de Chantier, Conciergerie, Immeubles, Bureaux, Toiture, Vitres, Façade.',
  keywords: 'nettoyage Genève, nettoyage professionnel, nettoyage commercial, nettoyage résidentiel, nettoyage fin de bail, nettoyage fin de chantier, conciergerie Genève',
  openGraph: {
    title: 'Vertnetgeneve - Excellence en Nettoyage Professionnel à Genève',
    description: 'Services de nettoyage professionnel de qualité supérieure à Genève. Disponible 24h/24 et 7j/7.',
    url: 'https://www.vertnetgeneve.ch',
    siteName: 'Vertnetgeneve',
    locale: 'fr_CH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vertnetgeneve.ch',
  },
}

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </>
  )
}


