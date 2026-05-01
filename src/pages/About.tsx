import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'

const experience = [
  {
    title: 'Systems Engineer – Design, Architecture & Integration/Test',
    company: 'Northrop Grumman',
    location: 'Baltimore, MD',
    period: 'Jun 2025 – Present',
    current: true,
    bullets: [
      'Serve as Subsystem Deputy Architect driving payload design maturity through ATP and TVAC launch readiness milestones; formalized a program-wide I&T roadmap enabling on-schedule payload delivery.',
      'Lead a cross-functional team of 40 engineers across concurrent I&T campaigns — mitigating technical and schedule risks while delivering CDR presentations that secured government customer alignment.',
      'Restructured integration teams into thread-based task structures, improving multi-disciplinary collaboration and mentoring engineers across labs on I&T processes and debugging.',
    ],
  },
  {
    title: 'Principal Systems Engineer',
    company: 'Northrop Grumman',
    location: 'Baltimore, MD',
    period: 'Jun 2024 – Jun 2025',
    current: false,
    bullets: [
      'Developed system physical implementation architecture establishing payload command, control, and data flow baseline; led interface trade studies assessing complex design factors.',
      'Implemented Cameo MBSE architectures per program guidelines, improving requirements traceability; trained and mentored nine engineers on MBSE and interface-driven design methodology.',
    ],
  },
  {
    title: 'Pathways Systems Engineer',
    company: 'Northrop Grumman',
    location: 'Baltimore, MD',
    period: 'Jan 2022 – Jun 2024',
    current: false,
    bullets: [
      'Designed and built a Payload FlatSat enabling low-risk parallel test paths, reducing Payload integration time by ~50%; served as Processing Subsystem I&T Lead for a team of eight engineers.',
      'Executed a risk reduction plan compressing schedule by 1.5 weeks; automated ATP procedures via TCL scripting; applied MATLAB for probabilistic modeling and signal processing.',
    ],
  },
  {
    title: 'Associate Pathways Systems Engineer',
    company: 'Northrop Grumman',
    location: 'Baltimore, MD',
    period: 'Jul 2021 – Mar 2022',
    current: false,
    bullets: [
      'Built a Cameo MBSE tool suite from scratch automating key design functions (DXL scripts, artifact pipelines, modeling templates), reducing NRE lifecycle costs and compressing months of documentation to days.',
    ],
  },
  {
    title: 'Systems Engineer Co-op',
    company: 'Sikorsky (Lockheed Martin)',
    location: 'Stratford, CT',
    period: 'Jun 2019 – Aug 2020',
    current: false,
    bullets: [
      'Verified VH-92A (Presidential helicopter) requirements against FAA standards; authored verification reports and collaborated with IPT leads on program risk management.',
    ],
  },
]

const education = [
  {
    degree: 'MEng, Systems Engineering',
    school: 'Johns Hopkins Whiting School of Engineering',
    period: 'Graduated May 2025',
    honors: '',
  },
  {
    degree: 'BS, Aerospace Engineering',
    school: 'University of Maryland',
    period: '2016 – 2021',
    honors: "Dean's List · AIAA",
  },
]

const skillGroups = [
  {
    category: 'MBSE & Modeling',
    color: 'bg-navy/10 text-navy',
    items: ['Cameo Enterprise Architecture', 'SysML', 'Rational DOORS', 'DOORS DXL'],
  },
  {
    category: 'Systems Engineering',
    color: 'bg-orange-50 text-orange-700',
    items: ['Payload I&T', 'Systems Architecture', 'Requirements Verification', 'ATP/TVAC', 'CDR/PDR/SRR'],
  },
  {
    category: 'Software',
    color: 'bg-slate-100 text-slate-600',
    items: ['TCL', 'MATLAB', 'Python', 'C++', 'Excel VBA'],
  },
  {
    category: 'Domain',
    color: 'bg-teal-50 text-teal-700',
    items: ['Aerospace Defense', 'Space Systems', 'Satellite Payload', 'RF Systems'],
  },
]

const highlights = [
  { value: '6+', label: 'Years at Northrop Grumman' },
  { value: '40', label: 'Engineers led' },
  { value: '~50%', label: 'I&T time reduction' },
  { value: '1st', label: 'VFS SDC place' },
]

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
        {children}
      </span>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  )
}

