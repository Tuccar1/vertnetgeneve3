import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import QuoteCalculator from '@/components/QuoteCalculator'

export const metadata: Metadata = {
  title: 'Calculateur de Devis Gratuit - Estimation Instantanée | Vertnetgeneve',
  description: 'Obtenez une estimation instantanée et personnalisée pour vos services de nettoyage à Genève. Calculateur de devis interactif et gratuit pour tous nos services.',
  keywords: 'calculateur devis nettoyage, estimation nettoyage, devis gratuit nettoyage Genève, prix nettoyage, tarif nettoyage professionnel',
  openGraph: {
    title: 'Calculateur de Devis - Vertnetgeneve',
    description: 'Obtenez une estimation instantanée et personnalisée pour vos services de nettoyage à Genève. Calculateur de devis interactif.',
    url: 'https://www.vertnetgeneve.ch/booking',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vertnetgeneve.ch/booking',
  },
}

export default function BookingPage() {
  return (
    <>
      <Navigation />
      <QuoteCalculator />
      <Footer />
    </>
  )
}

