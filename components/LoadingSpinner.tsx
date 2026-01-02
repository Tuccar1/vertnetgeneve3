'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoadingSpinner() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => {
      setTimeout(() => setLoading(false), 300)
    }

    // Listen to route changes
    handleComplete()
  }, [pathname])

  if (!loading) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

