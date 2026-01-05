import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PortfolioGallery from '@/components/PortfolioGallery'

export const metadata: Metadata = {
  title: 'Portfolio - Nos Réalisations et Témoignages | Vertnetgeneve',
  description: 'Découvrez le portfolio de Vertnetgeneve: nos réalisations de nettoyage professionnel, projets réussis et témoignages clients satisfaits à Genève.',
  keywords: 'portfolio nettoyage, réalisations nettoyage, projets nettoyage, témoignages clients nettoyage, exemples nettoyage professionnel',
  openGraph: {
    title: 'Portfolio - Vertnetgeneve',
    description: 'Découvrez nos réalisations et témoignages clients.',
    url: 'https://www.vertnetgeneve.ch/portfolio',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vertnetgeneve.ch/portfolio',
  },
}

export default function PortfolioPage() {
  return (
    <>
      <Navigation />
      <PortfolioGallery />
      <Footer />
    </>
  )
}

