'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function MarqueeServices() {
  const services = [
    'Nettoyage de Canapés',
    'Nettoyage de Matelas',
    'Fin de Bail',
    'Fin de Chantier',
    'Nettoyage d\'Immeubles',
    'Nettoyage de Bureaux',
    'Conciergerie',
    'Nettoyage de Toiture',
    'Nettoyage de Vitres',
    'Nettoyage de Façade',
    'Disponible 24h/24',
    '7j/7 à Genève',
  ]

  const duplicatedServices = [...services, ...services]

  return (
    <div className="relative py-6 overflow-hidden">
      {/* Sol gradient gölge */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-slate-900/90 to-transparent z-10 pointer-events-none" />
      
      {/* Sağ gradient gölge */}
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-slate-900/90 to-transparent z-10 pointer-events-none" />
      
      {/* Kayan yazılar */}
      <motion.div
        className="flex items-center gap-6 whitespace-nowrap"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedServices.map((service, index) => (
          <motion.div
            key={index}
            className="relative group"
            whileHover={{ scale: 1.05 }}
          >
            {/* Premium Shiny Card */}
            <div className="relative px-6 py-3 bg-gradient-to-r from-white/15 via-white/25 to-white/15 backdrop-blur-md rounded-full border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-500 overflow-hidden">
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.2,
                }}
              />
              
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span className="text-white font-semibold text-sm md:text-base tracking-wide">
                  {service}
                </span>
              </div>
              
              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-full border border-emerald-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_15px_rgba(52,211,153,0.3)]" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
