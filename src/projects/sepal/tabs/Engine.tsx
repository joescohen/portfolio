import { SectionLabel } from '../../../components/SectionLabel'

const ENGINE_COMPONENTS = [
  { name: 'LLM Gateway', desc: 'Anthropic SDK wrapper — completeStructured<T>() via messages.parse() + zodOutputFormat(). All LLM calls go through here.' },
  { name: 'Conductor', desc: 'Deterministic typed reducer. Drives turn order, phase transitions, exit criteria, posture interventions. No LLM orchestration.' },
  { name: 'Prompt Assembler', desc: 'Builds system → grounding → tiered history → re-anchor → instruction on every turn. Re-injects constitutional principles each turn.' },
  { name: 'Session / Checkpoint', desc: 'Atomic JSON checkpoint per turn. Resume from any checkpoint. Full session state serialized and recoverable.' },
  { name: 'Deliverable Assembler', desc: 'Renders accumulated registers (RIDs, findings, scores) into Markdown, JSON, and XLSX — review-board-ready output.' },
  { name: 'Quality Control', desc: 'Persona drift detection, adversarial posture monitoring, sycophancy alerts, context window management.' },
]

const SAMPLE_RUN = `▶  Session started  [sess-abc123]  skill=rqg
✓  Entrance criteria passed
   → [requirements-author]  round 0
   ✓ [requirements-author]  4821in/2103out  $0.0847
   💾 Checkpoint written
   → [verification-engineer]  round 1
   ✓ [verification-engineer]  3891in/1847out  $0.0692
   💾 Checkpoint written
   → [evaluator]  round 2
   ✓ [evaluator]  5102in/892out  $0.0531
   ...
✅ Session complete  9 turns  $0.73`

const TECH_STACK = [
  { concern: 'Language', choice: 'TypeScript 5.9 / Node 22 LTS' },
  { concern: 'Packages', choice: 'pnpm monorepo (engine, skills, cli)' },
  { concern: 'LLM Provider', choice: 'Anthropic SDK 0.94 — messages.parse() + zodOutputFormat()' },
  { concern: 'Schemas', choice: 'Zod 4 (runtime + types + LLM output schemas)' },
  { concern: 'Document Parsing', choice: 'unpdf (PDF), mammoth (DOCX), exceljs (XLSX), papaparse (CSV)' },
  { concern: 'Vector Store', choice: 'LanceDB embedded (hybrid vector + BM25)' },
  { concern: 'Embeddings', choice: 'Voyage voyage-3-large' },
  { concern: 'Test', choice: 'Vitest' },
  { concern: 'Build', choice: 'tsup + tsc project references' },
]

// colours
const C = {
  blue:   '#60a5fa',
  green:  '#34d399',
  purple: '#a78bfa',
  amber:  '#fbbf24',
  grey:   '#9ca3af',
  red:    '#ef4444',
}

function Arrow({ x1, y1, x2, y2, dashed }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len
  const uy = dy / len
  const tip = 7
  const ax = x2 - ux * tip
  const ay = y2 - uy * tip
  const perp = 4
  const px = -uy * perp
  const py = ux * perp
  return (
    <g>
      <line
        x1={x1} y1={y1} x2={ax} y2={ay}
        stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      <polygon
        points={`${ax + px},${ay + py} ${x2},${y2} ${ax - px},${ay - py}`}
        fill="rgba(255,255,255,0.3)"
      />
    </g>
  )
}

function Badge({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fill={color}
      fontSize="7.5" fontWeight="700" letterSpacing="0.08em"
      fontFamily="'DM Sans', sans-serif">
      {label}
    </text>
  )
}

function BoxTitle({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fill={color}
      fontSize="11" fontWeight="700"
      fontFamily="'DM Sans', sans-serif">
      {label}
    </text>
  )
}

function BoxLines({ x, y, lines, color = 'rgba(255,255,255,0.5)', size = 8.5 }: {
  x: number; y: number; lines: string[]; color?: string; size?: number
}) {
  return (
    <>
      {lines.map((line, i) => (
        <text key={i} x={x} y={y + i * 13} fill={color}
          fontSize={size} fontFamily="'DM Sans', sans-serif">
          {line}
        </text>
      ))}
    </>
  )
}

