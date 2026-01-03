import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServiceDetail from '@/components/ServiceDetail'
import { servicesData } from '@/lib/services-data'

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug]
  
  if (!service) {
    return {
      title: 'Service Non Trouvé - Vertnetgeneve',
    }
  }

  return {
    title: `${service.title} - Vertnetgeneve`,
    description: service.description,
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug]

  if (!service) {
    notFound()
  }

  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col relative z-10">
      <Navigation />
      <ServiceDetail service={service} />
      <Footer />
    </div>
  )
}

