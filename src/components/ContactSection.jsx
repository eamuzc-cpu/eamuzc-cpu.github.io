import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Mail, Linkedin, Copy, Check, Send, MapPin, Clock } from 'lucide-react'
import { profile } from '../data/profile'
import { CATEGORIES } from '../data/projects'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

const PROJECT_TYPES = CATEGORIES.filter((c) => c.id !== 'all')

function ContactCard({ icon: Icon, label, value, href, onClick, copied }) {
  const content = (
    <div className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-cyan/30">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-cyan/25 bg-cyan/10 text-cyan-soft">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
        <div className="truncate text-sm font-medium text-slate-100">{value}</div>
      </div>
      {onClick && (
        <span className="shrink-0 text-slate-500">
          {copied ? <Check className="h-4 w-4 text-emerald" strokeWidth={2.2} /> : <Copy className="h-4 w-4" strokeWidth={1.8} />}
        </span>
      )}
    </div>
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="text-left">
        {content}
      </button>
    )
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {content}
    </a>
  )
}

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', projectType: PROJECT_TYPES[0].id, message: '' })
  const reduce = useReducedMotion()
  const { t } = useLang()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setToast(t(ui.contact.copied))
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setToast(t(ui.contact.copyFailed) + profile.email)
    }
    window.setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setToast(t(ui.contact.missing))
      window.setTimeout(() => setToast(null), 3000)
      return
    }
    const typeLabel = t(PROJECT_TYPES.find((c) => c.id === form.projectType)?.label)
    const subject = encodeURIComponent(`${t(ui.contact.subject)}${form.name}`)
    const body = encodeURIComponent(
      `${t(ui.contact.projectType)}: ${typeLabel}\n\n${form.message}\n\n${t(ui.contact.replyTo)}${form.email}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setToast(t(ui.contact.opening))
    setForm({ name: '', email: '', projectType: PROJECT_TYPES[0].id, message: '' })
    window.setTimeout(() => setToast(null), 3000)
  }

  return (
    <section id="contacto" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            {t(ui.contact.title)}
          </h2>
          <p className="mt-3 text-slate-400">
            {t(ui.contact.body)}
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            <ContactCard
              icon={MessageCircle}
              label="WhatsApp"
              value={profile.whatsappLabel}
              href={profile.whatsapp}
            />
            <ContactCard
              icon={Mail}
              label="Email"
              value={profile.email}
              onClick={copyEmail}
              copied={copied}
            />
            <ContactCard
              icon={Linkedin}
              label="LinkedIn"
              value="linkedin.com/in/eamuz"
              href={profile.linkedin}
            />

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-3 py-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-slate-500" strokeWidth={1.8} />
                <span className="text-xs text-slate-400">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-3 py-2.5">
                <Clock className="h-4 w-4 shrink-0 text-emerald" strokeWidth={1.8} />
                <span className="text-xs text-slate-400">{t(ui.contact.available)}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-line bg-surface p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-medium text-slate-400">
                  {t(ui.contact.name)}
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="rounded-lg border border-line bg-void px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan/60"
                  placeholder={t(ui.contact.namePlaceholder)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-slate-400">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="rounded-lg border border-line bg-void px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan/60"
                  placeholder={t(ui.contact.emailPlaceholder)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="projectType" className="text-xs font-medium text-slate-400">
                {t(ui.contact.projectType)}
              </label>
              <select
                id="projectType"
                value={form.projectType}
                onChange={(e) => setForm((f) => ({ ...f, projectType: e.target.value }))}
                className="rounded-lg border border-line bg-void px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-cyan/60"
              >
                {PROJECT_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {t(type.label)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-medium text-slate-400">
                {t(ui.contact.message)}
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="resize-none rounded-lg border border-line bg-void px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan/60"
                placeholder={t(ui.contact.messagePlaceholder)}
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan px-5 py-3 text-sm font-semibold text-void transition-transform active:scale-[0.98] hover:bg-cyan-soft sm:w-auto"
            >
              <Send className="h-4 w-4" strokeWidth={2.2} />
              {t(ui.contact.send)}
            </button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-lg border border-cyan/30 bg-surface-raised px-4 py-3 text-sm text-slate-100 shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
