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
      href: '/services/canapes-et-matelas',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Home,
    title: 'Fin de Bail',
    description: 'Nous proposons un service de nettoyage pour fin de bail, garantissant propreté et conformité pour un départ en toute sérénité.',
      href: '/services/fin-de-bail',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    icon: Wrench,
    title: 'Fin de Chantier',
    description: 'Offrez-vous un espace impeccable grâce à notre service de nettoyage après travaux, garantissant propreté et fonctionnalité immédiate.',
      href: '/services/fin-de-chantier',
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: Key,
    title: 'Conciergerie',
    description: 'Bénéficiez de nos services de conciergerie, conçus pour simplifier votre quotidien et maintenir vos espaces toujours propres et agréables.',
      href: '/services/conciergerie',
    color: 'from-primary-500 to-secondary-500',
  },
  {
    icon: Building,
    title: 'Immeubles',
    description: 'Des services de nettoyage pour votre maison, votre appartement et votre immeuble, afin de garantir des espaces propres, confortables et bien entretenus.',
      href: '/services/immeubles',
    color: 'from-secondary-500 to-accent-500',
  },
  {
    icon: Briefcase,
    title: 'Bureaux',
    description: 'Des services de nettoyage pour vos bureaux, garantissant un espace de travail propre, professionnel et agréable.',
      href: '/services/bureaux',
    color: 'from-accent-500 to-primary-500',
  },
  {
    icon: Layers,
    title: 'Toiture',
    description: 'Un service de nettoyage pour votre toiture, offrant une apparence éclatante et un entretien optimal.',
      href: '/services/toiture',
    color: 'from-primary-600 to-accent-600',
  },
  {
    icon: Square,
    title: 'Vitres',
    description: 'Des services de nettoyage pour vos vitres, garantissant une clarté parfaite et une vue dégagée.',
      href: '/services/vitres',
    color: 'from-accent-500 to-secondary-600',
  },
  {
    icon: Building2,
    title: 'Façade',
    description: 'Un nettoyage complet de votre façade pour révéler toute sa beauté et valoriser votre bâtiment.',
      href: '/services/facade',
    color: 'from-secondary-600 to-primary-600',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-white/80 backdrop-blur-sm w-full">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4 sm:mb-6 leading-[1.25]">
            Nos Services
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-[1.7] px-4">
            Des solutions de nettoyage complètes adaptées à tous vos besoins professionnels et résidentiels
          </p>
        </motion.div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                 {services.map((service, index) => {
                   const IconComponent = service.icon
                   const serviceImages = [
                     'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Canapés
                     'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Fin de Bail
                     'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Fin de Chantier
                     'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Conciergerie
                     'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Immeubles
                     'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Bureaux
                     'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Toiture
                     'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Vitres
                     'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Façade
                   ]
                   return (
                     <motion.div
                       key={index}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.6, delay: index * 0.1 }}
                       whileHover={{ y: -5 }}
                       className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group max-w-sm mx-auto"
                     >
                       <div className="relative h-24 sm:h-28 md:h-32 overflow-hidden">
                         <img
                           src={serviceImages[index]}
                           alt={service.title}
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                         />
                         <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`}></div>
                       </div>
                       <div className="p-5 md:p-6">
                         <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto`}>
                           {/* @ts-ignore */}
                           <IconComponent className="w-6 h-6 text-white" />
                         </div>
                       <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-[1.3] text-center">
                         {service.title}
                       </h3>
                       <p className="text-sm text-gray-600 leading-[1.7] mb-4 text-center">
                         {service.description}
                       </p>
                              <Link
                                href={service.href}
                                prefetch={true}
                                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group/link text-sm leading-[1.5] mx-auto justify-center w-full"
                              >
                         En Savoir Plus
                         <svg
                           className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform flex-shrink-0"
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
