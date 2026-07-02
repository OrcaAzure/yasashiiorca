import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AlbumCarousel, { getAlbumSlides } from './AlbumCarousel'
import type { Photo } from '../data/photos'

gsap.registerPlugin(ScrollTrigger)

interface WorkGridProps {
  photos: Photo[]
  allPhotos: Photo[]
  onView: (photo: Photo) => void
}

export default function WorkGrid({ photos, allPhotos, onView }: WorkGridProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const items = photos.slice(0, 6)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.album-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          immediateRender: false,
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="border-t border-white/10 bg-black px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.3em] text-white">Selected Work</h2>
            <p className="mt-2 font-body text-xs text-white/35">Albums · {items.length} releases</p>
          </div>
          <span className="font-body text-xs text-white/30">{String(items.length).padStart(2, '0')}</span>
        </div>

        <div className="grid grid-cols-1 gap-x-16 gap-y-14 md:grid-cols-2">
          {items.map((photo, i) => (
            <article key={photo.id} className="album-item flex flex-col items-center">
              <div className="album-cover flex w-full items-center justify-center py-2">
                <AlbumCarousel
                  variant="grid"
                  photos={getAlbumSlides(photo, allPhotos)}
                  loop
                />
              </div>

              <div className="album-meta mt-5 w-full max-w-[260px] border-t border-white/10 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate font-body text-sm text-white">
                    <span className="mr-2 font-medium text-white/55">{String(i + 1).padStart(2, '0')}</span>
                    {photo.title}
                  </p>
                  <button
                    type="button"
                    onClick={() => onView(photo)}
                    className="shrink-0 border-none bg-transparent font-body text-[0.65rem] uppercase tracking-widest text-white/40 transition hover:text-white"
                  >
                    View ↗
                  </button>
                </div>
                <p className="mt-1.5 font-body text-[0.65rem] uppercase tracking-wider text-white/35">
                  {photo.category} · {photo.year}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
