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
    <section id="pourquoi-nous" className="py-20 bg-gradient-to-br from-primary-50/80 to-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-[1.25]">
            Pourquoi Nous Choisir
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-[1.7] mb-6">
            Chez nous, chaque client est une priorité. Basés à Genève, nous sommes fiers de contribuer au bien-être de notre communauté locale en offrant des services de nettoyage de qualité.
          </p>
          <p className="text-lg md:text-xl font-semibold text-primary-600 mt-6 leading-[1.5]">
            Ensemble, bâtissons un environnement plus propre et plus fort!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`${reason.bgColor} rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl ${reason.bgColor} flex items-center justify-center mb-6`}>
                  {/* @ts-ignore */}
                  <IconComponent className={`w-7 h-7 md:w-8 md:h-8 ${reason.color}`} />
                </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-[1.3]">
                {reason.title}
              </h3>
              <p className="text-base text-gray-600 leading-[1.7]">
                {reason.description}
              </p>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

