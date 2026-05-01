import { useState, useEffect, useRef, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { LetterboxdFeed } from '../components/LetterboxdFeed'
import { SysMLDiagram } from '../components/visuals/SysMLDiagram'
import { HelicopterProfile } from '../components/visuals/HelicopterProfile'
import { PipelineFlow } from '../components/visuals/PipelineFlow'
import { VoyageGlobe } from '../components/visuals/VoyageGlobe'

function VoyageVisual() {
  return (
    <div className="w-full h-full">
      <VoyageGlobe className="w-full h-full" />
    </div>
  )
}

interface Skill {
  name: string
  description: string
  href: string
}

interface Project {
  id: string
  href: string
  title: string
  category: string
  description: string
  tags: string[]
  Visual: ComponentType
  skills?: Skill[]
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
    Visual: VoyageVisual,
  },
  {
    id: 'system-validator',
    href: '/projects/system-validator',
    title: 'AI Agent Skills',
    category: 'AI Engineering',
    description: 'Claude Code skill suite — automated QA pipeline & post-run auditing',
    tags: ['Claude Code', 'Multi-Agent', 'Systems Engineering', 'TypeScript'],
    Visual: PipelineFlow,
    skills: [
      {
        name: '/system-validation',
        description: 'Multi-agent QA pipeline — Spec, Matrix, Executor, Reporter',
        href: 'https://github.com/joescohen/claude-skills',
      },
      {
        name: '/skill-auditor',
        description: 'Post-run auditor — diagnoses pipeline gaps, applies fixes',
        href: 'https://github.com/joescohen/claude-skills',
      },
    ],
  },
]

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'films', label: 'Recently Watched' },
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
  const bgClass = isEven ? 'bg-slate-900' : 'bg-navy-900'
  const textReveal = isEven ? 'reveal-from-right' : 'reveal-from-left'
  const visualReveal = isEven ? 'reveal-from-left reveal-delay-100' : 'reveal-from-right reveal-delay-100'

  const textPanel = (
    <div
      className={`${textReveal} h-full flex flex-col justify-center px-6 lg:px-12 xl:px-16 py-10 lg:py-12`}
    >
      <span className="text-white/30 text-xs font-semibold mb-2">{num}</span>
      <span className="text-orange-500 text-xs font-semibold uppercase tracking-[0.12em] mb-4">
        {project.category}
      </span>
      <h3
        className="text-4xl lg:text-5xl text-white mb-3 leading-[1.05] tracking-tight"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {project.title}
      </h3>
      <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-md">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-white/50 bg-white/5 border border-white/10 px-2.5 py-1 rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.skills && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white/20 text-[10px] uppercase tracking-[0.12em] font-semibold">
              Claude Code Skills
            </span>
            <div className="flex-1 h-px bg-white/8" />
          </div>
          <div className="flex flex-col gap-1.5">
            {project.skills.map((skill) => (
              <a
                key={skill.name}
                href={skill.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/skill flex flex-col gap-0.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-orange-500/30 rounded-sm px-3 py-2.5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-orange-500/70 group-hover/skill:text-orange-500 text-xs font-medium transition-colors"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {skill.name}
                  </span>
                  <span className="text-white/20 group-hover/skill:text-orange-500/60 text-xs transition-colors">
                    ↗
                  </span>
                </div>
                <span className="text-white/30 group-hover/skill:text-white/50 text-xs leading-relaxed transition-colors">
                  {skill.description}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
      <Link
        to={project.href}
        className="group/link relative inline-flex items-center gap-3 px-5 py-3 text-sm font-medium text-orange-200/70 hover:text-white border border-orange-500/20 hover:border-orange-500/55 rounded-sm bg-orange-500/[0.07] hover:bg-orange-500/[0.14] transition-all duration-300 hover:shadow-[0_0_28px_-4px_rgba(249,115,22,0.35)] overflow-hidden self-start"
      >
        <span className="relative z-10 tracking-wide">Explore project</span>
        <span className="relative z-10 text-orange-500/70 group-hover/link:text-orange-400 transition-colors duration-300">
          <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/[0.06] to-orange-500/0 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
      </Link>
    </div>
  )

  const visualPanel = (
    <div className={`${visualReveal} h-full min-h-[200px] lg:min-h-0`}>
      <project.Visual />
    </div>
  )

  return (
    <div className={`${bgClass} border-b border-white/5`}>
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
        <div style={{ display: activeTab === 'projects' ? 'block' : 'none' }}>
          {projects.map((p, i) => (
            <ProjectStrip key={p.id} project={p} index={i} />
          ))}
        </div>
        <div style={{ display: activeTab === 'films' ? 'block' : 'none' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
            <LetterboxdFeed />
          </div>
        </div>
      </div>
    </div>
  )
}
