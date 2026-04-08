import { FileText, Home, MessageSquare, Scale, Upload } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/chat', label: 'Ask AI', icon: MessageSquare },
  { to: '/upload', label: 'Upload', icon: Upload },
  { to: '/generate', label: 'Generate', icon: FileText },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-40 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-[1.5rem] border border-white/70 bg-white/90 px-6 py-4 shadow-[0_18px_50px_-22px_rgba(79,70,229,0.35)] backdrop-blur">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-[0_14px_30px_-14px_rgba(79,70,229,0.7)]">
            <Scale size={22} />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900">LexNode AI</p>
            <p className="text-xs font-medium text-slate-500">Modern legal productivity</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 rounded-full bg-slate-100/80 p-2 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-indigo-600 text-white shadow-[0_14px_30px_-18px_rgba(79,70,229,0.75)]'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900',
                  ].join(' ')
                }
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>

      <nav className="mx-auto mt-3 flex max-w-6xl gap-2 overflow-x-auto px-1 pb-1 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-indigo-600 text-white shadow-[0_14px_30px_-18px_rgba(79,70,229,0.75)]'
                    : 'bg-white/90 text-slate-600 shadow hover:-translate-y-0.5 hover:text-slate-900',
                ].join(' ')
              }
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </header>
  )
}

export default Navbar
