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
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero — UMD red/gold */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 px-6 lg:px-12 py-10">
        <Link to="/" className="text-white/50 text-xs hover:text-white/80 mb-4 block transition-colors">
          ← Projects
        </Link>
        <p className="text-xs font-bold uppercase tracking-widest text-yellow-400/80 mb-2">
          University of Maryland · 38th VFS Student Design Competition · 2021
        </p>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">
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
      </div>

      <TabNav tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      <div className="px-6 lg:px-12 py-8 max-w-5xl mx-auto">
        <ActiveComponent />
      </div>
    </div>
  )
}
