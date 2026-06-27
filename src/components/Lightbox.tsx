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
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' })

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
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onClose })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4 md:p-8"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div ref={contentRef} className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={handleClose} className="absolute -top-10 right-0 border-none bg-transparent font-body text-xs uppercase tracking-widest text-white/50 hover:text-white md:right-0">
          Close ✕
        </button>
        <img src={photo.src.replace('w=800', 'w=1600')} alt={photo.alt} className="max-h-[80vh] w-full object-contain" />
        <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            <p className="font-body text-[0.65rem] uppercase tracking-widest text-white/40">
              {photo.category} · {photo.year}
            </p>
            <h3 className="mt-1 font-display text-2xl text-white">{photo.title}</h3>
          </div>
          <div className="flex gap-3">
            <button type="button" disabled={!hasPrev} onClick={() => hasPrev && onNavigate(photos[currentIndex - 1])} className="border border-white/20 bg-transparent px-4 py-2 font-body text-[0.65rem] uppercase tracking-wider text-white disabled:opacity-20">
              Prev
            </button>
            <button type="button" disabled={!hasNext} onClick={() => hasNext && onNavigate(photos[currentIndex + 1])} className="border border-white/20 bg-transparent px-4 py-2 font-body text-[0.65rem] uppercase tracking-wider text-white disabled:opacity-20">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
