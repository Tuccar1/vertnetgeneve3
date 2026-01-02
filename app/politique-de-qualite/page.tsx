import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import QualityPolicy from '@/components/QualityPolicy'

export const metadata = {
  title: 'Politique de Qualité - Genève Nettoyage',
  description: 'Notre engagement envers la qualité, la durabilité et la satisfaction client à 100%.',
}

export default function QualityPolicyPage() {
  return (
    <>
      <Navigation />
      <QualityPolicy />
      <Footer />
    </>
  )
}

