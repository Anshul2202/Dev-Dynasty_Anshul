import { Send, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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

  const handleSend = () => {
    const trimmedInput = input.trim()

    if (!trimmedInput) {
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

    window.setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content:
            'This is a demo response for the chat interface. The layout is ready for live AI integration.',
        },
      ])
      setIsTyping(false)
    }, 900)
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
    <section className="rounded-[2rem] bg-white p-4 shadow sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Ask LexNode AI</h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Get quick legal explanations and drafting guidance in a clean, modern chat experience.
          </p>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow transition hover:border-slate-300 hover:text-slate-900"
        >
          <Trash2 size={16} />
          Clear Chat
        </button>
      </div>

      <div className="mt-6 rounded-xl bg-slate-50 p-4 shadow-inner">
        <div className="h-[28rem] overflow-y-auto rounded-xl bg-white p-4 shadow">
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
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="text-sm leading-6">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping ? (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600 shadow">
                  AI is typing...
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-white p-4 shadow">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about agreements, clauses, compliance, or legal documents..."
              rows={3}
              className="min-h-[88px] flex-1 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={isTyping}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
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
