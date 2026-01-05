import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ReglementSecurite from '@/components/ReglementSecurite'

export const metadata: Metadata = {
  title: 'Règlement & Sécurité - Conformité Légale | Vertnetgeneve',
  description: 'Vertnetgeneve opère en stricte conformité avec le cadre légal suisse. Découvrez nos engagements en matière de conformité légale, sécurité du personnel et protection environnementale à Genève.',
  keywords: 'règlement nettoyage Genève, sécurité nettoyage, conformité légale nettoyage, normes nettoyage Suisse, sécurité personnel nettoyage',
  openGraph: {
    title: 'Règlement & Sécurité - Vertnetgeneve',
    description: 'Conformité légale complète, sécurité du personnel et engagement environnemental. Vertnetgeneve opère en stricte conformité avec le cadre légal suisse.',
    url: 'https://www.vertnetgeneve.ch/reglement-securite',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vertnetgeneve.ch/reglement-securite',
  },
}

export default function ReglementSecuritePage() {
  return (
    <>
      <Navigation />
      <ReglementSecurite />
      <Footer />
    </>
  )
}

