import { useEffect, useRef, useState } from 'react'
import InputBar from './InputBar'
import MessageBubble from './MessageBubble'

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello. I can help you draft agreements, review clauses, and answer legal workflow questions.',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    const trimmedValue = inputValue.trim()

    if (!trimmedValue) {
      return
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        role: 'user',
        content: trimmedValue,
      },
    ])
    setInputValue('')
  }

  return (
    <section className="w-full max-w-3xl rounded-lg shadow p-4 bg-white">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Assistant Chat</h2>
        <p className="mt-1 text-sm text-slate-500">Ask legal drafting and document questions.</p>
      </div>

      <div
        ref={scrollContainerRef}
        className="mb-4 flex h-[420px] flex-col gap-4 overflow-y-auto rounded-lg bg-slate-100 p-4"
      >
        {messages.map((message, index) => (
          <MessageBubble key={`${message.role}-${index}`} role={message.role} content={message.content} />
        ))}
      </div>

      <InputBar
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
      />
    </section>
  )
}

export default ChatBox
