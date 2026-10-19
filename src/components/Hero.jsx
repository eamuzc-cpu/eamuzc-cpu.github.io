import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, MessageCircle } from 'lucide-react'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import NetworkGraph from './NetworkGraph'
import Terminal from './Terminal'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

export default function Hero() {
  const reduce = useReducedMotion()
  const { t } = useLang()

  return (
    <section id="inicio" className="relative min-h-[100dvh] overflow-hidden pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:pt-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-sm text-slate-400">
            <span className="text-magenta">$</span> whoami
          </p>

          <h1 className="mt-3 text-5xl font-bold leading-[1.02] text-slate-50 md:text-6xl lg:text-7xl">
            <span className="glitch text-glow" data-text={profile.shortName}>
              {profile.shortName}
            </span>
          </h1>

          <p className="mt-4 font-mono text-sm uppercase tracking-[0.18em] text-cyan-soft">
            {t(profile.title)}
          </p>

          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-slate-300">
            {t(ui.hero.tagline)}
            <span className="text-cyan-soft">{t(ui.hero.taglineAccent)}</span>
          </p>
          <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-slate-400">
            {t(ui.hero.description)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={t(profile.cvPath)}
              download
              className="glow-cyan flex items-center gap-2 rounded-lg bg-cyan px-5 py-3 font-mono text-sm font-semibold text-void transition-transform active:scale-[0.98] hover:bg-cyan-soft"
            >
              <Download className="h-4 w-4" strokeWidth={2.2} />
              {t(ui.nav.downloadCv)}
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-line px-5 py-3 font-mono text-sm font-semibold text-slate-200 transition-colors active:scale-[0.98] hover:border-cyan/50 hover:text-cyan-soft"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
              WhatsApp
            </a>
            <a
              href="#proyectos"
              className="flex items-center gap-2 px-2 py-3 font-mono text-sm text-slate-400 transition-colors hover:text-cyan-soft"
            >
              {t(ui.hero.viewProjects)}
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </a>
          </div>

          <p className="mt-5 font-mono text-xs text-slate-500">
            {t(ui.hero.availability)}
          </p>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6 font-mono">
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-slate-500">{t(ui.hero.base)}</dt>
              <dd className="mt-1 text-sm text-slate-200">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-slate-500">{t(ui.hero.projects)}</dt>
              <dd className="mt-1 text-sm text-slate-200">{projects.length}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-slate-500">{t(ui.hero.focus)}</dt>
              <dd className="mt-1 text-sm text-slate-200">{t(ui.hero.focusValue)}</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative"
        >
          <NetworkGraph className="pointer-events-none absolute -inset-16 -z-10 h-[calc(100%+8rem)] w-[calc(100%+8rem)] opacity-60" />
          <Terminal autoType="whoami" className="h-[420px]" />
        </motion.div>
      </div>
    </section>
  )
}
