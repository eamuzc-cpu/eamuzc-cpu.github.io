import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Terminal, { TERMINAL_OPEN_EVENT } from './Terminal'

function isTypingTarget(el) {
  if (!el) return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable
}

// Terminal global: se abre con ` o Ctrl/Cmd+K desde cualquier parte, o con openTerminal().
export default function TerminalOverlay() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      const toggleShortcut = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'
      const backtick = e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey && !isTypingTarget(e.target)
      if (toggleShortcut || backtick) {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(TERMINAL_OPEN_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(TERMINAL_OPEN_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      document.body.style.overflow = ''
      if (lastFocus.current instanceof HTMLElement) lastFocus.current.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-void/75 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.15 }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          role="dialog"
          aria-modal="true"
          aria-label="Terminal"
        >
          <motion.div
            className="w-full max-w-2xl"
            initial={reduce ? false : { y: -12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={reduce ? undefined : { y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <Terminal inputRef={inputRef} onClose={() => setOpen(false)} className="h-[min(70vh,520px)]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
