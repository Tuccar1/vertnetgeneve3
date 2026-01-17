'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  date: string
  comment: string
  service: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marie Dubois',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 2 semaines',
    comment: 'Service exceptionnel! L\'équipe de Vertnetgeneve a fait un travail remarquable pour le nettoyage de fin de bail. Tout était impeccable, professionnel et dans les temps. Je recommande vivement!',
    service: 'Fin de Bail'
  },
  {
    id: 2,
    name: 'Jean-Pierre Martin',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 1 mois',
    comment: 'Excellent service de nettoyage de bureaux. Ponctuel, efficace et très professionnel. Nos bureaux n\'ont jamais été aussi propres. L\'équipe est respectueuse et utilise des produits écologiques.',
    service: 'Bureaux'
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 3 semaines',
    comment: 'J\'ai utilisé leurs services pour le nettoyage de canapés. Résultat parfait! Les taches ont complètement disparu et les canapés sentent bon. Service rapide et prix raisonnable. Merci!',
    service: 'Canapés'
  },
  {
    id: 4,
    name: 'Marc Chenal',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 2 mois',
    comment: 'Service de conciergerie impeccable. Disponible 24/7, toujours réactif et professionnel. Ils s\'occupent de tout avec soin. Un vrai soulagement pour notre copropriété.',
    service: 'Conciergerie'
  },
  {
    id: 5,
    name: 'Isabelle Moreau',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 1 semaine',
    comment: 'Nettoyage de vitres parfait! Les fenêtres sont éclatantes. L\'équipe est montée en toute sécurité et a fait un travail soigné. Je les ai déjà recontactés pour un autre service.',
    service: 'Vitres'
  },
  {
    id: 6,
    name: 'Thomas Bernard',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 3 semaines',
    comment: 'Service de nettoyage après travaux remarquable. Ils ont tout nettoyé en profondeur, même les endroits difficiles d\'accès. Très satisfait du résultat et du professionnalisme.',
    service: 'Fin de Chantier'
  },
  {
    id: 7,
    name: 'Claire Rousseau',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 1 mois',
    comment: 'Nettoyage d\'immeuble régulier. Service fiable, équipe sympathique et travail de qualité. Les résidents sont tous satisfaits. Je recommande sans hésitation.',
    service: 'Immeubles'
  },
  {
    id: 8,
    name: 'Pierre Favre',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 2 semaines',
    comment: 'Nettoyage de toiture professionnel. L\'équipe a travaillé avec précaution et efficacité. Notre toiture est maintenant propre et bien entretenue. Excellent rapport qualité-prix.',
    service: 'Toiture'
  },
]

export default function Testimonials() {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || !mounted) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center gap-2 mb-6"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <Star className="w-6 h-6 text-white fill-white" />
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-lg">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              id="live-edit-testimonialsTitle"
            >
              Avis{' '}
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Clients
            </motion.span>
          </h2>
          
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full mx-auto mb-6 max-w-xs"
          />

          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-4 drop-shadow" id="live-edit-testimonialsSubtitle">
            Découvrez ce que nos clients disent de nos services
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              {renderStars(5)}
            </div>
            <span className="text-2xl font-bold text-white">5.0</span>
            <span className="text-white/70">({testimonials.length} avis)</span>
          </div>
        </motion.div>

        {/* Yorumlar */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  className="group"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <motion.div 
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl h-full transform transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-emerald-500/20 relative overflow-hidden"
                    animate={{
                      boxShadow: [
                        "0 10px 40px -10px rgba(16, 185, 129, 0.1)",
                        "0 10px 40px -10px rgba(16, 185, 129, 0.2)",
                        "0 10px 40px -10px rgba(16, 185, 129, 0.1)"
                      ]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {/* Quote icon */}
                    <motion.div 
                      className="absolute top-4 right-4 opacity-5 group-hover:opacity-15 transition-opacity"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Quote className="w-16 h-16 text-emerald-500" />
                    </motion.div>

                    {/* User info */}
                    <div className="flex items-start gap-4 mb-4 relative z-10">
                      <motion.div 
                        className="relative flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">
                            {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <motion.div 
                          className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </motion.div>
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <motion.span 
                            className="font-bold text-gray-900 truncate"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                          >
                            {testimonial.name}
                          </motion.span>
                          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                            {testimonial.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {testimonial.location}
                        </p>
                        <div className="flex items-center gap-2">
                          <motion.div 
                            className="flex gap-0.5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                          >
                            {renderStars(testimonial.rating)}
                          </motion.div>
                          <motion.span 
                            className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-medium"
                            whileHover={{ scale: 1.1 }}
                          >
                            {testimonial.service}
                          </motion.span>
                        </div>
                      </div>
                    </div>

                    {/* Comment */}
                    <motion.p 
                      className="text-gray-700 leading-relaxed text-sm line-clamp-4 mb-4 relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {testimonial.comment}
                    </motion.p>

                    {/* Google badge */}
                    <motion.div 
                      className="pt-4 border-t border-gray-100 flex items-center gap-2 relative z-10"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center shadow-sm"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <span className="text-white text-[10px] font-bold">G</span>
                      </motion.div>
                      <span className="text-xs text-gray-500">Avis Google</span>
                    </motion.div>
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                  setTimeout(() => setIsAutoPlaying(true), 10000)
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-emerald-500'
                    : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Google Reviews Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.google.com/search?q=Vertnetgeneve+Genève"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white text-lg font-bold">G</span>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Voir sur Google</p>
              <p className="text-sm font-bold text-gray-900">Tous les Avis</p>
            </div>
            <div className="flex items-center gap-1 pl-4 border-l border-gray-200">
              {renderStars(5)}
              <span className="text-lg font-bold text-gray-900 ml-1">5.0</span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
