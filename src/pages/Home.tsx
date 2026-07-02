import { useEffect, useState, type FormEvent } from 'react'
import YumeHero from '../components/YumeHero'
import WorkGrid from '../components/WorkGrid'
import AboutSection from '../components/AboutSection'
import ArchiveCloud from '../components/ArchiveCloud'
import ContactSection from '../components/ContactSection'
import SiteNav from '../components/SiteNav'
import Lightbox from '../components/Lightbox'
import { photos, getFeaturedPhotos } from '../data/photos'
import type { Photo } from '../data/photos'

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const featured = getFeaturedPhotos()

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    e.currentTarget.reset()
  }

  return (
    <>
      <YumeHero />

      <WorkGrid photos={featured.length ? featured : photos} allPhotos={photos} onView={setSelectedPhoto} />

      <AboutSection />

      <ArchiveCloud onPhotoClick={setSelectedPhoto} />

      <ContactSection
        photos={photos}
        onView={setSelectedPhoto}
        onSubmit={handleSubmit}
        submitted={submitted}
      />

      <SiteNav />

      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          photos={photos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={setSelectedPhoto}
        />
      )}
    </>
  )
}
