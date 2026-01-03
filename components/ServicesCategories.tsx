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
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Residential cleaning
    services: [
      { name: 'Canapés et Matelas', slug: 'canapes-et-matelas', description: 'Nettoyage professionnel de canapés et matelas', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
      { name: 'Fin de Bail', slug: 'fin-de-bail', description: 'Nettoyage complet pour fin de bail', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
      { name: 'Fin de Chantier', slug: 'fin-de-chantier', description: 'Nettoyage après travaux', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
      { name: 'Immeubles', slug: 'immeubles', description: 'Nettoyage d\'appartements et résidences', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    ],
  },
  {
    title: 'Services Commerciaux',
    description: 'Maintenez vos espaces professionnels impeccables',
    icon: Building2,
    color: 'from-secondary-500 to-secondary-600',
    bgColor: 'from-secondary-50 to-secondary-100',
    borderColor: 'border-secondary-400',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Office cleaning
    services: [
      { name: 'Bureaux', slug: 'bureaux', description: 'Nettoyage de bureaux professionnels', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
      { name: 'Conciergerie', slug: 'conciergerie', description: 'Services de conciergerie d\'entreprise', image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    ],
  },
  {
    title: 'Services Spécialisés',
    description: 'Expertise en hauteur jusqu\'à 60 mètres',
    icon: Layers,
    color: 'from-accent-500 to-accent-600',
    bgColor: 'from-accent-50 to-accent-100',
    borderColor: 'border-accent-400',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // High-rise cleaning
    services: [
      { name: 'Toiture', slug: 'toiture', description: 'Nettoyage de toiture jusqu\'à 60m', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
      { name: 'Vitres', slug: 'vitres', description: 'Nettoyage de vitres jusqu\'à 60m', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
      { name: 'Façade', slug: 'facade', description: 'Nettoyage de façade jusqu\'à 60m', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    ],
  },
]

export default function ServicesCategories() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 min-h-screen pt-28">
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
                <div className={`relative bg-gradient-to-br ${category.bgColor} backdrop-blur-xl rounded-2xl overflow-hidden border-4 ${category.borderColor} shadow-2xl h-full`}>
                  {/* Category Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`}></div>
                    <div className={`absolute top-4 left-4 w-12 h-12 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg`}>
                      {/* @ts-ignore */}
                      <IconComponent className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h2>
                    <p className="text-gray-600 mb-6">{category.description}</p>
                    
                    <ul className="space-y-3">
                      {category.services.map((service, serviceIndex) => (
                        <li key={serviceIndex}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-all group/item"
                          >
                            {/* Service Thumbnail */}
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                              <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-semibold text-gray-900 block">{service.name}</span>
                              <p className="text-sm text-gray-600">{service.description}</p>
                            </div>
                            {/* @ts-ignore */}
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover/item:text-primary-600 group-hover/item:translate-x-1 transition-all flex-shrink-0" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

