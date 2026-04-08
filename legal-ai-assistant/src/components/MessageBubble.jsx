function MessageBubble({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'max-w-[85%] rounded-2xl p-4 shadow-sm sm:max-w-[80%]',
          isUser
            ? 'border border-sky-200 bg-sky-50 text-slate-900'
            : 'border border-slate-200 bg-white text-slate-700',
        ].join(' ')}
      >
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {isUser ? 'User' : 'Assistant'}
        </p>
        <p className="text-sm leading-7 sm:text-[15px]">{content}</p>
      </div>
    </div>
  )
}

export default MessageBubble