function EnginePipelineDiagram() {
  // Layout constants
  const INW = 120   // input box width
  const INH = 46    // input box height
  const INX = 0     // input box x
  const INS = 14    // input box spacing

  const inputs = [
    { label: 'SkillSpec',      sub: 'from L0',       color: C.purple, y: 8   },
    { label: 'Artifact Store', sub: 'RAG retrieval',  color: C.purple, y: 8 + (INH + INS) * 1 },
    { label: 'Program State',  sub: 'L2 ledgers',     color: C.amber,  y: 8 + (INH + INS) * 2 },
    { label: 'Rubric',         sub: 'human-authored', color: C.amber,  y: 8 + (INH + INS) * 3 },
    { label: 'User Trigger',   sub: 'phase-gate',     color: C.grey,   y: 8 + (INH + INS) * 4 },
  ]

  const CAX = 138  // Context Assembler x
  const CAW = 148  // Context Assembler width
  const CAY = 2
  const CAH = 338

  const LLMX = CAX + CAW + 20  // LLM Gateway x
  const LLMW = 140
  const LLMY = 62
  const LLMH = 224

  const CDX = LLMX + LLMW + 20  // Conductor x
  const CDW = 158
  const CDY = 2
  const CDH = 338

  const QCX = CDX + CDW + 18   // right column x
  const RCW = 148
  const QCY = 2
  const QCH = 112

  const OSY = QCY + QCH + 14   // Output Store y
  const OSH = 102

  const RTY = OSY + OSH + 12   // Retry y
  const RTH = 52

  const totalH = 380

  return (
    <svg viewBox={`0 0 ${QCX + RCW + 4} ${totalH}`} className="w-full" fill="none">
      <defs>
        <marker id="ep-arr" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 7 3, 0 6" fill="rgba(255,255,255,0.3)" />
        </marker>
      </defs>

      {/* ── Input boxes ── */}
      {inputs.map((inp) => (
        <g key={inp.label}>
          <rect x={INX} y={inp.y} width={INW} height={INH} rx={4}
            stroke={inp.color} strokeWidth="1.2" fill={`${inp.color}12`} />
          <text x={INX + 10} y={inp.y + 17} fill={inp.color}
            fontSize="10" fontWeight="700" fontFamily="'DM Sans', sans-serif">
            {inp.label}
          </text>
          <text x={INX + 10} y={inp.y + 31} fill="rgba(255,255,255,0.35)"
            fontSize="8.5" fontFamily="'DM Sans', sans-serif">
            {inp.sub}
          </text>
          {/* arrow to Context Assembler */}
          <Arrow x1={INX + INW + 1} y1={inp.y + INH / 2} x2={CAX - 1} y2={inp.y + INH / 2} />
        </g>
      ))}

      {/* ── Context Assembler ── */}
      <rect x={CAX} y={CAY} width={CAW} height={CAH} rx={5}
        stroke={C.blue} strokeWidth="1.5" fill={`${C.blue}0e`} />
      <Badge x={CAX + CAW / 2} y={CAY + 14} label="CODE" color={C.blue} />
      <BoxTitle x={CAX + CAW / 2} y={CAY + 30} label="Context Assembler" color={C.blue} />
      <BoxLines x={CAX + 10} y={CAY + 50}
        lines={['Token budget calc', 'System prompt build', 'RAG chunk inject', 'Rubric embed', 'Prior turn concat']} />
      {/* arrow to LLM GW */}
      <Arrow x1={CAX + CAW + 1} y1={CAY + CAH / 2} x2={LLMX - 1} y2={LLMY + LLMH / 2} />

      {/* ── LLM Gateway ── */}
      <rect x={LLMX} y={LLMY} width={LLMW} height={LLMH} rx={5}
        stroke={C.green} strokeWidth="1.5" fill={`${C.green}0e`} />
      <Badge x={LLMX + LLMW / 2} y={LLMY + 14} label="LLM CALL" color={C.green} />
      <BoxTitle x={LLMX + LLMW / 2} y={LLMY + 30} label="LLM Gateway" color={C.green} />
      <text x={LLMX + LLMW / 2} y={LLMY + 46} textAnchor="middle"
        fill="rgba(255,255,255,0.35)" fontSize="7.5" fontStyle="italic"
        fontFamily="'DM Sans', sans-serif">
        Only AI invocation
      </text>
      <BoxLines x={LLMX + 10} y={LLMY + 62}
        lines={['Send packed_context', 'Receive completion', 'Token metering', 'Retry on transient err']} />
      {/* arrow to Conductor */}
      <Arrow x1={LLMX + LLMW + 1} y1={LLMY + LLMH / 2} x2={CDX - 1} y2={CDY + CDH / 2} />

      {/* ── Conductor Loop ── */}
      <rect x={CDX} y={CDY} width={CDW} height={CDH} rx={5}
        stroke={C.blue} strokeWidth="1.5" fill={`${C.blue}0e`} />
      <Badge x={CDX + CDW / 2} y={CDY + 14} label="CODE" color={C.blue} />
      <BoxTitle x={CDX + CDW / 2} y={CDY + 30} label="Conductor Loop" color={C.blue} />
      <BoxLines x={CDX + 10} y={CDY + 50}
        lines={[
          '1  Parse structured output',
          '2  Validate vs schema',
          '3  Check constraint_set',
          '4  Append to turn log',
          '5  Eval stop condition',
        ]} />
      <text x={CDX + 10} y={CDY + 125} fill={C.green}
        fontSize="8.5" fontWeight="600" fontFamily="'DM Sans', sans-serif">6  If continue:</text>
      <text x={CDX + 20} y={CDY + 139} fill={C.green}
        fontSize="8" fontFamily="'DM Sans', sans-serif">repack → LLM again</text>
      <text x={CDX + 10} y={CDY + 155} fill={C.blue}
        fontSize="8.5" fontWeight="600" fontFamily="'DM Sans', sans-serif">7  If done:</text>
      <text x={CDX + 20} y={CDY + 169} fill={C.blue}
        fontSize="8" fontFamily="'DM Sans', sans-serif">emit findings → QC</text>
      {/* arrow to QC Gate */}
      <Arrow x1={CDX + CDW + 1} y1={QCY + QCH / 2} x2={QCX - 1} y2={QCY + QCH / 2} />

      {/* ── Dashed feedback loop: Conductor → LLM ── */}
      {/* down from conductor bottom area → under diagram → back up to LLM bottom */}
      <path
        d={`M ${CDX + CDW / 2} ${CDY + CDH + 3} L ${CDX + CDW / 2} ${totalH - 20} L ${LLMX + LLMW / 2} ${totalH - 20} L ${LLMX + LLMW / 2} ${LLMY + LLMH + 3}`}
        stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeDasharray="5 4"
        markerEnd="url(#ep-arr)"
      />
      <text x={(CDX + CDW / 2 + LLMX + LLMW / 2) / 2} y={totalH - 8}
        textAnchor="middle" fill="rgba(255,255,255,0.25)"
        fontSize="8" fontStyle="italic" fontFamily="'DM Sans', sans-serif">
        multi-turn loop
      </text>

      {/* ── QC Gate ── */}
      <rect x={QCX} y={QCY} width={RCW} height={QCH} rx={5}
        stroke={C.blue} strokeWidth="1.5" fill={`${C.blue}0e`} />
      <Badge x={QCX + RCW / 2} y={QCY + 14} label="CODE" color={C.blue} />
      <BoxTitle x={QCX + RCW / 2} y={QCY + 30} label="QC Gate" color={C.blue} />
      <BoxLines x={QCX + 10} y={QCY + 50}
        lines={['Schema check', 'Confidence floor', 'Completeness rule']} />
      {/* arrow down to Output Store */}
      <Arrow x1={QCX + RCW / 2} y1={QCY + QCH + 1} x2={QCX + RCW / 2} y2={OSY - 1} />

      {/* ── Output Store ── */}
      <rect x={QCX} y={OSY} width={RCW} height={OSH} rx={5}
        stroke={C.purple} strokeWidth="1.5" fill={`${C.purple}0e`} />
      <Badge x={QCX + RCW / 2} y={OSY + 14} label="ARTIFACT" color={C.purple} />
      <BoxTitle x={QCX + RCW / 2} y={OSY + 30} label="Output Store" color={C.purple} />
      <BoxLines x={QCX + 10} y={OSY + 50}
        lines={['findings.json', 'turn_log.json']}
        color="rgba(255,255,255,0.4)" />
      {/* arrow down to Retry */}
      <Arrow x1={QCX + RCW / 2} y1={OSY + OSH + 1} x2={QCX + RCW / 2} y2={RTY - 1} />

      {/* ── QC fail → Retry ── */}
      <rect x={QCX} y={RTY} width={RCW} height={RTH} rx={5}
        stroke={C.red} strokeWidth="1.5" fill={`${C.red}12`} />
      <text x={QCX + RCW / 2} y={RTY + RTH / 2 + 5}
        textAnchor="middle" fill={C.red}
        fontSize="11" fontWeight="700" fontFamily="'DM Sans', sans-serif">
        ✕ Retry (max 3)
      </text>

      {/* ── Visual key ── */}
      {[
        { label: 'Deterministic code', color: C.blue,   kx: CAX, ky: totalH - 22 },
        { label: 'LLM / AI inference', color: C.green,  kx: CAX + 160, ky: totalH - 22 },
        { label: 'Persisted artifact',  color: C.purple, kx: CAX + 310, ky: totalH - 22 },
      ].map((k) => (
        <g key={k.label}>
          <rect x={k.kx} y={k.ky - 7} width={8} height={8} rx={1} fill={k.color} opacity={0.6} />
          <text x={k.kx + 12} y={k.ky} fill="rgba(255,255,255,0.3)"
            fontSize="8" fontFamily="'DM Sans', sans-serif">{k.label}</text>
        </g>
      ))}
    </svg>
  )
}

