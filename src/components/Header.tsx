import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { siteConfig } from '../data/photos'
import { scrollToSection } from '../utils/scroll'

const navLinks = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'galleries', label: 'Galleries' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(headerRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 })
  }, [])

  const handleNav = (sectionId: string) => {
    setMenuOpen(false)
    if (isHome) scrollToSection(sectionId)
    else navigate({ pathname: '/', hash: `#${sectionId}` })
  }

  return (
    <header
      ref={headerRef}
      className={`z-50 px-6 py-6 md:px-12 md:py-8 ${isHome ? 'absolute left-0 right-0 top-0' : 'relative'}`}
      role="banner"
    >
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="font-cinematic text-base font-extrabold uppercase tracking-[0.15em] text-text no-underline md:text-lg"
          onClick={() => scrollToSection('hero')}
        >
          {siteConfig.name.replace('_', ' ')}
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Main navigation">
          {navLinks.map(({ id, label }) => (
            <button key={id} type="button" onClick={() => handleNav(id)} className="nav-link cursor-pointer border-none bg-transparent">
              {label}
            </button>
          ))}
        </nav>

        <button type="button" className="nav-link border-none bg-transparent md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <nav className="mt-8 flex flex-col gap-6 md:hidden">
          <button type="button" onClick={() => handleNav('hero')} className="nav-link text-left">Home</button>
          {navLinks.map(({ id, label }) => (
            <button key={id} type="button" onClick={() => handleNav(id)} className="nav-link text-left">{label}</button>
          ))}
        </nav>
      )}
    </header>
  )
}
