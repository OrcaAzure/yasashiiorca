import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { Photo } from '../data/photos'

interface LightboxProps {
  photo: Photo
  photos: Photo[]
  onClose: () => void
  onNavigate: (photo: Photo) => void
}

export default function Lightbox({ photo, photos, onClose, onNavigate }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const currentIndex = photos.findIndex((p) => p.id === photo.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < photos.length - 1

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 })
    gsap.fromTo(contentRef.current, { y: 24, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' })

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(photos[currentIndex - 1])
      if (e.key === 'ArrowRight' && hasNext) onNavigate(photos[currentIndex + 1])
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [photo, currentIndex, hasPrev, hasNext, onClose, onNavigate, photos])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md md:p-8"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div ref={contentRef} className="glass-panel relative max-h-[90vh] w-full max-w-4xl rounded-2xl p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={handleClose} className="absolute right-4 top-4 font-body text-[0.6rem] uppercase tracking-[0.2em] text-text-muted hover:text-text md:right-6 md:top-6">
          Close
        </button>
        <img src={photo.src.replace('w=800', 'w=1600')} alt={photo.alt} className="max-h-[70vh] w-full rounded-xl object-contain" />
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-4">
          <div>
            <p className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-text-muted">{photo.category}</p>
            <h3 className="font-display text-2xl text-text">{photo.title}</h3>
          </div>
          <div className="flex gap-2">
            <button type="button" disabled={!hasPrev} onClick={() => hasPrev && onNavigate(photos[currentIndex - 1])} className="btn-ghost px-4 py-2 text-[0.55rem] disabled:opacity-30">
              Prev
            </button>
            <button type="button" disabled={!hasNext} onClick={() => hasNext && onNavigate(photos[currentIndex + 1])} className="btn-ghost px-4 py-2 text-[0.55rem] disabled:opacity-30">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
