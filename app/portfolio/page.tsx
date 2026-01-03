import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PortfolioGallery from '@/components/PortfolioGallery'

export const metadata = {
  title: 'Portfolio - Vertnetgeneve',
  description: 'Découvrez nos réalisations et témoignages clients.',
}

export default function PortfolioPage() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col relative z-10">
      <Navigation />
      <PortfolioGallery />
      <Footer />
    </div>
  )
}

