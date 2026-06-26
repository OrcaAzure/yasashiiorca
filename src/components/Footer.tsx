import { siteConfig } from '../data/photos'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-white/[0.06] px-6 py-8 md:px-12">
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-text-muted">
          © {year} {siteConfig.name}
        </p>
        <p className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-text-muted">
          {siteConfig.subtitle}
        </p>
      </div>
    </footer>
  )
}
