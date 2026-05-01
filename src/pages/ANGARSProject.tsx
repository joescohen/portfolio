import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { StatBadge } from '../components/StatBadge'
import { TabNav } from '../components/TabNav'
import { Overview } from '../projects/angars/tabs/Overview'
import { ProblemConops } from '../projects/angars/tabs/ProblemConops'
import { Requirements } from '../projects/angars/tabs/Requirements'
import { SystemDesign } from '../projects/angars/tabs/SystemDesign'
import { TradeStudy } from '../projects/angars/tabs/TradeStudy'
import { Results } from '../projects/angars/tabs/Results'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'conops', label: 'Problem & CONOPS' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'system-design', label: 'System Design' },
  { id: 'trade-study', label: 'Trade Study' },
  { id: 'results', label: 'Results' },
]

const TAB_COMPONENTS: Record<string, React.ComponentType> = {
  overview: Overview,
  conops: ProblemConops,
  requirements: Requirements,
  'system-design': SystemDesign,
  'trade-study': TradeStudy,
  results: Results,
}

export function ANGARSProject() {
  const [activeTab, setActiveTab] = useState('overview')
  const ActiveComponent = TAB_COMPONENTS[activeTab]

  return (
    <div className="min-h-screen bg-zinc-50">
      <Nav />

      {/* Hero */}
      <div className="relative bg-gradient-to-r from-navy to-navy-light overflow-hidden px-6 lg:px-12 py-10">
        <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/60 pointer-events-none" />
        <div className="relative z-10">
        <Link to="/" viewTransition className="text-white/40 text-xs hover:text-white/70 mb-4 block transition-colors">
          ← Projects
        </Link>
        <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
          Johns Hopkins University · Systems Engineering Capstone · Spring 2025
        </p>
        <h1 className="text-5xl font-extrabold text-white leading-tight mb-1">
          ANGARS
        </h1>
        <p className="text-white/75 text-sm mb-5">
          Autonomous Next-Generation Aerial Refueling System
        </p>
        <div className="flex flex-wrap gap-2">
          <StatBadge label="189 Requirements" variant="primary" />
          <StatBadge label="10 KPPs" />
          <StatBadge label="6 Subsystems" />
          <StatBadge label="76.7% Quantitative" />
          <StatBadge label="MBSE · Cameo" />
        </div>
        </div>{/* end z-10 */}
      </div>

      <TabNav tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      <div className="px-6 lg:px-12 py-8 max-w-5xl mx-auto">
        <ActiveComponent />
      </div>
    </div>
  )
}
