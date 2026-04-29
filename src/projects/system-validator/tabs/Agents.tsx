import { SectionLabel } from '../../../components/SectionLabel'

const agents = [
  {
    name: 'Conductor',
    role: 'Orchestrator',
    model: 'Inherits parent',
    color: 'indigo',
    inputs: ['Conversation context', 'Codebase', 'Git history', 'User calibration answers'],
    outputs: ['Dispatch prompts for each specialist', 'Gate decisions', 'User-facing synthesis'],
    description:
      'The only agent that talks to the user. The Conductor performs pre-flight context extraction, dispatches specialists, reads their structured checkpoints, enriches them with conversation context, makes gate decisions, and synthesizes findings into user-impact language. It never opens a browser.',
  },
  {
    name: 'Spec Agent',
    role: 'Specification',
    model: 'Claude Haiku',
    color: 'violet',
    inputs: ['Codebase root path', 'System description', 'Known issues', 'Recently changed files'],
    outputs: ['specification.md', 'SPEC_COMPLETE checkpoint'],
    description:
      'Reads the codebase — routes, components, API layer, DB schema, existing tests — and writes a formal specification document. Extracts functional requirements, the interaction model, data invariants, quality attributes, and STAMP-inspired risk areas. Does not run the system or open a browser.',
  },
  {
    name: 'Matrix Agent',
    role: 'Test Planning',
    model: 'Claude Haiku',
    color: 'violet',
    inputs: ['specification.md path', 'Calibration answers from user', 'Conductor context'],
    outputs: ['validation-matrix.md', 'MATRIX_COMPLETE checkpoint'],
    description:
      'Converts the specification into a fully executable validation matrix. Every requirement and risk area becomes one or more rows. Each row carries a REQ-ID trace, a verification method, a precise action, a falsifiable expected result, and a P×I risk score. Rows are clustered for parallel execution.',
  },
  {
    name: 'Executor Agent',
    role: 'Test Execution',
    model: 'Claude Haiku',
    color: 'violet',
    inputs: ['Cluster assignment (A/B/C)', 'Cluster rows from matrix', 'specification.md path', 'System URL'],
    outputs: ['Screenshots', 'CLUSTER_COMPLETE checkpoint', 'ESCALATION (if critical finding)'],
    description:
      "Executes one cluster of matrix rows in a live browser session. For each row: performs the action, takes a screenshot, inspects the DOM, compares against the spec's expected result. Dispatched in parallel with other executor instances — one per cluster. Emits ESCALATION immediately for critical finds without waiting for cluster completion.",
  },
  {
    name: 'Reporter Agent',
    role: 'Reporting',
    model: 'Claude Haiku',
    color: 'violet',
    inputs: ['All CLUSTER_COMPLETE checkpoints (concatenated)', 'specification.md path', 'validation-matrix.md path'],
    outputs: ['audit-report.md', 'REPORT_COMPLETE checkpoint'],
    description:
      'Aggregates all executor findings across clusters. Deduplicates (same bug found by two executors = one finding), assigns final sequential IDs (FIND-001, FIND-002...), and writes a structured audit report: executive summary, statistics, findings by severity, T1 compliance, coverage gaps, and recommendations.',
  },
]

const colorMap: Record<string, { bg: string; border: string; label: string; dot: string }> = {
  indigo: {
    bg: 'bg-indigo-950/50',
    border: 'border-indigo-700/40',
    label: 'text-indigo-300',
    dot: 'bg-indigo-400',
  },
  violet: {
    bg: 'bg-violet-950/50',
    border: 'border-violet-700/40',
    label: 'text-violet-300',
    dot: 'bg-violet-400',
  },
}

export function Agents() {
  return (
    <div className="py-10">

      {/* Context constraint callout */}
      <div className="bg-slate-950 border border-amber-700/30 rounded-2xl p-7 mb-12">
        <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
          The Context Constraint — why it shapes everything
        </div>
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          Sub-agents dispatched via Claude Code's Agent tool start with <strong className="text-white">zero context</strong>.
          They don't see the conversation. They don't know what the user is worried about. They don't know
          what changed in the last commit. They don't know what was already tested.
        </p>
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          This is fundamental to how the Agent tool works: each spawned agent is a fresh instance.
          It receives exactly and only what the Conductor explicitly packages in the dispatch prompt.
          Under-specify and the agent hallucinates defaults. Over-specify and you blow the context window
          before execution begins.
        </p>
        <p className="text-white/70 text-sm leading-relaxed mb-5">
          The checkpoint contract solves the <em>return path</em>: specialist agents emit machine-readable,
          schema-defined output as their final message. The Conductor parses it, enriches it with
          conversation context the sub-agent never had, and makes gate decisions. This is why raw
          agent output never reaches the user — the Conductor's role is synthesis, not relay.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'What sub-agents receive', value: 'Only what Conductor explicitly packages in dispatch prompt' },
            { label: 'What sub-agents emit', value: 'Structured checkpoint (machine-readable, schema-defined)' },
            { label: 'What Conductor adds back', value: 'Conversation context, risk weighting, user impact framing' },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 rounded-lg p-4">
              <div className="text-white/30 text-xs uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-white/60 text-xs leading-relaxed">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionLabel>Agent Profiles</SectionLabel>

      <div className="space-y-5">
        {agents.map((agent) => {
          const c = colorMap[agent.color]
          return (
            <div key={agent.name} className={`${c.bg} border ${c.border} rounded-xl p-6`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                    <span className={`text-sm font-bold ${c.label}`}>{agent.name}</span>
                    <span className="text-white/25 text-xs">·</span>
                    <span className="text-white/40 text-xs">{agent.role}</span>
                  </div>
                </div>
                <div className="text-white/25 text-xs font-mono flex-shrink-0">{agent.model}</div>
              </div>

              <p className="text-white/60 text-xs leading-relaxed mb-4">{agent.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-white/25 text-xs uppercase tracking-wider mb-2">Receives from Conductor</div>
                  <ul className="space-y-1">
                    {agent.inputs.map((input) => (
                      <li key={input} className="flex gap-2 text-white/45 text-xs">
                        <span className="text-white/20 flex-shrink-0">→</span>
                        {input}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-white/25 text-xs uppercase tracking-wider mb-2">Emits to Conductor</div>
                  <ul className="space-y-1">
                    {agent.outputs.map((output) => (
                      <li key={output} className="flex gap-2 text-white/45 text-xs">
                        <span className={`${c.label} opacity-60 flex-shrink-0`}>←</span>
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Reporting structure note */}
      <div className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-6">
        <SectionLabel>Reporting Structure</SectionLabel>
        <p className="text-slate-700 text-sm leading-relaxed mb-3">
          All agents report up to the Conductor — never directly to the user, and never to each other.
          This single-hub topology means the Conductor always has the full picture before any gate decision,
          and can apply conversation context that no specialist agent was given.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          Executor agents are the only exception to the sequential flow: they run in parallel after Gate 2
          and all report CLUSTER_COMPLETE independently. The Conductor waits for all of them before dispatching
          the Reporter. Mid-execution ESCALATIONs surface immediately to the user without waiting for the cluster to finish —
          that's the only time the Conductor interrupts the user between gates.
        </p>
      </div>

    </div>
  )
}
