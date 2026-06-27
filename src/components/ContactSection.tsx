import { useEffect, useRef, type FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Photo } from '../data/photos'
import { siteConfig } from '../data/photos'

gsap.registerPlugin(ScrollTrigger)

interface ContactSectionProps {
  photos: Photo[]
  onView: (photo: Photo) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  submitted: boolean
}

export default function ContactSection({ photos, onView, onSubmit, submitted }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const gridPhotos = photos.slice(0, 6)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-grid-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.project-grid', start: 'top 85%', toggleActions: 'play none none none' },
          immediateRender: false,
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="border-t border-white/10 bg-black">
      {/* Glitch-style brand strip */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-12">
        <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-white">Yasashii</span>
        <span className="font-display text-lg text-white">&</span>
        <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-white">Yume</span>
      </div>

      {/* 2×3 project grid */}
      <div className="project-grid mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
          {gridPhotos.map((photo, i) => (
            <article key={photo.id} className="project-grid-item group">
              <button
                type="button"
                onClick={() => onView(photo)}
                className="block w-full cursor-pointer border-none bg-transparent p-0"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:opacity-85"
                    loading="lazy"
                  />
                </div>
              </button>
              <div className="flex items-center justify-between bg-black px-3 py-2.5 ring-1 ring-inset ring-white/10">
                <p className="truncate font-body text-[0.7rem] text-white">
                  <span className="mr-2 text-white/45">{String(i + 1).padStart(2, '0')}</span>
                  {photo.title}
                </p>
                <button
                  type="button"
                  onClick={() => onView(photo)}
                  className="ml-3 shrink-0 border-none bg-transparent font-body text-[0.65rem] text-white/45 transition group-hover:text-white"
                >
                  Full Project ↗
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <div className="border-t border-white/10 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="font-body text-[0.65rem] uppercase tracking-[0.35em] text-white/35">Contact</p>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-white md:text-5xl">Get in touch</h2>
            <div className="mt-8 space-y-2 font-body text-sm text-white/50">
              <a href={`mailto:${siteConfig.email}`} className="block text-accent-gold no-underline hover:underline">
                {siteConfig.email}
              </a>
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.location}</p>
            </div>
            <div className="mt-8 flex gap-6">
              {[
                { label: 'Instagram', href: siteConfig.instagram },
                { label: 'Twitter', href: siteConfig.twitter },
                { label: 'Behance', href: siteConfig.behance },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[0.65rem] uppercase tracking-wider text-white/35 no-underline hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Name"
              required
              className="w-full border-b border-white/20 bg-transparent py-3 font-body text-sm text-white outline-none placeholder:text-white/25 focus:border-accent-gold"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full border-b border-white/20 bg-transparent py-3 font-body text-sm text-white outline-none placeholder:text-white/25 focus:border-accent-gold"
            />
            <textarea
              name="message"
              placeholder="Message"
              required
              rows={4}
              className="w-full resize-none border-b border-white/20 bg-transparent py-3 font-body text-sm text-white outline-none placeholder:text-white/25 focus:border-accent-gold"
            />
            <button
              type="submit"
              className="mt-4 border border-white/30 bg-transparent px-8 py-3 font-body text-xs uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
            >
              Send message
            </button>
            {submitted && <p className="text-xs text-accent-gold">Thank you — I&apos;ll reply soon.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
