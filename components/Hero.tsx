'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  const features = [
    { 
      text: 'Garantie Qualité', 
      gradient: 'from-secondary-600 to-secondary-700',
      borderColor: 'border-secondary-500',
      bgGradient: 'from-white/95 to-secondary-50/95',
      textColor: 'text-secondary-700',
    },
    { 
      text: 'Disponible 24/7', 
      gradient: 'from-primary-600 to-primary-700',
      borderColor: 'border-primary-500',
      bgGradient: 'from-white/95 to-primary-50/95',
      textColor: 'text-primary-700',
    },
    { 
      text: 'Équipe Certifiée', 
      gradient: 'from-accent-600 to-accent-700',
      borderColor: 'border-accent-500',
      bgGradient: 'from-white/95 to-accent-50/95',
      textColor: 'text-accent-700',
    },
  ]

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 bg-white w-full overflow-x-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Nettoyage professionnel à Genève"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-8 py-4 bg-gray-100 rounded-full text-gray-700 text-base font-bold mb-10 border border-gray-200">
              Excellence en Nettoyage Professionnel
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-8 leading-[1.2] tracking-tight"
          >
            Votre Partenaire de{' '}
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Confiance
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-700 mb-12 leading-[1.7] max-w-3xl mx-auto font-medium"
          >
            Services de nettoyage professionnel de qualité supérieure pour les
            entreprises et particuliers à Genève. Disponible 24h/24 et 7j/7.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 md:gap-7 justify-center mb-20"
          >
            <Link href="/booking" prefetch={true} className="btn-primary text-xl px-8 py-4 group">
              Demander un Devis
              {/* @ts-ignore */}
              <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              prefetch={true}
              className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold text-xl hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Nos Services
            </Link>
          </motion.div>

          {/* Features - Parlak Küçük Alanlar */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  scale: 1.08,
                  y: -3,
                }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                {/* Parlak Küçük Alan */}
                <div className={`relative bg-gradient-to-br ${feature.gradient} rounded-lg p-4 md:p-5 shadow-lg hover:shadow-xl transform transition-all duration-300 backdrop-blur-sm`}>
                  {/* Glow efekti */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-60 blur-xl rounded-lg group-hover:opacity-80 transition-opacity duration-300 -z-10`}></div>
                  
                  {/* İçerik */}
                  <div className="relative z-10 text-center">
                    {/* Text - Parlak ve küçük */}
                    <motion.div
                      className="font-bold text-lg md:text-xl text-white leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      role="heading"
                      aria-level={2}
                    >
                      {feature.text}
                    </motion.div>
                  </div>
                  
                  {/* Hover efekti - Daha parlak glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 rounded-lg transition-opacity duration-300 blur-md`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
