import { useState } from 'react'
import type { Photo } from '../data/photos'

interface PhotoCardProps {
  photo: Photo
  onClick?: () => void
}

export default function PhotoCard({ photo, onClick }: PhotoCardProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/[0.08] bg-bg-card transition-all hover:border-accent/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {!loaded && <div className="absolute inset-0 animate-pulse bg-bg-elevated" />}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 transition-all duration-[400ms] group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-body text-[9px] uppercase tracking-[0.2em] text-accent">{photo.category}</p>
          <h3 className="font-display text-lg text-text">{photo.title}</h3>
        </div>
      </div>
    </article>
  )
}
