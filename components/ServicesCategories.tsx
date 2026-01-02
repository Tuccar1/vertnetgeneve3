'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Building2, Layers, ArrowRight } from 'lucide-react'

const categories = [
  {
    title: 'Services Résidentiels',
    description: 'Des solutions de nettoyage complètes pour votre domicile',
    icon: Home,
    color: 'from-primary-500 to-primary-600',
    bgColor: 'from-primary-50 to-primary-100',
    borderColor: 'border-primary-400',
    services: [
      { name: 'Canapés et Matelas', slug: 'canapes-et-matelas', description: 'Nettoyage professionnel de canapés et matelas' },
      { name: 'Fin de Bail', slug: 'fin-de-bail', description: 'Nettoyage complet pour fin de bail' },
      { name: 'Fin de Chantier', slug: 'fin-de-chantier', description: 'Nettoyage après travaux' },
      { name: 'Immeubles', slug: 'immeubles', description: 'Nettoyage d\'appartements et résidences' },
    ],
  },
  {
    title: 'Services Commerciaux',
    description: 'Maintenez vos espaces professionnels impeccables',
    icon: Building2,
    color: 'from-secondary-500 to-secondary-600',
    bgColor: 'from-secondary-50 to-secondary-100',
    borderColor: 'border-secondary-400',
    services: [
      { name: 'Bureaux', slug: 'bureaux', description: 'Nettoyage de bureaux professionnels' },
      { name: 'Conciergerie', slug: 'conciergerie', description: 'Services de conciergerie d\'entreprise' },
    ],
  },
  {
    title: 'Services Spécialisés',
    description: 'Expertise en hauteur jusqu\'à 60 mètres',
    icon: Layers,
    color: 'from-accent-500 to-accent-600',
    bgColor: 'from-accent-50 to-accent-100',
    borderColor: 'border-accent-400',
    services: [
      { name: 'Toiture', slug: 'toiture', description: 'Nettoyage de toiture jusqu\'à 60m' },
      { name: 'Vitres', slug: 'vitres', description: 'Nettoyage de vitres jusqu\'à 60m' },
      { name: 'Façade', slug: 'facade', description: 'Nettoyage de façade jusqu\'à 60m' },
    ],
  },
]

export default function ServicesCategories() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 min-h-screen pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Nos Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions de nettoyage professionnel adaptées à tous vos besoins
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Card */}
                <div className={`relative bg-gradient-to-br ${category.bgColor} backdrop-blur-xl rounded-2xl p-8 border-4 ${category.borderColor} shadow-2xl h-full`}>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6`}>
                    {/* @ts-ignore */}
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h2>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  
                  <ul className="space-y-3">
                    {category.services.map((service, serviceIndex) => (
                      <li key={serviceIndex}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-white/50 transition-all group/item"
                        >
                          <div>
                            <span className="font-semibold text-gray-900">{service.name}</span>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                          {/* @ts-ignore */}
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover/item:text-primary-600 group-hover/item:translate-x-1 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

