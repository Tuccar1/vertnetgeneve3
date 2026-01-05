import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AboutPage from '@/components/AboutPage'

export const metadata: Metadata = {
  title: 'À Propos de Notre Entreprise - Vertnetgeneve',
  description: 'Découvrez Vertnetgeneve, votre partenaire de confiance pour le nettoyage professionnel à Genève. Notre mission, vision et valeurs pour un environnement plus propre et durable.',
  keywords: 'à propos Vertnetgeneve, entreprise nettoyage Genève, mission nettoyage, valeurs nettoyage professionnel, nettoyage écologique Genève',
  openGraph: {
    title: 'À Propos de Notre Entreprise - Vertnetgeneve',
    description: 'Découvrez notre entreprise, notre mission, notre vision et nos valeurs. Excellence en nettoyage professionnel à Genève.',
    url: 'https://www.vertnetgeneve.ch/a-propos',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vertnetgeneve.ch/a-propos',
  },
}

export default function About() {
  return (
    <>
      <Navigation />
      <AboutPage />
      <Footer />
    </>
  )
}

