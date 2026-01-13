'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { BlogPost } from '@/lib/blog'
import Image from 'next/image'

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="w-full relative min-h-screen">
      {/* Sabit arka plan fotoğrafı */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/11.webp"
          alt="Blog - Vertnetgeneve"
          fill
          className="object-cover object-center"
          quality={100}
          priority
          sizes="100vw"
          unoptimized
        />
      </div>
      {/* Koyu overlay - yazıların okunabilirliği için */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 -z-10" />
      
      {/* Hero Section - Şeffaf alan yok, doğrudan içerik */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Dekoratif ikonlar */}
            <motion.div
              className="flex justify-center gap-3 sm:gap-4 mb-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30"
                animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
            </motion.div>
            
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white mb-4 sm:mb-6 leading-[1.2]"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}
            >
              Vertnetgeneve Blog
            </h1>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 rounded-full mx-auto mb-4 sm:mb-6 max-w-xs"
            />
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-[1.7] px-4"
              style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.4)' }}
            >
              Science et Pratique du Nettoyage
            </p>
          </motion.div>
        </div>
      </section>
      
      <div className="max-w-6xl mx-auto px-4">
      {/* Blog Posts - Simple Vertical List */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          {posts.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl">
              <p className="text-xl text-gray-700 mb-4">Aucun article pour le moment.</p>
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
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
                >
                  <div className="mb-3 sm:mb-4">
                    <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg shadow-emerald-500/30">
                      {post.category}
                    </span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`} prefetch={true} className="block group">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-800 mb-3 sm:mb-4 leading-[1.25] group-hover:text-emerald-600 transition-colors">
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
                      className="inline-flex items-center text-sm sm:text-base text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group/link"
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
    </div>
  )
}
