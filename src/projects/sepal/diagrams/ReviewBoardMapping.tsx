/**
 * SEPAL Overview centerpiece. Visualizes the mapping from a traditional
 * SE review board (human roles around a table) to SEPAL's executable form
 * (declarative skill manifest → engine → archetype agents → deliverable).
 *
 * Light theme — meant to sit on a white/slate-50 page background.
 */
export function ReviewBoardMapping() {
  const boardRoles = [
    { label: 'Chair', sub: 'Phase control' },
    { label: 'Defender', sub: 'Adequacy case' },
    { label: 'Challenger', sub: 'Adversarial' },
    { label: 'Auditor', sub: 'Process quality' },
    { label: 'Cross-checker', sub: 'Trace integrity' },
    { label: 'Observer', sub: 'Posture monitor' },
  ]

  const sepalStack = [
    { label: 'Skill Definition', sub: 'roles · constitution · rubric', color: '#eab308' },
    { label: 'Process Engine', sub: 'conductor · gateway · corpus', color: '#10b981' },
    { label: 'Archetype Agents', sub: 'turn-based debate · cited findings', color: '#3b82f6' },
    { label: 'Deliverable', sub: 'RID register · matrix · scorecard', color: '#64748b' },
  ]

  return (
    <svg
      viewBox="0 0 900 480"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mapping diagram: a traditional SE review board of human roles on the left maps to SEPAL's executable stack on the right — Skill Definition, Process Engine, Archetype Agents, Deliverable"
    >
      <defs>
        <marker id="rbm-arrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
          <polygon points="0 0, 10 4, 0 8" fill="#10b981" />
        </marker>
      </defs>

      {/* LEFT: Review board */}
      <g>
        <text
          x={180}
          y={36}
          textAnchor="middle"
          fill="#475569"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.15em"
        >
          TRADITIONAL REVIEW BOARD
        </text>

        {/* Table outline */}
        <ellipse
          cx={180}
          cy={250}
          rx={130}
          ry={150}
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />
        <text
          x={180}
          y={258}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.1em"
        >
          ARTIFACT
        </text>
        <text
          x={180}
          y={272}
          textAnchor="middle"
          fill="#cbd5e1"
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
        >
          (SRD · ICD · trade)
        </text>

        {/* Role chips around the ellipse */}
        {boardRoles.map((role, i) => {
          const angle = (i / boardRoles.length) * Math.PI * 2 - Math.PI / 2
          const rx = 158
          const ry = 178
          const cx = 180 + Math.cos(angle) * rx
          const cy = 250 + Math.sin(angle) * ry
          return (
            <g key={role.label}>
              <rect
                x={cx - 56}
                y={cy - 16}
                width={112}
                height={32}
                rx={4}
                fill="#fff"
                stroke="#94a3b8"
                strokeWidth="1"
              />
              <text
                x={cx}
                y={cy - 2}
                textAnchor="middle"
                fill="#1e293b"
                fontSize="11"
                fontWeight="600"
                fontFamily="'DM Sans', sans-serif"
              >
                {role.label}
              </text>
              <text
                x={cx}
                y={cy + 11}
                textAnchor="middle"
                fill="#64748b"
                fontSize="8.5"
                fontFamily="'DM Sans', sans-serif"
              >
                {role.sub}
              </text>
            </g>
          )
        })}
      </g>

      {/* CENTER: Mapping arrow */}
      <g>
        <line
          x1={360}
          y1={240}
          x2={480}
          y2={240}
          stroke="#10b981"
          strokeWidth="2"
          markerEnd="url(#rbm-arrow)"
        />
        <text
          x={420}
          y={224}
          textAnchor="middle"
          fill="#047857"
          fontSize="11"
          fontWeight="600"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.08em"
        >
          executable
        </text>
        <text
          x={420}
          y={260}
          textAnchor="middle"
          fill="#64748b"
          fontSize="9"
          fontFamily="'DM Sans', sans-serif"
          fontStyle="italic"
        >
          same pattern, durable substrate
        </text>
      </g>

      {/* RIGHT: SEPAL stack */}
      <g>
        <text
          x={690}
          y={36}
          textAnchor="middle"
          fill="#475569"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.15em"
        >
          SEPAL RUNTIME
        </text>

        {sepalStack.map((item, i) => {
          const y = 70 + i * 92
          return (
            <g key={item.label}>
              <rect
                x={520}
                y={y}
                width={340}
                height={70}
                rx={4}
                fill="#fff"
                stroke={item.color}
                strokeWidth="1.5"
              />
              <rect
                x={520}
                y={y}
                width={6}
                height={70}
                rx={4}
                fill={item.color}
              />
              <text
                x={544}
                y={y + 26}
                fill="#1e293b"
                fontSize="14"
                fontWeight="600"
                fontFamily="'DM Sans', sans-serif"
              >
                {item.label}
              </text>
              <text
                x={544}
                y={y + 47}
                fill="#64748b"
                fontSize="11"
                fontFamily="'JetBrains Mono', monospace"
              >
                {item.sub}
              </text>

              {/* Arrow between stack items */}
              {i < sepalStack.length - 1 && (
                <line
                  x1={690}
                  y1={y + 72}
                  x2={690}
                  y2={y + 90}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  markerEnd="url(#rbm-arrow)"
                />
              )}
            </g>
          )
        })}
      </g>
    </svg>
  )
}
