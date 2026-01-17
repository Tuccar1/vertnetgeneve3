'use client'

import { motion } from 'framer-motion'
import { Shield, Users, Scale, Leaf, CheckCircle, FileText, HelpCircle, Sparkles, Lock } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const engagements = [
  {
    icon: Shield,
    title: 'Sécurité et Formation du Personnel',
    description: 'Notre priorité absolue : la sécurité de nos équipes',
    items: [
      'Formation complète Santé et Sécurité au Travail (SST) selon la Loi sur le travail',
      'Instructions détaillées pour l\'utilisation sûre des produits écologiques',
      'Équipes spécialisées et certifiées pour le travail en hauteur (jusqu\'à 60 mètres)',
      'Fourniture systématique d\'Équipements de Protection Individuelle (EPI)',
    ],
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-400',
  },
  {
    icon: Scale,
    title: 'Conformité Sociale et Administrative',
    description: 'Transparence et respect total des obligations légales',
    items: [
      'Personnel déclaré et assuré auprès des assurances sociales suisses',
      'Zéro tolérance pour le travail non déclaré',
      'Assurance Responsabilité Civile Professionnelle complète',
      'Conformité avec les directives du SECO',
    ],
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-400',
  },
  {
    icon: Leaf,
    title: 'Engagement Environnemental',
    description: 'Notre vision de la sécurité inclut la protection de l\'environnement',
    items: [
      'Produits écologiques certifiés (Éco-label européen)',
      'Gestion responsable des déchets et recyclage',
      'Équipements éco-efficients pour minimiser la consommation',
      'Pratiques durables et respectueuses de l\'environnement',
    ],
    color: 'text-accent-600',
    bgColor: 'bg-accent-50',
    borderColor: 'border-accent-400',
  },
]

const garanties = [
  {
    icon: Shield,
    title: 'Sécurité des Personnes',
    description: 'Personnel formé, EPI fournis, procédures SST',
    benefit: 'Interventions sans risque, protection de tous',
  },
  {
    icon: Scale,
    title: 'Conformité Légale',
    description: 'Déclaration SECO, assurances sociales, pas de travail au noir',
    benefit: 'Tranquillité d\'esprit totale, aucun risque juridique',
  },
  {
    icon: FileText,
    title: 'Assurance RC Pro',
    description: 'Couverture complète pour dommages matériels',
    benefit: 'Votre patrimoine est protégé',
  },
  {
    icon: Leaf,
    title: 'Pratiques Durables',
    description: 'Produits écolabellisés, gestion des déchets',
    benefit: 'Environnement sain et respecté',
  },
  {
    icon: CheckCircle,
    title: 'Transparence',
    description: 'Documents et attestations fournis sur demande',
    benefit: 'Relation de confiance claire et professionnelle',
  },
]

const faqs = [
  {
    question: 'Comment garantissez-vous la sécurité lors du nettoyage de grandes hauteurs ?',
    answer: 'Nos interventions à plus de 3 mètres sont exclusivement réalisées par des techniciens certifiés utilisant un équipement de levage adapté et conforme (plateformes élévatrices, harnais). Un plan de sécurité est établi pour chaque chantier.',
  },
  {
    question: 'Suis-je, en tant que client, responsable de la déclaration de votre personnel ?',
    answer: 'Non, absolument pas. En faisant appel à notre entreprise, c\'est nous, en tant qu\'employeur, qui assumons l\'ensemble des obligations légales et sociales (déclaration, assurances, salaires). Vous n\'avez aucune démarche à effectuer.',
  },
  {
    question: 'Puis-je consulter vos attestations d\'assurance ?',
    answer: 'Oui, bien sûr. Nous pouvons vous transmettre nos certificats d\'assurance responsabilité civile professionnelle et notre attestation de conformité aux normes de sécurité sur simple demande.',
  },
  {
    question: 'Utilisez-vous des produits dangereux ?',
    answer: 'Non. Notre charte écologique nous engage à utiliser des produits non-toxiques, biodégradables et porteurs d\'écolabels. Ils sont efficaces sans mettre en danger la santé des occupants ou de nos équipes.',
  },
]

