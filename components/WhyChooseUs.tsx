'use client'

import { motion } from 'framer-motion'
import { Clock, Shield, Leaf, Users, Award, Heart } from 'lucide-react'

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
    <section id="pourquoi-nous" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary-50/80 to-white/80 backdrop-blur-sm w-full overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4 sm:mb-6 leading-[1.25]">
            Pourquoi Nous Choisir
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-[1.7] mb-4 sm:mb-6 px-4">
            Chez nous, chaque client est une priorité. Basés à Genève, nous sommes fiers de contribuer au bien-être de notre communauté locale en offrant des services de nettoyage de qualité.
          </p>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-primary-600 mt-4 sm:mt-6 leading-[1.5] px-4">
            Ensemble, bâtissons un environnement plus propre et plus fort!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon
            const reasonImages = [
              'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // 24/7
              'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Satisfaction
              'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Environnement
              'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Experts
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Technologie
              'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Qualité
            ]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 max-w-sm mx-auto"
              >
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={reasonImages[index]}
                    alt={reason.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${reason.bgColor} flex items-center justify-center mb-3 sm:mb-4 -mt-5 sm:-mt-6 relative z-10 mx-auto`}>
                    {/* @ts-ignore */}
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
    </section>
  )
}

