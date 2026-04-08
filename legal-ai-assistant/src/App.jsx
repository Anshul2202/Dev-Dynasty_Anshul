import ChatBox from './components/ChatBox'

function App() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Legal AI Assistant</h1>
        </header>
        <ChatBox />
      </div>
    </main>
  )
}

export default App
