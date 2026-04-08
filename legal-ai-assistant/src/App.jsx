import { Route, Routes } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Chat from './pages/Chat'
import Generate from './pages/Generate'
import Home from './pages/Home'
import Upload from './pages/Upload'

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_28%),linear-gradient(180deg,_#f8faff_0%,_#eef2ff_48%,_#f8fafc_100%)] text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
