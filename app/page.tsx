import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import WhyChooseUs from '@/components/WhyChooseUs'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden" style={{ maxWidth: '100%', width: '100%', overflowX: 'hidden', margin: 0, padding: 0, position: 'relative', left: 0, right: 0 }}>
      <Navigation />
      <Hero />
      <Services />
      <About />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  )
}
