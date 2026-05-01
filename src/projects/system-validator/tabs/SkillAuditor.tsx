import { SectionLabel } from '../../../components/SectionLabel'

const AUDIT_PHASES = [
  {
    step: '01',
    name: 'Report Ingestion',
    desc: 'Reads audit-report.md and validation-matrix.md from the completed pipeline run. Reconstructs which rows were executed, what verification methods were used, and which requirements trace to each finding.',
  },
  {
    step: '02',
    name: 'Coverage Gap Analysis',
    desc: 'Cross-references every requirement in specification.md against the executed matrix rows. Identifies requirements with no test coverage, methods that were under-represented, and STAMP risk areas that mapped to zero rows.',
  },
  {
    step: '03',
    name: 'Method Audit',
    desc: 'Checks that all four NASA verification methods were appropriately applied across the matrix. Flags high-risk requirements covered by only one method type when multi-method coverage was warranted by their risk score.',
  },
  {
    step: '04',
    name: 'Fix Generation',
    desc: 'For each gap, generates the minimum concrete fix: new matrix rows, corrected requirement traces, additional verification methods, or specification clarifications. Fixes that can\'t be made deterministically are escalated.',
  },
  {
    step: '05',
    name: 'Patch Application',
    desc: 'Applies approved fixes directly to validation-matrix.md and specification.md. Produces a structured AUDIT_COMPLETE checkpoint listing every change — enabling the Conductor to dispatch a targeted re-run covering only patched rows.',
  },
]

const GAP_TYPES = [
  {
    label: 'Untested Requirements',
    desc: 'Requirements present in the spec with zero corresponding matrix rows. Common when the Matrix Agent over-clusters or when a late spec amendment wasn\'t propagated to the matrix.',
    tag: 'Coverage',
  },
  {
    label: 'Method Monoculture',
    desc: 'High-risk requirements covered only by Demonstration, missing Analysis or Inspection rows. Single-method coverage on critical paths leaves data invariants and DOM state unverified.',
    tag: 'Method Depth',
  },
  {
    label: 'Orphaned Findings',
    desc: 'Findings in the audit report that don\'t trace back to any specification requirement — indicating the spec missed a real system behavior that surfaced during execution.',
    tag: 'Traceability',
  },
  {
    label: 'Cluster Imbalance',
    desc: 'T1 cluster contains fewer rows than T2/T3 combined, suggesting the Matrix Agent misfiled rows by risk tier. Directly undermines the pipeline\'s risk-first execution order.',
    tag: 'Risk Ordering',
  },
  {
    label: 'Missing Interaction Rows',
    desc: 'STAMP risk areas in the spec (Component A × Component B) that have no dedicated matrix rows covering the specific interaction — only individual component rows that don\'t test the hazardous state.',
    tag: 'STAMP Coverage',
  },
  {
    label: 'Directive Drift',
    desc: 'User directives from the calibration checkpoint that are absent or only partially covered in the matrix. Any gap here is a blocking finding — directives are mandatory, not weighted.',
    tag: 'Directive Compliance',
  },
]

const AUDIT_CHECKPOINT = `## CHECKPOINT: AUDIT_COMPLETE
- run_id: 2025-01-15-T14:32
- gaps_found: 3
- gaps_fixed: 2
- gaps_escalated: 1
- fixes_applied:
  - type: missing_rows
    requirement: REQ-7 (keyboard navigation)
    rows_added: 2
    method: Demonstration + Analysis
  - type: method_gap
    requirement: REQ-3 (auth state persistence)
    added: Analysis row (localStorage inspection)
- escalations:
  - requirement: REQ-11 (rate limiting)
    reason: spec_ambiguous — no falsifiable expected result
    action: human_spec_review_needed`

