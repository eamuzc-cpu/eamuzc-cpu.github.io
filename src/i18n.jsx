import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// i18n mínimo sin librería: todo texto traducible es un objeto { es, en }.
// `t(valor)` devuelve la versión del idioma activo; los strings planos (nombres
// de tecnologías, cifras) pasan tal cual.

export const LANGS = ['es', 'en']
const STORAGE_KEY = 'lang'

// Pestaña y descripción del navegador; el index.html trae la versión en español para quien no ejecuta JS.
const META = {
  es: {
    title: 'Esteban Muñoz Cáceres — Automatización Industrial',
    description: 'Esteban Alexander Muñoz Cáceres — Ingeniero en Automatización Industrial, Instrumentación y Desarrollo de Software. Casos de estudio, habilidades y contacto.',
  },
  en: {
    title: 'Esteban Muñoz Cáceres — Industrial Automation',
    description: 'Esteban Alexander Muñoz Cáceres — Industrial Automation, Instrumentation and Software Engineer. Case studies, skills and contact.',
  },
}

function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (LANGS.includes(saved)) return saved
  } catch {
    // almacenamiento bloqueado: seguimos con la detección
  }
  const nav = (navigator.language || 'es').slice(0, 2).toLowerCase()
  return nav === 'en' ? 'en' : 'es'
}

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(detectLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = META[lang].title
    document.querySelector('meta[name="description"]')?.setAttribute('content', META[lang].description)
  }, [lang])

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // sin persistencia; el cambio igual aplica en esta sesión
    }
  }, [])

  const t = useCallback(
    (value) => {
      if (value && typeof value === 'object' && 'es' in value) return value[lang] ?? value.es
      return value
    },
    [lang],
  )

  const ctx = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])
  return <LangContext.Provider value={ctx}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang debe usarse dentro de <LangProvider>')
  return ctx
}
