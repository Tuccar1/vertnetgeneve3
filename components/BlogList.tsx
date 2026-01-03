'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { BlogPost } from '@/lib/blog'

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10 overflow-hidden w-full">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-gray-900 mb-4 sm:mb-6 leading-[1.2]">
              Vertnetgeneve Blog
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-[1.7]">
              Science et Pratique du Nettoyage
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts - Simple Vertical List */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 mb-8">Aucun article pour le moment.</p>
              <p className="text-gray-500">Les articles seront bientôt disponibles.</p>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
              {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border-b border-gray-200 pb-6 sm:pb-8 last:border-b-0"
                >
                  <div className="mb-3 sm:mb-4">
                    <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-primary-600 text-white text-xs sm:text-sm font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`} prefetch={true} className="block group">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-3 sm:mb-4 leading-[1.25] group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  {post.excerpt && (
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4 leading-[1.7]">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-6">
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                      {post.date && (
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          {/* @ts-ignore */}
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('fr-CH', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                        </div>
                      )}
                    </div>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      prefetch={true}
                      className="inline-flex items-center text-sm sm:text-base text-primary-600 font-semibold hover:text-primary-700 transition-colors group/link"
                    >
                      Lire la suite
                      {/* @ts-ignore */}
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
