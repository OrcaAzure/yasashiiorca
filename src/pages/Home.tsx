import { useEffect, type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import CinematicHero from '../components/CinematicHero'
import EditorialShowcase from '../components/EditorialShowcase'
import CategoryPanels from '../components/CategoryPanels'
import ScrollGallery from '../components/ScrollGallery'
import Lightbox from '../components/Lightbox'
import {
  siteConfig,
  photos,
  getFeaturedPhotos,
  getRecentPhotos,
  getPhotosByCategory,
  galleryCollections,
} from '../data/photos'
import type { Photo } from '../data/photos'

export default function Home() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const featured = getFeaturedPhotos()
  const recent = getRecentPhotos()
  const portraits = getPhotosByCategory('Portraits')
  const editorial = getPhotosByCategory('Editorial')
  const landscapes = getPhotosByCategory('Landscapes')

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSending(false)
    setSubmitted(true)
    e.currentTarget.reset()
  }

  const openLightbox = (photo: Photo) => setSelectedPhoto(photo)

  const categoryPanels = [
    { label: 'Portraits', category: 'Portraits' as const, cover: portraits[0] ?? photos[0] },
    { label: 'Editorial', category: 'Editorial' as const, cover: editorial[0] ?? photos[4] },
    { label: 'Landscapes', category: 'Landscapes' as const, cover: landscapes[0] ?? photos[8] },
  ]

  return (
    <>
      <CinematicHero
        leftPhotos={portraits.length ? portraits : photos.slice(0, 4)}
        rightPhotos={editorial.length ? [...editorial, ...landscapes] : photos.slice(4, 8)}
        onPhotoClick={openLightbox}
      />

      <EditorialShowcase
        photos={featured.length >= 3 ? featured.slice(0, 3) : photos.slice(0, 3)}
        onPhotoClick={openLightbox}
      />

      <ScrollGallery
        photos={recent.length ? recent : photos.slice(0, 8)}
        title="Recent"
        onPhotoClick={openLightbox}
      />

      <CategoryPanels panels={categoryPanels} />

      <section id="about" className="relative px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <FadeIn>
            <p className="section-label">About</p>
            <h2 className="section-title mt-4">Behind the lens</h2>
            <p className="mt-8 font-body text-sm font-light leading-[1.9] text-text-muted">{siteConfig.bio}</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-6 inline-block font-body text-xs uppercase tracking-[0.15em] text-accent no-underline hover:text-accent-purple">
              {siteConfig.email}
            </a>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="cinematic-photo overflow-hidden rounded-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1554048612-54e7690e4793?w=800&q=80"
                alt="About the photographer"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="galleries" className="relative px-6 py-24 md:px-12">
        <FadeIn>
          <div className="mb-14 text-center">
            <p className="section-label">Collections</p>
            <h2 className="section-title mt-3">Galleries</h2>
          </div>
        </FadeIn>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {galleryCollections.map((col, i) => (
            <FadeIn key={col.id} delay={i * 0.1}>
              <div className="glass-panel group overflow-hidden rounded-2xl p-4">
                <div className="cinematic-photo overflow-hidden rounded-xl">
                  <img src={col.cover} alt={col.title} className="aspect-[4/3] w-full object-cover" />
                </div>
                <h3 className="mt-5 font-cinematic text-sm font-bold uppercase tracking-[0.15em]">{col.title}</h3>
                <p className="mt-2 font-body text-xs text-text-muted">{col.description}</p>
                <Link to={`/gallery?category=${col.category}`} className="btn-ghost mt-5 inline-block py-3 text-[0.6rem] no-underline">
                  View gallery
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="contact" className="relative px-6 pb-24 pt-12 md:px-12">
        <FadeIn>
          <div className="mb-14 text-center">
            <p className="section-label">Get in touch</p>
            <h2 className="section-title mt-3">Contact</h2>
          </div>
        </FadeIn>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="glass-panel rounded-2xl p-8">
            <ul className="space-y-4 font-body text-xs uppercase tracking-[0.12em] text-text-muted">
              <li>{siteConfig.email}</li>
              <li>{siteConfig.phone}</li>
              <li>{siteConfig.location}</li>
              <li>{siteConfig.availability}</li>
            </ul>
            <div className="mt-8 flex gap-3">
              {[
                { label: 'IG', href: siteConfig.instagram },
                { label: 'TW', href: siteConfig.twitter },
                { label: 'PT', href: siteConfig.pinterest },
                { label: 'BE', href: siteConfig.behance },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 font-body text-[0.6rem] text-text-muted no-underline transition-all hover:border-accent hover:text-accent">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="glass-panel flex flex-col gap-4 rounded-2xl p-8">
            <input name="name" placeholder="Your name" required className="rounded-lg border border-white/[0.08] bg-transparent px-4 py-3 font-body text-sm text-text outline-none focus:border-accent" />
            <input name="email" type="email" placeholder="Your email" required className="rounded-lg border border-white/[0.08] bg-transparent px-4 py-3 font-body text-sm text-text outline-none focus:border-accent" />
            <textarea name="message" placeholder="Your message" required rows={4} className="resize-none rounded-lg border border-white/[0.08] bg-transparent px-4 py-3 font-body text-sm text-text outline-none focus:border-accent" />
            <button type="submit" disabled={sending} className="btn-glow mt-2 justify-center border-none">
              {sending ? 'Sending...' : 'Send message →'}
            </button>
            {submitted && <p className="text-center font-body text-xs text-accent">Thank you — I&apos;ll reply soon.</p>}
          </form>
        </div>
      </section>

      {selectedPhoto && (
        <Lightbox photo={selectedPhoto} photos={photos} onClose={() => setSelectedPhoto(null)} onNavigate={setSelectedPhoto} />
      )}
    </>
  )
}
