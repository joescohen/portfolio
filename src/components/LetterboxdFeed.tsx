import { useEffect, useState } from 'react'
import { SectionLabel } from './SectionLabel'

interface LetterboxdEntry {
  filmTitle: string
  filmYear: string
  rating: number | null
  watchedDate: string
  link: string
  poster: string | null
  reWatched: boolean
}

const LB_NS = 'https://letterboxd.com'

function parseRSS(xmlText: string): LetterboxdEntry[] {
  const doc = new DOMParser().parseFromString(xmlText, 'application/xml')
  if (doc.querySelector('parsererror')) return []

  return Array.from(doc.querySelectorAll('item')).map((item): LetterboxdEntry => {
    const ns = (name: string) =>
      item.getElementsByTagNameNS(LB_NS, name)[0]?.textContent ?? ''

    const rawTitle = item.querySelector('title')?.textContent ?? ''
    const filmTitle = ns('filmTitle') || rawTitle.split(',')[0].trim()
    const filmYear = ns('filmYear')
    const watchedDate = ns('watchedDate')
    const memberRating = ns('memberRating')
    const reWatched = ns('reWatched') === 'Yes'

    // <link> is a sibling text node in XML — childNodes is more reliable
    const link =
      Array.from(item.childNodes).find((n) => n.nodeName === 'link')
        ?.textContent ?? ''

    // Poster lives inside the description CDATA as an <img> tag
    const descText = item.querySelector('description')?.textContent ?? ''
    let poster: string | null = null
    if (descText) {
      const descDoc = new DOMParser().parseFromString(descText, 'text/html')
      poster = descDoc.querySelector('img')?.getAttribute('src') ?? null
    }

    return {
      filmTitle,
      filmYear,
      rating: memberRating ? parseFloat(memberRating) : null,
      watchedDate,
      link,
      poster,
      reWatched,
    }
  })
}

function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) return null
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className="text-orange-500 text-xs leading-none mt-0.5">
      {'★'.repeat(full)}
      {half ? '½' : ''}
    </div>
  )
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function LetterboxdFeed() {
  const [entries, setEntries] = useState<LetterboxdEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/rss')
      .then((r) => r.text())
      .then((xml) => {
        setEntries(parseRSS(xml))
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load Letterboxd feed.')
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-navy">Recently Watched</h2>
        <a
          href="https://letterboxd.com/jsc6121/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 hover:text-orange-500 transition-colors"
        >
          View on Letterboxd →
        </a>
      </div>

      {loading && (
        <div className="py-16 text-center">
          <p className="text-slate-400 text-sm animate-pulse">Loading films…</p>
        </div>
      )}

      {error && (
        <div className="py-12 text-center">
          <p className="text-slate-400 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && entries.length === 0 && (
        <div className="py-12 text-center border border-dashed border-slate-200 rounded-xl">
          <SectionLabel>Letterboxd</SectionLabel>
          <p className="text-slate-400 text-sm mt-1">No films logged yet.</p>
          <a
            href="https://letterboxd.com/jsc6121/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-orange-500 hover:underline mt-2 inline-block"
          >
            Visit profile →
          </a>
        </div>
      )}

      {!loading && !error && entries.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {entries.map((entry, i) => (
            <a
              key={entry.link || i}
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative rounded-lg overflow-hidden bg-slate-100 aspect-[2/3] mb-2 shadow-sm group-hover:shadow-md transition-shadow">
                {entry.poster ? (
                  <img
                    src={entry.poster}
                    alt={entry.filmTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center p-2">
                    <span className="text-slate-400 text-[10px] text-center leading-tight">
                      {entry.filmTitle}
                    </span>
                  </div>
                )}
                {entry.reWatched && (
                  <span className="absolute top-1.5 right-1.5 bg-navy text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">
                    REWATCH
                  </span>
                )}
              </div>
              <p className="text-navy text-xs font-semibold leading-tight group-hover:text-orange-500 transition-colors line-clamp-2">
                {entry.filmTitle}
              </p>
              {entry.filmYear && (
                <p className="text-slate-400 text-[10px] mt-0.5">{entry.filmYear}</p>
              )}
              <StarRating rating={entry.rating} />
              {entry.watchedDate && (
                <p className="text-slate-300 text-[10px] mt-0.5">{formatDate(entry.watchedDate)}</p>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
