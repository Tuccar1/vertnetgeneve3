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
      title: 'Service Non Trouvé - Genève Nettoyage',
    }
  }

  return {
    title: `${service.title} - Genève Nettoyage`,
    description: service.description,
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug]

  if (!service) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <ServiceDetail service={service} />
      <Footer />
    </>
  )
}

