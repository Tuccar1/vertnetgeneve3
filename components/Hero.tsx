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
      gradient: 'from-secondary-500 to-secondary-600',
      borderColor: 'border-secondary-400',
      bgGradient: 'from-secondary-50 to-secondary-100',
    },
    { 
      text: 'Disponible 24/7', 
      gradient: 'from-primary-500 to-primary-600',
      borderColor: 'border-primary-400',
      bgGradient: 'from-primary-50 to-primary-100',
    },
    { 
      text: 'Équipe Certifiée', 
      gradient: 'from-accent-500 to-accent-600',
      borderColor: 'border-accent-400',
      bgGradient: 'from-accent-50 to-accent-100',
    },
  ]

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}
    >
      {/* Background Image - Window Cleaner on High-Rise Building */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
          }}
        >
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-secondary-800/70 to-accent-900/80"></div>
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
            <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-primary-500/90 via-secondary-500/90 to-accent-500/90 backdrop-blur-md rounded-full text-white text-sm font-bold mb-8 shadow-xl border-2 border-white/30">
              Excellence en Nettoyage Professionnel
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-[1.2] drop-shadow-lg tracking-tight"
          >
            Votre Partenaire de{' '}
            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Confiance
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/95 mb-10 leading-[1.7] drop-shadow-md max-w-2xl mx-auto"
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

          {/* Features - Premium Çerçeveli Kartlar */}
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
                  y: -8,
                  rotate: 2,
                }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                {/* Çerçeve ve Glow Efekti */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Ana Kart */}
                <div className={`relative bg-gradient-to-br ${feature.bgGradient} backdrop-blur-xl rounded-2xl p-6 md:p-8 border-4 ${feature.borderColor} shadow-2xl transform transition-all duration-300`}>
                  {/* İç Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  {/* İçerik */}
                  <div className="relative z-10">
                    {/* Animated Border */}
                    <motion.div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-t-2xl`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    />
                    
                    {/* Text */}
                    <motion.p
                      className={`text-center font-bold text-lg md:text-xl bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mt-6 leading-tight`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.4 }}
                    >
                      {feature.text}
                    </motion.p>
                    
                    {/* Floating Animation */}
                    <motion.div
                      className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full opacity-20 blur-xl`}
                      animate={{
                        y: [0, -10, 0],
                        x: [0, 5, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.3,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
