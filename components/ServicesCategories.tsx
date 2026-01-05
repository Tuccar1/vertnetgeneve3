'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Building2, Layers, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const categories = [
  {
    title: 'Services Résidentiels',
    description: 'Des solutions de nettoyage complètes pour votre domicile',
    icon: Home,
    color: 'from-gray-400 to-gray-500',
    bgColor: 'from-gray-50 to-gray-100',
    borderColor: 'border-gray-400',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100', // Residential cleaning
    services: [
      { name: 'Canapés et Matelas', slug: 'canapes-et-matelas', description: 'Nettoyage professionnel de canapés et matelas', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100' }, // Sofa cleaning
      { name: 'Fin de Bail', slug: 'fin-de-bail', description: 'Nettoyage complet pour fin de bail', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100' }, // Empty apartment cleaning
      { name: 'Fin de Chantier', slug: 'fin-de-chantier', description: 'Nettoyage après travaux', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100' }, // Construction cleanup
      { name: 'Immeubles', slug: 'immeubles', description: 'Nettoyage d\'appartements et résidences', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100' }, // Residential building
    ],
  },
  {
    title: 'Services Commerciaux',
    description: 'Maintenez vos espaces professionnels impeccables',
    icon: Building2,
    color: 'from-gray-500 to-gray-600',
    bgColor: 'from-gray-50 to-gray-100',
    borderColor: 'border-gray-400',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100', // Office cleaning
    services: [
      { name: 'Bureaux', slug: 'bureaux', description: 'Nettoyage de bureaux professionnels', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100' }, // Office cleaning
      { name: 'Conciergerie', slug: 'conciergerie', description: 'Services de conciergerie d\'entreprise', image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100' }, // Concierge service
    ],
  },
  {
    title: 'Services Spécialisés',
    description: 'Expertise en hauteur jusqu\'à 60 mètres',
    icon: Layers,
    color: 'from-gray-400 to-gray-600',
    bgColor: 'from-gray-50 to-gray-100',
    borderColor: 'border-gray-400',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100', // High-rise cleaning - building exterior
    services: [
      { name: 'Toiture', slug: 'toiture', description: 'Nettoyage de toiture jusqu\'à 60m', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100' }, // Roof cleaning - professional roof maintenance
      { name: 'Vitres', slug: 'vitres', description: 'Nettoyage de vitres jusqu\'à 60m', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100' }, // Window cleaning high-rise
      { name: 'Façade', slug: 'facade', description: 'Nettoyage de façade jusqu\'à 60m', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100' }, // Facade cleaning
    ],
  },
]

export default function ServicesCategories() {
  return (
    <div className="w-full relative">
      {/* Sabit arka plan fotoğraf - Tüm sayfada sabit kalacak */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/istockphoto-488989384-612x612.jpg"
          alt="Cleaning background"
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
      <section className="relative pt-20 sm:pt-24 pb-8 md:pb-12 bg-gradient-to-br from-primary-50/50 via-secondary-50/50 to-accent-50/50 backdrop-blur-[1px] overflow-hidden z-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Dekoratif ikonlar */}
            <motion.div
              className="flex justify-center gap-4 mb-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Home className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center shadow-lg"
                animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Building2 className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Layers className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Nos Services
            </h1>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full mx-auto mb-4 max-w-xs"
            />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Des solutions de nettoyage professionnel adaptées à tous vos besoins
            </p>
          </motion.div>
        </div>
      </section>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
      <section className="py-8 bg-white/60 backdrop-blur-[2px]">
        <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.03,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative group ${index === 0 || index === 2 ? 'flex flex-col' : ''}`}
              >
                {/* Card */}
                <motion.div 
                  className={`relative bg-gradient-to-br ${category.bgColor}/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg ${index === 0 || index === 2 ? 'flex flex-col min-h-[520px]' : ''}`}
                  whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  {/* Category Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`}></div>
                    <div className={`absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg`}>
                      {/* @ts-ignore */}
                      <IconComponent className="w-4 h-4 text-gray-900" />
                    </div>
                  </div>
                  
                  <div className={`p-5 pb-6 ${index === 0 || index === 2 ? 'flex-1 flex flex-col' : ''}`}>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h2>
                    <p className="text-gray-600 mb-4 text-sm">{category.description}</p>
                    
                    <ul className={`space-y-2 ${index === 0 || index === 2 ? 'flex-1' : ''}`}>
                      {category.services.map((service, serviceIndex) => (
                        <li key={serviceIndex}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-white/50 transition-all group/item"
                          >
                            {/* Service Thumbnail */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden relative">
                              <Image
                                src={service.image}
                                alt={service.name}
                                fill
                                className="object-cover group-hover/item:scale-110 transition-transform duration-300"
                                quality={100}
                                sizes="48px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-semibold text-gray-900 block text-sm">{service.name}</span>
                              <p className="text-xs text-gray-600">{service.description}</p>
                            </div>
                            {/* @ts-ignore */}
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover/item:text-primary-600 group-hover/item:translate-x-1 transition-all flex-shrink-0" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
      </div>
    </div>
  )
}

