/**
 * Diagram 1 — The V-model.
 *
 * Four nodes per side (Concept of Operations → Requirements → System
 * Architecture → Component Design on the descent, and back up
 * Component Verification → Integration & Test → System Verification →
 * Operations & Validation). Horizontal dashed lines mark verification
 * flows across the V at each level.
 */
export function VModelDiagram() {
  // Node positions, computed so the V is symmetric and verification
  // lines fall on the same y values per level.
  const W = 760
  const H = 460
  const padX = 40
  const padTop = 40

  // Nodes laid out as 4 left + 4 right + 1 implementation pivot.
  // Each pair of nodes (level 0..3) shares a y value.
  const levels = [0, 1, 2, 3]
  const leftX = (level: number) => padX + level * 80
  const rightX = (level: number) => W - padX - level * 80
  const levelY = (level: number) => padTop + level * 80

  const leftLabels = [
    'Concept of Operations',
    'System Requirements',
    'System Architecture',
    'Component Design',
  ]
  const rightLabels = [
    'Operations & Validation',
    'System Verification',
    'Integration & Test',
    'Component Verification',
  ]

  const pivot = { x: W / 2, y: padTop + 4 * 80 + 12 }

  return (
    <svg
      role="img"
      aria-labelledby="vmodel-title vmodel-desc"
      viewBox={`0 0 ${W} ${H}`}
      className="jrn-diagram"
    >
      <title id="vmodel-title">The V-Model</title>
      <desc id="vmodel-desc">
        A V-shaped diagram. The left arm descends through Concept of
        Operations, System Requirements, System Architecture, and
        Component Design. The right arm ascends through Component
        Verification, Integration and Test, System Verification, and
        Operations and Validation. Horizontal dashed lines at each level
        connect corresponding left and right nodes — these represent
        verification flowing across the V.
      </desc>

      {/* Verification cross-bars */}
      {levels.map((lvl) => (
        <line
          key={`bar-${lvl}`}
          x1={leftX(lvl) + 8}
          y1={levelY(lvl)}
          x2={rightX(lvl) - 8}
          y2={levelY(lvl)}
          stroke="rgba(94, 234, 212, 0.35)"
          strokeWidth={1}
          strokeDasharray="3 5"
        />
      ))}

      {/* V arms */}
      <polyline
        points={`${leftX(0)},${levelY(0)} ${leftX(1)},${levelY(1)} ${leftX(2)},${levelY(2)} ${leftX(3)},${levelY(3)} ${pivot.x},${pivot.y} ${rightX(3)},${levelY(3)} ${rightX(2)},${levelY(2)} ${rightX(1)},${levelY(1)} ${rightX(0)},${levelY(0)}`}
        fill="none"
        stroke="rgba(232, 230, 225, 0.55)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Pivot */}
      <circle cx={pivot.x} cy={pivot.y} r={6} fill="#c4a576" />
      <text
        x={pivot.x}
        y={pivot.y + 24}
        fill="rgba(232, 230, 225, 0.7)"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={10}
        letterSpacing={1.5}
        textAnchor="middle"
      >
        IMPLEMENTATION
      </text>

      {/* Left-side nodes */}
      {leftLabels.map((label, i) => (
        <g key={`l-${i}`}>
          <circle
            cx={leftX(i)}
            cy={levelY(i)}
            r={6}
            fill="#5eead4"
          />
          <text
            x={leftX(i) - 12}
            y={levelY(i) + 4}
            fill="#e8e6e1"
            fontFamily="'Inter', sans-serif"
            fontSize={12}
            fontWeight={500}
            textAnchor="end"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Right-side nodes */}
      {rightLabels.map((label, i) => {
        // i=0 corresponds to top right
        const level = i
        return (
          <g key={`r-${i}`}>
            <circle
              cx={rightX(level)}
              cy={levelY(level)}
              r={6}
              fill="#5eead4"
            />
            <text
              x={rightX(level) + 12}
              y={levelY(level) + 4}
              fill="#e8e6e1"
              fontFamily="'Inter', sans-serif"
              fontSize={12}
              fontWeight={500}
              textAnchor="start"
            >
              {label}
            </text>
          </g>
        )
      })}

      {/* Arrow markers — decomposition (down-left) and integration (up-right) */}
      <text
        x={padX - 8}
        y={H - 18}
        fill="rgba(232, 230, 225, 0.45)"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={10}
        letterSpacing={1.4}
        textAnchor="start"
      >
        DECOMPOSITION ↓
      </text>
      <text
        x={W - padX + 8}
        y={H - 18}
        fill="rgba(232, 230, 225, 0.45)"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={10}
        letterSpacing={1.4}
        textAnchor="end"
      >
        ↑ INTEGRATION
      </text>
    </svg>
  )
}
