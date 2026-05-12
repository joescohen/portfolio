/**
 * CEI — home page strip visual.
 *
 * The infrastructure, abstracted: three pipeline columns that turn messy
 * evidence into typed traces, into recurrence-tested control candidates,
 * into gated durable controls — with closure feeding back into the next
 * round of observation.
 *
 * Light-on-dark theme. Mirrors the SEPAL "BUILD · LINK · RUN" rhythm:
 * generic shapes and schema-level labels, no session-specific values.
 */

const SOURCE_COLORS = ['#7dd3fc', '#34d399', '#fbbf24', '#a78bfa', '#f87171']

export function CEILoop() {
  return (
    <div className="w-full h-full flex items-center justify-center px-4 py-6">
      <svg
        viewBox="0 0 820 420"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="CEI infrastructure. Three pipeline columns: observe (heterogeneous evidence sources are normalized into typed interaction traces), detect (a process model and recurrence detector classify deviations into control candidates), control (a promotion gate emits durable control surfaces — rules, gates, triggers, cases, adapters — and watches their verification closure). A feedback arc returns applied controls to the next round of observation."
      >
        <defs>
          <marker id="cei-arrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0, 9 3.5, 0 7" fill="rgba(255,255,255,0.55)" />
          </marker>
          <marker id="cei-warm" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0, 9 3.5, 0 7" fill="rgba(196, 165, 118, 0.75)" />
          </marker>
          <linearGradient id="cei-cyl-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(125, 211, 252, 0.4)" />
            <stop offset="100%" stopColor="rgba(125, 211, 252, 0.15)" />
          </linearGradient>
        </defs>

        {/* Column backgrounds */}
        <rect x="6"   y="14" width="252" height="370" rx="6" fill="rgba(125, 211, 252, 0.04)" stroke="rgba(125, 211, 252, 0.18)" />
        <rect x="278" y="14" width="252" height="370" rx="6" fill="rgba(56, 189, 248, 0.05)"  stroke="rgba(56, 189, 248, 0.22)" />
        <rect x="550" y="14" width="262" height="370" rx="6" fill="rgba(196, 181, 253, 0.04)" stroke="rgba(196, 181, 253, 0.20)" />

        {/* Column headers */}
        <text x="132" y="38" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.18em">OBSERVE</text>
        <text x="404" y="38" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.18em">DETECT</text>
        <text x="681" y="38" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.18em">CONTROL + VERIFY</text>

        {/* =================== OBSERVE COLUMN =================== */}

        {/* 5 generic source icons */}
        {SOURCE_COLORS.map((c, i) => {
          const x = 32 + i * 40
          return (
            <g key={`src-${i}`}>
              <rect x={x} y={62} width={28} height={38} rx={2} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
              <rect x={x} y={62} width={28} height={5} rx={2} fill={c} />
              <line x1={x + 5} y1={75} x2={x + 23} y2={75} stroke="rgba(255,255,255,0.25)" />
              <line x1={x + 5} y1={81} x2={x + 23} y2={81} stroke="rgba(255,255,255,0.25)" />
              <line x1={x + 5} y1={87} x2={x + 19} y2={87} stroke="rgba(255,255,255,0.25)" />
              <line x1={x + 5} y1={93} x2={x + 21} y2={93} stroke="rgba(255,255,255,0.25)" />
            </g>
          )
        })}
        <text x="132" y="120" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9.5" fontFamily="'JetBrains Mono', monospace">heterogeneous evidence sources</text>

        {/* Arrow into normalizer */}
        <line x1="132" y1="130" x2="132" y2="152" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" markerEnd="url(#cei-arrow)" />

        {/* Normalizer pipeline */}
        <g>
          <rect x="42" y="160" width="180" height="50" rx="4" fill="rgba(125, 211, 252, 0.08)" stroke="rgba(125, 211, 252, 0.55)" strokeWidth="1.2" />
          <text x="132" y="180" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600" fontFamily="'DM Sans', sans-serif">trace normalizer</text>
          <text x="132" y="197" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9.5" fontFamily="'JetBrains Mono', monospace">schema · enrich · classify</text>
        </g>

        {/* Arrow into trace cylinder */}
        <line x1="132" y1="216" x2="132" y2="234" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" markerEnd="url(#cei-arrow)" />

        {/* Trace store cylinder */}
        <g>
          <ellipse cx="132" cy="244" rx="60" ry="11" fill="url(#cei-cyl-top)" stroke="rgba(125, 211, 252, 0.55)" strokeWidth="1.2" />
          <path d="M 72 244 L 72 296 A 60 11 0 0 0 192 296 L 192 244" fill="rgba(255,255,255,0.04)" stroke="rgba(125, 211, 252, 0.55)" strokeWidth="1.2" />
          <ellipse cx="132" cy="244" rx="60" ry="11" fill="rgba(125, 211, 252, 0.18)" stroke="rgba(125, 211, 252, 0.55)" strokeWidth="1.2" />
          <text x="132" y="250" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600" fontFamily="'DM Sans', sans-serif">interaction_trace</text>
          <text x="132" y="266" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'JetBrains Mono', monospace">typed · append-only</text>
          <text x="132" y="280" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'JetBrains Mono', monospace">+ mismatch_category</text>
        </g>

        <text x="132" y="332" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9.5" fontStyle="italic" fontFamily="'DM Sans', sans-serif">many sources → one schema</text>

        {/* Cross-column arrow OBSERVE → DETECT */}
        <line x1="195" y1="270" x2="280" y2="170" stroke="rgba(125, 211, 252, 0.45)" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#cei-arrow)" />

        {/* =================== DETECT COLUMN =================== */}

        {/* Process model card */}
        <g>
          <rect x="298" y="64" width="212" height="62" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1" />
          <text x="312" y="80" fill="rgba(56, 189, 248, 0.85)" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.06em">PROCESS MODEL</text>
          {[0, 1, 2].map((i) => (
            <g key={`rule-${i}`}>
              <rect x={312} y={90 + i * 10} width={4} height={4} rx={1} fill="#7dd3fc" opacity="0.8" />
              <line x1={322} y1={92 + i * 10} x2={494 - (i % 2) * 28} y2={92 + i * 10} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* Compare/conformance block (diff shape) */}
        <g>
          <rect x="298" y="142" width="212" height="58" rx="4" fill="rgba(56, 189, 248, 0.08)" stroke="rgba(56, 189, 248, 0.55)" strokeWidth="1.2" />
          <text x="404" y="160" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600" fontFamily="'DM Sans', sans-serif">conformance + recurrence</text>
          {/* Comparison arrows */}
          <g transform="translate(348, 178)">
            <text x="0" y="0" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'JetBrains Mono', monospace">expected</text>
            <line x1="56" y1="-3" x2="78" y2="-3" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <text x="50" y="14" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'JetBrains Mono', monospace">actual</text>
            <text x="92" y="6" fill="#fbbf24" fontSize="11" fontFamily="'JetBrains Mono', monospace">Δ</text>
            <text x="106" y="6" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'JetBrains Mono', monospace">+ count(window)</text>
          </g>
        </g>

        {/* Arrow into candidate */}
        <line x1="404" y1="206" x2="404" y2="224" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" markerEnd="url(#cei-arrow)" />

        {/* Control candidate output card */}
        <g>
          <rect x="298" y="232" width="212" height="72" rx="4" fill="rgba(56, 189, 248, 0.08)" stroke="rgba(56, 189, 248, 0.55)" strokeWidth="1.2" />
          <text x="404" y="252" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600" fontFamily="'DM Sans', sans-serif">control_candidate</text>
          {[
            'category · scope · abstraction',
            'evidence_refs · recurrence',
            'proposed_surface · verifier',
          ].map((line, i) => (
            <text key={line} x="404" y={268 + i * 11} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'JetBrains Mono', monospace">{line}</text>
          ))}
        </g>

        <text x="404" y="332" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9.5" fontStyle="italic" fontFamily="'DM Sans', sans-serif">deviation · counted · classified</text>

        {/* Cross-column arrow DETECT → CONTROL */}
        <line x1="518" y1="266" x2="555" y2="170" stroke="rgba(125, 211, 252, 0.45)" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#cei-arrow)" />

        {/* =================== CONTROL + VERIFY COLUMN =================== */}

        {/* Promotion gate */}
        <g>
          <rect x="566" y="64" width="232" height="62" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(196, 181, 253, 0.5)" strokeWidth="1" />
          <text x="580" y="80" fill="rgba(196, 181, 253, 0.85)" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.06em">PROMOTION GATE</text>
          {/* 3 abstract gate slots */}
          {['recurrence', 'abstraction', 'verifier'].map((label, i) => {
            const x = 580 + i * 72
            return (
              <g key={label}>
                <rect x={x} y={94} width={64} height={22} rx={3} fill="rgba(196, 181, 253, 0.08)" stroke="rgba(196, 181, 253, 0.45)" strokeWidth="1" />
                <text x={x + 32} y={108} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9" fontFamily="'JetBrains Mono', monospace">{label}</text>
              </g>
            )
          })}
        </g>

        {/* Arrow */}
        <line x1="681" y1="132" x2="681" y2="148" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" markerEnd="url(#cei-arrow)" />

        {/* Control surfaces */}
        <g>
          <text x="568" y="166" fill="rgba(196, 181, 253, 0.85)" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.06em">CONTROL SURFACES</text>
          {[
            { lbl: 'rule', acc: '#7dd3fc' },
            { lbl: 'gate', acc: '#34d399' },
            { lbl: 'trigger', acc: '#fbbf24' },
            { lbl: 'case', acc: '#a78bfa' },
            { lbl: 'adapter', acc: '#f87171' },
          ].map((c, i) => {
            const x = 568 + i * 47
            return (
              <g key={c.lbl}>
                <rect x={x} y={176} width={42} height={28} rx={3} fill="rgba(255,255,255,0.04)" stroke={c.acc} strokeOpacity="0.6" strokeWidth="1" />
                <rect x={x} y={176} width={4} height={28} rx={1} fill={c.acc} />
                <text x={x + 24} y={194} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9.5" fontFamily="'DM Sans', sans-serif">{c.lbl}</text>
              </g>
            )
          })}
        </g>

        {/* Arrow */}
        <line x1="681" y1="216" x2="681" y2="232" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" markerEnd="url(#cei-arrow)" />

        {/* Verification closure state machine */}
        <g>
          <rect x="566" y="240" width="232" height="64" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <text x="580" y="258" fill="rgba(255,255,255,0.7)" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.06em">VERIFICATION CLOSURE</text>
          {/* 3 state nodes connected by arrows */}
          {[
            { x: 600, label: 'pending',    color: 'rgba(255,255,255,0.45)' },
            { x: 681, label: 'held / fail', color: '#34d399' },
            { x: 762, label: 'super.',     color: '#a78bfa' },
          ].map((s, i) => (
            <g key={s.label}>
              <circle cx={s.x} cy={284} r={5} fill={s.color === 'rgba(255,255,255,0.45)' ? 'rgba(255,255,255,0.15)' : `${s.color}33`} stroke={s.color} strokeWidth="1.2" />
              <text x={s.x} y={300} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="'JetBrains Mono', monospace">{s.label}</text>
              {i < 2 && (
                <line x1={s.x + 7} y1={284} x2={s.x + 70} y2={284} stroke="rgba(255,255,255,0.3)" strokeWidth="1" markerEnd="url(#cei-arrow)" />
              )}
            </g>
          ))}
        </g>

        <text x="681" y="332" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9.5" fontStyle="italic" fontFamily="'DM Sans', sans-serif">gated · durable · watched</text>

        {/* ============ FEEDBACK ARC ============ */}
        <path
          d="M 566 372 Q 412 410 258 372"
          fill="none"
          stroke="rgba(196, 165, 118, 0.55)"
          strokeWidth="1.4"
          strokeDasharray="5 4"
          markerEnd="url(#cei-warm)"
        />
        <text
          x="412"
          y="408"
          textAnchor="middle"
          fill="rgba(196, 165, 118, 0.95)"
          fontSize="11"
          fontStyle="italic"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.05em"
        >
          ↺ applied controls shape the next round of observation
        </text>
      </svg>
    </div>
  )
}
