const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL || 'openai/gpt-oss-120b'
const FALLBACK_MESSAGE = 'AI service temporarily unavailable. Please try again.'

export async function sendMessageToGroq(message) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  if (!apiKey || !message?.trim()) {
    return FALLBACK_MESSAGE
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.3,
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error('Groq request failed')
    }

    const data = await response.json()

    return data?.choices?.[0]?.message?.content?.trim() || FALLBACK_MESSAGE
  } catch {
    return FALLBACK_MESSAGE
  }
}

export async function summarizeDocument(text) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  if (!apiKey || !text?.trim()) {
    return 'Failed to summarize document.'
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.3,
        messages: [
          {
            role: 'system',
            content:
              'You are a legal assistant. Summarize the document clearly and extract key legal terms with simple explanations. Respond in markdown with a short summary section followed by a "Key Legal Terms" section using bullet points in the format "- Term: simple explanation".',
          },
          {
            role: 'user',
            content: text,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error('Groq summary request failed')
    }

    const data = await response.json()

    return data?.choices?.[0]?.message?.content?.trim() || 'Failed to summarize document.'
  } catch (error) {
    console.error(error)

    return 'Failed to summarize document.'
  }
}
