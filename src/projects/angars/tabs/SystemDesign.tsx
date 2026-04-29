import { SectionLabel } from '../../../components/SectionLabel'

export function SystemDesign() {
  return (
    <div className="space-y-10">
      {/* Functional Analysis */}
      <div>
        <SectionLabel>Functional Analysis</SectionLabel>
        <p className="text-sm text-slate-600 mb-4 max-w-2xl">
          Using SysML in Cameo Systems Modeler, ANGARS behaviors were decomposed from 9 top-level
          functions to Level-3 sub-functions, with a state machine, activity diagrams, and N2
          diagram ensuring complete requirement coverage.
        </p>
        <div className="space-y-4">
          <img
            src="/assets/angars/context-diagram.png"
            alt="ANGARS Functional Context Diagram"
            className="w-full rounded-lg shadow-md border border-slate-200"
          />
          <img
            src="/assets/angars/functional-hierarchy.png"
            alt="ANGARS Functional Hierarchy"
            className="w-full rounded-lg shadow-md border border-slate-200"
          />
        </div>
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-orange-800">
            All functional requirements are satisfied by at least one system behavior — verified
            through full functional-to-requirement traceability matrix.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-slate-200 pt-2">
        <SectionLabel>Physical Concept</SectionLabel>
      </div>

      <div className="space-y-4 -mt-4">
        <p className="text-sm text-slate-600 max-w-2xl">
          The physical architecture decomposes ANGARS into six subsystems. Every function is
          allocated to exactly one component, and every component has at least one function —
          verified via dual-sided traceability matrix.
        </p>
        <img
          src="/assets/angars/physical-block-diagram.png"
          alt="ANGARS Top-Level Physical Block Diagram"
          className="w-full rounded-lg shadow-md border border-slate-200"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: 'Autonomous Guidance & Navigation Sensors', color: 'bg-cyan-600' },
            { name: 'Command & Control', color: 'bg-teal-700' },
            { name: 'Communications', color: 'bg-blue-600' },
            { name: 'Fuel Transfer', color: 'bg-green-600' },
            { name: 'Power', color: 'bg-emerald-500' },
            { name: 'Processing', color: 'bg-purple-600' },
          ].map((s) => (
            <div key={s.name} className={`${s.color} rounded-lg p-3 text-white text-xs font-semibold leading-tight`}>
              {s.name}
            </div>
          ))}
        </div>
        <div className="bg-navy/5 border border-navy/20 rounded-lg p-4">
          <p className="text-sm font-semibold text-navy">
            Each function allocated to exactly one component — verified via physical-to-functional
            traceability matrix covering all 189 requirements.
          </p>
        </div>
      </div>
    </div>
  )
}
