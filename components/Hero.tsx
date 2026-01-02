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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ 
        width: '100%', 
        maxWidth: '100%', 
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background Image - Professional Cleaning Service - Fixed to escape scale */}
      <div 
        className="absolute inset-0 z-0 hero-bg-container" 
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
        }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Premium gradient overlay - Daha profesyonel tonlar */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800/85 via-secondary-700/80 to-accent-800/85"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Floating Shapes - Mavi, Yeşil, Sarı */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-15"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-15"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-15"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20" style={{ maxWidth: '100%', width: '100%' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-6 py-3 bg-white/95 backdrop-blur-md rounded-full text-primary-700 text-sm font-bold mb-8 shadow-2xl border border-primary-200">
              Excellence en Nettoyage Professionnel
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-[1.2] drop-shadow-2xl tracking-tight"
          >
            Votre Partenaire de{' '}
            <span className="bg-gradient-to-r from-primary-300 via-secondary-300 to-accent-300 bg-clip-text text-transparent drop-shadow-lg">
              Confiance
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/98 mb-10 leading-[1.7] drop-shadow-lg max-w-2xl mx-auto font-medium"
          >
            Services de nettoyage professionnel de qualité supérieure pour les
            entreprises et particuliers à Genève. Disponible 24h/24 et 7j/7.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-16"
          >
            <Link href="/booking" prefetch={true} className="btn-primary text-lg group">
              Demander un Devis
              {/* @ts-ignore */}
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              prefetch={true}
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
            >
              Nos Services
            </Link>
          </motion.div>

          {/* Features - Premium Profesyonel Kartlar */}
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
                  scale: 1.05,
                  y: -5,
                }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                {/* Ana Kart - Minimalist ve Profesyonel */}
                <div className={`relative bg-white/98 backdrop-blur-xl rounded-xl p-8 md:p-10 border-2 ${feature.borderColor} shadow-xl hover:shadow-2xl transform transition-all duration-300`}>
                  {/* Üst Çizgi */}
                  <motion.div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.gradient} rounded-t-xl`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                  />
                  
                  {/* İçerik */}
                  <div className="relative z-10 text-center">
                    {/* Text - Daha büyük ve bold */}
                    <motion.h3
                      className={`font-bold text-xl md:text-2xl ${feature.textColor} mt-2 leading-tight`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                    >
                      {feature.text}
                    </motion.h3>
                  </div>
                  
                  {/* Hover efekti - Subtle glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
