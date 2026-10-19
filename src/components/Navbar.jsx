import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { LANGS, useLang } from '../i18n'

const LINKS = [
  { href: '#sobre-mi', label: ui.nav.about },
  { href: '#proyectos', label: ui.nav.projects },
  { href: '#habilidades', label: ui.nav.skills },
  { href: '#experiencia', label: ui.nav.experience },
  { href: '#contacto', label: ui.nav.contact },
]

// toggle estilo flag de CLI: --lang es|en
function LangToggle({ className = '' }) {
  const { lang, setLang, t } = useLang()
  return (
    <div role="group" aria-label={t(ui.nav.language)} className={`flex items-center font-mono text-xs text-slate-500 ${className}`}>
      <span className="mr-1 hidden sm:inline">--lang</span>
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="px-0.5 text-slate-700">|</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`flex h-7 min-w-7 items-center justify-center rounded px-1 transition-colors ${
              lang === l ? 'text-cyan-soft text-glow' : 'hover:text-slate-200'
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  )
}

const SECTION_IDS = ['inicio', ...LINKS.map((l) => l.href.slice(1))]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('inicio')
  const reduce = useReducedMotion()
  const { t } = useLang()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 12)
  })

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between border-b px-4 transition-colors duration-300 sm:px-6 lg:px-8 ${
          scrolled
            ? 'border-line/80 bg-void/80 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#inicio" className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-slate-100">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald shadow-[0_0_8px_theme(colors.emerald)]" />
          [EAMUZ&nbsp;<span className="text-magenta text-glow-magenta">//</span>&nbsp;Automation]
          <span aria-hidden="true" className="inline-block w-[0.5ch] text-cyan-soft animate-blink">
            _
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`text-sm transition-colors ${
                  isActive ? 'text-cyan-soft' : 'text-slate-300 hover:text-cyan-soft'
                }`}
              >
                {t(link.label)}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LangToggle />
          <a
            href={t(profile.cvPath)}
            download
            className="flex items-center gap-2 rounded border border-line bg-surface px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-cyan/60 hover:text-cyan-soft"
          >
            <Download className="h-4 w-4" strokeWidth={2} />
            {t(ui.nav.downloadCv)}
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
        <LangToggle />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded border border-line text-slate-200 lg:hidden"
          aria-label={t(open ? ui.nav.closeMenu : ui.nav.openMenu)}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
        </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-line bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded px-3 py-2.5 text-sm text-slate-200 hover:bg-surface hover:text-cyan-soft"
                >
                  {t(link.label)}
                </a>
              ))}
              <a
                href={t(profile.cvPath)}
                download
                className="mt-2 flex items-center justify-center gap-2 rounded border border-line bg-surface px-4 py-2.5 text-sm font-medium text-slate-200"
              >
                <Download className="h-4 w-4" strokeWidth={2} />
                {t(ui.nav.downloadCv)}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
