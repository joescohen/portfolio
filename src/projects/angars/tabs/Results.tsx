import { SectionLabel } from '../../../components/SectionLabel'

const RISKS = [
  { id: 'R1', title: 'Navigation System Accuracy', initL: 5, initC: 5, finalL: 2, finalC: 4 },
  { id: 'R2', title: 'Communication System Failure', initL: 3, initC: 5, finalL: 1, finalC: 5 },
  { id: 'R3', title: 'Collision Avoidance Failure', initL: 2, initC: 5, finalL: 1, finalC: 5 },
  { id: 'R4', title: 'KC-46 Integration Challenges', initL: 3, initC: 4, finalL: 2, finalC: 3 },
]

function riskCellClass(l: number, c: number): string {
  const score = l * c
  if (score >= 15) return 'bg-red-100 text-red-700 font-bold'
  if (score >= 6) return 'bg-yellow-100 text-yellow-700 font-bold'
  return 'bg-green-100 text-green-700 font-bold'
}

export function Results() {
  return (
    <div className="space-y-8">
      <div>
        <SectionLabel>Specification Metrics — RAR → ASPEC</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {[
            { label: 'Total Requirements', before: '154', after: '189', note: '+23% growth' },
            { label: 'Quantitative', before: '31.1%', after: '76.7%', note: '↑ Measurability' },
            { label: 'Qualitative', before: '43', after: '0', note: '100% eliminated' },
          ].map((s) => (
            <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <p className="text-xs text-slate-400 mb-2">{s.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-slate-300 text-sm line-through">{s.before}</span>
                <span className="text-navy font-extrabold text-3xl">{s.after}</span>
              </div>
              <p className="text-xs text-orange-500 font-semibold mt-1">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Earned Value Management</SectionLabel>
        <div className="grid grid-cols-2 gap-4 mt-2 max-w-sm">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
            <p className="text-xs text-slate-400 mb-1">Schedule Performance Index</p>
            <p className="text-navy font-extrabold text-3xl">0.97</p>
            <p className="text-xs text-slate-500 mt-1">Near on-schedule</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
            <p className="text-xs text-slate-400 mb-1">Cost Performance Index</p>
            <p className="text-orange-500 font-extrabold text-3xl">1.16</p>
            <p className="text-xs text-slate-500 mt-1">Under budget</p>
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>Risk Management Summary</SectionLabel>
        <div className="overflow-x-auto mt-2 rounded-lg border border-slate-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-navy text-white">
                <th className="text-left px-3 py-2 text-xs font-bold">Risk</th>
                <th className="text-center px-3 py-2 text-xs font-bold" colSpan={2}>Initial (L × C)</th>
                <th className="text-center px-3 py-2 text-xs font-bold" colSpan={2}>Final (L × C)</th>
              </tr>
              <tr className="bg-navy/80 text-white/70 text-xs">
                <th className="px-3 py-1"></th>
                <th className="px-3 py-1 font-normal text-center">Likelihood</th>
                <th className="px-3 py-1 font-normal text-center">Consequence</th>
                <th className="px-3 py-1 font-normal text-center">Likelihood</th>
                <th className="px-3 py-1 font-normal text-center">Consequence</th>
              </tr>
            </thead>
            <tbody>
              {RISKS.map((r) => (
                <tr key={r.id} className="border-b border-slate-100">
                  <td className="px-3 py-2 text-xs">
                    <span className="font-bold text-navy">{r.id}</span>
                    <span className="text-slate-600 ml-2">{r.title}</span>
                  </td>
                  <td className={`px-3 py-2 text-xs text-center ${riskCellClass(r.initL, r.initC)}`}>{r.initL}</td>
                  <td className={`px-3 py-2 text-xs text-center ${riskCellClass(r.initL, r.initC)}`}>{r.initC}</td>
                  <td className={`px-3 py-2 text-xs text-center ${riskCellClass(r.finalL, r.finalC)}`}>{r.finalL}</td>
                  <td className={`px-3 py-2 text-xs text-center ${riskCellClass(r.finalL, r.finalC)}`}>{r.finalC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <img
          src="/assets/angars/risk-waterfall.png"
          alt="Navigation System Accuracy Risk Waterfall"
          className="w-full md:w-1/2 rounded-lg shadow-md border border-slate-200 mt-4"
        />
      </div>

      <div>
        <SectionLabel>Lessons Learned</SectionLabel>
        <div className="space-y-3 mt-2">
          {[
            { title: 'SE Process', body: 'Iterative application of the SE lifecycle (Needs → Reqs → Func → Phys → Test) was essential for managing the complexity of an autonomous system.' },
            { title: 'Traceability', body: 'MBSE with Cameo proved invaluable for maintaining traceability from stakeholder needs through requirements to physical components and behaviors.' },
            { title: 'Consistency', body: 'Maintaining consistency across multiple domains is challenging but crucial — MBSE tools significantly aid this process.' },
            { title: 'Stakeholder Inputs', body: 'Gathering sufficient stakeholder input early is critical for making sound trade study and risk management decisions downstream.' },
          ].map((l) => (
            <div key={l.title} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="text-xs font-bold text-navy mb-1">{l.title}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{l.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
        <SectionLabel>Next Steps</SectionLabel>
        <ul className="space-y-1.5 mt-2">
          {[
            'Finalize component specifications',
            'Develop detailed hardware/software interfaces',
            'Algorithm development for sensor fusion',
            'Continued functional development',
            'Thermal and safety analysis',
            'Additional trade studies to further reduce risk',
          ].map((step) => (
            <li key={step} className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-orange-500 mt-0.5 flex-shrink-0">→</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
