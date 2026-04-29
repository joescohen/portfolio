import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { StatBadge } from '../components/StatBadge'
import { SectionLabel } from '../components/SectionLabel'

export function VoyageProject() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <div className="bg-gradient-to-r from-teal-700 to-teal-900 px-6 lg:px-12 py-10">
        <Link to="/" className="text-white/50 text-xs hover:text-white/80 mb-4 block transition-colors">
          ← Projects
        </Link>
        <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
          Full-Stack Web Application
        </p>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Voyage</h1>
        <p className="text-white/75 text-sm mb-5">
          AI-powered travel planning — built with Next.js, Claude AI, and SQLite
        </p>
        <div className="flex flex-wrap gap-2">
          <StatBadge label="Next.js 15" variant="primary" />
          <StatBadge label="Claude AI" />
          <StatBadge label="SQLite" />
          <StatBadge label="Leaflet Maps" />
          <StatBadge label="JWT Auth" />
        </div>
      </div>

      <div className="px-6 lg:px-12 py-12 max-w-3xl mx-auto">
        <div className="bg-teal-50 rounded-2xl p-10 border border-teal-200 text-center">
          <div className="w-16 h-16 bg-teal-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">🗺</span>
          </div>
          <SectionLabel>Live Application</SectionLabel>
          <p className="text-slate-600 text-sm mb-6 max-w-sm mx-auto">
            A full-stack travel planning app with AI chat, interactive Leaflet maps, and itinerary
            management. Plan trips, explore destinations, and collaborate with an AI travel assistant.
          </p>
          <a
            href="https://voyageapp.travel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-teal-700 hover:bg-teal-800 text-white font-bold px-8 py-3 rounded-lg transition-colors text-sm"
          >
            Open Voyage →
          </a>
        </div>
      </div>
    </div>
  )
}
