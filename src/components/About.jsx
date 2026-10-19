import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarClock, FolderCheck, Factory, UserRound } from 'lucide-react'
import { careerStartYear } from '../data/profile'
import { projects } from '../data/projects'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

const yearsInField = new Date().getFullYear() - careerStartYear
const industriesCovered = new Set(projects.map((p) => p.category)).size

const STATS = [
  { icon: CalendarClock, value: `${yearsInField}+`, label: ui.about.years },
  { icon: FolderCheck, value: `${projects.length}`, label: ui.about.cases },
  { icon: Factory, value: `${industriesCovered}`, label: ui.about.fields },
]

const PHOTOS = ['/fotos/esteban-1.jpg', '/fotos/esteban-2.jpg', '/fotos/esteban-3.jpg']
const PHOTO_INTERVAL_MS = 60_000
const FADE = 'opacity 2s ease-in-out, filter 2s ease-in-out'

export default function About() {
  const reduce = useReducedMotion()
  const { t } = useLang()
  const [failed, setFailed] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCurrent((i) => (i + 1) % PHOTOS.length), PHOTO_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="sobre-mi" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-xs lg:mx-0"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface">
            {!failed ? (
              PHOTOS.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={i === current ? t(ui.about.photoAlt) : ''}
                  aria-hidden={i !== current}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    objectPosition: '50% 30%',
                    opacity: i === current ? 1 : 0,
                    filter: i === current ? 'blur(0)' : 'blur(12px)',
                    transition: reduce ? 'none' : FADE,
                  }}
                  onError={() => setFailed(true)}
                />
              ))
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-surface-raised to-surface text-slate-600">
                <UserRound className="h-16 w-16" strokeWidth={1.2} />
              </div>
            )}
          </div>
          <span className="absolute -bottom-3 -right-3 h-16 w-16 rounded-xl border-2 border-cyan/60" />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-50 md:text-4xl">
            {t(ui.about.titleStart)}
            <span className="text-cyan-soft">{t(ui.about.titleAccent)}</span>
            {t(ui.about.titleEnd)}
          </h2>
          <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-slate-400 sm:text-base">
            {t(ui.about.body)}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label.es}>
                <Icon className="h-5 w-5 text-cyan-soft" strokeWidth={1.8} />
                <div className="mt-2 font-mono text-2xl font-semibold text-slate-50">{value}</div>
                <div className="mt-1 text-xs leading-snug text-slate-500">{t(label)}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
