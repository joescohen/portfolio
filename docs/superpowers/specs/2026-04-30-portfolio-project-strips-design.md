# Portfolio Project Strips Redesign

**Date:** 2026-04-30
**Status:** Approved
**Scope:** Home page projects section — replace card grid with full-bleed horizontal strip layout

## Context

The portfolio at joeco.io showcases 4 projects for a senior systems engineer (Northrop Grumman) with cross-domain range: aerospace MBSE, helicopter design, full-stack web, and AI multi-agent systems. The audience is both defense/aerospace hiring managers and tech companies. The current 2-column card grid with color-block thumbnails feels generic and doesn't communicate the depth or character of each project.

## Design Goals

- Each project communicates its domain through a visual artifact, not decoration
- Layout feels editorial and structured (defense-friendly) while being visually alive (tech-friendly)
- Motion only where it serves the content's story
- Scales linearly — adding a new project requires only a data entry
- Home page uses only DM Serif Display + DM Sans (no JetBrains Mono)

## Strip Layout

### Structure

The projects section is a vertical stack of full-width horizontal strips. Each strip is approximately 400-440px tall on desktop.

Two-column layout per strip (~45% text, ~55% visual):
- **Odd-indexed** projects (index 0, 2): text left, visual right
- **Even-indexed** projects (index 1, 3): visual left, text right

The alternating layout creates a zigzag reading pattern down the page.

### Text Panel Anatomy

Top to bottom within the text panel:

1. **Project number** — `#01`, small, muted zinc-400, DM Sans 600 weight
2. **Category** — `SYSTEMS ENGINEERING`, orange-500, DM Sans 600 weight, uppercase, 0.12em tracking, text-xs
3. **Title** — DM Serif Display, text-5xl (48px / 3rem), navy color
4. **Description** — DM Sans, text-sm, zinc-500, 2 lines max, leading-relaxed
5. **Tags** — minimal pills, borderless, bg-zinc-100, text-zinc-500, text-xs, DM Sans
6. **Link** — `View project ->`, text-sm, zinc-400 default, orange-500 on hover

### Visual Panel

Each project gets a domain-specific visual rendered on a dark navy background that fills the full height of the strip and bleeds to the edge.

### Strip Backgrounds

- Alternate between `white` (odd) and `zinc-50` (even) to create visual rhythm
- A 1px horizontal rule in `zinc-100` between strips

### Mobile

Stacks vertically: visual panel on top (full width, ~200px height), text panel beneath. No alternating flip on mobile — visual always comes first for impact.

## Domain-Specific Visuals

### ANGARS — SysML Block Diagram Fragment

A styled SVG/HTML block diagram showing 3-4 connected subsystems:
- Tanker UAV -> Boom System -> Receiver Aircraft -> Refueling Controller
- Clean lines, rounded-rect blocks, navy/white stroke on dark background
- Orange accent on connection arrows
- Completely static — schematics don't animate
- Signals MBSE fluency to any defense engineer

### Garra — Helicopter Profile with Performance Data

A side-profile SVG silhouette of a compound helicopter (thrust-compounding design):
- White stroke on dark background
- 2-3 floating data callouts positioned around the airframe: `135 kt`, `50 kg payload`, `1st Place VFS`
- Styled like engineering drawing annotations
- Rotor disc has a slow continuous rotation (~8 seconds per revolution)
- Motion is intentional: Garra is a helicopter — the rotor spins

### Voyage — 3D Globe (Reused)

Lift the existing React Three Fiber globe component from `VoyageProject.tsx`:
- Earth sphere with texture, orange destination pins, auto-rotation at 0.7 speed
- Already has intentional motion serving the content
- Extract as a shared component if not already reusable

### System Validator — Agent Pipeline Flow

A horizontal flow diagram:
- 5 numbered nodes: Conductor -> Spec Agent -> Matrix Agent -> Executor xN -> Reporter
- Connected by arrows with gate markers between stages
- Executor xN fans out into 3 parallel lines and reconverges (shows parallelism)
- Clean white lines/nodes on dark background, orange accent on gate markers
- Completely static — it's architecture documentation

## Motion

### Strip Entrance

Each strip uses the existing `reveal-element` CSS pattern:
- Fade up + slide in from the text side (16px translate, 0.7s, ease-out)
- Left-text strips slide from left, right-text strips slide from right
- Text panel appears ~100ms before visual panel (staggered)

### Persistent Visual Motion

Only where content-justified:
- **Garra**: rotor rotation, 8s per revolution, CSS animation
- **Voyage**: existing globe auto-rotate at 0.7 speed
- **ANGARS**: static
- **System Validator**: static

### Hover

- `View project ->` link shifts right 4px with spring ease
- No other hover effects on the strips

### Explicitly Excluded

No parallax, no scroll-jacking, no cursor-following effects.

## Typography

### Home Page Only

- **Headings**: DM Serif Display (project titles, page title)
- **Body/UI**: DM Sans (descriptions, labels, tags, category eyebrows)
- **No JetBrains Mono on the home page** — revert current mono font usage from eyebrow labels and subtitle

JetBrains Mono remains in the Tailwind config and is available on project detail pages where monospaced text has semantic context (code snippets, pipeline labels, technical specs).

### Eyebrow Labels

Category labels and the "Portfolio" eyebrow use DM Sans at:
- Font weight: 600
- Letter spacing: 0.12em
- Text transform: uppercase
- Size: text-xs

This replaces the current `font-mono` class on these elements.

## Data Model

Each project entry in the array adds a `visual` field identifying which visual component to render:

```typescript
const projects = [
  {
    id: 'angars',
    href: '/projects/angars',
    title: 'ANGARS',
    category: 'Systems Engineering',
    description: 'Autonomous aerial refueling — JHU MBSE Capstone',
    tags: ['MBSE', 'SysML', 'Cameo', 'Systems Engineering'],
    visual: 'sysml-diagram',
  },
  // ...
]
```

Adding a new project requires:
1. Adding an entry to this array
2. Creating a visual component (or reusing a generic one)
3. No layout decisions — alternating pattern handles positioning automatically

## Files Changed

- `src/pages/Home.tsx` — replace card grid with strip layout, revert font-mono usage
- `src/index.css` — add strip-specific reveal variants if needed (slide-from-left, slide-from-right)
- `src/components/visuals/SysMLDiagram.tsx` — new, ANGARS visual
- `src/components/visuals/HelicopterProfile.tsx` — new, Garra visual with rotor animation
- `src/components/visuals/VoyageGlobe.tsx` — extracted/shared from VoyageProject.tsx
- `src/components/visuals/PipelineFlow.tsx` — new, System Validator visual

## Scalability

The strip layout scales linearly:
- 1-2 projects: works, just shorter page
- 4 projects: current state, fills the page well
- 8+ projects: still works — vertical scrolling is natural, alternating pattern stays consistent
- No grid rebalancing, no layout breakpoints per item count
