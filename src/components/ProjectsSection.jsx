import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { CATEGORIES, projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

// Cuántos proyectos se ven de entrada: los marcados `featured` (n = puesto) en projects.js.
const VISIBLE = projects.filter((p) => p.featured).length

// Filtro y "Ver más" sobreviven a un paseo por la página de un proyecto (la portada se vuelve a montar).
const memo = { category: 'all', expanded: false }

export default function ProjectsSection() {
  const { t } = useLang()
  const [category, setCategoryState] = useState(memo.category)
  const [selected, setSelected] = useState(null)
  const [expanded, setExpandedState] = useState(memo.expanded)
  const setCategory = (v) => setCategoryState((memo.category = v))
  const setExpanded = (v) => setExpandedState((memo.expanded = v))

  // Destacados primero, por puesto (el sort es estable: el resto conserva el orden de projects.js).
  const filtered = useMemo(() => {
    const list = category === 'all' ? projects : projects.filter((p) => p.category === category)
    return [...list].sort((a, b) => (a.featured ?? Infinity) - (b.featured ?? Infinity))
  }, [category])

  const hidden = Math.max(0, filtered.length - VISIBLE)
  const visible = expanded ? filtered : filtered.slice(0, VISIBLE)

  const toggleExpanded = () => {
    if (expanded) document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setExpanded(!expanded)
  }

  return (
    <section id="proyectos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            {t(ui.projects.title)}
          </h2>
          <p className="mt-3 text-slate-400">
            {t(ui.projects.body)}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setCategory(cat.id)
                setExpanded(false)
              }}
              aria-pressed={category === cat.id}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                category === cat.id
                  ? 'border-cyan bg-cyan/15 text-cyan-soft'
                  : 'border-line text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              {t(cat.label)}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                  onOpen={setSelected}
                />
              ))}
            </div>
            {hidden > 0 && (
              <button
                type="button"
                onClick={toggleExpanded}
                aria-expanded={expanded}
                className="mx-auto mt-10 flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan/50 hover:text-cyan-soft"
              >
                {expanded ? t(ui.projects.showLess) : `${t(ui.projects.showMore)} (${hidden})`}
                <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} strokeWidth={2} />
              </button>
            )}
          </>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-line p-12 text-center text-sm text-slate-500">
            {t(ui.projects.empty)}
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
