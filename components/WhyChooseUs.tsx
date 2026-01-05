'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Shield, Leaf, Users, Award, Heart } from 'lucide-react'
import Image from 'next/image'

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Clock,
      title: 'Support illimité 24h/24 et 7j/7',
      description: 'Nous sommes disponibles à tout moment pour répondre à vos besoins, quelle que soit l\'heure ou la situation. Votre satisfaction est notre priorité, et nous nous engageons à être là quand vous en avez besoin.',
      color: 'text-accent-500',
      bgColor: 'bg-accent-50',
    },
    {
      icon: Shield,
      title: 'Satisfaction Client Garantie',
      description: 'Votre satisfaction est notre priorité. Nous adaptons nos services à vos besoins spécifiques et nous nous efforçons de dépasser vos attentes à chaque étape. Parce que vous méritez le meilleur, nous mettons tout en œuvre pour vous offrir une expérience exceptionnelle.',
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-50',
    },
    {
      icon: Leaf,
      title: 'Respect de l\'environnement',
      description: 'Notre engagement envers la durabilité se reflète dans nos pratiques. Nous utilisons des produits écologiques et des méthodes respectueuses de la planète, contribuant ainsi à un avenir plus propre et plus vert.',
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-50',
    },
    {
      icon: Users,
      title: 'Employés Experts',
      description: 'Notre équipe est composée de professionnels, formés pour répondre à vos besoins spécifiques avec expertise et rigueur.',
      color: 'text-primary-500',
      bgColor: 'bg-primary-50',
    },
    {
      icon: Award,
      title: 'Technologie Moderne',
      description: 'Nous utilisons des équipements à la pointe de la technologie pour garantir un nettoyage efficace, rapide et respectueux de votre environnement.',
      color: 'text-accent-500',
      bgColor: 'bg-accent-50',
    },
    {
      icon: Heart,
      title: 'Qualité de Service',
      description: 'Votre satisfaction est notre priorité. Nous nous engageons à fournir des services de qualité supérieure à chaque intervention.',
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-50',
    },
  ]

  return (
    <section id="pourquoi-nous" className="py-20 lg:py-32 bg-gradient-to-b from-white via-primary-50/80 to-white/80 backdrop-blur-sm w-full relative overflow-hidden">
      {/* Arka plan fotoğraf */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-55">
          <Image
            src="/unnamed.jpg"
            alt="Services de nettoyage professionnel à Genève - Pourquoi choisir Vertnetgeneve"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
            style={{
              objectPosition: 'left center',
              filter: 'brightness(1.0) contrast(1.15) saturate(1.3) blur(1px)',
            }}
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-primary-50/30 to-white/50"></div>
      </div>
      
      {/* Yumuşak geçiş - Üst kısım */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-primary-50/80 to-transparent pointer-events-none z-0"></div>
      
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 sm:mb-8 leading-[1.25]">
            Pourquoi Nous Choisir
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-[1.7] mb-6 sm:mb-8 px-4">
            Chez nous, chaque client est une priorité. Basés à Genève, nous sommes fiers de contribuer au bien-être de notre communauté locale en offrant des services de nettoyage de qualité.
          </p>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-primary-600 mt-6 sm:mt-8 leading-[1.5] px-4">
            Ensemble, bâtissons un environnement plus propre et plus fort!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon as React.ComponentType<{ className?: string }>
            const reasonImages = [
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // 24/7 - Cleaning service available
              'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Satisfaction - Happy customer
              'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Environnement - Eco cleaning
              'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Experts - Professional cleaner
              'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Technologie - Modern equipment
              'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Qualité - Quality cleaning
            ]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 max-w-sm mx-auto"
              >
                <div className="relative h-20 sm:h-24 md:h-28 overflow-hidden">
                  <Image
                    src={reasonImages[index]}
                    alt={`${reason.title} - Vertnetgeneve`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${reason.bgColor} flex items-center justify-center mb-3 sm:mb-4 -mt-5 sm:-mt-6 relative z-10 mx-auto`}>
                    <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${reason.color}`} />
                  </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 leading-[1.3] text-center">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-[1.7] text-center">
                  {reason.description}
                </p>
              </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      {/* Yumuşak geçiş - Alt kısım */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 via-white/50 to-white pointer-events-none z-0"></div>
    </section>
  )
}

