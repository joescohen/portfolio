import { useEffect } from 'react'
import { Nav } from '../components/Nav'
import { Hero } from '../components/journey/Hero'
import { Chapter } from '../components/journey/Chapter'
import { ChapterDivider } from '../components/journey/ChapterDivider'
import { ProgressRail } from '../components/journey/ProgressRail'
import { chapters } from '../content/journey/chapters'
import { useActiveChapter } from '../lib/hooks/useActiveChapter'
import '../styles/journey.css'

const SEO = {
  title: 'Journey — Joe Cohen',
  description:
    'From defense systems engineering to AI agent architecture. Seven chapters, six years, and the realization that V&V discipline is exactly what reliable AI needs.',
  url: 'https://joeco.io/journey',
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'From systems engineering to AI agent architecture',
  description: SEO.description,
  author: {
    '@type': 'Person',
    name: 'Joe Cohen',
    url: 'https://joeco.io',
  },
  datePublished: '2026-05-01',
  dateModified: '2026-05-11',
  url: SEO.url,
  mainEntityOfPage: SEO.url,
}

/**
 * Imperatively manage <head> tags so we don't add a new dependency.
 * Sets title, description, OG tags, and a JSON-LD Article schema for
 * the duration of the Journey page being mounted.
 */
function useJourneyHead() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = SEO.title

    const tags: { selector: string; attrs: Record<string, string> }[] = [
      { selector: 'meta[name="description"]', attrs: { name: 'description', content: SEO.description } },
      { selector: 'meta[property="og:title"]', attrs: { property: 'og:title', content: SEO.title } },
      { selector: 'meta[property="og:description"]', attrs: { property: 'og:description', content: SEO.description } },
      { selector: 'meta[property="og:type"]', attrs: { property: 'og:type', content: 'article' } },
      { selector: 'meta[property="og:url"]', attrs: { property: 'og:url', content: SEO.url } },
      { selector: 'meta[name="twitter:card"]', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      { selector: 'meta[name="twitter:title"]', attrs: { name: 'twitter:title', content: SEO.title } },
      { selector: 'meta[name="twitter:description"]', attrs: { name: 'twitter:description', content: SEO.description } },
    ]

    const created: HTMLElement[] = []
    for (const { selector, attrs } of tags) {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null
      const isExisting = !!el
      if (!el) {
        el = document.createElement('meta')
        for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
        document.head.appendChild(el)
      } else {
        // Snapshot prior content so we can restore on unmount.
        const prior = el.getAttribute('content')
        ;(el as HTMLMetaElement & { _journeyPrior?: string | null })._journeyPrior = prior
        el.setAttribute('content', attrs.content)
      }
      if (!isExisting) created.push(el)
    }

    // JSON-LD
    const ld = document.createElement('script')
    ld.type = 'application/ld+json'
    ld.text = JSON.stringify(articleSchema)
    ld.dataset.journeyLd = 'true'
    document.head.appendChild(ld)
    created.push(ld)

    return () => {
      document.title = prevTitle
      created.forEach((el) => el.parentNode?.removeChild(el))
      // Restore overwritten meta content where applicable.
      for (const { selector } of tags) {
        const el = document.head.querySelector(selector) as
          | (HTMLMetaElement & { _journeyPrior?: string | null })
          | null
        if (el && '_journeyPrior' in el && el._journeyPrior != null) {
          el.setAttribute('content', el._journeyPrior)
          delete el._journeyPrior
        }
      }
    }
  }, [])
}

/**
 * Enable scroll-behavior: smooth only while the Journey page is
 * mounted, so other pages aren't affected.
 */
function useJourneyScrollClass() {
  useEffect(() => {
    const html = document.documentElement
    html.classList.add('journey-active')
    return () => {
      html.classList.remove('journey-active')
    }
  }, [])
}

/**
 * If the URL contains a hash that maps to a chapter, scroll there once
 * the chapters are rendered. We do this in a microtask after mount so
 * the elements are present.
 */
function useInitialHashScroll() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) {
      // Defer slightly to let layout settle and reveal classes apply.
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'auto', block: 'start' })
      })
    }
  }, [])
}

export function Journey() {
  useJourneyHead()
  useJourneyScrollClass()
  useInitialHashScroll()

  const ids = chapters.map((c) => c.id)
  const activeId = useActiveChapter(ids)

  return (
    <div className="journey-page min-h-screen">
      <Nav />
      <ProgressRail chapters={chapters} activeId={activeId} />

      <main>
        <Hero />
        {chapters.map((chapter, i) => (
          <div key={chapter.id}>
            {i > 0 && (
              <div className="jrn-container">
                <ChapterDivider />
              </div>
            )}
            <Chapter chapter={chapter} />
          </div>
        ))}
      </main>

      <footer className="jrn-footer" aria-label="Journey footer">
        <div className="jrn-container">
          <p>© Joe Cohen · joeco.io</p>
        </div>
        <style>{`
          .jrn-footer {
            padding: 64px 0 96px;
            color: var(--jrn-text-faint);
            font-family: var(--jrn-font-mono);
            font-size: 11px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            border-top: 1px solid var(--jrn-rule);
            margin-top: 64px;
          }
        `}</style>
      </footer>
    </div>
  )
}
