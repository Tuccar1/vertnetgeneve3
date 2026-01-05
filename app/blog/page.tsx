import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BlogList from '@/components/BlogList'
import { getBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog - Conseils Nettoyage Professionnel | Vertnetgeneve',
  description: 'Découvrez nos articles et conseils sur le nettoyage professionnel, l\'entretien écologique, la qualité de l\'air et les meilleures pratiques à Genève.',
  keywords: 'blog nettoyage, conseils nettoyage, articles nettoyage professionnel, nettoyage écologique, entretien professionnel',
  openGraph: {
    title: 'Blog - Vertnetgeneve',
    description: 'Découvrez nos articles sur le nettoyage professionnel, les conseils d\'entretien et les dernières actualités.',
    url: 'https://www.vertnetgeneve.ch/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vertnetgeneve.ch/blog',
  },
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <>
      <Navigation />
      <BlogList posts={posts} />
      <Footer />
    </>
  )
}

