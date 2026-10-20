// Valida las páginas completas de proyecto (src/data/pages/<slug>.js) antes de compilar:
//   node scripts/check-pages.mjs            → todas
//   node scripts/check-pages.mjs pid-pasteurizador alarmas-isa182
// Comprueba: un archivo por proyecto de projects.js, mismas listas en es y en, formas de datos, `related` válidos y que
// los diagramas quepan (texto de nodos, ids, celdas, flechas, etiquetas). Sale con código 1 si algo falla.
import { readdirSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { join } from 'node:path'

const dir = fileURLToPath(new URL('../src/data/pages/', import.meta.url))
const { projects } = await import(pathToFileURL(fileURLToPath(new URL('../src/data/projects.js', import.meta.url))).href)
const only = process.argv.slice(2)
const archivos = readdirSync(dir).filter((f) => f.endsWith('.js') && (only.length === 0 || only.includes(f.slice(0, -3))))
const TONES = ['cyan', 'magenta', 'amber', 'emerald', 'plain']
const PLACEMENTS = ['overview', 'context', 'how-top', 'how', 'concepts', 'decisions', 'results']
const LISTS = ['context', 'how', 'concepts', 'decisions', 'tour', 'verified', 'limits', 'next']
let problemas = 0
const mal = (slug, msg) => {
  problemas++
  console.log(`  ✗ ${slug}: ${msg}`)
}
const bil = (v) => (v && typeof v === 'object' ? v : { es: v, en: v })

function lineas(texto, max) {
  const out = []
  let cur = ''
  for (const w of String(texto).split(/\s+/)) {
    const next = cur ? `${cur} ${w}` : w
    if (next.length <= max || !cur) cur = next
    else {
      out.push(cur)
      cur = w
    }
  }
  if (cur) out.push(cur)
  return out
}

if (only.length === 0) {
  const slugs = projects.map((p) => p.slug)
  const files = archivos.map((f) => f.slice(0, -3))
  for (const s of slugs) if (!files.includes(s)) mal(s, 'el proyecto no tiene archivo en src/data/pages/')
  for (const f of files) if (!slugs.includes(f)) mal(f, 'archivo sin proyecto en projects.js')
}
const slugsValidos = new Set(projects.map((p) => p.slug))
let caracteres = 0

for (const f of archivos) {
  const slug = f.slice(0, -3)
  let page
  try {
    page = (await import(pathToFileURL(join(dir, f)).href)).default
  } catch (e) {
    mal(slug, 'no carga: ' + e.message)
    continue
  }
  if (!page.es || !page.en) mal(slug, 'falta es o en')
  if (!page.status?.es || !page.status?.en) mal(slug, 'falta status {es,en}')
  if (!Array.isArray(page.related) || page.related.length < 2) mal(slug, 'related debe tener al menos 2 slugs')
  for (const r of page.related ?? []) if (!slugsValidos.has(r) || r === slug) mal(slug, `related «${r}» no es un proyecto válido`)
  const conDemo = projects.find((p) => p.slug === slug)?.demo
  for (const lang of ['es', 'en']) {
    const c = page[lang]
    if (!c) continue
    if (typeof c.lead !== 'string' || c.lead.length < 80) mal(slug, `${lang}.lead corto o ausente`)
    if (conDemo && !(c.tour?.length >= 3)) mal(slug, `${lang}.tour: un proyecto con demo necesita al menos 3 pasos`)
    for (const k of LISTS) {
      const a = c[k]
      const b = page[lang === 'es' ? 'en' : 'es']?.[k]
      if (a === undefined && b === undefined) continue
      if (!Array.isArray(a)) { mal(slug, `${lang}.${k} no es arreglo`); continue }
      if (!b || a.length !== b.length) mal(slug, `${k}: es y en tienen distinta cantidad`)
      a.forEach((it, i) => {
        if (['how', 'concepts', 'decisions'].includes(k)) {
          if (typeof it?.t !== 'string' || typeof it?.d !== 'string' || !it.t || !it.d) mal(slug, `${lang}.${k}[${i}] necesita t y d`)
        } else if (typeof it !== 'string' || !it) mal(slug, `${lang}.${k}[${i}] debe ser un string`)
      })
    }
    for (const k of Object.keys(c)) if (!['lead', ...LISTS].includes(k)) mal(slug, `${lang}: clave desconocida ${k}`)
    for (const k of LISTS) for (const it of c[k] ?? []) caracteres += (typeof it === 'string' ? it : it.t + it.d).length
  }
  const ds = page.diagrams ?? []
  ds.forEach((d, di) => {
    const tag = `diagrama ${di} (${d.kind}/${d.placement})`
    if (!PLACEMENTS.includes(d.placement)) mal(slug, `${tag}: placement inválido`)
    if (!d.title?.es || !d.title?.en) mal(slug, `${tag}: título es/en`)
    if (d.caption && (!d.caption.es || !d.caption.en)) mal(slug, `${tag}: caption es/en`)
    if (d.kind === 'bars') {
      if (!Array.isArray(d.rows) || !d.rows.length) mal(slug, `${tag}: sin rows`)
      d.rows?.forEach((r, ri) => {
        if (!r.label?.es || !r.label?.en) mal(slug, `${tag}: fila ${ri} label es/en`)
        if (!r.items || r.items.length < 2) mal(slug, `${tag}: fila ${ri} necesita al menos 2 items`)
        r.items?.forEach((it, ii) => {
          if (typeof it.value !== 'number') mal(slug, `${tag}: fila ${ri} item ${ii} value numérico`)
          if (it.tone && !TONES.includes(it.tone)) mal(slug, `${tag}: tone ${it.tone}`)
          if (it.label === undefined) mal(slug, `${tag}: fila ${ri} item ${ii} sin label`)
        })
      })
    } else if (d.kind === 'graph') {
      const ids = new Set()
      const celdas = new Set()
      if (!d.nodes?.length) mal(slug, `${tag}: sin nodes`)
      d.nodes?.forEach((n) => {
        if (ids.has(n.id)) mal(slug, `${tag}: id repetido ${n.id}`)
        ids.add(n.id)
        const celda = `${n.col},${n.row}`
        if (celdas.has(celda)) mal(slug, `${tag}: dos nodos en la celda ${celda}`)
        celdas.add(celda)
        if (!Number.isInteger(n.col) || !Number.isInteger(n.row)) mal(slug, `${tag}: col/row de ${n.id}`)
        if (n.tone && !TONES.includes(n.tone)) mal(slug, `${tag}: tone ${n.tone}`)
        for (const lang of ['es', 'en']) {
          const L = bil(n.label)[lang]
          if (!L) { mal(slug, `${tag}: label ${n.id} sin ${lang}`); continue }
          const ls = lineas(L, 19)
          if (ls.length > 2) mal(slug, `${tag}: label «${L}» (${lang}) pasa de 2 líneas`)
          if (ls.some((l) => l.length > 21)) mal(slug, `${tag}: label «${L}» (${lang}) tiene una palabra muy larga`)
          if (n.sub) {
            const S = bil(n.sub)[lang]
            if (!S) mal(slug, `${tag}: sub ${n.id} sin ${lang}`)
            else if (S.length > 25) mal(slug, `${tag}: sub «${S}» (${lang}) pasa de 25 caracteres`)
          }
        }
      })
      if (Math.max(...(d.nodes ?? []).map((n) => n.col)) + 1 > 5) mal(slug, `${tag}: más de 5 columnas`)
      d.edges?.forEach((e, ei) => {
        if (!ids.has(e.from) || !ids.has(e.to)) mal(slug, `${tag}: flecha ${ei} con nodo inexistente (${e.from} → ${e.to})`)
        if (e.label) for (const lang of ['es', 'en']) if (!bil(e.label)[lang]) mal(slug, `${tag}: flecha ${ei} label sin ${lang}`)
        const A = d.nodes?.find((n) => n.id === e.from)
        const B = d.nodes?.find((n) => n.id === e.to)
        const recta = !e.loop && !e.loopTop
        if (A && B && A.row !== B.row && A.col !== B.col && !e.v && recta) {
          const [lo, hi] = [Math.min(A.col, B.col), Math.max(A.col, B.col)]
          if (d.nodes.some((n) => n.row === A.row && n.col > lo && n.col < hi)) mal(slug, `${tag}: el codo ${e.from}→${e.to} cruza un nodo de la fila de origen (usa v: true)`)
        }
        if (e.label && A && B && A.row === B.row && recta) {
          const tramo = Math.abs(A.col - B.col)
          for (const lang of ['es', 'en']) {
            const L = bil(e.label)[lang]
            if (L && L.length > 10 + 22 * (tramo - 1)) mal(slug, `${tag}: etiqueta «${L}» (${lang}) no cabe en la flecha ${e.from}→${e.to}`)
          }
        }
        if (e.label && A && B && recta && A.row !== B.row) {
          for (const lang of ['es', 'en']) {
            const L = bil(e.label)[lang]
            if (L && L.length > 24) mal(slug, `${tag}: etiqueta «${L}» (${lang}) muy larga en ${e.from}→${e.to}`)
          }
        }
        if (A && B && A.row === B.row && recta) {
          const [lo, hi] = [Math.min(A.col, B.col), Math.max(A.col, B.col)]
          if (d.nodes.some((n) => n.row === A.row && n.col > lo && n.col < hi)) mal(slug, `${tag}: la flecha ${e.from}→${e.to} cruza un nodo intermedio`)
        }
        if (A && B && A.col === B.col && recta && Math.abs(A.row - B.row) > 1) {
          const [lo, hi] = [Math.min(A.row, B.row), Math.max(A.row, B.row)]
          if (d.nodes.some((n) => n.col === A.col && n.row > lo && n.row < hi)) mal(slug, `${tag}: la flecha ${e.from}→${e.to} cruza un nodo intermedio`)
        }
      })
      d.groups?.forEach((g, gi) => {
        if (!g.label?.es || !g.label?.en) mal(slug, `${tag}: grupo ${gi} label es/en`)
      })
    } else mal(slug, `${tag}: kind desconocido`)
  })
  if (!ds.some((d) => d.kind === 'graph')) mal(slug, 'falta al menos un diagrama graph')
}

console.log(problemas ? `${problemas} problema(s)` : 'Todo en orden', `· ${archivos.length} páginas · ${caracteres} caracteres de texto (es + en)`)
process.exitCode = problemas ? 1 : 0
