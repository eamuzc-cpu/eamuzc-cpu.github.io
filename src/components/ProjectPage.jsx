import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  FlaskConical,
  Layers,
  Lightbulb,
  ListChecks,
  Play,
  Target,
  TriangleAlert,
  Wrench,
} from 'lucide-react'
import { categoryLabel, projects } from '../data/projects'
import { pageUi } from '../data/pageUi'
import { siteMeta, useLang } from '../i18n'
import { projectHref } from '../lib/route'
import { DiagramBlock } from './Diagrams'
import { DemoOverlay } from './ProjectModal'
import { FlowDiagram, ProjectCover } from './ProjectVisuals'

// Contenido largo de cada proyecto: src/data/pages/<slug>.js (se carga solo al abrir esa página).
const loaders = import.meta.glob('../data/pages/*.js')

function usePageContent(slug) {
  const [state, setState] = useState({ slug: null, page: null })
  useEffect(() => {
    let alive = true
    const load = loaders[`../data/pages/${slug}.js`]
    if (!load) {
      setState({ slug, page: null })
      return undefined
    }
    load()
      .then((m) => alive && setState({ slug, page: m.default }))
      .catch(() => alive && setState({ slug, page: null }))
    return () => {
      alive = false
    }
  }, [slug])
  return state.slug === slug ? { ready: true, page: state.page } : { ready: false, page: null }
}

// Si un proyecto aún no tiene su archivo en pages/, la página se arma con los datos de la ficha.
function fallbackContent(project, t) {
  return {
    lead: t(project.summary),
    context: [t(project.challenge), t(project.impact)],
    how: [{ t: t(pageUi.sections.how), d: t(project.solution) }],
  }
}

function SectionTitle({ n, icon: Icon, children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10 text-cyan-soft">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
        <span className="mr-2 font-mono text-sm text-slate-600">{String(n).padStart(2, '0')}</span>
        {children}
      </h2>
    </div>
  )
}

const Paragraphs = ({ items }) =>
  items.map((p, i) => (
    <p key={i} className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-300 first:mt-0">
      {p}
    </p>
  ))