export function SkillAuditor() {
  return (
    <div className="py-10">

      {/* Intro callout */}
      <div className="bg-slate-950 border border-amber-700/30 rounded-2xl p-7 mb-12">
        <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
          The Quality-of-Quality Problem
        </div>
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          <code className="text-amber-300 font-mono bg-white/5 px-1.5 py-0.5 rounded">/system-validation</code> produces
          a structured audit report — but the pipeline itself can fail silently. The Matrix Agent may miss requirements.
          Clusters may be mis-tiered. User directives may not propagate fully into the matrix. A completed run
          doesn't mean full coverage.
        </p>
        <p className="text-white/70 text-sm leading-relaxed mb-5">
          <code className="text-amber-300 font-mono bg-white/5 px-1.5 py-0.5 rounded">/skill-auditor</code> runs after
          the pipeline completes. It reads the pipeline's own artifacts, reconstructs what was and wasn't tested,
          identifies gaps by category, and either fixes them directly or escalates them with a reason code.
          It's the QA for the QA.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Input', value: 'audit-report.md · validation-matrix.md · specification.md' },
            { label: 'Output', value: 'Gap report · patched matrix + spec · AUDIT_COMPLETE checkpoint' },
            { label: 'Relationship', value: 'Companion to /system-validation — post-run, not in-band. Targets what the pipeline missed.' },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 rounded-lg p-4">
              <div className="text-white/30 text-xs uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-white/60 text-xs leading-relaxed">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionLabel>Audit Phases</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-2xl">
        Five sequential phases, each with a defined artifact scope. Each phase reads only what it needs
        and emits structured findings before the next begins — no phase depends on another's internal state,
        only its output.
      </p>

      <div className="space-y-3 mb-14">
        {AUDIT_PHASES.map((phase) => (
          <div key={phase.step} className="flex gap-5 items-start bg-slate-950 rounded-xl p-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-700/40 flex items-center justify-center">
              <span className="text-amber-400 text-xs font-bold font-mono">{phase.step}</span>
            </div>
            <div>
              <div className="text-amber-300 text-sm font-bold mb-1">{phase.name}</div>
              <p className="text-white/55 text-xs leading-relaxed">{phase.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>Gap Detection Categories</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-2xl">
        Six gap types cover the most common pipeline failure modes — from missed requirements and method
        monoculture to STAMP coverage holes and directive drift.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {GAP_TYPES.map((gap) => (
          <div key={gap.label} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-slate-900 text-sm">{gap.label}</h4>
              <span className="text-xs text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full ml-3 flex-shrink-0">
                {gap.tag}
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">{gap.desc}</p>
          </div>
        ))}
      </div>

      <SectionLabel>Checkpoint Output</SectionLabel>
      <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-2xl">
        The auditor emits an <code className="bg-slate-100 text-amber-700 px-1 rounded font-mono">AUDIT_COMPLETE</code> checkpoint
        listing every gap found, every fix applied, and any items escalated for human review. Escalated items are
        never silently dropped — each carries a reason code and recommended action so the coverage gap remains visible
        even when automation can't close it.
      </p>

      <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 mb-10">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-white/30 text-xs ml-2 font-mono">checkpoint-contract — AUDIT_COMPLETE example</span>
        </div>
        <pre className="p-5 text-xs leading-relaxed overflow-x-auto">
          {AUDIT_CHECKPOINT.split('\n').map((line, i) => {
            const isHeader = line.startsWith('##')
            const isTopKey = line.trimStart().startsWith('-') && line.includes(':') && !line.startsWith('    ')
            return (
              <span key={i} className="block">
                {isHeader ? (
                  <span className="text-amber-400 font-bold">{line}</span>
                ) : isTopKey ? (
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

      <SectionLabel>Source</SectionLabel>
      <div className="bg-slate-950 rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-semibold mb-1">joescohen/claude-skills</p>
          <p className="text-white/40 text-xs">Claude Code skill · Public · MIT</p>
        </div>
        <a
          href="https://github.com/joescohen/claude-skills"
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
