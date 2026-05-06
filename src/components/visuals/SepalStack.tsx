const LAYERS = [
  { id: 'L3', label: 'Institutional', sub: 'Cross-program learning', color: '#a78bfa' },
  { id: 'L2', label: 'Program Model', sub: 'Lifecycle orchestration', color: '#60a5fa' },
  { id: 'L1', label: 'Process Engine', sub: 'Agent runtime', color: '#34d399' },
  { id: 'L0', label: 'Skills', sub: 'Declarative configs', color: '#fbbf24' },
]

export function SepalStack() {
  const layerH = 42
  const gap = 36

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 700 350"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="SEPAL four-level architecture stack — Skills, Engine, Program Model, Institutional Layer"
      >
        {LAYERS.map((layer, i) => {
          const y = 28 + i * (layerH + gap)
          const w = 420
          const x = 140

          return (
            <g key={layer.id}>
              {/* Layer box */}
              <rect
                x={x}
                y={y}
                width={w}
                height={layerH}
                rx={6}
                stroke={layer.color}
                strokeWidth="1.5"
                fill={`${layer.color}10`}
              />
              <text
                x={x + 16}
                y={y + 18}
                fill={layer.color}
                fontSize="12"
                fontWeight="700"
                fontFamily="'DM Sans', sans-serif"
              >
                {layer.id}
              </text>
              <text
                x={x + 46}
                y={y + 18}
                fill="white"
                fontSize="12"
                fontWeight="600"
                fontFamily="'DM Sans', sans-serif"
              >
                {layer.label}
              </text>
              <text
                x={x + 46}
                y={y + 33}
                fill="rgba(255,255,255,0.4)"
                fontSize="10"
                fontFamily="'DM Sans', sans-serif"
              >
                {layer.sub}
              </text>

              {/* Arrows between layers */}
              {i < LAYERS.length - 1 && (() => {
                const arrowTop = y + layerH + 3
                const arrowBot = y + layerH + gap - 3
                const midY = (arrowTop + arrowBot) / 2
                const leftX = 320
                const rightX = 380

                return (
                  <>
                    {/* Down arrow (left) */}
                    <line x1={leftX} y1={arrowTop} x2={leftX} y2={arrowBot - 7} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <polygon points={`${leftX - 5},${arrowBot - 8} ${leftX},${arrowBot} ${leftX + 5},${arrowBot - 8}`} fill="rgba(255,255,255,0.3)" />

                    {/* Up arrow (right) */}
                    <line x1={rightX} y1={arrowBot} x2={rightX} y2={arrowTop + 7} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <polygon points={`${rightX - 5},${arrowTop + 8} ${rightX},${arrowTop} ${rightX + 5},${arrowTop + 8}`} fill="rgba(255,255,255,0.3)" />

                    {/* Interface label between arrows */}
                    {i === 0 && (
                      <text x={leftX + 30} y={midY + 3} textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="'JetBrains Mono', monospace" opacity={0.6}>
                        ProgramSnapshot
                      </text>
                    )}
                    {i === 1 && (
                      <text x={leftX + 30} y={midY + 3} textAnchor="middle" fill="#60a5fa" fontSize="8" fontFamily="'JetBrains Mono', monospace" opacity={0.6}>
                        SessionResult
                      </text>
                    )}
                    {i === 2 && (
                      <text x={leftX + 30} y={midY + 3} textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="'JetBrains Mono', monospace" opacity={0.6}>
                        SkillDefinition
                      </text>
                    )}
                  </>
                )
              })()}
            </g>
          )
        })}

        {/* Data flow annotations */}
        <text
          x={590}
          y={112}
          fill="#34d399"
          fontSize="9"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="500"
          opacity={0.7}
        >
          ↑ Data flows up
        </text>
        <text
          x={590}
          y={186}
          fill="#a78bfa"
          fontSize="9"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="500"
          opacity={0.7}
        >
          ↓ Feedback down
        </text>

        <text
          x={350}
          y={338}
          textAnchor="middle"
          fill="rgba(255,255,255,0.3)"
          fontSize="11"
          fontFamily="'DM Sans', sans-serif"
          letterSpacing="0.15em"
        >
          SEPAL — 4-LEVEL ARCHITECTURE
        </text>
      </svg>
    </div>
  )
}
