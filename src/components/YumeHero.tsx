import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { siteConfig, photos, heroCloudLayout } from '../data/photos'

export default function YumeHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const heroPhotos = photos.slice(0, heroCloudLayout.length)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-cloud-img', { opacity: 0, scale: 0.92 }, { opacity: 0.32, scale: 1, duration: 1.2, stagger: 0.06, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo('.hero-yume-outline', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out', delay: 0.5 })
      gsap.fromTo('.hero-yume-fill', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out', delay: 0.55 })
      gsap.fromTo('.hero-tagline', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.9 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="hero-landing relative flex min-h-screen flex-col justify-center overflow-hidden bg-black">
      {/* Static texture cloud — no movement */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {heroPhotos.map((photo, i) => {
          const pos = heroCloudLayout[i]
          if (!pos) return null
          return (
            <img
              key={photo.id}
              src={photo.src}
              alt=""
              className="hero-cloud-img absolute rounded-sm object-cover grayscale"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: pos.w,
                transform: `rotate(${pos.rot}deg)`,
                zIndex: pos.z,
              }}
            />
          )
        })}
      </div>

      {/* Grain texture overlay */}
      <div className="grain-overlay pointer-events-none absolute inset-0 z-20 opacity-[0.04]" />

      {/* YUME title */}
      <div className="relative z-30 flex flex-col items-center px-6 text-center">
        <div className="hero-title-wrap relative">
          <h1
            className="hero-yume-outline font-display select-none text-[clamp(5rem,18vw,14rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-transparent"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
          >
            YUME
          </h1>
          <h1
            className="hero-yume-fill font-display absolute inset-0 select-none text-[clamp(5rem,18vw,14rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white mix-blend-difference"
            aria-hidden="true"
          >
            YUME
          </h1>
        </div>
        <p className="hero-tagline mt-6 max-w-md font-body text-xs uppercase tracking-[0.35em] text-white/50">
          {siteConfig.tagline}
        </p>
        <a href="#work" className="hero-tagline mt-12 font-body text-[0.65rem] uppercase tracking-[0.4em] text-white/40 no-underline transition hover:text-white">
          Scroll ↓
        </a>
      </div>

      {/* Corner marks */}
      <span className="absolute left-6 top-6 z-30 font-display text-sm font-bold uppercase tracking-widest text-white md:left-10 md:top-10">
        {siteConfig.name.replace('_', ' ')}
      </span>
      <span className="absolute right-6 top-6 z-30 font-body text-xs text-white/40 md:right-10 md:top-10">001</span>
    </section>
  )
}
