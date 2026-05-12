import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/**
 * A pulled-out passage rendered with a warm-tan left border. Used for
 * the chapter-level "the verification layer was the missing piece"-style
 * realizations.
 */
export function KeyInsight({ children }: Props) {
  return (
    <blockquote className="jrn-insight" role="note">
      {children}
    </blockquote>
  )
}
