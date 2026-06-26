export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function navigateToSection(path: string, sectionId: string) {
  if (window.location.pathname === path || path === '/') {
    scrollToSection(sectionId)
  }
}
