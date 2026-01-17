'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minimize2, Maximize2, MessageCircle, Send, Loader2, Sparkles, Check, CheckCheck, Circle, Move, GripVertical } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  status?: 'sending' | 'sent' | 'delivered' | 'read'
}

export default function Chatbot() {
  const pathname = usePathname()
  const CHATBOT_WIDTH = 380
  const CHATBOT_HEIGHT = 600
  const MIN_WIDTH = 320
  const MIN_HEIGHT = 400
  const MAX_WIDTH = 600
  const MAX_HEIGHT = 900

  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [size, setSize] = useState({ width: CHATBOT_WIDTH, height: CHATBOT_HEIGHT })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [showWelcomeForm, setShowWelcomeForm] = useState(true)
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' })
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [chatSessionId, setChatSessionId] = useState<string | null>(null)
  
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const resizeStartRef = useRef({ width: 0, height: 0, x: 0, y: 0 })

  // Client mount check
  useEffect(() => {
    setMounted(true)
  }, [])

  // Analytics tracking functions
  const trackChatEvent = useCallback(async (type: string, data: Record<string, unknown> = {}) => {
    try {
      const visitorId = typeof window !== 'undefined' ? localStorage.getItem('visitor_id') || '' : '';
      await fetch('/api/analytics/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          sessionId: chatSessionId,
          visitorId,
          ...data
        })
      });
    } catch (error) {
      console.error('Chat tracking error:', error);
    }
  }, [chatSessionId]);

  // Start chat session
  const startChatSession = useCallback(async () => {
    try {
      const visitorId = typeof window !== 'undefined' ? localStorage.getItem('visitor_id') || '' : '';
      const response = await fetch('/api/analytics/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'start',
          visitorId,
          userName: userInfo.name,
          userPhone: userInfo.phone
        })
      });
      const data = await response.json();
      if (data.sessionId) {
        setChatSessionId(data.sessionId);
      }
    } catch (error) {
      console.error('Failed to start chat session:', error);
    }
  }, [userInfo.name, userInfo.phone]);

  // End chat session on unmount or close
  useEffect(() => {
    return () => {
      if (chatSessionId) {
        trackChatEvent('end');
      }
    };
  }, [chatSessionId, trackChatEvent]);

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
      
      if (!isResizing) {
        setSize(prev => ({
          width: vw < 640 ? vw - 32 : Math.min(prev.width, vw - 40),
          height: vh < 750 ? vh - 80 : Math.min(prev.height, vh - 40)
        }))
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [isResizing])

  // Drag handlers - Mouse
  const handleDragStart = (e: React.MouseEvent) => {
    if (isMinimized) return
    // Mobilde drag'i devre dışı bırak
    if (window.innerWidth < 640) return
    e.preventDefault()
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
  }

  // Drag handlers - Touch (mobil için)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMinimized) return
    // Mobilde drag'i devre dışı bırak - sadece butonlara dokunabilsin
    return
  }

  const handleDragMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    const vw = window.innerWidth
    const vh = window.innerHeight
    
    let newX = e.clientX - dragStartRef.current.x
    let newY = e.clientY - dragStartRef.current.y
    
    // Sınırları kontrol et
    const maxX = vw - size.width - 20
    const maxY = vh - size.height - 20
    const minX = -(vw - size.width - 40)
    const minY = -(vh - size.height - 40)
    
    newX = Math.max(minX, Math.min(newX, maxX))
    newY = Math.max(minY, Math.min(newY, 0))
    
    setPosition({ x: newX, y: newY })
  }, [isDragging, size.width, size.height])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Resize handlers
  const handleResizeStart = (e: React.MouseEvent) => {
    // Mobilde resize'ı devre dışı bırak
    if (window.innerWidth < 640) return
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    resizeStartRef.current = {
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY
    }
  }

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return
    
    const deltaX = resizeStartRef.current.x - e.clientX
    const deltaY = resizeStartRef.current.y - e.clientY
    
    let newWidth = resizeStartRef.current.width + deltaX
    let newHeight = resizeStartRef.current.height + deltaY
    
    // Min/Max sınırları
    newWidth = Math.max(MIN_WIDTH, Math.min(newWidth, MAX_WIDTH))
    newHeight = Math.max(MIN_HEIGHT, Math.min(newHeight, MAX_HEIGHT))
    
    setSize({ width: newWidth, height: newHeight })
  }, [isResizing])

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false)
  }, [])

  // Global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove)
      window.addEventListener('mouseup', handleDragEnd)
      return () => {
        window.removeEventListener('mousemove', handleDragMove)
        window.removeEventListener('mouseup', handleDragEnd)
      }
    }
  }, [isDragging, handleDragMove, handleDragEnd])

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove)
      window.addEventListener('mouseup', handleResizeEnd)
      return () => {
        window.removeEventListener('mousemove', handleResizeMove)
        window.removeEventListener('mouseup', handleResizeEnd)
      }
    }
  }, [isResizing, handleResizeMove, handleResizeEnd])

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

    // Track user message
    if (chatSessionId) {
      trackChatEvent('message', { message: currentInput, sender: 'user' });
    }

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
      
      // Track bot response
      if (chatSessionId) {
        trackChatEvent('message', { message: botResponse, sender: 'bot' });
      }
      
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
    
    // Start chat session with user info
    startChatSession();
    
    setMessages([{
      id: 'welcome',
      text: `Bonjour ${userInfo.name || ''}! 👋 Comment puis-je vous aider?`,
      sender: 'bot',
      timestamp: new Date(),
      status: 'read'
    }])
  }

  // Admin panelde chatbot'u gösterme
  if (pathname?.startsWith('/admin')) {
    return null
  }

  // Hydration hatası önleme - client mount bekle
  if (!mounted) {
    return null
  }

  return (
    <div 
      className={`fixed z-[9999] ${isOpen && typeof window !== 'undefined' && window.innerWidth < 640 ? 'inset-0' : ''}`}
      style={isOpen && typeof window !== 'undefined' && window.innerWidth < 640 ? {} : { 
        bottom: `${20 - position.y}px`, 
        right: `${16 - position.x}px`, 
        left: 'auto' 
      }}
    >
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
            ref={chatWindowRef}
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`relative flex flex-col overflow-hidden ${isDragging ? 'cursor-grabbing' : ''} ${isResizing ? 'select-none' : ''} 
              sm:rounded-3xl max-sm:fixed max-sm:inset-0 max-sm:rounded-none`}
            style={{ 
                width: typeof window !== 'undefined' && window.innerWidth < 640 ? '100%' : size.width, 
                height: isMinimized 
                  ? (typeof window !== 'undefined' && window.innerWidth < 640 ? '56px' : '60px')
                  : (typeof window !== 'undefined' && window.innerWidth < 640 ? '100%' : size.height),
                maxWidth: typeof window !== 'undefined' && window.innerWidth < 640 
                  ? '100%' 
                  : `${MAX_WIDTH}px`,
                transition: isDragging || isResizing ? 'none' : 'height 0.3s ease'
            }}
          >
            {/* Decorative gradient border frame */}
            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 max-sm:rounded-none max-sm:hidden">
              <div className="absolute inset-[2px] bg-white rounded-[22px]" />
            </div>
            
            {/* Outer glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400/20 via-teal-500/20 to-emerald-600/20 rounded-[28px] blur-xl max-sm:hidden" />
            
            {/* Inner content wrapper */}
            <div className="relative z-10 flex flex-col h-full bg-white sm:rounded-[22px] overflow-hidden sm:m-[2px]">
            {/* Resize Handle - Sol Üst Köşe */}
            {!isMinimized && (
              <div
                onMouseDown={handleResizeStart}
                className="absolute top-0 left-0 w-5 h-5 cursor-nw-resize z-50 group hidden sm:block"
                title="Boyutlandır"
              >
                <div className="absolute top-1.5 left-1.5 w-2 h-2 border-l-2 border-t-2 border-white/30 group-hover:border-white/60 transition-colors" />
              </div>
            )}
            
            {/* Header - Draggable - Professional Design */}
            <div 
              className={`relative px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white flex items-center justify-between overflow-hidden ${!isMinimized ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
              onMouseDown={handleDragStart}
              onClick={() => isMinimized && setIsMinimized(false)}
            >
              {/* Subtle shine effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-2.5 sm:gap-3 relative z-10 min-w-0 flex-1">
                {/* Drag handle - only visible on desktop */}
                <div className="hidden sm:flex items-center justify-center w-5 opacity-40 hover:opacity-70 transition-opacity">
                  <GripVertical className="w-4 h-4" />
                </div>
                
                {/* Logo/Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-emerald-600" />
                </div>
                
                {/* Title & Status */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-semibold tracking-tight truncate" id="live-edit-chatbotTitle">
                    Vertnetgeneve
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/80 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Assistant IA • En ligne
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-1 relative z-10 flex-shrink-0">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized) }} 
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors"
                  aria-label={isMinimized ? "Agrandir" : "Réduire"}
                  title={isMinimized ? "Agrandir" : "Réduire"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false) }} 
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors"
                  aria-label="Fermer"
                  title="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
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
                    <div 
                      ref={chatContainerRef} 
                      className="flex-1 overflow-y-auto p-3 space-y-2 chatbot-scrollbar relative"
                      style={{
                        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 25%, #f0fdfa 50%, #ecfdf5 75%, #f0fdf4 100%)'
                      }}
                    >
                      {/* Subtle pattern overlay */}
                      <div 
                        className="absolute inset-0 opacity-30 pointer-events-none"
                        style={{
                          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                                           radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
                                           radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)`
                        }}
                      />
                      
                      {messages.map((m, index) => (
                        <motion.div 
                          key={m.id} 
                          className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                            m.sender === 'user' 
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-br-md shadow-md' 
                              : 'bg-white/90 backdrop-blur-sm border border-emerald-100/50 rounded-bl-md shadow-sm'
                          }`}>
                            <p className="leading-relaxed break-words whitespace-pre-wrap">{m.text}</p>
                            <div className={`text-[10px] mt-1 flex items-center gap-1 ${
                              m.sender === 'user' ? 'text-white/60 justify-end' : 'text-emerald-600/50 justify-start'
                            }`}>
                              <span>{m.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                              {m.sender === 'user' && m.status === 'sent' && (
                                <Check className="w-2.5 h-2.5 text-white/70" />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {isTyping && (
                        <motion.div 
                          className="flex items-center ml-1 relative z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="bg-white/90 backdrop-blur-sm border border-emerald-100/50 rounded-xl px-3 py-2 shadow-sm">
                            <div className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-2 h-2 bg-emerald-400 rounded-full"
                                  animate={{
                                    y: [0, -5, 0],
                                    opacity: [0.4, 1, 0.4],
                                  }}
                                  transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: 'easeInOut',
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="p-3 bg-gradient-to-t from-white via-white to-emerald-50/30 border-t border-emerald-100/50">
                      <div className="flex items-end gap-2 bg-white rounded-2xl px-3 py-2 border border-emerald-200/50 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-200/50 transition-all shadow-sm">
                        <textarea
                          ref={inputRef}
                          rows={2}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                          placeholder="Écrivez votre message..."
                          aria-label="Écrivez votre message"
                          className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400 resize-none leading-relaxed"
                        />
                        
                        <button 
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isLoading}
                          className="p-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                          aria-label="Envoyer le message"
                          title="Envoyer"
                        >
                          {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Send className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
