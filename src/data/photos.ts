export interface Photo {
  id: string
  src: string
  alt: string
  category: 'Portraits' | 'Editorial' | 'Landscapes'
  title: string
  location?: string
  featured?: boolean
  recent?: boolean
}

export const photos: Photo[] = [
  {
    id: 'p1',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    alt: 'Portrait with dramatic lighting',
    category: 'Portraits',
    title: 'Shadow & Light',
    featured: true,
  },
  {
    id: 'p2',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    alt: 'Portrait in natural light',
    category: 'Portraits',
    title: 'Golden Hour',
    featured: true,
    recent: true,
  },
  {
    id: 'p3',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
    alt: 'Expressive portrait',
    category: 'Portraits',
    title: 'Natural Joy',
    featured: true,
    recent: true,
  },
  {
    id: 'p4',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    alt: 'Character portrait',
    category: 'Portraits',
    title: 'Character Study',
    featured: true,
  },
  {
    id: 'p5',
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
    alt: 'Editorial fashion portrait',
    category: 'Editorial',
    title: 'Editorial I',
    featured: true,
    recent: true,
  },
  {
    id: 'p6',
    src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80',
    alt: 'Fashion editorial',
    category: 'Editorial',
    title: 'Editorial II',
    featured: true,
  },
  {
    id: 'p7',
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    alt: 'Narrative editorial',
    category: 'Editorial',
    title: 'Narrative',
    recent: true,
  },
  {
    id: 'p8',
    src: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80',
    alt: 'Creative editorial',
    category: 'Editorial',
    title: 'Creative Vision',
    recent: true,
  },
  {
    id: 'p9',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Mountain landscape at golden hour',
    category: 'Landscapes',
    title: 'Alpine Dawn',
    featured: true,
  },
  {
    id: 'p10',
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    alt: 'Fog over green hills',
    category: 'Landscapes',
    title: 'Morning Mist',
    featured: true,
    recent: true,
  },
  {
    id: 'p11',
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
    alt: 'Lake reflecting mountains',
    category: 'Landscapes',
    title: 'Mirror Lake',
    recent: true,
  },
  {
    id: 'p12',
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    alt: 'Sun rays through valley',
    category: 'Landscapes',
    title: 'Valley Glow',
    recent: true,
  },
]

export const categories = ['All', 'Portraits', 'Editorial', 'Landscapes'] as const

export const galleryCollections = [
  {
    id: 'portraits',
    title: 'Portraits',
    description: 'Intimate and expressive portrait sessions',
    cover: photos.find((p) => p.category === 'Portraits')!.src,
    category: 'Portraits' as const,
  },
  {
    id: 'editorial',
    title: 'Editorial',
    description: 'Fashion and narrative photography',
    cover: photos.find((p) => p.category === 'Editorial')!.src,
    category: 'Editorial' as const,
  },
  {
    id: 'landscapes',
    title: 'Landscapes',
    description: 'Breathtaking natural landscapes',
    cover: photos.find((p) => p.category === 'Landscapes')!.src,
    category: 'Landscapes' as const,
  },
]

export const siteConfig = {
  name: 'Yasashii_Yume',
  tagline: 'Contemporary — Cinematic — Intimate',
  subtitle: 'Contemporary — Cinematic — Intimate Photography',
  email: 'hello@yasashii.example',
  phone: '+1 (234) 567-8901',
  location: 'Based in Tokyo, Japan',
  availability: 'Available for projects worldwide',
  instagram: 'https://instagram.com/yasashii_yume',
  twitter: 'https://twitter.com/yasashii_yume',
  pinterest: 'https://pinterest.com/yasashii_yume',
  behance: 'https://behance.net/yasashii_yume',
  bio: `I work with natural light and film-inspired color palettes to craft images that feel timeless and intimate. My approach combines technical precision with artistic vision to create photographs that tell stories and evoke emotions.`,
  lead: 'I make portraits, editorials and landscapes with film-inspired color. Desktop-first, gallery-ready.',
  pills: ['image‑making', 'Breath‑taking', 'Fine Art & Commercial'],
  services: [
    'Portrait Sessions',
    'Editorial Photography',
    'Landscape Photography',
    'Commercial Projects',
  ],
}

export function getPhotosByCategory(category: Photo['category']) {
  return photos.filter((p) => p.category === category)
}

export function getFeaturedPhotos() {
  return photos.filter((p) => p.featured)
}

export function getRecentPhotos() {
  return photos.filter((p) => p.recent)
}

export const backgroundSlides = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
]

export const creativeCardPhotos = photos.slice(0, 5)
