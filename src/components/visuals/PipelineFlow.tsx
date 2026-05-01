const STAGES = [
  { id: 1, label: 'Conductor', sub: 'Pre-flight' },
  { id: 2, label: 'Spec Agent', sub: 'specification.md' },
  { id: 3, label: 'Matrix Agent', sub: 'validation-matrix.md', fan: true },
  { id: 4, label: 'Executor', sub: '×N parallel', fan: true },
  { id: 5, label: 'Reporter', sub: 'audit-report.md' },
]

export function PipelineFlow() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <svg
        viewBox="0 0 700 280"
        className="w-full max-w-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="System Validator agent pipeline showing 5 stages with parallel execution"
      >
        <defs>
          <marker id="pipeline-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.45)" />
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
                r={32}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
                fill="rgba(255,255,255,0.06)"
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#f97316"
                fontSize="16"
                fontWeight="600"
                fontFamily="'DM Sans', sans-serif"
              >
                {stage.id}
              </text>
              <text
                x={x}
                y={y + 52}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="500"
                fontFamily="'DM Sans', sans-serif"
              >
                {stage.label}
              </text>
              <text
                x={x}
                y={y + 67}
                textAnchor="middle"
                fill="rgba(255,255,255,0.45)"
                fontSize="10"
                fontFamily="'DM Sans', sans-serif"
              >
                {stage.sub}
              </text>

              {i < STAGES.length - 1 && !stage.fan && (
                <line
                  x1={x + 32}
                  y1={y}
                  x2={x + 150 - 32}
                  y2={y}
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.5"
                  markerEnd="url(#pipeline-arrow)"
                />
              )}
            </g>
          )
        })}

        {/* Fan-out bow-tie: all three paths originate AND terminate at center y=110, arcing out in the middle.
            This clearly reads as N parallel dispatches to a single Executor — not N arrows targeting 3 different points. */}
        <path d="M 392 110 Q 435 80 478 110"  stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" markerEnd="url(#pipeline-arrow)" />
        <path d="M 392 110 L 478 110"          stroke="rgba(255,255,255,0.4)"  strokeWidth="1.5" fill="none" markerEnd="url(#pipeline-arrow)" />
        <path d="M 392 110 Q 435 140 478 110"  stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" markerEnd="url(#pipeline-arrow)" />

        {/* Executor to Reporter — reconverge */}
        <line x1={542} y1={110} x2={628} y2={110} stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" markerEnd="url(#pipeline-arrow)" />

        {/* Gate markers */}
        {[
          { x: 195, label: 'Gate 1' },
          { x: 345, label: 'Gate 2' },
          { x: 495, label: 'Gate 3' },
        ].map((gate) => (
          <g key={gate.label}>
            <line x1={gate.x} y1={82} x2={gate.x} y2={138} stroke="#f97316" strokeWidth="1.5" strokeDasharray="8 5" opacity={0.5} />
            <text
              x={gate.x}
              y={74}
              textAnchor="middle"
              fill="#f97316"
              fontSize="9"
              fontFamily="'DM Sans', sans-serif"
              fontWeight="500"
              opacity={0.7}
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
          fill="rgba(255,255,255,0.2)"
          fontSize="11"
          fontFamily="'DM Sans', sans-serif"
          letterSpacing="0.15em"
        >
          SYSTEM VALIDATOR — AGENT PIPELINE
        </text>
      </svg>
    </div>
  )
}
