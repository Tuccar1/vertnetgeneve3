'use client'

import { motion } from 'framer-motion'
import { Clock, Shield, Leaf, Recycle, Heart, Target, MapPin, Users, Award, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

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
    <div className="w-full relative">
      {/* Sabit arka plan fotoğraf - Tüm sayfada sabit kalacak */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/How-to-Safely-Clean-a-Tile-Roof-Without-Ruining-It-1024x683.jpg"
          alt="À propos de Vertnetgeneve - Services de nettoyage professionnel à Genève"
          fill
          className="object-cover"
          style={{
            objectPosition: 'center center',
          }}
          quality={100}
          priority={true}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/20 to-white/25"></div>
      </div>
      
      {/* Hero Section - Header'a yakın, boşluk yok */}
      <section className="relative pt-20 sm:pt-24 pb-6 md:pb-8 overflow-hidden z-10">
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Dekoratif ikonlar - Daha küçük */}
            <motion.div
              className="flex justify-center gap-3 mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center shadow-lg"
                animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Award className="w-5 h-5 text-white" />
              </motion.div>
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Heart className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              À Propos de Notre Entreprise
            </h1>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full mx-auto mb-4 max-w-xs"
            />
            <h2 className="text-xl md:text-2xl font-display font-semibold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-4">
              L'excellence dans les Services de Nettoyage
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Chez Vertnetgeneve, nous ne sommes pas seulement un prestataire de services de nettoyage—nous sommes votre partenaire de confiance pour maintenir un environnement propre, sain et durable.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Section arası boşluk - Daraltıldı */}
      <div className="h-2 md:h-3"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Features Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12">
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
                    <div className={`absolute -inset-1 bg-gradient-to-r ${feature.borderColor.replace('border-', 'bg-')} rounded-3xl blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-500`}></div>
                    
                    {/* Card */}
                    <div className={`relative ${feature.bgColor} rounded-3xl p-10 md:p-12 border-2 ${feature.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]`}>
                      <div className="flex items-start space-x-5 md:space-x-6">
                        <div className={`p-5 md:p-6 rounded-2xl ${feature.bgColor} border-2 ${feature.borderColor} shadow-md group-hover:shadow-lg transition-shadow duration-300 flex-shrink-0`}>
                          {/* @ts-ignore */}
                          <IconComponent className={`w-10 h-10 md:w-12 md:h-12 ${feature.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 md:mb-6 leading-tight">
                            {feature.title}
                          </h3>
                          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
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

      {/* Section arası boşluk - Daraltıldı */}
      <div className="h-4 md:h-6"></div>

      {/* Company Info Section */}
      <section className="py-12 md:py-16 lg:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-10 md:p-14 lg:p-16 shadow-xl border-2 border-primary-200/50">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                  Notre Entreprise
                </h2>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6 sm:mb-8 px-2">
                  Au cœur de Genève, pour un avenir plus propre
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-10 md:gap-12 mb-12">
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Notre entreprise, basée à Genève, se consacre à offrir des services de nettoyage respectueux à la fois de ses clients et de l'environnement. Fondée dans le but de créer un environnement plus propre, notre mission va au-delà du nettoyage : nous prenons part à la construction d'un avenir durable.
                  </p>
                  <div className="flex items-center space-x-4 mb-5">
                    <div className="p-3 bg-primary-50 rounded-xl border-2 border-primary-200">
                      {/* @ts-ignore */}
                      <Target className="w-6 h-6 md:w-7 md:h-7 text-primary-600" />
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900">Notre Vision</h4>
                  </div>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    Devenir un leader dans la fourniture de solutions de nettoyage innovantes et durables à Genève et dans ses environs.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-5">
                    <div className="p-3 bg-secondary-50 rounded-xl border-2 border-secondary-200">
                      {/* @ts-ignore */}
                      <Heart className="w-6 h-6 md:w-7 md:h-7 text-secondary-600" />
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900">Notre Mission</h4>
                  </div>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    Fournir à nos clients des services de nettoyage fiables et de qualité tout en adoptant un modèle d'affaires respectueux de la nature, contribuant ainsi à la société et à l'environnement.
                  </p>
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-10 border-2 border-primary-200 shadow-lg mt-8">
                    <p className="text-gray-800 font-bold text-center text-xl md:text-2xl leading-relaxed">
                      Ensemble, bâtissons un environnement plus propre et plus fort!
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-8 md:gap-10 pt-12 md:pt-16 border-t-2 border-gray-200/50">
                <div className="text-center p-6 rounded-2xl hover:bg-primary-50/50 transition-colors duration-300">
                  <div className="inline-flex p-4 bg-primary-50 rounded-2xl border-2 border-primary-200 mb-4">
                    {/* @ts-ignore */}
                    <MapPin className="w-10 h-10 md:w-12 md:h-12 text-primary-600" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Genève</h4>
                  <p className="text-lg text-gray-600">Basés à Genève</p>
                </div>
                <div className="text-center p-6 rounded-2xl hover:bg-secondary-50/50 transition-colors duration-300">
                  <div className="inline-flex p-4 bg-secondary-50 rounded-2xl border-2 border-secondary-200 mb-4">
                    {/* @ts-ignore */}
                    <Users className="w-10 h-10 md:w-12 md:h-12 text-secondary-600" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Équipe</h4>
                  <p className="text-lg text-gray-600">Professionnels certifiés</p>
                </div>
                <div className="text-center p-6 rounded-2xl hover:bg-accent-50/50 transition-colors duration-300">
                  <div className="inline-flex p-4 bg-accent-50 rounded-2xl border-2 border-accent-200 mb-4">
                    {/* @ts-ignore */}
                    <Award className="w-10 h-10 md:w-12 md:h-12 text-accent-600" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Qualité</h4>
                  <p className="text-lg text-gray-600">100% Satisfaction</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section arası boşluk */}
      <div className="h-12 md:h-16 lg:h-20"></div>

      {/* CTA Section */}
      <section className="py-24 md:py-32 lg:py-40 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white relative overflow-hidden z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6 sm:mb-8 md:mb-10 px-2">
              Rejoignez-Nous dans Notre Mission
            </h2>
            <p className="text-xl md:text-2xl mb-10 md:mb-12 text-white/90 leading-relaxed">
              Contactez-nous dès aujourd'hui pour découvrir comment nous pouvons vous aider
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-10 py-5 md:px-12 md:py-6 bg-white text-emerald-600 rounded-2xl font-bold text-lg md:text-xl hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 hover:shadow-3xl"
            >
              Demander un Devis
              {/* @ts-ignore */}
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  )
}

