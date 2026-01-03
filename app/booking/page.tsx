import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import QuoteCalculator from '@/components/QuoteCalculator'

export const metadata = {
  title: 'Calculateur de Devis - Vertnetgeneve',
  description: 'Obtenez une estimation instantanée et personnalisée pour vos services de nettoyage à Genève. Calculateur de devis interactif.',
}

export default function BookingPage() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col relative z-10">
      <Navigation />
      <QuoteCalculator />
      <Footer />
    </div>
  )
}

