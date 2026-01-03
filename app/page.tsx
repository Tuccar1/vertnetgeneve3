import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import WhyChooseUs from '@/components/WhyChooseUs'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden flex flex-col relative z-10" suppressHydrationWarning>
      <Navigation />
      <main className="flex-1 flex flex-col relative z-10">
        <Hero />
        <About />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  )
}


