'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Sparkles, Clock, Shield } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const services = [
    { name: 'Canapés et fauteuils', href: '#services' },
    { name: 'Fin de Bail', href: '#services' },
    { name: 'Fin de Chantier', href: '#services' },
    { name: 'Conciergerie', href: '#services' },
    { name: 'Immeubles', href: '#services' },
    { name: 'Bureaux', href: '#services' },
    { name: 'Toiture', href: '#services' },
    { name: 'Vitres', href: '#services' },
    { name: 'Façade', href: '#services' },
  ]

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
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative w-full overflow-x-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10 overflow-hidden w-full">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {/* @ts-ignore */}
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white leading-[1.2]">Genève Nettoyage</h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-[1.4]">Excellence Professionnelle</p>
                </div>
              </Link>
              <p className="text-sm md:text-base text-gray-400 leading-[1.7] mb-6">
                Excellence en nettoyage professionnel à Genève et en Suisse. Au cœur de Genève, pour un avenir plus propre.
              </p>
              
              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  {/* @ts-ignore */}
                  <Shield className="w-4 h-4 text-secondary-400" />
                  <span className="text-gray-400">Garantie Satisfaction 100%</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  {/* @ts-ignore */}
                  <Clock className="w-4 h-4 text-accent-400" />
                  <span className="text-gray-400">Disponible 24h/24 et 7j/7</span>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-base md:text-lg font-bold text-white mb-6 flex items-center leading-[1.5]">
                <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full mr-3 flex-shrink-0"></span>
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      prefetch={true}
                      className="text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200 flex items-center group leading-[1.7]"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {service.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-secondary-500 to-accent-500 rounded-full mr-3"></span>
                Entreprise
              </h4>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      prefetch={true}
                      className="text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200 flex items-center group leading-[1.7]"
                    >
                      <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-accent-500 to-primary-500 rounded-full mr-3"></span>
                Contact
              </h4>
              <div className="space-y-4">
                <a
                  href="tel:+41772152255"
                  className="flex items-center space-x-3 text-sm md:text-base text-gray-400 hover:text-white transition-colors group leading-[1.7]"
                >
                  <div className="p-2 bg-accent-500/20 rounded-lg group-hover:bg-accent-500/30 transition-colors flex-shrink-0">
                    {/* @ts-ignore */}
                    <Phone className="w-4 h-4 text-accent-400" />
                  </div>
                  <span className="font-semibold">+41 77 215 22 55</span>
                </a>
                <a
                  href="mailto:info@genevenettoyage.ch"
                  className="flex items-center space-x-3 text-sm md:text-base text-gray-400 hover:text-white transition-colors group leading-[1.7]"
                >
                  <div className="p-2 bg-primary-500/20 rounded-lg group-hover:bg-primary-500/30 transition-colors flex-shrink-0">
                    {/* @ts-ignore */}
                    <Mail className="w-4 h-4 text-primary-400" />
                  </div>
                  <span>info@genevenettoyage.ch</span>
                </a>
                <div className="flex items-start space-x-3 text-sm md:text-base text-gray-400 leading-[1.7]">
                  <div className="p-2 bg-secondary-500/20 rounded-lg mt-0.5 flex-shrink-0">
                    {/* @ts-ignore */}
                    <MapPin className="w-4 h-4 text-secondary-400" />
                  </div>
                  <span>Genève, Suisse</span>
                </div>

                {/* Social Media */}
                <div className="pt-6">
                  <p className="text-sm md:text-base font-semibold text-white mb-4 leading-[1.5]">Suivez-nous</p>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 group"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={social.label}
                        >
                          {/* @ts-ignore */}
                          <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
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
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm md:text-base text-gray-500 text-center md:text-left leading-[1.7]">
              &copy; {new Date().getFullYear()} Genève Nettoyage. Tous droits réservés.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base text-gray-500 leading-[1.7]">
              <Link href="#" className="hover:text-white transition-colors leading-[1.7]">
                Politique de Confidentialité
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="#" className="hover:text-white transition-colors leading-[1.7]">
                Conditions d'Utilisation
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="#" className="hover:text-white transition-colors leading-[1.7]">
                Mentions Légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
