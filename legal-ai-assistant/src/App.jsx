import { Scale, Sparkles } from 'lucide-react'

function App() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <section className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-sm text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <Scale size={28} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Legal AI Platform</h1>
        <p className="mt-3 text-slate-600">
          React Router and Lucide are installed, and Tailwind CSS is configured.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-slate-700">
          <Sparkles size={16} />
          Ready for the next feature
        </div>
      </section>
    </main>
  )
}

export default App
