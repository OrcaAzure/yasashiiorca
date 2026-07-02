import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import LiquidEther from './LiquidEther'
import { siteConfig } from '../data/photos'

export default function YumeHero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-yume-hollow', { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power4.out', delay: 0.4 })
      gsap.fromTo('.hero-tagline', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.85 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="hero-landing relative flex min-h-screen flex-col justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#2563eb', '#38bdf8', '#a78bfa']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="grain-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.03]" />

      <div className="pointer-events-none relative z-20 flex flex-col items-center px-6 text-center">
        <h1
          className="hero-yume-hollow font-display select-none text-[clamp(5rem,18vw,14rem)] font-black uppercase leading-[0.85] tracking-[-0.04em]"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255,255,255,0.92)',
            paintOrder: 'stroke fill',
          }}
        >
          YUME
        </h1>
        <p className="hero-tagline mt-6 max-w-md font-body text-xs uppercase tracking-[0.35em] text-white/60">
          {siteConfig.tagline}
        </p>
        <a
          href="#work"
          className="hero-tagline pointer-events-auto mt-12 font-body text-[0.65rem] uppercase tracking-[0.4em] text-white/50 no-underline transition hover:text-white"
        >
          Scroll ↓
        </a>
      </div>

      <span className="pointer-events-none absolute left-6 top-6 z-20 font-display text-sm font-bold uppercase tracking-widest text-white md:left-10 md:top-10">
        {siteConfig.name.replace('_', ' ')}
      </span>
      <span className="pointer-events-none absolute right-6 top-6 z-20 font-body text-xs text-white/50 md:right-10 md:top-10">001</span>
    </section>
  )
}
