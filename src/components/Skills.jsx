import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ChevronDown, CircuitBoard, Clapperboard, Cpu, Gauge, Globe, PencilRuler, ScanEye, ShieldCheck, Terminal, Users,
} from 'lucide-react'
import { skillGroups } from '../data/profile'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

const ICONS = {
  cpu: Cpu,
  gauge: Gauge,
  shield: ShieldCheck,
  ruler: PencilRuler,
  terminal: Terminal,
  vision: ScanEye,
  web: Globe,
  circuit: CircuitBoard,
  media: Clapperboard,
  people: Users,
}

// Los primeros grupos de `skillGroups` (orden de profile.js) se ven de entrada; el resto, bajo "Ver más".
const VISIBLE = 5

export default function Skills() {
  const reduce = useReducedMotion()
  const { t } = useLang()
  const [expanded, setExpanded] = useState(false)

  const hidden = skillGroups.length - VISIBLE
  const shown = expanded ? skillGroups : skillGroups.slice(0, VISIBLE)

  const toggleExpanded = () => {
    if (expanded) document.getElementById('habilidades')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setExpanded(!expanded)
  }

  return (
    <section id="habilidades" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            {t(ui.skills.title)}
          </h2>
          <p className="mt-3 text-slate-400">
            {t(ui.skills.body)}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {shown.map((group, i) => {
            const Icon = ICONS[group.icon] ?? Cpu
            return (
              <motion.div
                key={t(group.title)}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: (i % VISIBLE) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_12px_24px_-8px_rgba(34,211,238,0.15)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan/25 bg-cyan/10 text-cyan-soft">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-100">{t(group.title)}</h3>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={t(item)} className="text-xs leading-relaxed text-slate-400">
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {hidden > 0 && (
          <button
            type="button"
            onClick={toggleExpanded}
            aria-expanded={expanded}
            className="mx-auto mt-10 flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan/50 hover:text-cyan-soft"
          >
            {expanded ? t(ui.skills.showLess) : `${t(ui.skills.showMore)} (${hidden})`}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} strokeWidth={2} />
          </button>
        )}
      </div>
    </section>
  )
}
