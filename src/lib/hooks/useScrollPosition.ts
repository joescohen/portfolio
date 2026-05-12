import { useEffect, useState } from 'react'

/**
 * Returns the current `window.scrollY`, rAF-throttled. Used by the
 * Journey page's progress rail to fade/grow as the reader descends.
 * SSR-safe: returns 0 on the server.
 */
export function useScrollPosition(): number {
  const [y, setY] = useState<number>(() =>
    typeof window === 'undefined' ? 0 : window.scrollY,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    let raf: number | null = null
    const onScroll = () => {
      if (raf !== null) return
      raf = window.requestAnimationFrame(() => {
        setY(window.scrollY)
        raf = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf !== null) window.cancelAnimationFrame(raf)
    }
  }, [])

  return y
}
