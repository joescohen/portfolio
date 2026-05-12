/**
 * Full-size SEPAL 4-layer architecture diagram for the Architecture tab.
 * Shows real components inside each layer + data-flow arrows between layers
 * with labeled interface contracts. Light theme.
 */
const LAYERS = [
  {
    id: 'L3',
    name: 'Institutional Layer',
    status: 'planned',
    color: '#8b5cf6',
    softFill: '#f5f3ff',
    components: [
      { label: 'Findings corpus', sub: 'cross-program' },
      { label: 'Lessons learned', sub: 'curated' },
      { label: 'Skill effectiveness', sub: 'hit rate · FPR' },
      { label: 'Portfolio dashboard', sub: 'chief engineer' },
    ],
  },
  {
    id: 'L2',
    name: 'Program Model',
    status: 'complete · v6.0',
    color: '#3b82f6',
    softFill: '#eff6ff',
    components: [
      { label: 'ProgramStore', sub: 'SQLite + Drizzle · 5 tables' },
      { label: 'DAG Runner', sub: 'topo sort · cost caps · resume' },
      { label: 'DirectoryScanner', sub: 'CDRL · alias · sniff' },
      { label: 'SkillClassifier', sub: 'rule-based, no LLM' },
      { label: 'API + SSE', sub: '21 routes · JSONL replay' },
      { label: 'React 19 SPA', sub: '9 pages · Recharts' },
    ],
  },
  {
    id: 'L1',
    name: 'Process Engine',
    status: 'complete · v5.0',
    color: '#10b981',
    softFill: '#ecfdf5',
    components: [
      { label: 'Conductor', sub: '20+ event types · HITL' },
      { label: 'LLMGateway', sub: 'completeStructured<T>()' },
      { label: 'Corpus', sub: 'LanceDB · vector + BM25' },
      { label: 'Agent tools', sub: '8 retrieval / trace tools' },
      { label: 'Prompt assembler', sub: 'tiered · citation-checked' },
      { label: 'Renderers', sub: '17 deliverable formats' },
    ],
  },
  {
    id: 'L0',
    name: 'Skills',
    status: 'complete · 9 live',
    color: '#eab308',
    softFill: '#fefce8',
    components: [
      { label: 'RQG', sub: 'requirements gate' },
      { label: 'RTA', sub: 'traceability audit' },
      { label: 'TSA', sub: 'trade study' },
      { label: 'ICDC', sub: 'ICD consistency' },
      { label: 'CMW', sub: 'ConOps / mission' },
      { label: 'SQR', sub: 'spec reviewer' },
      { label: 'DRS', sub: 'design review (SRR/PDR/CDR)' },
      { label: 'AIA', sub: 'anomaly investigation' },
    ],
  },
]

const INTERFACES = [
  { label: 'ProgramSnapshot', desc: 'health · finding summaries · metrics' },
  { label: 'SessionResult', desc: 'RID register · findings · scores · deliverable path' },
  { label: 'SkillDefinition', desc: 'TS object literal · SkillDefinitionSchema-validated' },
]

