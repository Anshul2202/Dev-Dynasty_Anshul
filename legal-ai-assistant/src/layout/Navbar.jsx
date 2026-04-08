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
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl bg-white px-6 py-4 shadow">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
            <Scale size={22} />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900">LexNode AI</p>
            <p className="text-xs text-slate-500">Modern legal productivity</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
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

      <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 pb-4 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900',
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
