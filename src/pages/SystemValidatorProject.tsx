import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { StatBadge } from '../components/StatBadge'
import { TabNav } from '../components/TabNav'
import { Overview } from '../projects/system-validator/tabs/Overview'
import { Architecture } from '../projects/system-validator/tabs/Architecture'
import { Agents } from '../projects/system-validator/tabs/Agents'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'System Design' },
  { id: 'agents', label: 'Agent Interfaces' },
]

const TAB_COMPONENTS: Record<string, React.ComponentType> = {
  overview: Overview,
  architecture: Architecture,
  agents: Agents,
}

const PIPELINE_STAGES = [
  { label: 'Conductor', sub: 'Pre-flight' },
  { label: 'Spec Agent', sub: 'specification.md' },
  { label: 'Matrix Agent', sub: 'validation-matrix.md' },
  { label: 'Executor ×N', sub: 'Parallel · browser' },
  { label: 'Reporter', sub: 'audit-report.md' },
]

export function SystemValidatorProject() {
  const [activeTab, setActiveTab] = useState('overview')
  const ActiveComponent = TAB_COMPONENTS[activeTab]

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-950 via-violet-950 to-indigo-950">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-14 flex flex-col lg:flex-row items-start gap-10">

          {/* Left: title + meta */}
          <div className="lg:w-1/2 z-10">
            <Link to="/" className="text-white/35 text-xs hover:text-white/65 mb-5 block transition-colors">
              ← Projects
            </Link>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">
              Claude Code Skill · Multi-Agent System
            </p>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
              System Validator
            </h1>
            <p className="text-white/55 text-sm mb-6 max-w-md leading-relaxed">
              A <code className="text-violet-300 font-mono bg-white/5 px-1.5 py-0.5 rounded">/system-validation</code> Claude Code skill that orchestrates a five-agent QA pipeline —
              from automated spec generation through parallel browser execution to a structured audit report.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <StatBadge label="5 Agents" variant="primary" />
              <StatBadge label="4 Gates" />
              <StatBadge label="Parallel Execution" />
              <StatBadge label="STAMP Risk Model" />
              <StatBadge label="Claude Haiku" />
            </div>
            <a
              href="https://github.com/joescohen/system-validation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-violet-400/60 hover:bg-white/5 transition-colors text-white/70 hover:text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              joescohen/system-validation
            </a>
          </div>

          {/* Right: pipeline mini-diagram */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full max-w-sm">
              <div className="text-white/25 text-xs font-mono mb-4 uppercase tracking-widest">Pipeline</div>
              <div className="space-y-0">
                {PIPELINE_STAGES.map((stage, i) => (
                  <div key={stage.label}>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-violet-300 text-xs font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <div className="text-white text-xs font-semibold">{stage.label}</div>
                        <div className="text-white/35 text-xs">{stage.sub}</div>
                      </div>
                    </div>
                    {i < PIPELINE_STAGES.length - 1 && (
                      <div className="ml-3 flex items-center gap-3 py-1">
                        <div className="w-px h-4 bg-violet-700/40" />
                        {i === 1 && (
                          <div className="text-orange-400/60 text-xs font-mono">Gate 1: calibration</div>
                        )}
                        {i === 2 && (
                          <div className="text-violet-400/60 text-xs font-mono">Gate 2: parallel dispatch</div>
                        )}
                        {i === 3 && (
                          <div className="text-violet-400/60 text-xs font-mono">Gate 3: aggregate</div>
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
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
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
