import { motion, useReducedMotion } from 'framer-motion'
import { Factory, Cog, Zap, Code } from 'lucide-react'
import { experience } from '../data/profile'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

const ICONS = { factory: Factory, cog: Cog, zap: Zap, code: Code }

export default function Experience() {
  const reduce = useReducedMotion()
  const { t } = useLang()

  return (
    <section id="experiencia" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            {t(ui.experience.title)}
          </h2>
          <p className="mt-3 text-slate-400">
            {t(ui.experience.body)}
          </p>
        </div>

        <div className="mt-10 space-y-8 border-l border-line pl-6 sm:pl-8">
          {experience.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Cog
            const isOngoing = item.end === null
            const period = item.end === item.start ? `${item.start}` : `${item.start} — ${isOngoing ? t(ui.experience.present) : item.end}`

            return (
              <motion.div
                key={item.role.es + item.start}
                initial={reduce ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span
                  className={`absolute -left-[calc(1.5rem+9px)] top-0 flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 border-void sm:-left-[calc(2rem+9px)] ${
                    isOngoing ? 'bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.7)]' : 'bg-slate-700'
                  }`}
                >
                  <Icon className="h-2.5 w-2.5 text-void" strokeWidth={2.5} />
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan-soft">
                    {period}
                  </span>
                  {isOngoing && (
                    <span className="rounded-full border border-emerald/30 bg-emerald/10 px-2 py-0.5 font-mono text-[10px] text-emerald">
                      {t(ui.experience.ongoing)}
                    </span>
                  )}
                </div>
                <h3 className="mt-1 text-base font-semibold text-slate-100">{t(item.role)}</h3>
                <p className="text-sm text-slate-500">{t(item.place)}</p>
                <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-slate-400">
                  {t(item.description)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
