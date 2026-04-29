import { SectionLabel } from '../../../components/SectionLabel'

const GITHUB_URL = 'https://github.com/joescohen/system-validation'

const features = [
  {
    title: 'Zero test-writing required',
    desc: 'The Spec Agent reads your codebase and derives requirements from source code, routes, and documentation — not from a spec sheet you have to maintain.',
  },
  {
    title: 'Risk-weighted test matrix',
    desc: 'Every test row carries a P×I risk score. High-risk interactions run first. If something is going to break your core flow, the pipeline finds it before lower-priority edge cases.',
  },
  {
    title: 'Parallel browser execution',
    desc: 'Test clusters run simultaneously — one executor agent per cluster, each with its own browser session. A 20-row matrix runs in the time it takes to execute the biggest single cluster.',
  },
  {
    title: 'Structured escalation path',
    desc: "Critical findings surface immediately, before the run finishes. The Conductor decides whether to halt or continue, and reports to you in plain language — not raw checkpoint output.",
  },
]

const principles = [
  {
    label: 'User directives are mandatory, not weighted',
    desc: "Explicit requirements in the invocation message — 'check mobile', 'test the login flow' — are locked as mandatory test dimensions before anything else runs. They generate required T1 rows and apply to every executor. The Conductor confirms them out loud before dispatch, even when told 'don't ask questions / just go.'",
  },
  {
    label: 'STAMP Risk Model',
    desc: 'Most software bugs are interaction bugs, not single-component failures. The Spec Agent uses a STAMP-inspired lens: for every component in scope, identify the control actions and the states that could make them hazardous.',
  },
  {
    label: 'Synthesize, don\'t relay',
    desc: "The user never sees raw agent output. The Conductor translates checkpoint data into user impact: 'the marker click crashes the map' — not 'VM-05 failed with FIND-A-002.'",
  },
  {
    label: 'Make decisions at gates',
    desc: "Every gate is either automated (the Conductor decides) or intentional (one user interaction). No unnecessary questions. Every unnecessary question is friction that erodes trust in the system.",
  },
]

export function Overview() {
  return (
    <div className="py-10 max-w-3xl">
      <SectionLabel>What it does</SectionLabel>
      <p className="text-slate-700 text-sm leading-relaxed mb-2">
        <code className="bg-slate-100 text-violet-700 px-1.5 py-0.5 rounded text-xs font-mono">/system-validation</code> is a Claude Code skill that orchestrates a full QA pipeline from a single command.
        It reads your codebase, writes a formal specification, builds a risk-weighted test matrix, dispatches
        parallel browser agents to execute every row, then synthesizes findings into a structured audit report —
        all without manual test writing.
      </p>
      <p className="text-slate-600 text-sm leading-relaxed mb-10">
        The problem it solves: asking an LLM to "test this app" produces inconsistent, hallucinated results.
        This skill imposes structure — specifications, requirements, risk scoring, verification methods, checkpoint
        contracts — so the outcome is reproducible and trustworthy regardless of which session runs it.
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
              <div className="w-2 h-2 rounded-full bg-violet-500 mt-1" />
            </div>
            <div>
              <span className="font-semibold text-slate-900 text-sm">{p.label} — </span>
              <span className="text-slate-600 text-sm leading-relaxed">{p.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>Source</SectionLabel>
      <div className="bg-slate-950 rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-semibold mb-1">joescohen/system-validation</p>
          <p className="text-white/40 text-xs">Claude Code skill · Public · MIT</p>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-lg"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  )
}
