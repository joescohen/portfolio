import { SectionLabel } from '../../../components/SectionLabel'

const LOOP_STAGES = [
  {
    id: 1,
    label: 'observed mismatch',
    desc: 'User asked for X, agent delivered Y — captured as an interaction trace with a mismatch_category.',
    color: 'cyan',
  },
  {
    id: 2,
    label: 'evidence',
    desc: 'Trace ids, claude-mem references, file paths, commit hashes — everything the loop will cite later.',
    color: 'cyan',
  },
  {
    id: 3,
    label: 'process failure',
    desc: 'Lift the concrete event one or two abstraction levels. "stdout-only brief" becomes "missing artifact contract."',
    color: 'sky',
  },
  {
    id: 4,
    label: 'control proposal',
    desc: 'Generate a control bundle — primary surface (gate, hook, trigger, case, policy) plus supporting surfaces and a verification case.',
    color: 'sky',
  },
  {
    id: 5,
    label: 'promotion gate',
    desc: 'Recurrence ≥ threshold, abstraction sufficient, control type concrete, verification defined, approval mode recorded.',
    color: 'indigo',
  },
  {
    id: 6,
    label: 'durable control',
    desc: 'Written into a workflow gate, hook, skill trigger, regression case, eval, policy, or adapter rule — never a transient note.',
    color: 'violet',
  },
  {
    id: 7,
    label: 'verification closure',
    desc: 'Watch the time window for confirming or failure evidence. Closure status: pending, held, failed, superseded.',
    color: 'violet',
  },
  {
    id: 8,
    label: 'recurrence check',
    desc: 'Did the class come back? If yes — failure_evidence. If no across the window — confirming_evidence accumulates.',
    color: 'sky',
  },
  {
    id: 9,
    label: 'revision or confidence',
    desc: 'Failed closures revise the proposal; held closures raise confidence. The loop is recursive, not one-shot.',
    color: 'cyan',
  },
]

const colorMap: Record<string, { dot: string; ring: string; line: string; text: string }> = {
  cyan: { dot: 'bg-cyan-500/20', ring: 'border-cyan-500/40', line: 'bg-cyan-700/40', text: 'text-cyan-300' },
  sky: { dot: 'bg-sky-500/20', ring: 'border-sky-500/40', line: 'bg-sky-700/40', text: 'text-sky-300' },
  indigo: { dot: 'bg-indigo-500/20', ring: 'border-indigo-500/40', line: 'bg-indigo-700/40', text: 'text-indigo-300' },
  violet: { dot: 'bg-violet-500/20', ring: 'border-violet-500/40', line: 'bg-violet-700/40', text: 'text-violet-300' },
}

const MISMATCH_CATEGORIES = [
  { id: 'artifact_contract', desc: 'Agent produced output in a non-durable form (stdout only, ephemeral file) when a durable artifact was expected.' },
  { id: 'intent_drift', desc: 'Agent diverged from what the user asked for — solved a related but different problem.' },
  { id: 'abstraction_level', desc: 'Agent produced task/bug-level output when process-level insight was requested.' },
  { id: 'completion_claim', desc: 'Agent declared done without citing verification evidence — no test output, no file path, no commit hash.' },
  { id: 'skill_miss', desc: 'A named skill should have been triggered, audited, or invoked — and was not.' },
  { id: 'repeated_loop', desc: 'Same correction or request repeated three or more times in a session without resolution.' },
  { id: 'planning_gap', desc: 'Work proceeded without the planning artifact a process gate required — spec, plan, or design doc missing.' },
  { id: 'scope_drift', desc: 'Work expanded beyond the asked scope without an explicit decision or trace.' },
  { id: 'none', desc: 'No mismatch detected. The interaction conformed to the expected process — kept for recurrence statistics.' },
]

const GATE_CRITERIA = [
  {
    name: 'Recurrence evidence',
    desc: 'Normally ≥ 2 occurrences within the configured window (default 30 days). High-impact single deviations — policy without verification, safety-critical regressions — may be promotable with human review.',
  },
  {
    name: 'Abstraction level',
    desc: 'The insight must be statable without naming a specific project, file, branch, or session. If you cannot remove those, it is still a project note — not a reusable process insight.',
  },
  {
    name: 'Concrete control type and surface',
    desc: 'Primary surface chosen from a fixed set: cei_policy, workflow_gate, hook, skill_trigger, regression_case, adapter_rule, agent_rule. No "we should think about" candidates.',
  },
  {
    name: 'Verification case defined',
    desc: 'The candidate must declare confirming_evidence, failure_evidence, a time_window, and a check_command or check_query before it can be promoted. No verification case → no promotion.',
  },
  {
    name: 'Review mode recorded',
    desc: 'auto for low-risk controls (e.g. adapter rules, regression cases); human for high-impact (skill triggers, agent rules, global policies). The mode is part of the route.',
  },
]

