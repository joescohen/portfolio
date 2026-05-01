interface SubsystemDef {
  id: string
  label: string
  sub: string
  x: number
  y: number
  w: number
  h: number
}

const SUBSYSTEMS: SubsystemDef[] = [
  { id: 'agns',  label: 'AGNS',         sub: 'Guidance & Nav', x: 153, y: 100, w: 128, h: 52 },
  { id: 'cc',    label: 'C&C',           sub: 'Cmd & Control',  x: 305, y: 100, w: 128, h: 52 },
  { id: 'comms', label: 'Comms',         sub: 'Communications', x: 457, y: 100, w: 128, h: 52 },
  { id: 'fuel',  label: 'Fuel Transfer', sub: 'Fuel Mgmt',      x: 153, y: 230, w: 128, h: 52 },
  { id: 'power', label: 'Power',         sub: 'Distribution',   x: 305, y: 230, w: 128, h: 52 },
  { id: 'proc',  label: 'Processing',    sub: 'Data & Compute', x: 457, y: 230, w: 128, h: 52 },
]

// Internal connections: [x1, y1, x2, y2]
const INT_LINES: [number, number, number, number][] = [
  [281, 126, 305, 126], // AGNS → C&C
  [433, 126, 457, 126], // C&C → Comms
  [281, 256, 305, 256], // Fuel → Power
  [433, 256, 457, 256], // Power → Processing
  [217, 152, 217, 230], // AGNS → Fuel Transfer
  [369, 152, 369, 230], // C&C → Power
  [521, 152, 521, 230], // Comms → Processing
]

interface ActorDef {
  label: string
  bx: number; by: number; bw: number; bh: number
  lx1: number; ly1: number; lx2: number; ly2: number
  px: number; py: number
  pl: string
  plx: number; ply: number
  plAnchor: 'start' | 'middle' | 'end'
}

// ANGARS boundary: x=140, y=52, w=460, h=255 → to (600, 307)
// Port labels are placed just inside the boundary margin to avoid cramped external zones
const ACTORS: ActorDef[] = [
  {
    label: 'GPS Satellite',
    bx: 295, by: 8,   bw: 115, bh: 26,
    lx1: 352, ly1: 34,  lx2: 352, ly2: 52,
    px: 352, py: 52,
    pl: 'GPS RF',
    plx: 358, ply: 64, plAnchor: 'start',
  },
  {
    label: 'Relay Satellite',
    bx: 10,  by: 180, bw: 110, bh: 28,
    lx1: 120, ly1: 194, lx2: 140, ly2: 194,
    px: 140, py: 194,
    pl: 'SATCOM',
    plx: 148, ply: 190, plAnchor: 'start',
  },
  {
    label: 'Receiving Aircraft',
    bx: 615, by: 180, bw: 115, bh: 28,
    lx1: 600, ly1: 194, lx2: 615, ly2: 194,
    px: 600, py: 194,
    pl: 'Fuel · Data',
    plx: 592, ply: 190, plAnchor: 'end',
  },
  {
    label: 'Ground Control',
    bx: 295, by: 320, bw: 115, bh: 26,
    lx1: 352, ly1: 307, lx2: 352, ly2: 320,
    px: 352, py: 307,
    pl: 'GND CMD',
    plx: 358, ply: 300, plAnchor: 'start',
  },
]

const CALLOUTS = [
  { label: '189 traceable reqs', right: '4%', top: '10%' },
  { label: 'Active Fusion', right: '4%', top: '73%' },
]

