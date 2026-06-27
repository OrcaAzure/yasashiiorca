import { usePlayer } from '../../context/PlayerContext'

const PHOTO_DURATION = 100

export default function NowPlayingBar() {
  const { current, isPlaying, progress, togglePlay, next, prev, setProgress, expand } = usePlayer()

  if (!current) {
    return (
      <footer className="player-bar flex h-[72px] items-center justify-center border-t border-white/10 bg-spotify-elevated px-4">
        <p className="text-xs text-spotify-muted">Select a photo to start viewing</p>
      </footer>
    )
  }

  const formatTime = (pct: number) => {
    const secs = Math.floor((pct / 100) * PHOTO_DURATION)
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <footer className="player-bar grid h-[90px] grid-cols-1 items-center gap-2 border-t border-white/10 bg-spotify-elevated px-4 md:grid-cols-[1fr_2fr_1fr] md:gap-4">
      <button type="button" onClick={expand} className="flex min-w-0 cursor-pointer items-center gap-3 border-none bg-transparent text-left">
        <img src={current.src} alt={current.alt} className="h-14 w-14 shrink-0 rounded object-cover shadow-lg" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white hover:underline">{current.title}</p>
          <p className="truncate text-xs text-spotify-muted">{current.category}</p>
        </div>
      </button>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <ControlBtn label="Shuffle" small>⇄</ControlBtn>
          <ControlBtn label="Previous" onClick={prev}>⏮</ControlBtn>
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-black transition hover:scale-105"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <ControlBtn label="Next" onClick={next}>⏭</ControlBtn>
          <ControlBtn label="Repeat" small>↻</ControlBtn>
        </div>

        <div className="flex w-full max-w-md items-center gap-2">
          <span className="w-10 text-right text-[0.65rem] text-spotify-muted">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="player-scrubber flex-1"
            aria-label="Progress"
          />
          <span className="w-10 text-[0.65rem] text-spotify-muted">{formatTime(100)}</span>
        </div>
      </div>

      <div className="hidden items-center justify-end gap-3 md:flex">
        <ControlBtn label="Queue" small>☰</ControlBtn>
        <div className="flex items-center gap-2">
          <span className="text-spotify-muted">🔊</span>
          <input type="range" min={0} max={100} defaultValue={80} className="player-scrubber w-24" aria-label="Volume" />
        </div>
        <button type="button" onClick={expand} className="border-none bg-transparent text-spotify-muted transition hover:text-white" aria-label="Expand player">
          ⛶
        </button>
      </div>
    </footer>
  )
}

function ControlBtn({
  children,
  onClick,
  label,
  small,
}: {
  children: React.ReactNode
  onClick?: () => void
  label: string
  small?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`border-none bg-transparent text-spotify-muted transition hover:text-white ${small ? 'text-sm' : 'text-base'}`}
    >
      {children}
    </button>
  )
}
