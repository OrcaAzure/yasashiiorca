import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function AmbientScene() {
  const glowRef = useRef<HTMLDivElement>(null)
  const glowSecondaryRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)
  const waveRef2 = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)
  const meshRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0.5, y: 0.4 })
  const smooth = useRef({ x: 0.5, y: 0.4 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf = 0
    const tick = () => {
      smooth.current.x += (target.current.x - smooth.current.x) * 0.06
      smooth.current.y += (target.current.y - smooth.current.y) * 0.06

      if (glowRef.current) {
        const x = smooth.current.x * 100
        const y = smooth.current.y * 100
        glowRef.current.style.transform = `translate(calc(${x}vw - 50%), calc(${y}vh - 50%))`
      }
      if (glowSecondaryRef.current) {
        const x = (1 - smooth.current.x) * 100
        const y = smooth.current.y * 80 + 10
        glowSecondaryRef.current.style.transform = `translate(calc(${x}vw - 50%), calc(${y}vh - 50%))`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(waveRef.current, { scale: 1.08, opacity: 0.9, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to(waveRef2.current, { scale: 1.12, opacity: 0.65, duration: 4.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 })
      gsap.to(glowRef.current, { scale: 1.2, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to(glowSecondaryRef.current, { scale: 1.25, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 })

      gsap.to(orb1Ref.current, { x: '15vw', y: '-8vh', duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to(orb2Ref.current, { x: '-12vw', y: '10vh', duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })
      gsap.to(orb3Ref.current, { x: '8vw', y: '12vh', duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })

      gsap.to(meshRef.current, { rotate: 360, duration: 60, repeat: -1, ease: 'none' })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #0a1820 0%, #050508 45%, #030306 100%)',
        }}
      />

      {/* Slow-rotating color mesh */}
      <div
        ref={meshRef}
        className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-40 will-change-transform"
        style={{
          background: 'conic-gradient(from 0deg, rgba(56,189,248,0.12), rgba(139,92,246,0.15), rgba(236,72,153,0.08), rgba(37,99,235,0.12), rgba(56,189,248,0.12))',
          filter: 'blur(80px)',
        }}
      />

      {/* Drifting color orbs */}
      <div
        ref={orb1Ref}
        className="absolute left-[10%] top-[20%] h-[280px] w-[280px] rounded-full will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />
      <div
        ref={orb2Ref}
        className="absolute right-[8%] top-[35%] h-[320px] w-[320px] rounded-full will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.32) 0%, transparent 70%)', filter: 'blur(55px)' }}
      />
      <div
        ref={orb3Ref}
        className="absolute bottom-[25%] left-[35%] h-[240px] w-[240px] rounded-full will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)', filter: 'blur(45px)' }}
      />

      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[min(90vw,720px)] w-[min(90vw,720px)] will-change-transform"
        style={{
          transform: 'translate(calc(50vw - 50%), calc(40vh - 50%))',
          background: 'radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(37,99,235,0.25) 35%, rgba(88,28,135,0.1) 55%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div
        ref={glowSecondaryRef}
        className="absolute left-0 top-0 h-[min(70vw,560px)] w-[min(70vw,560px)] will-change-transform"
        style={{
          transform: 'translate(calc(70vw - 50%), calc(50vh - 50%))',
          background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(59,130,246,0.15) 40%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-[55vh]">
        <div
          ref={waveRef}
          className="absolute -bottom-[35%] left-[-15%] right-[-15%] h-[70%] will-change-transform"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(56,189,248,0.2) 30%, rgba(147,197,253,0.5) 55%, rgba(255,255,255,0.6) 72%, rgba(56,189,248,0.4) 100%)',
            borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
            filter: 'blur(40px)',
            opacity: 0.75,
          }}
        />
        <div
          ref={waveRef2}
          className="absolute -bottom-[40%] left-[-5%] right-[-5%] h-[55%] will-change-transform"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.3) 40%, rgba(167,139,250,0.4) 70%, rgba(56,189,248,0.25) 100%)',
            borderRadius: '50%',
            filter: 'blur(55px)',
            opacity: 0.5,
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  )
}
