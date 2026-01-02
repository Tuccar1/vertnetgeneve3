import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServicesCategories from '@/components/ServicesCategories'

export const metadata = {
  title: 'Nos Services - Genève Nettoyage',
  description: 'Découvrez tous nos services de nettoyage professionnel à Genève: Résidentiels, Commerciaux et Spécialisés.',
}

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <ServicesCategories />
      <Footer />
    </>
  )
}

