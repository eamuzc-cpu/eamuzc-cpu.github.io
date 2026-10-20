import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, TriangleAlert, ShieldCheck, Cpu, ChartBar, Wrench, Play, ExternalLink, ArrowRight } from 'lucide-react'
import { categoryLabel } from '../data/projects'
import { ui } from '../data/ui'
import { useLang } from '../i18n'
import { FlowDiagram, ProjectCover } from './ProjectVisuals'
import { pageUi } from '../data/pageUi'
import { projectHref } from '../lib/route'

const TABS = [
  { id: 'desafio', label: ui.projects.tabs.challenge, icon: TriangleAlert },
  { id: 'impacto', label: ui.projects.tabs.impact, icon: ShieldCheck },
  { id: 'solucion', label: ui.projects.tabs.solution, icon: Cpu },
  { id: 'metricas', label: ui.projects.tabs.metrics, icon: ChartBar },
  { id: 'stack', label: ui.projects.tabs.stack, icon: Wrench },
]

export default function ProjectModal({ project, onClose }) {
  const [tab, setTab] = useState('desafio')
  const [demoOpen, setDemoOpen] = useState(false)
  const reduce = useReducedMotion()
  const { t } = useLang()
  const open = Boolean(project)

  useEffect(() => {
    if (!open) return undefined
    setTab('desafio')
    setDemoOpen(false)
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(project?.title)}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-line bg-surface sm:rounded-2xl"
          >
            <div className="relative h-40 shrink-0 overflow-hidden sm:h-52">
              {project && <ProjectCover project={project} className={project.image ? '' : 'opacity-35'} />}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
              <button
                type="button"
                onClick={onClose}
                aria-label={t(ui.projects.close)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-void/70 text-slate-200 backdrop-blur-sm hover:text-cyan-soft"
              >
                <X className="h-4 w-4" strokeWidth={2.2} />
              </button>
              <div className="absolute bottom-4 left-5 right-16">
                <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-soft">
                  {t(categoryLabel(project?.category))} · {project?.year}
                </span>
                <h3 className="mt-1 text-xl font-semibold leading-snug text-slate-50 sm:text-2xl">
                  {t(project?.title)}
                </h3>
              </div>
            </div>

            <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-line px-3 py-2">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    tab === id
                      ? 'bg-cyan/15 text-cyan-soft'
                      : 'text-slate-400 hover:bg-void/60 hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  {t(label)}
                </button>
              ))}
            </div>

            <div className="overflow-y-auto p-5 sm:p-6">
              {project?.demo && (
                <div className="mb-5 flex flex-col gap-3 rounded-xl border border-cyan/25 bg-cyan/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-cyan-soft">{t(ui.projects.demo.badge)}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-50">{t(ui.projects.demo.title)}</div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{t(ui.projects.demo.body)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDemoOpen(true)}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan px-4 py-2.5 text-sm font-semibold text-void transition-opacity hover:opacity-90"
                  >
                    <Play className="h-4 w-4" strokeWidth={2.2} />
                    {t(ui.projects.demo.launch)}
                  </button>
                </div>
              )}
              {project && (
                <a
                  href={projectHref(project.slug)}
                  onClick={onClose}
                  className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-line bg-void/50 p-4 transition-colors hover:border-cyan/50"
                >
                  <span>
                    <span className="block text-sm font-semibold text-slate-50">{t(pageUi.fullPage)}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-400">{t(pageUi.fullPageHint)}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-cyan-soft" strokeWidth={2} />
                </a>
              )}
              {project && (
                <TabContent tab={tab} project={project} />
              )}
            </div>
          </motion.div>
          {demoOpen && project?.demo && (
            <DemoOverlay demo={project.demo} title={t(project.title)} onClose={() => setDemoOpen(false)} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Demo a pantalla completa: iframe de una página estática propia (public/). Esc cierra solo la demo.
export function DemoOverlay({ demo, title, onClose }) {
  const { t } = useLang()

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      e.stopImmediatePropagation()
      onClose()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-void" role="dialog" aria-modal="true" aria-label={title}>
      <div className="flex h-11 shrink-0 items-center justify-between gap-3 border-b border-line px-4">
        <span className="truncate font-mono text-xs text-slate-300">{title}</span>
        <div className="flex items-center gap-2">
          <a
            href={demo.src}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:text-cyan-soft"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="hidden sm:inline">{t(ui.projects.demo.newTab)}</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs text-slate-200 hover:border-cyan/50 hover:text-cyan-soft"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2.2} />
            {t(ui.projects.demo.close)}
          </button>
        </div>
      </div>
      <iframe src={demo.src} title={title} allow="fullscreen" className="min-h-0 w-full flex-1 border-0" />
    </div>
  )
}

function TabContent({ tab, project }) {
  const { t } = useLang()
  if (tab === 'desafio') {
    return <p className="text-sm leading-relaxed text-slate-300">{t(project.challenge)}</p>
  }

  if (tab === 'impacto') {
    return <p className="text-sm leading-relaxed text-slate-300">{t(project.impact)}</p>
  }

  if (tab === 'solucion') {
    return (
      <div className="space-y-4">
        <FlowDiagram diagram={project.diagram} />
        <p className="text-sm leading-relaxed text-slate-300">{t(project.solution)}</p>
      </div>
    )
  }

  if (tab === 'metricas') {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        {project.metrics.map((m) => (
          <div key={m.label.es} className="rounded-xl border border-line bg-void/50 p-4 text-center">
            <div className="font-mono text-2xl font-semibold text-emerald">{t(m.value)}</div>
            <div className="mt-1 text-xs text-slate-400">{t(m.label)}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {project.tools.hardware.length > 0 && (
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Hardware</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tools.hardware.map((item) => (
            <span
              key={t(item)}
              className="rounded border border-amber/25 bg-amber/10 px-2.5 py-1 font-mono text-[11px] text-amber"
            >
              {t(item)}
            </span>
          ))}
        </div>
      </div>
      )}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Software</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tools.software.map((item) => (
            <span
              key={t(item)}
              className="rounded border border-cyan/25 bg-cyan/10 px-2.5 py-1 font-mono text-[11px] text-cyan-soft"
            >
              {t(item)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
