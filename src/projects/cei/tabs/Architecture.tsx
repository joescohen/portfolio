import { SectionLabel } from '../../../components/SectionLabel'

type Layer = {
  id: string
  name: string
  desc: string
  details: string[]
}

type LayerGroup = {
  groupId: string
  groupName: string
  groupDesc: string
  color: string
  border: string
  bg: string
  layers: Layer[]
}

const GROUPS: LayerGroup[] = [
  {
    groupId: 'observe',
    groupName: 'Observation & Trace',
    groupDesc: 'Collect raw evidence and normalize it into typed interaction traces.',
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/5',
    layers: [
      {
        id: 'L1',
        name: 'Observation Layer',
        desc: 'Collects raw evidence from across the agent-assisted workflow.',
        details: [
          'Conversation turns, user corrections, agent responses',
          'claude-mem prompts, observations, session summaries',
          'Git history and working tree state',
          'Terminal logs and command output',
          'Validation artifacts, test/eval results, planning files',
        ],
      },
      {
        id: 'L2',
        name: 'Interaction Trace Layer',
        desc: 'Normalizes raw evidence into typed process traces — the routing key for everything downstream.',
        details: [
          'requested_outcome, inferred_intent, agent_action',
          'artifact_produced, verification_performed',
          'user_correction and repeated_correction_count',
          'mismatch_category (the routing key for all conformance and skill routing)',
          'final_outcome: resolved | escalated | abandoned | pending',
        ],
      },
    ],
  },
  {
    groupId: 'process',
    groupName: 'Process Model & Conformance',
    groupDesc: 'Define the expected development process and compare actual traces against it.',
    color: 'text-sky-400',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/5',
    layers: [
      {
        id: 'L3',
        name: 'Process Model Layer',
        desc: 'Implementable rules — not descriptive paragraphs. Each rule has a trigger, a conformance check, a deviation signal, and a recurrence threshold.',
        details: [
          'Report/audit/brief commands write durable artifacts and print paths',
          'Completion claims include verification evidence',
          'Explicit user corrections evaluated as process-insight candidates',
          'Abstraction-level language triggers process-insight mode',
          'Named skill failures trigger /skill-auditor',
          'Repeated loops trigger /chat-triage',
        ],
      },
      {
        id: 'L4',
        name: 'Conformance & Recurrence Layer',
        desc: 'Compares actual traces against the expected process model and counts how often each deviation class recurs.',
        details: [
          'Conformance deviations and recurrence counts',
          'Abstraction-level failures and missed skill triggers',
          'Missing artifact contracts',
          'Correction-to-control gaps',
          'Default threshold: 2 matching deviations within 30 days (route may override)',
        ],
      },
    ],
  },
  {
    groupId: 'memory',
    groupName: 'Memory & Reasoning',
    groupDesc: 'Store learning records with lifecycle state, and coordinate the existing skill ecosystem.',
    color: 'text-indigo-300',
    border: 'border-indigo-500/30',
    bg: 'bg-indigo-500/5',
    layers: [
      {
        id: 'L5',
        name: 'Memory Layer',
        desc: 'Stores run receipts, interaction traces, insights, cases, policies, and promotion decisions. Records carry lifecycle state.',
        details: [
          'Run receipt per execution: run_id, target, trigger, layers_executed, outputs_produced',
          'Interaction traces and process insights',
          'Learning cases and reusable policies',
          'Promotion decisions and target metadata',
          'Lifecycle states: proposed, active, held, failed, superseded, retired',
        ],
      },
      {
        id: 'L6',
        name: 'Reasoning Layer',
        desc: 'Coordinates existing skills and future CEI workflows as routes — not as a hardcoded pipeline.',
        details: [
          '/chat-triage for repeated conversational loops',
          '/skill-auditor for missed or mishandled skill behavior',
          '/system-validation for user-facing behavioral proof',
          'GSD workflows for planning, execution, debugging, learnings',
          'Future process-insight-reflector and CEI self-eval',
        ],
      },
    ],
  },
  {
    groupId: 'control',
    groupName: 'Control · Promotion · Verification',
    groupDesc: 'Generate durable controls, route them through a promotion gate, and prove they held.',
    color: 'text-violet-300',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/5',
    layers: [
      {
        id: 'L7',
        name: 'Control Generation Layer',
        desc: 'Produces a control bundle — primary surface plus supporting surfaces — not a single default destination.',
        details: [
          'Surfaces: cei_policy, workflow_gate, hook, skill_trigger, regression_case, adapter_rule, agent_rule',
          'Output bundle: primary_surface, supporting_surfaces, target_artifacts, verification_case',
          'CLAUDE.md is appropriate for lightweight routing — not for abstract process lessons',
          'Controls must prevent a class of recurrence, not describe one instance',
        ],
      },
      {
        id: 'L8',
        name: 'Promotion Layer',
        desc: 'Routes candidates into durable destinations only when they pass the promotion gate.',
        details: [
          'Recurrence evidence (≥2 occurrences within window, unless high-impact)',
          'Abstraction above the concrete task instance (no project/file/branch names)',
          'Concrete control type and target surface defined',
          'Verification case defined at promotion time',
          'Review mode: auto for low-risk, human for high-impact',
        ],
      },
      {
        id: 'L9',
        name: 'Verification Closure Layer',
        desc: 'Executes and measures whether promoted controls actually held. Closure status feeds confidence back into the loop.',
        details: [
          'confirming_evidence: observable proof the control is working',
          'failure_evidence: recurrence proof the control failed',
          'time_window and check_command/check_query',
          'closure_status: pending | held | failed | superseded',
          'Failed closures revise the proposal; held closures raise confidence',
        ],
      },
    ],
  },
  {
    groupId: 'adapter',
    groupName: 'Adapter',
    groupDesc: 'Translate CEI into project-specific context. Targets are pluggable; the core stays project-agnostic.',
    color: 'text-emerald-300',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
    layers: [
      {
        id: 'L10',
        name: 'Adapter Layer',
        desc: 'Single contract per adapter: observe, extract traces, resolve artifacts, get metadata, apply controls.',
        details: [
          'generic-repo: git, README, tests, logs',
          'claude-mem: memory search and timeline reconstruction',
          'sepal: .planning, .sepal, skill DAGs, corpus logs, SEPAL-specific artifacts',
          'apply_control is adapter-specific — SEPAL may apply a skill DAG gate or .sepal control',
          'Target-specific assumptions never leak into the CEI core',
        ],
      },
    ],
  },
]

