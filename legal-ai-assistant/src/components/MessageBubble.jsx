function MessageBubble({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'max-w-[80%] rounded-lg shadow p-4 bg-white',
          isUser ? 'border border-blue-200 bg-blue-50 text-slate-900' : 'text-slate-700',
        ].join(' ')}
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
          {isUser ? 'User' : 'Assistant'}
        </p>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default MessageBubble
