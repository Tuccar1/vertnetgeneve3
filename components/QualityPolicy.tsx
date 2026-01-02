'use client'

import { motion } from 'framer-motion'
import { Shield, Leaf, Heart, Award, CheckCircle, Target } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const qualityPoints = [
  {
    icon: Shield,
    title: 'Garantie de Satisfaction Client à 100%',
    description: 'Votre satisfaction est notre objectif ultime. Si vous n\'êtes pas entièrement satisfait de notre service, nous continuerons jusqu\'à ce que tout soit parfait. Parce que vous méritez ce qu\'il y a de mieux.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-400',
  },
  {
    icon: Leaf,
    title: 'Approche Écologique',
    description: 'Nous avons à cœur de protéger la planète. C\'est pourquoi nous utilisons des produits de nettoyage écologiques, sûrs pour votre famille et respectueux de l\'environnement.',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-400',
  },
  {
    icon: Heart,
    title: 'Durabilité au Cœur de Nos Valeurs',
    description: 'La durabilité n\'est pas qu\'un mot à la mode pour nous—c\'est une valeur fondamentale. De l\'utilisation d\'équipements économes en énergie à la réduction des déchets, nous faisons des choix qui soutiennent un avenir plus vert.',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-400',
  },
  {
    icon: Award,
    title: 'Standards Professionnels',
    description: 'Nous maintenons les plus hauts standards de qualité dans tous nos services. Notre équipe est formée régulièrement pour garantir l\'excellence à chaque intervention.',
    color: 'text-accent-600',
    bgColor: 'bg-accent-50',
    borderColor: 'border-accent-400',
  },
  {
    icon: Target,
    title: 'Engagement Environnemental',
    description: 'Notre responsabilité environnementale se reflète dans chaque aspect de notre travail. Nous utilisons des méthodes durables et des produits certifiés pour minimiser notre impact écologique.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-400',
  },
  {
    icon: CheckCircle,
    title: 'Qualité Garantie',
    description: 'Chaque service est effectué avec le plus grand soin et attention aux détails. Nous ne considérons pas notre travail terminé tant que vous n\'êtes pas entièrement satisfait.',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-400',
  },
]

export default function QualityPolicy() {
  return (
    <div className="min-h-screen pt-24">
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
              Politique de Qualité
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Notre engagement envers l'excellence, la durabilité et votre satisfaction totale
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quality Points */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {qualityPoints.map((point, index) => {
                const IconComponent = point.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative group`}
                  >
                    {/* Glow Effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${point.borderColor.replace('border-', 'bg-')} rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    {/* Card */}
                    <div className={`relative ${point.bgColor} rounded-2xl p-8 border-4 ${point.borderColor} shadow-xl h-full`}>
                      <div className={`w-16 h-16 rounded-xl ${point.bgColor} flex items-center justify-center mb-6`}>
                        {/* @ts-ignore */}
                        <IconComponent className={`w-8 h-8 ${point.color}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {point.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
              Notre Engagement
            </h2>
            <div className="bg-white rounded-2xl p-10 shadow-xl border-4 border-primary-200">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Chez Genève Nettoyage, nous ne sommes pas seulement un prestataire de services de nettoyage—nous sommes votre partenaire de confiance pour maintenir un environnement propre, sain et durable. Notre mission est non seulement de répondre à vos attentes, mais de les dépasser à chaque visite.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nous nous engageons à fournir des services de la plus haute qualité tout en respectant l'environnement et en garantissant votre satisfaction totale. Chaque intervention est effectuée avec professionnalisme, attention aux détails et respect de nos valeurs fondamentales.
              </p>
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
              Faites l'Expérience de Notre Qualité
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Contactez-nous dès aujourd'hui pour découvrir comment nous pouvons répondre à vos besoins
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