export default function ReglementSecurite() {
  return (
    <div className="w-full relative">
      {/* Sabit arka plan fotoğraf - Tüm sayfada sabit kalacak */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/nature-4k-pc-full-hd-wallpaper-preview.jpg"
          alt="Règlement et Sécurité - Conformité légale et sécurité du personnel - Vertnetgeneve Genève"
          fill
          className="object-cover object-center scale-105"
          style={{
            filter: 'brightness(1.3) contrast(1.1) saturate(1.1)',
          }}
          quality={85}
          priority
          sizes="100vw"
        />
      </div>
      {/* Koyu overlay - yazıların okunabilirliği için */}
      <div className="fixed inset-0 bg-black/40 -z-10" />
      
      {/* Hero Section - Header'a yakın, boşluk yok */}
      <section className="relative pt-20 sm:pt-24 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <motion.div 
            className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
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
              className="flex justify-center gap-3 sm:gap-4 mb-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30"
                animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
            </motion.div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white mb-3 sm:mb-4 px-2" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
              Règlement & Sécurité
            </h1>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 rounded-full mx-auto mb-4 sm:mb-6 max-w-xs"
            />
            <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed px-4" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.4)' }}>
              Conformité légale complète et engagement sans faille pour la sécurité
            </p>
          </motion.div>
        </div>
      </section>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
      {/* Introduction */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
                Conformité Légale Complète
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                Chez Vertnetgeneve, nous opérons en stricte conformité avec le cadre légal suisse, particulièrement concernant les réglementations de sécurité au travail et les directives du Secrétariat d'État à l'économie (SECO).
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Choisir nos services, c'est opter pour la sérénité, la professionnalisation et le respect des personnes et de la loi.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engagements */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 drop-shadow-lg px-2">
              Nos Engagements Réglementaires
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {engagements.map((engagement, index) => {
              const IconComponent = engagement.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group"
                >
                  {/* Glow Effect */}
                  <motion.div 
                    className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 rounded-3xl blur-md"
                    initial={{ opacity: 0.3 }}
                    whileHover={{ opacity: 0.6 }}
                  />
                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-200 shadow-xl h-full">
                    <motion.div 
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-emerald-500/20"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    >
                      {/* @ts-ignore */}
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                      {engagement.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 font-semibold mb-4 sm:mb-6">
                      {engagement.description}
                    </p>
                    <ul className="space-y-3">
                      {engagement.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Garanties Table */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-8 sm:mb-12 text-center drop-shadow-lg px-2">
              Vos Garanties en un Coup d'Œil
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {garanties.map((garantie, index) => {
                const IconComponent = garantie.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="relative group"
                  >
                    <motion.div 
                      className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 rounded-2xl blur-md"
                      initial={{ opacity: 0.2 }}
                      whileHover={{ opacity: 0.5 }}
                    />
                    <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-xl h-full">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                      {/* @ts-ignore */}
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">{garantie.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3 text-xs sm:text-sm">{garantie.description}</p>
                    <div className="bg-emerald-50 rounded-lg p-2 sm:p-3">
                      <p className="text-emerald-700 font-semibold text-xs sm:text-sm">
                        {garantie.benefit}
                      </p>
                    </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-2 sm:space-x-3 mb-8 sm:mb-12 px-2">
              {/* @ts-ignore */}
              <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 flex-shrink-0" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white drop-shadow-lg">
                Questions Fréquentes
              </h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200"
                >
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 flex items-start">
                    <span className="text-emerald-600 mr-2 flex-shrink-0">Q:</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-5 sm:pl-6">
                    <span className="text-teal-600 font-semibold">R:</span> {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white relative overflow-hidden">
        {/* Dekoratif efektler */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-teal-500 rounded-full blur-3xl"
            animate={{ scale: [1.3, 1, 1.3], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Travaillons en Toute Confiance
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Vous avez une question spécifique concernant nos procédures de sécurité ou notre conformité ?
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-base sm:text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-xl border border-emerald-400/30"
              >
                Contactez-nous dès aujourd'hui
                {/* @ts-ignore */}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  )
}

