import { SectionLabel } from '../../../components/SectionLabel'

export function Overview() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <SectionLabel>Project Summary</SectionLabel>
        <p className="text-sm text-slate-600 leading-relaxed">
          ANGARS is a conceptual autonomous aerial refueling system designed to address a critical
          Air Force capability gap. Traditional human-operated refueling is incompatible with
          contested environments and unmanned aircraft — ANGARS replaces it with an AI-driven,
          multi-sensor architecture capable of autonomous docking and fuel transfer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-50 rounded-lg p-5">
          <SectionLabel>SE Process Applied</SectionLabel>
          <ol className="space-y-2 mt-1">
            {[
              'Needs Analysis & Requirements',
              'Functional Analysis (CONOPS)',
              'Physical Architecture Design',
              'Trade Study & Selection',
              'Test Plan & Specification',
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    i >= 3 ? 'bg-orange-500' : 'bg-navy'
                  }`}
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-slate-50 rounded-lg p-5">
          <SectionLabel>Key Outcomes</SectionLabel>
          <ul className="space-y-1.5 mt-1">
            {[
              '189 traceable system requirements',
              '76.7% quantitative (0 qualitative)',
              '6-subsystem physical architecture',
              'Active Fusion selected via trade study',
              'All risks mitigated to Low/Medium',
              'Full functional-to-physical traceability',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-orange-500 font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <SectionLabel>Tools & Methods</SectionLabel>
        <div className="flex flex-wrap gap-2 mt-2">
          {[
            'Cameo Systems Modeler', 'SysML', 'MBSE',
            'Earned Value Management', 'Pairwise Trade Study',
            'Risk Management', 'N2 Diagrams', 'OV-1 CONOPS',
          ].map((tool) => (
            <span key={tool} className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
