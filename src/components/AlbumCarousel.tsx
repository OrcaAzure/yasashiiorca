import { motion } from 'framer-motion'
import { Autoplay, EffectCards, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Photo } from '../data/photos'
import { cn } from '../lib/utils'

import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface AlbumCarouselProps {
  photos: Photo[]
  className?: string
  loop?: boolean
  autoplay?: boolean
  spaceBetween?: number
  showPagination?: boolean
  showNavigation?: boolean
  variant?: 'featured' | 'grid'
}

export default function AlbumCarousel({
  photos,
  className,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
  showPagination = false,
  showNavigation = false,
  variant = 'grid',
}: AlbumCarouselProps) {
  if (photos.length === 0) return null

  const isGrid = variant === 'grid'
  const slides = photos.length > 1 ? photos : [photos[0], photos[0]]

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className={cn('album-carousel relative w-full max-w-3xl', className)}
    >
      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 1000,
                disableOnInteraction: false,
              }
            : false
        }
        effect="cards"
        grabCursor
        loop={loop && slides.length > 1}
        pagination={showPagination ? { clickable: true } : false}
        navigation={
          showNavigation
            ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
            : false
        }
        className={cn(
          'album-swiper-cards',
          isGrid
            ? 'album-swiper-grid h-[380px] w-[260px] max-w-[72vw]'
            : 'album-swiper h-[420px] w-[280px] md:h-[480px] md:w-[300px]',
        )}
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
      >
        {slides.map((photo, index) => (
          <SwiperSlide key={`${photo.id}-${index}`} className="rounded-3xl">
            <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" loading="lazy" />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  )
}

export function getAlbumSlides(photo: Photo, allPhotos: Photo[]): Photo[] {
  const related = allPhotos.filter((p) => p.category === photo.category && p.id !== photo.id)
  const fallback = allPhotos.filter((p) => p.id !== photo.id && !related.some((r) => r.id === p.id))
  const pool = [...related, ...fallback]
  const unique = [photo, ...pool]

  const slides: Photo[] = []
  for (let i = 0; i < 11 && unique.length > 0; i += 1) {
    slides.push(unique[i % unique.length])
  }

  return slides.length >= 2 ? slides : [photo, photo, photo, photo]
}
