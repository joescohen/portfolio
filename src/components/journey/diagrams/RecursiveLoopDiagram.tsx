/**
 * Diagram 3 — Recursive learning loop.
 *
 * Four nodes arranged in a circle representing the loop:
 *   1. Skill runs   → 2. Skill misses  → 3. Auditor analyses  →
 *   4. Process update → back to 1.
 *
 * Two branches leave the loop at node 4:
 *   - Fix generalizes → "Coverage improved" (success)
 *   - Fix is localized → "Recursive retry" (back into loop)
 */
export function RecursiveLoopDiagram() {
  const W = 720
  const H = 460
  const cx = W / 2
  const cy = H / 2 + 10
  const r = 150

  // 4 nodes evenly spaced, starting at top.
  const nodes = [
    { label: 'Skill runs', sub: 'on the artifact' },
    { label: 'Skill misses', sub: 'something it should catch' },
    { label: 'Auditor analyses', sub: 'the missed dimension' },
    { label: 'Process update', sub: 'modifies the skill' },
  ]

  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / 4
  const pos = (i: number) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  })

  // Arrow paths around the loop — curved.
  const arc = (i: number) => {
    const p1 = pos(i)
    const p2 = pos((i + 1) % 4)
    // Sweep flag 1 for outward bulge.
    return `M ${p1.x},${p1.y} A ${r * 1.15},${r * 1.15} 0 0 1 ${p2.x},${p2.y}`
  }

  return (
    <svg
      role="img"
      aria-labelledby="recursive-title recursive-desc"
      viewBox={`0 0 ${W} ${H}`}
      className="jrn-diagram"
    >
      <title id="recursive-title">Recursive learning loop</title>
      <desc id="recursive-desc">
        A circular loop with four nodes: Skill runs, Skill misses, Auditor
        analyses, and Process update. The cycle proceeds clockwise. After
        Process update the loop branches: a success path leads outward to
        "Coverage improved" if the fix generalizes; otherwise the loop
        continues with a recursive retry.
      </desc>

      <defs>
        <marker
          id="arrow-teal"
          viewBox="0 0 10 10"
          refX={8}
          refY={5}
          markerWidth={7}
          markerHeight={7}
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#5eead4" />
        </marker>
        <marker
          id="arrow-warm"
          viewBox="0 0 10 10"
          refX={8}
          refY={5}
          markerWidth={7}
          markerHeight={7}
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#c4a576" />
        </marker>
      </defs>

      {/* Loop arcs */}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={`arc-${i}`}
          d={arc(i)}
          stroke="rgba(94, 234, 212, 0.65)"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#arrow-teal)"
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const p = pos(i)
        return (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={26}
              fill="#0a0e1a"
              stroke="#5eead4"
              strokeWidth={1.8}
            />
            <text
              x={p.x}
              y={p.y + 5}
              fill="#5eead4"
              fontFamily="'JetBrains Mono', monospace"
              fontSize={14}
              fontWeight={600}
              textAnchor="middle"
            >
              {i + 1}
            </text>
            <text
              x={p.x}
              y={p.y - 42}
              fill="#e8e6e1"
              fontFamily="'Inter', sans-serif"
              fontSize={12}
              fontWeight={600}
              textAnchor="middle"
            >
              {node.label}
            </text>
            <text
              x={p.x}
              y={p.y - 42 + 14}
              fill="rgba(232, 230, 225, 0.6)"
              fontFamily="'Inter', sans-serif"
              fontSize={11}
              textAnchor="middle"
            >
              {node.sub}
            </text>
          </g>
        )
      })}

      {/* Branches off node 4 (which is index 3, at the left) */}
      {(() => {
        const p = pos(3)
        // Success branch — out to the bottom-left.
        const successEnd = { x: p.x - 130, y: p.y + 90 }
        // Retry branch — back into the centre.
        const retryEnd = { x: cx, y: cy }
        return (
          <>
            <path
              d={`M ${p.x - 22},${p.y + 14} Q ${p.x - 90},${p.y + 90} ${successEnd.x},${successEnd.y}`}
              fill="none"
              stroke="#c4a576"
              strokeWidth={1.5}
              markerEnd="url(#arrow-warm)"
            />
            <text
              x={successEnd.x}
              y={successEnd.y + 18}
              fill="#c4a576"
              fontFamily="'Inter', sans-serif"
              fontSize={12}
              fontWeight={600}
              textAnchor="middle"
            >
              Coverage improved
            </text>
            <text
              x={successEnd.x}
              y={successEnd.y + 34}
              fill="rgba(232, 230, 225, 0.55)"
              fontFamily="'JetBrains Mono', monospace"
              fontSize={10}
              letterSpacing={1}
              textAnchor="middle"
            >
              FIX GENERALIZED
            </text>

            <path
              d={`M ${p.x + 22},${p.y - 14} Q ${cx - 60},${cy - 30} ${retryEnd.x - 8},${retryEnd.y}`}
              fill="none"
              stroke="rgba(232, 230, 225, 0.45)"
              strokeWidth={1.2}
              strokeDasharray="4 4"
              markerEnd="url(#arrow-teal)"
            />
            <text
              x={cx}
              y={cy - 38}
              fill="rgba(232, 230, 225, 0.65)"
              fontFamily="'Inter', sans-serif"
              fontSize={12}
              textAnchor="middle"
            >
              Recursive retry
            </text>
            <text
              x={cx}
              y={cy - 24}
              fill="rgba(232, 230, 225, 0.45)"
              fontFamily="'JetBrains Mono', monospace"
              fontSize={10}
              letterSpacing={1}
              textAnchor="middle"
            >
              FIX LOCALIZED
            </text>
          </>
        )
      })()}
    </svg>
  )
}
