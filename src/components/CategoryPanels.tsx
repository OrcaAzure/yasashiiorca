import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Photo } from '../data/photos'

gsap.registerPlugin(ScrollTrigger)

interface CategoryPanel {
  label: string
  category: Photo['category']
  cover: Photo
}

interface CategoryPanelsProps {
  panels: CategoryPanel[]
}

export default function CategoryPanels({ panels }: CategoryPanelsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.category-panel',
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power4.out',
          immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleClick = (panel: CategoryPanel) => {
    navigate(`/gallery?category=${panel.category}`)
  }

  return (
    <section id="portfolio" ref={sectionRef} className="relative -mx-[10px] md:-mx-[14px]">
      <div className="grid min-h-[70vh] grid-cols-1 md:min-h-[85vh] md:grid-cols-3">
        {panels.map((panel) => (
          <button
            key={panel.category}
            type="button"
            onClick={() => handleClick(panel)}
            className="category-panel group relative min-h-[50vh] cursor-pointer overflow-hidden border-none bg-transparent p-0 md:min-h-0"
          >
            <img
              src={panel.cover.src}
              alt={panel.cover.alt}
              className="panel-img absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-bg/50 transition-colors duration-500 group-hover:bg-bg/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="font-display text-3xl tracking-[0.25em] text-white transition-transform duration-500 group-hover:scale-105 md:text-4xl lg:text-5xl">
                {panel.label}
              </h3>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <p className="absolute bottom-8 left-0 right-0 translate-y-4 font-body text-[0.6rem] uppercase tracking-[0.3em] text-accent opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              View gallery →
            </p>
          </button>
        ))}
      </div>
    </section>
  )
}
