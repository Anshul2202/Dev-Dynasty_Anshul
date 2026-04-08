import { FileText, MessageSquare, ShieldCheck, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  {
    title: 'AI Chat',
    description:
      'Get fast, beginner-friendly legal guidance with a conversational assistant built for clarity.',
    icon: MessageSquare,
  },
  {
    title: 'Document Upload',
    description:
      'Upload files for quick AI-powered review, extraction, and simple summaries of legal content.',
    icon: Upload,
  },
  {
    title: 'Contract Generator',
    description:
      'Generate polished agreements and legal drafts faster with guided AI-assisted workflows.',
    icon: FileText,
  },
]

function Home() {
  return (
    <section className="min-h-screen rounded-[2rem] border border-white/80 bg-white/85 px-6 py-12 text-center shadow-[0_24px_70px_-30px_rgba(79,70,229,0.28)] backdrop-blur sm:px-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-[0_20px_40px_-18px_rgba(79,70,229,0.8)]">
          <ShieldCheck size={30} />
        </div>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
          AI-Powered Legal Assistant
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          Ask legal questions, upload documents, and generate agreements instantly.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-[0_18px_34px_-18px_rgba(79,70,229,0.85)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            <MessageSquare size={18} />
            Start Chat
          </Link>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-[0_18px_34px_-24px_rgba(15,23,42,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700"
          >
            <Upload size={18} />
            Upload Document
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <article
              key={feature.title}
              className="rounded-[1.5rem] border border-slate-100 bg-white p-6 text-left shadow-[0_20px_40px_-26px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(79,70,229,0.22)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon size={22} />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Home
