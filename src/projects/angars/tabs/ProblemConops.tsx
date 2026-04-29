import { SectionLabel } from '../../../components/SectionLabel'

export function ProblemConops() {
  return (
    <div className="space-y-8">
      <div>
        <SectionLabel>Problem Statement</SectionLabel>
        <div className="flex flex-col md:flex-row gap-3 items-stretch mt-2">
          <div className="flex-1 bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-xs font-bold text-navy uppercase tracking-wide mb-2">The Need</p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Human fatigue and error risk in traditional refueling</li>
              <li>• Inefficient operations in contested environments</li>
              <li>• Incompatible with future unmanned systems</li>
            </ul>
          </div>
          <div className="text-slate-300 text-2xl self-center hidden md:block">→</div>
          <div className="flex-1 bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-xs font-bold text-navy uppercase tracking-wide mb-2">Objective</p>
            <p className="text-sm text-slate-600">
              Develop an autonomous aerial refueling concept that enhances safety and efficiency,
              especially in contested environments, with compatibility for unmanned systems.
            </p>
          </div>
          <div className="text-slate-300 text-2xl self-center hidden md:block">→</div>
          <div className="flex-1 bg-navy rounded-lg p-4">
            <p className="text-xs font-bold text-orange-400 uppercase tracking-wide mb-2">ANGARS Solution</p>
            <ul className="text-sm text-white/80 space-y-1">
              <li>• Multi-sensor autonomous navigation</li>
              <li>• AES-256 encrypted communications</li>
              <li>• Scalable architecture for future platforms</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>Concept of Operations — OV-1 Diagram</SectionLabel>
        <img
          src="/assets/angars/ov1-diagram.png"
          alt="ANGARS OV-1 CONOPS Diagram"
          className="w-full rounded-lg shadow-md border border-slate-200 mt-2"
        />
      </div>

      <div>
        <SectionLabel>Operational Scenarios</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {[
            {
              num: '01',
              title: 'Refueling Scheduling & Prioritization',
              desc: 'Autonomous management of refueling queues and aircraft prioritization based on mission criticality.',
            },
            {
              num: '02',
              title: 'Autonomous Docking & Fueling',
              desc: 'AI-driven boom guidance and contact for autonomous fuel transfer with triple-redundant flight control.',
            },
            {
              num: '03',
              title: 'EW-Impacted Operations',
              desc: 'Sustained operation under GPS jamming via sensor fusion fallback to LiDAR, RADAR, and INS.',
            },
          ].map((s) => (
            <div key={s.num} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-3xl font-black text-slate-200 mb-1 leading-none">{s.num}</p>
              <p className="text-sm font-bold text-navy mb-1">{s.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
