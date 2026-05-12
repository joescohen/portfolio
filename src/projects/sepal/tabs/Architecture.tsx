import { SectionLabel } from '../../../components/SectionLabel'
import { FourLayerArchitecture } from '../diagrams/FourLayerArchitecture'
import { SkillExecutionFlow } from '../diagrams/SkillExecutionFlow'
import { ArchetypeDebate } from '../diagrams/ArchetypeDebate'

const LAYER_BRIEFS = [
  {
    id: 'L3',
    name: 'Institutional Layer',
    status: 'planned',
    accent: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    body:
      'Cross-program memory. Findings, lessons learned, and skill effectiveness data accumulated across every program SEPAL has touched — surfaced to chief engineers and used to refine skill manifests over time. Scoped for v7.',
  },
  {
    id: 'L2',
    name: 'Program Model',
    status: 'complete · v6.0',
    accent: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    body:
      'Persistent, lifecycle-aware orchestrator for a single program. SQLite + Drizzle store, DAG runner with topological sort and resume-from-failure, rule-based skill classifier, Hono API with SSE, and a React 19 dashboard. Engine consumed via the public barrel only — deep imports blocked in CI.',
  },
  {
    id: 'L1',
    name: 'Process Engine',
    status: 'complete · v5.0',
    accent: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    body:
      'The leaf package — 131 source files, 71 test files, zero internal package imports. Owns corpus ingestion (six parsers + LanceDB hybrid vector/BM25), the deterministic conductor reducer, the single mandatory LLMGateway, prompt assembly with verbatim citation checks, eight retrieval/trace tools, and 17 deliverable renderers.',
  },
  {
    id: 'L0',
    name: 'Skills',
    status: 'complete · 9 live',
    accent: 'text-yellow-700',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    body:
      'TypeScript object-literal manifests validated by SkillDefinitionSchema at module load. Pure domain knowledge — no orchestration code, no JSON, no YAML. A senior systems engineer can review, critique, and improve a skill the same way they would a process spec.',
  },
]

const INTERFACES = [
  { from: 'L0', to: 'L1', label: 'SkillDefinition', desc: 'TS object literal validated at module load' },
  { from: 'L1', to: 'L1', label: 'SessionEvent', desc: 'Async generator stream — 20+ event types' },
  { from: 'L1', to: 'L2', label: 'SessionResult', desc: 'RID register · findings · risks · scores · deliverable paths' },
  { from: 'L2', to: 'L2', label: 'ChainContext', desc: 'Inter-skill handoff: session summaries + deliverable paths' },
  { from: 'L2', to: 'web', label: 'SSE stream', desc: 'Hono streamSSE() + JSONL log + Last-Event-ID replay' },
  { from: 'L2', to: 'L3', label: 'ProgramSnapshot', desc: 'health score · finding/risk summaries · execution metrics' },
]

const PACKAGE_GRAPH = [
  { pkg: 'engine', desc: 'L1 runtime — leaf, zero internal package imports', files: '131 src · 71 test' },
  { pkg: 'skills', desc: '9 production skills + Echo test harness · depends: engine', files: 'load-time validated' },
  { pkg: 'orchestrator', desc: 'L2 — ProgramStore · DAGRunner · Scanner · Classifier · depends: engine, skills', files: '16 src · 11 test' },
  { pkg: 'api', desc: 'Hono HTTP + SSE bridge · depends: engine, orchestrator', files: '18 src · 10 test · 21 routes' },
  { pkg: 'web', desc: 'Vite SPA · depends: api/browser.ts, engine/browser.ts only', files: '75 src · 6 test · 9 pages' },
  { pkg: 'cli', desc: 'run · serve · scan · eval · depends: engine, skills, orchestrator, api', files: '12 src · 10 test' },
]

const RELIABILITY = [
  {
    label: 'Citation enforcement',
    body:
      'Every finding must cite the document chunk it references. The prompt assembler injects a verbatim quote requirement; the engine post-checks each cited span against the actual chunk and rejects un-cited or fabricated claims before they reach the renderer.',
  },
  {
    label: 'Schema validation per turn',
    body:
      'All LLM calls flow through LLMGateway.completeStructured<T>() — Anthropic SDK messages.parse() + zodOutputFormat() only. Schema violations trigger retry with feedback; "respond in JSON" prompt patterns are a banned pattern.',
  },
  {
    label: 'Posture drift detection',
    body:
      'The Challenger archetype is constitutionally barred from agreeing without raising a finding. The Observer monitors adversarial posture per round; decay triggers re-anchoring of the full system prompt. Drift isn\'t a possibility — it\'s a tracked metric.',
  },
  {
    label: 'Eval baselines per release',
    body:
      'Every release runs an eval suite that compares findings to seeded ground truth. The v6.0 → v5.0 baseline is bit-identical, by design. The next investment is expanding the seeded-defect corpus per skill so recall and precision become release gates.',
  },
]

