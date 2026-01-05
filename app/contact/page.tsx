import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactPage from '@/components/ContactPage'

export const metadata: Metadata = {
  title: 'Contactez-Nous - Devis Gratuit 24/7 | Vertnetgeneve',
  description: 'Contactez Vertnetgeneve pour un devis gratuit de nettoyage professionnel. Disponible 24h/24 et 7j/7 à Genève et environs. Téléphone: +41 76 621 21 83',
  keywords: 'contact nettoyage Genève, devis gratuit nettoyage, nettoyage Genève téléphone, nettoyage Genève email, contact Vertnetgeneve',
  openGraph: {
    title: 'Contactez-Nous - Devis Gratuit 24/7 | Vertnetgeneve',
    description: 'Contactez-nous pour un devis gratuit. Disponible 24h/24 et 7j/7 à Genève et environs.',
    url: 'https://www.vertnetgeneve.ch/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vertnetgeneve.ch/contact',
  },
}

export default function Contact() {
  return (
    <>
      <Navigation />
      <ContactPage />
      <Footer />
    </>
  )
}

