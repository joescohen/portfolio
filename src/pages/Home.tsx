import { useState, useEffect, useRef, Suspense, lazy, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { LetterboxdFeed } from '../components/LetterboxdFeed'
import { SysMLDiagram } from '../components/visuals/SysMLDiagram'
import { HelicopterProfile } from '../components/visuals/HelicopterProfile'
import { PipelineFlow } from '../components/visuals/PipelineFlow'

const VoyageGlobe = lazy(() =>
  import('../components/visuals/VoyageGlobe').then((m) => ({ default: m.VoyageGlobe })),
)

interface Project {
  id: string
  href: string
  title: string
  category: string
  description: string
  tags: string[]
  Visual: ComponentType
}

const projects: Project[] = [
  {
    id: 'angars',
    href: '/projects/angars',
    title: 'ANGARS',
    category: 'Systems Engineering',
    description: 'Autonomous aerial refueling — JHU MBSE Capstone',
    tags: ['MBSE', 'SysML', 'Cameo', 'Systems Engineering'],
    Visual: SysMLDiagram,
  },
  {
    id: 'garra',
    href: '/projects/garra',
    title: 'Garra',
    category: 'Aerospace Design',
    description: '1st place VFS SDC — autonomous VTOL helicopter design',
    tags: ['CATIA', 'Helicopter Design', 'VFS', 'Altair'],
    Visual: HelicopterProfile,
  },
  {
    id: 'voyage',
    href: '/projects/voyage',
    title: 'Voyage',
    category: 'Web Development',
    description: 'AI-powered travel planner — Full-stack Next.js',
    tags: ['Next.js', 'React', 'Claude AI', 'SQLite'],
    Visual: () => (
      <div className="w-full h-full bg-navy-900">
        <Suspense fallback={<div className="w-full h-full bg-navy-900" />}>
          <VoyageGlobe className="w-full h-full" />
        </Suspense>
      </div>
    ),
  },
  {
    id: 'system-validator',
    href: '/projects/system-validator',
    title: 'System Validator',
    category: 'AI Engineering',
    description: 'Multi-agent QA pipeline — Claude Code skill',
    tags: ['Claude Code', 'Multi-Agent', 'Systems Engineering', 'TypeScript'],
    Visual: PipelineFlow,
  },
]

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'films', label: 'Films' },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>(
      '.reveal-element, .reveal-from-left, .reveal-from-right',
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
  return ref
}

function ProjectStrip({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 1
  const num = `#${String(index + 1).padStart(2, '0')}`
  const bgClass = isEven ? 'bg-zinc-50' : 'bg-white'
  const textReveal = isEven ? 'reveal-from-right' : 'reveal-from-left'
  const visualReveal = isEven ? 'reveal-from-left reveal-delay-100' : 'reveal-from-right reveal-delay-100'

  const textPanel = (
    <div
      className={`${textReveal} flex flex-col justify-center px-6 lg:px-12 xl:px-16 py-10 lg:py-0`}
    >
      <span className="text-zinc-400 text-xs font-semibold mb-2">{num}</span>
      <span className="text-orange-500 text-xs font-semibold uppercase tracking-[0.12em] mb-4">
        {project.category}
      </span>
      <h3
        className="text-4xl lg:text-5xl text-navy mb-3 leading-[1.05] tracking-tight"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {project.title}
      </h3>
      <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-md">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        to={project.href}
        className="group/link text-sm text-zinc-400 hover:text-orange-500 transition-colors inline-flex items-center gap-1"
      >
        View project
        <span className="inline-block transition-transform group-hover/link:translate-x-1 ease-spring">
          &rarr;
        </span>
      </Link>
    </div>
  )

  const visualPanel = (
    <div className={`${visualReveal} min-h-[200px] lg:min-h-0`}>
      <project.Visual />
    </div>
  )

  return (
    <div className={`${bgClass} border-b border-zinc-100`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
        {isEven ? (
          <>
            <div className="lg:col-span-7 order-1 lg:order-1">{visualPanel}</div>
            <div className="lg:col-span-5 order-2 lg:order-2">{textPanel}</div>
          </>
        ) : (
          <>
            <div className="lg:col-span-5 order-2 lg:order-1">{textPanel}</div>
            <div className="lg:col-span-7 order-1 lg:order-2">{visualPanel}</div>
          </>
        )}
      </div>
    </div>
  )
}

export function Home() {
  const [activeTab, setActiveTab] = useState('projects')
  const contentRef = useReveal()

  return (
    <div className="min-h-screen bg-zinc-50">
      <Nav />

      {/* Hero */}
      <div className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pt-16 pb-0">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.12em] mb-4">
            Portfolio
          </p>
          <h1
            className="text-5xl sm:text-6xl text-white leading-[0.95] tracking-tight mb-3"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Joe Cohen
          </h1>
          <p className="text-white/70 text-base mb-1">
            Systems Engineer · Northrop Grumman
          </p>
          <p className="text-white/40 text-xs tracking-wide mb-8">
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
      </div>

      {/* Content */}
      <div ref={contentRef}>
        {activeTab === 'projects' ? (
          <div>
            {projects.map((p, i) => (
              <ProjectStrip key={p.id} project={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
            <LetterboxdFeed />
          </div>
        )}
      </div>
    </div>
  )
}
