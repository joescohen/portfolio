import { SectionLabel } from '../../../components/SectionLabel'

const ARCHETYPES = [
  { name: 'Advocate', color: 'text-blue-400', desc: 'Presents, defends, explains. Represents the artifact author\'s intent. Cites evidence, acknowledges gaps, proposes dispositions.' },
  { name: 'Challenger', color: 'text-red-400', desc: 'Probes, questions, demands evidence. Raises structured findings (RIDs). Anti-sycophancy hardened — cannot agree without a finding.' },
  { name: 'Evaluator', color: 'text-green-400', desc: 'Silent observer. Scores against rubric. Detects unstated assumptions, contradictions, deflections. Never participates — only judges.' },
  { name: 'Cross-Checker', color: 'text-yellow-400', desc: 'Compares two artifacts for consistency at the parameter level — signal names, data types, units. Produces discrepancy registers.' },
  { name: 'Perspective', color: 'text-purple-400', desc: 'Represents a specific stakeholder viewpoint (operator, maintainer, safety). Scoped tunnel vision by design.' },
  { name: 'Generator', color: 'text-orange-400', desc: 'Produces a new artifact from inputs + standards. Builds risk entries, verification matrices, trace mappings. Output-oriented.' },
]

const DOMAINS = [
  {
    id: 'D1', name: 'Requirements & Specs', color: 'text-blue-400',
    skills: ['Requirements Quality Gate', 'Specification Quality Reviewer', 'ICD Consistency Checker'],
  },
  {
    id: 'D2', name: 'Design & Architecture', color: 'text-green-400',
    skills: ['Design Review Simulation (SRR/SDR/PDR/CDR)', 'Trade Study Rigor Auditor', 'Architecture Completeness Checker'],
  },
  {
    id: 'D3', name: 'Verification & Validation', color: 'text-cyan-400',
    skills: ['VCRM Generator', 'Test Readiness Review Asst.', 'Test Coverage Analyzer'],
  },
  {
    id: 'D4', name: 'Risk & Reliability', color: 'text-red-400',
    skills: ['Technical Risk Register Builder', 'FMEA/FMECA Quality Auditor'],
  },
  {
    id: 'D5', name: 'Concept & Operations', color: 'text-amber-400',
    skills: ['ConOps / Mission Thread Walkthrough', 'Stakeholder Needs Elicitation Auditor'],
  },
  {
    id: 'D6', name: 'Program Mgmt & Process', color: 'text-violet-400',
    skills: ['SEMP / SE Plan Auditor', 'Technical Baseline Audit', 'Lessons Learned Retrieval'],
  },
  {
    id: 'D7', name: 'Integration & Test', color: 'text-emerald-400',
    skills: ['Anomaly Investigation Auditor', 'Config Audit Simulator (FCA/PCA)'],
  },
  {
    id: 'D8', name: 'Human Factors & Safety', color: 'text-pink-400',
    skills: ['Human Factors Design Review', 'System Safety Hazard Analysis Auditor'],
  },
]

const STANDARDS = [
  'INCOSE SE Handbook v5.0',
  'INCOSE Guide for Writing Requirements (2023)',
  'IEEE 15288:2023',
  'IEEE 29148',
  'IEEE 1220-2005',
  'NPR 7123.1D (NASA)',
  'MIL-STD-882E',
  'MIL-STD-961E',
  'DAU Trade Study Guidebook',
]

const amber = '#fbbf24'
const blue = '#60a5fa'
const purple = '#a78bfa'
const red = '#ef4444'
const arrowClr = 'rgba(255,255,255,0.32)'
const lc = 'rgba(255,255,255,0.48)'
const mono = "'JetBrains Mono', monospace"
const sans = "'DM Sans', sans-serif"

function HArrow({ x1, y, x2 }: { x1: number; y: number; x2: number }) {
  return (
    <>
      <line x1={x1} y1={y} x2={x2 - 6} y2={y} stroke={arrowClr} strokeWidth="1.5" />
      <polygon points={`${x2 - 7},${y - 4} ${x2},${y} ${x2 - 7},${y + 4}`} fill={arrowClr} />
    </>
  )
}

function VArrow({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <>
      <line x1={x} y1={y1} x2={x} y2={y2 - 6} stroke={arrowClr} strokeWidth="1.5" />
      <polygon points={`${x - 4},${y2 - 7} ${x},${y2} ${x + 4},${y2 - 7}`} fill={arrowClr} />
    </>
  )
}

