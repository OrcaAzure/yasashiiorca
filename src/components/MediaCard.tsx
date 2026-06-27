import { usePlayer } from '../context/PlayerContext'
import type { Photo } from '../data/photos'

interface MediaCardProps {
  photo: Photo
  queue?: Photo[]
  subtitle?: string
}

export default function MediaCard({ photo, queue, subtitle }: MediaCardProps) {
  const { play, current, isPlaying } = usePlayer()
  const isActive = current?.id === photo.id

  return (
    <button
      type="button"
      onClick={() => play(photo, queue)}
      className="media-card group w-[160px] shrink-0 cursor-pointer rounded-lg border-none bg-spotify-highlight/40 p-4 text-left transition hover:bg-spotify-highlight md:w-[180px]"
    >
      <div className="relative mb-4 overflow-hidden rounded-md shadow-lg">
        <img src={photo.src} alt={photo.alt} className="aspect-square w-full object-cover transition group-hover:scale-105" loading="lazy" />
        <div className={`absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-spotify-green shadow-lg transition ${isActive && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <span className="text-black">{isActive && isPlaying ? '⏸' : '▶'}</span>
        </div>
      </div>
      <p className="truncate text-sm font-semibold text-white">{photo.title}</p>
      <p className="mt-1 truncate text-xs text-spotify-muted">{subtitle ?? photo.category}</p>
    </button>
  )
}

interface PlaylistCardProps {
  title: string
  description: string
  cover: string
  onClick?: () => void
}

export function PlaylistCard({ title, description, cover, onClick }: PlaylistCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="media-card group w-[160px] shrink-0 cursor-pointer rounded-lg border-none bg-spotify-highlight/40 p-4 text-left transition hover:bg-spotify-highlight md:w-[180px]"
    >
      <div className="relative mb-4 overflow-hidden rounded-md shadow-lg">
        <img src={cover} alt={title} className="aspect-square w-full object-cover transition group-hover:scale-105" />
        <div className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-spotify-green opacity-0 shadow-lg transition group-hover:opacity-100">
          <span className="text-black">▶</span>
        </div>
      </div>
      <p className="truncate text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 line-clamp-2 text-xs text-spotify-muted">{description}</p>
    </button>
  )
}

interface TrackRowProps {
  photo: Photo
  index: number
  queue: Photo[]
}

export function TrackRow({ photo, index, queue }: TrackRowProps) {
  const { play, current, isPlaying, togglePlay } = usePlayer()
  const isActive = current?.id === photo.id

  const handlePlay = () => {
    if (isActive) togglePlay()
    else play(photo, queue)
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={`track-row grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border-none px-4 py-2 text-left transition ${
        isActive ? 'bg-white/10' : 'bg-transparent hover:bg-white/5'
      }`}
    >
      <span className={`w-6 text-center text-sm ${isActive ? 'text-spotify-green' : 'text-spotify-muted'}`}>
        {isActive && isPlaying ? '♫' : index + 1}
      </span>
      <div className="flex min-w-0 items-center gap-3">
        <img src={photo.src} alt="" className="h-10 w-10 rounded object-cover" />
        <div className="min-w-0">
          <p className={`truncate text-sm ${isActive ? 'text-spotify-green' : 'text-white'}`}>{photo.title}</p>
          <p className="truncate text-xs text-spotify-muted">{photo.category}</p>
        </div>
      </div>
      <span className="text-xs text-spotify-muted">1:40</span>
    </button>
  )
}
