'use client'

import { motion } from 'framer-motion'
import { Shield, Leaf, Heart, Award, CheckCircle, Target, Star } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const qualityPoints = [
  {
    icon: Shield,
    title: 'Garantie de Satisfaction Client à 100%',
    description: 'Votre satisfaction est notre objectif ultime. Si vous n\'êtes pas entièrement satisfait de notre service, nous continuerons jusqu\'à ce que tout soit parfait.',
  },
  {
    icon: Leaf,
    title: 'Approche Écologique',
    description: 'Nous avons à cœur de protéger la planète. C\'est pourquoi nous utilisons des produits de nettoyage écologiques, sûrs pour votre famille.',
  },
  {
    icon: Heart,
    title: 'Durabilité au Cœur de Nos Valeurs',
    description: 'La durabilité n\'est pas qu\'un mot à la mode pour nous—c\'est une valeur fondamentale dans chaque intervention.',
  },
  {
    icon: Award,
    title: 'Standards Professionnels',
    description: 'Nous maintenons les plus hauts standards de qualité dans tous nos services avec une équipe formée régulièrement.',
  },
  {
    icon: Target,
    title: 'Engagement Environnemental',
    description: 'Notre responsabilité environnementale se reflète dans chaque aspect de notre travail avec des méthodes durables.',
  },
  {
    icon: CheckCircle,
    title: 'Qualité Garantie',
    description: 'Chaque service est effectué avec le plus grand soin et attention aux détails pour votre satisfaction.',
  },
]

export default function QualityPolicy() {
  return (
    <div className="w-full relative">
      {/* Sabit arka plan fotoğraf - Tüm sayfada sabit kalacak */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/pexels-matilda-wormwood-4098576.jpg"
          alt="Politique de Qualité - Nettoyage professionnel Genève"
          fill
          quality={100}
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      {/* Saydam overlay */}
      <div className="fixed inset-0 bg-white/10 -z-10" />
      
      {/* Hero Section - Header'a yakın, boşluk yok */}
      <section className="relative pt-20 sm:pt-24 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
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
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center shadow-lg"
                animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white mb-3 sm:mb-4 px-2 drop-shadow-lg">
              Politique de Qualité
            </h1>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-white via-white/80 to-white rounded-full mx-auto mb-4 sm:mb-6 max-w-xs"
            />
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed px-2 drop-shadow-md">
              Notre engagement envers l'excellence, la durabilité et votre satisfaction totale
            </p>
          </motion.div>
        </div>
      </section>
      
      <div className="max-w-6xl mx-auto px-4">
      {/* Quality Points */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {qualityPoints.map((point, index) => {
                const IconComponent = point.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.03,
                      transition: { duration: 0.3 }
                    }}
                    className={`relative group cursor-pointer`}
                  >
                    {/* Glow Effect */}
                    <motion.div 
                      className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 rounded-2xl blur-md"
                      initial={{ opacity: 0.3 }}
                      whileHover={{ opacity: 0.6, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-xl h-full overflow-hidden">
                      {/* Subtle shine effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent"
                        initial={{ x: '-100%', opacity: 0 }}
                        whileHover={{ x: '100%', opacity: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"></div>
                      
                      <div className="relative z-10">
                        <motion.div 
                          className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20"
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* @ts-ignore */}
                          <IconComponent className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight">
                          {point.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-base">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-xl border-4 border-primary-200">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Chez Vertnetgeneve, nous ne sommes pas seulement un prestataire de services de nettoyage—nous sommes votre partenaire de confiance pour maintenir un environnement propre, sain et durable. Notre mission est non seulement de répondre à vos attentes, mais de les dépasser à chaque visite.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nous nous engageons à fournir des services de la plus haute qualité tout en respectant l'environnement et en garantissant votre satisfaction totale. Chaque intervention est effectuée avec professionnalisme, attention aux détails et respect de nos valeurs fondamentales.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white relative overflow-hidden">
        {/* Dekoratif efektler */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
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
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-xl hover:scale-105 border border-emerald-400/30"
            >
              Demander un Devis
              {/* @ts-ignore */}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  )
}

