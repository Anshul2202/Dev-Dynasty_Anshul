import { useEffect, useRef, useState } from 'react'
import InputBar from './InputBar'
import MessageBubble from './MessageBubble'
import { askAI } from '../services/api'
import { getCachedResponse, setCachedResponse } from '../services/cache'

const initialMessages = [
  {
    role: 'assistant',
    content: 'Hello. I can help you draft agreements, review clauses, and answer legal workflow questions.',
  },
]

function ChatBox() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  const handleClearChat = () => {
    if (isLoading) {
      return
    }

    setMessages(initialMessages)
    setInputValue('')
  }

  const handleSend = async () => {
    const trimmedValue = inputValue.trim()

    if (!trimmedValue || isLoading) {
      return
    }

    setMessages((currentMessages) => {
      const nextMessages = [
        ...currentMessages,
        {
          role: 'user',
          content: trimmedValue,
        },
      ]

      return nextMessages
    })
    setInputValue('')

    setIsLoading(true)

    try {
      const cachedReply = getCachedResponse(trimmedValue)
      const reply = cachedReply || await askAI(trimmedValue)

      if (!cachedReply) {
        setCachedResponse(trimmedValue, reply)
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: 'assistant',
          content: reply,
        },
      ])
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="w-full rounded-[28px] border border-white/70 bg-white/85 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Assistant Chat</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Ask legal drafting and document questions in natural language.
          </p>
        </div>
        <button
          type="button"
          onClick={handleClearChat}
          disabled={isLoading}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Clear Chat
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className="mb-4 flex h-[420px] flex-col gap-4 overflow-y-auto rounded-[22px] border border-slate-200/70 bg-gradient-to-b from-slate-50 to-slate-100/70 p-4 sm:h-[480px] sm:p-5"
      >
        {messages.map((message, index) => (
          <MessageBubble key={`${message.role}-${index}`} role={message.role} content={message.content} />
        ))}
        {isLoading ? <MessageBubble role="assistant" content="AI is typing..." /> : null}
      </div>

      <InputBar
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </section>
  )
}

export default ChatBox
