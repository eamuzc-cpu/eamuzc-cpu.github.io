import { useId } from 'react'
import { useLang } from '../i18n'

// Diagramas de la página completa de cada proyecto, definidos como datos en src/data/pages/<slug>.js:
// - kind 'graph': bloques en una cuadrícula (col, row) unidos por flechas, con zonas opcionales.
// - kind 'bars':  comparación de valores (antes/después, con/sin, método A/B).
// Los textos son { es, en } o strings planos.

const NW = 148
const NH = 60
const PX = 212
const PY = 96
const PAD = 14
const GAPX = PX - NW
const GAPY = PY - NH

const TONES = {
  cyan: { stroke: 'stroke-cyan/60', text: 'fill-slate-100' },
  magenta: { stroke: 'stroke-magenta/70', text: 'fill-slate-100' },
  amber: { stroke: 'stroke-amber/70', text: 'fill-slate-100' },
  emerald: { stroke: 'stroke-emerald/70', text: 'fill-slate-100' },
  plain: { stroke: 'stroke-slate-600', text: 'fill-slate-200' },
}

const EDGE_TONES = {
  cyan: 'text-cyan/80',
  magenta: 'text-magenta/90',
  amber: 'text-amber/90',
  emerald: 'text-emerald/90',
  plain: 'text-slate-500',
}

// Parte el texto en hasta 2 líneas de `max` caracteres (src/data/pages se valida aparte con un script).
function wrap(text, max) {
  const lines = []
  let cur = ''
  for (const w of String(text).split(/\s+/)) {
    const next = cur ? `${cur} ${w}` : w
    if (next.length <= max || !cur) cur = next
    else {
      lines.push(cur)
      cur = w
    }
  }
  if (cur) lines.push(cur)
  return lines
}