export function About() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Nav />

      {/* Hero */}
      <div className="relative bg-navy overflow-hidden px-6 lg:px-12 py-14">
        <div className="absolute inset-0 bg-blueprint opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-3">
            About Me
          </p>
          <h1 className="text-5xl font-extrabold text-white mb-3 leading-tight">
            Joe Cohen
          </h1>
          <p className="text-white/80 text-base mb-1">
            Principal Systems Engineer · Northrop Grumman
          </p>
          <p className="font-mono text-white/40 text-xs tracking-wide mb-6">
            MEng Systems Engineering, Johns Hopkins &nbsp;·&nbsp; BS Aerospace Engineering, University of Maryland
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="mailto:jsc6121@gmail.com"
              className="flex items-center gap-1.5 text-white/60 hover:text-orange-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              jsc6121@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/josephscohen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/60 hover:text-orange-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              linkedin.com/in/josephscohen
            </a>
            <span className="flex items-center gap-1.5 text-white/60">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Baltimore, MD
            </span>
          </div>
        </div>
      </div>

      {/* Highlight stats bar */}
      <div className="bg-navy-light border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4">
          {highlights.map((h, idx) => (
            <div key={h.label} className={`py-4 px-6 ${idx === 0 ? 'pl-0' : idx % 2 === 1 ? 'border-l border-white/10' : 'md:border-l md:border-white/10'}`}>
              <div
                className="text-2xl font-bold text-orange-400 leading-none mb-1"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {h.value}
              </div>
              <div className="text-white/50 text-xs uppercase tracking-wide">
                {h.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left column — main content */}
          <div className="flex-1 min-w-0">

            {/* Summary */}
            <div className="mb-12">
              <SectionHeading>Professional Summary</SectionHeading>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                Principal Systems Engineer with 6+ years at Northrop Grumman across MBSE architecture,
                payload integration & test, and systems design on DoD defense programs. Currently serving
                as Subsystem Deputy Architect leading 40 engineers through concurrent I&T campaigns and
                CDR milestones. Expert in Cameo Enterprise Architecture and SysML — built an MBSE tool
                suite from scratch that automated workflows and reduced NRE lifecycle costs. MEng in
                Systems Engineering, Johns Hopkins (May 2025).
              </p>
            </div>

            {/* Work Experience */}
            <div className="mb-12">
              <SectionHeading>Work Experience</SectionHeading>
              <div className="relative">
                {/* Timeline spine */}
                <div className="absolute left-[7px] top-2 bottom-0 w-px bg-slate-400" />

                <div className="space-y-9">
                  {experience.map((job, i) => (
                    <div key={i} className="relative pl-7">
                      {/* Timeline node */}
                      <div
                        className={`absolute left-0 top-[5px] w-3.5 h-3.5 rounded-full border-2 ${
                          job.current
                            ? 'bg-orange-500 border-orange-500'
                            : 'bg-white border-slate-300'
                        }`}
                      />

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                        <div>
                          <h3 className="font-semibold text-navy text-[15px] leading-snug">
                            {job.title}
                          </h3>
                          <p className="text-slate-500 text-sm">
                            {job.company} · {job.location}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap self-start sm:mt-0.5 ${
                            job.current
                              ? 'bg-orange-100 text-orange-600'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {job.period}
                        </span>
                      </div>

                      <ul className="space-y-1.5">
                        {job.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="text-slate-600 text-sm leading-relaxed flex gap-2"
                          >
                            <span className="text-slate-300 mt-1.5 shrink-0">—</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects & Achievements */}
            <div className="mb-12">
              <SectionHeading>Projects & Achievements</SectionHeading>
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-xl p-5 hover:border-navy transition-colors group">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-navy text-[15px] group-hover:text-orange-500 transition-colors">
                      VFS Student Design Competition — 1st Place
                    </h3>
                    <Link
                      to="/projects/garra"
                      className="text-xs text-orange-500 hover:underline shrink-0 mt-0.5"
                    >
                      View project →
                    </Link>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Led a 9-person team to win the Vertical Flight Society's 38th Annual Competition
                    (Boeing/Altair); designed "Garra," a fully autonomous thrust-compounding helicopter
                    for medical supply delivery.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 hover:border-navy transition-colors">
                  <h3 className="font-semibold text-navy text-[15px] mb-2">
                    SSPIDR — Space Solar Power
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Contributed to successful RF-to-rectenna on-orbit energy transmission milestone on a
                    DoD-sponsored program; presented results at SATELLITE 2024 (SGx session, Space Generation
                    Advisory Council).
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-5">
                {education.map((ed, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div>
                      <h3 className="font-semibold text-navy text-[15px]">
                        {ed.degree}
                      </h3>
                      <p className="text-slate-500 text-sm">
                        {ed.school}
                        {ed.honors && (
                          <span className="ml-2 text-orange-500 font-medium">{ed.honors}</span>
                        )}
                      </p>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full self-start whitespace-nowrap">
                      {ed.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-20 space-y-8">

              {/* Skills */}
              <div>
                <SectionHeading>Skills</SectionHeading>
                <div className="space-y-5">
                  {skillGroups.map((group) => (
                    <div key={group.category}>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                        {group.category}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((skill) => (
                          <span
                            key={skill}
                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${group.color}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download / Links */}
              <div className="border-t border-slate-200 pt-6">
                <a
                  href="https://linkedin.com/in/josephscohen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-navy text-white text-sm font-medium py-2.5 rounded-lg hover:bg-navy-light transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  View LinkedIn
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
