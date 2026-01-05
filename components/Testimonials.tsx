'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  date: string
  comment: string
  avatar: string
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
    avatar: 'https://i.pravatar.cc/150?img=47',
    service: 'Fin de Bail'
  },
  {
    id: 2,
    name: 'Jean-Pierre Martin',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 1 mois',
    comment: 'Excellent service de nettoyage de bureaux. Ponctuel, efficace et très professionnel. Nos bureaux n\'ont jamais été aussi propres. L\'équipe est respectueuse et utilise des produits écologiques.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    service: 'Bureaux'
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 3 semaines',
    comment: 'J\'ai utilisé leurs services pour le nettoyage de canapés. Résultat parfait! Les taches ont complètement disparu et les canapés sentent bon. Service rapide et prix raisonnable. Merci!',
    avatar: 'https://i.pravatar.cc/150?img=45',
    service: 'Canapés'
  },
  {
    id: 4,
    name: 'Marc Chenal',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 2 mois',
    comment: 'Service de conciergerie impeccable. Disponible 24/7, toujours réactif et professionnel. Ils s\'occupent de tout avec soin. Un vrai soulagement pour notre copropriété.',
    avatar: 'https://i.pravatar.cc/150?img=33',
    service: 'Conciergerie'
  },
  {
    id: 5,
    name: 'Isabelle Moreau',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 1 semaine',
    comment: 'Nettoyage de vitres parfait! Les fenêtres sont éclatantes. L\'équipe est montée en toute sécurité et a fait un travail soigné. Je les ai déjà recontactés pour un autre service.',
    avatar: 'https://i.pravatar.cc/150?img=20',
    service: 'Vitres'
  },
  {
    id: 6,
    name: 'Thomas Bernard',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 3 semaines',
    comment: 'Service de nettoyage après travaux remarquable. Ils ont tout nettoyé en profondeur, même les endroits difficiles d\'accès. Très satisfait du résultat et du professionnalisme.',
    avatar: 'https://i.pravatar.cc/150?img=51',
    service: 'Fin de Chantier'
  },
  {
    id: 7,
    name: 'Claire Rousseau',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 1 mois',
    comment: 'Nettoyage d\'immeuble régulier. Service fiable, équipe sympathique et travail de qualité. Les résidents sont tous satisfaits. Je recommande sans hésitation.',
    avatar: 'https://i.pravatar.cc/150?img=32',
    service: 'Immeubles'
  },
  {
    id: 8,
    name: 'Pierre Favre',
    location: 'Genève, Suisse',
    rating: 5,
    date: 'Il y a 2 semaines',
    comment: 'Nettoyage de toiture professionnel. L\'équipe a travaillé avec précaution et efficacité. Notre toiture est maintenant propre et bien entretenue. Excellent rapport qualité-prix.',
    avatar: 'https://i.pravatar.cc/150?img=15',
    service: 'Toiture'
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Otomatik değişim
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Her 5 saniyede bir değişir

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Yıldız render fonksiyonu
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

  // Görüntülenecek yorumlar (3'lü grup)
  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  return (
    <section className="pt-20 md:pt-28 pb-0 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Arka plan fotoğraf */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-55">
          <Image
            src="/cleaning-3.jpg"
            alt="Témoignages clients satisfaits - Services de nettoyage professionnel Vertnetgeneve"
            fill
            className="object-cover object-center"
            style={{
              filter: 'brightness(1.0) contrast(1.15) saturate(1.3) blur(1px)',
            }}
            quality={90}
            sizes="100vw"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-gray-50/30 to-white/50"></div>
      </div>
      
      {/* Yumuşak geçiş - Üst kısım */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-1"></div>
      
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 opacity-5 z-1">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
              <Star className="w-6 h-6 text-white fill-white" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900">
              Avis Clients
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez ce que nos clients disent de nos services
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {renderStars(5)}
            </div>
            <span className="text-2xl font-bold text-gray-900">5.0</span>
            <span className="text-gray-600">({testimonials.length} avis)</span>
          </div>
        </motion.div>

        {/* Yorumlar Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {/* Google yorumu stili - Quote ikonu */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-16 h-16 text-primary-500" />
                  </div>

                  {/* Üst kısım - Kullanıcı bilgileri */}
                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    <div className="relative flex-shrink-0">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full border-2 border-primary-200 shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-gray-900 text-base truncate">
                          {testimonial.name}
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {testimonial.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {testimonial.location}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {renderStars(testimonial.rating)}
                        </div>
                        <span className="text-xs text-gray-500">
                          {testimonial.service}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Yorum metni */}
                  <div className="relative z-10">
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base line-clamp-4">
                      {testimonial.comment}
                    </p>
                  </div>

                  {/* Google yorumu stili - Alt çizgi */}
                  <div className="mt-4 pt-4 border-t border-gray-100 relative z-10">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">G</span>
                      </div>
                      <span>Google Yorumu</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                  setTimeout(() => setIsAutoPlaying(true), 10000)
                }}
                className={`min-w-[44px] min-h-[44px] rounded-full transition-all duration-300 flex items-center justify-center p-2 ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-primary-500'
                    : 'w-3 h-3 bg-gray-400 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <span className="sr-only">Go to testimonial {index + 1}</span>
              </button>
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
            className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 group"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">G</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">Google'da</p>
                <p className="text-sm font-bold text-gray-900">Tüm Yorumları Gör</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {renderStars(5)}
              <span className="text-sm font-bold text-gray-900 ml-1">5.0</span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