export function Engine() {
  return (
    <div className="py-10">
      <SectionLabel>Engine Components</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
        The L1 process engine turns a skill definition + input documents into a structured deliverable.
        Six subsystems handle the full lifecycle from document ingestion through deliverable assembly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {ENGINE_COMPONENTS.map((c) => (
          <div key={c.name} className="bg-slate-950 rounded-xl p-5">
            <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">{c.name}</div>
            <p className="text-white/60 text-xs leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      <SectionLabel>Execution Pipeline</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-2xl">
        Only one LLM call in the entire pipeline — the LLM Gateway. Everything else is deterministic
        code that assembles context, validates output, manages turn state, and writes checkpoints.
      </p>
      <div className="bg-slate-950 rounded-2xl p-6 mb-14 overflow-x-auto">
        <div className="min-w-[640px]">
          <EnginePipelineDiagram />
        </div>
      </div>

      <SectionLabel>Sample Run Output</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-2xl">
        Progress streams to stderr in real time. Each run writes three deliverable files — Markdown,
        Excel, and JSON — with a skill+timestamp prefix so runs never overwrite each other.
      </p>

      <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 mb-14">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-white/30 text-xs ml-2 font-mono">sepal run rqg — requirements quality gate</span>
        </div>
        <pre className="p-5 text-xs leading-relaxed overflow-x-auto">
          {SAMPLE_RUN.split('\n').map((line, i) => {
            const isStart = line.startsWith('▶')
            const isPass = line.startsWith('✓') || line.startsWith('   ✓')
            const isDone = line.startsWith('✅')
            const isCheckpoint = line.includes('💾')
            const isAgent = line.includes('→')
            return (
              <span key={i} className="block">
                {isStart ? (
                  <span className="text-blue-400">{line}</span>
                ) : isDone ? (
                  <span className="text-emerald-400 font-semibold">{line}</span>
                ) : isCheckpoint ? (
                  <span className="text-yellow-400/60">{line}</span>
                ) : isPass ? (
                  <span className="text-emerald-400/70">{line}</span>
                ) : isAgent ? (
                  <span className="text-violet-400/70">{line}</span>
                ) : (
                  <span className="text-white/40">{line}</span>
                )}
              </span>
            )
          })}
        </pre>
      </div>

      <SectionLabel>Tech Stack</SectionLabel>
      <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {TECH_STACK.map((row, i) => (
              <tr key={row.concern} className={i > 0 ? 'border-t border-slate-200' : ''}>
                <td className="px-5 py-3 text-slate-400 text-xs font-semibold uppercase tracking-wider w-32 align-top">{row.concern}</td>
                <td className="px-5 py-3 text-slate-700 text-xs">{row.choice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
