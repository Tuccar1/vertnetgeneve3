'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Globe, MessageCircle, Clock, Send, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function ContactPage() {
  return (
    <div className="w-full relative">
      {/* Sabit arka plan fotoğraf - Tüm sayfada sabit kalacak */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/cleaning-3.jpg"
          alt="Contact background"
          fill
          className="object-cover"
          style={{
            objectPosition: 'center center',
          }}
          quality={100}
          priority={true}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/20 to-white/25"></div>
      </div>
      
      {/* Hero Section - Header'a yakın, boşluk yok */}
      <section className="relative pt-20 sm:pt-24 pb-8 md:pb-12 bg-gradient-to-r from-primary-600/70 via-secondary-600/70 to-accent-600/70 backdrop-blur-[1px] text-white overflow-hidden z-10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Dekoratif ikonlar */}
            <motion.div
              className="flex justify-center gap-4 mb-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30"
                animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Send className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4">
              Contactez-Nous
            </h1>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-white/50 rounded-full mx-auto mb-4 max-w-xs"
            />
            <p className="text-sm md:text-base text-white/90">
              Obtenez un devis gratuit et personnalisé. Disponible 24h/24 et 7j/7.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Section arası boşluk - Daraltıldı */}
      <div className="h-4 md:h-6"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Contact Info & Form */}
      <section className="py-12 md:py-16 bg-white/60 backdrop-blur-[2px] relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
                  Informations de Contact
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-300">
                    <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
                      {/* @ts-ignore */}
                      <MapPin className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-base">Adresse</h4>
                      <p className="text-gray-600 text-sm">Genève, Suisse</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-300">
                    <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
                      {/* @ts-ignore */}
                      <Phone className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-base">Téléphone</h4>
                      <a href="tel:+41766212183" className="text-gray-600 hover:text-primary-600 transition text-sm">
                        +41 76 621 21 83
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-300">
                    <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
                      {/* @ts-ignore */}
                      <Mail className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-base">Email</h4>
                      <a href="mailto:info@vertnetgeneve.ch" className="text-gray-600 hover:text-primary-600 transition text-sm">
                        info@vertnetgeneve.ch
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-300">
                    <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
                      {/* @ts-ignore */}
                      <Globe className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-base">Website</h4>
                      <a href="https://www.vertnetgeneve.ch" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600 transition text-sm">
                        www.vertnetgeneve.ch
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-300">
                    <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
                      {/* @ts-ignore */}
                      <MessageCircle className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-base">WhatsApp</h4>
                      <p className="text-gray-600 text-sm">Contactez-nous facilement via WhatsApp!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-300">
                    <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
                      {/* @ts-ignore */}
                      <Clock className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-base">Disponibilité</h4>
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
                className="bg-white border-2 border-gray-200 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
                  Demander un Devis
                </h2>
                <form className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Nom complet"
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none text-sm transition hover:border-gray-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-6 py-3.5 rounded-xl font-semibold text-base hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
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
    </div>
  )
}

