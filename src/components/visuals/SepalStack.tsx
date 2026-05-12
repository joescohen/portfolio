/**
 * SEPAL — home page strip visual.
 *
 * "One picture, end to end" — the build / link / run block diagram of how
 * SEPAL actually executes. Build the corpus once; link chunks across
 * documents once; run many skills in parallel against the cached structure.
 *
 * Light-on-dark theme — designed to sit on the home page navy strip.
 */

const CHUNK_COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6']

export function SepalStack() {
  return (
    <div className="w-full h-full flex items-center justify-center px-4 py-6">
      <svg
        viewBox="0 0 820 460"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="SEPAL runtime block diagram. Build phase: heterogeneous documents are chunked, tagged, embedded, and stored in a reusable corpus. Link phase: cross-document chunk relationships are computed once and cached. Run phase: multiple review skills execute in parallel against the cached corpus and links, each producing a RID register. Tagline: build once, link once, run many."
      >
        <defs>
          <marker id="ss-arrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0, 9 3.5, 0 7" fill="rgba(255,255,255,0.45)" />
          </marker>
          <marker id="ss-arrow-faint" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.25)" />
          </marker>
          <linearGradient id="ss-cyl-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(52, 211, 153, 0.35)" />
            <stop offset="100%" stopColor="rgba(52, 211, 153, 0.15)" />
          </linearGradient>
        </defs>

        {/* Column backgrounds */}
        <rect x="6"   y="14" width="252" height="404" rx="6" fill="rgba(52, 211, 153, 0.045)" stroke="rgba(52, 211, 153, 0.15)" />
        <rect x="278" y="14" width="252" height="404" rx="6" fill="rgba(125, 211, 252, 0.04)"  stroke="rgba(125, 211, 252, 0.15)" />
        <rect x="550" y="14" width="262" height="404" rx="6" fill="rgba(196, 181, 253, 0.04)"  stroke="rgba(196, 181, 253, 0.18)" />

        {/* Column headers */}
        <text x="132" y="38" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.18em">BUILD</text>
        <text x="404" y="38" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.18em">LINK</text>
        <text x="681" y="38" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.18em">RUN — N skills · parallel</text>

        {/* =================== BUILD COLUMN =================== */}

        {/* Heterogeneous documents — 4 small doc icons */}
        {[0, 1, 2, 3].map((i) => {
          const x = 38 + (i % 4) * 50
          const y = 62
          const accent = CHUNK_COLORS[i]
          return (
            <g key={`doc-${i}`}>
              <rect x={x} y={y} width={32} height={42} rx={2} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
              <rect x={x} y={y} width={32} height={5} rx={2} fill={accent} />
              <line x1={x + 5} y1={y + 14} x2={x + 27} y2={y + 14} stroke="rgba(255,255,255,0.25)" />
              <line x1={x + 5} y1={y + 21} x2={x + 27} y2={y + 21} stroke="rgba(255,255,255,0.25)" />
              <line x1={x + 5} y1={y + 28} x2={x + 23} y2={y + 28} stroke="rgba(255,255,255,0.25)" />
              <line x1={x + 5} y1={y + 35} x2={x + 25} y2={y + 35} stroke="rgba(255,255,255,0.25)" />
            </g>
          )
        })}
        <text x="132" y="124" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.06em">SRD · ICD · ConOps · trade</text>

        {/* Arrow down */}
        <line x1="132" y1="134" x2="132" y2="158" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />

        {/* Tagged chunks (multi-colored horizontal bars) */}
        <g>
          {CHUNK_COLORS.map((c, i) => (
            <g key={`chunk-${i}`}>
              <rect x={56} y={170 + i * 10} width={108} height={6} rx={1} fill={c} opacity="0.85" />
              <rect x={170} y={170 + i * 10} width={14} height={6} rx={1} fill="rgba(255,255,255,0.3)" />
              <rect x={188} y={170 + i * 10} width={20} height={6} rx={1} fill="rgba(255,255,255,0.2)" />
            </g>
          ))}
        </g>
        <text x="110" y="237" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="'DM Sans', sans-serif">chunks</text>
        <text x="190" y="237" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="'JetBrains Mono', monospace">+ tags · vectors</text>

        {/* Arrow down */}
        <line x1="132" y1="244" x2="132" y2="266" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />

        {/* Cylinder — corpus */}
        <g>
          <ellipse cx="132" cy="275" rx="60" ry="11" fill="url(#ss-cyl-top)" stroke="rgba(52, 211, 153, 0.55)" strokeWidth="1.2" />
          <path
            d="M 72 275 L 72 322 A 60 11 0 0 0 192 322 L 192 275"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(52, 211, 153, 0.55)"
            strokeWidth="1.2"
          />
          <ellipse cx="132" cy="275" rx="60" ry="11" fill="rgba(52, 211, 153, 0.18)" stroke="rgba(52, 211, 153, 0.55)" strokeWidth="1.2" />
          <text x="132" y="280" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600" fontFamily="'DM Sans', sans-serif">corpus</text>
          <text x="132" y="296" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="'JetBrains Mono', monospace">~12k rows · sha256</text>
        </g>

        {/* Reuse badge */}
        <g>
          <rect x="64" y="350" width="136" height="22" rx="3" fill="rgba(249, 115, 22, 0.12)" stroke="rgba(249, 115, 22, 0.55)" strokeWidth="1" />
          <text x="132" y="365" textAnchor="middle" fill="#fb923c" fontSize="10" fontWeight="600" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.06em">REUSED × N SKILLS</text>
        </g>

        {/* Cache hint */}
        <text x="132" y="392" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontStyle="italic">
          if corpus_hash unchanged
        </text>
        <text x="132" y="404" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontStyle="italic">
          → skip rebuild
        </text>

        {/* =================== LINK COLUMN =================== */}

        {/* Compare zone: ONE source on the left → fan to FOUR candidates on the right */}
        {/* Source chunk (left side) */}
        <rect x="298" y="84" width="56" height="10" rx="1" fill="#ef4444" />
        <text x="326" y="108" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9" fontFamily="'JetBrains Mono', monospace">source</text>

        {/* Four candidate chunks (right side, single column) */}
        {[
          { y: 60, color: '#f59e0b' },
          { y: 76, color: '#10b981' },
          { y: 92, color: '#3b82f6' },
          { y: 108, color: '#8b5cf6' },
        ].map((c, i) => (
          <g key={`cand-${i}`}>
            <rect x="448" y={c.y} width="62" height="9" rx="1" fill={c.color} opacity="0.85" />
            <line
              x1="354"
              y1="89"
              x2="448"
              y2={c.y + 4}
              stroke="rgba(125, 211, 252, 0.5)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </g>
        ))}
        <text x="479" y="132" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="'JetBrains Mono', monospace">candidates</text>

        {/* "compare" caption between source and candidates */}
        <text x="404" y="148" textAnchor="middle" fill="rgba(125, 211, 252, 0.9)" fontSize="11" fontStyle="italic" fontFamily="'DM Sans', sans-serif">compare</text>

        {/* Down arrow into rerank */}
        <line x1="404" y1="156" x2="404" y2="178" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />

        {/* Rerank funnel (larger, clearly a triangle/funnel) */}
        <polygon
          points="338,186 470,186 404,250"
          fill="rgba(125, 211, 252, 0.08)"
          stroke="rgba(125, 211, 252, 0.7)"
          strokeWidth="1.4"
        />
        <text x="404" y="210" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600" fontFamily="'DM Sans', sans-serif">rerank</text>
        <text x="404" y="226" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="'JetBrains Mono', monospace">top-k · cross-encoder</text>

        {/* Down arrow into debate gauge */}
        <line x1="404" y1="254" x2="404" y2="272" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />

        {/* Debate gauge — repositioned, narrower vertical footprint */}
        <g transform="translate(404, 314)">
          <path d="M -38 0 A 38 38 0 0 1 38 0" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="5" />
          <path d="M -38 0 A 38 38 0 0 1 -10 -36" fill="none" stroke="#ef4444" strokeWidth="5" opacity="0.75" />
          <path d="M -10 -36 A 38 38 0 0 1 22 -31" fill="none" stroke="#f59e0b" strokeWidth="5" opacity="0.75" />
          <path d="M 22 -31 A 38 38 0 0 1 38 0" fill="none" stroke="#10b981" strokeWidth="5" opacity="0.75" />
          <line x1="0" y1="0" x2="20" y2="-29" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.75)" />
          <text x="0" y="14" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.06em">debate ✓ / ✗</text>
        </g>

        {/* Down arrow into chunk_links */}
        <line x1="404" y1="334" x2="404" y2="350" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />

        {/* Small cylinder — chunk_links */}
        <g>
          <ellipse cx="404" cy="358" rx="44" ry="8" fill="rgba(125, 211, 252, 0.25)" stroke="rgba(125, 211, 252, 0.55)" strokeWidth="1.2" />
          <path d="M 360 358 L 360 386 A 44 8 0 0 0 448 386 L 448 358" fill="rgba(255,255,255,0.04)" stroke="rgba(125, 211, 252, 0.55)" strokeWidth="1.2" />
          <text x="404" y="378" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600" fontFamily="'DM Sans', sans-serif">chunk_links</text>
        </g>

        {/* Cache hint */}
        <text x="404" y="402" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontStyle="italic">
          if debate cached → skip link phase
        </text>

        {/* Cross-column arrow: BUILD corpus → LINK source/candidates */}
        <line x1="195" y1="298" x2="275" y2="120" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#ss-arrow-faint)" />

        {/* Cross-column arrow: LINK chunk_links → RUN agents */}
        <line x1="450" y1="372" x2="555" y2="220" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#ss-arrow-faint)" />

        {/* =================== RUN COLUMN =================== */}

        {/* Three parallel skill lanes */}
        {[
          { y: 72, color: '#a78bfa', label: 'Skill A · Trace', report: '#a78bfa' },
          { y: 172, color: '#f87171', label: 'Skill B · ICD', report: '#f87171' },
          { y: 272, color: '#2dd4bf', label: 'Skill C · Test', report: '#2dd4bf' },
        ].map((lane) => (
          <g key={lane.label}>
            {/* Agent icon: circle head + body */}
            <circle cx={585} cy={lane.y + 14} r={10} fill={lane.color} opacity="0.92" />
            <path d={`M 565 ${lane.y + 50} L 585 ${lane.y + 24} L 605 ${lane.y + 50} Z`} fill={lane.color} opacity="0.92" />
            <polygon points={`${581},${lane.y + 12} ${591},${lane.y + 14} ${581},${lane.y + 16}`} fill="rgba(255,255,255,0.7)" />

            {/* Skill label */}
            <text x={625} y={lane.y + 16} fill="rgba(255,255,255,0.92)" fontSize="12" fontWeight="600" fontFamily="'DM Sans', sans-serif">{lane.label}</text>

            {/* RID register clipboard */}
            <g>
              <rect x={625} y={lane.y + 26} width={92} height={48} rx={2} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
              <rect x={650} y={lane.y + 22} width={42} height={6} rx={1} fill="rgba(255,255,255,0.35)" />
              {[0, 1, 2, 3].map((row) => {
                const sev = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'][row]
                return (
                  <g key={`row-${row}`}>
                    <circle cx={632} cy={lane.y + 38 + row * 9} r={2.2} fill={sev} />
                    <line x1={638} y1={lane.y + 38 + row * 9} x2={710} y2={lane.y + 38 + row * 9} stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                  </g>
                )
              })}
              <text x={671} y={lane.y + 88} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.04em">RID register</text>
            </g>

            {/* Severity stripes between agent and register */}
            <rect x={730} y={lane.y + 26} width={4} height={48} fill="#ef4444" opacity="0.7" />
            <rect x={736} y={lane.y + 26} width={4} height={48} fill="#f59e0b" opacity="0.7" />
            <rect x={742} y={lane.y + 26} width={4} height={48} fill="#10b981" opacity="0.7" />
          </g>
        ))}

        {/* ============== TAGLINE ============== */}
        <text x="410" y="442" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontStyle="italic" fontFamily="'DM Sans', sans-serif" letterSpacing="0.04em">
          Build once · Link once · Run many — same chunks + same links power every review skill
        </text>
      </svg>
    </div>
  )
}
