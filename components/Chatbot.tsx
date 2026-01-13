'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minimize2, Maximize2, MessageCircle, Send, Loader2, Sparkles, Check, CheckCheck, Circle } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  status?: 'sending' | 'sent' | 'delivered' | 'read'
}

export default function Chatbot() {
  const CHATBOT_WIDTH = 360
  const CHATBOT_HEIGHT = 550

  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [size, setSize] = useState({ width: CHATBOT_WIDTH, height: CHATBOT_HEIGHT })
  const [showWelcomeForm, setShowWelcomeForm] = useState(true)
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' })
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768
      setIsOpen(!isMobile)
      setIsMinimized(false)
    }
  }, [])

  // Responsive Hesaplamalar
  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      
      setSize({
        width: vw < 640 ? vw - 32 : CHATBOT_WIDTH,
        height: vh < 700 ? vh - 100 : CHATBOT_HEIGHT
      })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isTyping, isMinimized])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')
    setIsLoading(true)
    
    if (inputRef.current) inputRef.current.style.height = '48px'

    // Mesaj gönderildi olarak işaretle
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === userMessage.id ? {...m, status: 'sent'} : m))
      setIsTyping(true)
    }, 300)

    try {
      // Flowise API entegrasyonu
      // History'yi hazırla - mevcut mesajı hariç tut (sadece önceki mesajlar)
      const previousMessages = messages.filter(m => m.id !== userMessage.id)
      const history = previousMessages.slice(-10).map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }))

      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          history: history,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || errorData.details || `API error: ${response.status} ${response.statusText}`
        throw new Error(errorMessage)
      }

      const data = await response.json()
      const botResponse = data.answer || data.text || data.response || data.message || "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer."

      if (!botResponse || botResponse.trim() === '') {
        throw new Error('Empty response from API')
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        status: 'read',
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      setIsLoading(false)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `DÃ©solÃ©, une erreur technique s'est produite: ${errorMessage}. Veuillez rÃ©essayer ou contactez-nous directement au +41 76 621 21 83.`,
        sender: 'bot',
        timestamp: new Date(),
        status: 'read',
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      setIsLoading(false)
    }
  }

  const handleWelcomeFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowWelcomeForm(false)
    setMessages([{
      id: 'welcome',
      text: `Bonjour ${userInfo.name || ''}! 👋 Comment puis-je vous aider?`,
      sender: 'bot',
      timestamp: new Date(),
      status: 'read'
    }])
  }

  return (
    <div className="fixed z-[9999]" style={{ bottom: '20px', right: '16px', left: 'auto' }}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            key="launcher"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="flex items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-full shadow-[0_8px_32px_rgba(16,185,129,0.4)] flex items-center justify-center text-white hover:shadow-[0_12px_40px_rgba(16,185,129,0.6)] transition-all duration-300 group overflow-hidden min-w-[48px] min-h-[48px]"
              aria-label="Ouvrir l'assistant virtuel Vertnetgeneve"
              title="Assistant virtuel"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-500 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <MessageCircle className="w-8 h-8 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <motion.div
                className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.button>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">7/24 Actif</span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-gray-100/50 flex flex-col overflow-hidden backdrop-blur-sm"
            style={{ 
                width: size.width, 
                height: isMinimized 
                  ? (typeof window !== 'undefined' && window.innerWidth < 640 ? '56px' : '64px')
                  : size.height,
                maxWidth: typeof window !== 'undefined' && window.innerWidth < 640 
                  ? 'calc(100vw - 32px)' 
                  : typeof window !== 'undefined' && window.innerWidth < 1024
                  ? 'calc(100vw - 40px)'
                  : `${CHATBOT_WIDTH}px`,
                transition: 'height 0.3s ease'
            }}
          >
            {/* Header */}
            <div className="relative p-3 sm:p-4 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between cursor-pointer overflow-hidden shadow-lg"
                 onClick={() => isMinimized && setIsMinimized(false)}>
              {/* Premium animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 pointer-events-none" />
              
              <div className="flex items-center gap-2 sm:gap-3 relative z-10 min-w-0 flex-1">
                <motion.div 
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/25 backdrop-blur-md rounded-xl flex items-center justify-center shadow-xl flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs font-bold flex items-center gap-1.5 sm:gap-2 leading-tight truncate">
                    <span className="truncate">Vertnetgeneve</span>
                    <motion.span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-300 rounded-full flex-shrink-0 shadow-sm"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [1, 0.6, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-white/90 font-medium leading-tight mt-0.5 truncate">Assistant IA - En ligne</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1 relative z-10 flex-shrink-0">
                <motion.button 
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized) }} 
                  className="p-2.5 sm:p-3 hover:bg-white/25 rounded-lg transition-all duration-200 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={isMinimized ? "Agrandir la fenêtre de chat" : "Réduire la fenêtre de chat"}
                  title={isMinimized ? "Agrandir" : "Réduire"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                </motion.button>
                <motion.button 
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false) }} 
                  className="p-2.5 sm:p-3 hover:bg-white/25 rounded-lg transition-all duration-200 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 90, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Fermer l'assistant virtuel"
                  title="Fermer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </div>

            {/* Main Content */}
            {!isMinimized && (
              <>
                {showWelcomeForm ? (
                  <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white">
                    <form onSubmit={handleWelcomeFormSubmit} className="space-y-4 pt-4">
                      <motion.div 
                        className="text-center pb-6"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div 
                          className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white shadow-lg"
                          animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <Sparkles className="w-8 h-8" />
                        </motion.div>
                        <h3 className="text-base font-bold text-gray-900 mb-1">Bienvenue ! 👋</h3>
                        <p className="text-xs text-gray-500">Laissez-nous vos coordonnées pour mieux vous servir.</p>
                      </motion.div>
                      <motion.input 
                        className="w-full p-3 bg-white border-2 border-gray-200 rounded-xl text-xs outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-gray-400"
                        placeholder="Votre nom"
                        value={userInfo.name}
                        onChange={e => setUserInfo({...userInfo, name: e.target.value})}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        aria-label="Votre nom"
                      />
                      <motion.input 
                        className="w-full p-3 bg-white border-2 border-gray-200 rounded-xl text-xs outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-gray-400"
                        placeholder="Votre téléphone"
                        value={userInfo.phone}
                        onChange={e => setUserInfo({...userInfo, phone: e.target.value})}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        aria-label="Votre téléphone"
                        type="tel"
                      />
                      <motion.button 
                        type="submit" 
                        className="w-full py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-xl font-semibold text-xs hover:shadow-lg hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2 text-xs">
                          Commencer
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            &rarr;
                          </motion.span>
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </form>
                  </div>
                ) : (
                  <>
                    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/30 via-white to-gray-50/30 chatbot-scrollbar">
                      {messages.map((m, index) => (
                        <motion.div 
                          key={m.id} 
                          className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <div className={`max-w-[80%] p-3 rounded-xl text-sm relative ${
                            m.sender === 'user' 
                              ? 'bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-tr-sm shadow-lg' 
                              : 'bg-white border border-gray-100 rounded-tl-sm shadow-sm'
                          }`}>
                            <p className="leading-relaxed break-words">{m.text}</p>
                            <div className={`text-[10px] mt-1 flex items-center gap-1 ${
                              m.sender === 'user' ? 'text-white/70 justify-end' : 'text-gray-400 justify-start'
                            }`}>
                              <span>{m.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                              {m.sender === 'user' && m.status === 'sent' && (
                                <Check className="w-2.5 h-2.5 text-white/80" />
                              )}
                            </div>
                            {/* Message tail */}
                            {m.sender === 'user' ? (
                              <div className="absolute -right-0.5 bottom-0 w-2 h-2 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 transform rotate-45 translate-x-1/2 translate-y-1/2" />
                            ) : (
                              <div className="absolute -left-0.5 bottom-0 w-2 h-2 bg-white border-l border-b border-gray-100 transform rotate-45 -translate-x-1/2 translate-y-1/2" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                      {isTyping && (
                        <motion.div 
                          className="flex items-center gap-2 ml-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="bg-white border-2 border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-md">
                            <div className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-2 h-2 bg-gray-400 rounded-full"
                                  animate={{
                                    y: [0, -8, 0],
                                    opacity: [0.5, 1, 0.5],
                                  }}
                                  transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: 'easeInOut',
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="p-4 sm:p-5 bg-gradient-to-b from-white via-gray-50/30 to-white border-t border-gray-100/50">
                      <motion.div 
                        className="relative flex items-end gap-2 bg-gradient-to-br from-emerald-50/80 via-teal-50/60 to-emerald-50/80 rounded-2xl p-3 sm:p-3.5 focus-within:from-emerald-100/90 focus-within:via-teal-100/70 focus-within:to-emerald-100/90 focus-within:shadow-xl focus-within:shadow-emerald-200/30 transition-all duration-500 border-2 border-transparent focus-within:border-emerald-300/50 backdrop-blur-sm"
                        initial={false}
                        animate={{
                          boxShadow: inputValue.trim() 
                            ? '0 10px 40px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.1)' 
                            : '0 4px 20px rgba(0, 0, 0, 0.05)',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Animated background glow */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-emerald-200/20 via-teal-200/20 to-emerald-200/20 rounded-2xl opacity-0"
                          animate={{
                            opacity: inputValue.trim() ? [0, 0.5, 0.3, 0.5] : 0,
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                        
                        {/* Decorative border gradient */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-300/0 via-emerald-300/30 to-teal-300/0 opacity-0 focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        <textarea
                          ref={inputRef}
                          rows={1}
                          value={inputValue}
                          onChange={(e) => {
                            setInputValue(e.target.value)
                            e.target.style.height = 'auto'
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`
                          }}
                          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                          onFocus={(e) => {
                            e.target.parentElement?.classList.add('ring-2', 'ring-emerald-300/50')
                          }}
                          onBlur={(e) => {
                            e.target.parentElement?.classList.remove('ring-2', 'ring-emerald-300/50')
                          }}
                          placeholder="Écrivez votre message ici..."
                          aria-label="Écrivez votre message"
                          className="relative z-10 flex-1 bg-transparent border-none outline-none text-xs sm:text-sm p-2 resize-none max-h-32 break-words overflow-x-hidden placeholder:text-gray-400/70 placeholder:italic placeholder:transition-all placeholder:duration-300 focus:placeholder:text-emerald-400/50 leading-relaxed"
                          style={{
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                          }}
                        />
                        
                        {/* Typing indicator dots */}
                        {inputValue.trim() && (
                          <motion.div
                            className="absolute bottom-2 left-4 flex gap-1 opacity-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                          >
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-1 h-1 bg-emerald-500 rounded-full"
                                animate={{
                                  y: [0, -4, 0],
                                  opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                  ease: 'easeInOut',
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                        
                        <motion.button 
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isLoading}
                          className="relative z-10 p-3 sm:p-3.5 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl disabled:shadow-md relative overflow-hidden group flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
                          whileHover={{ 
                            scale: inputValue.trim() && !isLoading ? 1.08 : 1,
                            rotate: inputValue.trim() && !isLoading ? [0, -5, 5, 0] : 0,
                          }}
                          whileTap={{ scale: inputValue.trim() && !isLoading ? 0.92 : 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                          aria-label="Envoyer le message"
                          title="Envoyer"
                        >
                          {/* Button glow effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-500 rounded-2xl opacity-0"
                            animate={{
                              opacity: inputValue.trim() && !isLoading ? [0, 0.6, 0.4, 0.6] : 0,
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                          
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin relative z-10" />
                          ) : (
                            <motion.div
                              className="relative z-10"
                              animate={{ 
                                rotate: inputValue.trim() ? [0, 15, -15, 0] : 0,
                                scale: inputValue.trim() ? [1, 1.1, 1] : 1,
                              }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            >
                              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.div>
                          )}
                          
                          {/* Hover gradient overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 rounded-2xl"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                      </motion.div>
                    </div>
                  </>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
