import { MessageCircle, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { openTerminal } from './Terminal'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

const LINKS = [
  { href: '#proyectos', label: ui.nav.projects },
  { href: '#habilidades', label: ui.nav.skills },
  { href: '#experiencia', label: ui.nav.experience },
  { href: '#contacto', label: ui.nav.contact },
]

const SOCIALS = [
  { icon: MessageCircle, href: profile.whatsapp, label: 'WhatsApp' },
  { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLang()

  return (
    <footer className="relative border-t border-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-slate-300">[EAMUZ // Automation]</span>
          <span className="hidden text-slate-700 sm:inline">/</span>
          <span className="hidden font-mono text-xs text-slate-600 sm:inline">
            © {year} {profile.name}
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-5">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate-400 hover:text-cyan-soft">
              {t(link.label)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={label}
              className="text-slate-500 transition-colors hover:text-cyan-soft"
            >
              <Icon className="h-4 w-4" strokeWidth={1.8} />
            </a>
          ))}
          <button
            type="button"
            onClick={openTerminal}
            className="hidden font-mono text-xs text-slate-500 transition-colors hover:text-cyan-soft sm:inline"
          >
            {t(ui.footer.terminalHintStart)}<kbd className="rounded border border-line px-1 text-cyan-soft">`</kbd>{t(ui.footer.terminalHintEnd)}
          </button>
          <span className="hidden items-center gap-2 font-mono text-xs text-slate-500 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
            {t(ui.footer.status)}
          </span>
        </div>
      </div>
    </footer>
  )
}
