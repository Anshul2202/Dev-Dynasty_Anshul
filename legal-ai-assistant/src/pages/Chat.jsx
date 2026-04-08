import { Send, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { sendMessageToGroq } from '../services/groqService'

const starterMessages = [
  {
    id: 1,
    role: 'assistant',
    content:
      'Hello, I am LexNode AI. Ask me about agreements, clauses, or legal document structure.',
  },
  {
    id: 2,
    role: 'user',
    content: 'Can you explain what an NDA does in simple terms?',
  },
  {
    id: 3,
    role: 'assistant',
    content:
      'An NDA is a confidentiality agreement. It helps protect private information by setting rules for how the other party can use or share it.',
  },
]

function Chat() {
  const [messages, setMessages] = useState(starterMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async () => {
    const trimmedInput = input.trim()

    if (!trimmedInput || isTyping) {
      return
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        role: 'user',
        content: trimmedInput,
      },
    ])
    setInput('')
    setIsTyping(true)

    try {
      const response = await sendMessageToGroq(trimmedInput)

      if (response === 'Something went wrong. Please try again.') {
        throw new Error('Groq service returned fallback')
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: response,
        },
      ])
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'Failed to get response from AI.',
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleClear = () => {
    setMessages([
      {
        id: Date.now(),
        role: 'assistant',
        content: 'Chat cleared. Ask a new legal question whenever you are ready.',
      },
    ])
    setIsTyping(false)
    setInput('')
  }

  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-[0_24px_70px_-30px_rgba(79,70,229,0.22)] backdrop-blur sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Ask LexNode AI</h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Get quick legal explanations and drafting guidance in a clean, modern chat experience.
          </p>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700"
        >
          <Trash2 size={16} />
          Clear Chat
        </button>
      </div>

      <div className="mt-6 rounded-[1.5rem] bg-gradient-to-br from-indigo-50 via-white to-slate-50 p-4 shadow-inner">
        <div className="h-[28rem] overflow-y-auto rounded-[1.25rem] border border-slate-100 bg-white p-4 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white shadow-[0_16px_34px_-20px_rgba(79,70,229,0.75)]'
                      : 'border border-slate-100 bg-slate-50 text-slate-800'
                  }`}
                >
                  <p className="text-sm leading-6">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping ? (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700 shadow-sm">
                  AI is typing...
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="mt-4 rounded-[1.25rem] border border-slate-100 bg-white p-4 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about agreements, clauses, compliance, or legal documents..."
              rows={3}
              className="min-h-[88px] flex-1 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={isTyping}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_34px_-18px_rgba(79,70,229,0.85)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Chat