function GraphDiagram({ diagram }) {
  const { t } = useLang()
  const markerId = useId()
  const { nodes, edges = [], groups = [] } = diagram

  const cols = Math.max(...nodes.map((n) => n.col)) + 1
  const rows = Math.max(...nodes.map((n) => n.row)) + 1
  const top = groups.length ? 34 : PAD
  const hasLoopBelow = edges.some((e) => e.loop)
  const hasLoopTop = edges.some((e) => e.loopTop)
  const topPad = top + (hasLoopTop ? 26 : 0)
  const width = PAD * 2 + (cols - 1) * PX + NW
  const height = topPad + (rows - 1) * PY + NH + PAD + (hasLoopBelow ? 30 : 0) + (groups.length ? 10 : 0)

  const byId = Object.fromEntries(
    nodes.map((n) => {
      const x = PAD + n.col * PX
      const y = topPad + n.row * PY
      return [n.id, { ...n, x, y, cx: x + NW / 2, cy: y + NH / 2, r: x + NW, l: x, t: y, b: y + NH }]
    }),
  )

  const route = (e) => {
    const A = byId[e.from]
    const B = byId[e.to]
    if (!A || !B) return null
    if (e.loop) {
      const y = Math.max(A.b, B.b) + 22
      return { d: `M${A.cx} ${A.b}V${y}H${B.cx}V${B.b + 3}`, lx: (A.cx + B.cx) / 2, ly: y + 12, anchor: 'middle' }
    }
    if (e.loopTop) {
      const y = Math.min(A.t, B.t) - 22
      return { d: `M${A.cx} ${A.t}V${y}H${B.cx}V${B.t - 3}`, lx: (A.cx + B.cx) / 2, ly: y - 6, anchor: 'middle' }
    }
    if (A.row === B.row) {
      const fwd = B.col > A.col
      const x1 = fwd ? A.r : A.l
      const x2 = fwd ? B.l - 3 : B.r + 3
      return { d: `M${x1} ${A.cy}H${x2}`, lx: (x1 + x2) / 2, ly: A.cy - 7, anchor: 'middle' }
    }
    if (A.col === B.col) {
      const down = B.row > A.row
      const y1 = down ? A.b : A.t
      const y2 = down ? B.t - 3 : B.b + 3
      return { d: `M${A.cx} ${y1}V${y2}`, lx: A.cx + 7, ly: (y1 + y2) / 2 + 3, anchor: 'start' }
    }
    if (e.v) {
      const down = B.row > A.row
      const y1 = down ? A.b : A.t
      const ym = down ? B.t - GAPY / 2 : B.b + GAPY / 2
      const y2 = down ? B.t - 3 : B.b + 3
      return { d: `M${A.cx} ${y1}V${ym}H${B.cx}V${y2}`, lx: (A.cx + B.cx) / 2, ly: ym - 5, anchor: 'middle' }
    }
    const fwd = B.col > A.col
    const x1 = fwd ? A.r : A.l
    const xm = fwd ? B.l - GAPX / 2 : B.r + GAPX / 2
    const x2 = fwd ? B.l - 3 : B.r + 3
    return { d: `M${x1} ${A.cy}H${xm}V${B.cy}H${x2}`, lx: xm + 6, ly: (A.cy + B.cy) / 2 + 3, anchor: 'start' }
  }

  const label = nodes.map((n) => t(n.label)).join(' → ')

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto h-auto w-full"
        style={{ minWidth: Math.round(width * 0.8), maxWidth: Math.round(width * 1.2) }}
        role="img"
        aria-label={label}
      >
        <defs>
          {Object.keys(EDGE_TONES).map((k) => (
            <marker key={k} id={`${markerId}${k}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L8 4L0 8z" fill="currentColor" className={EDGE_TONES[k]} />
            </marker>
          ))}
        </defs>

        {groups.map((g, i) => {
          const x = PAD + g.cols[0] * PX - 12
          const y = topPad + g.rows[0] * PY - 24
          const w = (g.cols[1] - g.cols[0]) * PX + NW + 24
          const h = (g.rows[1] - g.rows[0]) * PY + NH + 36
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} rx="10" fill="none" className="stroke-slate-600" strokeWidth="1" strokeDasharray="4 4" />
              <text x={x + 10} y={y + 14} className="fill-slate-500" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="0.06em">
                {String(t(g.label)).toUpperCase()}
              </text>
            </g>
          )
        })}

        {edges.map((e, i) => {
          const r = route(e)
          if (!r) return null
          const tone = e.tone ?? (e.dashed ? 'magenta' : 'cyan')
          return (
            <g key={i} className={EDGE_TONES[tone]}>
              <path
                d={r.d}
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                strokeDasharray={e.dashed ? '5 4' : undefined}
                markerEnd={`url(#${markerId}${tone})`}
              />
              {e.label && (
                <text
                  x={r.lx}
                  y={r.ly}
                  textAnchor={r.anchor}
                  fill="currentColor"
                  stroke="#0b0e16"
                  strokeWidth="4"
                  paintOrder="stroke"
                  strokeLinejoin="round"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9.5"
                >
                  {t(e.label)}
                </text>
              )}
            </g>
          )
        })}

        {nodes.map((n) => {
          const { x, y } = byId[n.id]
          const tone = TONES[n.tone] ?? TONES.cyan
          const lines = wrap(t(n.label), 19).slice(0, 2)
          const sub = n.sub ? wrap(t(n.sub), 25).slice(0, 1) : []
          const total = lines.length + sub.length
          const y0 = (NH - total * 13) / 2 + 10
          return (
            <g key={n.id} transform={`translate(${x} ${y})`}>
              <rect width={NW} height={NH} rx="6" className={`fill-surface ${tone.stroke}`} strokeWidth="1.3" />
              {lines.map((ln, i) => (
                <text key={i} x={NW / 2} y={y0 + i * 13} textAnchor="middle" className={tone.text} fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="600">
                  {ln}
                </text>
              ))}
              {sub.map((ln, i) => (
                <text key={`s${i}`} x={NW / 2} y={y0 + lines.length * 13 + i * 13} textAnchor="middle" className="fill-slate-400" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
                  {ln}
                </text>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

const BAR_TONES = {
  cyan: 'bg-cyan/70',
  magenta: 'bg-magenta/70',
  amber: 'bg-amber/70',
  emerald: 'bg-emerald/70',
  plain: 'bg-slate-500/70',
}

function BarsDiagram({ diagram }) {
  const { t } = useLang()
  return (
    <div className="space-y-5">
      {diagram.rows.map((row, ri) => {
        const max = Math.max(...row.items.map((i) => i.value), 1e-9)
        return (
          <div key={ri}>
            <div className="mb-2 text-xs font-medium text-slate-300">{t(row.label)}</div>
            <div className="space-y-1.5">
              {row.items.map((it, ii) => (
                <div key={ii} className="flex items-center gap-3">
                  <div className="w-32 shrink-0 text-[11px] leading-tight text-slate-400 sm:w-44">{t(it.label)}</div>
                  <div className="h-5 min-w-0 flex-1 overflow-hidden rounded bg-void/70">
                    <div
                      className={`h-full rounded ${BAR_TONES[it.tone] ?? BAR_TONES.cyan}`}
                      style={{ width: `${it.value > 0 ? Math.max(1.5, (it.value / max) * 100) : 0}%` }}
                    />
                  </div>
                  <div className="w-20 shrink-0 text-right font-mono text-xs text-slate-100 sm:w-24">{t(it.text) ?? it.value}</div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function DiagramBlock({ diagram }) {
  const { t } = useLang()
  if (!diagram) return null
  return (
    <figure className="my-6 rounded-2xl border border-line bg-void/50 p-4 sm:p-5">
      {diagram.title && <div className="mb-4 font-mono text-[11px] uppercase tracking-wider text-cyan-soft">{t(diagram.title)}</div>}
      {diagram.kind === 'bars' ? <BarsDiagram diagram={diagram} /> : <GraphDiagram diagram={diagram} />}
      {diagram.caption && (
        <figcaption className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-slate-400">{t(diagram.caption)}</figcaption>
      )}
    </figure>
  )
}
