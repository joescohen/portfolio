/**
 * Diagram 4 — SE Validation Platform Architecture.
 *
 * Three stacked horizontal layers:
 *   L0 — Skills (a row of skill chips)
 *   L1 — Engine (archetype agents: Defender / Auditor / Cross-checker / Observer)
 *   L2 — Program layer (RAG over document corpus)
 *
 * Data-flow arrows run between layers showing the up/down information
 * path: Skills feed Engine, Engine reports up to Program, Program
 * retrieves from corpus and dispatches skills.
 */
export function PlatformArchitectureDiagram() {
  const W = 760
  const H = 460

  // Each layer band
  const bands = [
    {
      y: 40,
      h: 90,
      code: 'L2',
      title: 'Program Layer',
      subtitle: 'Cross-document orchestration · RAG · lifecycle milestones',
      color: '#c4a576',
      pieces: [
        { label: 'RAG corpus', tone: 'warm' },
        { label: 'Hybrid search', tone: 'warm' },
        { label: 'Milestone gates', tone: 'warm' },
        { label: 'Skill dispatch', tone: 'warm' },
      ],
    },
    {
      y: 170,
      h: 110,
      code: 'L1',
      title: 'Engine',
      subtitle: 'Archetype debate · structured handoffs',
      color: '#5eead4',
      pieces: [
        { label: 'Defender', tone: 'accent' },
        { label: 'Auditor', tone: 'accent' },
        { label: 'Cross-checker', tone: 'accent' },
        { label: 'Observer', tone: 'accent' },
      ],
    },
    {
      y: 320,
      h: 100,
      code: 'L0',
      title: 'Skills',
      subtitle: 'Per-document validators · independently testable',
      color: '#e8e6e1',
      pieces: [
        { label: 'Requirements', tone: 'neutral' },
        { label: 'ConOps', tone: 'neutral' },
        { label: 'ICD cross-check', tone: 'neutral' },
        { label: 'Traceability', tone: 'neutral' },
      ],
    },
  ]

  const toneColor = (tone: string) =>
    tone === 'warm' ? '#c4a576' : tone === 'accent' ? '#5eead4' : '#e8e6e1'

  return (
    <svg
      role="img"
      aria-labelledby="platform-title platform-desc"
      viewBox={`0 0 ${W} ${H}`}
      className="jrn-diagram"
    >
      <title id="platform-title">SE Validation Platform Architecture</title>
      <desc id="platform-desc">
        Three stacked horizontal layers. The top layer is L2, the Program
        Layer — cross-document orchestration with retrieval-augmented
        generation, hybrid search, milestone gates, and skill dispatch.
        The middle layer is L1, the Engine, which runs the archetype
        debate pattern across Defender, Auditor, Cross-checker, and
        Observer agents. The bottom layer is L0, Skills — per-document
        validators including Requirements, ConOps, ICD cross-check, and
        Traceability. Vertical arrows show data flowing down from L2 to
        L0 for dispatch, and back up for reporting.
      </desc>

      <defs>
        <marker
          id="arr-down"
          viewBox="0 0 10 10"
          refX={5}
          refY={9}
          markerWidth={7}
          markerHeight={7}
          orient="auto"
        >
          <path d="M 0 0 L 5 9 L 10 0 z" fill="rgba(94, 234, 212, 0.75)" />
        </marker>
        <marker
          id="arr-up"
          viewBox="0 0 10 10"
          refX={5}
          refY={1}
          markerWidth={7}
          markerHeight={7}
          orient="auto"
        >
          <path d="M 0 10 L 5 1 L 10 10 z" fill="rgba(196, 165, 118, 0.75)" />
        </marker>
      </defs>

      {bands.map((band) => (
        <g key={band.code}>
          {/* Layer band */}
          <rect
            x={40}
            y={band.y}
            width={W - 80}
            height={band.h}
            rx={4}
            fill="rgba(17, 23, 42, 0.7)"
            stroke={band.color}
            strokeOpacity={0.35}
            strokeWidth={1}
          />
          {/* Layer label */}
          <text
            x={56}
            y={band.y + 24}
            fill={band.color}
            fontFamily="'JetBrains Mono', monospace"
            fontSize={13}
            fontWeight={600}
            letterSpacing={1.5}
          >
            {band.code}
          </text>
          <text
            x={92}
            y={band.y + 24}
            fill="#e8e6e1"
            fontFamily="'Inter', sans-serif"
            fontSize={15}
            fontWeight={600}
          >
            {band.title}
          </text>
          <text
            x={56}
            y={band.y + 42}
            fill="rgba(232, 230, 225, 0.55)"
            fontFamily="'Inter', sans-serif"
            fontSize={11}
          >
            {band.subtitle}
          </text>
          {/* Pieces inside the band */}
          {band.pieces.map((piece, i) => {
            const px = 60 + i * 160
            const py = band.y + band.h - 38
            return (
              <g key={piece.label}>
                <rect
                  x={px}
                  y={py}
                  width={140}
                  height={26}
                  rx={2}
                  fill="rgba(10, 14, 26, 0.85)"
                  stroke={toneColor(piece.tone)}
                  strokeOpacity={0.55}
                  strokeWidth={1}
                />
                <text
                  x={px + 70}
                  y={py + 17}
                  fill={toneColor(piece.tone)}
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize={11}
                  letterSpacing={0.8}
                  textAnchor="middle"
                >
                  {piece.label}
                </text>
              </g>
            )
          })}
        </g>
      ))}

      {/* Data-flow arrows between layers */}
      {/* L2 → L1 (down) and L1 → L2 (up) */}
      <line
        x1={W / 2 - 18}
        y1={130}
        x2={W / 2 - 18}
        y2={166}
        stroke="rgba(94, 234, 212, 0.75)"
        strokeWidth={1.4}
        markerEnd="url(#arr-down)"
      />
      <line
        x1={W / 2 + 18}
        y1={166}
        x2={W / 2 + 18}
        y2={130}
        stroke="rgba(196, 165, 118, 0.75)"
        strokeWidth={1.4}
        markerEnd="url(#arr-up)"
      />
      <text
        x={W / 2 - 28}
        y={154}
        fill="rgba(94, 234, 212, 0.85)"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={9}
        textAnchor="end"
        letterSpacing={0.6}
      >
        dispatch
      </text>
      <text
        x={W / 2 + 28}
        y={154}
        fill="rgba(196, 165, 118, 0.85)"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={9}
        textAnchor="start"
        letterSpacing={0.6}
      >
        report
      </text>

      {/* L1 → L0 (down) and L0 → L1 (up) */}
      <line
        x1={W / 2 - 18}
        y1={280}
        x2={W / 2 - 18}
        y2={316}
        stroke="rgba(94, 234, 212, 0.75)"
        strokeWidth={1.4}
        markerEnd="url(#arr-down)"
      />
      <line
        x1={W / 2 + 18}
        y1={316}
        x2={W / 2 + 18}
        y2={280}
        stroke="rgba(196, 165, 118, 0.75)"
        strokeWidth={1.4}
        markerEnd="url(#arr-up)"
      />
      <text
        x={W / 2 - 28}
        y={304}
        fill="rgba(94, 234, 212, 0.85)"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={9}
        textAnchor="end"
        letterSpacing={0.6}
      >
        invoke
      </text>
      <text
        x={W / 2 + 28}
        y={304}
        fill="rgba(196, 165, 118, 0.85)"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={9}
        textAnchor="start"
        letterSpacing={0.6}
      >
        findings
      </text>
    </svg>
  )
}
