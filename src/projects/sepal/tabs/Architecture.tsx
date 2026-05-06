import { SectionLabel } from '../../../components/SectionLabel'

const LAYERS = [
  {
    id: 'L0',
    name: 'Skills',
    color: 'text-yellow-400',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/5',
    desc: 'Declarative configuration packages — zero orchestration code, pure domain knowledge.',
    details: [
      'Agent roles, personas, and constitutional principles',
      'Input bundle slots with entrance criteria',
      'Turn sequence, phase definitions, round limits',
      'Output schemas (Zod) per agent per turn',
      'Deliverable section mapping and format',
      'Exit criteria (max rounds, convergence, etc.)',
    ],
  },
  {
    id: 'L1',
    name: 'Process Engine',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
    desc: 'The execution runtime that turns a skill definition + input documents into a structured deliverable.',
    details: [
      'Document ingestion & RAG (PDF, DOCX, XLSX, CSV)',
      'Prompt assembly: system + constitution + phase + docs + history + schema',
      'Deterministic conductor — typed state machine for turn sequencing',
      'Schema-validated structured output with retry on violation',
      'Session checkpointing — resume from any turn',
      'Quality control: persona drift detection, adversarial posture monitoring',
    ],
  },
  {
    id: 'L2',
    name: 'Program Model',
    color: 'text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/5',
    desc: 'Persistent, lifecycle-aware orchestrator for a single program.',
    details: [
      'Artifact registry with maturity tracking and change detection',
      'Finding & risk ledgers with ownership and due dates',
      'Skill chain executor (Pre-PDR, Pre-CDR, Post-Anomaly)',
      'Trigger system — event-driven skill invocation',
      'Recommendation engine — what to run next and why',
      'Program health dashboard with readiness scoring',
    ],
  },
  {
    id: 'L3',
    name: 'Institutional Layer',
    color: 'text-violet-400',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/5',
    desc: 'Cross-program learning, benchmarking, and skill evolution.',
    details: [
      'Cross-program findings corpus indexed by domain, phase, failure category',
      'Lessons learned repository — curated from anomaly investigations',
      'Skill effectiveness tracking: hit rate, false positive rate, predictive value',
      'Organizational capability maturity — measured continuously, not by appraisal',
      'Skill evolution engine — recommends constitutional principle updates',
      'Portfolio health dashboard for VP Engineering / Chief Engineer',
    ],
  },
]

const INTERFACES = [
  { from: 'L0', to: 'L1', label: 'SkillDefinition', desc: 'Declarative config consumed by the engine' },
  { from: 'L1', to: 'L2', label: 'SessionResult', desc: 'RID register, findings, risks, rubric scores, deliverable' },
  { from: 'L2', to: 'L3', label: 'ProgramSnapshot', desc: 'Health score, finding/risk summaries, execution metrics' },
]

export function Architecture() {
  return (
    <div className="py-10">
      <SectionLabel>Four-Level Architecture</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-3 max-w-2xl">
        Each level is a distinct system with its own responsibilities, data model, and interfaces —
        but they compose into a single coherent stack. Each level can evolve independently.
      </p>
      <p className="text-slate-500 text-xs leading-relaxed mb-8 max-w-2xl">
        L0 captures domain expertise. L1 handles execution mechanics. L2 handles program context.
        L3 handles organizational learning. Data flows up; feedback flows down.
      </p>

      <div className="space-y-4 mb-14">
        {LAYERS.map((layer) => (
          <div key={layer.id} className={`${layer.bg} border ${layer.border} rounded-xl p-6`}>
            <div className="flex items-baseline gap-3 mb-2">
              <span className={`${layer.color} text-xs font-bold uppercase tracking-widest`}>{layer.id}</span>
              <span className="text-slate-900 text-sm font-bold">{layer.name}</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">{layer.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {layer.details.map((d) => (
                <div key={d} className="flex gap-2 text-slate-500 text-xs">
                  <span className={`${layer.color} mt-0.5 flex-shrink-0`}>›</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>Level Interfaces</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
        Each level communicates through a single typed interface. The engine consumes SkillDefinitions;
        it produces SessionResults. The Program Model consumes SessionResults; it reports ProgramSnapshots.
      </p>

      <div className="bg-slate-950 rounded-xl p-6 mb-14">
        <div className="space-y-4">
          {INTERFACES.map((iface) => (
            <div key={iface.label} className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-shrink-0 w-24">
                <span className="text-white/40 text-xs font-mono">{iface.from}</span>
                <span className="text-white/20">→</span>
                <span className="text-white/40 text-xs font-mono">{iface.to}</span>
              </div>
              <code className="text-emerald-400 text-xs font-mono bg-emerald-500/10 px-2 py-0.5 rounded">{iface.label}</code>
              <span className="text-white/40 text-xs">{iface.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <SectionLabel>Why this architecture</SectionLabel>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          {
            q: 'Why four levels?',
            a: 'A bag of tools requires a human to know which tool to use, when, in what order, and how to connect outputs. That scales for one CSE on one program — not 15 programs with 200 engineers.',
          },
          {
            q: 'Why declarative skills?',
            a: 'The people who understand SE processes deeply are not the ones who should write orchestration code. A skill is a structured document a senior SE can review, critique, and improve.',
          },
          {
            q: 'Why a deterministic conductor?',
            a: 'Turn-taking and phase transitions are state machine operations. Using an LLM introduces hallucinated phases, skipped turns, and ignored exit criteria — documented failure modes.',
          },
          {
            q: 'Why an institutional layer?',
            a: 'Organizations lose institutional knowledge every 2–3 year rotation. The institutional layer is organizational memory that doesn\'t rotate — the actual long-term value proposition.',
          },
        ].map((item) => (
          <div key={item.q} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h4 className="font-semibold text-slate-900 text-sm mb-2">{item.q}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
