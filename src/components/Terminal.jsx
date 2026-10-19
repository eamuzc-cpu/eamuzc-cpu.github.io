import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { profile, skillGroups, experience } from '../data/profile'
import { projects, categoryLabel } from '../data/projects'
import { ui } from '../data/ui'
import { useLang } from '../i18n'

// Terminal interactiva reutilizable: se monta embebida en el hero y también dentro
// del overlay global (` o Ctrl+K). Cualquier parte de la página puede abrir el
// overlay con `openTerminal()`.

export const TERMINAL_OPEN_EVENT = 'terminal:open'
export const openTerminal = () => window.dispatchEvent(new Event(TERMINAL_OPEN_EVENT))

const PROMPT_USER = 'esteban@eamuz'

const SECTIONS = {
  inicio: 'inicio',
  'sobre-mi': 'sobre-mi',
  proyectos: 'proyectos',
  habilidades: 'habilidades',
  experiencia: 'experiencia',
  contacto: 'contacto',
}

const QUICK_COMMANDS = ['whoami', 'projects', 'skills', 'contact', 'cv', 'help']

const H = ui.terminal.help
const HELP = [
  ['help', H.help],
  ['whoami', H.whoami],
  ['projects', H.projects],
  ['skills', H.skills],
  ['experience', H.experience],
  ['cv', H.cv],
  ['contact', H.contact],
  ['ls', H.ls],
  ['cd <section>', H.cd],
  ['lang es|en', H.lang],
  ['clear', H.clear],
]

const COMMAND_NAMES = [
  'help', 'whoami', 'projects', 'skills', 'experience', 'cv', 'contact',
  'ls', 'cd', 'lang', 'clear', 'exit', 'sudo', 'ping',
]

function Link({ href, children, onClick }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="text-cyan-soft underline decoration-cyan/40 underline-offset-2 hover:decoration-cyan"
    >
      {children}
    </a>
  )
}

function Muted({ children }) {
  return <span className="text-slate-500">{children}</span>
}

