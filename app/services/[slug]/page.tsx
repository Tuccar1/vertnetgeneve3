import type { Metadata } from 'next'
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicesData[params.slug]
  
  if (!service) {
    return {
      title: 'Service Non Trouvé - Vertnetgeneve',
      description: 'Le service demandé n\'a pas été trouvé.',
    }
  }

  return {
    title: `${service.title} - Service de Nettoyage Professionnel | Vertnetgeneve`,
    description: `${service.description} Service disponible à Genève. Devis gratuit 24/7.`,
    keywords: `${service.title.toLowerCase()}, nettoyage ${service.title.toLowerCase()} Genève, service nettoyage professionnel, devis ${service.title.toLowerCase()}`,
    openGraph: {
      title: `${service.title} - Vertnetgeneve`,
      description: service.description,
      url: `https://www.vertnetgeneve.ch/services/${params.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.vertnetgeneve.ch/services/${params.slug}`,
    },
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

