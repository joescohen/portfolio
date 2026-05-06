import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { StatBadge } from '../components/StatBadge'
import { TabNav } from '../components/TabNav'
import { Overview } from '../projects/sepal/tabs/Overview'
import { Architecture } from '../projects/sepal/tabs/Architecture'
import { Skills } from '../projects/sepal/tabs/Skills'
import { Engine } from '../projects/sepal/tabs/Engine'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'skills', label: 'Skills & Agents' },
  { id: 'engine', label: 'Engine' },
]

const TAB_COMPONENTS: Record<string, React.ComponentType> = {
  overview: Overview,
  architecture: Architecture,
  skills: Skills,
  engine: Engine,
}

const ARCHITECTURE_LAYERS = [
  { label: 'L3 Institutional', sub: 'Cross-program learning' },
  { label: 'L2 Program Model', sub: 'Lifecycle orchestration' },
  { label: 'L1 Process Engine', sub: 'Agent runtime' },
  { label: 'L0 Skills', sub: '20 skills · 8 domains' },
]

export function SepalProject() {
  const [activeTab, setActiveTab] = useState('overview')
  const ActiveComponent = TAB_COMPONENTS[activeTab]

  return (
    <div className="min-h-screen bg-zinc-50">
      <Nav />

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-14 flex flex-col lg:flex-row items-start gap-10">

          {/* Left: title + meta */}
          <div className="lg:w-1/2 z-10">
            <Link to="/" viewTransition className="text-white/35 text-xs hover:text-white/65 mb-5 block transition-colors">
              ← Projects
            </Link>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
              AI Engineering · Systems Engineering
            </p>
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-3">
              SEPAL
            </h1>
            <p className="text-white/55 text-sm mb-2 max-w-md leading-relaxed">
              Systems Engineering Process Automation Layer — a multi-agent AI runtime for executing formal SE
              processes against real program artifacts.
            </p>
            <p className="text-white/55 text-sm mb-6 max-w-md leading-relaxed">
              Point it at your SRD, trade study, or design document — it runs a structured adversarial review
              and hands back a RID register, traceability matrix, or scored rubric in Markdown, Excel, and JSON.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <StatBadge label="3 Live Skills" variant="primary" />
              <StatBadge label="6 Agent Archetypes" variant="primary" />
              <StatBadge label="4-Level Architecture" />
              <StatBadge label="20 Skills Planned" />
              <StatBadge label="Zod Schemas" />
              <StatBadge label="Claude Sonnet" />
            </div>
            <div className="flex flex-wrap gap-2">
              <div
                className="inline-flex items-center gap-2 border border-white/20 text-white/50 text-xs font-semibold px-4 py-2 rounded-lg cursor-default"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>joescohen/sepal</span>
                <svg className="w-3 h-3 ml-1 opacity-60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right: architecture stack mini-diagram */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full max-w-sm">
              <div className="text-white/25 text-xs font-mono mb-4 uppercase tracking-widest">Architecture</div>
              <div className="space-y-0">
                {ARCHITECTURE_LAYERS.map((layer, i) => (
                  <div key={layer.label}>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 text-xs font-bold">{3 - i}</span>
                      </div>
                      <div>
                        <div className="text-white text-xs font-semibold">{layer.label}</div>
                        <div className="text-white/35 text-xs">{layer.sub}</div>
                      </div>
                    </div>
                    {i < ARCHITECTURE_LAYERS.length - 1 && (
                      <div className="ml-3 flex items-center gap-3 py-1">
                        <div className="w-px h-4 bg-emerald-700/40" />
                        {i === 0 && (
                          <div className="text-violet-400/60 text-xs font-mono">ProgramSnapshot</div>
                        )}
                        {i === 1 && (
                          <div className="text-blue-400/60 text-xs font-mono">SessionResult</div>
                        )}
                        {i === 2 && (
                          <div className="text-emerald-400/60 text-xs font-mono">SkillDefinition</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Tabs flush at base of hero */}
        <div className="max-w-6xl mx-auto">
          <TabNav tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Tab content */}
      <div className="px-6 lg:px-12 max-w-5xl mx-auto">
        <ActiveComponent />
      </div>
    </div>
  )
}
