import { useEffect, useState, useRef } from 'react'

/**
 * Track which chapter section is currently in view by id, and mirror the
 * id into the URL hash without scrolling. Designed for the Journey page.
 *
 * Behaviour:
 *   - On mount, observes each section element by id with IntersectionObserver.
 *   - Picks the chapter with the largest intersection ratio above the
 *     threshold; if no chapter qualifies, falls back to the most recently
 *     active one.
 *   - Pushes `#<id>` into `window.history` via `replaceState` to avoid
 *     adding history entries on every scroll.
 *   - Persists the active chapter to sessionStorage so we can restore on
 *     hot reload.
 */
export function useActiveChapter(ids: string[], threshold = 0.45): string | null {
  const [active, setActive] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    // honor an incoming hash on first load
    const hash = window.location.hash.slice(1)
    if (hash && ids.includes(hash)) return hash
    const stored = sessionStorage.getItem('journey:active-chapter')
    if (stored && ids.includes(stored)) return stored
    return null
  })

  // Latest ratios per id, so we can pick the largest at any tick.
  const ratiosRef = useRef<Record<string, number>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('IntersectionObserver' in window)) return

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratiosRef.current[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0
        }
        // Find the section with the largest visible ratio that crosses the threshold.
        let best: { id: string; ratio: number } | null = null
        for (const [id, ratio] of Object.entries(ratiosRef.current)) {
          if (ratio >= threshold && (!best || ratio > best.ratio)) {
            best = { id, ratio }
          }
        }
        // Fallback: any section with non-zero intersection, take the largest.
        if (!best) {
          for (const [id, ratio] of Object.entries(ratiosRef.current)) {
            if (ratio > 0 && (!best || ratio > best.ratio)) {
              best = { id, ratio }
            }
          }
        }
        if (best) {
          setActive((prev) => (prev === best!.id ? prev : best!.id))
        }
      },
      {
        // Sample several thresholds so we get smooth updates as a section
        // scrolls through the viewport.
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.8],
        rootMargin: '-15% 0px -35% 0px',
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, threshold])

  // Mirror to URL hash + sessionStorage when the active section changes.
  useEffect(() => {
    if (typeof window === 'undefined' || !active) return

    if (window.location.hash.slice(1) !== active) {
      const url = `${window.location.pathname}${window.location.search}#${active}`
      window.history.replaceState(null, '', url)
    }

    sessionStorage.setItem('journey:active-chapter', active)
  }, [active])

  return active
}
