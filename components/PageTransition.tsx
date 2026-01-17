'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // İlk render'da transition gösterme
    if (isFirstRender.current) {
      isFirstRender.current = false
      setDisplayChildren(children)
      return
    }

    // Sayfa değiştiğinde transition başlat
    setIsTransitioning(true)
    
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsTransitioning(false)
    }, 300) // Transition süresi

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <>
      {/* Sayfa geçiş overlay'i */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="page-transition-overlay"
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Blur overlay */}
            <motion.div
              className="absolute inset-0 bg-white/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Loading spinner */}
            <motion.div
              className="relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center gap-2">
                {/* Animated dots */}
                <motion.div
                  className="w-2 h-2 bg-[#4a5d4a] rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: Infinity,
                    delay: 0
                  }}
                />
                <motion.div
                  className="w-2 h-2 bg-[#4a5d4a] rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: Infinity,
                    delay: 0.15
                  }}
                />
                <motion.div
                  className="w-2 h-2 bg-[#4a5d4a] rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: Infinity,
                    delay: 0.3
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* İçerik */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {displayChildren}
      </motion.div>
    </>
  )
}
