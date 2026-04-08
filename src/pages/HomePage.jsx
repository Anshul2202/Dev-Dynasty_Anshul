import { Link } from 'react-router-dom';
import SectionBadge from '../components/SectionBadge';

const metrics = [
  { label: 'Documents generated', value: '12,430' },
  { label: 'Avg. drafting time saved', value: '92%' },
  { label: 'Businesses supported', value: '2,350' },
  { label: 'Active AI sessions', value: '573' },
];

const features = [
  {
    title: 'Instant drafting',
    description: 'Generate contracts, agreements, and business-ready documents in minutes.',
  },
  {
    title: 'Editable outputs',
    description: 'Review, revise, and personalize every clause before you export or share.',
  },
  {
    title: 'AI legal assistant',
    description: 'Ask questions, refine language, and get faster help while you prepare documents.',
  },
  {
    title: 'Document summarization',
    description: 'Upload legal files and get concise summaries of obligations, key terms, and risks.',
  },
];

function HomePage() {
  return (
    <div>
      <section className="bg-hero text-white">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge>AI-Powered Legal Workflow</SectionBadge>
            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
              AI-Powered Legal Documents in Minutes
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              Generate contracts, agreements, and legal documents easily using AI.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/generate-document" className="primary-btn min-w-[180px]">
                Create Document
              </Link>
              <Link
                to="/summarize-document"
                className="inline-flex min-w-[180px] items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                Summarize Document
              </Link>
              <Link
                to="/ai-assistant"
                className="inline-flex min-w-[180px] items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                Open AI Assistant
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-6xl rounded-[2rem] border border-white/10 bg-white text-slate-900 shadow-panel">
            <div className="flex flex-col gap-5 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium">
                  LexNode Workspace
                </div>
                <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-500">
                  Overview
                </div>
                <div className="rounded-xl px-4 py-2 text-sm text-slate-400">Templates</div>
                <div className="rounded-xl px-4 py-2 text-sm text-slate-400">Assistant</div>
              </div>
              <div className="w-full max-w-xs rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-400">
                Search documents...
              </div>
            </div>

            <div className="p-5 lg:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="section-title">Dashboard</p>
                  <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    A clean legal operations workspace for drafting, automation, and AI support.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">
                  Apr 1, 2026 - Apr 8, 2026
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">{metric.label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                <div className="rounded-3xl border border-slate-200 p-5">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-950">Automation Overview</h2>
                    <p className="text-sm text-slate-500">Drafting activity across your workflow.</p>
                  </div>
                  <div className="flex h-72 items-end gap-3">
                    {[68, 32, 54, 74, 20, 48, 42, 18, 53, 19, 31, 67].map((height, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center gap-3">
                        <div
                          className="w-full rounded-t-xl bg-slate-900"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-xs text-slate-400">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 p-5">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-950">Why teams choose LexNode</h2>
                    <p className="text-sm text-slate-500">Built for speed, control, and clarity.</p>
                  </div>
                  <div className="space-y-4">
                    {features.map((feature) => (
                      <div key={feature.title} className="rounded-2xl bg-slate-50 p-4">
                        <p className="font-semibold text-slate-900">{feature.title}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                    New Workflow
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                    Summarize uploaded agreements in simple language
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                    Upload `.txt`, `.pdf`, or `.docx` files and let LexNode extract the text,
                    highlight obligations, and surface practical risks in a concise summary.
                  </p>
                  <Link to="/summarize-document" className="primary-btn mt-6">
                    Try Summarization
                  </Link>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <h2 className="text-lg font-semibold text-slate-950">Built for everyday legal work</h2>
                  <div className="mt-5 space-y-4">
                    {[
                      'Generate NDAs and agreements',
                      'Chat with LexNode AI for simple explanations',
                      'Summarize uploaded contracts with key risks',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-500" />
                        <p className="text-sm leading-6 text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
