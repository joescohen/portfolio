/**
 * End-to-end flow of a single skill execution: documents come in,
 * pass through ingestion + ranking, reach the engine where the conductor
 * orchestrates a multi-archetype debate, and produce structured findings
 * rendered into deliverable formats. Light theme.
 */
const STAGES = [
  {
    label: 'Documents',
    sub: 'SRD · ICD · trade',
    detail: '6 parsers',
    color: '#64748b',
  },
  {
    label: 'Ingestion',
    sub: 'banner check · embed',
    detail: 'LanceDB · BM25',
    color: '#0ea5e9',
  },
  {
    label: 'Skill Selection',
    sub: 'classifier · entrance criteria',
    detail: 'rule-based',
    color: '#eab308',
  },
  {
    label: 'Archetype Debate',
    sub: 'turn-based · cited',
    detail: '20+ events',
    color: '#10b981',
  },
  {
    label: 'Citation Check',
    sub: 'verbatim verify',
    detail: 'reject un-cited',
    color: '#06b6d4',
  },
  {
    label: 'Findings',
    sub: 'RID · severity · disposition',
    detail: 'Zod validated',
    color: '#3b82f6',
  },
  {
    label: 'Deliverable',
    sub: 'render · export',
    detail: 'MD · XLSX · JSON',
    color: '#8b5cf6',
  },
]

export function SkillExecutionFlow() {
  return (
    <svg
      viewBox="0 0 980 280"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="End-to-end skill execution flow: Documents enter ingestion, where banner detection refuses CUI and approved content is embedded; the classifier selects a skill; the engine runs an archetype debate that produces cited findings; citations are verbatim-verified; findings are Zod-validated and rendered into Markdown, Excel, and JSON deliverables."
    >
      <defs>
        <marker id="sef-arrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
          <polygon points="0 0, 10 4, 0 8" fill="#94a3b8" />
        </marker>
      </defs>

      {STAGES.map((stage, i) => {
        const xCenter = 70 + i * 135
        const yCenter = 130
        return (
          <g key={stage.label}>
            {/* Stage circle */}
            <circle
              cx={xCenter}
              cy={yCenter}
              r={38}
              fill="#fff"
              stroke={stage.color}
              strokeWidth="1.5"
            />
            <circle
              cx={xCenter}
              cy={yCenter}
              r={32}
              fill={`${stage.color}10`}
              stroke="none"
            />
            <text
              x={xCenter}
              y={yCenter - 4}
              textAnchor="middle"
              fill={stage.color}
              fontSize="13"
              fontWeight="700"
              fontFamily="'DM Sans', sans-serif"
            >
              {String(i + 1).padStart(2, '0')}
            </text>
            <text
              x={xCenter}
              y={yCenter + 12}
              textAnchor="middle"
              fill="#64748b"
              fontSize="9"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.05em"
            >
              {stage.detail}
            </text>

            {/* Stage label */}
            <text
              x={xCenter}
              y={yCenter + 64}
              textAnchor="middle"
              fill="#0f172a"
              fontSize="12.5"
              fontWeight="600"
              fontFamily="'DM Sans', sans-serif"
            >
              {stage.label}
            </text>
            <text
              x={xCenter}
              y={yCenter + 80}
              textAnchor="middle"
              fill="#64748b"
              fontSize="10.5"
              fontFamily="'DM Sans', sans-serif"
            >
              {stage.sub}
            </text>

            {/* Connector */}
            {i < STAGES.length - 1 && (
              <line
                x1={xCenter + 40}
                y1={yCenter}
                x2={xCenter + 135 - 40}
                y2={yCenter}
                stroke="#cbd5e1"
                strokeWidth="1.5"
                markerEnd="url(#sef-arrow)"
              />
            )}
          </g>
        )
      })}

      {/* Stage role bar above */}
      <g>
        <text
          x={150}
          y={50}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.18em"
        >
          INPUT
        </text>
        <text
          x={487}
          y={50}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.18em"
        >
          ENGINE
        </text>
        <text
          x={870}
          y={50}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.18em"
        >
          OUTPUT
        </text>

        {/* Spanning brackets */}
        <line x1={32} y1={62} x2={268} y2={62} stroke="#e2e8f0" strokeWidth="1" />
        <line x1={300} y1={62} x2={673} y2={62} stroke="#e2e8f0" strokeWidth="1" />
        <line x1={705} y1={62} x2={940} y2={62} stroke="#e2e8f0" strokeWidth="1" />
      </g>

      {/* Persistence note */}
      <g>
        <text
          x={487}
          y={258}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
          fontStyle="italic"
        >
          JSON checkpoint per turn · resume on (corpus-hash, skill-config-hash, model-date)
        </text>
      </g>
    </svg>
  )
}