export default function Terminal({ autoType, onClose, className = '', inputRef: externalRef }) {
  const reduce = useReducedMotion()
  const { t, setLang } = useLang()
  const [lines, setLines] = useState(() => [
    { id: 0, out: <Muted>EAMUZ-OS v3.0 — {t(ui.terminal.welcome)} <span className="text-cyan-soft">help</span> {t(ui.terminal.welcomeEnd)}</Muted> },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const ownRef = useRef(null)
  const inputRef = externalRef ?? ownRef
  const scrollRef = useRef(null)
  const nextId = useRef(1)
  const autoTyped = useRef(false)

  const goTo = (id) => {
    onClose?.()
    // espera a que el overlay cierre para no pelear con el scroll-lock
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }))
  }

  const sectionLink = (id, label) => (
    <Link href={`#${id}`} onClick={(e) => { e.preventDefault(); goTo(id) }}>{label}</Link>
  )

  const run = (raw) => {
    const cmd = raw.trim()
    const [name, ...args] = cmd.split(/\s+/)
    const arg = args.join(' ')
    let out = null

    switch (name.toLowerCase()) {
      case '':
        break
      case 'help':
        out = (
          <div className="grid grid-cols-[auto_1fr] gap-x-6">
            {HELP.map(([c, d]) => (
              <div key={c} className="contents">
                <span className="text-cyan-soft">{c}</span>
                <Muted>{t(d)}</Muted>
              </div>
            ))}
          </div>
        )
        break
      case 'whoami':
        out = (
          <div>
            <div className="text-slate-50">{profile.name}</div>
            <div className="text-slate-300">{t(profile.title)}</div>
            <Muted>{t(profile.role)}</Muted>
            <div><Muted>{t(ui.terminal.location)}</Muted> {profile.location} <Muted>{t(ui.terminal.status)}</Muted> <span className="text-emerald">{t(ui.terminal.available)}</span></div>
          </div>
        )
        break
      case 'projects':
        out = (
          <div>
            {projects.map((p, i) => (
              <div key={p.slug}>
                <Muted>[{String(i + 1).padStart(2, '0')}]</Muted> {t(p.title)}{' '}
                <span className="text-magenta-soft">#{t(categoryLabel(p.category))}</span>
              </div>
            ))}
            <div className="mt-1"><Muted>→</Muted> {sectionLink('proyectos', 'cd proyectos')}</div>
          </div>
        )
        break
      case 'skills':
        out = (
          <div>
            {skillGroups.map((g) => (
              <div key={t(g.title)}>
                <span className="text-cyan-soft">{t(g.title)}:</span> <Muted>{g.items.map(t).join(', ')}</Muted>
              </div>
            ))}
          </div>
        )
        break
      case 'experience':
        out = (
          <div>
            {experience.map((e) => (
              <div key={e.role.es + e.start}>
                <Muted>{e.end === e.start ? e.start : `${e.start}—${e.end ?? t(ui.experience.present)}`}</Muted> {t(e.role)} <span className="text-magenta-soft">@</span> {t(e.place)}
              </div>
            ))}
          </div>
        )
        break
      case 'cv':
        out = (
          <div>
            <Muted>{t(ui.terminal.downloading)}</Muted>{' '}
            <a href={t(profile.cvPath)} download className="text-cyan-soft underline underline-offset-2">cv.pdf</a>
          </div>
        )
        {
          const a = document.createElement('a')
          a.href = t(profile.cvPath)
          a.download = ''
          a.click()
        }
        break
      case 'contact':
        out = (
          <div>
            <div><Muted>email    </Muted> <Link href={`mailto:${profile.email}`}>{profile.email}</Link></div>
            <div><Muted>whatsapp </Muted> <Link href={profile.whatsapp}>{profile.whatsappLabel}</Link></div>
            <div><Muted>linkedin </Muted> <Link href={profile.linkedin}>{profile.linkedin.replace('https://', '')}</Link></div>
          </div>
        )
        break
      case 'ls':
        out = (
          <div className="flex flex-wrap gap-x-4">
            {Object.keys(SECTIONS).map((s) => (
              <span key={s}>{sectionLink(s, `${s}/`)}</span>
            ))}
          </div>
        )
        break
      case 'cd': {
        const target = SECTIONS[arg.replace(/\/$/, '')]
        if (target) {
          goTo(target)
          out = <Muted>→ {target}</Muted>
        } else {
          out = <span className="text-danger">cd: {arg || t(ui.terminal.empty)}: {t(ui.terminal.cdMissing)} <span className="text-cyan-soft">ls</span></span>
        }
        break
      }
      case 'lang': {
        const next = arg.toLowerCase()
        if (next === 'es' || next === 'en') {
          setLang(next)
          out = <span className="text-emerald">{next === 'es' ? ui.terminal.langSet.es : ui.terminal.langSet.en}</span>
        } else {
          out = <Muted>{t(ui.terminal.langUsage)}</Muted>
        }
        break
      }
      case 'clear':
        setLines([])
        return
      case 'exit':
        if (onClose) { onClose(); return }
        out = <Muted>{t(ui.terminal.noExit)}</Muted>
        break
      case 'sudo':
        out = arg === 'hire-me' ? (
          <div>
            <Muted>[sudo] password for recruiter: ********</Muted>
            <div className="text-emerald">{t(ui.terminal.hireGranted)}</div>
            <div><Muted>→</Muted> {sectionLink('contacto', 'cd contacto')} <Muted>{t(ui.terminal.or)}</Muted> <Link href={profile.whatsapp}>WhatsApp</Link></div>
          </div>
        ) : (
          <span className="text-danger">recruiter is not in the sudoers file. {t(ui.terminal.notSudoer)} <span className="text-cyan-soft">sudo hire-me</span></span>
        )
        break
      case 'ping':
        out = (
          <div>
            <Muted>PING {arg || 'eamuz.dev'}: 56 data bytes</Muted>
            <div>64 bytes from {arg || 'eamuz.dev'}: icmp_seq=1 ttl=64 time=0.42 ms</div>
            <div className="text-emerald">1 packets transmitted, 1 received, {t(ui.terminal.pingOk)}</div>
          </div>
        )
        break
      default:
        out = (
          <span className="text-danger">
            command not found: {name}. <Muted>{t(ui.terminal.notFound)}</Muted> <span className="text-cyan-soft">help</span>
          </span>
        )
    }

    setLines((prev) => [
      ...prev,
      { id: nextId.current++, cmd },
      ...(out ? [{ id: nextId.current++, out }] : []),
    ])
    if (cmd) setHistory((h) => [...h, cmd])
    setHistoryIdx(-1)
  }

  // autotipeo de un comando inicial (solo en la terminal del hero)
  useEffect(() => {
    // el ref evita doble ejecución con el remount de StrictMode
    if (!autoType || autoTyped.current) return
    if (reduce) {
      autoTyped.current = true
      run(autoType)
      return
    }
    let i = 0
    let timer
    const tick = () => {
      i += 1
      setInput(autoType.slice(0, i))
      if (i < autoType.length) {
        timer = setTimeout(tick, 90)
      } else {
        timer = setTimeout(() => {
          autoTyped.current = true
          setInput('')
          run(autoType)
        }, 350)
      }
    }
    timer = setTimeout(tick, 700)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoType, reduce])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1)
      setHistoryIdx(idx)
      setInput(history[idx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx === -1) return
      const idx = historyIdx + 1
      if (idx >= history.length) {
        setHistoryIdx(-1)
        setInput('')
      } else {
        setHistoryIdx(idx)
        setInput(history[idx])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = COMMAND_NAMES.filter((c) => c.startsWith(input.toLowerCase()))
      if (input && match.length === 1) setInput(match[0] + (match[0] === 'cd' || match[0] === 'lang' ? ' ' : ''))
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-cyan/30 bg-void/90 font-mono text-[13px] leading-relaxed shadow-[0_0_40px_-12px_rgb(0_229_255/0.45)] backdrop-blur-sm ${className}`}
      onClick={() => {
        // no robar la selección de texto ni el clic en links
        if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true })
      }}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-magenta/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan/80" />
        <span className="ml-3 text-xs text-slate-500">{PROMPT_USER}: ~</span>
        {onClose && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="ml-auto text-xs text-slate-500 hover:text-cyan-soft"
            aria-label={t(ui.terminal.close)}
          >
            esc ✕
          </button>
        )}
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-3 text-slate-200" aria-live="polite">
        {lines.map((l) =>
          l.out !== undefined ? (
            <div key={l.id} className="mb-2 break-words">{l.out}</div>
          ) : (
            <div key={l.id} className="break-words">
              <span className="text-emerald">{PROMPT_USER}</span>
              <Muted>:~$</Muted> {l.cmd}
            </div>
          ),
        )}
        <label className="flex items-center">
          <span className="sr-only">{t(ui.terminal.inputLabel)}</span>
          <span className="shrink-0 text-emerald">{PROMPT_USER}</span>
          <span className="shrink-0 text-slate-500">:~$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            className="min-w-0 flex-1 bg-transparent text-slate-50 caret-cyan outline-none"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-line px-3 py-2.5">
        {QUICK_COMMANDS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={(e) => { e.stopPropagation(); run(c) }}
            className="rounded-md border border-line px-2.5 py-1 text-xs text-slate-400 transition-colors hover:border-cyan/50 hover:text-cyan-soft"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
