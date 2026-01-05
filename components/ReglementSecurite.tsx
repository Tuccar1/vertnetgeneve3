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
      <div className="fixed inset-0 z-0">
        <Image
          src="/2-750x510.jpg"
          alt="Cleaning background"
          fill
          className="object-cover"
          style={{
            objectPosition: 'center center',
          }}
          quality={95}
          priority={false}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/20 to-white/25"></div>
      </div>
      
      {/* Hero Section - Header'a yakın, boşluk yok */}
      <section className="relative pt-20 sm:pt-24 pb-12 md:pb-16 bg-gradient-to-br from-primary-50/50 via-secondary-50/50 to-accent-50/50 backdrop-blur-[1px] overflow-hidden z-10">
        <div className="absolute inset-0 opacity-10">
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
                <Lock className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <CheckCircle className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4">
              Règlement & Sécurité
            </h1>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full mx-auto mb-6 max-w-xs"
            />
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Conformité légale complète et engagement sans faille pour la sécurité
            </p>
          </motion.div>
        </div>
      </section>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
      {/* Introduction */}
      <section className="py-16 bg-white/60 backdrop-blur-[2px]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary-50/80 to-secondary-50/80 rounded-3xl p-10">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                Conformité Légale Complète
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Chez Vertnetgeneve, nous opérons en stricte conformité avec le cadre légal suisse, particulièrement concernant les réglementations de sécurité au travail et les directives du Secrétariat d'État à l'économie (SECO).
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Choisir nos services, c'est opter pour la sérénité, la professionnalisation et le respect des personnes et de la loi.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engagements */}
      <section className="py-16 bg-gradient-to-br from-primary-50/60 via-secondary-50/60 to-accent-50/60 backdrop-blur-[2px] relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Nos Engagements Réglementaires
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {engagements.map((engagement, index) => {
              const IconComponent = engagement.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className={`relative ${engagement.bgColor}/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg h-full`}>
                    <div className={`w-16 h-16 rounded-xl ${engagement.bgColor} flex items-center justify-center mb-6`}>
                      {/* @ts-ignore */}
                      <IconComponent className={`w-8 h-8 ${engagement.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {engagement.title}
                    </h3>
                    <p className="text-gray-700 font-semibold mb-6">
                      {engagement.description}
                    </p>
                    <ul className="space-y-3">
                      {engagement.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full ${engagement.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`}></div>
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
      <section className="py-16 bg-white/60 backdrop-blur-[2px] relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
              Vos Garanties en un Coup d'Œil
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {garanties.map((garantie, index) => {
                const IconComponent = garantie.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-primary-50/80 via-secondary-50/80 to-accent-50/80 backdrop-blur-sm rounded-2xl p-6 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      {/* @ts-ignore */}
                      <IconComponent className="w-6 h-6 text-primary-600" />
                      <h3 className="text-xl font-bold text-gray-900">{garantie.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm">{garantie.description}</p>
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="text-primary-700 font-semibold text-sm">
                        {garantie.benefit}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50/60 via-secondary-50/60 to-accent-50/60 backdrop-blur-[2px] relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-3 mb-12">
              {/* @ts-ignore */}
              <HelpCircle className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                Questions Fréquentes
              </h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                    <span className="text-primary-600 mr-2">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed pl-6">
                    <span className="text-secondary-600 font-semibold">R:</span> {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600/75 via-secondary-600/75 to-accent-600/75 backdrop-blur-[2px] text-white relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Travaillons en Toute Confiance
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Vous avez une question spécifique concernant nos procédures de sécurité ou notre conformité ?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:scale-105"
            >
              Contactez-nous dès aujourd'hui
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

