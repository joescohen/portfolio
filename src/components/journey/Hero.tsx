import { heroContent } from '../../content/journey/chapters'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <section className="jrn-hero" aria-label="Journey introduction">
      <div className="jrn-container">
        <Reveal delay={1}>
          <p className="jrn-chapter-label">{heroContent.label}</p>
        </Reveal>

        <Reveal delay={2}>
          <h1 className="jrn-hero-title" style={{ marginTop: 18 }}>
            {heroContent.title}
          </h1>
        </Reveal>

        <Reveal delay={3}>
          <p className="jrn-body-lead" style={{ marginTop: 32, maxWidth: 640 }}>
            {heroContent.lead}
          </p>
        </Reveal>

        <Reveal delay={4}>
          <p className="jrn-mono" style={{ marginTop: 48, color: 'var(--jrn-text-dim)' }}>
            {heroContent.meta}
          </p>
          <a className="jrn-scroll-cue" href={heroContent.scrollCueAnchor}>
            <span className="arrow" aria-hidden="true">↓</span>
            <span>{heroContent.scrollCueLabel}</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