export function FourLayerArchitecture() {
  const layerH = 130
  const layerGap = 50
  const startY = 40
  const layerX = 60
  const layerW = 780

  return (
    <svg
      viewBox="0 0 900 770"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SEPAL four-layer architecture. From top to bottom: L3 Institutional Layer (planned), L2 Program Model with ProgramStore and DAG Runner, L1 Process Engine with Conductor and LLMGateway, L0 Skills with 9 production manifests. Data flows up; feedback flows down. Layers communicate through typed interfaces: SkillDefinition, SessionResult, ProgramSnapshot."
    >
      <defs>
        <marker id="fla-arrow-up" markerWidth="9" markerHeight="7" refX="4.5" refY="0" orient="auto">
          <polygon points="0 7, 4.5 0, 9 7" fill="#10b981" />
        </marker>
        <marker id="fla-arrow-down" markerWidth="9" markerHeight="7" refX="4.5" refY="7" orient="auto">
          <polygon points="0 0, 4.5 7, 9 0" fill="#94a3b8" />
        </marker>
      </defs>

      {LAYERS.map((layer, i) => {
        const y = startY + i * (layerH + layerGap)
        const isPlanned = layer.status.includes('planned')
        const cols = Math.min(layer.components.length, 4)
        const compW = (layerW - 40 - (cols - 1) * 12) / cols
        const compH = 42
        const rows = Math.ceil(layer.components.length / cols)

        return (
          <g key={layer.id} opacity={isPlanned ? 0.55 : 1}>
            {/* Layer outline */}
            <rect
              x={layerX}
              y={y}
              width={layerW}
              height={layerH}
              rx={6}
              fill={layer.softFill}
              stroke={layer.color}
              strokeWidth="1.5"
              strokeDasharray={isPlanned ? '6 5' : undefined}
            />
            {/* Layer ID badge */}
            <rect
              x={layerX}
              y={y}
              width={64}
              height={28}
              rx={6}
              fill={layer.color}
            />
            <text
              x={layerX + 32}
              y={y + 19}
              textAnchor="middle"
              fill="#fff"
              fontSize="12"
              fontWeight="700"
              fontFamily="'DM Sans', sans-serif"
              letterSpacing="0.1em"
            >
              {layer.id}
            </text>
            {/* Layer name */}
            <text
              x={layerX + 80}
              y={y + 19}
              fill="#1e293b"
              fontSize="14"
              fontWeight="700"
              fontFamily="'DM Sans', sans-serif"
            >
              {layer.name}
            </text>
            {/* Layer status */}
            <text
              x={layerX + layerW - 16}
              y={y + 19}
              textAnchor="end"
              fill={layer.color}
              fontSize="10"
              fontWeight="600"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.1em"
            >
              {layer.status.toUpperCase()}
            </text>

            {/* Components */}
            {layer.components.map((comp, j) => {
              const col = j % cols
              const row = Math.floor(j / cols)
              const cx = layerX + 20 + col * (compW + 12)
              const cy = y + 42 + row * (compH + 8)
              const usedH = rows * compH + (rows - 1) * 8
              const adj = (layerH - 42 - usedH) / 2
              return (
                <g key={comp.label}>
                  <rect
                    x={cx}
                    y={cy + adj}
                    width={compW}
                    height={compH}
                    rx={3}
                    fill="#fff"
                    stroke={layer.color}
                    strokeOpacity="0.4"
                    strokeWidth="1"
                  />
                  <text
                    x={cx + 10}
                    y={cy + adj + 18}
                    fill="#0f172a"
                    fontSize="11.5"
                    fontWeight="600"
                    fontFamily="'DM Sans', sans-serif"
                  >
                    {comp.label}
                  </text>
                  <text
                    x={cx + 10}
                    y={cy + adj + 32}
                    fill="#64748b"
                    fontSize="9.5"
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {comp.sub}
                  </text>
                </g>
              )
            })}

            {/* Inter-layer arrows */}
            {i < LAYERS.length - 1 && (() => {
              const arrowY1 = y + layerH + 6
              const arrowY2 = y + layerH + layerGap - 6
              const leftX = layerX + 260
              const rightX = layerX + 520
              const iface = INTERFACES[i]
              const midY = (arrowY1 + arrowY2) / 2
              return (
                <g>
                  {/* Up arrow (data) */}
                  <line
                    x1={leftX}
                    y1={arrowY2}
                    x2={leftX}
                    y2={arrowY1 + 4}
                    stroke="#10b981"
                    strokeWidth="1.5"
                    markerEnd="url(#fla-arrow-up)"
                  />
                  {/* Down arrow (feedback) */}
                  <line
                    x1={rightX}
                    y1={arrowY1}
                    x2={rightX}
                    y2={arrowY2 - 4}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    markerEnd="url(#fla-arrow-down)"
                  />
                  {/* Interface label */}
                  <rect
                    x={(leftX + rightX) / 2 - 100}
                    y={midY - 10}
                    width={200}
                    height={20}
                    rx={3}
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                  <text
                    x={(leftX + rightX) / 2}
                    y={midY + 4}
                    textAnchor="middle"
                    fill="#047857"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {iface?.label}
                  </text>
                  {/* Arrow legend (small) */}
                  {i === 0 && (
                    <g>
                      <text
                        x={leftX - 14}
                        y={midY + 3}
                        textAnchor="end"
                        fill="#10b981"
                        fontSize="9"
                        fontFamily="'JetBrains Mono', monospace"
                      >
                        data ↑
                      </text>
                      <text
                        x={rightX + 14}
                        y={midY + 3}
                        fill="#94a3b8"
                        fontSize="9"
                        fontFamily="'JetBrains Mono', monospace"
                      >
                        feedback ↓
                      </text>
                    </g>
                  )}
                </g>
              )
            })()}
          </g>
        )
      })}
    </svg>
  )
}
