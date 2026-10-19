import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile'

const LINKS = [
  { icon: MessageCircle, href: profile.whatsapp, label: 'WhatsApp' },
  { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
]

export default function SocialRail() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      {LINKS.map(({ icon: Icon, href, label }) => (
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
      <span className="h-16 w-px bg-line" />
    </motion.div>
  )
}