export function SysMLDiagram() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <svg
        viewBox="0 0 740 395"
        className="w-full max-h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="SysML block definition diagram showing ANGARS 6-subsystem physical architecture"
      >
        <defs>
          <marker id="sysml-arrow" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#f97316" />
          </marker>
          <marker id="sysml-ext-arrow" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="rgba(255,255,255,0.4)" />
          </marker>
        </defs>

        {/* ANGARS system boundary */}
        <rect x={140} y={52} width={460} height={255} rx={4}
          stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"
          fill="rgba(255,255,255,0.02)" />

        {/* Boundary stereotype + label */}
        <text x={147} y={67}
          fill="rgba(255,255,255,0.28)" fontSize="9" fontFamily="'DM Sans', sans-serif">
          {'«system»'}
        </text>
        <text x={147} y={81}
          fill="rgba(255,255,255,0.58)" fontSize="12" fontWeight="500"
          fontFamily="'DM Sans', sans-serif">
          Physical ANGARS
        </text>

        {/* Row separator dashed line */}
        <line x1={155} y1={191} x2={583} y2={191}
          stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="6 4" />

        {/* Internal connections */}
        {INT_LINES.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#f97316" strokeWidth="1.5"
            markerEnd="url(#sysml-arrow)" />
        ))}

        {/* Subsystem blocks */}
        {SUBSYSTEMS.map((s) => {
          const cx = s.x + s.w / 2
          return (
            <g key={s.id}>
              <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={4}
                stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"
                fill="rgba(255,255,255,0.06)" />
              <line x1={s.x + 1} y1={s.y + 16} x2={s.x + s.w - 1} y2={s.y + 16}
                stroke="rgba(255,255,255,0.15)" strokeWidth="0.75" />
              <text x={cx} y={s.y + 11}
                textAnchor="middle"
                fill="rgba(249,115,22,0.6)" fontSize="8"
                fontFamily="'DM Sans', sans-serif">
                {'«block»'}
              </text>
              <text x={cx} y={s.y + 32}
                textAnchor="middle" dominantBaseline="central"
                fill="white" fontSize="12" fontWeight="600"
                fontFamily="'DM Sans', sans-serif">
                {s.label}
              </text>
              <text x={cx} y={s.y + 46}
                textAnchor="middle"
                fill="rgba(255,255,255,0.38)" fontSize="8"
                fontFamily="'DM Sans', sans-serif">
                {s.sub}
              </text>
            </g>
          )
        })}

        {/* External actors */}
        {ACTORS.map((a) => (
          <g key={a.label}>
            <rect x={a.bx} y={a.by} width={a.bw} height={a.bh} rx={3}
              stroke="rgba(255,255,255,0.2)" strokeWidth="1"
              fill="rgba(255,255,255,0.03)" />
            <text x={a.bx + a.bw / 2} y={a.by + a.bh / 2}
              textAnchor="middle" dominantBaseline="central"
              fill="rgba(255,255,255,0.5)" fontSize="10"
              fontFamily="'DM Sans', sans-serif">
              {a.label}
            </text>
            <line x1={a.lx1} y1={a.ly1} x2={a.lx2} y2={a.ly2}
              stroke="rgba(255,255,255,0.25)" strokeWidth="1"
              strokeDasharray="5 3"
              markerEnd="url(#sysml-ext-arrow)" />
            {/* Port square */}
            <rect x={a.px - 3} y={a.py - 3} width={6} height={6}
              fill="rgba(249,115,22,0.65)" />
            <text x={a.plx} y={a.ply}
              textAnchor={a.plAnchor}
              fill="rgba(255,255,255,0.4)" fontSize="8"
              fontFamily="'DM Sans', sans-serif">
              {a.pl}
            </text>
          </g>
        ))}

        {/* Diagram label */}
        <text x={370} y={382}
          textAnchor="middle"
          fill="rgba(255,255,255,0.35)" fontSize="10"
          fontFamily="'DM Sans', sans-serif" letterSpacing="0.12em">
          BDD — ANGARS PHYSICAL ARCHITECTURE
        </text>
      </svg>

      {/* Floating callout badges */}
      {CALLOUTS.map((c) => (
        <div key={c.label} className="absolute" style={{ right: c.right, top: c.top }}>
          <span className="text-white text-xs font-semibold tracking-wide whitespace-nowrap bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm">
            {c.label}
          </span>
        </div>
      ))}
    </div>
  )
}