export default function ProjectPage({ slug }) {
  const { lang, t } = useLang()
  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug])
  const { ready, page } = usePageContent(slug)
  const [demoOpen, setDemoOpen] = useState(false)
  const [active, setActive] = useState('resumen')

  useEffect(() => {
    setDemoOpen(false)
  }, [slug])

  useEffect(() => {
    if (!project) return undefined
    const meta = siteMeta(lang)
    document.title = `${t(project.title)} — Esteban Muñoz Cáceres`
    const desc = document.querySelector('meta[name="description"]')
    desc?.setAttribute('content', t(project.summary))
    return () => {
      document.title = meta.title
      desc?.setAttribute('content', meta.description)
    }
  }, [project, lang, t])

  const c = page ? (page[lang] ?? page.es) : project ? fallbackContent(project, t) : null
  const diagrams = page?.diagrams ?? []
  const at = (where) => diagrams.filter((d) => d.placement === where)

  const sections = useMemo(() => {
    if (!project || !c) return []
    const list = [
      { id: 'resumen', label: pageUi.sections.overview },
      c.context?.length && { id: 'contexto', label: pageUi.sections.context },
      c.how?.length && { id: 'como', label: pageUi.sections.how },
      c.concepts?.length && { id: 'conceptos', label: pageUi.sections.concepts },
      c.decisions?.length && { id: 'decisiones', label: pageUi.sections.decisions },
      project.demo && c.tour?.length && { id: 'demo', label: pageUi.sections.tour },
      { id: 'resultados', label: pageUi.sections.results },
      c.limits?.length && { id: 'limites', label: pageUi.sections.limits },
      c.next?.length && { id: 'siguientes', label: pageUi.sections.next },
      { id: 'stack', label: pageUi.sections.stack },
    ]
    return list.filter(Boolean)
  }, [project, c])

  // Resalta en el índice la sección que se está leyendo.
  useEffect(() => {
    if (!ready || sections.length === 0) return undefined
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-15% 0px -70% 0px' },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [ready, sections])

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-32 pt-32 text-center sm:px-6">
        <p className="text-slate-300">{t(pageUi.notFound)}</p>
        <a href="#proyectos" className="mt-6 inline-flex items-center gap-2 text-cyan-soft">
          <ArrowLeft className="h-4 w-4" /> {t(pageUi.back)}
        </a>
      </div>
    )
  }

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const idx = projects.findIndex((p) => p.slug === slug)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]
  const related = (page?.related ?? [])
    .map((s) => projects.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 3)
  const n = (id) => sections.findIndex((s) => s.id === id) + 1

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      <a href="#proyectos" className="inline-flex items-center gap-2 font-mono text-xs text-slate-400 transition-colors hover:text-cyan-soft">
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        {t(pageUi.back)}
      </a>

      <header className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-cyan-soft">
            {t(categoryLabel(project.category))} · {project.year}
          </div>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-4xl">{t(project.title)}</h1>
          <span className="mt-4 inline-flex w-fit items-center rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald">
            {t(project.resultBadge)}
          </span>
          {ready && <p className="mt-5 text-lg leading-8 text-slate-300">{c.lead}</p>}
          {project.demo && (
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-void transition-opacity hover:opacity-90"
              >
                <Play className="h-4 w-4" strokeWidth={2.2} />
                {t({ es: 'Abrir demo', en: 'Open demo' })}
              </button>
            </div>
          )}
        </div>

        <aside className="self-start rounded-2xl border border-line bg-surface p-5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{t(pageUi.facts.title)}</div>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              [pageUi.facts.client, project.client],
              [pageUi.facts.year, project.year],
              [pageUi.facts.area, t(categoryLabel(project.category))],
              page?.status && [pageUi.facts.status, t(page.status)],
              [pageUi.facts.demo, t(project.demo ? pageUi.facts.demoYes : pageUi.facts.demoNo)],
            ]
              .filter(Boolean)
              .map(([k, v]) => (
                <div key={t(k)}>
                  <dt className="font-mono text-[11px] text-slate-500">{t(k)}</dt>
                  <dd className="mt-0.5 leading-snug text-slate-200">{typeof v === 'object' ? t(v) : v}</dd>
                </div>
              ))}
          </dl>
        </aside>
      </header>

      <div className="mt-10 aspect-[16/7] overflow-hidden rounded-2xl border border-line">
        <ProjectCover project={project} />
      </div>

      {!ready ? (
        <p className="mt-16 text-center font-mono text-sm text-slate-500">{t(pageUi.loading)}</p>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[190px_minmax(0,1fr)]">
          <nav className="hidden lg:block" aria-label={t(pageUi.toc)}>
            <div className="sticky top-24">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-slate-500">{t(pageUi.toc)}</div>
              <ul className="space-y-1 border-l border-line">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goTo(s.id)}
                      className={`-ml-px block w-full border-l py-1.5 pl-3 text-left text-[13px] transition-colors ${
                        active === s.id ? 'border-cyan text-cyan-soft' : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {t(s.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <article className="min-w-0 space-y-16">
            <section id="resumen" className="scroll-mt-24">
              <SectionTitle n={n('resumen')} icon={BookOpen}>
                {t(pageUi.sections.overview)}
              </SectionTitle>
              <Paragraphs items={[t(project.summary)]} />
              {at('overview').map((d, i) => (
                <DiagramBlock key={i} diagram={d} />
              ))}
            </section>

            {c.context?.length > 0 && (
              <section id="contexto" className="scroll-mt-24">
                <SectionTitle n={n('contexto')} icon={Target}>
                  {t(pageUi.sections.context)}
                </SectionTitle>
                <Paragraphs items={c.context} />
                {at('context').map((d, i) => (
                  <DiagramBlock key={i} diagram={d} />
                ))}
              </section>
            )}

            {c.how?.length > 0 && (
              <section id="como" className="scroll-mt-24">
                <SectionTitle n={n('como')} icon={Layers}>
                  {t(pageUi.sections.how)}
                </SectionTitle>
                {at('how-top').map((d, i) => (
                  <DiagramBlock key={i} diagram={d} />
                ))}
                {!page && <FlowDiagram diagram={project.diagram} />}
                <ol className="relative mt-2 max-w-3xl space-y-6 border-l border-line pl-8">
                  {c.how.map((s, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[45px] flex h-7 w-7 items-center justify-center rounded-full border border-cyan/40 bg-surface font-mono text-xs font-semibold text-cyan-soft">
                        {i + 1}
                      </span>
                      <h3 className="text-base font-semibold text-slate-50">{s.t}</h3>
                      <p className="mt-1.5 text-[15px] leading-7 text-slate-300">{s.d}</p>
                    </li>
                  ))}
                </ol>
                {at('how').map((d, i) => (
                  <DiagramBlock key={i} diagram={d} />
                ))}
              </section>
            )}

            {c.concepts?.length > 0 && (
              <section id="conceptos" className="scroll-mt-24">
                <SectionTitle n={n('conceptos')} icon={Lightbulb}>
                  {t(pageUi.sections.concepts)}
                </SectionTitle>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {c.concepts.map((k, i) => (
                    <div key={i} className="rounded-xl border border-line bg-surface p-4">
                      <h3 className="font-mono text-sm font-semibold text-cyan-soft">{k.t}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{k.d}</p>
                    </div>
                  ))}
                </div>
                {at('concepts').map((d, i) => (
                  <DiagramBlock key={i} diagram={d} />
                ))}
              </section>
            )}

            {c.decisions?.length > 0 && (
              <section id="decisiones" className="scroll-mt-24">
                <SectionTitle n={n('decisiones')} icon={ChevronRight}>
                  {t(pageUi.sections.decisions)}
                </SectionTitle>
                <div className="max-w-3xl space-y-4">
                  {c.decisions.map((k, i) => (
                    <div key={i} className="rounded-xl border border-line border-l-magenta/60 bg-surface p-4 [border-left-width:3px]">
                      <h3 className="text-[15px] font-semibold text-slate-50">{k.t}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-slate-300">{k.d}</p>
                    </div>
                  ))}
                </div>
                {at('decisions').map((d, i) => (
                  <DiagramBlock key={i} diagram={d} />
                ))}
              </section>
            )}

            {project.demo && c.tour?.length > 0 && (
              <section id="demo" className="scroll-mt-24">
                <SectionTitle n={n('demo')} icon={Play}>
                  {t(pageUi.sections.tour)}
                </SectionTitle>
                <ul className="max-w-3xl space-y-3">
                  {c.tour.map((s, i) => (
                    <li key={i} className="flex gap-3 font-display text-[15px] leading-7 text-slate-300">
                      <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-cyan-soft" strokeWidth={2} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="mt-6 flex items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-void transition-opacity hover:opacity-90"
                >
                  <Play className="h-4 w-4" strokeWidth={2.2} />
                  {t({ es: 'Abrir demo', en: 'Open demo' })}
                </button>
              </section>
            )}

            <section id="resultados" className="scroll-mt-24">
              <SectionTitle n={n('resultados')} icon={FlaskConical}>
                {t(pageUi.sections.results)}
              </SectionTitle>
              <div className="grid gap-3 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.label.es} className="rounded-xl border border-line bg-surface p-4 text-center">
                    <div className="font-mono text-2xl font-semibold text-emerald">{t(m.value)}</div>
                    <div className="mt-1 text-xs text-slate-400">{t(m.label)}</div>
                  </div>
                ))}
              </div>
              {at('results').map((d, i) => (
                <DiagramBlock key={i} diagram={d} />
              ))}
              {c.verified?.length > 0 && (
                <div className="mt-6 max-w-3xl">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-100">
                    <ListChecks className="h-4 w-4 text-emerald" strokeWidth={2} />
                    {t(page?.verifiedTitle ?? pageUi.verifiedTitle)}
                  </h3>
                  <ul className="space-y-2.5">
                    {c.verified.map((s, i) => (
                      <li key={i} className="flex gap-3 font-display text-sm leading-6 text-slate-300">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-emerald" strokeWidth={2.4} />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {c.limits?.length > 0 && (
              <section id="limites" className="scroll-mt-24">
                <SectionTitle n={n('limites')} icon={TriangleAlert}>
                  {t(pageUi.sections.limits)}
                </SectionTitle>
                <div className="max-w-3xl rounded-xl border border-amber/30 bg-amber/5 p-5">
                  <ul className="space-y-3">
                    {c.limits.map((s, i) => (
                      <li key={i} className="flex gap-3 font-display text-sm leading-6 text-slate-300">
                        <TriangleAlert className="mt-1 h-4 w-4 shrink-0 text-amber" strokeWidth={2} />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {c.next?.length > 0 && (
              <section id="siguientes" className="scroll-mt-24">
                <SectionTitle n={n('siguientes')} icon={ArrowRight}>
                  {t(pageUi.sections.next)}
                </SectionTitle>
                <ul className="max-w-3xl space-y-2.5">
                  {c.next.map((s, i) => (
                    <li key={i} className="flex gap-3 font-display text-[15px] leading-7 text-slate-300">
                      <ChevronRight className="mt-1.5 h-4 w-4 shrink-0 text-slate-500" strokeWidth={2} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section id="stack" className="scroll-mt-24">
              <SectionTitle n={n('stack')} icon={Wrench}>
                {t(pageUi.sections.stack)}
              </SectionTitle>
              <div className="space-y-5">
                {project.tools.hardware.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t(pageUi.hardwareTitle)}</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.tools.hardware.map((item) => (
                        <span key={t(item)} className="rounded border border-amber/25 bg-amber/10 px-2.5 py-1 font-mono text-[11px] text-amber">
                          {t(item)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t(pageUi.softwareTitle)}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.tools.software.map((item) => (
                      <span key={t(item)} className="rounded border border-cyan/25 bg-cyan/10 px-2.5 py-1 font-mono text-[11px] text-cyan-soft">
                        {t(item)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {related.length > 0 && (
              <section className="scroll-mt-24">
                <h2 className="mb-4 text-lg font-semibold text-slate-50">{t(pageUi.sections.related)}</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {related.map((r) => (
                    <a key={r.slug} href={projectHref(r.slug)} className="group overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-cyan/40">
                      <div className="aspect-[16/9] overflow-hidden">
                        <ProjectCover project={r} className="transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-3 text-[13px] font-medium leading-snug text-slate-200">{t(r.title)}</div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            <nav className="grid gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label="prev-next">
              <a href={projectHref(prev.slug)} className="rounded-xl border border-line bg-surface p-4 transition-colors hover:border-cyan/40">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                  <ArrowLeft className="h-3 w-3" /> {t(pageUi.prev)}
                </div>
                <div className="mt-1 text-sm font-medium leading-snug text-slate-200">{t(prev.title)}</div>
              </a>
              <a href={projectHref(next.slug)} className="rounded-xl border border-line bg-surface p-4 text-right transition-colors hover:border-cyan/40">
                <div className="flex items-center justify-end gap-1.5 font-mono text-[11px] text-slate-500">
                  {t(pageUi.next2)} <ArrowRight className="h-3 w-3" />
                </div>
                <div className="mt-1 text-sm font-medium leading-snug text-slate-200">{t(next.title)}</div>
              </a>
            </nav>
          </article>
        </div>
      )}

      {demoOpen && project.demo && <DemoOverlay demo={project.demo} title={t(project.title)} onClose={() => setDemoOpen(false)} />}
    </div>
  )
}
