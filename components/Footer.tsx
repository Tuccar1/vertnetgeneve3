'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Clock, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const company = [
    { name: 'À Propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Politique de Qualité', href: '/politique-de-qualite' },
    { name: 'Règlement & Sécurité', href: '/reglement-securite' },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gray-900/85 backdrop-blur-sm text-gray-200 relative w-full">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10 overflow-hidden w-full">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-6 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            
            {/* Company Info - Sol */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <Link href="/" className="inline-flex items-center space-x-3 mb-3 group">
                <div className="w-14 h-14 relative flex-shrink-0">
                  <Image
                    src="/yenlogo.jpg"
                    alt="Vertnetgeneve Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">Vertnetgeneve</h3>
                  <p className="text-xs text-gray-400">Excellence Professionnelle</p>
                </div>
              </Link>
              <p className="text-sm text-gray-300 leading-relaxed mb-3 max-w-xs mx-auto md:mx-0">
                Excellence en nettoyage professionnel à Genève. Au cœur de Genève, pour un avenir plus propre.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-300">Garantie 100%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-gray-300">24h/24 - 7j/7</span>
                </div>
              </div>
            </motion.div>

            {/* Entreprise - Orta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <h4 className="text-base font-bold text-white mb-3 inline-flex items-center justify-center">
                <span className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full mr-2"></span>
                Entreprise
              </h4>
              <ul className="space-y-1.5">
                {company.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      prefetch={true}
                      className="text-sm text-gray-300 hover:text-white transition-colors duration-200 inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info - Sağ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-right"
            >
              <h4 className="text-base font-bold text-white mb-3 inline-flex items-center justify-center md:justify-end">
                <span className="w-1 h-5 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full mr-2"></span>
                Contact
              </h4>
              <div className="space-y-2">
                <div className="flex flex-col items-center md:items-end gap-1.5 text-sm">
                  <a href="tel:+41766212183" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">+41 76 621 21 83</span>
                  </a>
                  <a href="tel:+41765316903" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">+41 76 531 69 03</span>
                  </a>
                </div>
                <a href="mailto:contact@vertnetgeneve.ch" className="flex items-center justify-center md:justify-end gap-1.5 text-sm text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>contact@vertnetgeneve.ch</span>
                </a>
                <div className="flex items-center justify-center md:justify-end gap-1.5 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>Genève, Suisse</span>
                </div>

                {/* Social Media */}
                <div className="pt-2 flex items-center justify-center md:justify-end gap-3">
                  <p className="text-xs font-semibold text-white">Suivez-nous:</p>
                  <div className="flex space-x-2">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Visitez notre page ${social.label}`}
                        >
                          <IconComponent className="w-4 h-4 text-gray-300 hover:text-white" />
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Vertnetgeneve. Tous droits réservés.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Politique de Confidentialité
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="#" className="hover:text-white transition-colors">
                Conditions d'Utilisation
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="#" className="hover:text-white transition-colors">
                Mentions Légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
