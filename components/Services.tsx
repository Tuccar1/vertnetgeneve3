'use client'

import { motion } from 'framer-motion'
import { Sofa, Home, Building2, Briefcase, Building, Wrench, Key, Layers, Square } from 'lucide-react'
import Link from 'next/link'

interface Service {
  icon: any
  title: string
  description: string
  href: string
  color: string
}

const services: Service[] = [
  {
    icon: Sofa,
    title: 'Canapés et fauteuils',
    description: 'Nous offrons un nettoyage professionnel de canapés et fauteuils, pour leur redonner propreté, fraîcheur et éclat tout en respectant les matériaux.',
    href: '#canapes',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Home,
    title: 'Fin de Bail',
    description: 'Nous proposons un service de nettoyage pour fin de bail, garantissant propreté et conformité pour un départ en toute sérénité.',
    href: '#fin-de-bail',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    icon: Wrench,
    title: 'Fin de Chantier',
    description: 'Offrez-vous un espace impeccable grâce à notre service de nettoyage après travaux, garantissant propreté et fonctionnalité immédiate.',
    href: '#fin-de-chantier',
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: Key,
    title: 'Conciergerie',
    description: 'Bénéficiez de nos services de conciergerie, conçus pour simplifier votre quotidien et maintenir vos espaces toujours propres et agréables.',
    href: '#conciergerie',
    color: 'from-primary-500 to-secondary-500',
  },
  {
    icon: Building,
    title: 'Immeubles',
    description: 'Des services de nettoyage pour votre maison, votre appartement et votre immeuble, afin de garantir des espaces propres, confortables et bien entretenus.',
    href: '#immeubles',
    color: 'from-secondary-500 to-accent-500',
  },
  {
    icon: Briefcase,
    title: 'Bureaux',
    description: 'Des services de nettoyage pour vos bureaux, garantissant un espace de travail propre, professionnel et agréable.',
    href: '#bureaux',
    color: 'from-accent-500 to-primary-500',
  },
  {
    icon: Layers,
    title: 'Toiture',
    description: 'Un service de nettoyage pour votre toiture, offrant une apparence éclatante et un entretien optimal.',
    href: '#toiture',
    color: 'from-primary-600 to-accent-600',
  },
  {
    icon: Square,
    title: 'Vitres',
    description: 'Des services de nettoyage pour vos vitres, garantissant une clarté parfaite et une vue dégagée.',
    href: '#vitres',
    color: 'from-accent-500 to-secondary-600',
  },
  {
    icon: Building2,
    title: 'Façade',
    description: 'Un nettoyage complet de votre façade pour révéler toute sa beauté et valoriser votre bâtiment.',
    href: '#facade',
    color: 'from-secondary-600 to-primary-600',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Nos Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Des solutions de nettoyage complètes adaptées à tous vos besoins professionnels et résidentiels
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {/* @ts-ignore */}
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group/link"
                >
                  En Savoir Plus
                  <svg
                    className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
