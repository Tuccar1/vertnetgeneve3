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
      gradient: 'from-gray-600 to-gray-700',
      borderColor: 'border-gray-500',
      bgGradient: 'from-white/95 to-gray-50/95',
      textColor: 'text-gray-700',
    },
    { 
      text: 'Disponible 24/7', 
      gradient: 'from-gray-600 to-gray-700',
      borderColor: 'border-gray-500',
      bgGradient: 'from-white/95 to-gray-50/95',
      textColor: 'text-gray-700',
    },
    { 
      text: 'Équipe Certifiée', 
      gradient: 'from-gray-600 to-gray-700',
      borderColor: 'border-gray-500',
      bgGradient: 'from-white/95 to-gray-50/95',
      textColor: 'text-gray-700',
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
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
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
            <span className="inline-block px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gray-100 rounded-full text-gray-700 text-xs sm:text-sm md:text-base font-bold mb-6 sm:mb-8 md:mb-10 border border-gray-200">
              Excellence en Nettoyage Professionnel
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-gray-900 mb-6 sm:mb-8 leading-[1.2] tracking-tight"
          >
            Votre Partenaire de{' '}
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Confiance
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 sm:mb-10 md:mb-12 leading-[1.7] max-w-3xl mx-auto font-medium px-4"
          >
            Services de nettoyage professionnel de qualité supérieure pour les
            entreprises et particuliers à Genève. Disponible 24h/24 et 7j/7.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-7 justify-center mb-12 sm:mb-16 md:mb-20 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link href="/booking" prefetch={true} className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white rounded-lg font-semibold text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-primary-500/50 overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Demander un Devis
                  {/* @ts-ignore */}
                  <ArrowRight className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-700 via-secondary-700 to-accent-700"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/services"
                prefetch={true}
                className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white rounded-lg font-semibold text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-primary-500/50 overflow-hidden"
              >
                <span className="relative z-10">Nos Services</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-700 via-secondary-700 to-accent-700"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Features - Parlak Küçük Alanlar */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-20 px-4"
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
                {/* Kaliteli Çerçeveli Animasyonlu Kart - Site Renk Paleti ile Uyumlu */}
                <div className="relative bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 rounded-lg p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transform transition-all duration-300 border-2 border-primary-500/50 overflow-hidden">
                  {/* Animasyonlu arka plan efekti */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-700 via-secondary-700 to-accent-700"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Üst çerçeve çizgisi - animasyonlu - Premium gradient */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/40 via-white/60 to-white/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                  />
                  
                  {/* İçerik */}
                  <div className="relative z-10 text-center">
                    {/* Text - Beyaz ve kaliteli */}
                    <motion.div
                      className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-white leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      role="heading"
                      aria-level={2}
                    >
                      {feature.text}
                    </motion.div>
                  </div>
                  
                  {/* Hover efekti - Parlaklık */}
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
