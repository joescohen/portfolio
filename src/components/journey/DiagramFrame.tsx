import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  caption?: string
}

/**
 * Visual wrapper around inline SVG diagrams. Provides padding,
 * background, and an optional small caption rendered below the diagram.
 */
export function DiagramFrame({ children, caption }: Props) {
  return (
    <figure className="jrn-diagram-frame">
      {children}
      {caption && <figcaption className="jrn-diagram-caption">{caption}</figcaption>}
    </figure>
  )
}
