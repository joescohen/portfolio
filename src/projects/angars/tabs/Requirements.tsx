import { SectionLabel } from '../../../components/SectionLabel'

const KPPS = [
  { id: 'ANGARS-2', name: 'Refueling Time', spec: '≤10 min (T), 8 min (O) fuel transfer phase', method: 'Test' },
  { id: 'ANGARS-27', name: 'Contested Positioning Accuracy', spec: '≤5m (T), 4m (O) relative to receptacle', method: 'Test' },
  { id: 'ANGARS-31', name: 'Low-Latency Commands', spec: '≤15ms (T), 10ms (O) end-to-end latency', method: 'Test' },
  { id: 'ANGARS-43', name: 'AES-256 Encryption', spec: 'All external comms encrypted via AES-256', method: 'Inspection' },
  { id: 'ANGARS-44', name: 'Obstacle Detection Range', spec: '≥500m (T), 750m (O), 99% accuracy', method: 'Test' },
  { id: 'ANGARS-53', name: 'Collision Expectancy', spec: '≤1 per 1,000,000 mission hours (T)', method: 'Analysis' },
  { id: 'ANGARS-56', name: 'Triple Redundancy', spec: 'Triple-redundant flight control systems', method: 'Inspection' },
  { id: 'ANGARS-62', name: 'Mission Success Rate', spec: '≥95% (T), 98% (O) per scheduled mission', method: 'Analysis' },
  { id: 'ANGARS-91', name: 'Jamming Mitigation', spec: 'Mitigate within 20s (T), 10s (O)', method: 'Test' },
  { id: 'ANGARS-125', name: 'KC-46 Integration', spec: 'No structural modifications required', method: 'Inspection' },
]

export function Requirements() {
  return (
    <div className="space-y-8">
      <div>
        <SectionLabel>Requirements Derivation Process</SectionLabel>
        <div className="flex flex-col md:flex-row gap-3 mt-2">
          {[
            {
              step: '1', title: 'Needs Identification',
              items: ['Stakeholder interviews', 'Northrop Grumman I&T Engineer', 'Navy Pilot/Engineer', 'Independent research'],
            },
            {
              step: '2', title: 'Needs Analysis',
              items: ['Decomposed needs into capability areas', 'Mapped to SE lifecycle phases', 'Validated against AF doctrine'],
            },
            {
              step: '3', title: 'Requirements Definition',
              items: ['154 initial requirements derived', '10 Key Performance Parameters', 'Measurability review completed'],
            },
          ].map((s) => (
            <div key={s.step} className="flex-1 bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-navy text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  {s.step}
                </span>
                <p className="text-sm font-bold text-navy">{s.title}</p>
              </div>
              <ul className="text-xs text-slate-500 space-y-1">
                {s.items.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Requirements Evolution (RAR → Final Spec)</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {[
            { label: 'Total Requirements', before: '154', after: '189' },
            { label: 'Quantitative', before: '31.1%', after: '76.7%' },
            { label: 'Binary', before: '63', after: '44' },
            { label: 'Qualitative', before: '43', after: '0' },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
              <p className="text-xs text-slate-400 mb-2 leading-tight">{stat.label}</p>
              <p className="text-slate-300 text-xs line-through">{stat.before}</p>
              <p className="text-navy font-extrabold text-2xl">{stat.after}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Requirements by Type</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
          {[
            { type: 'Operational', count: 36 },
            { type: 'External Interface', count: 26 },
            { type: 'Functional', count: 31 },
            { type: 'Performance', count: 30 },
            { type: 'Constraint', count: 31 },
          ].map((t) => (
            <div key={t.type} className="bg-navy rounded-lg p-4 text-center">
              <p className="text-2xl font-black text-white">{t.count}</p>
              <p className="text-xs text-white/60 mt-1 leading-tight">{t.type}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Key Performance Parameters (10 KPPs)</SectionLabel>
        <div className="overflow-x-auto mt-2 rounded-lg border border-slate-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-navy text-white">
                <th className="text-left px-3 py-2 text-xs font-bold">ID</th>
                <th className="text-left px-3 py-2 text-xs font-bold">Parameter</th>
                <th className="text-left px-3 py-2 text-xs font-bold">Specification</th>
                <th className="text-left px-3 py-2 text-xs font-bold">Verify</th>
              </tr>
            </thead>
            <tbody>
              {KPPS.map((kpp, i) => (
                <tr key={kpp.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-3 py-2 text-xs text-orange-500 font-mono font-semibold">{kpp.id}</td>
                  <td className="px-3 py-2 text-xs text-navy font-medium">{kpp.name}</td>
                  <td className="px-3 py-2 text-xs text-slate-600">{kpp.spec}</td>
                  <td className="px-3 py-2 text-xs text-slate-500">{kpp.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
