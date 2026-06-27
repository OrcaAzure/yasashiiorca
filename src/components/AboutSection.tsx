import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutContent } from '../data/about'
import { siteConfig } from '../data/photos'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-copy',
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
          immediateRender: false,
        },
      )
      gsap.fromTo(
        '.about-visual',
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
          immediateRender: false,
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="info" ref={sectionRef} className="border-t border-white/10 bg-black">
      <div className="grid min-h-[90vh] grid-cols-1 lg:grid-cols-2">
        {/* Left — copy + metadata */}
        <div className="about-copy flex flex-col justify-between px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
          <div>
            <div className="space-y-8 font-body text-sm leading-[1.85] text-accent-gold md:text-[0.95rem]">
              <p>
                <span className="font-semibold text-accent-gold">Idea </span>
                {aboutContent.idea}
              </p>
              <p>
                <span className="font-semibold text-accent-gold">Insight </span>
                {aboutContent.insight}
              </p>
              <p className="text-accent-gold/85">{aboutContent.description}</p>
            </div>

            <dl className="mt-14 border-t border-white/15">
              {aboutContent.meta.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-[120px_1fr] gap-4 border-b border-white/15 py-4 md:grid-cols-[140px_1fr]">
                  <dt className="font-body text-xs uppercase tracking-wider text-white/40">{label}</dt>
                  <dd className="font-body text-sm text-accent-gold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-16 font-display text-sm font-bold uppercase tracking-[0.35em] text-white">
            {siteConfig.name.replace('_', ' ')}
          </p>
        </div>

        {/* Right — stacked images */}
        <div className="about-visual relative flex flex-col">
          {aboutContent.images.map((src, i) => (
            <div key={src} className="relative flex-1 min-h-[240px] lg:min-h-0">
              <img src={src} alt={i === 0 ? 'Photographer at work' : 'Behind the scenes'} className="h-full w-full object-cover" />
            </div>
          ))}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 py-5 md:px-8">
            <span className="font-display text-lg text-white">&</span>
            <span className="font-display text-sm font-bold uppercase tracking-[0.4em] text-white">Yume</span>
          </div>
        </div>
      </div>
    </section>
  )
}
