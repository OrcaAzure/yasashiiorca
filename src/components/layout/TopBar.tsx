import { useLocation, useNavigate } from 'react-router-dom'
import { siteConfig } from '../../data/photos'

export default function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const canGoBack = location.key !== 'default'

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-spotify-base/80 px-4 py-4 backdrop-blur-md md:px-8">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => canGoBack ? navigate(-1) : navigate('/')}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/70 disabled:opacity-30"
          aria-label="Go back"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => navigate(1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/70"
          aria-label="Go forward"
        >
          ›
        </button>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3 md:max-w-md md:flex-none">
        <div className="hidden w-full items-center gap-3 rounded-full bg-white/10 px-4 py-2.5 md:flex">
          <SearchIcon />
          <span className="text-sm text-spotify-muted">Search photos...</span>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-spotify-green text-xs font-bold text-black">
          {siteConfig.name.charAt(0)}
        </div>
      </div>
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-spotify-muted">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" />
    </svg>
  )
}
