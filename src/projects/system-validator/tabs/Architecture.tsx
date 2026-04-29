import { SectionLabel } from '../../../components/SectionLabel'

const methodologies = [
  {
    name: 'STAMP Risk Analysis',
    subtitle: 'Systems Theoretic Accident Model & Processes',
    desc: 'Traditional checklists look for component failures. STAMP looks for unsafe control — the interactions between components and states that produce hazards. The Spec Agent maps every component in scope against every relevant state transition, producing RISK-N entries that become the highest-priority test rows.',
    items: ['Control action + incorrect state → hazard', 'Component A × Component B interaction surfaces', 'Async race conditions between event sources', 'External integration failure cascades'],
  },
  {
    name: "NASA's 4 Verification Methods",
    subtitle: 'SE-standard verification taxonomy',
    desc: 'Every row in the validation matrix uses one of the four verification methods from NASA systems engineering standards. This prevents method bias — a system validated only by demonstration misses data invariants; one validated only by inspection misses runtime behavior.',
    items: ['Analysis — Query data, parse logs, compare values', 'Inspection — Read DOM, check styles, code review', 'Demonstration — Click, navigate, operate as a user', 'Test — Controlled experiment with measurable result'],
  },
  {
    name: 'Tiered Requirements',
    subtitle: 'Validation-critical → Verification-critical → Polish',
    desc: 'Not all requirements carry the same weight. Tiers ensure the pipeline exits clean on Tier 1 before spending cycles on Tier 2, and never blocks a ship decision on Tier 3. Risk scores within each tier determine execution order.',
    items: ['T1 Validation-critical: failure = system fails its purpose', 'T2 Verification-critical: failure = req unmet, core survives', 'T3 Polish: edge cases, low-frequency paths, cosmetics', 'Risk = P×I (1–5 each) → execution cluster assignment'],
  },
]


const CHECKPOINT_CONTRACT = `## CHECKPOINT: SPEC_COMPLETE
- purpose: AI travel planner that converts trip ideas into structured itineraries
- tier1_reqs:
  - REQ-1: Map marker click shows activity flyout
  - REQ-2: "View in itinerary" scrolls sidebar to card
- risk_areas:
  - MapView × DayFilter: marker click with filter active may clear flyout
  - ItinerarySidebar × AsyncLoad: scroll-to-card during lazy load may miss target
- specification_path: /tmp/system-validation/specification.md`

