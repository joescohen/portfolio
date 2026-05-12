/**
 * Thin divider used between chapter ends and the next chapter's start.
 * Renders a hairline with a small centered dot. Decorative — hidden
 * from assistive tech via `aria-hidden`.
 */
export function ChapterDivider() {
  return (
    <div className="jrn-divider" aria-hidden="true">
      <span className="jrn-divider-dot" />
    </div>
  )
}
