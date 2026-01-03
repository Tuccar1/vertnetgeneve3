'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check, Shield, Clock, Leaf } from 'lucide-react'
import type { ServiceDetail as ServiceDetailType } from '@/lib/services-data'

interface ServiceDetailProps {
  service: ServiceDetailType
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero Section */}
      <section className={`relative py-20 bg-gradient-to-br ${service.bgColor} overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6">
              {service.tagline}
            </p>
            {service.heightCapability && (
              <div className="inline-block px-6 py-3 bg-white/90 backdrop-blur-md rounded-full text-gray-900 font-bold shadow-lg mb-8">
                Jusqu'à {service.heightCapability} de hauteur
              </div>
            )}
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
              Avantages
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl border-2 border-primary-200"
                >
                  {/* @ts-ignore */}
                  <Check className="w-6 h-6 text-secondary-600 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-800 font-semibold">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methods Section */}
      <section className={`py-16 bg-gradient-to-br ${service.bgColor}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
              Notre Méthode
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.methods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-primary-400 transition-all"
                >
                  <p className="text-gray-800 font-medium">{method}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
              Certains de Nos Services
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.detailedServices.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                  <p className="text-gray-800">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`py-16 bg-gradient-to-br ${service.bgColor}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
              Pourquoi Nous Choisir
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {service.whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 hover:border-primary-400 transition-all"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Prêt à Commencer ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:scale-105 inline-flex items-center justify-center"
              >
                Demander un Devis
                {/* @ts-ignore */}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
              >
                Voir Tous les Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

