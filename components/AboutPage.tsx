'use client'

import { motion } from 'framer-motion'
import { Clock, Shield, Leaf, Recycle, Heart, Target, MapPin, Users, Award } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const features = [
  {
    Icon: Clock,
    title: 'Disponibilité 24h/24 et 7j/7',
    description: 'Nous comprenons que la vie ne s\'arrête pas, et nous non plus. Nos services de nettoyage sont disponibles 24h/24 et 7j/7 pour s\'intégrer à votre emploi du temps, peu importe à quel point il est chargé.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-400',
  },
  {
    Icon: Shield,
    title: 'Garantie de satisfaction client à 100%',
    description: 'Votre satisfaction est notre objectif ultime. Si vous n\'êtes pas entièrement satisfait de notre service, nous continuerons jusqu\'à ce que tout soit parfait. Parce que vous méritez ce qu\'il y a de mieux.',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-400',
  },
  {
    Icon: Leaf,
    title: 'Approche écologique',
    description: 'Nous avons à cœur de protéger la planète. C\'est pourquoi nous utilisons des produits de nettoyage écologiques, sûrs pour votre famille et respectueux de l\'environnement.',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-400',
  },
  {
    Icon: Recycle,
    title: 'Durabilité au cœur de nos valeurs',
    description: 'La durabilité n\'est pas qu\'un mot à la mode pour nous—c\'est une valeur fondamentale. De l\'utilisation d\'équipements économes en énergie à la réduction des déchets, nous faisons des choix qui soutiennent un avenir plus vert.',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-400',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              À Propos de Notre Entreprise
            </h1>
            <h2 className="text-2xl md:text-3xl font-display font-semibold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6">
              L'excellence dans les Services de Nettoyage
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Chez Genève Nettoyage, nous ne sommes pas seulement un prestataire de services de nettoyage—nous sommes votre partenaire de confiance pour maintenir un environnement propre, sain et durable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.Icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Glow Effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.borderColor.replace('border-', 'bg-')} rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    {/* Card */}
                    <div className={`relative ${feature.bgColor} rounded-2xl p-8 border-4 ${feature.borderColor} shadow-xl`}>
                      <div className="flex items-start space-x-4">
                        <div className={`p-4 rounded-xl ${feature.bgColor} border-2 ${feature.borderColor}`}>
                          {/* @ts-ignore */}
                          <IconComponent className={`w-8 h-8 ${feature.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-10 shadow-xl border-4 border-primary-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                  Notre Entreprise
                </h2>
                <h3 className="text-2xl md:text-3xl font-display font-semibold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6">
                  Au cœur de Genève, pour un avenir plus propre
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Notre entreprise, basée à Genève, se consacre à offrir des services de nettoyage respectueux à la fois de ses clients et de l'environnement. Fondée dans le but de créer un environnement plus propre, notre mission va au-delà du nettoyage : nous prenons part à la construction d'un avenir durable.
                  </p>
                  <div className="flex items-center space-x-3 mb-4">
                    {/* @ts-ignore */}
                    <Target className="w-6 h-6 text-primary-600" />
                    <h4 className="text-xl font-bold text-gray-900">Notre Vision</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Devenir un leader dans la fourniture de solutions de nettoyage innovantes et durables à Genève et dans ses environs.
                  </p>
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    {/* @ts-ignore */}
                    <Heart className="w-6 h-6 text-secondary-600" />
                    <h4 className="text-xl font-bold text-gray-900">Notre Mission</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Fournir à nos clients des services de nettoyage fiables et de qualité tout en adoptant un modèle d'affaires respectueux de la nature, contribuant ainsi à la société et à l'environnement.
                  </p>
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-6 border-2 border-primary-200">
                    <p className="text-gray-800 font-bold text-center text-lg">
                      Ensemble, bâtissons un environnement plus propre et plus fort!
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-6 pt-8 border-t-2 border-gray-200">
                <div className="text-center">
                  {/* @ts-ignore */}
                  <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Genève</h4>
                  <p className="text-gray-600">Basés à Genève</p>
                </div>
                <div className="text-center">
                  {/* @ts-ignore */}
                  <Users className="w-12 h-12 text-secondary-600 mx-auto mb-3" />
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Équipe</h4>
                  <p className="text-gray-600">Professionnels certifiés</p>
                </div>
                <div className="text-center">
                  {/* @ts-ignore */}
                  <Award className="w-12 h-12 text-accent-600 mx-auto mb-3" />
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Qualité</h4>
                  <p className="text-gray-600">100% Satisfaction</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Rejoignez-Nous dans Notre Mission
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Contactez-nous dès aujourd'hui pour découvrir comment nous pouvons vous aider
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:scale-105"
            >
              Demander un Devis
              {/* @ts-ignore */}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

