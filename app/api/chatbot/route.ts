import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, history, sessionId } = await request.json()

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    const CHATFLOW_ID = process.env.FLOWISE_CHATFLOW_ID || '3fadc7bf-109d-4649-af1f-c66773105a26'
    const FLOWISE_BASE_URL = process.env.FLOWISE_API_URL || 'https://flowise.chatdeskiyo.com'
    const FLOWISE_API_URL = `${FLOWISE_BASE_URL}/api/v1/prediction/${CHATFLOW_ID}`

    try {
      // Flowise API için request body
      const requestBody: any = {
        question: message,
      }

      // Session ID varsa ekle - bu Flowise'in conversation memory'sini aktifleştirir
      if (sessionId) {
        requestBody.overrideConfig = {
          sessionId: sessionId,
        }
      }

      // History varsa ekle (Flowise conversation memory için)
      // Flowise API formatı: [{ role: 'userMessage' | 'apiMessage', content: '...' }]
      if (history && Array.isArray(history) && history.length > 0) {
        // Component'ten gelen format: { role: 'user' | 'assistant', content: '...' }
        // Flowise'in beklediği format: { role: 'userMessage' | 'apiMessage', content: '...' }
        const flowiseHistory = history
          .filter(msg => msg && msg.content && typeof msg.content === 'string' && msg.content.trim() !== '') // Boş mesajları filtrele
          .map(msg => {
            const role = msg.role || 'assistant' // Default assistant
            const content = msg.content.trim()
            
            // Flowise formatına dönüştür: 'user' -> 'userMessage', 'assistant' -> 'apiMessage'
            return {
              role: role === 'user' ? 'userMessage' : 'apiMessage',
              content: content,
            }
          })
        
        // Sadece geçerli history varsa ekle (max 10 mesaj)
        if (flowiseHistory.length > 0) {
          requestBody.history = flowiseHistory.slice(-10) // Son 10 mesajı al
        }
      }

      const response = await fetch(FLOWISE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Flowise API Error:', response.status, errorText)
        console.error('Request body that caused error:', JSON.stringify(requestBody, null, 2))
        throw new Error(`Flowise API error: ${response.status} - ${errorText.substring(0, 200)}`)
      }

      const data = await response.json()
      const botResponse = data?.answer || 
                        data?.text || 
                        data?.response || 
                        data?.message ||
                        (typeof data === 'string' ? data : null) ||
                        JSON.stringify(data)

      if (!botResponse || (typeof botResponse === 'string' && botResponse.trim() === '')) {
        throw new Error('Empty or invalid response from Flowise API')
      }

      return NextResponse.json({ answer: String(botResponse) })
    } catch (error: any) {
      return NextResponse.json(
        { 
          error: 'Internal server error',
          details: error.message || 'Unknown error'
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}