export function Architecture() {
  return (
    <div className="py-10">
      <SectionLabel>Systems Engineering Methodology</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-2xl">
        The skill's test strategy is derived from formal SE methods — not ad-hoc coverage intuition.
        Three methodologies underpin every layer of the pipeline, from how requirements are extracted
        to how test rows are written and executed.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-14">
        {methodologies.map((m) => (
          <div key={m.name} className="bg-slate-950 rounded-xl p-6">
            <div className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-1">{m.name}</div>
            <div className="text-white/40 text-xs mb-3">{m.subtitle}</div>
            <p className="text-white/70 text-xs leading-relaxed mb-4">{m.desc}</p>
            <ul className="space-y-1.5">
              {m.items.map((item) => (
                <li key={item} className="flex gap-2 text-white/50 text-xs">
                  <span className="text-violet-500 mt-0.5 flex-shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SectionLabel>Pipeline Architecture</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-2xl">
        Five agents, four gates, one Conductor. The Conductor never touches the browser — it
        plans, dispatches, reads structured checkpoints, and synthesizes. Specialist agents do
        exactly one job each.
      </p>

      {/* Pipeline diagram */}
      <div className="bg-slate-950 rounded-2xl p-8 mb-14 overflow-x-auto">
        <div className="min-w-[560px]">

          {/* Row 1: User → Conductor */}
          <div className="flex items-center gap-3 mb-1">
            <div className="w-20 flex-shrink-0">
              <div className="bg-slate-800 border border-slate-600/50 rounded-lg px-3 py-2.5 text-center">
                <div className="text-white/40 text-xs font-bold uppercase tracking-wider">User</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-violet-600">
              <div className="h-px w-6 bg-violet-700/60" />
              <div className="w-1.5 h-1.5 border-r-2 border-t-2 border-violet-600 rotate-45 -ml-1" />
            </div>
            <div className="flex-1">
              <div className="bg-indigo-950/70 border border-indigo-700/50 rounded-lg px-4 py-2.5">
                <div className="text-indigo-300 text-xs font-bold uppercase tracking-wider">Conductor</div>
                <div className="text-white/40 text-xs">Pre-flight: scan codebase, git log, conversation</div>
              </div>
            </div>
          </div>

          {/* Vertical connector + Gate 0 */}
          <div className="ml-[5.5rem] flex flex-col items-center w-0 relative">
            <div className="h-4 w-px bg-violet-800/50" />
            <div className="bg-violet-950 border border-violet-700/60 text-violet-400 text-xs px-3 py-1 rounded-full font-mono whitespace-nowrap">
              Gate 0 → dispatch Spec Agent
            </div>
            <div className="h-4 w-px bg-violet-800/50" />
          </div>

          {/* Spec Agent */}
          <div className="flex items-center gap-3 mb-1 ml-24">
            <div className="flex-1 max-w-sm">
              <div className="bg-violet-950/60 border border-violet-700/50 rounded-lg px-4 py-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-violet-300 text-xs font-bold uppercase tracking-wider">Spec Agent</div>
                    <div className="text-white/40 text-xs">Reads codebase → writes specification.md</div>
                  </div>
                  <div className="text-white/20 text-xs font-mono ml-4">haiku</div>
                </div>
              </div>
            </div>
          </div>

          {/* Gate 1 */}
          <div className="ml-[5.5rem] flex flex-col items-center w-0 relative">
            <div className="h-4 w-px bg-violet-800/50" />
            <div className="bg-orange-950/60 border border-orange-700/60 text-orange-400 text-xs px-3 py-1 rounded-full font-mono whitespace-nowrap">
              Gate 1 → calibration (user interaction)
            </div>
            <div className="h-4 w-px bg-violet-800/50" />
          </div>

          {/* Matrix Agent */}
          <div className="flex items-center gap-3 mb-1 ml-24">
            <div className="flex-1 max-w-sm">
              <div className="bg-violet-950/60 border border-violet-700/50 rounded-lg px-4 py-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-violet-300 text-xs font-bold uppercase tracking-wider">Matrix Agent</div>
                    <div className="text-white/40 text-xs">Spec → risk-scored validation-matrix.md</div>
                  </div>
                  <div className="text-white/20 text-xs font-mono ml-4">haiku</div>
                </div>
              </div>
            </div>
          </div>

          {/* Gate 2 */}
          <div className="ml-[5.5rem] flex flex-col items-center w-0 relative">
            <div className="h-4 w-px bg-violet-800/50" />
            <div className="bg-violet-950 border border-violet-700/60 text-violet-400 text-xs px-3 py-1 rounded-full font-mono whitespace-nowrap">
              Gate 2 → coverage check + parallel dispatch
            </div>
            <div className="h-4 w-px bg-violet-800/50" />
          </div>

          {/* Parallel Executors */}
          <div className="ml-24 flex items-stretch gap-3 mb-1">
            <div className="flex flex-col items-center mr-1">
              <div className="w-px flex-1 bg-violet-800/30" />
            </div>
            <div className="flex-1 grid grid-cols-3 gap-2">
              {[
                { id: 'A', desc: 'T1 high-risk (≥20)' },
                { id: 'B', desc: 'T1 mid-risk (10–19)' },
                { id: 'C', desc: 'T2/T3 + low-risk' },
              ].map((ex) => (
                <div key={ex.id} className="bg-violet-950/40 border border-violet-800/40 rounded-lg px-3 py-2.5 text-center">
                  <div className="text-violet-400 text-xs font-bold uppercase tracking-wider mb-0.5">Executor {ex.id}</div>
                  <div className="text-white/35 text-xs">{ex.desc}</div>
                  <div className="text-white/20 text-xs font-mono mt-1.5">haiku · browser</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gate 3 */}
          <div className="ml-[5.5rem] flex flex-col items-center w-0 relative">
            <div className="h-4 w-px bg-violet-800/50" />
            <div className="bg-violet-950 border border-violet-700/60 text-violet-400 text-xs px-3 py-1 rounded-full font-mono whitespace-nowrap">
              Gate 3 → aggregate CLUSTER_COMPLETE ×N
            </div>
            <div className="h-4 w-px bg-violet-800/50" />
          </div>

          {/* Reporter */}
          <div className="flex items-center gap-3 mb-1 ml-24">
            <div className="flex-1 max-w-sm">
              <div className="bg-violet-950/60 border border-violet-700/50 rounded-lg px-4 py-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-violet-300 text-xs font-bold uppercase tracking-wider">Reporter Agent</div>
                    <div className="text-white/40 text-xs">Aggregates findings → audit-report.md</div>
                  </div>
                  <div className="text-white/20 text-xs font-mono ml-4">haiku</div>
                </div>
              </div>
            </div>
          </div>

          {/* Gate 4 */}
          <div className="ml-[5.5rem] flex flex-col items-center w-0 relative">
            <div className="h-4 w-px bg-violet-800/50" />
            <div className="bg-violet-950 border border-violet-700/60 text-violet-400 text-xs px-3 py-1 rounded-full font-mono whitespace-nowrap">
              Gate 4 → Conductor synthesizes for user
            </div>
            <div className="h-4 w-px bg-violet-800/50" />
          </div>

          {/* User output */}
          <div className="ml-24">
            <div className="bg-slate-800 border border-slate-600/50 rounded-lg px-4 py-2.5 max-w-sm">
              <div className="text-white/40 text-xs font-bold uppercase tracking-wider">User</div>
              <div className="text-white/30 text-xs">Impact-first summary · full report path</div>
            </div>
          </div>

        </div>
      </div>

      <SectionLabel>Checkpoint Contract</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-2xl">
        Every gate transition is mediated by a structured checkpoint emitted as the agent's final output.
        The Conductor reads and parses these — not prose summaries, not free-form messages. This
        makes gate decisions deterministic and prevents context drift across the pipeline.
      </p>

      <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 mb-6">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-white/30 text-xs ml-2 font-mono">checkpoint-contract — SPEC_COMPLETE example</span>
        </div>
        <pre className="p-5 text-xs leading-relaxed overflow-x-auto">
          {CHECKPOINT_CONTRACT.split('\n').map((line, i) => {
            const isHeader = line.startsWith('##')
            const isKey = line.trimStart().startsWith('-') && line.includes(':') && !line.includes('  -')
            return (
              <span key={i} className="block">
                {isHeader ? (
                  <span className="text-violet-400 font-bold">{line}</span>
                ) : isKey ? (
                  <>
                    <span className="text-white/30">{line.split(':')[0]}:</span>
                    <span className="text-emerald-400">{line.substring(line.indexOf(':') + 1)}</span>
                  </>
                ) : (
                  <span className="text-white/50">{line}</span>
                )}
              </span>
            )
          })}
        </pre>
      </div>

      <p className="text-slate-500 text-xs leading-relaxed max-w-2xl">
        Five checkpoint types span the pipeline: <code className="bg-slate-100 text-violet-700 px-1 rounded font-mono">SPEC_COMPLETE</code>, <code className="bg-slate-100 text-violet-700 px-1 rounded font-mono">MATRIX_COMPLETE</code>, <code className="bg-slate-100 text-violet-700 px-1 rounded font-mono">CLUSTER_COMPLETE</code>, <code className="bg-slate-100 text-violet-700 px-1 rounded font-mono">REPORT_COMPLETE</code>, and the mid-execution <code className="bg-slate-100 text-violet-700 px-1 rounded font-mono">ESCALATION</code> — emitted immediately when a critical finding surfaces, before the cluster finishes.
      </p>
    </div>
  )
}