function SkillLifecycleDiagram() {
  const yamlLines: [string, string, string][] = [
    ['name: ', 'requirements-review', `${amber}cc`],
    ['version: ', '2.1.0', 'rgba(255,255,255,0.72)'],
    ['trigger: ', 'phase-gate', `${amber}cc`],
    ['agent: ', 'deep-analyst', `${amber}cc`],
    ['inputs: ', '[spec, arch, risks]', `${amber}cc`],
    ['rubric: ', 'rubrics/req-v3.md', `${amber}cc`],
    ['output_schema: ', 'finding.json', `${amber}cc`],
    ['constraints:', '', ''],
    ['  max_tokens: ', '8192', `${red}cc`],
    ['  max_turns: ', '5', `${red}cc`],
    ['  min_confidence: ', '0.7', `${red}cc`],
  ]

  const downstream = [
    { label: 'Context Assembler', sub: 'Packs rubric into prompt', y: 198 },
    { label: 'Conductor', sub: 'Reads trigger + constraints', y: 256 },
    { label: 'QC Gate', sub: 'Validates vs output_schema', y: 314 },
  ]

  const keyItems = [
    { color: amber, label: 'Human-authored config', x: 8 },
    { color: blue, label: 'Deterministic code', x: 170 },
    { color: purple, label: 'Resolved artifact', x: 300 },
    { color: red, label: 'Error / rejection path', x: 420 },
  ]

  return (
    <div className="overflow-x-auto rounded-xl" style={{ background: '#080d18', padding: '20px 16px 14px' }}>
      <svg
        viewBox="0 0 660 392"
        className="w-full min-w-[580px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="L0 skill lifecycle — skill.yaml parsed by Skill Loader into SkillSpec, then consumed by Context Assembler, Conductor, and QC Gate"
      >
        {/* ── skill.yaml ── */}
        <rect x={8} y={18} width={197} height={220} rx={8} stroke={amber} strokeWidth="1.5" fill={`${amber}10`} />
        <text x={20} y={40} fontSize="7.5" fontFamily={sans} fontWeight="700" fill={amber} letterSpacing="0.12em">HUMAN-AUTHORED</text>
        <text x={20} y={57} fontSize="14" fontFamily={sans} fontWeight="700" fill={amber}>skill.yaml</text>
        {yamlLines.map(([label, val, vc], i) => (
          <text key={i} x={20} y={75 + i * 14} fontSize="9" fontFamily={mono}>
            <tspan fill={lc}>{label}</tspan>
            {val && <tspan fill={vc}>{val}</tspan>}
          </text>
        ))}

        {/* ── Skill Loader ── */}
        <rect x={228} y={18} width={195} height={218} rx={8} stroke={blue} strokeWidth="1.5" fill={`${blue}10`} />
        <text x={240} y={40} fontSize="7.5" fontFamily={sans} fontWeight="700" fill={blue} letterSpacing="0.12em">DETERMINISTIC CODE</text>
        <text x={240} y={57} fontSize="14" fontFamily={sans} fontWeight="700" fill={blue}>Skill Loader</text>
        {['1. Parse YAML', '2. Validate schema', '3. Resolve $refs', '4. Inline rubric text', '5. Freeze constraints'].map((s, i) => (
          <text key={s} x={240} y={76 + i * 17} fontSize="10" fontFamily={sans} fill="rgba(255,255,255,0.72)">{s}</text>
        ))}
        <text x={240} y={178} fontSize="9" fontFamily={sans} fill="rgba(255,255,255,0.33)" fontStyle="italic">Zero LLM calls.</text>
        <text x={240} y={193} fontSize="9" fontFamily={sans} fill="rgba(255,255,255,0.33)" fontStyle="italic">Pure parse + validate.</text>

        {/* ── Schema invalid ── */}
        <rect x={263} y={254} width={128} height={34} rx={6} stroke={red} strokeWidth="1.5" fill={`${red}12`} />
        <text x={327} y={275} fontSize="11" fontFamily={sans} fontWeight="700" fill={red} textAnchor="middle">✕ Schema invalid</text>

        {/* ── SkillSpec ── */}
        <rect x={448} y={18} width={204} height={162} rx={8} stroke={purple} strokeWidth="1.5" fill={`${purple}10`} />
        <text x={460} y={40} fontSize="7.5" fontFamily={sans} fontWeight="700" fill={purple} letterSpacing="0.12em">RESOLVED OBJECT</text>
        <text x={460} y={57} fontSize="14" fontFamily={sans} fontWeight="700" fill={purple}>SkillSpec</text>
        {['.trigger_config', '.rubric_text', '.output_schema', '.constraint_set', '.agent_archetype'].map((f, i) => (
          <text key={f} x={460} y={76 + i * 16} fontSize="10" fontFamily={mono} fill={`${purple}aa`}>{f}</text>
        ))}

        {/* ── Downstream boxes ── */}
        {downstream.map(({ label, sub, y }) => (
          <g key={label}>
            <rect x={448} y={y} width={204} height={44} rx={6} stroke={blue} strokeWidth="1.5" fill={`${blue}08`} />
            <text x={550} y={y + 18} fontSize="11" fontFamily={sans} fontWeight="700" fill={blue} textAnchor="middle">{label}</text>
            <text x={550} y={y + 33} fontSize="9" fontFamily={sans} fill="rgba(255,255,255,0.4)" textAnchor="middle">{sub}</text>
          </g>
        ))}

        {/* ── Arrows ── */}
        <HArrow x1={205} y={130} x2={228} />
        <HArrow x1={423} y={100} x2={448} />
        <VArrow x={327} y1={236} y2={254} />
        <VArrow x={550} y1={180} y2={198} />
        <VArrow x={550} y1={242} y2={256} />
        <VArrow x={550} y1={300} y2={314} />

        {/* ── Visual key ── */}
        {keyItems.map(({ color, label, x }) => (
          <g key={label}>
            <rect x={x} y={368} width={10} height={10} rx={2} fill={color} opacity={0.72} />
            <text x={x + 14} y={377} fontSize="9" fontFamily={sans} fill="rgba(255,255,255,0.38)">{label}</text>
          </g>
        ))}
      </svg>
      <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.28)', fontStyle: 'italic', marginTop: '6px' }}>
        L0 involves <strong style={{ color: blue, fontStyle: 'normal' }}>zero LLM calls</strong>.
        Domain experts author skills — they never touch a model.
      </p>
    </div>
  )
}