const INTERACTION_TRACE_JSON = `{
  "trace_id": "string",
  "timestamp": "ISO8601",
  "target": "string",
  "requested_outcome": "string",
  "inferred_intent": "string",
  "agent_action": "string",
  "artifact_produced": "string | null",
  "verification_performed": "boolean",
  "user_correction": "string | null",
  "mismatch_category":
    "artifact_contract | intent_drift | abstraction_level |
     completion_claim | skill_miss | repeated_loop |
     planning_gap | scope_drift | none",
  "repeated_correction_count": "integer",
  "recurrence_class": "string | null",
  "final_outcome": "resolved | escalated | abandoned | pending"
}`

const RUN_RECEIPT_JSON = `{
  "run_id": "string",
  "timestamp": "ISO8601",
  "target": "string",
  "trigger": "string",
  "layers_executed": ["string"],
  "outputs_produced": ["artifact-ref"],
  "duration_ms": "number",
  "errors": ["string"]
}`

const CONTROL_BUNDLE_JSON = `{
  "primary_surface":
    "cei_policy | workflow_gate | hook | skill_trigger |
     regression_case | adapter_rule | agent_rule",
  "supporting_surfaces": ["string"],
  "target_artifacts": ["artifact-ref"],
  "verification_case": "verification-case-ref"
}`

