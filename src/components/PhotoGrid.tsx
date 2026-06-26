import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Photo } from '../data/photos'

gsap.registerPlugin(ScrollTrigger)

interface PhotoGridProps {
  photos: Photo[]
  variant?: 'bento' | 'uniform'
  onPhotoClick?: (photo: Photo) => void
  className?: string
}

function PhotoTile({
  photo,
  className = '',
  onClick,
  index,
}: {
  photo: Photo
  className?: string
  onClick?: () => void
  index: number
}) {
  const tileRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = tileRef.current
    if (!el) return

    const img = el.querySelector('img')
    gsap.fromTo(
      el,
      { clipPath: 'inset(100% 0 0 0)', opacity: 0, y: 40 },
      {
        clipPath: 'inset(0% 0 0 0)',
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        delay: (index % 6) * 0.08,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      },
    )

    const onEnter = () => {
      gsap.to(img, { scale: 1.08, duration: 0.7, ease: 'power2.out' })
      gsap.to(el, { boxShadow: '0 0 40px rgba(56,189,248,0.2)', duration: 0.4 })
    }
    const onLeave = () => {
      gsap.to(img, { scale: 1, duration: 0.7, ease: 'power2.out' })
      gsap.to(el, { boxShadow: '0 0 0px rgba(56,189,248,0)', duration: 0.4 })
    }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [index])

  return (
    <button
      ref={tileRef}
      type="button"
      onClick={onClick}
      className={`photo-tile group relative cursor-pointer overflow-hidden rounded-xl border border-white/[0.08] bg-bg-card text-left ${className}`}
    >
      <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover will-change-transform" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-body text-[0.55rem] uppercase tracking-[0.25em] text-accent">{photo.category}</p>
        <h3 className="font-display mt-1 text-xl text-text">{photo.title}</h3>
      </div>
    </button>
  )
}

const bentoSpans = [
  'col-span-2 row-span-2 min-h-[320px]',
  'col-span-1 row-span-2 min-h-[320px]',
  'col-span-1 row-span-1 min-h-[200px]',
  'col-span-1 row-span-1 min-h-[200px]',
  'col-span-2 row-span-1 min-h-[220px]',
  'col-span-1 row-span-1 min-h-[200px]',
]

export default function PhotoGrid({ photos, variant = 'uniform', onPhotoClick, className = '' }: PhotoGridProps) {
  if (variant === 'bento') {
    return (
      <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 ${className}`}>
        {photos.slice(0, 6).map((photo, i) => (
          <PhotoTile
            key={photo.id}
            photo={photo}
            index={i}
            className={bentoSpans[i] ?? 'col-span-1 min-h-[200px]'}
            onClick={() => onPhotoClick?.(photo)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {photos.map((photo, i) => (
        <PhotoTile
          key={photo.id}
          photo={photo}
          index={i}
          className="aspect-[3/4] min-h-[280px]"
          onClick={() => onPhotoClick?.(photo)}
        />
      ))}
    </div>
  )
}
