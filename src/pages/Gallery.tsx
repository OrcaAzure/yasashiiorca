import { Link, useSearchParams } from 'react-router-dom'
import { photos, categories, siteConfig } from '../data/photos'
import type { Photo } from '../data/photos'
import { useState, useEffect } from 'react'
import Lightbox from '../components/Lightbox'

export default function Gallery() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') ?? 'All'
  const [activeCategory, setActiveCategory] = useState(
    categories.includes(categoryParam as (typeof categories)[number]) ? categoryParam : 'All',
  )
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  useEffect(() => {
    setActiveCategory(categories.includes(categoryParam as (typeof categories)[number]) ? categoryParam : 'All')
  }, [categoryParam])

  const filtered = activeCategory === 'All' ? photos : photos.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-black px-6 py-12 md:px-12">
      <Link to="/" className="font-body text-xs uppercase tracking-widest text-white/40 no-underline hover:text-white">
        ← Home
      </Link>
      <h1 className="mt-8 font-display text-4xl font-black uppercase text-white md:text-6xl">Library</h1>
      <p className="mt-2 font-body text-sm text-white/40">{siteConfig.name.replace('_', ' ')}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={cat === 'All' ? '/gallery' : `/gallery?category=${cat}`}
            className={`rounded-full px-4 py-1.5 font-body text-xs uppercase tracking-wider no-underline ${
              activeCategory === cat ? 'bg-white text-black' : 'text-white/40 hover:text-white'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setSelectedPhoto(photo)}
            className="group cursor-pointer overflow-hidden border-none bg-transparent p-0 text-left"
          >
            <img src={photo.src} alt={photo.alt} className="aspect-square w-full object-cover grayscale transition group-hover:grayscale-0" />
            <p className="mt-2 truncate font-body text-xs text-white">{photo.title}</p>
            <p className="text-[0.65rem] text-white/35">{photo.year}</p>
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <Lightbox photo={selectedPhoto} photos={filtered} onClose={() => setSelectedPhoto(null)} onNavigate={setSelectedPhoto} />
      )}
    </div>
  )
}
