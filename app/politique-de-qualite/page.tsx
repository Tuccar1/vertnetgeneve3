import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import QualityPolicy from '@/components/QualityPolicy'

export const metadata = {
  title: 'Politique de Qualité - Vertnetgeneve',
  description: 'Notre engagement envers la qualité, la durabilité et la satisfaction client à 100%.',
}

export default function QualityPolicyPage() {
  return (
    <div className="quality-policy-page-wrapper overflow-x-hidden w-full min-h-screen flex flex-col relative z-10">
      <Navigation />
      <QualityPolicy />
      <Footer />
    </div>
  )
}

