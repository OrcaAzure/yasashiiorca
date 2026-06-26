import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Photo } from '../data/photos'

gsap.registerPlugin(ScrollTrigger)

interface EditorialShowcaseProps {
  photos: Photo[]
  onPhotoClick?: (photo: Photo) => void
}

export default function EditorialShowcase({ photos, onPhotoClick }: EditorialShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLButtonElement>(null)
  const rightRef = useRef<HTMLButtonElement>(null)

  const left = photos[0]
  const right = photos[1] ?? photos[0]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' }

      gsap.fromTo(leftRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power4.out', scrollTrigger: trigger, immediateRender: false })
      gsap.fromTo(rightRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power4.out', scrollTrigger: trigger, immediateRender: false })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  if (!left) return null

  return (
    <section id="featured" ref={sectionRef} className="relative px-6 py-24 md:px-12">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="section-label">Selected work</p>
            <h2 className="section-title mt-3">Featured</h2>
          </div>
          <p className="font-display hidden text-right text-xl italic text-text-muted md:block">{left.title}</p>
        </div>

        <div className="grid min-h-[480px] grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-white/10 md:min-h-[560px] md:rounded-3xl">
          <button
            ref={leftRef}
            type="button"
            onClick={() => onPhotoClick?.(left)}
            className="group relative h-full min-h-[240px] cursor-pointer overflow-hidden border-none bg-transparent p-0"
          >
            <img src={left.src} alt={left.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg/40" />
            <span className="font-display absolute bottom-6 left-6 text-2xl italic text-white md:text-3xl">{left.title}</span>
          </button>
          <button
            ref={rightRef}
            type="button"
            onClick={() => onPhotoClick?.(right)}
            className="group relative h-full min-h-[240px] cursor-pointer overflow-hidden border-none bg-transparent p-0"
          >
            <img src={right.src} alt={right.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-bg/40" />
            <span className="font-display absolute bottom-6 right-6 text-right text-2xl italic text-white md:text-3xl">{right.title}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
