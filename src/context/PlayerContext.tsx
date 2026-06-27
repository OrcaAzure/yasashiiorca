import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { photos as allPhotos } from '../data/photos'
import type { Photo } from '../data/photos'

const PlayerContext = createContext<PlayerContextValue | null>(null)

interface PlayerContextValue {
  current: Photo | null
  queue: Photo[]
  isPlaying: boolean
  progress: number
  isExpanded: boolean
  play: (photo: Photo, queue?: Photo[]) => void
  togglePlay: () => void
  next: () => void
  prev: () => void
  setProgress: (value: number) => void
  expand: () => void
  collapse: () => void
  close: () => void
}

const TICK_MS = 350
const PROGRESS_STEP = 0.35

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Photo | null>(null)
  const [queue, setQueue] = useState<Photo[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const play = useCallback((photo: Photo, newQueue?: Photo[]) => {
    setCurrent(photo)
    setQueue(newQueue ?? allPhotos)
    setProgress(0)
    setIsPlaying(true)
  }, [])

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), [])

  const next = useCallback(() => {
    setCurrent((cur) => {
      if (!cur || queue.length === 0) return cur
      const idx = queue.findIndex((p) => p.id === cur.id)
      return queue[(idx + 1) % queue.length]
    })
    setProgress(0)
    setIsPlaying(true)
  }, [queue])

  const prev = useCallback(() => {
    setProgress((p) => {
      if (p > 3) return 0
      setCurrent((cur) => {
        if (!cur || queue.length === 0) return cur
        const idx = queue.findIndex((ph) => ph.id === cur.id)
        return queue[(idx - 1 + queue.length) % queue.length]
      })
      return 0
    })
    setIsPlaying(true)
  }, [queue])

  const close = useCallback(() => {
    setIsPlaying(false)
    setIsExpanded(false)
    setCurrent(null)
    setProgress(0)
  }, [])

  useEffect(() => {
    if (!isPlaying || !current) return
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p + PROGRESS_STEP >= 100) {
          setCurrent((cur) => {
            if (!cur || queue.length === 0) return cur
            const idx = queue.findIndex((ph) => ph.id === cur.id)
            return queue[(idx + 1) % queue.length]
          })
          return 0
        }
        return p + PROGRESS_STEP
      })
    }, TICK_MS)
    return () => clearInterval(id)
  }, [isPlaying, current, queue])

  const value = useMemo(
    () => ({
      current,
      queue,
      isPlaying,
      progress,
      isExpanded,
      play,
      togglePlay,
      next,
      prev,
      setProgress,
      expand: () => setIsExpanded(true),
      collapse: () => setIsExpanded(false),
      close,
    }),
    [current, queue, isPlaying, progress, isExpanded, play, togglePlay, next, prev, close],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
