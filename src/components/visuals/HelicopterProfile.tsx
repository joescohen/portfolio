const CALLOUTS = [
  { label: '135 kt', x: '72%', y: '28%', align: 'left' as const },
  { label: '50 kg payload', x: '58%', y: '72%', align: 'left' as const },
  { label: '1st Place VFS', x: '18%', y: '22%', align: 'right' as const },
]

export function HelicopterProfile() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <svg
        viewBox="0 0 600 360"
        className="w-full max-w-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Garra compound helicopter side profile with performance data"
      >
        {/* Rotor disc — animated */}
        <g style={{ transformOrigin: '260px 100px', animation: 'rotor-spin 8s linear infinite' }}>
          <ellipse cx={260} cy={100} rx={180} ry={8} stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeDasharray="8 5" />
        </g>

        {/* Rotor mast */}
        <line x1={260} y1={100} x2={260} y2={145} stroke="rgba(255,255,255,0.6)" strokeWidth="2" />

        {/* Fuselage */}
        <path
          d="M 140 180 Q 160 145 260 145 Q 360 145 400 165 L 420 170 L 440 165 L 460 170 Q 470 175 460 180 L 400 185 Q 360 200 260 200 Q 180 200 150 195 Z"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
          fill="rgba(255,255,255,0.05)"
        />

        {/* Cockpit windscreen */}
        <path
          d="M 155 175 Q 170 155 200 152 L 200 175 Z"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.07)"
        />

        {/* Tail boom */}
        <path
          d="M 400 175 L 510 155 L 520 140 L 530 155 L 510 160 L 400 180"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          fill="rgba(255,255,255,0.03)"
        />

        {/* Tail rotor */}
        <circle cx={525} cy={148} r={18} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="6 4" />

        {/* Landing skids */}
        <line x1={200} y1={200} x2={200} y2={225} stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        <line x1={330} y1={200} x2={330} y2={225} stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        <line x1={180} y1={225} x2={350} y2={225} stroke="rgba(255,255,255,0.5)" strokeWidth="2" />

        {/* Pusher prop (thrust compounding) */}
        <ellipse cx={535} cy={170} rx={4} ry={22} stroke="rgba(249,115,22,0.6)" strokeWidth="1.5" strokeDasharray="6 4" />

        {/* Dimension line */}
        <line x1={150} y1={260} x2={530} y2={260} stroke="rgba(255,255,255,0.15)" strokeWidth="0.75" />
        <line x1={150} y1={255} x2={150} y2={265} stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
        <line x1={530} y1={255} x2={530} y2={265} stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
        <text x={340} y={275} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="'DM Sans', sans-serif">
          GARRA — COMPOUND HELICOPTER
        </text>
      </svg>

      {/* Floating data callouts */}
      {CALLOUTS.map((c) => (
        <div
          key={c.label}
          className="absolute flex items-center gap-2"
          style={{ left: c.x, top: c.y }}
        >
          {c.align === 'right' && <span className="w-8 h-px bg-white/20" />}
          <span className="text-white text-xs font-semibold tracking-wide whitespace-nowrap bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm">
            {c.label}
          </span>
          {c.align === 'left' && <span className="w-8 h-px bg-white/20" />}
        </div>
      ))}
    </div>
  )
}
