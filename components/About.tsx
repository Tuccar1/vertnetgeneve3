'use client'

import { motion } from 'framer-motion'
import { Clock, Shield, Leaf, Recycle, Heart, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'

interface FeatureProps {
  Icon: LucideIcon
  title: string
  description: string
}

export default function About() {
  const features: FeatureProps[] = [
    {
      Icon: Clock,
      title: 'Disponibilité 24h/24 et 7j/7',
      description: 'Nous comprenons que la vie ne s\'arrête pas, et nous non plus. Nos services de nettoyage sont disponibles 24h/24 et 7j/7 pour s\'intégrer à votre emploi du temps, peu importe à quel point il est chargé.',
    },
    {
      Icon: Shield,
      title: 'Garantie de satisfaction client à 100%',
      description: 'Votre satisfaction est notre objectif ultime. Si vous n\'êtes pas entièrement satisfait de notre service, nous continuerons jusqu\'à ce que tout soit parfait. Parce que vous méritez ce qu\'il y a de mieux.',
    },
    {
      Icon: Leaf,
      title: 'Approche écologique',
      description: 'Nous avons à cœur de protéger la planète. C\'est pourquoi nous utilisons des produits de nettoyage écologiques, sûrs pour votre famille et respectueux de l\'environnement.',
    },
    {
      Icon: Recycle,
      title: 'Durabilité au cœur de nos valeurs',
      description: 'La durabilité n\'est pas qu\'un mot à la mode pour nous—c\'est une valeur fondamentale. De l\'utilisation d\'équipements économes en énergie à la réduction des déchets, nous faisons des choix qui soutiennent un avenir plus vert.',
    },
  ]

  return (
    <section id="apropos" className="py-20 lg:py-32 w-full relative overflow-hidden">
      {/* Arka plan fotoğraf - Sabit */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/cleaning-4.webp"
          alt="Services de nettoyage professionnel à Genève - Vertnetgeneve"
          fill
          className="object-cover object-center"
          quality={100}
          priority
          sizes="100vw"
        />
      </div>
      {/* Saydam overlay */}
      <div className="fixed inset-0 bg-white/10 -z-10" />
      
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section 1: Excellence dans les Services */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 sm:mb-8 leading-[1.25] drop-shadow-lg">
              À Propos de Notre Entreprise
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white/90 mb-6 sm:mb-8 leading-[1.3] drop-shadow-md">
              L'excellence dans les Services de Nettoyage
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-[1.7] px-4 drop-shadow">
              Chez Vertnetgeneve, nous ne sommes pas seulement un prestataire de services de nettoyage—nous sommes votre partenaire de confiance pour maintenir un environnement propre, sain et durable. Notre mission est non seulement de répondre à vos attentes, mais de les dépasser à chaque visite.
            </p>
          </motion.div>

          {/* Animasyonlu Kartlar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-16 sm:mb-20">
            {features.map((feature, index) => {
              const IconComponent = feature.Icon
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
                  className="relative group cursor-pointer"
                >
                  {/* Glow Effect */}
                  <motion.div 
                    className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 rounded-2xl blur-md"
                    initial={{ opacity: 0.3 }}
                    whileHover={{ opacity: 0.6, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Card */}
                  <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/50 shadow-xl h-full overflow-hidden">
                    {/* Shine effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent"
                      initial={{ x: '-100%', opacity: 0 }}
                      whileHover={{ x: '100%', opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"></div>
                    
                    <div className="relative z-10 flex items-start space-x-4">
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0"
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-3 leading-[1.3]">
                          {feature.title}
                        </h4>
                        <p className="text-base text-gray-600 leading-[1.7]">
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

        {/* Section 2: Notre Entreprise */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 rounded-2xl blur-md opacity-30"></div>
            
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl overflow-hidden">
              {/* Premium shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-[1.25]">
                    Notre Entreprise
                  </h2>
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-emerald-400 mb-6 leading-[1.3]">
                    Au cœur de Genève, pour un avenir plus propre
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  <div>
                    <p className="text-base md:text-lg text-gray-300 leading-[1.7] mb-8">
                      Notre entreprise, basée à Genève, se consacre à offrir des services de nettoyage respectueux à la fois de ses clients et de l'environnement. Fondée dans le but de créer un environnement plus propre, notre mission va au-delà du nettoyage : nous prenons part à la construction d'un avenir durable.
                    </p>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white leading-[1.3]">Notre Vision</h4>
                    </div>
                    <p className="text-base text-gray-400 leading-[1.7] mb-6">
                      Devenir un leader dans la fourniture de solutions de nettoyage innovantes et durables à Genève et dans ses environs.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white leading-[1.3]">Notre Mission</h4>
                    </div>
                    <p className="text-base text-gray-400 leading-[1.7] mb-6">
                      Fournir à nos clients des services de nettoyage fiables et de qualité tout en adoptant un modèle d'affaires respectueux de la nature, contribuant ainsi à la société et à l'environnement.
                    </p>
                    <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-lg p-6 border border-emerald-500/30">
                      <p className="text-base md:text-lg text-white font-semibold text-center leading-[1.7]">
                        Ensemble, bâtissons un environnement plus propre et plus fort!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
