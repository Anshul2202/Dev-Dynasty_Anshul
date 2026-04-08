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
    <section className="min-h-screen rounded-[2rem] bg-gray-50 px-6 py-12 text-center shadow-lg sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
          <ShieldCheck size={30} />
        </div>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          AI-Powered Legal Assistant
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Ask legal questions, upload documents, and generate agreements instantly.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-slate-800"
          >
            <MessageSquare size={18} />
            Start Chat
          </Link>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow transition hover:text-slate-900"
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
              className="rounded-xl bg-white p-6 text-left shadow-lg transition hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
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
