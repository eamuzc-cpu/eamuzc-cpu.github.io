import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react'
import { categoryLabel } from '../data/projects'
import { ui } from '../data/ui'
import { pageUi } from '../data/pageUi'
import { projectHref } from '../lib/route'
import { useLang } from '../i18n'
import { ProjectCover } from './ProjectVisuals'


export default function ProjectCard({ project, onOpen, index }) {
  const reduce = useReducedMotion()
  const { t } = useLang()

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-cyan/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ProjectCover project={project} className="transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-void/70 px-3 py-1 font-mono text-[11px] text-slate-200 backdrop-blur-sm">
          {t(categoryLabel(project.category))}
        </span>
        <span className="absolute right-4 top-4 font-mono text-[11px] text-slate-300">
          {project.year}
        </span>
        {project.demo && (
          <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full border border-cyan/40 bg-void/70 px-2.5 py-1 font-mono text-[10.5px] text-cyan-soft backdrop-blur-sm">
            <Play className="h-3 w-3" strokeWidth={2.2} />
            {t(ui.projects.demo.badge)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-slate-50">{t(project.title)}</h3>

        <span className="mt-2 inline-flex w-fit items-center rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-1 font-mono text-[11px] text-emerald">
          {t(project.resultBadge)}
        </span>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-400">
          {t(project.summary)}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((item) => (
            <span
              key={t(item)}
              className="rounded border border-line bg-void/50 px-2 py-1 font-mono text-[10.5px] text-slate-400"
            >
              {t(item)}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onOpen(project)}
          className="mt-5 flex items-center justify-between gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan/50 hover:text-cyan-soft"
        >
          {t(ui.projects.openCase)}
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </button>
        <a
          href={projectHref(project.slug)}
          className="mt-2 flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium text-slate-400 transition-colors hover:text-cyan-soft"
        >
          {t(pageUi.readMore)}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
      </div>
    </motion.article>
  )
}
