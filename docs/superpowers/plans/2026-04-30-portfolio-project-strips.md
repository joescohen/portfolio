# Portfolio Project Strips Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 2-column card grid on the Home page with full-bleed horizontal project strips, each featuring a domain-specific visual artifact, and revert JetBrains Mono from home page labels.

**Architecture:** Four new visual components (`SysMLDiagram`, `HelicopterProfile`, `VoyageGlobe`, `PipelineFlow`) render domain-specific SVG/canvas visuals. `Home.tsx` maps project data to alternating full-width strips that pair a text panel with a visual panel. The `VoyageGlobe` is extracted from `VoyageProject.tsx` as a shared component. Directional scroll-reveal CSS variants handle the zigzag entrance animation.

**Tech Stack:** React 18, TypeScript, Tailwind CSS 3, React Three Fiber (globe), Vitest + Testing Library (tests)

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/index.css` | Modify | Add directional reveal variants, rotor keyframe |
| `src/components/visuals/SysMLDiagram.tsx` | Create | ANGARS block diagram SVG |
| `src/components/visuals/HelicopterProfile.tsx` | Create | Garra helicopter SVG with rotor animation |
| `src/components/visuals/VoyageGlobe.tsx` | Create | Extracted 3D globe from VoyageProject |
| `src/components/visuals/PipelineFlow.tsx` | Create | System Validator pipeline SVG |
| `src/pages/Home.tsx` | Modify | Strip layout, revert font-mono, wire visuals |
| `src/pages/VoyageProject.tsx` | Modify | Import shared VoyageGlobe instead of inline |
| `src/components/visuals/__tests__/SysMLDiagram.test.tsx` | Create | Render test |
| `src/components/visuals/__tests__/HelicopterProfile.test.tsx` | Create | Render test |
| `src/components/visuals/__tests__/PipelineFlow.test.tsx` | Create | Render test |

---

### Task 1: Add CSS for directional reveals and rotor animation

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add directional reveal variants and rotor keyframe to index.css**

Add the following classes INSIDE `@layer utilities { ... }`, after the existing `.reveal-element.is-visible` rule and BEFORE the closing `}` of `@layer utilities`:

```css
  .reveal-from-left {
    opacity: 0;
    transform: translateX(-24px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .reveal-from-right {
    opacity: 0;
    transform: translateX(24px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .reveal-from-left.is-visible,
  .reveal-from-right.is-visible {
    opacity: 1;
    transform: translateX(0);
  }

  .reveal-delay-100 {
    transition-delay: 100ms;
  }
```

Then add this keyframe OUTSIDE and AFTER the `@layer utilities` block (keyframes are global, not utilities):

```css
@keyframes rotor-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

- [ ] **Step 2: Verify CSS parses correctly**

Run: `npx tsc --noEmit && npx vite build 2>&1 | tail -5`
Expected: Build succeeds, no CSS parse errors.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add directional reveal CSS variants and rotor keyframe"
```

---

### Task 2: Create SysMLDiagram visual component

**Files:**
- Create: `src/components/visuals/SysMLDiagram.tsx`
- Create: `src/components/visuals/__tests__/SysMLDiagram.test.tsx`

- [ ] **Step 1: Write the render test**

```tsx
// src/components/visuals/__tests__/SysMLDiagram.test.tsx
import { render, screen } from '@testing-library/react'
import { SysMLDiagram } from '../SysMLDiagram'

describe('SysMLDiagram', () => {
  it('renders the four subsystem blocks', () => {
    render(<SysMLDiagram />)
    expect(screen.getByText('Tanker UAV')).toBeInTheDocument()
    expect(screen.getByText('Boom System')).toBeInTheDocument()
    expect(screen.getByText('Receiver Aircraft')).toBeInTheDocument()
    expect(screen.getByText('Refueling Controller')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/visuals/__tests__/SysMLDiagram.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement SysMLDiagram**

```tsx
// src/components/visuals/SysMLDiagram.tsx

const BLOCKS = [
  { id: 'tanker', label: 'Tanker UAV', x: 40, y: 80 },
  { id: 'boom', label: 'Boom System', x: 240, y: 80 },
  { id: 'receiver', label: 'Receiver Aircraft', x: 440, y: 80 },
  { id: 'controller', label: 'Refueling Controller', x: 240, y: 220 },
]

const CONNECTIONS: [number, number, number, number][] = [
  // from-x, from-y, to-x, to-y (center-to-center, adjusted for block size)
  [180, 105, 240, 105],   // Tanker → Boom
  [380, 105, 440, 105],   // Boom → Receiver
  [305, 130, 305, 220],   // Boom → Controller
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
        {/* Connection arrows */}
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

        {/* Subsystem blocks */}
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
            {/* SysML block stereotype */}
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

        {/* Diagram title */}
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/visuals/__tests__/SysMLDiagram.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/visuals/SysMLDiagram.tsx src/components/visuals/__tests__/SysMLDiagram.test.tsx
git commit -m "feat: add SysMLDiagram visual component for ANGARS"
```

---

### Task 3: Create HelicopterProfile visual component

**Files:**
- Create: `src/components/visuals/HelicopterProfile.tsx`
- Create: `src/components/visuals/__tests__/HelicopterProfile.test.tsx`

- [ ] **Step 1: Write the render test**

```tsx
// src/components/visuals/__tests__/HelicopterProfile.test.tsx
import { render, screen } from '@testing-library/react'
import { HelicopterProfile } from '../HelicopterProfile'

describe('HelicopterProfile', () => {
  it('renders the performance callouts', () => {
    render(<HelicopterProfile />)
    expect(screen.getByText('135 kt')).toBeInTheDocument()
    expect(screen.getByText('50 kg payload')).toBeInTheDocument()
    expect(screen.getByText('1st Place VFS')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/visuals/__tests__/HelicopterProfile.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement HelicopterProfile**

```tsx
// src/components/visuals/HelicopterProfile.tsx

const CALLOUTS = [
  { label: '135 kt', x: '72%', y: '28%', align: 'left' as const },
  { label: '50 kg payload', x: '58%', y: '72%', align: 'left' as const },
  { label: '1st Place VFS', x: '18%', y: '22%', align: 'right' as const },
]

export function HelicopterProfile() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-navy-900 relative overflow-hidden">
      <svg
        viewBox="0 0 600 360"
        className="w-full max-w-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rotor disc — animated */}
        <g style={{ transformOrigin: '260px 100px', animation: 'rotor-spin 8s linear infinite' }}>
          <ellipse cx={260} cy={100} rx={180} ry={8} stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="6 4" />
        </g>

        {/* Rotor mast */}
        <line x1={260} y1={100} x2={260} y2={145} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />

        {/* Fuselage — simplified compound helicopter profile */}
        <path
          d="M 140 180 Q 160 145 260 145 Q 360 145 400 165 L 420 170 L 440 165 L 460 170 Q 470 175 460 180 L 400 185 Q 360 200 260 200 Q 180 200 150 195 Z"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.03)"
        />

        {/* Cockpit windscreen */}
        <path
          d="M 155 175 Q 170 155 200 152 L 200 175 Z"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
          fill="rgba(255,255,255,0.05)"
        />

        {/* Tail boom */}
        <path
          d="M 400 175 L 510 155 L 520 140 L 530 155 L 510 160 L 400 180"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.02)"
        />

        {/* Tail rotor */}
        <circle cx={525} cy={148} r={18} stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4 3" />

        {/* Landing skids */}
        <line x1={200} y1={200} x2={200} y2={225} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <line x1={330} y1={200} x2={330} y2={225} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <line x1={180} y1={225} x2={350} y2={225} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

        {/* Pusher prop (thrust compounding) */}
        <ellipse cx={535} cy={170} rx={4} ry={22} stroke="rgba(249,115,22,0.5)" strokeWidth="1" strokeDasharray="3 2" />

        {/* Dimension line bottom */}
        <line x1={150} y1={260} x2={530} y2={260} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <line x1={150} y1={255} x2={150} y2={265} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1={530} y1={255} x2={530} y2={265} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <text x={340} y={275} textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="'DM Sans', sans-serif">
          GARRA — COMPOUND HELICOPTER
        </text>
      </svg>

      {/* Floating data callouts */}
      {CALLOUTS.map((c) => (
        <div
          key={c.label}
          className="absolute flex items-center gap-2"
          style={{ left: c.x, top: c.y }}
        >
          {c.align === 'right' && <span className="w-8 h-px bg-white/20" />}
          <span className="text-white text-xs font-semibold tracking-wide whitespace-nowrap bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm">
            {c.label}
          </span>
          {c.align === 'left' && <span className="w-8 h-px bg-white/20" />}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/visuals/__tests__/HelicopterProfile.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/visuals/HelicopterProfile.tsx src/components/visuals/__tests__/HelicopterProfile.test.tsx
git commit -m "feat: add HelicopterProfile visual component for Garra"
```

---

### Task 4: Extract VoyageGlobe shared component

**Files:**
- Create: `src/components/visuals/VoyageGlobe.tsx`
- Modify: `src/pages/VoyageProject.tsx`

Note: React Three Fiber uses WebGL which does not render in jsdom. No unit test — verified by build and existing VoyageProject page.

- [ ] **Step 1: Create shared VoyageGlobe component**

```tsx
// src/components/visuals/VoyageGlobe.tsx
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'

function latLngToVec3(lat: number, lng: number, r: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ]
}

const PINS = [
  { lat: 40.71, lng: -74.01 },
  { lat: 51.51, lng: -0.13 },
  { lat: 35.68, lng: 139.65 },
  { lat: 48.86, lng: 2.35 },
  { lat: -33.87, lng: 151.21 },
  { lat: 25.20, lng: 55.27 },
  { lat: 19.43, lng: -99.13 },
  { lat: 41.90, lng: 12.50 },
  { lat: -1.29, lng: 36.82 },
  { lat: 1.35, lng: 103.82 },
]

function GlobeScene() {
  const earthTexture = useTexture('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg')
  return (
    <group>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.06, 32, 32]} />
        <meshStandardMaterial color="#60c8f0" transparent opacity={0.06} />
      </mesh>
      {PINS.map((p, i) => (
        <mesh key={i} position={latLngToVec3(p.lat, p.lng, 2.12)}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  )
}

interface VoyageGlobeProps {
  className?: string
}

export function VoyageGlobe({ className = 'w-full h-full' }: VoyageGlobeProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={2.2} color="#ffffff" />
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.7}
          minPolarAngle={Math.PI * 0.2}
          maxPolarAngle={Math.PI * 0.8}
        />
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 2: Update VoyageProject.tsx to use shared component**

Replace the inline `VoyageGlobe` function and its helpers (`latLngToVec3`, `PINS`) in `src/pages/VoyageProject.tsx`. Remove lines 1-55 worth of inline globe code and replace with an import.

Change the import block at the top to:

```tsx
import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { StatBadge } from '../components/StatBadge'
import { SectionLabel } from '../components/SectionLabel'
import { VoyageGlobe } from '../components/visuals/VoyageGlobe'
```

Remove the `Suspense` import (no longer needed locally), remove `Canvas`, `OrbitControls`, `useTexture` imports, remove the `latLngToVec3` function, the `PINS` array, and the `VoyageGlobe` function definition (lines 9-55).

Replace the globe usage in the JSX (the `<Canvas>` block inside the right column):

```tsx
<VoyageGlobe className="w-full h-72 lg:h-[400px]" />
```

This replaces the entire `<div className="w-full h-72 lg:h-[400px]">` through its closing `</div>` that contained the `<Canvas>` element.

- [ ] **Step 3: Type-check and verify build**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/visuals/VoyageGlobe.tsx src/pages/VoyageProject.tsx
git commit -m "refactor: extract VoyageGlobe into shared visual component"
```

---

### Task 5: Create PipelineFlow visual component

**Files:**
- Create: `src/components/visuals/PipelineFlow.tsx`
- Create: `src/components/visuals/__tests__/PipelineFlow.test.tsx`

- [ ] **Step 1: Write the render test**

```tsx
// src/components/visuals/__tests__/PipelineFlow.test.tsx
import { render, screen } from '@testing-library/react'
import { PipelineFlow } from '../PipelineFlow'

describe('PipelineFlow', () => {
  it('renders all five pipeline stages', () => {
    render(<PipelineFlow />)
    expect(screen.getByText('Conductor')).toBeInTheDocument()
    expect(screen.getByText('Spec Agent')).toBeInTheDocument()
    expect(screen.getByText('Matrix Agent')).toBeInTheDocument()
    expect(screen.getByText(/Executor/)).toBeInTheDocument()
    expect(screen.getByText('Reporter')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/visuals/__tests__/PipelineFlow.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement PipelineFlow**

```tsx
// src/components/visuals/PipelineFlow.tsx

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
              {/* Node circle */}
              <circle
                cx={x}
                cy={y}
                r={28}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                fill="rgba(255,255,255,0.04)"
              />
              {/* Stage number */}
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
              {/* Label below node */}
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

              {/* Connection arrow to next node */}
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

        {/* Fan-out from Matrix Agent (stage 3) to Executor (stage 4) */}
        {/* Three parallel lines showing parallelism */}
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/visuals/__tests__/PipelineFlow.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/visuals/PipelineFlow.tsx src/components/visuals/__tests__/PipelineFlow.test.tsx
git commit -m "feat: add PipelineFlow visual component for System Validator"
```

---

### Task 6: Rewrite Home.tsx with strip layout

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Rewrite Home.tsx**

Replace the entire file content of `src/pages/Home.tsx` with:

```tsx
import { useState, useEffect, useRef, Suspense, lazy, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { LetterboxdFeed } from '../components/LetterboxdFeed'
import { SysMLDiagram } from '../components/visuals/SysMLDiagram'
import { HelicopterProfile } from '../components/visuals/HelicopterProfile'
import { PipelineFlow } from '../components/visuals/PipelineFlow'

const VoyageGlobe = lazy(() =>
  import('../components/visuals/VoyageGlobe').then((m) => ({ default: m.VoyageGlobe })),
)

interface Project {
  id: string
  href: string
  title: string
  category: string
  description: string
  tags: string[]
  Visual: ComponentType
}

const projects: Project[] = [
  {
    id: 'angars',
    href: '/projects/angars',
    title: 'ANGARS',
    category: 'Systems Engineering',
    description: 'Autonomous aerial refueling — JHU MBSE Capstone',
    tags: ['MBSE', 'SysML', 'Cameo', 'Systems Engineering'],
    Visual: SysMLDiagram,
  },
  {
    id: 'garra',
    href: '/projects/garra',
    title: 'Garra',
    category: 'Aerospace Design',
    description: '1st place VFS SDC — autonomous VTOL helicopter design',
    tags: ['CATIA', 'Helicopter Design', 'VFS', 'Altair'],
    Visual: HelicopterProfile,
  },
  {
    id: 'voyage',
    href: '/projects/voyage',
    title: 'Voyage',
    category: 'Web Development',
    description: 'AI-powered travel planner — Full-stack Next.js',
    tags: ['Next.js', 'React', 'Claude AI', 'SQLite'],
    Visual: () => (
      <div className="w-full h-full bg-navy-900">
        <Suspense fallback={<div className="w-full h-full bg-navy-900" />}>
          <VoyageGlobe className="w-full h-full" />
        </Suspense>
      </div>
    ),
  },
  {
    id: 'system-validator',
    href: '/projects/system-validator',
    title: 'System Validator',
    category: 'AI Engineering',
    description: 'Multi-agent QA pipeline — Claude Code skill',
    tags: ['Claude Code', 'Multi-Agent', 'Systems Engineering', 'TypeScript'],
    Visual: PipelineFlow,
  },
]

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'films', label: 'Films' },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>(
      '.reveal-element, .reveal-from-left, .reveal-from-right',
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
  return ref
}

function ProjectStrip({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 1
  const num = `#${String(index + 1).padStart(2, '0')}`
  const bgClass = isEven ? 'bg-zinc-50' : 'bg-white'
  const textReveal = isEven ? 'reveal-from-right' : 'reveal-from-left'
  const visualReveal = isEven ? 'reveal-from-left reveal-delay-100' : 'reveal-from-right reveal-delay-100'

  const textPanel = (
    <div
      className={`${textReveal} flex flex-col justify-center px-6 lg:px-12 xl:px-16 py-10 lg:py-0`}
    >
      <span className="text-zinc-400 text-xs font-semibold mb-2">{num}</span>
      <span className="text-orange-500 text-xs font-semibold uppercase tracking-[0.12em] mb-4">
        {project.category}
      </span>
      <h3
        className="text-4xl lg:text-5xl text-navy mb-3 leading-[1.05] tracking-tight"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {project.title}
      </h3>
      <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-md">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        to={project.href}
        className="group/link text-sm text-zinc-400 hover:text-orange-500 transition-colors inline-flex items-center gap-1"
      >
        View project
        <span className="inline-block transition-transform group-hover/link:translate-x-1 ease-spring">
          &rarr;
        </span>
      </Link>
    </div>
  )

  const visualPanel = (
    <div className={`${visualReveal} min-h-[200px] lg:min-h-0`}>
      <project.Visual />
    </div>
  )

  return (
    <div className={`${bgClass} border-b border-zinc-100`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
        {isEven ? (
          <>
            <div className="lg:col-span-7 order-1 lg:order-1">{visualPanel}</div>
            <div className="lg:col-span-5 order-2 lg:order-2">{textPanel}</div>
          </>
        ) : (
          <>
            <div className="lg:col-span-5 order-2 lg:order-1">{textPanel}</div>
            <div className="lg:col-span-7 order-1 lg:order-2">{visualPanel}</div>
          </>
        )}
      </div>
    </div>
  )
}

export function Home() {
  const [activeTab, setActiveTab] = useState('projects')
  const contentRef = useReveal()

  return (
    <div className="min-h-screen bg-zinc-50">
      <Nav />

      {/* Hero */}
      <div className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pt-16 pb-0">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.12em] mb-4">
            Portfolio
          </p>
          <h1
            className="text-5xl sm:text-6xl text-white leading-[0.95] tracking-tight mb-3"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Joe Cohen
          </h1>
          <p className="text-white/70 text-base mb-1">
            Systems Engineer · Northrop Grumman
          </p>
          <p className="text-white/40 text-xs tracking-wide mb-8">
            MS Systems Engineering · JHU &nbsp;·&nbsp; BS Aerospace Engineering · UMD
          </p>

          {/* Tabs flush at base of hero */}
          <div className="flex gap-0 -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-white border-orange-500'
                    : 'text-white/40 border-transparent hover:text-white/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef}>
        {activeTab === 'projects' ? (
          <div>
            {projects.map((p, i) => (
              <ProjectStrip key={p.id} project={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
            <LetterboxdFeed />
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Build**

Run: `npx vite build 2>&1 | tail -8`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: replace card grid with full-bleed project strips layout"
```

---

### Task 7: Run full test suite and final build

**Files:** None (verification only)

- [ ] **Step 1: Run all tests**

Run: `npx vitest run`
Expected: All tests pass.

- [ ] **Step 2: Full production build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Deploy**

Run: `railway up --detach`
Expected: Upload and build triggers successfully.
