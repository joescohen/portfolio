import type { Chapter } from '../../content/journey/chapters'

interface Props {
  chapters: Chapter[]
  activeId: string | null
}

/**
 * Sticky vertical rail with a dot per chapter. Visible only at ≥ 1024px
 * via CSS — on smaller screens it is removed from the layout entirely.
 */
export function ProgressRail({ chapters, activeId }: Props) {
  return (
    <nav className="jrn-rail" aria-label="Chapter navigation">
      <div className="jrn-rail-inner">
        {chapters.map((ch) => {
          const isActive = ch.id === activeId
          return (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              className="jrn-rail-dot"
              data-active={isActive ? 'true' : 'false'}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`Jump to chapter ${ch.number}: ${ch.navLabel}`}
            >
              <span className="jrn-rail-label" aria-hidden="true">
                {ch.number} · {ch.navLabel}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
