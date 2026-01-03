import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ReglementSecurite from '@/components/ReglementSecurite'

export const metadata = {
  title: 'Règlement & Sécurité - Vertnetgeneve',
  description: 'Conformité légale complète, sécurité du personnel et engagement environnemental. Vertnetgeneve opère en stricte conformité avec le cadre légal suisse.',
}

export default function ReglementSecuritePage() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col relative z-10">
      <Navigation />
      <ReglementSecurite />
      <Footer />
    </div>
  )
}

