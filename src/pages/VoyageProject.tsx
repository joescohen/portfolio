import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { StatBadge } from '../components/StatBadge'
import { SectionLabel } from '../components/SectionLabel'
import { VoyageGlobe } from '../components/visuals/VoyageGlobe'

export function VoyageProject() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Nav />

      {/* Dark hero with 3D globe */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-14 flex flex-col lg:flex-row items-center gap-6">

          {/* Left: text + CTA */}
          <div className="lg:w-1/2 z-10">
            <Link to="/" viewTransition className="text-white/40 text-xs hover:text-white/70 mb-5 block transition-colors">
              ← Projects
            </Link>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-3">
              Full-Stack Web Application
            </p>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">Voyage</h1>
            <p className="text-white/60 text-sm mb-6 max-w-sm leading-relaxed">
              AI-powered travel planning with Claude AI, interactive maps, and real-time itinerary management.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              <StatBadge label="Next.js 15" variant="primary" />
              <StatBadge label="Claude AI" />
              <StatBadge label="SQLite" />
              <StatBadge label="Leaflet Maps" />
              <StatBadge label="JWT Auth" />
            </div>
            <a
              href="https://voyageapp.travel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-7 py-3 rounded-lg transition-colors text-sm"
            >
              Open Voyage →
            </a>
          </div>

          {/* Right: 3D globe */}
          <div className="lg:w-1/2 w-full flex flex-col items-center">
            <VoyageGlobe className="w-full h-72 lg:h-[400px]" />
            <p className="text-white/25 text-xs -mt-4">drag to explore</p>
          </div>

        </div>
      </div>

      {/* App preview section */}
      <div className="px-6 lg:px-12 py-16 max-w-4xl mx-auto">
        <SectionLabel>Live App</SectionLabel>
        <p className="text-slate-500 text-sm mb-8 max-w-lg leading-relaxed">
          Full-stack travel planning with AI chat, interactive Leaflet maps, and itinerary management.
          Plan trips, explore destinations, and collaborate with an AI travel assistant.
        </p>

        <a
          href="https://voyageapp.travel"
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-teal-200/40">
            {/* Browser chrome */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 border border-slate-200 flex items-center gap-1.5">
                <span className="text-slate-300">🔒</span> voyageapp.travel
              </div>
              <span className="text-teal-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Open →
              </span>
            </div>

            {/* App mockup */}
            <div className="bg-slate-800 flex" style={{ height: '220px' }}>
              {/* Sidebar */}
              <div className="w-48 bg-slate-900 border-r border-slate-700 p-4 flex flex-col gap-2.5 flex-shrink-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded bg-teal-500/50" />
                  <div className="h-3 bg-teal-400/30 rounded w-14" />
                </div>
                {([80, 60, 75, 50] as number[]).map((w, i) => (
                  <div key={i} className="h-2.5 bg-slate-700 rounded" style={{ width: `${w}%` }} />
                ))}
                <div className="mt-auto border-t border-slate-700 pt-3 flex flex-col gap-2">
                  <div className="h-2 bg-teal-500/25 rounded w-20" />
                  {([65, 50, 58] as number[]).map((w, i) => (
                    <div key={i} className="h-2 bg-slate-600 rounded" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>

              {/* Map area */}
              <div className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700" />
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-[0.07]" style={{
                  backgroundImage: 'linear-gradient(#4dd0e1 1px, transparent 1px), linear-gradient(90deg, #4dd0e1 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }} />
                {/* Map pins */}
                <div className="absolute top-[38%] left-[28%] w-3 h-3 rounded-full bg-orange-400 ring-2 ring-orange-400/30 shadow-lg" />
                <div className="absolute top-[52%] left-[45%] w-3 h-3 rounded-full bg-orange-400 ring-2 ring-orange-400/30 shadow-lg" />
                <div className="absolute top-[30%] left-[58%] w-2.5 h-2.5 rounded-full bg-orange-300 ring-2 ring-orange-300/25" />
                <div className="absolute top-[60%] left-[20%] w-2 h-2 rounded-full bg-teal-400" />

                {/* Chat panel */}
                <div className="absolute top-0 right-0 bottom-0 w-44 bg-slate-800/95 border-l border-slate-600 p-3 flex flex-col gap-2.5">
                  <div className="h-2.5 bg-teal-400/35 rounded w-16" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="h-7 bg-slate-700 rounded-lg rounded-tl-none px-2 flex items-center">
                      <div className="h-1.5 bg-slate-500 rounded w-4/5" />
                    </div>
                    <div className="h-7 bg-teal-600/30 rounded-lg rounded-tr-none px-2 flex items-center self-end w-4/5">
                      <div className="h-1.5 bg-teal-400/40 rounded w-full" />
                    </div>
                    <div className="h-10 bg-slate-700 rounded-lg rounded-tl-none px-2 pt-2 flex flex-col gap-1.5">
                      <div className="h-1.5 bg-slate-500 rounded w-full" />
                      <div className="h-1.5 bg-slate-500 rounded w-3/4" />
                    </div>
                  </div>
                  <div className="flex gap-1 mt-auto">
                    <div className="flex-1 h-6 bg-slate-700 rounded border border-slate-600" />
                    <div className="w-6 h-6 bg-teal-500/60 rounded flex items-center justify-center">
                      <div className="w-2 h-2 border-r border-t border-white/70 rotate-45 -ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-3 group-hover:text-teal-600 transition-colors">
            voyageapp.travel — click to explore
          </p>
        </a>
      </div>
    </div>
  )
}
