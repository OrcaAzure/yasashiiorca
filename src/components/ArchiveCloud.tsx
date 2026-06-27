import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import {
  photos,
  archiveYears,
  archiveCategories,
  archiveCloudLayout,
  siteConfig,
} from '../data/photos'
import type { Photo } from '../data/photos'

interface ArchiveCloudProps {
  onPhotoClick: (photo: Photo) => void
}

export default function ArchiveCloud({ onPhotoClick }: ArchiveCloudProps) {
  const [activeYear, setActiveYear] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const cloudRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const hasFilter = activeYear !== null || activeCategory !== 'All'

  const photoMatches = useCallback(
    (photo: Photo) => {
      if (activeYear !== null && photo.year !== activeYear) return false
      if (activeCategory !== 'All' && photo.category !== activeCategory) return false
      return true
    },
    [activeYear, activeCategory],
  )

  const applyHighlights = useCallback(() => {
    photos.forEach((photo) => {
      const el = itemRefs.current.get(photo.id)
      if (!el) return
      const match = photoMatches(photo)

      if (!hasFilter) {
        gsap.to(el, { opacity: 0.35, scale: 1, filter: 'grayscale(100%)', zIndex: 1, duration: 0.5, ease: 'power2.out' })
      } else if (match) {
        gsap.to(el, { opacity: 1, scale: 1.08, filter: 'grayscale(0%)', zIndex: 30, duration: 0.55, ease: 'power3.out' })
      } else {
        gsap.to(el, { opacity: 0.07, scale: 0.95, filter: 'grayscale(100%)', zIndex: 0, duration: 0.5, ease: 'power2.out' })
      }
    })
  }, [hasFilter, photoMatches])

  useEffect(() => {
    applyHighlights()
  }, [applyHighlights])

  const handleYearClick = (year: number) => {
    setActiveYear((prev) => (prev === year ? null : year))
  }

  const handleCategoryClick = (cat: string) => {
    setActiveCategory((prev) => (prev === cat ? 'All' : cat))
  }

  const handlePhotoClick = (photo: Photo) => {
    if (hasFilter && photoMatches(photo)) {
      onPhotoClick(photo)
      return
    }
    setActiveYear(photo.year)
    setActiveCategory('All')
    setTimeout(() => {
      const el = itemRefs.current.get(photo.id)
      if (el) {
        gsap.fromTo(el, { scale: 1.08 }, { scale: 1.12, duration: 0.3, yoyo: true, repeat: 1 })
      }
    }, 100)
  }

  return (
    <section id="archive" className="relative min-h-screen bg-black px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between md:mb-0">
          <p className="font-body text-[0.65rem] uppercase tracking-[0.35em] text-white/40">Full works overview</p>
          <p className="hidden font-body text-xs text-white/30 md:block">{siteConfig.name.replace('_', ' ')}</p>
        </div>

        <div className="relative grid min-h-[70vh] grid-cols-1 gap-8 md:grid-cols-[80px_1fr_120px] md:gap-4 lg:grid-cols-[100px_1fr_140px]">
          {/* Years — left */}
          <nav className="flex flex-row flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-0" aria-label="Filter by year">
            {archiveYears.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => handleYearClick(year)}
                className={`border-none bg-transparent py-1 text-left font-body text-xs transition md:py-1.5 md:text-sm ${
                  activeYear === year ? 'font-semibold text-white' : 'text-white/30 hover:text-white/60'
                }`}
              >
                {year}
              </button>
            ))}
          </nav>

          {/* Photo cloud — center */}
          <div ref={cloudRef} className="archive-cloud relative mx-auto min-h-[55vh] w-full max-w-2xl md:min-h-[65vh]">
            {photos.map((photo, i) => {
              const pos = archiveCloudLayout[i]
              if (!pos) return null
              return (
                <button
                  key={photo.id}
                  ref={(el) => {
                    if (el) itemRefs.current.set(photo.id, el)
                    else itemRefs.current.delete(photo.id)
                  }}
                  type="button"
                  onClick={() => handlePhotoClick(photo)}
                  className="archive-cloud-item absolute cursor-pointer overflow-hidden border-none bg-white p-0 shadow-lg transition-shadow hover:shadow-2xl"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    width: pos.w,
                    transform: `translate(-50%, 0) rotate(${pos.rot}deg)`,
                    zIndex: pos.z,
                    opacity: 0.35,
                  }}
                  aria-label={`${photo.title}, ${photo.year}`}
                >
                  <img src={photo.src} alt={photo.alt} className="block w-full object-cover" style={{ aspectRatio: '3/4' }} />
                </button>
              )
            })}
          </div>

          {/* Categories — right */}
          <nav className="flex flex-row flex-wrap gap-x-4 gap-y-1 md:flex-col md:items-end md:gap-0 md:text-right" aria-label="Filter by category">
            <p className="mb-2 w-full font-body text-[0.6rem] uppercase tracking-widest text-white/25 md:mb-4 md:text-right">Filter</p>
            {archiveCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className={`border-none bg-transparent py-1 text-left font-body text-xs transition md:py-1.5 md:text-right md:text-sm ${
                  activeCategory === cat ? 'font-semibold text-white' : 'text-white/30 hover:text-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {hasFilter && (
          <p className="mt-8 text-center font-body text-[0.65rem] uppercase tracking-widest text-white/40">
            Click a highlighted photo to view ·{' '}
            <button type="button" onClick={() => { setActiveYear(null); setActiveCategory('All') }} className="border-none bg-transparent text-white/60 underline hover:text-white">
              Clear filters
            </button>
          </p>
        )}
      </div>
    </section>
  )
}
