const STAGES = [
  { id: 1, label: 'Conductor', sub: 'Pre-flight' },
  { id: 2, label: 'Spec Agent', sub: 'specification.md' },
  { id: 3, label: 'Matrix Agent', sub: 'validation-matrix.md' },
  { id: 4, label: 'Executor', sub: '×N parallel', fan: true },
  { id: 5, label: 'Reporter', sub: 'audit-report.md' },
]

export function PipelineFlow() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-navy-900 p-6">
      <svg
        viewBox="0 0 700 280"
        className="w-full max-w-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="pipe-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 6 2.5, 0 5" fill="rgba(255,255,255,0.3)" />
          </marker>
          <marker id="gate-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 6 2.5, 0 5" fill="#f97316" />
          </marker>
        </defs>

        {/* Stage nodes */}
        {STAGES.map((stage, i) => {
          const x = 60 + i * 150
          const y = 110
          return (
            <g key={stage.id}>
              <circle
                cx={x}
                cy={y}
                r={28}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                fill="rgba(255,255,255,0.04)"
              />
              <text
                x={x}
                y={y - 4}
                textAnchor="middle"
                fill="#f97316"
                fontSize="14"
                fontWeight="600"
                fontFamily="'DM Sans', sans-serif"
              >
                {stage.id}
              </text>
              <text
                x={x}
                y={y + 50}
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="500"
                fontFamily="'DM Sans', sans-serif"
              >
                {stage.label}
              </text>
              <text
                x={x}
                y={y + 66}
                textAnchor="middle"
                fill="rgba(255,255,255,0.35)"
                fontSize="9"
                fontFamily="'DM Sans', sans-serif"
              >
                {stage.sub}
              </text>

              {i < STAGES.length - 1 && !stage.fan && (
                <line
                  x1={x + 28}
                  y1={y}
                  x2={x + 150 - 28}
                  y2={y}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                  markerEnd="url(#pipe-arrow)"
                />
              )}
            </g>
          )
        })}

        {/* Fan-out from Matrix Agent to Executor — 3 parallel lines */}
        <line x1={288} y1={100} x2={432} y2={100} stroke="rgba(255,255,255,0.15)" strokeWidth="1" markerEnd="url(#pipe-arrow)" />
        <line x1={288} y1={110} x2={432} y2={110} stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#pipe-arrow)" />
        <line x1={288} y1={120} x2={432} y2={120} stroke="rgba(255,255,255,0.15)" strokeWidth="1" markerEnd="url(#pipe-arrow)" />

        {/* Executor to Reporter — reconverge */}
        <line x1={488} y1={110} x2={582} y2={110} stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#pipe-arrow)" />

        {/* Gate markers */}
        {[
          { x: 195, label: 'Gate 1' },
          { x: 345, label: 'Gate 2' },
          { x: 495, label: 'Gate 3' },
        ].map((gate) => (
          <g key={gate.label}>
            <line x1={gate.x} y1={85} x2={gate.x} y2={135} stroke="#f97316" strokeWidth="1" strokeDasharray="3 2" opacity={0.4} />
            <text
              x={gate.x}
              y={78}
              textAnchor="middle"
              fill="#f97316"
              fontSize="8"
              fontFamily="'DM Sans', sans-serif"
              opacity={0.6}
            >
              {gate.label}
            </text>
          </g>
        ))}

        {/* Diagram label */}
        <text
          x={350}
          y={240}
          textAnchor="middle"
          fill="rgba(255,255,255,0.15)"
          fontSize="10"
          fontFamily="'DM Sans', sans-serif"
          letterSpacing="0.15em"
        >
          SYSTEM VALIDATOR — AGENT PIPELINE
        </text>
      </svg>
    </div>
  )
}
