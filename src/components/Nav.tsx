import { Link } from 'react-router-dom'

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10 h-12 flex items-center px-6 lg:px-12">
      <Link to="/" className="text-orange-500 font-bold text-base tracking-wide">
        Joe Cohen
      </Link>
      <div className="ml-auto flex items-center gap-6">
        <Link to="/about" className="text-white/60 hover:text-white text-sm transition-colors">
          About
        </Link>
      </div>
    </nav>
  )
}
