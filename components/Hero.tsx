'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Facebook, Linkedin, Instagram, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  const heroImage = { url: '/cleaning-4.webp', name: 'Eldivenli El Cam Temizliği' }
  
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


  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-20 sm:pt-24 w-full pb-20 lg:pb-32"
    >
      {/* Content */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants}>
            <motion.span 
              className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm sm:text-base font-medium mb-8 sm:mb-10 border border-white/40"
              animate={{ 
                borderColor: ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.4)'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ✨ Excellence en Nettoyage Professionnel ✨
            </motion.span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4 leading-[1.1] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.6)]"
          >
            Votre Partenaire de
          </motion.h1>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-10 sm:mb-12 leading-[1.1] tracking-tight"
          >
            <motion.span 
              className="bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent inline-block drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Confiance
            </motion.span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-7 justify-center mb-8 sm:mb-12 md:mb-16 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link href="/booking" prefetch={true} className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white rounded-lg font-semibold text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-gray-500/50 overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Demander un Devis
                  <ArrowRight className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900"
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
                className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white rounded-lg font-semibold text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-gray-500/50 overflow-hidden"
              >
                <span className="relative z-10">Nos Services</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Sosyal Medya Butonları - Hareketli */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 sm:gap-6 px-4"
          >
            <span className="text-sm sm:text-base text-gray-600 font-medium hidden sm:block">Suivez-nous:</span>
            <div className="flex items-center gap-3 sm:gap-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook', color: 'from-blue-500 to-blue-600' },
                { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'from-blue-600 to-blue-700' },
                { icon: Instagram, href: '#', label: 'Instagram', color: 'from-pink-500 via-purple-500 to-orange-500' },
                { icon: MessageCircle, href: 'https://wa.me/41766212183', label: 'WhatsApp', color: 'from-green-500 to-green-600' },
              ].map((social, index) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center group overflow-hidden border-2 border-white/50"
                    whileHover={{ scale: 1.15, y: -5, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    aria-label={social.label}
                  >
                    {/* Gradient arka plan */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    {/* Icon */}
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-white relative z-10 transition-colors duration-300" />
                    {/* Glow efekti */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-full blur-md opacity-0 group-hover:opacity-50`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
