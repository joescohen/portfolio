import { useId } from 'react'

/**
 * Diagram 2 — V-model ↔ agent pipeline.
 *
 * Two compact V's side by side. Each pair of nodes (SE on the left,
 * Agent on the right) is connected by a teal line indicating direct
 * mapping. On mobile we stack vertically rather than side-by-side.
 */
export function VModelAgentMapping() {
  // We render two stacked rows so flexbox lets us stack vertically on
  // narrow viewports without redoing the SVG layout.
  return (
    <div className="jrn-vmap-grid">
      <SingleV
        title="Systems Engineering"
        nodes={[
          'Stakeholder needs',
          'Requirements',
          'Architecture',
          'Component design',
          'Component V&V',
          'Integration & test',
          'System verification',
          'Validation',
        ]}
        accentColor="#e8e6e1"
        leftSide
      />
      <ConnectorBlock />
      <SingleV
        title="Agent Pipeline"
        nodes={[
          'Intake (user needs)',
          'Requirements (test specs)',
          'Architecture (agent roles)',
          'Skill design',
          'Skill unit eval',
          'Pipeline integration',
          'End-to-end eval',
          'Production validation',
        ]}
        accentColor="#5eead4"
      />
      <style>{css}</style>
    </div>
  )
}

const css = `
.jrn-vmap-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: stretch;
}
@media (min-width: 720px) {
  .jrn-vmap-grid {
    grid-template-columns: 1fr 80px 1fr;
    gap: 12px;
  }
}
.jrn-vmap-connector {
  display: none;
}
@media (min-width: 720px) {
  .jrn-vmap-connector {
    display: block;
    width: 100%;
    height: 100%;
  }
}
`

function ConnectorBlock() {
  // 8 horizontal teal lines bridging left → right.
  const labels = [
    'needs analysis',
    'requirements def.',
    'role architecture',
    'skill design',
    'unit evals',
    'integration evals',
    'system evals',
    'production',
  ]
  return (
    <div className="jrn-vmap-connector" aria-hidden="true">
      <svg viewBox="0 0 80 460" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        {labels.map((label, i) => {
          const y = 30 + i * 56
          return (
            <g key={i}>
              <line
                x1={0}
                y1={y}
                x2={80}
                y2={y}
                stroke="#5eead4"
                strokeWidth={1.4}
                strokeDasharray="4 4"
              />
              <text
                x={40}
                y={y - 6}
                fill="rgba(232, 230, 225, 0.55)"
                fontFamily="'JetBrains Mono', monospace"
                fontSize={8}
                letterSpacing={0.8}
                textAnchor="middle"
              >
                {label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

interface SingleVProps {
  title: string
  nodes: string[]
  accentColor: string
  leftSide?: boolean
}

function SingleV({ title, nodes, accentColor, leftSide }: SingleVProps) {
  const id = useId().replace(/:/g, '')
  const titleId = `vmap-${id}-title`
  const descId = `vmap-${id}-desc`

  // V layout — 4 levels per arm, 8 nodes total
  const W = 360
  const H = 460
  const padX = leftSide ? 110 : 20
  const padTop = 30

  const levelY = (l: number) => padTop + l * 75
  // Place arms so the V sits flush against the side opposite the connector.
  const leftX = (l: number) =>
    leftSide ? padX - 90 + l * 30 + 36 : padX + 16 + l * 28
  const rightX = (l: number) =>
    leftSide ? W - 70 - l * 30 : W - padX - 16 - l * 28
  const pivotX = leftSide ? padX + 100 : padX + 100

  const leftLabels = nodes.slice(0, 4)
  const rightLabels = nodes.slice(4, 8)

  // We position each node circle and label uniquely. Labels on the
  // "outer" side of the V face outward.
  return (
    <svg
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      viewBox={`0 0 ${W} ${H}`}
      className="jrn-diagram"
    >
      <title id={titleId}>{title} V-model</title>
      <desc id={descId}>
        A V-shape labeled "{title}", with four decomposition nodes on the
        left and four verification nodes on the right.
      </desc>

      <text
        x={W / 2}
        y={14}
        fill="rgba(232, 230, 225, 0.7)"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={11}
        letterSpacing={1.5}
        textAnchor="middle"
      >
        {title.toUpperCase()}
      </text>

      <polyline
        points={`${leftX(0)},${levelY(0)} ${leftX(1)},${levelY(1)} ${leftX(2)},${levelY(2)} ${leftX(3)},${levelY(3)} ${pivotX},${levelY(3) + 35} ${rightX(3)},${levelY(3)} ${rightX(2)},${levelY(2)} ${rightX(1)},${levelY(1)} ${rightX(0)},${levelY(0)}`}
        fill="none"
        stroke="rgba(232, 230, 225, 0.45)"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {leftLabels.map((label, i) => (
        <g key={`l-${i}`}>
          <circle cx={leftX(i)} cy={levelY(i)} r={5} fill={accentColor} />
          <text
            x={leftX(i) - 10}
            y={levelY(i) + 4}
            fill="#e8e6e1"
            fontFamily="'Inter', sans-serif"
            fontSize={11}
            textAnchor="end"
          >
            {label}
          </text>
        </g>
      ))}

      {rightLabels.map((label, i) => (
        <g key={`r-${i}`}>
          <circle cx={rightX(i)} cy={levelY(i)} r={5} fill={accentColor} />
          <text
            x={rightX(i) + 10}
            y={levelY(i) + 4}
            fill="#e8e6e1"
            fontFamily="'Inter', sans-serif"
            fontSize={11}
            textAnchor="start"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  )
}
