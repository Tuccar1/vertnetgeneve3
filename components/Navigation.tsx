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
    <>
      {/* Top Premium Bar */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-[51] bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white py-[2px] px-4 hidden md:block"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[9px]">
          <div className="flex items-center gap-3">
            <motion.a 
              href="https://wa.me/41766212183"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <Phone className="w-3 h-3" />
              <span className="font-medium">+41 76 621 21 83</span>
            </motion.a>
            <span className="text-emerald-300">|</span>
            <motion.a 
              href="https://wa.me/41765316903"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <Phone className="w-3 h-3" />
              <span className="font-medium">+41 76 531 69 03</span>
            </motion.a>
            <span className="text-emerald-300">|</span>
            <motion.a 
              href="mailto:contact@vertnetgeneve.ch"
              className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <Mail className="w-3 h-3" />
              <span className="font-medium">contact@vertnetgeneve.ch</span>
            </motion.a>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1 text-emerald-200"
            >
              <Sparkles className="w-3 h-3" />
              <span className="text-[10px] font-semibold">Nettoyage Professionnel à Genève</span>
            </motion.span>
          </div>
        </div>
      </motion.div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed left-0 right-0 z-50 w-full transition-all duration-500 relative ${
          scrolled
            ? 'md:top-8 top-0 bg-white/98 backdrop-blur-xl shadow-xl shadow-emerald-500/10 border-b border-emerald-100'
            : 'md:top-8 top-0 bg-white backdrop-blur-md shadow-md'
        }`}
      >
        {/* Premium Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-yellow-400 to-emerald-400" />
        
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 via-white to-emerald-50/50 pointer-events-none"
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-teal-50/40 via-transparent to-teal-50/40 pointer-events-none"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      <div className="w-full relative z-10">
        <div className="flex items-center justify-end h-20 sm:h-24 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto w-full max-w-7xl">
          {/* Logo - Premium Design with Glow Effect */}
          <Link href="/" className="flex items-center group flex-shrink-0 mr-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex-shrink-0"
            >
              {/* Logo Glow Effect */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-emerald-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="h-16 sm:h-20 md:h-22 lg:h-20 xl:h-24 w-auto relative">
                <Image
                  src="/yenlogo.jpg"
                  alt="Vertnetgeneve Logo"
                  width={200}
                  height={96}
                  className="h-full w-auto object-contain"
                  style={{ background: 'transparent' }}
                  priority
                />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Premium Style */}
          <div className="hidden lg:flex items-center gap-x-1 xl:gap-x-2 2xl:gap-x-3 justify-end max-w-none mx-1 lg:mx-2 min-w-0">
            {navItems.map((item, index) => {
              // Bazı menü elemanlarını küçük ekranlarda gizle
              const isHiddenOnLarge = ['Qualité', 'Règlement'].includes(item.label)
              if (isHiddenOnLarge) {
                return (
                  <div
                    key={item.href}
                    className="relative hidden 2xl:flex items-center"
                    onMouseEnter={() => item.hasDropdown && setServicesHover(true)}
                    onMouseLeave={() => item.hasDropdown && setServicesHover(false)}
                  >
                    <Link
                      href={item.href}
                      prefetch={true}
                      className="relative px-2 py-1.5 lg:px-3 lg:py-2 xl:px-3.5 xl:py-2 text-gray-700 hover:text-emerald-600 font-semibold text-[11px] lg:text-xs xl:text-sm transition-all duration-300 rounded-xl group whitespace-nowrap leading-tight flex items-center"
                    >
                      <span className="relative z-10">{item.label}</span>
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl opacity-0 group-hover:opacity-100 border border-emerald-100 group-hover:border-emerald-200"
                        transition={{ duration: 0.3 }}
                      />
                      <motion.span
                        className="absolute -bottom-0.5 left-2 right-2 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 rounded-full"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileHover={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </div>
                )
              }
              return (
                <div
                  key={item.href}
                  className="relative flex items-center"
                  onMouseEnter={() => item.hasDropdown && setServicesHover(true)}
                  onMouseLeave={() => item.hasDropdown && setServicesHover(false)}
                >
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="relative px-2 py-1.5 lg:px-3 lg:py-2 xl:px-3.5 xl:py-2 text-gray-700 hover:text-emerald-600 font-semibold text-[11px] lg:text-xs xl:text-sm transition-all duration-300 rounded-xl group whitespace-nowrap leading-tight flex items-center"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl opacity-0 group-hover:opacity-100 border border-emerald-100 group-hover:border-emerald-200"
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="absolute -bottom-0.5 left-2 right-2 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 rounded-full"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 1 }}
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

          {/* Contact Info & CTA - Premium Design */}
          <div className="hidden lg:flex items-center gap-x-3 xl:gap-x-4 flex-shrink-0 min-w-0">
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
              <Link
                href="/booking"
                className="relative px-4 py-2.5 xl:px-6 xl:py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-xl font-bold text-xs xl:text-sm shadow-lg hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 overflow-hidden group whitespace-nowrap flex items-center leading-tight border border-emerald-400/30"
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Devis Gratuit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
                <motion.button
                  className="lg:hidden text-gray-700 p-3 rounded-lg hover:bg-primary-100 transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
                  aria-expanded={isOpen}
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
                    className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl text-emerald-700 font-bold shadow-md"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone className="w-5 h-5" />
                    <span>+41 76 621 21 83</span>
                  </motion.a>
                  <motion.a
                    href="tel:+41765316903"
                    className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl text-teal-700 font-bold shadow-md"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (navItems.length + 0.5) * 0.1 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone className="w-5 h-5" />
                    <span>+41 76 531 69 03</span>
                  </motion.a>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (navItems.length + 1) * 0.1 }}
                  >
                    <Link
                      href="/booking"
                      className="block w-full text-center px-6 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-emerald-500/30 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Devis Gratuit
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
    </>
  )
}
