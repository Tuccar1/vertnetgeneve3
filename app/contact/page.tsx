import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactPage from '@/components/ContactPage'

export const metadata = {
  title: 'Contact - Vertnetgeneve',
  description: 'Contactez-nous pour un devis gratuit. Disponible 24h/24 et 7j/7 à Genève et environs.',
}

export default function Contact() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col relative z-10">
      <Navigation />
      <ContactPage />
      <Footer />
    </div>
  )
}

