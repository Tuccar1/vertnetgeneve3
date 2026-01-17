'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Shield, Leaf, Users, Award, Heart, Sparkles, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default function WhyChooseUs() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const reasons = [
    {
      icon: Clock,
      title: 'Support 24h/24 et 7j/7',
      description: 'Nous sommes disponibles à tout moment pour répondre à vos besoins. Votre satisfaction est notre priorité.',
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=90',
    },
    {
      icon: Shield,
      title: 'Satisfaction Garantie',
      description: 'Nous adaptons nos services à vos besoins spécifiques et nous nous efforçons de dépasser vos attentes.',
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-teal-400 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=90',
    },
    {
      icon: Leaf,
      title: 'Respect de l\'Environnement',
      description: 'Nous utilisons des produits écologiques et des méthodes respectueuses de la planète.',
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-green-400 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=90',
    },
    {
      icon: Users,
      title: 'Équipe d\'Experts',
      description: 'Nos professionnels sont formés pour répondre à vos besoins avec expertise et rigueur.',
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=90',
    },
    {
      icon: Award,
      title: 'Technologie Moderne',
      description: 'Équipements à la pointe pour un nettoyage efficace, rapide et respectueux.',
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-teal-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=90',
    },
    {
      icon: Heart,
      title: 'Qualité Premium',
      description: 'Services de qualité supérieure à chaque intervention pour votre satisfaction.',
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-400 to-green-500',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=90',
    },
  ]

  return (
    <section id="pourquoi-nous" className="py-12 lg:py-16 w-full relative overflow-hidden" suppressHydrationWarning>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Başlık Bölümü */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-14 lg:mb-16"
        >
          {/* Üst dekoratif element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center gap-2 mb-6"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-lg">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Pourquoi{' '}
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Nous Choisir
            </motion.span>
          </h2>
          
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full mx-auto mb-6 max-w-xs"
          />
          
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-4 drop-shadow">
            Chez nous, chaque client est une priorité. Basés à Genève, nous offrons des services de nettoyage de qualité exceptionnelle.
          </p>
          
          <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
            Ensemble, bâtissons un environnement plus propre!
          </p>
        </motion.div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon as React.ComponentType<{ className?: string }>
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group perspective-1000"
              >
                <motion.div 
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden h-full transform transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-emerald-500/30"
                  animate={{
                    boxShadow: [
                      "0 10px 40px -10px rgba(16, 185, 129, 0.1)",
                      "0 10px 40px -10px rgba(16, 185, 129, 0.25)",
                      "0 10px 40px -10px rgba(16, 185, 129, 0.1)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  {/* Kart Resmi */}
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={reason.image}
                      alt={`${reason.title} - Vertnetgeneve`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-115"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Shimmer effect on image */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    />
                    
                    {/* İkon */}
                    <motion.div 
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-14 h-14 rounded-xl ${reason.bgColor} flex items-center justify-center shadow-lg z-10 border-4 border-white`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Kart İçeriği */}
                  <div className="p-6 pt-10 text-center">
                    <motion.h3 
                      className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {reason.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-gray-600 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {reason.description}
                    </motion.p>
                    
                    {/* Alt dekoratif çizgi */}
                    <motion.div 
                      className="mt-4 flex justify-center"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    >
                      <div className="w-12 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-20 transition-all duration-300"></div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Alt CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-white font-medium">Plus de 500 clients satisfaits à Genève</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

