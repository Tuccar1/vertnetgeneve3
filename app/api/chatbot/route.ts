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

    const CHATFLOW_ID = process.env.FLOWISE_CHATFLOW_ID || '3fadc7bf-109d-4649-af1f-c66773105a26'
    const FLOWISE_BASE_URL = process.env.FLOWISE_API_URL || 'https://flowise.chatdeskiyo.com'
    const FLOWISE_API_URL = `${FLOWISE_BASE_URL}/api/v1/prediction/${CHATFLOW_ID}`

    try {
      const response = await fetch(FLOWISE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: message,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Flowise API error: ${response.status}`)
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
