'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, Sparkles, ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Services' },
    { href: '/a-propos', label: 'À Propos' },
    { href: '/blog', label: 'Blog' },
    { href: '/politique-de-qualite', label: 'Qualité' },
    { href: '/reglement-securite', label: 'Règlement' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-primary-50/98 backdrop-blur-xl shadow-lg border-b border-primary-200'
          : 'bg-primary-50/80 backdrop-blur-md'
      }`}
      className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden"
      >
      <div className="w-full overflow-x-hidden">
        <div className="flex items-center justify-between h-24 gap-2 px-4 lg:px-6 xl:px-8 mx-auto w-full overflow-x-hidden">
          {/* Logo - Daha Premium */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                {/* @ts-ignore */}
                <Sparkles className="w-7 h-7 text-white relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-br from-primary-400 to-accent-400 rounded-xl opacity-0 group-hover:opacity-20 blur-md"
                animate={{
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-display font-bold text-gray-900 leading-[1.2] tracking-tight">
                Genève Nettoyage
              </span>
              <span className="text-xs md:text-sm text-gray-500 font-medium hidden sm:block tracking-wide leading-[1.4]">
                Excellence en Nettoyage Professionnel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Daha Premium */}
          <div className="hidden lg:flex items-center space-x-0.5 flex-1 justify-center max-w-2xl mx-2 min-w-0 overflow-hidden">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className="relative px-3 py-2.5 text-gray-700 hover:text-primary-600 font-semibold text-sm transition-all duration-300 rounded-lg group whitespace-nowrap leading-[1.5]"
              >
                <span className="relative z-10">{item.label}</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </div>

          {/* Contact Info & CTA - Daha Premium */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            <motion.a
              href="tel:+41772152255"
              className="flex items-center space-x-1.5 text-gray-700 hover:text-accent-600 transition-colors group whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-1.5 bg-gradient-to-br from-accent-50 to-accent-100 rounded-lg group-hover:from-accent-100 group-hover:to-accent-200 transition-all duration-300 shadow-sm group-hover:shadow-md">
                {/* @ts-ignore */}
                <Phone className="w-3.5 h-3.5 text-accent-600" />
              </div>
              <span className="font-bold text-sm hidden xl:inline leading-[1.5]">+41 77 215 22 55</span>
              <span className="font-bold text-sm xl:hidden leading-[1.5]">+41 77...</span>
            </motion.a>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
              <Link
                href="/booking"
                className="relative px-4 py-2.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group whitespace-nowrap flex items-center leading-[1.5]"
              >
                <span className="relative z-10 flex items-center">
                  <span className="hidden xl:inline">Devis Gratuit</span>
                  <span className="xl:hidden">Devis</span>
                  {/* @ts-ignore */}
                  <ArrowRight className="w-3 h-3 ml-1 flex-shrink-0" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-gray-700 p-2.5 rounded-xl hover:bg-primary-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* @ts-ignore */}
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* @ts-ignore */}
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu - Daha Premium */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-primary-200 bg-white"
            >
              <div className="py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-6 py-3.5 text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 rounded-xl font-semibold transition-all duration-200 mx-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-6 mt-6 border-t border-primary-200 space-y-3 px-2">
                  <motion.a
                    href="tel:+41772152255"
                    className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl text-accent-700 font-bold shadow-md"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* @ts-ignore */}
                    <Phone className="w-5 h-5" />
                    <span>+41 77 215 22 55</span>
                  </motion.a>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (navItems.length + 1) * 0.1 }}
                  >
                    <Link
                      href="#contact"
                      className="block w-full text-center px-6 py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white rounded-xl font-bold shadow-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Devis Gratuit
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
