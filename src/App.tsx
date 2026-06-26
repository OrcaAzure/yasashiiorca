import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import Footer from './components/Footer'
import AmbientScene from './components/AmbientScene'
import Home from './pages/Home'
import Gallery from './pages/Gallery'

gsap.registerPlugin(ScrollTrigger)

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        ScrollTrigger.refresh()
      }, 150)
    } else if (location.pathname !== '/') {
      window.scrollTo(0, 0)
    }
  }, [location])

  return null
}

function ScrollTriggerRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    refresh()
    window.addEventListener('load', refresh)
    window.addEventListener('resize', refresh)
    const timer = setTimeout(refresh, 400)
    return () => {
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', refresh)
      clearTimeout(timer)
    }
  }, [])
  return null
}

export default function App() {
  return (
    <div className="app-shell relative z-[1]">
      <AmbientScene />
      <ScrollToHash />
      <ScrollTriggerRefresh />
      <Header />
      <main className="relative z-[2]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
