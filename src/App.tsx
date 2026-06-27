import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Gallery from './pages/Gallery'

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150)
    } else if (location.pathname !== '/') {
      window.scrollTo(0, 0)
    }
  }, [location])

  return null
}

export default function App() {
  return (
    <div className="site min-h-screen bg-black text-white">
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </div>
  )
}
