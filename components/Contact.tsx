'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Globe, MessageCircle, Clock, Loader2 } from 'lucide-react'

export default function Contact() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])
  const contactItems = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Genève, Suisse',
      link: null,
      color: 'text-primary-600',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+41 76 621 21 83 / +41 76 531 69 03',
      link: 'tel:+41766212183',
      color: 'text-primary-600',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@vertnetgeneve.ch',
      link: 'mailto:info@vertnetgeneve.ch',
      color: 'text-primary-600',
    },
    {
      icon: Globe,
      title: 'Website',
      content: 'www.vertnetgeneve.ch',
      link: 'https://www.vertnetgeneve.ch',
      color: 'text-primary-600',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: 'Contactez-nous facilement via WhatsApp!',
      link: null,
      color: 'text-primary-600',
    },
    {
      icon: Clock,
      title: 'Disponibilité',
      content: '24h/24 et 7j/7',
      subContent: 'Service Non-Stop',
      link: null,
      color: 'text-primary-600',
    },
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 bg-[#f8f9fa] text-gray-900 w-full">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-[1.25] text-gray-900">
              Contactez-Nous
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-[1.7]">
              Obtenez un devis gratuit et personnalisé
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 leading-[1.3] text-gray-900">Informations de Contact</h3>
              <div className="space-y-2 sm:space-y-3">
                {contactItems.map((item, index) => {
                  const IconComponent = item.icon
                  const content = (
                    <div className="flex items-start bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="text-primary-600 mr-3 flex-shrink-0">
                        {/* @ts-ignore */}
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold mb-1 text-sm leading-[1.5] text-gray-900">{item.title}</div>
                        {item.link ? (
                          <a
                            href={item.link}
                            target={item.link.startsWith('http') ? '_blank' : undefined}
                            rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-gray-600 hover:text-primary-600 transition text-sm leading-[1.7]"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-600 text-sm leading-[1.7]">{item.content}</p>
                        )}
                        {item.subContent && (
                          <p className="text-gray-500 text-xs mt-1 leading-[1.5]">{item.subContent}</p>
                        )}
                      </div>
                    </div>
                  )
                  return <div key={index}>{content}</div>
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 leading-[1.3] text-gray-900">Demander un Devis</h3>
              <form className="space-y-3 sm:space-y-4 md:space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Nom complet"
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm leading-[1.5]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm leading-[1.5]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm leading-[1.5]"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none text-sm leading-[1.7]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition shadow-lg hover:shadow-xl text-sm leading-[1.5]"
                >
                  Envoyer la Demande
                </button>
              </form>
              </div>

              {/* Google Maps */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4 p-4 sm:p-5 md:p-6 pb-0 text-gray-900">Notre Localisation</h3>
                <div className="w-full h-64 sm:h-80 md:h-96 relative bg-gray-100">
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                        <p className="text-sm text-gray-600">Chargement de la carte...</p>
                      </div>
                    </div>
                  )}
                  {mapError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="text-center p-6">
                        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 mb-2">Impossible de charger la carte</p>
                        <a
                          href="https://www.google.com/maps?q=Genève,+Switzerland"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 text-sm font-semibold underline"
                        >
                          Ouvrir dans Google Maps
                        </a>
                      </div>
                    </div>
                  ) : (
                    mapLoaded && (
                      <iframe
                        src="https://www.google.com/maps/embed/v1/place?q=Genève,+Switzerland&zoom=13"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                        title="Localisation Vertnetgeneve - Genève, Suisse"
                        onLoad={() => {
                          setMapLoaded(true)
                          setMapError(false)
                        }}
                        onError={() => {
                          setMapError(true)
                          setMapLoaded(false)
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

