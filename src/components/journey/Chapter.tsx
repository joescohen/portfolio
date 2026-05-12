import type { Chapter as ChapterModel } from '../../content/journey/chapters'
import { ProjectCard } from './ProjectCard'
import { KeyInsight } from './KeyInsight'
import { DiagramFrame } from './DiagramFrame'
import { Reveal } from './Reveal'
import { RichText } from './RichText'
import { VModelDiagram } from './diagrams/VModelDiagram'
import { VModelAgentMapping } from './diagrams/VModelAgentMapping'
import { RecursiveLoopDiagram } from './diagrams/RecursiveLoopDiagram'
import { PlatformArchitectureDiagram } from './diagrams/PlatformArchitectureDiagram'

interface Props {
  chapter: ChapterModel
}

const diagrams = {
  'v-model': VModelDiagram,
  'v-model-agent-mapping': VModelAgentMapping,
  'recursive-loop': RecursiveLoopDiagram,
  'platform-architecture': PlatformArchitectureDiagram,
} as const

export function Chapter({ chapter }: Props) {
  const titleId = `${chapter.id}-title`
  return (
    <section
      id={chapter.id}
      aria-labelledby={titleId}
      className="jrn-chapter"
    >
      <div className="jrn-container">
        <Reveal as="div" delay={1}>
          <p className="jrn-chapter-label">{chapter.label}</p>
        </Reveal>

        <Reveal as="div" delay={2}>
          <h2 id={titleId} className="jrn-chapter-title" style={{ marginTop: 12 }}>
            {chapter.title}
          </h2>
        </Reveal>

        <Reveal as="div" delay={3}>
          <p className="jrn-hook" style={{ marginTop: 24, marginBottom: 40 }}>
            <RichText text={chapter.hook} />
          </p>
        </Reveal>

        <Reveal as="div" delay={4}>
          <div className="jrn-body">
            {chapter.blocks.map((block, i) => {
              switch (block.kind) {
                case 'paragraph':
                  return (
                    <p key={i}>
                      <RichText text={block.text} />
                    </p>
                  )
                case 'paragraph-emphasis':
                  return (
                    <p key={i} className="jrn-para-emphasis">
                      <RichText text={block.text} />
                    </p>
                  )
                case 'subheading':
                  return (
                    <h3 key={i} className="jrn-h3" style={{ marginTop: 36 }}>
                      {block.text}
                    </h3>
                  )
                case 'project-card':
                  return (
                    <div key={i} className="jrn-card-wrap">
                      <ProjectCard card={block.card} />
                    </div>
                  )
                case 'diagram': {
                  const Diagram = diagrams[block.diagram]
                  return (
                    <DiagramFrame key={i} caption={block.caption}>
                      <Diagram />
                    </DiagramFrame>
                  )
                }
                case 'key-insight':
                  return (
                    <KeyInsight key={i}>
                      <RichText text={block.text} />
                    </KeyInsight>
                  )
                case 'priority-list':
                  return (
                    <ol key={i} className="jrn-priority-list">
                      {block.items.map((item, j) => (
                        <li key={j}>
                          <strong>{item.heading}</strong>{' '}
                          <RichText text={item.body} />
                        </li>
                      ))}
                    </ol>
                  )
                case 'contact-block':
                  return (
                    <div key={i} className="jrn-contact">
                      {block.entries.map((entry) => {
                        const isInternal = entry.href.startsWith('/')
                        const isMail = entry.href.startsWith('mailto:')
                        const externalProps = isInternal
                          ? {}
                          : isMail
                            ? {}
                            : { target: '_blank', rel: 'noopener noreferrer' }
                        return (
                          <a
                            key={entry.label}
                            href={entry.href}
                            {...externalProps}
                          >
                            <span className="label">{entry.label}</span>
                            <span>·</span>
                            <span>{entry.value}</span>
                          </a>
                        )
                      })}
                    </div>
                  )
                default:
                  return null
              }
            })}
          </div>
        </Reveal>
      </div>
      <style>{css}</style>
    </section>
  )
}

const css = `
.jrn-para-emphasis {
  margin-top: 1.6em !important;
  font-family: var(--jrn-font-display);
  font-size: clamp(1.1rem, 1.55vw, 1.35rem);
  line-height: 1.55;
  color: var(--jrn-text);
  letter-spacing: -0.002em;
  font-style: italic;
  font-weight: 380;
}
.jrn-card-wrap {
  margin: 36px 0;
}
.jrn-priority-list {
  list-style: none;
  counter-reset: jrn-priority;
  padding: 0;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.jrn-priority-list li {
  counter-increment: jrn-priority;
  padding-left: 56px;
  position: relative;
  font-size: 17px;
  line-height: 1.72;
  color: var(--jrn-text-muted);
}
.jrn-priority-list li::before {
  content: counter(jrn-priority, decimal-leading-zero);
  position: absolute;
  left: 0;
  top: 0.1em;
  font-family: var(--jrn-font-mono);
  font-size: 13px;
  letter-spacing: 0.12em;
  color: var(--jrn-accent);
}
.jrn-priority-list li strong {
  display: block;
  color: var(--jrn-text);
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 18px;
}
`
