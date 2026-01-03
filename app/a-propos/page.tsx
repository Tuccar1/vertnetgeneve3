import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AboutPage from '@/components/AboutPage'

export const metadata = {
  title: 'À Propos - Vertnetgeneve',
  description: 'Découvrez notre entreprise, notre mission, notre vision et nos valeurs. Excellence en nettoyage professionnel à Genève.',
}

export default function About() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col relative z-10">
      <Navigation />
      <AboutPage />
      <Footer />
    </div>
  )
}

