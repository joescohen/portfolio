import { SectionLabel } from '../../../components/SectionLabel'

type PhaseStatus = 'in-progress' | 'planned' | 'next'

const PHASES: Array<{
  id: string
  name: string
  status: PhaseStatus
  desc: string
  exit: string[]
}> = [
  {
    id: 'Phase 1',
    name: 'Project Registry & Skill Inventory',
    status: 'in-progress',
    desc: 'Define the target project registry, inventory existing skills, and classify each skill by its role in the CEI loop.',
    exit: [
      'registry/projects.yaml records SEPAL as target zero',
      'registry/skills.yaml lists imported and wrapped skills with intended CEI role',
      'Initial skill references copied or linked into skills/imported',
    ],
  },
  {
    id: 'Phase 2',
    name: 'Run Receipt & Memory Brief Schema',
    status: 'in-progress',
    desc: 'Define the normalized run receipt shape and the first memory brief output format that the CLI will produce.',
    exit: [
      'Run receipt schema documented',
      'Memory brief template documented',
      'claude-mem adapter responsibilities described',
    ],
  },
  {
    id: 'Phase 3',
    name: 'Learning Reflector',
    status: 'next',
    desc: 'Classify run receipts and traces into learning candidates with stable ids, evidence, scope, and route.',
    exit: [
      'Outcome taxonomy defined',
      'Learning candidate schema documented',
      'Example SEPAL learning candidates generated from recent history',
    ],
  },
  {
    id: 'Phase 4',
    name: 'Promotion Router',
    status: 'planned',
    desc: 'Route learning candidates into concrete destinations via registry/learning-routes.yaml — the promotion gate enforced.',
    exit: [
      'Route table covers skill audit, system validation, chat triage, eval, policy, roadmap, backlog, adapter rule',
      'Promotion record template exists with verification method field',
      'At least one SEPAL learning routed and reviewed',
    ],
  },
  {
    id: 'Phase 5',
    name: 'Target Zero Validation',
    status: 'planned',
    desc: 'Use SEPAL end-to-end to prove the loop produces a durable artifact that catches recurrence.',
    exit: [
      'Recent SEPAL failure produces a run receipt',
      'CEI generates a learning candidate from the receipt',
      'Candidate is promoted into a durable artifact',
      'Verification proves the artifact would catch or prevent recurrence',
    ],
  },
  {
    id: 'Phase 6',
    name: 'Skill Sync & Wrapper Strategy',
    status: 'planned',
    desc: 'Decide how CEI manages installed skills across Claude/Codex environments without silent mutation.',
    exit: [
      'Canonical / wrapped / imported skill policy documented',
      'Sync plan exists for .claude/skills and .agents/skills',
      'Skill changes require approval and verification',
    ],
  },
]

const STATUS_STYLES: Record<PhaseStatus, { label: string; pill: string; ring: string; bar: string }> = {
  'in-progress': {
    label: 'in progress',
    pill: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    ring: 'border-cyan-500/60 bg-cyan-500/10',
    bar: 'bg-cyan-500',
  },
  next: {
    label: 'up next',
    pill: 'bg-sky-100 text-sky-700 border-sky-200',
    ring: 'border-sky-500/40 bg-sky-500/5',
    bar: 'bg-sky-500/70',
  },
  planned: {
    label: 'planned',
    pill: 'bg-slate-100 text-slate-500 border-slate-200',
    ring: 'border-slate-300 bg-slate-50',
    bar: 'bg-slate-300',
  },
}

const CLI_COMMANDS = [
  {
    cmd: 'cei brief --target sepal --days 2',
    desc: 'Read CEI registries, recent claude-mem entries, target git status/commits, and planning metadata. Write durable artifacts under outputs/briefs/<target>-<timestamp>/.',
    status: 'MVP target',
  },
  {
    cmd: 'cei promote --candidate <id>',
    desc: 'Write a promotion record under learning/promotions/ with candidate id, route, evidence, durable artifact target, and verification method.',
    status: 'Phase 4',
  },
  {
    cmd: 'cei skills sync-check',
    desc: 'Compare CEI registry entries against installed skill directories. Report canonical upstream source, installed source, local snapshot, and drift status.',
    status: 'Phase 6',
  },
]