export function Architecture() {
  return (
    <div className="py-10">
      <SectionLabel>System architecture</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-3 max-w-2xl">
        Four levels, each a distinct system with its own responsibilities, data model, and interfaces — but
        composed into a single coherent stack. Data flows up (skill → session → program → institution); feedback
        flows down. Each layer can evolve independently because the interfaces between them are typed and versioned.
      </p>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-3">
        <FourLayerArchitecture />
      </div>
      <p className="text-slate-500 text-xs italic text-center mb-14">
        Layers communicate through typed interfaces. The L0/L1 boundary is the contract that makes new skills
        cheap; the L1/L2 boundary is what makes program-level orchestration safe.
      </p>

      <SectionLabel>Layers at a glance</SectionLabel>
      <div className="space-y-3 mb-14">
        {LAYER_BRIEFS.map((layer) => (
          <div key={layer.id} className={`${layer.bg} border ${layer.border} rounded-xl p-5`}>
            <div className="flex items-baseline gap-3 mb-2 flex-wrap">
              <span className={`${layer.accent} text-xs font-bold uppercase tracking-widest`}>{layer.id}</span>
              <span className="text-slate-900 text-sm font-bold">{layer.name}</span>
              <span className="ml-auto text-slate-500 text-[10px] font-mono uppercase tracking-widest">{layer.status}</span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">{layer.body}</p>
          </div>
        ))}
      </div>

      <SectionLabel>How a skill runs</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-2xl">
        A single skill execution is a seven-stage pipeline. Documents are parsed and scanned for CUI banners
        before any embedding happens. The classifier ranks which skill should run given the available artifacts.
        The engine launches the archetype debate. Findings are citation-checked and Zod-validated before the
        renderer emits the deliverable.
      </p>
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-14">
        <SkillExecutionFlow />
      </div>

      <SectionLabel>Archetype debate pattern</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-3 max-w-2xl">
        Inside the engine, each skill defines a cast of agent archetypes that take turns examining the artifact.
        The configuration is declarative — turn order, phase boundaries, and exit criteria all live in the skill
        manifest, not in engine code.
      </p>
      <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-2xl">
        Why this rather than a single agent? A review board catches different classes of issues precisely because
        the people sitting around the table hold incompatible incentives. The Challenger is constitutionally
        barred from agreeing without raising a finding. The Cross-checker compares against related documents the
        Defender never sees. Different incentives produce different findings.
      </p>
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-14">
        <ArchetypeDebate />
      </div>

      <SectionLabel>Interface contracts</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-2xl">
        Every boundary is a typed contract. The same discipline you apply to ICDs between subsystems applies here —
        the schemas are the ICDs of the agent system.
      </p>
      <div className="bg-slate-950 rounded-xl p-6 mb-14">
        <div className="space-y-3">
          {INTERFACES.map((iface) => (
            <div
              key={`${iface.from}-${iface.label}`}
              className="flex items-center gap-4 flex-wrap"
            >
              <div className="flex items-center gap-2 flex-shrink-0 w-24">
                <span className="text-white/40 text-xs font-mono">{iface.from}</span>
                <span className="text-white/20">→</span>
                <span className="text-white/40 text-xs font-mono">{iface.to}</span>
              </div>
              <code className="text-emerald-400 text-xs font-mono bg-emerald-500/10 px-2 py-0.5 rounded whitespace-nowrap">
                {iface.label}
              </code>
              <span className="text-white/50 text-xs flex-1 min-w-0">{iface.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <SectionLabel>Reliability mechanisms</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-2xl">
        Multi-agent LLM systems fail in characteristic ways: agents hallucinate citations, drift into agreement,
        regress on previously-fixed cases. SEPAL treats those failure modes as engineering problems with
        deterministic guardrails — not vibes.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {RELIABILITY.map((r) => (
          <div key={r.label} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h4 className="font-semibold text-slate-900 text-sm mb-2">{r.label}</h4>
            <p className="text-slate-600 text-xs leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>

      <SectionLabel>Package graph</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-2xl">
        Six packages with one-way dependency edges enforced by a CI lint rule. The orchestrator may only consume{' '}
        <code className="text-slate-500 text-xs bg-slate-100 px-1 py-0.5 rounded">engine/src/index.ts</code> — the
        public barrel. The web SPA is restricted to the browser-safe barrels.
      </p>
      <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {PACKAGE_GRAPH.map((pkg, i) => (
              <tr key={pkg.pkg} className={i > 0 ? 'border-t border-slate-200' : ''}>
                <td className="px-5 py-3 w-40 align-top">
                  <code className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-mono font-semibold">
                    packages/{pkg.pkg}
                  </code>
                </td>
                <td className="px-5 py-3 text-slate-700 text-xs">{pkg.desc}</td>
                <td className="px-5 py-3 text-slate-400 text-xs font-mono whitespace-nowrap align-top">
                  {pkg.files}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
