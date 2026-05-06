import { SectionLabel } from '../../../components/SectionLabel'

const features = [
  {
    title: 'Document-grounded adversarial review',
    desc: 'Agents debate your actual artifact — citing page numbers, quoting sections, raising structured findings (RIDs). No hallucinated coverage; every claim is traceable to your document.',
  },
  {
    title: 'Deterministic conductor, not LLM orchestration',
    desc: 'A typed state machine manages turn order, phase transitions, and exit criteria. The LLMs argue positions and find gaps — deterministic code manages sequences reliably.',
  },
  {
    title: 'Declarative skills, zero orchestration code',
    desc: 'Each SE process is a configuration package: agent roles, constitutional principles, rubrics, schemas. A senior SE can review and improve a skill without touching engine code.',
  },
  {
    title: 'Structured output at every layer',
    desc: 'Every agent turn produces Zod-validated JSON — RIDs, findings, risk entries, rubric scores. The deliverable assembler transforms accumulated session state into review-board-ready artifacts.',
  },
]

const principles = [
  {
    label: 'Skills capture domain expertise',
    desc: 'The people who understand SE processes deeply — principal SEs, chief engineers — are not the ones who should write orchestration code. Skills are structured documents they can review, critique, and improve.',
  },
  {
    label: 'Anti-sycophancy by architecture',
    desc: 'The Challenger agent is constitutionally hardened — it cannot produce output that says "I agree" without raising a finding. Adversarial posture is monitored per round; decay triggers re-anchoring.',
  },
  {
    label: 'Institutional memory that doesn\'t rotate',
    desc: 'Defense/aerospace organizations lose institutional knowledge every 2–3 year rotation. SEPAL accumulates validated findings, lessons learned, and skill effectiveness data across every program.',
  },
]

const skills = [
  { id: 'RQG', name: 'Requirements Quality Gate', status: 'live' },
  { id: 'RTA', name: 'Requirements Traceability Audit', status: 'live' },
  { id: 'TSA', name: 'Trade Study Audit', status: 'live' },
]

export function Overview() {
  return (
    <div className="py-10 max-w-3xl">
      <SectionLabel>What it does</SectionLabel>
      <p className="text-slate-700 text-sm leading-relaxed mb-2">
        SEPAL is a multi-agent AI runtime for executing formal systems engineering processes against real program artifacts.
        Point it at your SRD, trade study, or design document — it runs a structured adversarial review and hands back a
        RID register, traceability matrix, or scored rubric in Markdown, Excel, and JSON.
      </p>
      <p className="text-slate-600 text-sm leading-relaxed mb-10">
        Built for principal systems engineers, IPT leads, and chief systems engineers in defense/aerospace who need
        rigorous, document-grounded AI evaluation of program artifacts before review boards or test campaigns.
      </p>

      <SectionLabel>Capabilities</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {features.map((f) => (
          <div key={f.title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h4 className="font-semibold text-slate-900 text-sm mb-2">{f.title}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <SectionLabel>Design principles</SectionLabel>
      <div className="space-y-4 mb-12">
        {principles.map((p) => (
          <div key={p.label} className="flex gap-4 items-start">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1" />
            </div>
            <div>
              <span className="font-semibold text-slate-900 text-sm">{p.label} — </span>
              <span className="text-slate-600 text-sm leading-relaxed">{p.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>Live skills</SectionLabel>
      <div className="space-y-2 mb-12">
        {skills.map((s) => (
          <div key={s.id} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            <code className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-mono font-semibold">{s.id}</code>
            <span className="text-slate-700 text-sm">{s.name}</span>
            <span className="ml-auto text-emerald-600 text-xs font-semibold uppercase tracking-wide">{s.status}</span>
          </div>
        ))}
      </div>

      <SectionLabel>Source</SectionLabel>
      <div className="bg-slate-950 rounded-xl p-6">
        <div>
          <p className="text-white text-sm font-semibold mb-1">joescohen/sepal</p>
          <p className="text-white/40 text-xs">TypeScript · pnpm monorepo · Private</p>
        </div>
      </div>
    </div>
  )
}
