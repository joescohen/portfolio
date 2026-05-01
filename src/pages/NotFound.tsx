import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'

export function NotFound() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] px-6 text-center">
        <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4 font-sans">
          Error 404
        </p>
        <h1
          className="text-7xl md:text-9xl font-bold mb-6 leading-none"
          style={{ fontFamily: '"DM Serif Display", serif' }}
        >
          Page not found
        </h1>
        <p className="text-white/60 text-lg mb-10 max-w-md font-sans">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 font-sans"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
