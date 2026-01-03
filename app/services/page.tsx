import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServicesCategories from '@/components/ServicesCategories'

export const metadata = {
  title: 'Nos Services - Vertnetgeneve',
  description: 'Découvrez tous nos services de nettoyage professionnel à Genève: Résidentiels, Commerciaux et Spécialisés.',
}

export default function ServicesPage() {
  return (
    <div className="services-page-wrapper w-full overflow-x-hidden min-h-screen flex flex-col relative z-10">
      <Navigation />
      <main className="flex-1 flex flex-col relative z-10">
        <ServicesCategories />
      </main>
      <Footer />
    </div>
  )
}