export function Skills() {
  return (
    <div className="py-10">
      <SectionLabel>Agent Archetypes</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
        Every agent in every skill is an instance of one of six archetypes. The archetype determines
        base behavioral patterns; the skill config specializes them for each SE process.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-14">
        {ARCHETYPES.map((a) => (
          <div key={a.name} className="bg-slate-950 rounded-xl p-5">
            <div className={`${a.color} text-xs font-bold uppercase tracking-widest mb-2`}>{a.name}</div>
            <p className="text-white/60 text-xs leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </div>

      <SectionLabel>Skill Inventory — 20 Skills, 8 Domains</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
        Each skill defines one SE process workflow producing one recognizable SE artifact. Skills contain
        zero orchestration code — they specify agents, documents, interactions, schemas, and deliverables.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-14">
        {DOMAINS.map((d) => (
          <div key={d.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="flex items-baseline gap-2 mb-3">
              <span className={`${d.color} text-xs font-bold`}>{d.id}</span>
              <span className="text-slate-900 text-sm font-semibold">{d.name}</span>
            </div>
            <ul className="space-y-1">
              {d.skills.map((s) => (
                <li key={s} className="flex gap-2 text-slate-500 text-xs">
                  <span className="text-slate-300 flex-shrink-0">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SectionLabel>L0 — How a Skill Becomes Executable</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-2xl">
        Skill files are human-authored YAML — no code, no model invocation. The Skill Loader parses,
        validates the schema, resolves external references, inlines rubric text, and freezes constraints
        before any agent runs. The resulting <code className="text-slate-500 text-xs bg-slate-100 px-1 py-0.5 rounded">SkillSpec</code> object
        is what the engine actually executes against.
      </p>
      <div className="mb-14">
        <SkillLifecycleDiagram />
      </div>

      <SectionLabel>Standards Grounding</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-2xl">
        Skills are grounded in and cite from established systems engineering standards. Agent constitutions
        reference specific sections; rubrics derive evaluation dimensions from these frameworks.
      </p>
      <div className="flex flex-wrap gap-2">
        {STANDARDS.map((s) => (
          <span key={s} className="text-xs text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg">
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
