const BLOCKS = [
  { id: 'tanker', label: 'Tanker UAV', x: 40, y: 80 },
  { id: 'boom', label: 'Boom System', x: 240, y: 80 },
  { id: 'receiver', label: 'Receiver Aircraft', x: 440, y: 80 },
  { id: 'controller', label: 'Refueling Controller', x: 240, y: 220 },
]

const CONNECTIONS: [number, number, number, number][] = [
  [180, 105, 240, 105],
  [380, 105, 440, 105],
  [305, 130, 305, 220],
]

export function SysMLDiagram() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-navy-900 p-6">
      <svg
        viewBox="0 0 600 320"
        className="w-full max-w-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#f97316" />
          </marker>
        </defs>

        {CONNECTIONS.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#f97316"
            strokeWidth="1.5"
            markerEnd="url(#arrowhead)"
          />
        ))}

        {BLOCKS.map((block) => (
          <g key={block.id}>
            <rect
              x={block.x}
              y={block.y}
              width={140}
              height={50}
              rx={6}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
              fill="rgba(255,255,255,0.05)"
            />
            <text
              x={block.x + 70}
              y={block.y + 25}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize="12"
              fontFamily="'DM Sans', sans-serif"
              fontWeight="500"
            >
              {block.label}
            </text>
            <text
              x={block.x + 70}
              y={block.y + 42}
              textAnchor="middle"
              fill="rgba(255,255,255,0.3)"
              fontSize="8"
              fontFamily="'DM Sans', sans-serif"
            >
              {'<<block>>'}
            </text>
          </g>
        ))}

        <text
          x={300}
          y={290}
          textAnchor="middle"
          fill="rgba(255,255,255,0.2)"
          fontSize="10"
          fontFamily="'DM Sans', sans-serif"
          letterSpacing="0.15em"
        >
          BDD — ANGARS SYSTEM ARCHITECTURE
        </text>
      </svg>
    </div>
  )
}
