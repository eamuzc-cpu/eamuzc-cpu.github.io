import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ProjectsSection from './components/ProjectsSection'
import Skills from './components/Skills'
import Experience from './components/Experience'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import SocialRail from './components/SocialRail'
import TerminalOverlay from './components/TerminalOverlay'

export default function App() {
  return (
    <div className="relative min-h-dvh bg-void">
      <div className="grid-backdrop" />
      <div className="scanlines" aria-hidden="true" />
      <div className="relative z-10">
        <Navbar />
        <SocialRail />
        <main>
          <Hero />
          <About />
          <ProjectsSection />
          <Skills />
          <Experience />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <TerminalOverlay />
    </div>
  )
}
