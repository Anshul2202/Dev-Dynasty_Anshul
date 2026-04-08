const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama3-8b-8192'

export async function sendMessageToGroq(message) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  if (!apiKey || !message?.trim()) {
    return 'Something went wrong. Please try again.'
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

    return (
      data?.choices?.[0]?.message?.content?.trim() ||
      'Something went wrong. Please try again.'
    )
  } catch {
    return 'Something went wrong. Please try again.'
  }
}
