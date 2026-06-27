import { useEffect, useState } from 'react'

type Section = 'work' | 'info' | 'contact'

const links: { id: Section; label: string; href: string }[] = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'info', label: 'Info', href: '#info' },
  { id: 'contact', label: 'Contact Us', href: '#contact' },
]

export default function SiteNav() {
  const [active, setActive] = useState<Section>('work')

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id as Section)
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: '-20% 0px -20% 0px' },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="site-nav border-t border-white/10 bg-black px-6 py-20 md:py-32" aria-label="Site sections">
      <ul className="mx-auto flex max-w-4xl flex-col items-center gap-2 md:gap-4">
        {links.map(({ id, label, href }) => (
          <li key={id}>
            <a
              href={href}
              className={`font-display block text-4xl font-black uppercase tracking-tight no-underline transition md:text-6xl lg:text-7xl ${
                active === id ? 'text-white' : 'text-white/15 hover:text-white/40'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-8 text-[0.65rem] uppercase tracking-wider text-white/25 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} Yasashii Yume</span>
        <div className="flex gap-6">
          <a href="#archive" className="text-white/25 no-underline hover:text-white/50">Archive</a>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </nav>
  )
}
