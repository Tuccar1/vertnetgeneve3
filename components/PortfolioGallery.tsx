'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Star, Award, Images } from 'lucide-react'

interface PortfolioItem {
  id: number
  title: string
  category: string
  image: string
  description: string
  beforeAfter?: {
    before: string
    after: string
  }
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Nettoyage de Bureaux',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    description: 'Nettoyage complet d\'un espace de bureaux de 500m²',
  },
  {
    id: 2,
    title: 'Fin de Bail',
    category: 'Résidentiel',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    description: 'Préparation complète d\'un appartement pour fin de bail',
  },
  {
    id: 3,
    title: 'Nettoyage de Vitres',
    category: 'Spécialisé',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    description: 'Nettoyage de vitres jusqu\'à 40 mètres de hauteur',
  },
  {
    id: 4,
    title: 'Nettoyage de Canapés',
    category: 'Résidentiel',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    description: 'Nettoyage professionnel de canapés en cuir',
  },
  {
    id: 5,
    title: 'Nettoyage de Façade',
    category: 'Spécialisé',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    description: 'Nettoyage complet d\'une façade de bâtiment',
  },
  {
    id: 6,
    title: 'Fin de Chantier',
    category: 'Résidentiel',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
    description: 'Nettoyage après travaux de rénovation',
  },
  {
    id: 7,
    title: 'Nettoyage de Toiture',
    category: 'Spécialisé',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    description: 'Nettoyage professionnel de toiture jusqu\'à 60 mètres',
  },
]

export default function PortfolioGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const categories = ['Tous', ...Array.from(new Set(portfolioItems.map((item) => item.category)))]

  const filteredItems =
    selectedCategory === 'Tous'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory)

  const openModal = (item: PortfolioItem, index: number) => {
    setSelectedItem(item)
    setCurrentIndex(index)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  const nextItem = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length
    setCurrentIndex(nextIndex)
    setSelectedItem(filteredItems[nextIndex])
  }

  const prevItem = () => {
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setCurrentIndex(prevIndex)
    setSelectedItem(filteredItems[prevIndex])
  }

  return (
    <div className="w-full">
      {/* Hero Section - Header'a yakın, boşluk yok */}
      <section className="relative pt-20 sm:pt-24 pb-12 md:pb-16 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 overflow-hidden">
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
                <Images className="w-6 h-6 text-white" />
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
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4">
              Portfolio
            </h1>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full mx-auto mb-6 max-w-xs"
            />
            <p className="text-xl md:text-2xl text-gray-700">
              Découvrez nos réalisations et témoignages clients
            </p>
          </motion.div>
        </div>
      </section>
      
      <div className="max-w-6xl mx-auto px-4">
      {/* Category Filter */}
      <section className="py-8 bg-white border-b-2 border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => openModal(item, index)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                {/* @ts-ignore */}
                <X className="w-6 h-6 text-gray-900" />
              </button>

              <button
                onClick={prevItem}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                {/* @ts-ignore */}
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>

              <button
                onClick={nextItem}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                {/* @ts-ignore */}
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>

              <div className="relative h-96">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <span className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full mb-4 inline-block">
                  {selectedItem.category}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedItem.title}</h2>
                <p className="text-lg text-gray-700">{selectedItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}

