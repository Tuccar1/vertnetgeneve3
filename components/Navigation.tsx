'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, Sparkles, ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesHover, setServicesHover] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Services', hasDropdown: true },
    { href: '/a-propos', label: 'À Propos' },
    { href: '/blog', label: 'Blog' },
    { href: '/politique-de-qualite', label: 'Qualité' },
    { href: '/reglement-securite', label: 'Règlement' },
    { href: '/contact', label: 'Contact' },
  ]

  const servicesCategories = [
    {
      title: 'Services Résidentiels',
      services: [
        { name: 'Canapés et Matelas', slug: 'canapes-et-matelas' },
        { name: 'Fin de Bail', slug: 'fin-de-bail' },
        { name: 'Fin de Chantier', slug: 'fin-de-chantier' },
        { name: 'Immeubles', slug: 'immeubles' },
      ],
    },
    {
      title: 'Services Commerciaux',
      services: [
        { name: 'Bureaux', slug: 'bureaux' },
        { name: 'Conciergerie', slug: 'conciergerie' },
      ],
    },
    {
      title: 'Services Spécialisés',
      services: [
        { name: 'Toiture', slug: 'toiture' },
        { name: 'Vitres', slug: 'vitres' },
        { name: 'Façade', slug: 'facade' },
      ],
    },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 relative ${
        scrolled
          ? 'bg-primary-50/98 backdrop-blur-xl shadow-lg border-b border-primary-200'
          : 'bg-primary-50/80 backdrop-blur-md'
      }`}
      >
      {/* Yanıp Sönen Glow Efekti - Hero Fotoğrafıyla Uyumlu (Temizlik Teması) */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-400/25 via-primary-300/20 to-secondary-400/25 pointer-events-none"
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-l from-cyan-300/20 via-blue-300/15 to-primary-400/20 pointer-events-none"
        animate={{
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-400/15 pointer-events-none"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <div className="w-full relative z-10">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 xl:px-6 mx-auto w-full max-w-6xl">
          {/* Logo - Daha Premium */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex-shrink-0"
            >
              <div className="w-40 h-10 sm:w-48 sm:h-12 md:w-56 md:h-14 lg:w-48 lg:h-12 xl:w-56 xl:h-14 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden p-0 sm:p-0.5">
                <div className="relative w-full h-full rounded-md overflow-hidden">
                  <Image
                    src="/urn_aaid_sc_AP_96ff288d-cbac-4630-bf94-9b6447df2364.png"
                    alt="Vertnetgeneve Logo"
                    fill
                    className="object-cover rounded-md"
                    style={{
                      filter: 'brightness(1.15) contrast(1.2) saturate(1.3)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/40 via-secondary-600/30 to-accent-600/40 rounded-md mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-md" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 opacity-0 group-hover:opacity-20 rounded-lg"
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
          </Link>

          {/* Desktop Navigation - Daha Premium */}
          <div className="hidden lg:flex items-center gap-x-0.5 xl:gap-x-1 2xl:gap-x-1.5 flex-1 justify-center max-w-2xl mx-1 lg:mx-2 min-w-0">
            {navItems.map((item, index) => {
              // Bazı menü elemanlarını küçük ekranlarda gizle
              const isHiddenOnLarge = ['Qualité', 'Règlement'].includes(item.label)
              if (isHiddenOnLarge) {
                return (
                  <div
                    key={item.href}
                    className="relative hidden 2xl:block"
                    onMouseEnter={() => item.hasDropdown && setServicesHover(true)}
                    onMouseLeave={() => item.hasDropdown && setServicesHover(false)}
                  >
                    <Link
                      href={item.href}
                      prefetch={true}
                      className="relative px-1.5 py-1 lg:px-2 lg:py-1.5 text-gray-700 hover:text-primary-600 font-semibold text-[10px] lg:text-[11px] transition-all duration-300 rounded-lg group whitespace-nowrap leading-tight block"
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
                  </div>
                )
              }
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setServicesHover(true)}
                  onMouseLeave={() => item.hasDropdown && setServicesHover(false)}
                >
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="relative px-1.5 py-1 lg:px-2 lg:py-1.5 xl:px-2.5 xl:py-2 text-gray-700 hover:text-primary-600 font-semibold text-[10px] lg:text-[11px] xl:text-xs transition-all duration-300 rounded-lg group whitespace-nowrap leading-tight block"
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
                
                {/* Services Dropdown Menu */}
                {item.hasDropdown && (
                  <AnimatePresence>
                    {servicesHover && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[60]"
                        onMouseEnter={() => setServicesHover(true)}
                        onMouseLeave={() => setServicesHover(false)}
                      >
                        <div className="p-6">
                          <div className="grid grid-cols-3 gap-6">
                            {servicesCategories.map((category, catIndex) => (
                              <div key={catIndex} className="space-y-3">
                                <h3 className="font-bold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-200">
                                  {category.title}
                                </h3>
                                <ul className="space-y-2">
                                  {category.services.map((service, serviceIndex) => (
                                    <li key={serviceIndex}>
                                      <Link
                                        href={`/services/${service.slug}`}
                                        prefetch={true}
                                        className="block px-3 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 group"
                                      >
                                        <span className="group-hover:font-medium">
                                          {service.name}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <Link
                              href="/services"
                              prefetch={true}
                              className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200"
                            >
                              Voir tous les services
                              {/* @ts-ignore */}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
              )
            })}
          </div>

          {/* Contact Info & CTA - Daha Premium */}
          <div className="hidden lg:flex items-center gap-x-0.5 xl:gap-x-1 flex-shrink-0 min-w-0">
            <motion.a
              href="tel:+41766212183"
              className="flex items-center gap-x-0.5 text-gray-700 hover:text-accent-600 transition-colors group whitespace-nowrap flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                    <div className="p-1 bg-gradient-to-br from-accent-50 to-accent-100 rounded-lg group-hover:from-accent-100 group-hover:to-accent-200 transition-all duration-300 shadow-sm group-hover:shadow-md flex-shrink-0">
                      {/* @ts-ignore */}
                      <Phone className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-accent-600" />
              </div>
              <span className="font-bold text-[10px] lg:text-xs hidden 2xl:inline leading-tight">+41 76 621 21 83</span>
              <span className="font-bold text-[10px] lg:text-xs 2xl:hidden leading-tight">+41 76</span>
            </motion.a>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
              <Link
                href="/booking"
                className="relative px-2 py-1.5 lg:px-2.5 lg:py-2 xl:px-3 xl:py-2.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white rounded-lg font-bold text-[10px] lg:text-xs xl:text-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group whitespace-nowrap flex items-center leading-tight"
              >
                <span className="relative z-10 flex items-center">
                        <span className="hidden 2xl:inline">Devis Gratuit</span>
                        <span className="2xl:hidden">Devis</span>
                        {/* @ts-ignore */}
                        <ArrowRight className="w-2.5 h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 ml-0.5 lg:ml-1 flex-shrink-0" />
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
                  className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-primary-100 transition-colors flex-shrink-0"
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
                        <X className="w-5 h-5" />
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
                        <Menu className="w-5 h-5" />
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
                    href="tel:+41766212183"
                    className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl text-accent-700 font-bold shadow-md"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* @ts-ignore */}
                    <Phone className="w-5 h-5" />
                    <span>+41 76 621 21 83</span>
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
