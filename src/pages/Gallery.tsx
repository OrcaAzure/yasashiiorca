import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import gsap from 'gsap'
import { photos, categories, siteConfig } from '../data/photos'
import type { Photo } from '../data/photos'
import PhotoCard from '../components/PhotoCard'
import Lightbox from '../components/Lightbox'

export default function Gallery() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'All'
  const [activeCategory, setActiveCategory] = useState(
    categories.includes(initialCategory as (typeof categories)[number]) ? initialCategory : 'All',
  )
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  const filtered = activeCategory === 'All' ? photos : photos.filter((p) => p.category === activeCategory)

  useEffect(() => {
    if (!headingRef.current) return
    gsap.fromTo('.gallery-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 })
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    gsap.fromTo(
      gridRef.current.querySelectorAll('.gallery-item'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
    )
  }, [activeCategory])

  return (
    <div className="px-6 py-12 md:px-12">
      <div ref={headingRef} className="gallery-heading text-center">
        <Link to="/" className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-text-muted no-underline hover:text-accent">
          ← Back
        </Link>
        <p className="section-label mt-8">{siteConfig.name}</p>
        <h1 className="section-title mt-4">Galleries</h1>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 font-body text-[0.6rem] uppercase tracking-[0.15em] transition-all ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-glow-blue to-accent-purple text-white shadow-[0_0_24px_rgba(37,99,235,0.35)]'
                : 'border border-white/10 text-text-muted hover:border-accent/40 hover:text-text'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((photo) => (
          <div key={photo.id} className="gallery-item">
            <PhotoCard photo={photo} onClick={() => setSelectedPhoto(photo)} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center font-body text-xs uppercase tracking-[0.2em] text-text-muted">No photos yet.</p>
      )}

      {selectedPhoto && (
        <Lightbox photo={selectedPhoto} photos={filtered} onClose={() => setSelectedPhoto(null)} onNavigate={setSelectedPhoto} />
      )}
    </div>
  )
}
