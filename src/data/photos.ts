export interface Photo {
  id: string
  src: string
  alt: string
  category: 'Portraits' | 'Editorial' | 'Landscapes'
  title: string
  year: number
  location?: string
  featured?: boolean
  recent?: boolean
}

export const archiveYears = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const

export const archiveCategories = ['All', 'Portraits', 'Editorial', 'Landscapes'] as const

export const photos: Photo[] = [
  {
    id: 'p1',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    alt: 'Portrait with dramatic lighting',
    category: 'Portraits',
    title: 'Shadow & Light',
    year: 2019,
    featured: true,
  },
  {
    id: 'p2',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    alt: 'Portrait in natural light',
    category: 'Portraits',
    title: 'Golden Hour',
    year: 2019,
    featured: true,
    recent: true,
  },
  {
    id: 'p3',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
    alt: 'Expressive portrait',
    category: 'Portraits',
    title: 'Natural Joy',
    year: 2020,
    featured: true,
    recent: true,
  },
  {
    id: 'p4',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    alt: 'Character portrait',
    category: 'Portraits',
    title: 'Character Study',
    year: 2020,
    featured: true,
  },
  {
    id: 'p5',
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
    alt: 'Editorial fashion portrait',
    category: 'Editorial',
    title: 'Editorial I',
    year: 2021,
    featured: true,
    recent: true,
  },
  {
    id: 'p6',
    src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80',
    alt: 'Fashion editorial',
    category: 'Editorial',
    title: 'Editorial II',
    year: 2021,
    featured: true,
  },
  {
    id: 'p7',
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    alt: 'Narrative editorial',
    category: 'Editorial',
    title: 'Narrative',
    year: 2022,
    recent: true,
  },
  {
    id: 'p8',
    src: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80',
    alt: 'Creative editorial',
    category: 'Editorial',
    title: 'Creative Vision',
    year: 2022,
    recent: true,
  },
  {
    id: 'p9',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Mountain landscape at golden hour',
    category: 'Landscapes',
    title: 'Alpine Dawn',
    year: 2023,
    featured: true,
  },
  {
    id: 'p10',
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    alt: 'Fog over green hills',
    category: 'Landscapes',
    title: 'Morning Mist',
    year: 2024,
    featured: true,
    recent: true,
  },
  {
    id: 'p11',
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
    alt: 'Lake reflecting mountains',
    category: 'Landscapes',
    title: 'Mirror Lake',
    year: 2025,
    recent: true,
  },
  {
    id: 'p12',
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    alt: 'Sun rays through valley',
    category: 'Landscapes',
    title: 'Valley Glow',
    year: 2026,
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
  pinterest: 'https://instagram.com/yasashii_yume',
  behance: 'https://behance.net/yasashii_yume',
  bio: `I work with natural light and film-inspired color palettes to craft images that feel timeless and intimate. My approach combines technical precision with artistic vision to create photographs that tell stories and evoke emotions.`,
  lead: 'I make portraits, editorials and landscapes with film-inspired color.',
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

export function getPhotosByYear(year: number) {
  return photos.filter((p) => p.year === year)
}

export function getFeaturedPhotos() {
  return photos.filter((p) => p.featured)
}

export function getRecentPhotos() {
  return photos.filter((p) => p.recent)
}

/** Fixed positions for hero texture cloud (percent-based) */
export const heroCloudLayout = [
  { x: 8, y: 6, w: 155, rot: -6, z: 1 },
  { x: 72, y: 4, w: 130, rot: 4, z: 2 },
  { x: 42, y: 18, w: 110, rot: -2, z: 3 },
  { x: 18, y: 52, w: 145, rot: 3, z: 4 },
  { x: 65, y: 48, w: 125, rot: -5, z: 5 },
  { x: 5, y: 78, w: 120, rot: 2, z: 6 },
  { x: 78, y: 72, w: 140, rot: -3, z: 7 },
  { x: 38, y: 68, w: 100, rot: 5, z: 8 },
  { x: 52, y: 38, w: 95, rot: -4, z: 9 },
  { x: 28, y: 28, w: 105, rot: 1, z: 10 },
]

/** Denser layout for archive section */
export const archiveCloudLayout = [
  { x: 38, y: 8, w: 100, rot: -4, z: 1 },
  { x: 52, y: 14, w: 85, rot: 3, z: 2 },
  { x: 30, y: 22, w: 110, rot: -2, z: 3 },
  { x: 58, y: 28, w: 95, rot: 5, z: 4 },
  { x: 42, y: 35, w: 105, rot: -3, z: 5 },
  { x: 34, y: 44, w: 90, rot: 2, z: 6 },
  { x: 55, y: 42, w: 115, rot: -5, z: 7 },
  { x: 40, y: 52, w: 88, rot: 4, z: 8 },
  { x: 48, y: 58, w: 102, rot: -1, z: 9 },
  { x: 36, y: 65, w: 92, rot: 3, z: 10 },
  { x: 54, y: 68, w: 98, rot: -4, z: 11 },
  { x: 44, y: 75, w: 86, rot: 2, z: 12 },
]
