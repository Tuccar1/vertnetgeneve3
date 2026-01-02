'use client'

import { motion } from 'framer-motion'
import { Clock, Shield, Leaf, Recycle, Heart, Target } from 'lucide-react'

const FeatureCard = ({ 
  Icon, 
  title, 
  description, 
  color, 
  bgColor 
}: { 
  Icon: any
  title: string
  description: string
  color: string
  bgColor: string
}) => (
      <div className="flex items-start space-x-4">
    <div className={`p-3 rounded-lg ${bgColor} flex-shrink-0`}>
      {/* @ts-ignore */}
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <div className="flex-1">
      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-[1.3]">
        {title}
      </h4>
      <p className="text-base text-gray-600 leading-[1.7]">
        {description}
      </p>
    </div>
  </div>
)

export default function About() {
  const features = [
    {
      Icon: Clock,
      title: 'Disponibilité 24h/24 et 7j/7',
      description: 'Nous comprenons que la vie ne s\'arrête pas, et nous non plus. Nos services de nettoyage sont disponibles 24h/24 et 7j/7 pour s\'intégrer à votre emploi du temps, peu importe à quel point il est chargé.',
      color: 'text-accent-500',
      bgColor: 'bg-accent-50',
    },
    {
      Icon: Shield,
      title: 'Garantie de satisfaction client à 100%',
      description: 'Votre satisfaction est notre objectif ultime. Si vous n\'êtes pas entièrement satisfait de notre service, nous continuerons jusqu\'à ce que tout soit parfait. Parce que vous méritez ce qu\'il y a de mieux.',
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-50',
    },
    {
      Icon: Leaf,
      title: 'Approche écologique',
      description: 'Nous avons à cœur de protéger la planète. C\'est pourquoi nous utilisons des produits de nettoyage écologiques, sûrs pour votre famille et respectueux de l\'environnement.',
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-50',
    },
    {
      Icon: Recycle,
      title: 'Durabilité au cœur de nos valeurs',
      description: 'La durabilité n\'est pas qu\'un mot à la mode pour nous—c\'est une valeur fondamentale. De l\'utilisation d\'équipements économes en énergie à la réduction des déchets, nous faisons des choix qui soutiennent un avenir plus vert.',
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-50',
    },
  ]

  return (
    <section id="apropos" className="py-20 bg-primary-50/50">
      <div className="container mx-auto px-4">
        {/* Section 1: Excellence dans les Services */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-[1.25]">
              À Propos de Notre Entreprise
            </h2>
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-primary-600 mb-6 leading-[1.3]">
              L'excellence dans les Services de Nettoyage
            </h3>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-[1.7]">
              Chez Genève Nettoyage, nous ne sommes pas seulement un prestataire de services de nettoyage—nous sommes votre partenaire de confiance pour maintenir un environnement propre, sain et durable. Notre mission est non seulement de répondre à vos attentes, mais de les dépasser à chaque visite.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Notre Entreprise */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-12 shadow-xl"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-[1.25]">
                Notre Entreprise
              </h2>
              <h3 className="text-xl md:text-2xl font-display font-semibold text-primary-600 mb-6 leading-[1.3]">
                Au cœur de Genève, pour un avenir plus propre
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <p className="text-base md:text-lg text-gray-700 leading-[1.7] mb-8">
                  Notre entreprise, basée à Genève, se consacre à offrir des services de nettoyage respectueux à la fois de ses clients et de l'environnement. Fondée dans le but de créer un environnement plus propre, notre mission va au-delà du nettoyage : nous prenons part à la construction d'un avenir durable.
                </p>
                <div className="flex items-center space-x-3 mb-4">
                  {/* @ts-ignore */}
                  <Target className="w-6 h-6 text-primary-600 flex-shrink-0" />
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 leading-[1.3]">Notre Vision</h4>
                </div>
                <p className="text-base text-gray-600 leading-[1.7] mb-6">
                  Devenir un leader dans la fourniture de solutions de nettoyage innovantes et durables à Genève et dans ses environs.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  {/* @ts-ignore */}
                  <Heart className="w-6 h-6 text-secondary-600 flex-shrink-0" />
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 leading-[1.3]">Notre Mission</h4>
                </div>
                <p className="text-base text-gray-600 leading-[1.7] mb-6">
                  Fournir à nos clients des services de nettoyage fiables et de qualité tout en adoptant un modèle d'affaires respectueux de la nature, contribuant ainsi à la société et à l'environnement.
                </p>
                <div className="bg-white/80 rounded-lg p-6">
                  <p className="text-base md:text-lg text-gray-700 font-semibold text-center leading-[1.7]">
                    Ensemble, bâtissons un environnement plus propre et plus fort!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
