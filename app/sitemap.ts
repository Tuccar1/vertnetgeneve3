import { MetadataRoute } from 'next'
import { servicesData } from '@/lib/services-data'

// Safe blog posts getter
function getBlogPosts() {
  try {
    const { getBlogPosts } = require('@/lib/blog')
    return getBlogPosts()
  } catch (error) {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.genevenettoyage.ch'
  
  // Static pages
  const staticPages = [
    '',
    '/services',
    '/a-propos',
    '/politique-de-qualite',
    '/reglement-securite',
    '/contact',
    '/blog',
    '/booking',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Service pages
  const servicePages = Object.keys(servicesData).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Blog posts
  const blogPosts = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...blogPosts]
}

