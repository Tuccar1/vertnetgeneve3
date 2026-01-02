'use client'

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Contactez-Nous
            </h2>
            <p className="text-lg text-blue-100">
              Obtenez un devis gratuit et personnalisé
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Informations de Contact</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📍</div>
                  <div>
                    <h4 className="font-bold mb-1">Adresse</h4>
                    <p className="text-blue-100">Genève, Suisse</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📞</div>
                  <div>
                    <h4 className="font-bold mb-1">Téléphone</h4>
                    <a href="tel:+41772152255" className="text-blue-100 hover:text-white transition">
                      +41 77 215 22 55
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">✉️</div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <a href="mailto:info@genevenettoyage.ch" className="text-blue-100 hover:text-white transition">
                      info@genevenettoyage.ch
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">🌐</div>
                  <div>
                    <h4 className="font-bold mb-1">Website</h4>
                    <a href="https://www.genevenettoyage.ch" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition">
                      www.genevenettoyage.ch
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">💬</div>
                  <div>
                    <h4 className="font-bold mb-1">WhatsApp</h4>
                    <p className="text-blue-100">Contactez-nous facilement via WhatsApp!</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">🕒</div>
                  <div>
                    <h4 className="font-bold mb-1">Disponibilité</h4>
                    <p className="text-blue-100">24h/24 et 7j/7</p>
                    <p className="text-blue-100 text-sm mt-1">Service Non-Stop</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Demander un Devis</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nom complet"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
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

