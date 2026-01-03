import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BlogList from '@/components/BlogList'
import { getBlogPosts } from '@/lib/blog'

export const metadata = {
  title: 'Blog - Vertnetgeneve',
  description: 'Découvrez nos articles sur le nettoyage professionnel, les conseils d\'entretien et les dernières actualités.',
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col relative z-10">
      <Navigation />
      <BlogList posts={posts} />
      <Footer />
    </div>
  )
}

