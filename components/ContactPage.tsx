'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Globe, MessageCircle, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4">
              Contactez-Nous
            </h1>
            <p className="text-sm md:text-base text-white/90">
              Obtenez un devis gratuit et personnalisé. Disponible 24h/24 et 7j/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">
                  Informations de Contact
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
                    {/* @ts-ignore */}
                    <MapPin className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">Adresse</h4>
                      <p className="text-gray-600 text-sm">Genève, Suisse</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
                    {/* @ts-ignore */}
                    <Phone className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">Téléphone</h4>
                      <a href="tel:+41772152255" className="text-gray-600 hover:text-primary-600 transition text-sm">
                        +41 77 215 22 55
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
                    {/* @ts-ignore */}
                    <Mail className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">Email</h4>
                      <a href="mailto:info@vertnetgeneve.ch" className="text-gray-600 hover:text-primary-600 transition text-sm">
                        info@vertnetgeneve.ch
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
                    {/* @ts-ignore */}
                    <Globe className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">Website</h4>
                      <a href="https://www.vertnetgeneve.ch" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600 transition text-sm">
                        www.vertnetgeneve.ch
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
                    {/* @ts-ignore */}
                    <MessageCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">WhatsApp</h4>
                      <p className="text-gray-600 text-sm">Contactez-nous facilement via WhatsApp!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
                    {/* @ts-ignore */}
                    <Clock className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">Disponibilité</h4>
                      <p className="text-gray-600 font-semibold text-sm">24h/24 et 7j/7</p>
                      <p className="text-gray-500 text-xs mt-1">Service Non-Stop</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-lg"
              >
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">
                  Demander un Devis
                </h2>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nom complet"
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message"
                      rows={4}
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none text-sm transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition shadow-lg hover:shadow-xl"
                  >
                    Envoyer la Demande
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg"
            >
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 p-5 md:p-6 pb-0">
                Notre Localisation
              </h2>
              <div className="w-full h-64 sm:h-80 md:h-96">
                <iframe
                  src="https://www.google.com/maps?q=Genève,+Switzerland&output=embed&zoom=13&center=46.2044,6.1432"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Localisation Vertnetgeneve - Genève, Suisse"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

