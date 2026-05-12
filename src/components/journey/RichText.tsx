import type { ReactNode } from 'react'

/**
 * Parses single-paragraph copy that may contain `*emphasis*` markers.
 * The spec uses `*text*` to flag inline italic emphasis (e.g. the
 * narrator's italicized parentheticals). We render those as <em>.
 */
export function RichText({ text }: { text: string }): ReactNode {
  // Split on *...* segments, keep delimiters so we can reconstruct.
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return <em key={i}>{part.slice(1, -1)}</em>
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}
