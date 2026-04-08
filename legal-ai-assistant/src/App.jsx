import { Route, Routes } from 'react-router-dom'
import Navbar from './layout/Navbar'
import AskAIPage from './pages/AskAIPage'
import GeneratePage from './pages/GeneratePage'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.45),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ask-ai" element={<AskAIPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/generate" element={<GeneratePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
