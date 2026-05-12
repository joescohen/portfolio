import { Link } from 'react-router-dom'
import { SectionLabel } from '../../../components/SectionLabel'
import { ReviewBoardMapping } from '../diagrams/ReviewBoardMapping'

const deliverables = [
  {
    name: 'RID Register',
    sub: 'Findings × Severity × Disposition',
    detail:
      'Every finding carries an ID, a severity, a verbatim source citation, and a disposition slot. Append-only — completed sessions can never be silently rewritten.',
    accent: '#3b82f6',
  },
  {
    name: 'Coverage Matrix',
    sub: 'Requirements ↔ ConOps ↔ Verification',
    detail:
      'Traceability links rendered as a navigable matrix with gap-highlighting. Drives the difference between "we wrote a requirement" and "we verified it."',
    accent: '#10b981',
  },
  {
    name: 'Scored Rubric',
    sub: 'Criterion × Score × Rationale',
    detail:
      'Standards-grounded scoring (INCOSE rules, MIL-STDs, internal handbooks). Each score must cite the document chunk that justifies it.',
    accent: '#8b5cf6',
  },
]

const stateScoreboard = [
  { metric: '9', label: 'production skills', color: 'text-emerald-700' },
  { metric: '1,413', label: 'tests passing', color: 'text-emerald-700' },
  { metric: '21', label: 'API routes', color: 'text-emerald-700' },
  { metric: 'L2', label: 'shipped · L3 next', color: 'text-blue-700' },
]

const skills = [
  { id: 'RQG', name: 'Requirements Quality Gate', status: 'live' },
  { id: 'RTA', name: 'Requirements Traceability Audit', status: 'live' },
  { id: 'TSA', name: 'Trade Study Audit', status: 'live' },
  { id: 'ICDC', name: 'ICD Consistency Checker', status: 'live' },
  { id: 'CMW', name: 'ConOps / Mission Thread Walkthrough', status: 'live' },
  { id: 'SQR', name: 'Specification Quality Reviewer', status: 'live' },
  { id: 'DRS', name: 'Design Review Simulation (SRR/SDR/PDR/CDR)', status: 'live' },
  { id: 'AIA', name: 'Anomaly Investigation Auditor', status: 'live' },
  { id: 'ECHO', name: 'Echo (integration test harness)', status: 'test' },
]

export function Overview() {
  return (
    <div className="py-10 max-w-3xl">
      <SectionLabel>The gap SEPAL fills</SectionLabel>
      <p className="text-slate-700 text-sm leading-relaxed mb-3">
        Every serious engineering program runs review boards — SRR, PDR, CDR, anomaly reviews — where senior
        engineers find what less-experienced reviewers miss. That judgment lives in people who rotate every 2–3 years.
        When they leave, the standard leaves with them.
      </p>
      <p className="text-slate-700 text-sm leading-relaxed mb-3">
        SEPAL converts that review pattern into an executable runtime. Skill manifests capture how a specific
        review type ought to be conducted — agent roles, adversarial constitution, scoring rubric, exit criteria.
        The engine runs the review against your actual artifacts, agent-by-agent, citation-by-citation, and
        produces the same deliverables a review board would: a RID register, a coverage matrix, a scored rubric.
      </p>
      <p className="text-slate-600 text-sm leading-relaxed mb-10">
        Built for principal systems engineers, IPT leads, and chief systems engineers in defense and aerospace
        who need rigorous, document-grounded AI evaluation of program artifacts before review boards or test
        campaigns.
      </p>

      <SectionLabel>From review board to runtime</SectionLabel>
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-12">
        <ReviewBoardMapping />
        <p className="text-slate-500 text-xs leading-relaxed mt-2 italic text-center max-w-2xl mx-auto">
          The roles a real review board uses become the agent archetypes SEPAL runs. The artifact in the middle is
          the same artifact — only the substrate changes.
        </p>
      </div>

      <SectionLabel>What you get out</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-2xl">
        Every SEPAL run produces structured deliverables in Markdown, Excel, and JSON. Findings carry verbatim
        citations back to the source document so a human reviewer can verify in seconds — not minutes.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
        {deliverables.map((d) => (
          <div
            key={d.name}
            className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 w-1 h-full"
              style={{ backgroundColor: d.accent }}
              aria-hidden
            />
            <h4 className="font-semibold text-slate-900 text-sm mb-1">{d.name}</h4>
            <p className="text-slate-500 text-[11px] font-mono uppercase tracking-wider mb-3">{d.sub}</p>
            <p className="text-slate-600 text-xs leading-relaxed">{d.detail}</p>
          </div>
        ))}
      </div>

      <SectionLabel>Current state</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-2xl">
        v6.0 closes Layer 2: the program-aware orchestrator, the typed API surface, and the React 19 dashboard
        are all production-complete. The engine has been stable since v5.0; eval baselines are bit-identical
        before and after the v6.0 release.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
        {stateScoreboard.map((s) => (
          <div
            key={s.label}
            className="bg-white border border-slate-200 rounded-xl px-4 py-4"
          >
            <div className={`text-2xl font-extrabold tracking-tight ${s.color} leading-none`}>{s.metric}</div>
            <div className="text-slate-500 text-[11px] mt-1 leading-snug">{s.label}</div>
          </div>
        ))}
      </div>

      <SectionLabel>Live skills</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-2xl">
        Each skill is a TypeScript object literal — agent roles, constitutional principles, rubric, exit criteria —
        validated by <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">SkillDefinitionSchema</code>{' '}
        at module load. Adding a new skill requires zero engine changes.
      </p>
      <div className="space-y-2 mb-12">
        {skills.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3"
          >
            <code className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-mono font-semibold">
              {s.id}
            </code>
            <span className="text-slate-700 text-sm">{s.name}</span>
            <span
              className={`ml-auto text-xs font-semibold uppercase tracking-wide ${
                s.status === 'live' ? 'text-emerald-600' : 'text-slate-400'
              }`}
            >
              {s.status}
            </span>
          </div>
        ))}
      </div>

      <SectionLabel>What's next</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-12 max-w-2xl">
        The next investment is a full eval harness for each skill — seeded defect corpora, recall and precision
        baselines, regression gates on every release. Reliability before scale.
      </p>

      <SectionLabel>Source</SectionLabel>
      <div className="bg-slate-950 rounded-xl p-6 mb-6">
        <p className="text-white text-sm font-semibold mb-1">joescohen/sepal</p>
        <p className="text-white/40 text-xs">
          TypeScript 5.9 · Node 22 · pnpm monorepo (engine · skills · orchestrator · api · web · cli) · Private
        </p>
      </div>

      <Link
        to="/journey#platform"
        viewTransition
        className="inline-block text-slate-500 hover:text-emerald-600 text-xs font-semibold transition-colors"
      >
        Read where this fits in the journey →
      </Link>
    </div>
  )
}
