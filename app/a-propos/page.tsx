import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AboutPage from '@/components/AboutPage'

export const metadata = {
  title: 'À Propos - Genève Nettoyage',
  description: 'Découvrez notre entreprise, notre mission, notre vision et nos valeurs. Excellence en nettoyage professionnel à Genève.',
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

