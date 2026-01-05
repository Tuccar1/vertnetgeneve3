import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    // Flowise API entegrasyonu - Doğru format (API key gerekmiyor, public endpoint)
    const CHATFLOW_ID = '3fadc7bf-109d-4649-af1f-c66773105a26'
    const FLOWISE_API_URL = `https://flowise.chatdeskiyo.com/api/v1/prediction/${CHATFLOW_ID}`

    console.log('Sending request to Flowise API:', FLOWISE_API_URL)
    console.log('Message:', message.substring(0, 50))

    try {
      // Flowise API formatı - sadece question gönderiliyor, API key gerekmiyor
      const response = await fetch(FLOWISE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: message,
        }),
      })

      console.log('Flowise API response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Flowise API error:', response.status, errorText.substring(0, 200))
        throw new Error(`Flowise API error: ${response.status} - ${errorText.substring(0, 200)}`)
      }

      // Response'u parse et
      const data = await response.json()
      console.log('Flowise API response:', JSON.stringify(data).substring(0, 300))

      // Response formatını kontrol et - Flowise genellikle direkt text döndürür veya answer field'ı kullanır
      const botResponse = data?.answer || 
                        data?.text || 
                        data?.response || 
                        data?.message ||
                        (typeof data === 'string' ? data : null) ||
                        JSON.stringify(data)

      if (!botResponse || (typeof botResponse === 'string' && botResponse.trim() === '')) {
        console.error('Empty response from Flowise API. Full data:', JSON.stringify(data))
        throw new Error('Empty or invalid response from Flowise API')
      }

      return NextResponse.json({ answer: String(botResponse) })
    } catch (error: any) {
      console.error('Chatbot API route error:', error)
      console.error('Error stack:', error.stack)
      
      return NextResponse.json(
        { 
          error: 'Internal server error',
          details: error.message || 'Unknown error'
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Chatbot API route error:', error)
    console.error('Error stack:', error.stack)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}
