import { useEffect, useRef, type ReactNode, type HTMLAttributes } from 'react'

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  delay?: 1 | 2 | 3 | 4
  /** Render as a different element. */
  as?: 'div' | 'section' | 'span'
}

/**
 * Wraps content in a `.jrn-reveal` div. The first time it crosses the
 * viewport it gets `.is-visible` added, which fires the CSS transition.
 * Disables itself if the user prefers reduced motion (CSS handles that).
 */
export function Reveal({
  children,
  delay,
  as = 'div',
  className = '',
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal when intersecting, OR when the element sits above the
          // viewport — this prevents stuck opacity:0 content when the user
          // deep-links into a later chapter (the observer's initial callback
          // fires after the hash scroll has already passed earlier elements).
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const staggerClass = delay ? `jrn-stagger-${delay}` : ''
  const combined = `jrn-reveal ${staggerClass} ${className}`.trim()

  const Tag = as as 'div'
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={combined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
