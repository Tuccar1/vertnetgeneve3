'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Facebook, Linkedin, Instagram, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import MarqueeServices from './MarqueeServices'
import { trackContactClick } from './AnalyticsTracker'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const heroImage = { url: '/cleaning-4.webp', name: 'Eldivenli El Cam Temizliği' }
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
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
      className="relative min-h-[85vh] flex flex-col justify-start overflow-hidden pt-16 sm:pt-20 w-full pb-12 lg:pb-16"
    >
      {/* Content */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20" suppressHydrationWarning>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={itemVariants}>
            <motion.span 
              className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 bg-black/30 backdrop-blur-md rounded-full text-white text-sm sm:text-base font-semibold mb-8 sm:mb-10 border border-white/50 shadow-lg"
              animate={{ 
                borderColor: ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.4)'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              id="live-edit-heroBadge"
            >
              ✨ Excellence en Nettoyage Professionnel ✨
            </motion.span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3 leading-[1.1] tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] [text-shadow:_3px_3px_8px_rgba(0,0,0,0.9),_0_0_30px_rgba(0,0,0,0.5)]"
            id="live-edit-heroTitle1"
          >
            Votre Partenaire de
          </motion.h1>
          
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 sm:mb-8 leading-[1.1] tracking-tight"
          >
            <motion.span 
              className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent inline-block [filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.8))_drop-shadow(0_0_20px_rgba(251,191,36,0.4))]"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ backgroundSize: '200% 200%' }}
              id="live-edit-heroTitle2"
            >
              Confiance
            </motion.span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center mb-6 sm:mb-8 md:mb-10 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link href="/booking" prefetch={true} className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white rounded-lg font-semibold text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-gray-500/50 overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <span id="live-edit-heroButton1">Demander un Devis</span>
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
                <span className="relative z-10" id="live-edit-heroButton2">Nos Services</span>
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
            className="flex items-center justify-center gap-3 sm:gap-4 px-4"
          >
            <span className="text-sm sm:text-base text-white/90 font-semibold hidden sm:block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Suivez-nous:</span>
            <div className="flex items-center gap-3 sm:gap-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook', color: 'from-blue-500 to-blue-600' },
                { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'from-blue-600 to-blue-700' },
                { icon: Instagram, href: '#', label: 'Instagram', color: 'from-pink-500 via-purple-500 to-orange-500' },
                { icon: MessageCircle, href: 'https://wa.me/41766212183', label: 'WhatsApp', color: 'from-green-500 to-green-600', trackType: 'whatsapp' as const, trackValue: '+41766212183' },
              ].map((social, index) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-lg flex items-center justify-center group overflow-hidden border-2 border-gray-200 min-w-[44px] min-h-[44px]"
                    whileHover={{ scale: 1.15, y: -5, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    aria-label={social.label}
                    onClick={() => social.trackType && trackContactClick(social.trackType, social.trackValue!)}
                  >
                    {/* Gradient arka plan */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    {/* Icon */}
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800 group-hover:text-white relative z-10 transition-colors duration-300" />
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
      
      {/* Kayan Yazılar - Hero'nun altında */}
      <div className="mt-16 sm:mt-20 md:mt-24">
        <MarqueeServices />
      </div>
    </section>
  )
}