const DATA_SHAPES = [
  {
    name: 'InteractionTrace',
    where: 'Layer 2 → routing key for the entire downstream loop',
    json: INTERACTION_TRACE_JSON,
  },
  {
    name: 'RunReceipt',
    where: 'Layer 5 → written once per CEI execution',
    json: RUN_RECEIPT_JSON,
  },
  {
    name: 'ControlBundle',
    where: 'Layer 7 → produced at control generation, consumed at promotion',
    json: CONTROL_BUNDLE_JSON,
  },
]

export function Architecture() {
  return (
    <div className="py-10">
      <SectionLabel>Ten-Layer Stack</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-3 max-w-2xl">
        Each layer is a distinct responsibility — but they compose into one recursive loop. The layers are
        grouped here by stage so the data flow is readable at a glance: observation feeds traces, traces feed
        conformance, conformance feeds memory and reasoning, reasoning feeds control generation, controls
        pass through promotion to verification, and the adapter keeps the whole thing project-agnostic.
      </p>
      <p className="text-slate-500 text-xs leading-relaxed mb-8 max-w-2xl">
        Evidence flows up. Confidence flows down. A promoted control that fails verification is revised, not
        deleted — the failure becomes new evidence.
      </p>

      <div className="space-y-6 mb-14">
        {GROUPS.map((group) => (
          <div key={group.groupId} className={`${group.bg} border ${group.border} rounded-2xl p-6`}>
            <div className="flex items-baseline gap-3 mb-1">
              <span className={`${group.color} text-xs font-bold uppercase tracking-widest`}>{group.groupName}</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-5">{group.groupDesc}</p>
            <div className="space-y-3">
              {group.layers.map((layer) => (
                <div key={layer.id} className="bg-white/70 border border-slate-200 rounded-xl p-5">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className={`${group.color} text-xs font-bold font-mono`}>{layer.id}</span>
                    <span className="text-slate-900 text-sm font-bold">{layer.name}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">{layer.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                    {layer.details.map((d) => (
                      <div key={d} className="flex gap-2 text-slate-500 text-xs">
                        <span className={`${group.color} mt-0.5 flex-shrink-0`}>›</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>Key Data Shapes</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
        Three typed records carry state through the loop. They are the contract between layers — and the
        contract between CEI and any target adapter.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-14">
        {DATA_SHAPES.map((shape) => (
          <div key={shape.name} className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
            <div className="px-5 py-3 border-b border-slate-800">
              <div className="text-cyan-400 text-xs font-bold font-mono">{shape.name}</div>
              <div className="text-white/40 text-xs mt-0.5">{shape.where}</div>
            </div>
            <pre className="p-4 text-xs leading-relaxed overflow-x-auto text-white/70">
{shape.json}
            </pre>
          </div>
        ))}
      </div>

      <SectionLabel>Why ten layers</SectionLabel>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          {
            q: 'Why split observation from trace?',
            a: 'Raw evidence is noisy and target-specific. The interaction trace is the typed, project-agnostic record that conformance, recurrence, skill routing, and control generation can all share without re-parsing logs.',
          },
          {
            q: 'Why a process model at all?',
            a: 'Without an explicit expected process, there is nothing to be non-conformant with — every event is just an event. The Process Model defines the gates that traces are scored against, and recurrence is what makes a deviation actionable.',
          },
          {
            q: 'Why a promotion gate?',
            a: 'Silent mutation of skills, hooks, or CLAUDE.md files is how learning systems poison themselves. The gate enforces evidence, abstraction level, control type, and a verification case before anything becomes durable.',
          },
          {
            q: 'Why a verification closure layer?',
            a: 'A promoted control that nobody measures is a note in a different file. Closure makes the loop recursive: held controls raise confidence, failed controls revise the proposal, and the system learns from its own learning.',
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
