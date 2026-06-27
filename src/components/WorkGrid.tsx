import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Photo } from '../data/photos'

gsap.registerPlugin(ScrollTrigger)

interface WorkGridProps {
  photos: Photo[]
  onView: (photo: Photo) => void
}

export default function WorkGrid({ photos, onView }: WorkGridProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const items = photos.slice(0, 6)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.album-item',
        { opacity: 0, y: 28 },
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
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.3em] text-white">Selected Work</h2>
            <p className="mt-2 font-body text-xs text-white/35">Albums · {items.length} releases</p>
          </div>
          <span className="font-body text-xs text-white/30">{String(items.length).padStart(2, '0')}</span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5">
          {items.map((photo, i) => (
            <article key={photo.id} className="album-item group">
              <button
                type="button"
                onClick={() => onView(photo)}
                className="album-cover block w-full cursor-pointer border-none bg-transparent p-0 text-left"
              >
                <div className="relative aspect-square overflow-hidden bg-[#111] shadow-[0_8px_32px_rgba(0,0,0,0.6)] ring-1 ring-white/5 transition duration-300 group-hover:ring-white/20">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/25" />
                  <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm text-black opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                    ▶
                  </div>
                </div>
              </button>

              <div className="album-meta mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-2.5">
                <div className="min-w-0">
                  <p className="truncate font-body text-[0.65rem] text-white/40">
                    <span className="mr-2 text-white/60">{String(i + 1).padStart(2, '0')}</span>
                    {photo.title}
                  </p>
                  <p className="mt-0.5 truncate font-body text-[0.6rem] uppercase tracking-wider text-white/30">
                    {photo.category} · {photo.year}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onView(photo)}
                  className="shrink-0 border-none bg-transparent font-body text-[0.6rem] uppercase tracking-wider text-white/35 transition group-hover:text-white"
                >
                  View ↗
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
