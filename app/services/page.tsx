import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServicesCategories from '@/components/ServicesCategories'

export const metadata: Metadata = {
  title: 'Nos Services de Nettoyage Professionnel à Genève',
  description: 'Découvrez tous nos services de nettoyage professionnel à Genève: Nettoyage résidentiel, commercial et spécialisé. Canapés, Fin de Bail, Fin de Chantier, Conciergerie, Immeubles, Bureaux, Toiture, Vitres, Façade.',
  keywords: 'services nettoyage Genève, nettoyage résidentiel, nettoyage commercial, nettoyage canapés, nettoyage fin de bail, nettoyage fin de chantier, conciergerie, nettoyage immeubles, nettoyage bureaux, nettoyage toiture, nettoyage vitres, nettoyage façade',
  openGraph: {
    title: 'Nos Services de Nettoyage Professionnel - Vertnetgeneve',
    description: 'Découvrez tous nos services de nettoyage professionnel à Genève: Résidentiels, Commerciaux et Spécialisés.',
    url: 'https://www.vertnetgeneve.ch/services',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vertnetgeneve.ch/services',
  },
}

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <ServicesCategories />
      <Footer />
    </>
  )
}

