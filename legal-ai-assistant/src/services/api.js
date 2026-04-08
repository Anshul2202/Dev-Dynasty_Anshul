const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function askAI(question) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  if (!apiKey) {
    throw new Error('Missing VITE_GROQ_API_KEY in the frontend .env file.')
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'user',
          content: question,
        },
      ],
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Failed to get AI response from Groq.')
  }

  const content = data?.choices?.[0]?.message?.content?.trim()

  if (!content) {
    throw new Error('Groq returned an empty response.')
  }

  return content
}
