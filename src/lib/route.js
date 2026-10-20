import { useEffect, useRef, useState } from 'react'

// Ruteo mínimo por hash (GitHub Pages no sirve rutas profundas): `#/proyecto/<slug>` abre la página
// completa de un proyecto; cualquier otro hash (`#proyectos`, `#contacto`…) es la portada de siempre.
const PREFIX = '#/proyecto/'

export const projectHref = (slug) => PREFIX + slug

const parse = () => {
  const h = window.location.hash
  return h.startsWith(PREFIX) ? decodeURIComponent(h.slice(PREFIX.length)).replace(/\/$/, '') : null
}

// Posición de la portada al salir hacia un proyecto, para volver al mismo punto con "atrás".
let homeY = 0
export const savedHomeY = () => homeY

export function useProjectRoute() {
  const [slug, setSlug] = useState(parse)
  const current = useRef(slug)

  useEffect(() => {
    const onHash = () => {
      const next = parse()
      if (current.current === null && next !== null) homeY = window.scrollY
      current.current = next
      setSlug(next)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return slug
}