const REASONING_ROUTES = [
  {
    skill: '/chat-triage',
    role: 'Diagnoses repeated conversational loops — the repeated_loop and anchor_lock mismatch classes.',
  },
  {
    skill: '/skill-auditor',
    role: 'Audits a skill after a run when its behavior was missed or mishandled — the skill_miss class.',
  },
  {
    skill: '/system-validation',
    role: 'Generates behavioral proof when a target system is uncertain — feeds verification cases.',
  },
  {
    skill: 'GSD workflows',
    role: 'Planning, execution, debugging, forensics, and learnings — invoked via promotion routes.',
  },
]

export function LearningLoop() {
  return (
    <div className="py-10">
      <SectionLabel>The Recursive Loop</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-3 max-w-2xl">
        Every observed mismatch is on a path that may or may not become a durable control. The loop is
        recursive because verification can fail — a promoted control that does not hold becomes new evidence,
        which feeds the next pass.
      </p>
      <p className="text-slate-500 text-xs leading-relaxed mb-8 max-w-2xl">
        Memory alone is not learning. Promotion plus verification closure is learning.
      </p>

      <div className="bg-slate-950 rounded-2xl p-8 mb-14">
        <div className="space-y-0">
          {LOOP_STAGES.map((stage, i) => {
            const c = colorMap[stage.color]
            return (
              <div key={stage.id}>
                <div className="flex items-start gap-4">
                  <div className={`w-7 h-7 rounded-full ${c.dot} border ${c.ring} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <span className={`${c.text} text-xs font-bold font-mono`}>{stage.id}</span>
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="text-white text-sm font-semibold font-mono">{stage.label}</div>
                    <div className="text-white/50 text-xs leading-relaxed mt-0.5">{stage.desc}</div>
                  </div>
                </div>
                {i < LOOP_STAGES.length - 1 && (
                  <div className="ml-3 flex items-center gap-3 py-1.5">
                    <div className={`w-px h-4 ${c.line}`} />
                  </div>
                )}
              </div>
            )
          })}
          <div className="ml-3 pt-2 flex items-center gap-2 text-white/35 text-xs font-mono">
            <span>↺</span>
            <span>back to step 1 with new evidence</span>
          </div>
        </div>
      </div>

      <SectionLabel>Nine Mismatch Categories</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
        The mismatch_category field on every interaction trace is the routing key for the entire downstream
        loop — conformance scoring, recurrence counting, skill routing, and control generation all read it.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-14">
        {MISMATCH_CATEGORIES.map((cat) => (
          <div key={cat.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <code className="text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded text-xs font-mono font-semibold inline-block mb-2">{cat.id}</code>
            <p className="text-slate-500 text-xs leading-relaxed">{cat.desc}</p>
          </div>
        ))}
      </div>

      <SectionLabel>Promotion Gate Criteria</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
        A learning candidate becomes a durable control only when it clears five criteria. Anything less stays
        as a candidate with evidence — never as silent mutation of an installed skill or rule.
      </p>

      <div className="space-y-3 mb-14">
        {GATE_CRITERIA.map((g, i) => (
          <div key={g.name} className="flex gap-4 bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center">
                <span className="text-sky-700 text-xs font-bold font-mono">{String(i + 1).padStart(2, '0')}</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm mb-1">{g.name}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{g.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>From Skills to Systems</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-3 max-w-2xl">
        Earlier work shipped standalone skills — composable building blocks for narrow QA and audit jobs. CEI
        does not replace them. It coordinates them.
      </p>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
        Reusable skill source still lives in <code className="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">joescohen/claude-skills</code>;
        CEI tracks role, version, installed state, audit history, and promotion decisions in its skill
        registry. The skills below plug into the Reasoning Layer as routes — not as a hardcoded pipeline.
      </p>

      <div className="space-y-2 mb-10">
        {REASONING_ROUTES.map((r) => (
          <div key={r.skill} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            <code className="text-violet-700 bg-violet-50 px-2 py-0.5 rounded text-xs font-mono font-semibold flex-shrink-0">{r.skill}</code>
            <span className="text-slate-600 text-sm leading-relaxed">{r.role}</span>
          </div>
        ))}
      </div>

      <p className="text-slate-500 text-xs leading-relaxed max-w-2xl italic">
        The shift: from a bag of skills the user invokes to a control plane that decides which skill to
        invoke, observes the result, and learns whether the choice held.
      </p>
    </div>
  )
}
