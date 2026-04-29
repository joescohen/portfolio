import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'

const projects = [
  {
    id: 'angars',
    href: '/projects/angars',
    title: 'ANGARS',
    description: 'Autonomous aerial refueling — JHU MBSE Capstone',
    tags: ['MBSE', 'SysML', 'Cameo', 'Systems Engineering'],
    thumbClass: 'bg-gradient-to-br from-navy to-navy-light',
  },
  {
    id: 'voyage',
    href: '/projects/voyage',
    title: 'Voyage',
    description: 'AI-powered travel planner — Full-stack Next.js',
    tags: ['Next.js', 'React', 'Claude AI', 'SQLite'],
    thumbClass: 'bg-gradient-to-br from-teal-600 to-teal-800',
  },
]

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <div className="bg-navy px-6 lg:px-12 py-16">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-3">
          Portfolio
        </p>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
          Joe Cohen
        </h1>
        <p className="text-white/70 text-base mb-1">
          Systems Engineer · Northrop Grumman
        </p>
        <p className="text-white/50 text-sm">
          MS Systems Engineering · JHU &nbsp;·&nbsp; BS Aerospace Engineering · UMD
        </p>
      </div>

      {/* Projects grid */}
      <div className="px-6 lg:px-12 py-12 max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-navy mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Link
              key={p.id}
              to={p.href}
              className="group block rounded-xl overflow-hidden border border-slate-200 hover:border-navy transition-colors shadow-sm hover:shadow-md"
            >
              <div className={`${p.thumbClass} h-36`} />
              <div className="p-5">
                <h3 className="font-bold text-navy text-base mb-1 group-hover:text-orange-500 transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-600 text-sm mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
