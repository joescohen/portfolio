import { Link } from 'react-router-dom'
import type { ProjectCardData } from '../../content/journey/chapters'
import { RichText } from './RichText'

interface Props {
  card: ProjectCardData
}

export function ProjectCard({ card }: Props) {
  const description = Array.isArray(card.description)
    ? card.description
    : card.description
      ? [card.description]
      : []

  return (
    <article className="jrn-card">
      <header className="jrn-card-meta">
        <h3 className="jrn-card-title">{card.title}</h3>
        <span className="jrn-card-year">{card.year}</span>
      </header>

      {description.length > 0 && (
        <div className="jrn-card-body">
          {description.map((para, i) => (
            <p key={i}>
              <RichText text={para} />
            </p>
          ))}
        </div>
      )}

      {card.sections?.map((section, i) => (
        <div key={i}>
          <span className="jrn-card-label">{section.label}</span>
          {section.paragraphs && (
            <div className="jrn-card-body">
              {section.paragraphs.map((para, j) => (
                <p key={j}>
                  <RichText text={para} />
                </p>
              ))}
            </div>
          )}
          {section.items && (
            <ul className="jrn-card-list">
              {section.items.map((item, j) => (
                <li key={j}>
                  {item.lead && <strong>{item.lead}</strong>}{' '}
                  <RichText text={item.body} />
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {card.link && (
        <Link to={card.link.to} viewTransition className="jrn-card-link">
          <span>{card.link.label}</span>
          <span className="arrow" aria-hidden="true">→</span>
        </Link>
      )}

      <style>{css}</style>
    </article>
  )
}

const css = `
.jrn-card-list {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.jrn-card-list li {
  position: relative;
  padding-left: 22px;
  font-size: 15.5px;
  line-height: 1.65;
  color: var(--jrn-text-muted);
}
.jrn-card-list li::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 0.8em;
  width: 6px;
  height: 1px;
  background: var(--jrn-accent);
}
.jrn-card-list li strong {
  color: var(--jrn-text);
  font-weight: 600;
  letter-spacing: -0.005em;
}
`
