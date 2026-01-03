'use client'

import { motion } from 'framer-motion'
import { Sofa, Home, Building2, Briefcase, Building, Wrench, Key, Layers, Square, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Service {
  icon: any
  title: string
  description: string
  href: string
  color: string
  image: string
}

const services: Service[] = [
  {
    icon: Sofa,
    title: 'Canapés et fauteuils',
    description: 'Nous offrons un nettoyage professionnel de canapés et fauteuils, pour leur redonner propreté, fraîcheur et éclat tout en respectant les matériaux.',
    href: '/services/canapes-et-matelas',
    color: 'from-primary-500 to-primary-600',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Sofa cleaning
  },
  {
    icon: Home,
    title: 'Fin de Bail',
    description: 'Nous proposons un service de nettoyage pour fin de bail, garantissant propreté et conformité pour un départ en toute sérénité.',
    href: '/services/fin-de-bail',
    color: 'from-secondary-500 to-secondary-600',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Moving out cleaning
  },
  {
    icon: Wrench,
    title: 'Fin de Chantier',
    description: 'Offrez-vous un espace impeccable grâce à notre service de nettoyage après travaux, garantissant propreté et fonctionnalité immédiate.',
    href: '/services/fin-de-chantier',
    color: 'from-accent-500 to-accent-600',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Construction cleanup
  },
  {
    icon: Key,
    title: 'Conciergerie',
    description: 'Bénéficiez de nos services de conciergerie, conçus pour simplifier votre quotidien et maintenir vos espaces toujours propres et agréables.',
    href: '/services/conciergerie',
    color: 'from-primary-500 to-secondary-500',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Concierge service
  },
  {
    icon: Building,
    title: 'Immeubles',
    description: 'Des services de nettoyage pour votre maison, votre appartement et votre immeuble, afin de garantir des espaces propres, confortables et bien entretenus.',
    href: '/services/immeubles',
    color: 'from-secondary-500 to-accent-500',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Apartment cleaning
  },
  {
    icon: Briefcase,
    title: 'Bureaux',
    description: 'Des services de nettoyage pour vos bureaux, garantissant un espace de travail propre, professionnel et agréable.',
    href: '/services/bureaux',
    color: 'from-accent-500 to-primary-500',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Office cleaning
  },
  {
    icon: Layers,
    title: 'Toiture',
    description: 'Un service de nettoyage pour votre toiture, offrant une apparence éclatante et un entretien optimal.',
    href: '/services/toiture',
    color: 'from-primary-600 to-accent-600',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Roof cleaning
  },
  {
    icon: Square,
    title: 'Vitres',
    description: 'Des services de nettoyage pour vos vitres, garantissant une clarté parfaite et une vue dégagée.',
    href: '/services/vitres',
    color: 'from-accent-500 to-secondary-600',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Window cleaning
  },
  {
    icon: Building2,
    title: 'Façade',
    description: 'Un nettoyage complet de votre façade pour révéler toute sa beauté et valoriser votre bâtiment.',
    href: '/services/facade',
    color: 'from-secondary-600 to-primary-600',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Facade cleaning
  },
]

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white w-full">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4 sm:mb-6 leading-[1.25]">
            Nos Services
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-[1.7] px-4">
            Des solutions de nettoyage complètes adaptées à tous vos besoins professionnels et résidentiels
          </p>
        </motion.div>

        {/* Modern List Layout - Daha Okunabilir */}
        <div className="space-y-4 sm:space-y-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={service.href}
                  prefetch={true}
                  className="group block bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    {/* Service Image */}
                    <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 sm:mb-3">
                        <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md`}>
                          {/* @ts-ignore */}
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <div className="inline-flex items-center text-primary-600 font-semibold text-sm sm:text-base group-hover:text-primary-700 transition-colors">
                        En savoir plus
                        {/* @ts-ignore */}
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>

                    {/* Decorative Line */}
                    <div className={`hidden sm:block w-1 h-20 bg-gradient-to-b ${service.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