export function Roadmap() {
  return (
    <div className="py-10">
      <SectionLabel>Milestone 1 — Umbrella & Learning Loop MVP</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-3 max-w-2xl">
        Goal: establish CEI as a standalone project and prove a minimal recursive learning loop against SEPAL
        as target zero. Six phases. The first three define schemas and inventory; the next three close the
        loop end-to-end and decide the skill-sync policy.
      </p>
      <p className="text-slate-500 text-xs leading-relaxed mb-10 max-w-2xl">
        No dashboard before the loop is proven. No silent mutation of installed skills. Promotion plus
        verification, or it does not count.
      </p>

      <div className="relative pl-8 mb-14">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-slate-200" />
        <div className="space-y-5">
          {PHASES.map((phase, i) => {
            const style = STATUS_STYLES[phase.status]
            return (
              <div key={phase.id} className="relative">
                <div className={`absolute -left-[1.40rem] top-3 w-5 h-5 rounded-full border-2 ${style.ring} flex items-center justify-center`}>
                  <span className="text-[10px] font-bold font-mono text-slate-700">{i + 1}</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-premium">
                  <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
                    <div className="flex items-baseline gap-3">
                      <span className="text-cyan-700 text-xs font-bold uppercase tracking-widest font-mono">{phase.id}</span>
                      <span className="text-slate-900 text-sm font-bold">{phase.name}</span>
                    </div>
                    <span className={`${style.pill} border text-xs font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full`}>
                      {style.label}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">{phase.desc}</p>
                  <div className="space-y-1">
                    {phase.exit.map((e) => (
                      <div key={e} className="flex gap-2 text-slate-500 text-xs">
                        <span className="text-cyan-500 mt-0.5 flex-shrink-0">›</span>
                        <span>{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <SectionLabel>M1 CLI Surface</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
        The MVP is a command, not a dashboard. Three commands cover the brief, the promotion record, and the
        skill-sync check. Output is durable Markdown plus structured JSON — never stdout-only.
      </p>

      <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 mb-14">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-white/30 text-xs ml-2 font-mono">cei — milestone 1 surface</span>
        </div>
        <div className="divide-y divide-slate-800">
          {CLI_COMMANDS.map((c) => (
            <div key={c.cmd} className="px-5 py-4">
              <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
                <code className="text-cyan-300 text-xs font-mono">{c.cmd}</code>
                <span className="text-white/30 text-xs font-mono uppercase tracking-wider">{c.status}</span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <SectionLabel>Target Zero — SEPAL</SectionLabel>
      <div className="bg-slate-950 rounded-2xl p-6 mb-14">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <span className="text-emerald-300 text-xs font-bold font-mono">T0</span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-1">SEPAL is the first target — intentionally a target, not the host.</p>
            <p className="text-white/50 text-xs leading-relaxed mb-3">
              CEI stays outside SEPAL and addresses it through the <code className="text-emerald-300 font-mono bg-emerald-500/10 px-1 rounded">adapters/sepal</code> adapter.
              SEPAL is rich enough to surface real user-agent mismatches: skill DAG gates, planning artifacts,
              corpus logs, validation cases. If the loop closes here, the same contract works for the
              portfolio repo, travel-tool, and future targets.
            </p>
            <div className="flex flex-wrap gap-2">
              {['generic-repo', 'claude-mem', 'sepal'].map((a) => (
                <code key={a} className="text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded text-xs font-mono">
                  adapters/{a}
                </code>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionLabel>Non-Goals (for now)</SectionLabel>
      <ul className="text-slate-600 text-sm leading-relaxed max-w-2xl space-y-2">
        <li className="flex gap-3"><span className="text-slate-400 flex-shrink-0">›</span><span>No embedding CEI into SEPAL as SEPAL-specific infrastructure — the boundary is part of the design.</span></li>
        <li className="flex gap-3"><span className="text-slate-400 flex-shrink-0">›</span><span>No silent mutation of installed skills. Promotion is gated; review mode is recorded.</span></li>
        <li className="flex gap-3"><span className="text-slate-400 flex-shrink-0">›</span><span>No treating transcript memory as sufficient learning. Memory is evidence; promotion plus verification is learning.</span></li>
        <li className="flex gap-3"><span className="text-slate-400 flex-shrink-0">›</span><span>No large product surface before the learning loop is proven. The first deliverable is a single useful command.</span></li>
      </ul>
    </div>
  )
}
