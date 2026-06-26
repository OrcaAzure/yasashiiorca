import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { Photo } from '../data/photos'
import { siteConfig } from '../data/photos'

interface CinematicHeroProps {
  leftPhotos: Photo[]
  rightPhotos: Photo[]
  onPhotoClick?: (photo: Photo) => void
}

function ScrollColumn({
  photos,
  direction,
  onPhotoClick,
}: {
  photos: Photo[]
  direction: 'up' | 'down'
  onPhotoClick?: (photo: Photo) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const items = photos.length ? [...photos, ...photos] : []

  useEffect(() => {
    const track = trackRef.current
    if (!track || photos.length === 0) return

    const half = track.scrollHeight / 2
    gsap.set(track, { y: direction === 'down' ? -half : 0 })

    const tween = gsap.to(track, {
      y: direction === 'up' ? -half : 0,
      duration: Math.max(photos.length * 5, 18),
      repeat: -1,
      ease: 'none',
    })

    return () => { tween.kill() }
  }, [photos, direction])

  if (photos.length === 0) return null

  return (
    <div className="hero-scroll-column absolute inset-0 overflow-hidden">
      <div ref={trackRef} className="flex flex-col gap-4 will-change-transform">
        {items.map((photo, i) => (
          <button
            key={`${photo.id}-${i}`}
            type="button"
            onClick={() => onPhotoClick?.(photo)}
            className="hero-scroll-item block w-full shrink-0 cursor-pointer overflow-hidden border-none bg-transparent p-0"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-[42vh] w-full object-cover md:h-[48vh]"
              loading={i < 2 ? 'eager' : 'lazy'}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function CinematicHero({ leftPhotos, rightPhotos, onPhotoClick }: CinematicHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  const bgPhoto = rightPhotos[0]?.src ?? leftPhotos[0]?.src ?? ''

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vf-line', { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.inOut', delay: 0.2 })
      gsap.fromTo('.vf-line-h', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.inOut', delay: 0.35 })

      gsap.fromTo(leftColRef.current, { x: '-6%', opacity: 0 }, { x: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })
      gsap.fromTo(rightColRef.current, { x: '6%', opacity: 0 }, { x: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.65 })

      gsap.fromTo('.hero-mega-outline', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out', delay: 0.7 })
      gsap.fromTo('.hero-mega-fill', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out', delay: 0.75 })
      gsap.fromTo('.hero-serif-tag', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.55 })
      gsap.fromTo('.hero-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.3 })
    }, sectionRef)

    const onMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(leftColRef.current, { x: x * -14, duration: 1, ease: 'power2.out' })
      gsap.to(rightColRef.current, { x: x * 14, duration: 1, ease: 'power2.out' })
      if (titleRef.current) {
        gsap.to(titleRef.current, { x: x * -10, y: y * -6, duration: 1.2, ease: 'power2.out' })
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  if (leftPhotos.length === 0 && rightPhotos.length === 0) return null

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-cinematic relative -mx-[10px] min-h-[calc(100vh-80px)] overflow-hidden md:-mx-[14px]"
    >
      <div className="absolute inset-0 grid grid-cols-2">
        <div ref={leftColRef} className="hero-panel-left relative h-full overflow-hidden">
          <ScrollColumn photos={leftPhotos} direction="up" onPhotoClick={onPhotoClick} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg/20 via-transparent to-bg/70" />
        </div>
        <div ref={rightColRef} className="hero-panel-right relative h-full overflow-hidden">
          <ScrollColumn photos={rightPhotos} direction="down" onPhotoClick={onPhotoClick} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-bg/20 via-transparent to-bg/70" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <div className="vf-line absolute left-1/2 top-0 h-full w-px origin-top bg-white/25" />
        <div className="vf-line-h absolute left-0 top-[38%] h-px w-full origin-left bg-white/20" />
        <div className="vf-line-h absolute bottom-[22%] left-0 h-px w-full origin-left bg-white/20" />
        <div className="vf-line absolute left-[18%] top-0 h-full w-px origin-top bg-white/10 max-md:hidden" />
        <div className="vf-line absolute right-[18%] top-0 h-full w-px origin-top bg-white/10 max-md:hidden" />
      </div>

      <div ref={titleRef} className="pointer-events-none absolute inset-0 z-[15] flex flex-col items-center justify-center px-4">
        <p className="hero-serif-tag font-display mb-4 max-w-md text-center text-sm italic text-white/90 md:text-base">
          {siteConfig.lead}
        </p>
        <div className="hero-mega-wrap relative">
          <span
            className="hero-mega-outline font-cinematic block select-none text-[clamp(4.5rem,16vw,13rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-transparent"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.85)' }}
          >
            YUME
          </span>
          <span
            className="hero-mega-fill font-cinematic absolute inset-0 block select-none text-[clamp(4.5rem,16vw,13rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em]"
            style={{
              backgroundImage: bgPhoto ? `url(${bgPhoto})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            YUME
          </span>
        </div>
      </div>

      <a
        href="#featured"
        className="hero-scroll-hint absolute bottom-6 right-6 z-20 flex flex-col items-end gap-2 font-body text-[0.6rem] uppercase tracking-[0.35em] text-white/60 no-underline md:bottom-10 md:right-12"
      >
        <span>Scroll</span>
        <span className="block h-8 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
      </a>

      <div className="pointer-events-none absolute inset-0 z-[12] bg-gradient-to-b from-bg/30 via-transparent to-bg/60" />
    </section>
  )
}
