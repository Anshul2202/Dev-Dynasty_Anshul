import ChatBox from './components/ChatBox'

function App() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center">
        <header className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
            Hackathon Demo
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Legal AI Assistant
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Draft legal content, ask questions, and explore quick AI-assisted legal guidance in a clean
            demo-ready chat experience.
          </p>
        </header>

        <ChatBox />

        <footer className="mt-6 text-center text-sm leading-6 text-slate-500 sm:mt-8">
          This AI provides general legal information and is not legal advice.
        </footer>
      </div>
    </main>
  )
}

export default App
