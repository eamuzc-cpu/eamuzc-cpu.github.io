import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ProjectsSection from './components/ProjectsSection'
import ProjectPage from './components/ProjectPage'
import Skills from './components/Skills'
import Experience from './components/Experience'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import SocialRail from './components/SocialRail'
import TerminalOverlay from './components/TerminalOverlay'
import { savedHomeY, useProjectRoute } from './lib/route'

export default function App() {
  const slug = useProjectRoute()

  // Al cambiar de vista: página de proyecto arriba; portada hacia su ancla (#proyectos…) o a donde estaba.
  useEffect(() => {
    // behavior 'instant': el html tiene scroll suave y un salto largo se vería como un viaje por toda la página.
    if (slug) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(window.location.hash.slice(1))
    const target = id && document.getElementById(id)
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: savedHomeY(), behavior: 'instant' })
  }, [slug])

  return (
    <div className="relative min-h-dvh bg-void">
      <div className="grid-backdrop" />
      <div className="scanlines" aria-hidden="true" />
      <div className="relative z-10">
        <Navbar key={slug ? 'project' : 'home'} />
        <SocialRail />
        <main>
          {slug ? (
            <ProjectPage slug={slug} />
          ) : (
            <>
              <Hero />
              <About />
              <ProjectsSection />
              <Skills />
              <Experience />
              <ContactSection />
            </>
          )}
        </main>
        <Footer />
      </div>
      <TerminalOverlay />
    </div>
  )
}
