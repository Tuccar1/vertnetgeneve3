'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  // Sadece bu fotoğraf - Eldivenli El Cam Temizliği
  const heroImage = { url: '/cleaning-4.webp', name: 'Eldivenli El Cam Temizliği' }
  
  // 20 TAMAMEN YENİ kaliteli Nettoyage (Temizlik İşletmesi) fotoğrafı - Farklı kaynaklar ve farklı ID'ler
  const cleaningImages = [
    // Yerel Yüklenen Fotoğraflar (İlk 4) - Public klasöründeki dosyalar
    { url: '/cleaning-1.avif', name: '1. Temizlik Malzemeleri ile Kız' },
    { url: '/cleaning-2.jpg', name: '2. Temizlik Görseli' },
    { url: '/cleaning-3.jpg', name: '3. Profesyonel Temizlik' },
    { url: '/cleaning-4.webp', name: '4. Eldivenli El Cam Temizliği' },
    
    // Unsplash - Window Cleaning & Professional Services (FARKLI ID'ler)
    { url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', name: '5. Cam Temizlikçi - Bina Dışı' },
    { url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', name: '6. Yüksek Bina Cam Temizliği' },
    { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', name: '7. Cam Temizlik Ekipmanı' },
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', name: '8. Profesyonel Cam Temizlikçi' },
    { url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', name: '9. Temizlik Malzemeleri' },
    { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', name: '10. Bina Dışı Temizlik' },
    { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', name: '11. Yüksek Bina Cam Temizliği 2' },
    
    // Pexels - Professional Cleaning Service (FARKLI ID'ler)
    { url: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=2000&h=2000&fit=crop', name: '12. Profesyonel Temizlik Ekibi' },
    { url: 'https://images.pexels.com/photos/3807278/pexels-photo-3807278.jpeg?auto=compress&cs=tinysrgb&w=2000&h=2000&fit=crop', name: '13. Ofis Temizliği Hizmeti' },
    { url: 'https://images.pexels.com/photos/3807279/pexels-photo-3807279.jpeg?auto=compress&cs=tinysrgb&w=2000&h=2000&fit=crop', name: '14. Ticari Temizlik' },
    { url: 'https://images.pexels.com/photos/3807280/pexels-photo-3807280.jpeg?auto=compress&cs=tinysrgb&w=2000&h=2000&fit=crop', name: '15. Temizlik Personeli Çalışıyor' },
    { url: 'https://images.pexels.com/photos/3807281/pexels-photo-3807281.jpeg?auto=compress&cs=tinysrgb&w=2000&h=2000&fit=crop', name: '16. Büro Temizliği Ekibi' },
    
    // Pixabay - Cleaning Services (FARKLI ID'ler)
    { url: 'https://cdn.pixabay.com/photo/2016/11/18/17/20/cleaning-1836413_1280.jpg', name: '17. Ev Temizliği Hizmeti' },
    { url: 'https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg', name: '18. İç Mekan Temizlik' },
    { url: 'https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849825_1280.jpg', name: '19. Konut Temizliği' },
    { url: 'https://cdn.pixabay.com/photo/2014/12/10/20/56/medical-563427_1280.jpg', name: '20. Dezenfeksiyon Hizmeti' },
  ]
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }


  return (
    <section
      id="accueil"
      className="relative min-h-[132vh] flex items-center justify-center overflow-hidden pt-28 w-full overflow-x-hidden"
    >
      {/* Background Image - Seçilen görsel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient overlay - sadece alt kısımda, sol tarafta yok */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30 z-10"></div>
        
        {/* Profesyonel temizlik görseli - Hero section boyutunda, daha görünür */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={heroImage.url}
            alt={heroImage.name}
            fill
            className="object-cover object-center"
            style={{
              objectPosition: 'center',
              width: '100%',
              height: '100%',
              opacity: 0.65,
              filter: 'brightness(1.1) contrast(1.15) saturate(1.2)',
            }}
            priority
            quality={95}
            unoptimized
          />
        </div>
        
        {/* Ek dekoratif element */}
        <div className="absolute bottom-20 right-10 md:right-20 lg:right-32 w-32 h-32 md:w-40 md:h-40 opacity-20 z-5">
          <div className="w-full h-full bg-gradient-to-br from-primary-300/30 to-primary-500/20 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gray-100 rounded-full text-gray-700 text-xs sm:text-sm md:text-base font-bold mb-6 sm:mb-8 md:mb-10 border border-gray-200">
              Excellence en Nettoyage Professionnel
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-gray-900 mb-6 sm:mb-8 leading-[1.2] tracking-tight"
          >
            Votre Partenaire de{' '}
            <span className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 bg-clip-text text-transparent">
              Confiance
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 sm:mb-10 md:mb-12 leading-[1.7] max-w-3xl mx-auto font-medium px-4"
          >
            Services de nettoyage professionnel de qualité supérieure pour les
            entreprises et particuliers à Genève. Disponible 24h/24 et 7j/7.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-7 justify-center mb-12 sm:mb-16 md:mb-20 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link href="/booking" prefetch={true} className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white rounded-lg font-semibold text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-gray-500/50 overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Demander un Devis
                  {/* @ts-ignore */}
                  <ArrowRight className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/services"
                prefetch={true}
                className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white rounded-lg font-semibold text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-gray-500/50 overflow-hidden"
              >
                <span className="relative z-10">Nos Services</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
