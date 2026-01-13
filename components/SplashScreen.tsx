'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Sabit partikül değerleri - hydration hatasını önlemek için
const particleData = [
  { x: 100, y: 50, yMove: -200, duration: 3.5, delay: 0.1 },
  { x: 200, y: 150, yMove: -300, duration: 4.2, delay: 0.5 },
  { x: 300, y: 100, yMove: -250, duration: 3.8, delay: 0.3 },
  { x: 400, y: 200, yMove: -350, duration: 4.5, delay: 0.8 },
  { x: 500, y: 80, yMove: -280, duration: 3.2, delay: 0.2 },
  { x: 150, y: 300, yMove: -400, duration: 4.8, delay: 1.0 },
  { x: 250, y: 250, yMove: -320, duration: 3.6, delay: 0.6 },
  { x: 350, y: 180, yMove: -380, duration: 4.0, delay: 0.4 },
  { x: 450, y: 120, yMove: -260, duration: 3.4, delay: 0.7 },
  { x: 550, y: 280, yMove: -340, duration: 4.3, delay: 0.9 },
  { x: 80, y: 350, yMove: -420, duration: 4.6, delay: 1.2 },
  { x: 180, y: 400, yMove: -450, duration: 4.9, delay: 1.5 },
  { x: 280, y: 320, yMove: -380, duration: 3.9, delay: 1.1 },
  { x: 380, y: 380, yMove: -410, duration: 4.4, delay: 1.4 },
  { x: 480, y: 340, yMove: -360, duration: 3.7, delay: 1.3 },
]

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Check if splash was already shown in this session
    const splashShown = sessionStorage.getItem('splashShown')
    if (splashShown) {
      setIsVisible(false)
      return
    }

    // Hide splash after animation
    const timer = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem('splashShown', 'true')
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particleData.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#4a5d4a]/30 rounded-full"
                initial={{ 
                  x: particle.x,
                  y: particle.y,
                  scale: 0
                }}
                animate={{ 
                  y: [particle.y, particle.y + particle.yMove],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Glowing orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4a5d4a]/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#4a5d4a]/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Logo animation */}
            <motion.div
              className="mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 1
              }}
            >
              <motion.div
                className="w-48 h-48 sm:w-64 sm:h-64 mx-auto relative"
                animate={{ 
                  filter: [
                    'drop-shadow(0 0 20px rgba(74, 93, 74, 0.3))',
                    'drop-shadow(0 0 40px rgba(74, 93, 74, 0.5))',
                    'drop-shadow(0 0 20px rgba(74, 93, 74, 0.3))'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/yenlogo.jpg"
                  alt="Vertnet Geneve Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Animated line */}
            <motion.div
              className="mt-8 mx-auto h-1 bg-gradient-to-r from-[#4a5d4a] via-[#5a6d5a] to-[#4a5d4a] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
            />

            {/* Tagline */}
            <motion.p
              className="mt-6 text-lg sm:text-xl text-[#4a5d4a]/80 font-medium tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              Excellence en Nettoyage Professionnel
            </motion.p>

            {/* Loading dots */}
            <motion.div
              className="mt-8 flex justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-[#4a5d4a] rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
