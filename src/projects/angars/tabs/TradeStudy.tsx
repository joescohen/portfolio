import { SectionLabel } from '../../../components/SectionLabel'

const ALTERNATIVES = [
  { name: 'Hardened GPS + INS Only', cost: '$200K', utility: '0.345', cesf: '17.26', winner: false },
  { name: 'Active Fusion (Radar/LiDAR + INS)', cost: '$350K', utility: '0.693', cesf: '19.81', winner: true },
  { name: 'Passive Fusion (Celestial + RF + INS)', cost: '$500K', utility: '0.687', cesf: '13.73', winner: false },
  { name: 'Combination (All Sensors)', cost: '$600K', utility: '0.879', cesf: '14.65', winner: false },
]

const CRITERIA = [
  { name: 'Navigation Accuracy', weight: 0.29 },
  { name: 'EW Resistance', weight: 0.27 },
  { name: 'Reliability', weight: 0.19 },
  { name: 'Redundancy', weight: 0.12 },
  { name: 'Technology Maturity (TRL)', weight: 0.06 },
  { name: 'Operational Complexity', weight: 0.06 },
]

export function TradeStudy() {
  const maxWeight = Math.max(...CRITERIA.map((c) => c.weight))

  return (
    <div className="space-y-8">
      <div className="bg-navy rounded-lg p-4">
        <p className="text-xs font-bold text-orange-400 uppercase tracking-wide mb-1">Trade Objective</p>
        <p className="text-white text-sm">
          Evaluate technology solutions for navigation in nominal and contested (GPS-denied / EW-impacted) environments.
        </p>
      </div>

      <div>
        <SectionLabel>Alternatives Evaluated</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
          {ALTERNATIVES.map((alt) => (
            <div
              key={alt.name}
              className={`rounded-lg p-4 border-2 ${
                alt.winner ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              {alt.winner && (
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wide block mb-1">
                  Selected
                </span>
              )}
              <p className="text-xs font-bold text-navy leading-tight">{alt.name}</p>
              <p className="text-slate-400 text-xs mt-2">{alt.cost}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Selection Criteria & Weights</SectionLabel>
        <div className="space-y-2 mt-2 max-w-lg">
          {CRITERIA.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <span className="text-sm text-slate-600 w-52 flex-shrink-0">{c.name}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-2">
                <div
                  className="bg-navy rounded-full h-2 transition-all"
                  style={{ width: `${(c.weight / maxWeight) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-navy w-10 text-right">
                {c.weight.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Results</SectionLabel>
        <div className="overflow-x-auto mt-2 rounded-lg border border-slate-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-navy text-white">
                <th className="text-left px-3 py-2 text-xs font-bold">Alternative</th>
                <th className="text-right px-3 py-2 text-xs font-bold">Cost</th>
                <th className="text-right px-3 py-2 text-xs font-bold">Utility Score</th>
                <th className="text-right px-3 py-2 text-xs font-bold">Cost-Effectiveness</th>
              </tr>
            </thead>
            <tbody>
              {ALTERNATIVES.map((alt, i) => (
                <tr
                  key={alt.name}
                  className={alt.winner ? 'bg-green-50' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                >
                  <td className="px-3 py-2 text-xs text-slate-700">
                    {alt.winner && <span className="text-orange-500 mr-1 font-bold">★</span>}
                    {alt.name}
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-600 text-right">{alt.cost}</td>
                  <td className="px-3 py-2 text-xs text-slate-600 text-right">{alt.utility}</td>
                  <td className={`px-3 py-2 text-xs text-right font-bold ${alt.winner ? 'text-green-700' : 'text-slate-600'}`}>
                    {alt.cesf}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">Cost-effectiveness = weighted utility / cost × 1000</p>
      </div>

      <div className="bg-navy rounded-lg p-5 flex items-center gap-4">
        <div>
          <p className="text-xs font-bold text-orange-400 uppercase tracking-wide">Selected Architecture</p>
          <p className="text-white font-bold text-lg">Active Fusion — Radar/LiDAR + INS</p>
          <p className="text-white/60 text-xs mt-0.5">
            Highest cost-effectiveness score (19.81) · Best balance of navigation accuracy and EW resistance
          </p>
        </div>
      </div>
    </div>
  )
}
