function InputBar({ value, onChange, onSend, isLoading }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isLoading) {
      onSend()
    }
  }

  return (
    <div className="rounded-lg shadow p-4 bg-white">
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 disabled:bg-slate-100"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={isLoading}
          className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  )
}

export default InputBar
