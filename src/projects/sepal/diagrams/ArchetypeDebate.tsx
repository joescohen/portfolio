/**
 * Archetype debate pattern: the document under review sits at the center,
 * and a configurable cast of agent archetypes takes turns examining it.
 * Numbered arrows indicate turn order in a single phase. Light theme.
 */
const ARCHETYPES = [
  {
    name: 'Defender',
    role: 'Adequacy case',
    color: '#3b82f6',
    angle: -Math.PI / 2,
  },
  {
    name: 'Challenger',
    role: 'Adversarial — cannot agree without raising',
    color: '#ef4444',
    angle: -Math.PI / 6,
  },
  {
    name: 'Cross-checker',
    role: 'Trace integrity vs related docs',
    color: '#8b5cf6',
    angle: Math.PI / 6,
  },
  {
    name: 'Auditor',
    role: 'Process compliance',
    color: '#10b981',
    angle: Math.PI / 2,
  },
  {
    name: 'Observer',
    role: 'Posture drift · review quality',
    color: '#f59e0b',
    angle: (5 * Math.PI) / 6,
  },
  {
    name: 'Chair',
    role: 'Phase + exit criteria',
    color: '#64748b',
    angle: (-5 * Math.PI) / 6,
  },
]

export function ArchetypeDebate() {
  const cx = 360
  const cy = 240
  const radius = 175

  return (
    <svg
      viewBox="0 0 760 480"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Archetype debate pattern. A document under review sits at the center. Six agent archetypes — Defender, Challenger, Cross-checker, Auditor, Observer, Chair — surround it and examine it in turn. Numbered arrows show the turn order. Each agent carries a distinct constitutional role; the Challenger is constitutionally barred from agreeing without raising a finding, the Observer monitors posture drift, the Chair controls phase transitions."
    >
      <defs>
        <marker id="ad-arrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
          <polygon points="0 0, 9 3.5, 0 7" fill="#10b981" opacity="0.7" />
        </marker>
      </defs>

      {/* Title strip */}
      <text
        x={cx}
        y={28}
        textAnchor="middle"
        fill="#475569"
        fontSize="11"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="0.18em"
      >
        ONE PHASE · TURN-BASED · CITATION-ANCHORED
      </text>

      {/* Center document */}
      <g>
        <rect
          x={cx - 60}
          y={cy - 50}
          width={120}
          height={100}
          rx={4}
          fill="#fff"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />
        {/* Document lines */}
        {[0, 1, 2, 3, 4, 5].map((j) => (
          <line
            key={j}
            x1={cx - 44}
            y1={cy - 32 + j * 13}
            x2={cx + (j % 2 === 0 ? 38 : 28)}
            y2={cy - 32 + j * 13}
            stroke="#cbd5e1"
            strokeWidth="1"
          />
        ))}
        <text
          x={cx}
          y={cy + 70}
          textAnchor="middle"
          fill="#1e293b"
          fontSize="11"
          fontWeight="600"
          fontFamily="'DM Sans', sans-serif"
        >
          Artifact under review
        </text>
        <text
          x={cx}
          y={cy + 84}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
        >
          chunks · embeddings · citations
        </text>
      </g>

      {/* Archetype nodes */}
      {ARCHETYPES.map((a, i) => {
        const px = cx + Math.cos(a.angle) * radius
        const py = cy + Math.sin(a.angle) * radius
        const turnNum = i + 1
        // Arrow start near node, end near document
        const startX = px - Math.cos(a.angle) * 38
        const startY = py - Math.sin(a.angle) * 26
        const endX = cx + Math.cos(a.angle) * 70
        const endY = cy + Math.sin(a.angle) * 56

        return (
          <g key={a.name}>
            {/* Turn arrow */}
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="#10b981"
              strokeWidth="1.5"
              strokeOpacity="0.55"
              markerEnd="url(#ad-arrow)"
            />
            {/* Turn number on arrow */}
            <circle
              cx={(startX + endX) / 2}
              cy={(startY + endY) / 2}
              r={11}
              fill="#fff"
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <text
              x={(startX + endX) / 2}
              y={(startY + endY) / 2 + 4}
              textAnchor="middle"
              fill="#047857"
              fontSize="11"
              fontWeight="700"
              fontFamily="'DM Sans', sans-serif"
            >
              {turnNum}
            </text>

            {/* Agent node */}
            <rect
              x={px - 75}
              y={py - 26}
              width={150}
              height={52}
              rx={4}
              fill="#fff"
              stroke={a.color}
              strokeWidth="1.5"
            />
            <rect
              x={px - 75}
              y={py - 26}
              width={5}
              height={52}
              rx={4}
              fill={a.color}
            />
            <text
              x={px - 64}
              y={py - 6}
              fill="#0f172a"
              fontSize="12.5"
              fontWeight="700"
              fontFamily="'DM Sans', sans-serif"
            >
              {a.name}
            </text>
            <text
              x={px - 64}
              y={py + 10}
              fill="#64748b"
              fontSize="9.5"
              fontFamily="'DM Sans', sans-serif"
            >
              {a.role}
            </text>
          </g>
        )
      })}

      {/* Persistent footer note */}
      <g>
        <text
          x={cx}
          y={448}
          textAnchor="middle"
          fill="#475569"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.06em"
        >
          posture drift detected → re-anchor constitution · all turns Zod-validated · checkpointed
        </text>
      </g>
    </svg>
  )
}
