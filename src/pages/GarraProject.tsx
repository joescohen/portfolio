import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { StatBadge } from '../components/StatBadge'
import { TabNav } from '../components/TabNav'
import { Overview } from '../projects/garra/tabs/Overview'
import { CADModel } from '../projects/garra/tabs/CADModel'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'cad-model', label: '3D Model' },
]

const TAB_COMPONENTS: Record<string, React.ComponentType> = {
  overview: Overview,
  'cad-model': CADModel,
}

export function GarraProject() {
  const [activeTab, setActiveTab] = useState('overview')
  const ActiveComponent = TAB_COMPONENTS[activeTab]

  return (
    <div className="min-h-screen bg-zinc-50">
      <Nav />

      {/* Hero — UMD red/gold */}
      <div className="relative bg-gradient-to-r from-red-800 to-red-900 overflow-hidden px-6 lg:px-12 py-10">
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-950/60 pointer-events-none" />
        <div className="relative z-10">
        <Link to="/" viewTransition className="font-mono text-white/40 text-xs hover:text-white/70 mb-4 block transition-colors tracking-wide">
          ← Projects
        </Link>
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-yellow-400/70 mb-2">
          University of Maryland · 38th VFS Student Design Competition · 2021
        </p>
        <h1 className="text-4xl text-white tracking-tight mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Garra
        </h1>
        <p className="text-white/75 text-sm mb-5">
          Thrust-compounded autonomous helicopter for medical supply delivery
        </p>
        <div className="flex flex-wrap gap-2">
          <StatBadge label="1st Place Undergraduate" variant="primary" />
          <StatBadge label="Weight Optimization Bonus" />
          <StatBadge label="135 kt Top Speed" />
          <StatBadge label="50 kg Payload" />
          <StatBadge label="CATIA · Altair" />
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
