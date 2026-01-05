'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react'
import { BlogPost } from '@/lib/blog'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface BlogPostDetailProps {
  post: BlogPost
}

export default function BlogPostDetail({ post }: BlogPostDetailProps) {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 pt-20 sm:pt-24">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 font-semibold"
            >
              {/* @ts-ignore */}
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Link>
            
            <div className="mb-4">
              <span className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-sm sm:text-base text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                {/* @ts-ignore */}
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>
                  {post.date ? format(new Date(post.date), 'd MMMM yyyy', { locale: fr }) : 'Date inconnue'}
                </span>
              </div>
              {post.readingTime && (
                <div className="flex items-center space-x-2">
                  {/* @ts-ignore */}
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{post.readingTime} min de lecture</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <span>Par {post.author}</span>
              </div>
            </div>
            
            {post.image && (
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <article
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  {/* @ts-ignore */}
                  <Tag className="w-5 h-5 mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white rounded-lg font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Demander un Devis
                {/* @ts-ignore */}
                <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}

