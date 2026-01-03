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
  // Chatbot dimensions - larger to avoid scrolling
  const IPHONE_WIDTH = 360
  const IPHONE_HEIGHT = 650
  const BOTTOM_OFFSET = 20
  const RIGHT_OFFSET = 20

  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [size, setSize] = useState({ width: IPHONE_WIDTH, height: IPHONE_HEIGHT })
  const [showWelcomeForm, setShowWelcomeForm] = useState(true)
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' })
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  
  // Initialize size on client side - position handled by CSS (right/bottom)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSize({ width: IPHONE_WIDTH, height: IPHONE_HEIGHT })
    }
  }, [])
  
  // Drag functionality removed - chatbot stays fixed at bottom right
  
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const dragHandleRef = useRef<HTMLDivElement>(null)
  const resizeHandleRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollToBottom = () => {
        chatContainerRef.current!.scrollTo({
          top: chatContainerRef.current!.scrollHeight,
          behavior: 'smooth',
        })
      }
      scrollToBottom()
    }
  }, [messages, isTyping])

  // Disable dragging - chatbot stays fixed at bottom right
  // Removed drag functionality to keep chatbot always at bottom right

  // Handle resizing - keep in bounds
  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate from bottom right corner since chatbot is fixed at bottom right
      const maxWidth = window.innerWidth - RIGHT_OFFSET * 2
      const maxHeight = window.innerHeight - BOTTOM_OFFSET * 2
      // Calculate distance from right and bottom edges
      const distanceFromRight = window.innerWidth - e.clientX - RIGHT_OFFSET
      const distanceFromBottom = window.innerHeight - e.clientY - BOTTOM_OFFSET
      const newWidth = Math.max(300, Math.min(600, distanceFromRight))
      const newHeight = Math.max(400, Math.min(900, distanceFromBottom))
      setSize({ 
        width: Math.min(newWidth, maxWidth), 
        height: Math.min(newHeight, maxHeight) 
      })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  // Drag disabled - chatbot stays fixed at bottom right
  const handleDragStart = () => {
    // No-op: dragging disabled to keep chatbot always at bottom right
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)
  }

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
    const messageText = inputValue
    setInputValue('')
    setIsLoading(true)
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = '44px'
    }

    // Update message status to sent
    setTimeout(() => {
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === userMessage.id ? { ...msg, status: 'sent' as const } : msg
        )
      )
    }, 200)

    // Simulate typing indicator
    setTimeout(() => {
      setIsTyping(true)
    }, 500)

    // TODO: Replace with Flowise API endpoint
    setTimeout(() => {
      setIsTyping(false)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Merci pour votre message! L\'intégration avec Flowise sera bientôt disponible. En attendant, n\'hésitez pas à nous contacter directement via notre site web.',
        sender: 'bot',
        timestamp: new Date(),
        status: 'read',
      }
      setMessages((prev) => {
        const updated = prev.map((msg) => 
          msg.id === userMessage.id ? { ...msg, status: 'delivered' as const } : msg
        )
        return [...updated, botMessage]
      })
      setIsLoading(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleWelcomeFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowWelcomeForm(false)
    // Add welcome message
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: userInfo.name 
        ? `Bonjour ${userInfo.name}! 👋 Je suis votre assistant virtuel Vertnetgeneve. Comment puis-je vous aider aujourd'hui?`
        : 'Bonjour! 👋 Je suis votre assistant virtuel Vertnetgeneve. Comment puis-je vous aider aujourd\'hui?',
      sender: 'bot',
      timestamp: new Date(),
      status: 'read',
    }
    setMessages([welcomeMessage])
  }

  const handleSkipWelcome = () => {
    setShowWelcomeForm(false)
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: 'Bonjour! 👋 Je suis votre assistant virtuel Vertnetgeneve. Comment puis-je vous aider aujourd\'hui?',
      sender: 'bot',
      timestamp: new Date(),
      status: 'read',
    }
    setMessages([welcomeMessage])
  }

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-gradient-to-br from-gray-600 via-gray-500 to-gray-400 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-gray-500/50 transition-all duration-300 group relative overflow-hidden"
        aria-label="Ouvrir le chatbot"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-400 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
        <MessageCircle className="w-8 h-8 relative z-10" />
        <motion.div
          className="absolute -inset-1 bg-gradient-to-br from-gray-500 to-gray-400 rounded-full opacity-0 group-hover:opacity-30 blur-md"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ 
          duration: 0.2,
          ease: 'easeOut'
        }}
        className="overflow-hidden flex flex-col relative"
        style={{
          position: 'fixed',
          right: `${RIGHT_OFFSET}px`,
          bottom: `${BOTTOM_OFFSET}px`,
          width: isMinimized ? `${IPHONE_WIDTH}px` : `${size.width}px`,
          height: isMinimized ? '60px' : `${size.height}px`,
          zIndex: 9999,
          borderRadius: '28px',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2) inset, 0 2px 8px rgba(0, 0, 0, 0.08), 0 0 40px rgba(71, 85, 105, 0.1)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(30px)',
          overflowX: 'hidden',
          overflowY: 'hidden',
        }}
      >
        {/* Premium gradient border effect */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            borderRadius: '28px',
            padding: '2px',
            background: 'linear-gradient(135deg, rgba(71, 85, 105, 0.3) 0%, rgba(100, 116, 139, 0.25) 50%, rgba(148, 163, 184, 0.2) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        
        {/* Content container */}
        <div 
          className="flex-1 flex flex-col overflow-hidden relative"
          style={{
            borderRadius: '28px',
            backgroundColor: 'rgba(250, 251, 252, 0.95)',
            backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(250, 251, 252, 0.9))',
            backdropFilter: 'blur(10px)',
            height: '100%',
            overflowX: 'hidden',
            overflowY: 'hidden',
            maxWidth: '100%',
          }}
        >
          {/* Premium Header */}
          <motion.div
            ref={dragHandleRef}
            className="px-4 py-3 flex items-center justify-between select-none relative overflow-hidden"
            style={{ 
              borderRadius: isMinimized ? '24px' : '24px 24px 0 0',
              background: 'linear-gradient(135deg, #475569 0%, #64748b 50%, #94a3b8 100%)',
              borderBottom: isMinimized ? 'none' : '1px solid rgba(0, 0, 0, 0.05)',
              cursor: isMinimized ? 'pointer' : 'default',
            }}
            whileHover={{ opacity: 0.95 }}
            onClick={isMinimized ? () => setIsMinimized(false) : undefined}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(71, 85, 105, 0.5) 0%, rgba(100, 116, 139, 0.5) 50%, rgba(148, 163, 184, 0.5) 100%)',
              }}
              animate={{
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          
          {/* iPhone-style notch effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black/10 rounded-b-3xl backdrop-blur-sm"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black/5 rounded-b-2xl"></div>
          
          <div className="flex items-center space-x-3 relative z-10">
            {/* Bot Avatar */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
                  <div className="w-10 h-10 bg-white/25 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/40 shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              {/* Online status indicator */}
              <motion.div
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg"
                style={{
                  backgroundColor: 'rgba(100, 116, 139, 0.8)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
            <div>
              <h3 className="text-white font-display font-semibold text-xs flex items-center gap-1.5 flex-wrap">
                Assistant Virtuel
                <motion.span 
                  className="text-[10px] font-normal opacity-90 flex items-center gap-1"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="w-1 h-1 bg-secondary-300 rounded-full"></span>
                  24/7 Actif
                </motion.span>
              </h3>
              <p className="text-white/75 text-[10px]">Vertnetgeneve</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 relative z-10">
            {isMinimized ? (
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMinimized(false)
                }}
                className="p-1.5 rounded-lg transition-colors"
                aria-label="Agrandir"
              >
                <Maximize2 className="w-4 h-4 text-white" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMinimized(true)
                }}
                className="p-1.5 rounded-lg transition-colors"
                aria-label="Réduire"
              >
                <Minimize2 className="w-4 h-4 text-white" />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Chat Content */}
        {!isMinimized && (
          <>
            {/* Welcome Form */}
            {showWelcomeForm ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 chatbot-scrollbar flex flex-col justify-center"
                style={{ 
                  maxHeight: `calc(${size.height}px - 200px)`,
                  minHeight: `calc(${size.height}px - 240px)`,
                }}
              >
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-400 rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-white"
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-display font-semibold text-gray-900">Bienvenue!</h3>
                    <p className="text-sm text-gray-600">Remplissez vos informations pour une meilleure expérience (optionnel)</p>
                  </div>
                  
                  <form onSubmit={handleWelcomeFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nom <span className="text-gray-400 text-xs">(optionnel)</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        placeholder="Votre nom"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200 bg-white placeholder:text-gray-400"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Téléphone <span className="text-gray-400 text-xs">(optionnel)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        placeholder="+41 XX XXX XX XX"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200 bg-white placeholder:text-gray-400"
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      <motion.button
                        type="button"
                        onClick={handleSkipWelcome}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                      >
                        Passer
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-500 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Continuer
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
              ) : (
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2.5 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 chatbot-scrollbar"
                  style={{ 
                    maxHeight: `calc(${size.height}px - 180px)`,
                    minHeight: '200px',
                    width: '100%',
                    maxWidth: '100%',
                    overflowX: 'hidden',
                  }}
                >
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Bot Avatar */}
                  {message.sender === 'bot' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 + 0.1, type: "spring" }}
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white/50"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.7) 0%, rgba(34, 197, 94, 0.7) 100%)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </motion.div>
                  )}
                  
                  <div className="flex flex-col max-w-[80%] min-w-0">
                    <motion.div
                      className={`rounded-2xl px-3 py-2 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-gray-600 to-gray-500 text-white shadow-sm'
                          : 'bg-white border border-gray-200/60 text-gray-900 shadow-sm'
                      }`}
                      style={{
                        ...(message.sender === 'user' && {
                          borderBottomRightRadius: '4px',
                        }),
                        ...(message.sender === 'bot' && {
                          borderBottomLeftRadius: '4px',
                        }),
                        maxWidth: '100%',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        overflowX: 'hidden',
                      }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <p className="text-xs leading-relaxed break-words whitespace-pre-wrap overflow-wrap-anywhere" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{message.text}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${message.sender === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                        <span className="text-[10px]">
                          {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.sender === 'user' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                          >
                            {message.status === 'sending' && (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            )}
                            {message.status === 'sent' && (
                              <Check className="w-3 h-3" />
                            )}
                            {message.status === 'delivered' && (
                              <CheckCheck className="w-3 h-3" />
                            )}
                            {message.status === 'read' && (
                              <CheckCheck className="w-3 h-3 text-gray-400" />
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* User Avatar */}
                  {message.sender === 'user' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 + 0.1, type: "spring" }}
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white/50"
              style={{
                background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.7) 0%, rgba(71, 85, 105, 0.7) 100%)',
              }}
            >
              <Circle className="w-3.5 h-3.5 text-white fill-white" />
            </motion.div>
                  )}
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-end gap-2 justify-start"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-white">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200/60 rounded-3xl px-4 py-3 shadow-sm" style={{ borderBottomLeftRadius: '6px' }}>
                    <div className="flex space-x-1.5">
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
              )}

              {/* Premium Input Area */}
              {!showWelcomeForm && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="border-t-2 border-gray-200/40 p-4 bg-gradient-to-t from-white via-white/95 to-white/90 backdrop-blur-md shadow-[0_-4px_12px_rgba(0,0,0,0.04)]"
                  style={{ borderRadius: '0 0 28px 28px' }}
                >
                  <div className="flex items-end gap-3">
                    <div className="flex-1 relative min-w-0">
                      <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value)
                          // Auto-resize textarea
                          e.target.style.height = 'auto'
                          e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder="Écrivez un message..."
                        className="w-full resize-none border-2 border-gray-200/60 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400/30 focus:border-gray-400/60 transition-all duration-300 bg-white/95 backdrop-blur-sm placeholder:text-gray-400 shadow-inner"
                        rows={1}
                        style={{ 
                          maxHeight: '100px', 
                          minHeight: '48px',
                          maxWidth: '100%',
                          overflowX: 'hidden',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
                        }}
                      />
                    </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="text-white p-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex-shrink-0 relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(71, 85, 105, 0.95) 0%, rgba(100, 116, 139, 0.9) 100%)',
                    boxShadow: '0 4px 12px rgba(71, 85, 105, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  }}
                  aria-label="Envoyer"
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(135deg, rgba(71, 85, 105, 1) 0%, rgba(100, 116, 139, 0.95) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                  ) : (
                    <Send className="w-4 h-4 relative z-10" />
                  )}
                </motion.button>
              </div>
            </motion.div>
            )}
          </>
        )}

          {/* Resize Handle */}
          {!isMinimized && (
            <motion.div
              ref={resizeHandleRef}
              onMouseDown={handleResizeStart}
              className="absolute bottom-2 right-2 w-6 h-6 cursor-nwse-resize bg-gradient-to-br from-gray-500 to-gray-400 opacity-30 hover:opacity-100 transition-opacity z-20"
              style={{
                clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
              }}
              title="Redimensionner"
              whileHover={{ opacity: 1 }}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
