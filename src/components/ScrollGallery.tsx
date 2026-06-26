import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Photo } from '../data/photos'

gsap.registerPlugin(ScrollTrigger)

interface ScrollGalleryProps {
  photos: Photo[]
  title?: string
  onPhotoClick?: (photo: Photo) => void
}

export default function ScrollGallery({ photos, title, onPhotoClick }: ScrollGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || photos.length === 0) return

    const tween = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: () => -(track.scrollWidth - track.clientWidth),
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [photos])

  return (
    <section ref={sectionRef} className="scroll-gallery relative py-20 md:py-28">
      {title && (
        <div className="mb-10 px-6 md:px-12">
          <p className="section-label">Keep scrolling</p>
          <h3 className="section-title mt-3">{title}</h3>
        </div>
      )}

      <div className="scroll-gallery-mask relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-5 px-6 will-change-transform md:gap-8 md:px-12"
        >
          {photos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => onPhotoClick?.(photo)}
              className="scroll-gallery-item group relative h-[55vh] w-[75vw] max-w-[480px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/[0.1] transition-shadow hover:shadow-[0_0_60px_rgba(56,189,248,0.15)] md:w-[38vw]"
            >
              <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left md:p-8">
                <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-accent">{photo.category}</p>
                <h4 className="font-display mt-2 text-xl text-text md:text-2xl">{photo.title}</h4>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
