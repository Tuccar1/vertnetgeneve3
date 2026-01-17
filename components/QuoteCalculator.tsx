'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Building2, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  X,
  Check,
  Ruler,
  Users,
  Leaf,
  Zap,
  Calculator,
  FileText
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ServiceType {
  id: string
  name: string
  icon: LucideIcon
  baseRate: number // CHF per m²
  minCharge: number // Minimum CHF
  description: string
}

interface AddOn {
  id: string
  name: string
  price: number
  icon: LucideIcon
}

export default function QuoteCalculator() {
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [squareMeters, setSquareMeters] = useState(50)
  const [selectedService, setSelectedService] = useState<string>('')
  const [frequency, setFrequency] = useState<string>('')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [propertyType, setPropertyType] = useState<string>('')
  const [condition, setCondition] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    neighborhood: '',
    preferredDate: '',
    preferredTime: '',
    instructions: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [quoteId, setQuoteId] = useState('')
  const [minDate, setMinDate] = useState('')

  useEffect(() => {
    setMounted(true)
    setMinDate(new Date().toISOString().split('T')[0])
  }, [])

  const serviceTypes: ServiceType[] = [
    {
      id: 'regular',
      name: 'Nettoyage Régulier',
      icon: Home,
      baseRate: 0.8,
      minCharge: 80,
      description: 'Nettoyage standard hebdomadaire ou mensuel'
    },
    {
      id: 'deep',
      name: 'Nettoyage Approfondi',
      icon: Sparkles,
      baseRate: 1.2,
      minCharge: 120,
      description: 'Nettoyage complet et détaillé'
    },
    {
      id: 'move',
      name: 'Déménagement',
      icon: Building2,
      baseRate: 1.5,
      minCharge: 150,
      description: 'Avant ou après déménagement'
    },
    {
      id: 'office',
      name: 'Bureaux',
      icon: Building2,
      baseRate: 1.0,
      minCharge: 100,
      description: 'Nettoyage professionnel de bureaux'
    },
    {
      id: 'construction',
      name: 'Fin de Chantier',
      icon: Building2,
      baseRate: 2.0,
      minCharge: 200,
      description: 'Nettoyage après travaux'
    },
    {
      id: 'windows',
      name: 'Vitres',
      icon: Sparkles,
      baseRate: 1.5,
      minCharge: 80,
      description: 'Nettoyage de vitres professionnel'
    },
    {
      id: 'carpet',
      name: 'Tapis',
      icon: Home,
      baseRate: 2.5,
      minCharge: 150,
      description: 'Nettoyage de tapis et moquettes'
    },
    {
      id: 'specialized',
      name: 'Services Spécialisés',
      icon: Sparkles,
      baseRate: 1.8,
      minCharge: 180,
      description: 'Services sur mesure'
    },
  ]

  const frequencyOptions = [
    { id: 'weekly', name: 'Hebdomadaire', discount: 0.15 },
    { id: 'biweekly', name: 'Bi-mensuel', discount: 0.10 },
    { id: 'monthly', name: 'Mensuel', discount: 0.05 },
    { id: 'onetime', name: 'Unique', discount: 0 },
  ]

  const addOns: AddOn[] = [
    { id: 'windows-inside', name: 'Vitres Intérieures', price: 30, icon: Sparkles },
    { id: 'oven', name: 'Four', price: 50, icon: Home },
    { id: 'refrigerator', name: 'Réfrigérateur', price: 40, icon: Home },
    { id: 'balcony', name: 'Balcon/Terrasse', price: 35, icon: Home },
    { id: 'wardrobe', name: 'Organisation Placard', price: 45, icon: Users },
    { id: 'eco', name: 'Produits Écologiques', price: 20, icon: Leaf },
    { id: 'priority', name: 'Service Prioritaire', price: 50, icon: Zap },
  ]

  const genevaNeighborhoods = [
    'Centre-Ville', 'Eaux-Vives', 'Plainpalais', 'Carouge', 'Champel',
    'Cologny', 'Vernier', 'Lancy', 'Onex', 'Plan-les-Ouates', 'Meyrin',
    'Grand-Saconnex', 'Petit-Saconnex', 'Pâquis', 'Jonction', 'Autre'
  ]

  // Calculate price
  const calculatePrice = () => {
    if (!selectedService) return 0

    const service = serviceTypes.find(s => s.id === selectedService)
    if (!service) return 0

    // Base calculation
    let basePrice = squareMeters * service.baseRate
    if (basePrice < service.minCharge) {
      basePrice = service.minCharge
    }

    // Size discount
    let sizeDiscount = 0
    if (squareMeters > 150) {
      sizeDiscount = basePrice * 0.10
    } else if (squareMeters > 100) {
      sizeDiscount = basePrice * 0.05
    }

    // Frequency discount
    const freqOption = frequencyOptions.find(f => f.id === frequency)
    const freqDiscount = freqOption ? basePrice * freqOption.discount : 0

    // Condition adjustment
    let conditionMultiplier = 1
    if (condition === 'messy') {
      conditionMultiplier = 1.2
    } else if (condition === 'very-messy') {
      conditionMultiplier = 1.5
    }

    // Add-ons
    const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId)
      return sum + (addOn?.price || 0)
    }, 0)

    // Final calculation
    const adjustedPrice = (basePrice * conditionMultiplier) - sizeDiscount - freqDiscount
    const finalPrice = adjustedPrice + addOnsTotal

    return Math.round(finalPrice)
  }

  const calculateTime = () => {
    if (!selectedService) return 0
    const baseTime = Math.ceil(squareMeters / 20) // ~20 m² per hour
    const addOnsTime = selectedAddOns.length * 0.5
    return Math.ceil(baseTime + addOnsTime)
  }

  const totalPrice = calculatePrice()
  const estimatedTime = calculateTime()

  const canProceedToStep2 = selectedService && squareMeters > 0
  const canProceedToStep3 = frequency && propertyType && condition
  const canSubmit = formData.name && formData.email && formData.phone && formData.address

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const quoteData = {
      quoteId: `QT-${Date.now()}`,
      squareMeters,
      selectedService: serviceTypes.find(s => s.id === selectedService),
      frequency,
      selectedAddOns: addOns.filter(a => selectedAddOns.includes(a.id)),
      propertyType,
      condition,
      formData,
      totalPrice,
      estimatedTime,
      timestamp: new Date().toISOString(),
    }

    setQuoteId(quoteData.quoteId)

    try {
      setSubmitted(true)
    } catch (error) {
      // Error handling
    }
  }

  return (
    <div className="w-full bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      {/* Hero Section - Header'a yakın, boşluk yok */}
      <section className="relative pt-20 sm:pt-24 pb-8 md:pb-12 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
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
                <Calculator className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center shadow-lg"
                animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <FileText className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Calculateur de Devis
            </h1>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full mx-auto mb-4 max-w-xs"
            />
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Obtenez une estimation instantanée et personnalisée pour vos services de nettoyage à Genève
            </p>
          </motion.div>
        </div>
      </section>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Progress Indicator */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 ${
                    currentStep >= step
                      ? 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={`w-8 sm:w-16 h-1 mx-2 transition-all duration-300 ${
                      currentStep > step ? 'bg-gradient-to-r from-primary-500 to-secondary-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-8 sm:space-x-16">
            <span className={`text-xs sm:text-sm font-semibold ${currentStep === 1 ? 'text-primary-600' : 'text-gray-500'}`}>
              Services
            </span>
            <span className={`text-xs sm:text-sm font-semibold ${currentStep === 2 ? 'text-primary-600' : 'text-gray-500'}`}>
              Options
            </span>
            <span className={`text-xs sm:text-sm font-semibold ${currentStep === 3 ? 'text-primary-600' : 'text-gray-500'}`}>
              Contact
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Sélectionnez votre service
                  </h2>

                  {/* Square Meters */}
                  <div className="mb-8">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-4 flex items-center">
                      <Ruler className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-600" />
                      Superficie (m²)
                    </label>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="1"
                        max="10000"
                        value={squareMeters}
                        onChange={(e) => setSquareMeters(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-500">1 m²</span>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="1"
                            value={squareMeters}
                            onChange={(e) => setSquareMeters(Math.max(1, Number(e.target.value) || 1))}
                            className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-center font-bold text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <span className="text-sm sm:text-base font-semibold text-gray-700">m²</span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">10,000+ m²</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Types - Horizontal Scroll */}
                  <div className="mb-8">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-4">
                      Type de service
                    </label>
                    <div className="overflow-x-auto pb-4 -mx-2 px-2">
                      <div className="flex space-x-4 min-w-max">
                        {serviceTypes.map((service) => {
                          const Icon = service.icon
                          const isSelected = selectedService === service.id
                          return (
                            <motion.button
                              key={service.id}
                              type="button"
                              onClick={() => setSelectedService(service.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex-shrink-0 w-48 sm:w-56 p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${
                                isSelected
                                  ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-secondary-50 shadow-lg'
                                  : 'border-gray-200 bg-white hover:border-primary-300'
                              }`}
                            >
                              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-3 ${
                                isSelected
                                  ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                              </div>
                              <h3 className={`font-bold text-sm sm:text-base mb-1 ${isSelected ? 'text-primary-600' : 'text-gray-900'}`}>
                                {service.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2">{service.description}</p>
                              <div className="mt-2 text-xs sm:text-sm font-semibold text-primary-600">
                                À partir de {service.minCharge} CHF
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                                >
                                  <Check className="w-4 h-4 text-white" />
                                </motion.div>
                              )}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      onClick={handleNext}
                      disabled={!canProceedToStep2}
                      whileHover={{ scale: canProceedToStep2 ? 1.05 : 1 }}
                      whileTap={{ scale: canProceedToStep2 ? 0.95 : 1 }}
                      className={`px-6 py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center space-x-2 ${
                        canProceedToStep2
                          ? 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <span>Suivant</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Options */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Options et préférences
                  </h2>

                  {/* Frequency */}
                  <div className="mb-8">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-4 flex items-center">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-600" />
                      Fréquence
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      {frequencyOptions.map((freq) => (
                        <motion.button
                          key={freq.id}
                          type="button"
                          onClick={() => setFrequency(freq.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            frequency === freq.id
                              ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-secondary-50 shadow-lg'
                              : 'border-gray-200 bg-white hover:border-primary-300'
                          }`}
                        >
                          <div className={`font-bold text-sm sm:text-base mb-1 ${frequency === freq.id ? 'text-primary-600' : 'text-gray-900'}`}>
                            {freq.name}
                          </div>
                          {freq.discount > 0 && (
                            <div className="text-xs text-green-600 font-semibold">
                              -{freq.discount * 100}% de réduction
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="mb-8">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-4">
                      Type de propriété
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                      {['Appartement', 'Maison', 'Bureau', 'Fabrique', 'Construction', 'Autre'].map((type) => (
                        <motion.button
                          key={type}
                          type="button"
                          onClick={() => setPropertyType(type)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            propertyType === type
                              ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-secondary-50 shadow-lg'
                              : 'border-gray-200 bg-white hover:border-primary-300'
                          }`}
                        >
                          <span className={`font-semibold text-sm sm:text-base ${propertyType === type ? 'text-primary-600' : 'text-gray-900'}`}>
                            {type}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Condition */}
                  <div className="mb-8">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-4">
                      État actuel
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      {[
                        { id: 'normal', name: 'Normal', desc: 'État standard' },
                        { id: 'messy', name: 'Désordonné', desc: '+20% supplément' },
                        { id: 'very-messy', name: 'Très désordonné', desc: '+50% supplément' },
                      ].map((cond) => (
                        <motion.button
                          key={cond.id}
                          type="button"
                          onClick={() => setCondition(cond.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            condition === cond.id
                              ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-secondary-50 shadow-lg'
                              : 'border-gray-200 bg-white hover:border-primary-300'
                          }`}
                        >
                          <div className={`font-bold text-sm sm:text-base mb-1 ${condition === cond.id ? 'text-primary-600' : 'text-gray-900'}`}>
                            {cond.name}
                          </div>
                          <div className="text-xs text-gray-600">{cond.desc}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="mb-8">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-4">
                      Services supplémentaires
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {addOns.map((addOn) => {
                        const Icon = addOn.icon
                        const isSelected = selectedAddOns.includes(addOn.id)
                        return (
                          <motion.button
                            key={addOn.id}
                            type="button"
                            onClick={() => toggleAddOn(addOn.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                              isSelected
                                ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-secondary-50 shadow-lg'
                                : 'border-gray-200 bg-white hover:border-primary-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isSelected
                                  ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              {isSelected && (
                                <CheckCircle className="w-5 h-5 text-primary-500" />
                              )}
                            </div>
                            <div className={`font-semibold text-sm sm:text-base mb-1 ${isSelected ? 'text-primary-600' : 'text-gray-900'}`}>
                              {addOn.name}
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-primary-600">
                              +{addOn.price} CHF
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      onClick={handleBack}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center space-x-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Retour</span>
                    </motion.button>
                    <motion.button
                      onClick={handleNext}
                      disabled={!canProceedToStep3}
                      whileHover={{ scale: canProceedToStep3 ? 1.05 : 1 }}
                      whileTap={{ scale: canProceedToStep3 ? 0.95 : 1 }}
                      className={`px-6 py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center space-x-2 ${
                        canProceedToStep3
                          ? 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <span>Suivant</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact Form */}
              {currentStep === 3 && (
                <motion.form
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Vos coordonnées
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Quartier (Genève)
                      </label>
                      <select
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Sélectionnez un quartier</option>
                        {genevaNeighborhoods.map((neighborhood) => (
                          <option key={neighborhood} value={neighborhood}>
                            {neighborhood}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Adresse complète *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                        Date préférée
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        min={minDate}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-primary-600" />
                        Heure préférée
                      </label>
                      <input
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Instructions spéciales
                    </label>
                    <textarea
                      rows={4}
                      value={formData.instructions}
                      onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder="Décrivez vos besoins spécifiques..."
                    />
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      type="button"
                      onClick={handleBack}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center space-x-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Retour</span>
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={!canSubmit || submitted}
                      whileHover={{ scale: canSubmit && !submitted ? 1.05 : 1 }}
                      whileTap={{ scale: canSubmit && !submitted ? 0.95 : 1 }}
                      className={`px-6 py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center space-x-2 ${
                        canSubmit && !submitted
                          ? 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {submitted ? (
                        <>
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Envoyé!</span>
                        </>
                      ) : (
                        <>
                          <span>Envoyer la demande</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 sticky top-32"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Résumé du devis
              </h3>

              {selectedService ? (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-semibold text-gray-900">
                        {serviceTypes.find(s => s.id === selectedService)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Superficie:</span>
                      <span className="font-semibold text-gray-900">{squareMeters} m²</span>
                    </div>
                    {frequency && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Fréquence:</span>
                        <span className="font-semibold text-gray-900">
                          {frequencyOptions.find(f => f.id === frequency)?.name}
                        </span>
                      </div>
                    )}
                    {selectedAddOns.length > 0 && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="text-xs font-semibold text-gray-600 mb-2">Services supplémentaires:</div>
                        {selectedAddOns.map((addOnId) => {
                          const addOn = addOns.find(a => a.id === addOnId)
                          return addOn ? (
                            <div key={addOnId} className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">{addOn.name}</span>
                              <span className="font-semibold text-gray-900">+{addOn.price} CHF</span>
                            </div>
                          ) : null
                        })}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t-2 border-primary-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold text-gray-900">Total estimé:</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        {totalPrice} CHF
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Temps estimé: {estimatedTime} heures</span>
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                      * Estimation basée sur vos sélections. Le prix final peut varier après inspection.
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">Sélectionnez un service pour voir l'estimation</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setSubmitted(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Devis envoyé avec succès!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Votre demande de devis a été envoyée. Nous vous contacterons sous peu.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="text-sm text-gray-600">Numéro de devis:</div>
                    <div className="text-lg font-bold text-primary-600">{quoteId}</div>
                  </div>
                  <motion.button
                    onClick={() => {
                      setSubmitted(false)
                      setCurrentStep(1)
                      setSelectedService('')
                      setSquareMeters(50)
                      setFrequency('')
                      setSelectedAddOns([])
                      setPropertyType('')
                      setCondition('')
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        address: '',
                        neighborhood: '',
                        preferredDate: '',
                        preferredTime: '',
                        instructions: '',
                      })
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white rounded-lg font-semibold"
                  >
                    Nouveau devis
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

