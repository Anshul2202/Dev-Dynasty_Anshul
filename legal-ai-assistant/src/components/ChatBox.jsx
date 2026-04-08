import InputBar from './InputBar'
import MessageBubble from './MessageBubble'

const messages = [
  {
    id: 1,
    role: 'assistant',
    content: 'Hello. I can help you draft agreements, review clauses, and answer legal workflow questions.',
  },
  {
    id: 2,
    role: 'user',
    content: 'Please help me draft a simple confidentiality agreement.',
  },
  {
    id: 3,
    role: 'assistant',
    content: 'Sure. I can prepare a clean first draft and structure the main obligations for both parties.',
  },
]

function ChatBox() {
  return (
    <section className="w-full max-w-3xl rounded-lg shadow p-4 bg-white">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Assistant Chat</h2>
        <p className="mt-1 text-sm text-slate-500">Ask legal drafting and document questions.</p>
      </div>

      <div className="mb-4 flex h-[420px] flex-col gap-4 overflow-y-auto rounded-lg bg-slate-100 p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} role={message.role} content={message.content} />
        ))}
      </div>

      <InputBar />
    </section>
  )
}

export default ChatBox
