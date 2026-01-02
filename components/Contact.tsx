'use client'

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-[1.25]">
              Contactez-Nous
            </h2>
            <p className="text-base md:text-lg text-blue-100 leading-[1.7]">
              Obtenez un devis gratuit et personnalisé
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-8 leading-[1.3]">Informations de Contact</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-4 flex-shrink-0">📍</div>
                  <div>
                    <h4 className="font-bold mb-2 text-base leading-[1.5]">Adresse</h4>
                    <p className="text-blue-100 text-base leading-[1.7]">Genève, Suisse</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4 flex-shrink-0">📞</div>
                  <div>
                    <h4 className="font-bold mb-2 text-base leading-[1.5]">Téléphone</h4>
                    <a href="tel:+41772152255" className="text-blue-100 hover:text-white transition text-base leading-[1.7]">
                      +41 77 215 22 55
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4 flex-shrink-0">✉️</div>
                  <div>
                    <h4 className="font-bold mb-2 text-base leading-[1.5]">Email</h4>
                    <a href="mailto:info@genevenettoyage.ch" className="text-blue-100 hover:text-white transition text-base leading-[1.7]">
                      info@genevenettoyage.ch
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4 flex-shrink-0">🌐</div>
                  <div>
                    <h4 className="font-bold mb-2 text-base leading-[1.5]">Website</h4>
                    <a href="https://www.genevenettoyage.ch" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition text-base leading-[1.7]">
                      www.genevenettoyage.ch
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4 flex-shrink-0">💬</div>
                  <div>
                    <h4 className="font-bold mb-2 text-base leading-[1.5]">WhatsApp</h4>
                    <p className="text-blue-100 text-base leading-[1.7]">Contactez-nous facilement via WhatsApp!</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4 flex-shrink-0">🕒</div>
                  <div>
                    <h4 className="font-bold mb-2 text-base leading-[1.5]">Disponibilité</h4>
                    <p className="text-blue-100 text-base leading-[1.7]">24h/24 et 7j/7</p>
                    <p className="text-blue-100 text-sm mt-1 leading-[1.5]">Service Non-Stop</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-8 leading-[1.3]">Demander un Devis</h3>
              <form className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Nom complet"
                    className="w-full px-4 py-3.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white text-base leading-[1.5]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white text-base leading-[1.5]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    className="w-full px-4 py-3.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white text-base leading-[1.5]"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white resize-none text-base leading-[1.7]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg text-base leading-[1.5]"
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

