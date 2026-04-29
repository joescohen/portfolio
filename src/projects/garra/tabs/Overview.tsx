import { SectionLabel } from '../../../components/SectionLabel'

const specs = [
  { label: 'GTOW', value: '260 kg (572 lb)' },
  { label: 'Empty Weight', value: '184 kg (405 lb)' },
  { label: 'Payload', value: '50 kg (110 lb)' },
  { label: 'Top Speed', value: '250 km/h (135 kt)' },
  { label: 'Fuel Capacity', value: '9.5 gal (36 L)' },
  { label: 'Fuselage Length', value: '5.2 m (17.1 ft)' },
  { label: 'Main Rotor Ø', value: '3.40 m (11.2 ft)' },
  { label: 'Tail Rotor Ø', value: '0.90 m (2.95 ft)' },
]

const keyFeatures = [
  { num: '1', title: 'Hub Fairing', desc: 'Low drag at high speed' },
  { num: '2', title: 'Tailored Tail', desc: 'Efficiency & reduced wake interaction' },
  { num: '3', title: 'Hinged Doors', desc: 'Easy side loading' },
  { num: '4', title: 'Open-Bottom Structure', desc: 'Lightweight, torsionally stiff frame' },
  { num: '5', title: 'Bomber Doors', desc: 'Hoisting & package delivery' },
  { num: '6', title: 'Airfoil Skids', desc: 'Low-drag landing gear' },
  { num: '7', title: 'Swept Blade Tips', desc: '20° anhedral + 20° sweep — low noise & compressibility' },
]

export function Overview() {
  return (
    <div className="space-y-10">

      {/* Intro */}
      <div>
        <SectionLabel>Design Overview</SectionLabel>
        <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
          Garra is a thrust-compounded single-main-rotor helicopter designed for autonomous
          medical supply delivery. Named after the Garra Rufa "doctor fish," the design
          features a novel open-bottom fuselage structure, pusher propeller for high-speed
          zero-shaft-tilt flight, and dual-engine redundancy — winning both 1st place and
          the Structural Weight Optimization bonus in the 38th VFS Student Design Competition.
        </p>
      </div>

      {/* Specs */}
      <div>
        <SectionLabel>Vehicle Specifications</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {specs.map(({ label, value }) => (
            <div key={label} className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
              <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">{label}</div>
              <div className="text-sm font-semibold text-navy">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div>
        <SectionLabel>Key Design Features</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {keyFeatures.map(({ num, title, desc }) => (
            <div key={num} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {num}
              </span>
              <div>
                <div className="text-sm font-semibold text-navy">{title}</div>
                <div className="text-xs text-slate-500">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety */}
      <div>
        <SectionLabel>Safety Highlights</SectionLabel>
        <ul className="space-y-1.5 text-sm text-slate-600">
          {[
            'Three-bladed hingeless main rotor with autorotative capability',
            'Dual engines for redundancy — two mission profiles remain available OEI',
            'Foldable main rotor blades for safe transport and storage',
            'Zero-tilt cruise flight via pusher propeller',
            'Crashworthy landing gear and fuselage structure',
            'Vertical stabilizer sized to protect tail rotor and pusher prop from tail strikes',
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-red-600 mt-0.5">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Competition context */}
      <div>
        <SectionLabel>Competition Context</SectionLabel>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          The 2020–2021 VFS RFP asked teams to design an unmanned VTOL capable of delivering
          up to 50 kg payloads within a 50 km radius for medical and disaster-relief missions,
          using only 2020-technology for a 2025 entry-into-service target. Garra met or exceeded
          every requirement, earning first place among 10 international entries from four countries,
          and swept the optional Altair structural weight-optimization bonus task.
        </p>
      </div>

    </div>
  )
}
