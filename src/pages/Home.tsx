import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { LetterboxdFeed } from '../components/LetterboxdFeed'

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
    id: 'garra',
    href: '/projects/garra',
    title: 'Garra',
    description: '1st place VFS SDC — autonomous VTOL helicopter design',
    tags: ['CATIA', 'Helicopter Design', 'VFS', 'Altair'],
    thumbClass: 'bg-gradient-to-br from-red-800 to-red-600',
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

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'films', label: 'Films' },
]

export function Home() {
  const [activeTab, setActiveTab] = useState('projects')

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero + tabs as one unified block */}
      <div className="bg-navy px-6 lg:px-12 pt-16 pb-0">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-3">
          Portfolio
        </p>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
          Joe Cohen
        </h1>
        <p className="text-white/70 text-base mb-1">
          Systems Engineer · Northrop Grumman
        </p>
        <p className="text-white/50 text-sm mb-8">
          MS Systems Engineering · JHU &nbsp;·&nbsp; BS Aerospace Engineering · UMD
        </p>

        {/* Tabs flush at base of hero */}
        <div className="flex gap-0 -mb-px">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-white border-orange-500'
                  : 'text-white/40 border-transparent hover:text-white/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 lg:px-12 py-12 max-w-5xl mx-auto">
        {activeTab === 'projects' ? (
          <>
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
          </>
        ) : (
          <LetterboxdFeed />
        )}
      </div>
    </div>
  )
}
