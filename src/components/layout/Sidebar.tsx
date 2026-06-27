import { NavLink } from 'react-router-dom'
import { siteConfig, galleryCollections } from '../../data/photos'

const mainNav = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/gallery', label: 'Library', icon: LibraryIcon },
]

export default function Sidebar() {
  return (
    <aside className="sidebar hidden w-[280px] shrink-0 flex-col bg-black px-2 py-2 md:flex">
      <div className="rounded-lg bg-spotify-elevated p-4">
        <NavLink to="/" className="mb-6 flex items-center gap-2 no-underline">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-spotify-green">
            <CameraIcon />
          </div>
          <span className="font-display text-lg font-bold text-white">{siteConfig.name.replace('_', ' ')}</span>
        </NavLink>

        <nav className="space-y-1">
          {mainNav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-md px-3 py-2.5 text-sm font-semibold no-underline transition-colors ${
                  isActive ? 'text-white' : 'text-spotify-muted hover:text-white'
                }`
              }
            >
              <Icon active={false} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-2 flex-1 overflow-y-auto rounded-lg bg-spotify-elevated p-2">
        <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-spotify-muted">Your Library</p>
        <nav className="space-y-0.5">
          {galleryCollections.map((col) => (
            <NavLink
              key={col.id}
              to={`/gallery?category=${col.category}`}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm no-underline transition-colors ${
                  isActive ? 'bg-spotify-highlight text-white' : 'text-spotify-muted hover:text-white'
                }`
              }
            >
              <img src={col.cover} alt="" className="h-10 w-10 shrink-0 rounded object-cover" />
              <div className="min-w-0">
                <p className="truncate font-medium text-white">{col.title}</p>
                <p className="truncate text-xs text-spotify-muted">Playlist · {col.description.split(' ')[0]}</p>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-2 rounded-lg bg-spotify-elevated p-4">
        <p className="text-xs text-spotify-muted">{siteConfig.location}</p>
        <a href={`mailto:${siteConfig.email}`} className="mt-1 block truncate text-xs text-spotify-muted no-underline hover:text-white hover:underline">
          {siteConfig.email}
        </a>
      </div>
    </aside>
  )
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" />
    </svg>
  )
}

function LibraryIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="black">
      <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
      <path d="M20 7h-2.5l-1.5-2h-7L7.5 7H5a2 2 0 00-2 2v9a2 2 0 002 2h15a2 2 0 002-2V9a2 2 0 00-2-2zm-8 11a5.5 5.5 0 110-11 5.5 5.5 0 010 11z" />
    </svg>
  )
}

export function MobileNav() {
  return (
    <nav className="fixed bottom-[72px] left-0 right-0 z-40 flex border-t border-white/10 bg-black/95 backdrop-blur md:hidden">
      {mainNav.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 py-2 text-[0.65rem] font-semibold no-underline ${
              isActive ? 'text-white' : 'text-spotify-muted'
            }`
          }
        >
          <Icon active={false} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
