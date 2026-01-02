'use client'

import { MapPin, Phone, Mail, Globe, MessageCircle, Clock } from 'lucide-react'

export default function Contact() {
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
      content: '+41 77 215 22 55',
      link: 'tel:+41772152255',
      color: 'text-secondary-600',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@genevenettoyage.ch',
      link: 'mailto:info@genevenettoyage.ch',
      color: 'text-primary-600',
    },
    {
      icon: Globe,
      title: 'Website',
      content: 'www.genevenettoyage.ch',
      link: 'https://www.genevenettoyage.ch',
      color: 'text-secondary-600',
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
      color: 'text-secondary-600',
    },
  ]

  return (
    <section id="contact" className="py-20 bg-[#f8f9fa] text-gray-900 w-full overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-[1.25] text-gray-900">
              Contactez-Nous
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-[1.7]">
              Obtenez un devis gratuit et personnalisé
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-8 leading-[1.3] text-gray-900">Informations de Contact</h3>
              <div className="space-y-4">
                {contactItems.map((item, index) => {
                  const IconComponent = item.icon
                  const content = (
                    <div className="flex items-start bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className={`${item.color} mr-4 flex-shrink-0`}>
                        {/* @ts-ignore */}
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1 text-base leading-[1.5] text-gray-900">{item.title}</h4>
                        {item.link ? (
                          <a
                            href={item.link}
                            target={item.link.startsWith('http') ? '_blank' : undefined}
                            rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-gray-600 hover:text-primary-600 transition text-base leading-[1.7]"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-600 text-base leading-[1.7]">{item.content}</p>
                        )}
                        {item.subContent && (
                          <p className="text-gray-500 text-sm mt-1 leading-[1.5]">{item.subContent}</p>
                        )}
                      </div>
                    </div>
                  )
                  return <div key={index}>{content}</div>
                })}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-8 leading-[1.3] text-gray-900">Demander un Devis</h3>
              <form className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Nom complet"
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base leading-[1.5]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base leading-[1.5]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base leading-[1.5]"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none text-base leading-[1.7]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg hover:shadow-xl text-base leading-[1.5]"
                >
                  Envoyer la Demande
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

