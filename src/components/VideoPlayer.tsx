import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { usePlayer } from '../context/PlayerContext'

export default function VideoPlayer() {
  const { current, isPlaying, progress, isExpanded, togglePlay, next, prev, setProgress, collapse, close } = usePlayer()
  const frameRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!isExpanded || !imgRef.current) return
    gsap.killTweensOf(imgRef.current)
    if (isPlaying) {
      gsap.fromTo(imgRef.current, { scale: 1 }, { scale: 1.12, duration: 20, ease: 'none', repeat: -1, yoyo: true })
    } else {
      gsap.set(imgRef.current, { scale: 1 + progress / 500 })
    }
    return () => { gsap.killTweensOf(imgRef.current) }
  }, [isExpanded, isPlaying, current?.id])

  if (!isExpanded || !current) return null

  const formatTime = (pct: number) => {
    const secs = Math.floor((pct / 100) * 100)
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="video-player fixed inset-0 z-[100] flex flex-col bg-black">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <button type="button" onClick={collapse} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20">
          ↓ Minimize
        </button>
        <p className="text-sm font-medium text-white">{current.title}</p>
        <button type="button" onClick={close} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20">
          ✕ Close
        </button>
      </div>

      {/* Video frame */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-4">
        <div
          ref={frameRef}
          className="video-frame relative w-full max-w-5xl overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-white/10"
          style={{ aspectRatio: '16 / 9' }}
        >
          <img
            ref={imgRef}
            key={current.id}
            src={current.src.replace('w=800', 'w=1600')}
            alt={current.alt}
            className="h-full w-full object-cover will-change-transform"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* Center play overlay when paused */}
          {!isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center border-none bg-black/30"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-3xl text-black shadow-xl transition hover:scale-105">
                ▶
              </span>
            </button>
          )}

          {/* HUD corners */}
          <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded bg-red-600 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
              {isPlaying ? '● REC' : '⏸ PAUSED'}
            </span>
            <span className="text-xs text-white/80">{current.category}</span>
          </div>
          <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-xs text-white/70">
            {formatTime(progress)} / 1:40
          </div>
        </div>

        {/* Player controls */}
        <div className="mt-8 w-full max-w-5xl">
          <div className="mb-4 flex items-center gap-4">
            <img src={current.src} alt="" className="h-14 w-14 rounded object-cover" />
            <div>
              <h2 className="text-xl font-bold text-white">{current.title}</h2>
              <p className="text-sm text-spotify-muted">{current.category} · Yasashii Yume</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-10 text-right text-xs text-spotify-muted">{formatTime(progress)}</span>
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="player-scrubber flex-1"
            />
            <span className="w-10 text-xs text-spotify-muted">1:40</span>
          </div>

          <div className="mt-6 flex items-center justify-center gap-8">
            <button type="button" onClick={prev} className="text-2xl text-spotify-muted transition hover:text-white">⏮</button>
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-spotify-green text-2xl text-black transition hover:scale-105"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button type="button" onClick={next} className="text-2xl text-spotify-muted transition hover:text-white">⏭</button>
          </div>
        </div>
      </div>
    </div>
  )
}
