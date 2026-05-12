import { Link } from 'react-router-dom'
import { SectionLabel } from '../../../components/SectionLabel'

const features = [
  {
    title: 'One abstraction above the bug',
    desc: 'CEI does not collect project bugs — it collects user-agent mismatches. "The brief only printed to stdout" is not the insight; "report workflows lack a durable artifact contract" is. The control is a hook, not a note.',
  },
  {
    title: 'Recurrence is the trigger, not severity',
    desc: 'A single bad day is a project event. A bad day repeated across two sessions in thirty days is a process failure. Recurrence counters drive promotion, not vibes — and a promoted control must define how it will later be measured.',
  },
  {
    title: 'Project-agnostic by construction',
    desc: 'CEI sits outside every target project. SEPAL, the portfolio, future repos, and reusable skills are addressed through adapters with a single contract — observe, extract traces, resolve artifacts, apply controls. No target-specific code in the core.',
  },
  {
    title: 'Explicit promotion gate',
    desc: 'Insights do not silently mutate skills, hooks, or CLAUDE.md files. Every candidate is staged with evidence, scope, control type, target surface, and a verification case before it becomes durable. Approval mode is recorded per route.',
  },
]

const principles = [
  {
    label: 'Evidence over assertion',
    desc: 'Every learning candidate carries trace ids, file paths, commit hashes, or claude-mem references. Memory alone is not learning. The promotion gate refuses candidates that cannot point at the evidence that justified them.',
  },
  {
    label: 'Executable pressure, not notes',
    desc: 'A durable control is a workflow gate, hook, skill trigger, eval, regression case, policy, or adapter rule — something the next session physically encounters. CLAUDE.md edits are appropriate for lightweight routing, not for storing abstract lessons.',
  },
  {
    label: 'Verification closes the loop',
    desc: 'Promotion is not the end. Every promoted control carries a verification case with confirming evidence, failure evidence, a time window, and a closure status — held, failed, or superseded. The loop is recursive: controls earn or lose confidence.',
  },
]

const lineage = [
  {
    skill: '/system-validation',
    role: 'Validated specific artifacts — checked whether a system worked from a user perspective.',
  },
  {
    skill: '/skill-auditor',
    role: 'Validated specific skills — diagnosed coverage gaps after a run.',
  },
  {
    skill: 'CEI',
    role: 'Validates the user-agent collaboration process itself — one level above either of the above. Those skills now plug in as Reasoning Layer routes.',
  },
]

export function Overview() {
  return (
    <div className="py-10 max-w-3xl">
      <SectionLabel>What it is</SectionLabel>
      <p className="text-slate-700 text-sm leading-relaxed mb-2">
        Continuous Engineering Intelligence is a project-agnostic learning layer for agent-assisted engineering
        work. It sits above individual projects and above individual task executions, and its primary subject
        is not the target project&apos;s bug list — it is the user-agent development process itself.
      </p>
      <p className="text-slate-600 text-sm leading-relaxed mb-10">
        Where the user asked for X and got Y, where the same correction recurred, where verification or
        artifacts were missing — CEI captures those mismatches as evidence, classifies them at the right
        abstraction level, and routes them into durable controls: hooks, workflow gates, skill triggers,
        regression cases, policies. Memory alone is not learning. Promotion plus verification is learning.
      </p>

      <SectionLabel>The reframe</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-2xl">
        Project events are evidence, not the learning. CEI climbs at least one or two abstraction levels above
        concrete bugs or task events.
      </p>
      <div className="bg-slate-950 rounded-xl p-6 mb-12">
        <div className="flex flex-col gap-2 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-white/30 w-7">L0</span>
            <span className="text-white/60">project bug / task event</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/30 w-7">L1</span>
            <span className="text-cyan-300">user-agent mismatch</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/30 w-7">L2</span>
            <span className="text-sky-300">process / control failure</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/30 w-7">L3</span>
            <span className="text-sky-400">durable prevention mechanism</span>
          </div>
        </div>
      </div>

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
              <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1" />
            </div>
            <div>
              <span className="font-semibold text-slate-900 text-sm">{p.label} — </span>
              <span className="text-slate-600 text-sm leading-relaxed">{p.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>Target users</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-12 max-w-2xl">
        A developer using Claude, Codex, and GSD-style agents across multiple projects; future teams running
        agent-assisted systems engineering workflows; maintainers of reusable skills who need evidence-driven
        improvement loops rather than anecdote-driven ones. SEPAL is target zero — a rich system under
        development chosen to prove the loop end to end. CEI stays outside SEPAL and treats it through an adapter.
      </p>

      <SectionLabel>Lineage</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-2xl">
        CEI is the evolution of two earlier skills shipped in <code className="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">joescohen/claude-skills</code> —
        but a level above. The earlier work validated specific artifacts or specific skills. CEI validates the
        user-agent collaboration that produced them, and the earlier skills now plug in as Reasoning Layer routes.
      </p>
      <div className="space-y-2 mb-12">
        {lineage.map((item, i) => (
          <div key={item.skill} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            <code className={`px-2 py-0.5 rounded text-xs font-mono font-semibold flex-shrink-0 ${
              i === 2
                ? 'text-cyan-700 bg-cyan-50'
                : 'text-violet-700 bg-violet-50'
            }`}>{item.skill}</code>
            <span className="text-slate-600 text-sm leading-relaxed">{item.role}</span>
          </div>
        ))}
      </div>

      <SectionLabel>Success criteria</SectionLabel>
      <ul className="text-slate-600 text-sm leading-relaxed mb-12 max-w-2xl space-y-2">
        <li className="flex gap-3"><span className="text-cyan-500 flex-shrink-0">›</span><span>Summarize recent work across claude-mem, git, planning files, and logs into a concise development brief.</span></li>
        <li className="flex gap-3"><span className="text-cyan-500 flex-shrink-0">›</span><span>Classify session history into process insights at least one abstraction level above concrete project events.</span></li>
        <li className="flex gap-3"><span className="text-cyan-500 flex-shrink-0">›</span><span>Count recurring agent/process failure classes across sessions, with evidence and recurrence thresholds.</span></li>
        <li className="flex gap-3"><span className="text-cyan-500 flex-shrink-0">›</span><span>Route a process insight to the right durable control type — gate, hook, skill trigger, eval, policy, case.</span></li>
        <li className="flex gap-3"><span className="text-cyan-500 flex-shrink-0">›</span><span>Prove at least one repeated user-agent mismatch becomes a persistent check that prevents recurrence.</span></li>
      </ul>

      <SectionLabel>Source</SectionLabel>
      <div className="bg-slate-950 rounded-xl p-6 mb-10">
        <div className="flex items-center gap-3">
          <div
            className="inline-flex items-center gap-2 border border-white/20 text-white/60 text-xs font-semibold px-4 py-2 rounded-lg cursor-default"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>joescohen/continuous-engineering-intelligence</span>
            <svg className="w-3 h-3 ml-1 opacity-60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <div className="text-white/35 text-xs">Node · TypeScript · Private</div>
        </div>
      </div>

      <Link
        to="/journey#process"
        viewTransition
        className="inline-flex items-center gap-1 text-cyan-700 hover:text-cyan-900 text-xs font-semibold transition-colors"
      >
        Read where this fits in the journey
        <span aria-hidden>→</span>
      </Link>
    </div>
  )
}
