import { useId } from 'react'
import { useLang } from '../i18n'

// Visuales de proyecto sin fotos stock:
// - ProjectCover: foto real si `project.image` existe; si no, portada SVG temática por categoría.
// - FlowDiagram: diagrama de bloques técnico a partir de `project.diagram`.
// Los colores salen de utilidades de texto (text-cyan, text-magenta) vía currentColor.

function GridBackground({ id }) {
  return (
    <>
      <defs>
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="currentColor" strokeOpacity="0.08" />
        </pattern>
      </defs>
      <rect width="320" height="200" fill={`url(#${id})`} className="text-cyan" />
    </>
  )
}

// Ladder logic: rieles, contactos y bobinas
function AutomationMotif() {
  const rungs = [52, 96, 140]
  return (
    <g fill="none" strokeWidth="1.5">
      <g className="text-cyan" stroke="currentColor">
        <path d="M44 32V168M276 32V168" strokeOpacity="0.7" />
        {rungs.map((y, i) => (
          <g key={y}>
            <path d={`M44 ${y}H96M108 ${y}H150M162 ${y}H224M252 ${y}H276`} strokeOpacity="0.55" />
            <path d={`M96 ${y - 10}V${y + 10}M108 ${y - 10}V${y + 10}`} />
            <path d={`M150 ${y - 10}V${y + 10}M162 ${y - 10}V${y + 10}`} />
            {i === 1 && <path d={`M150 ${y + 10}L162 ${y - 10}`} />}
          </g>
        ))}
      </g>
      <g className="text-magenta" stroke="currentColor">
        {rungs.map((y) => (
          <circle key={y} cx="238" cy={y} r="12" />
        ))}
      </g>
    </g>
  )
}

// Respuesta de un lazo PID acercándose al setpoint
function InstrumentationMotif() {
  return (
    <g fill="none" strokeWidth="1.5">
      <g className="text-cyan" stroke="currentColor">
        <path d="M40 30V166H290" strokeOpacity="0.6" />
        <path d="M40 150C80 150 86 50 116 50C146 50 150 94 176 94C200 94 204 72 226 72C246 72 252 80 290 79" strokeWidth="2" />
      </g>
      <path className="text-magenta" stroke="currentColor" d="M40 78H290" strokeDasharray="6 5" />
      <g className="text-magenta" fill="currentColor" fontFamily="JetBrains Mono, monospace" fontSize="10">
        <text x="252" y="70">SP</text>
      </g>
    </g>
  )
}

// Bounding boxes + trayectoria reconstruida
function VisionMotif() {
  return (
    <g fill="none" strokeWidth="1.5">
      <g className="text-cyan" stroke="currentColor">
        <rect x="58" y="62" width="34" height="64" />
        <rect x="170" y="44" width="34" height="64" />
        <rect x="236" y="96" width="30" height="58" />
      </g>
      <path className="text-magenta" stroke="currentColor" d="M75 150C110 170 150 150 187 124C215 104 240 150 252 160" strokeDasharray="3 5" />
      <g className="text-cyan" fill="currentColor" fontFamily="JetBrains Mono, monospace" fontSize="9">
        <text x="58" y="56">id:07 0.94</text>
        <text x="170" y="38">id:11 0.91</text>
        <text x="236" y="90">id:03 0.88</text>
      </g>
    </g>
  )
}

// Chip con pines y pistas de PCB
function EmbeddedMotif() {
  const pins = [78, 92, 106, 120]
  return (
    <g fill="none" strokeWidth="1.5">
      <g className="text-cyan" stroke="currentColor">
        <rect x="126" y="66" width="68" height="68" rx="4" />
        {pins.map((y) => (
          <path key={`l${y}`} d={`M126 ${y}H112M194 ${y}H208`} />
        ))}
        <path d="M112 78H70V40H30M112 106H60V160H30M208 92H250V36H290M208 120H270V168H290" strokeOpacity="0.55" />
      </g>
      <g className="text-magenta" stroke="currentColor">
        <circle cx="30" cy="40" r="4" />
        <circle cx="30" cy="160" r="4" />
        <circle cx="290" cy="36" r="4" />
        <circle cx="290" cy="168" r="4" />
        <circle cx="160" cy="100" r="10" />
      </g>
    </g>
  )
}

// Ventana de navegador con layout de tienda
function WebMotif() {
  return (
    <g fill="none" strokeWidth="1.5">
      <g className="text-cyan" stroke="currentColor">
        <rect x="40" y="30" width="240" height="140" rx="6" />
        <path d="M40 50H280" strokeOpacity="0.6" />
        <rect x="58" y="66" width="60" height="60" strokeOpacity="0.7" />
        <rect x="130" y="66" width="60" height="60" strokeOpacity="0.7" />
        <rect x="202" y="66" width="60" height="60" strokeOpacity="0.7" />
        <path d="M58 140H118M130 140H190M202 140H262" strokeOpacity="0.5" />
      </g>
      <g className="text-magenta" fill="currentColor">
        <circle cx="52" cy="40" r="3" />
        <circle cx="62" cy="40" r="3" fillOpacity="0.6" />
        <circle cx="72" cy="40" r="3" fillOpacity="0.3" />
        <rect x="58" y="150" width="40" height="10" rx="2" />
      </g>
    </g>
  )
}

// Red de nodos en capas con un camino activo resaltado
function AIMotif() {
  const layers = [
    { x: 56, ys: [52, 100, 148] },
    { x: 160, ys: [36, 76, 124, 164] },
    { x: 264, ys: [68, 132] },
  ]
  return (
    <g fill="none" strokeWidth="1.5">
      <g className="text-cyan" stroke="currentColor" strokeOpacity="0.3">
        {layers.slice(0, -1).flatMap((layer, i) =>
          layer.ys.flatMap((y1) =>
            layers[i + 1].ys.map((y2) => (
              <path key={`${i}-${y1}-${y2}`} d={`M${layer.x} ${y1}L${layers[i + 1].x} ${y2}`} />
            )),
          ),
        )}
      </g>
      <path className="text-magenta" stroke="currentColor" strokeWidth="2" d="M56 100L160 76L264 132" />
      <g className="text-cyan" fill="currentColor">
        {layers.flatMap((layer) => layer.ys.map((y) => <circle key={`${layer.x}-${y}`} cx={layer.x} cy={y} r="6" />))}
      </g>
      <g className="text-magenta" fill="currentColor">
        <circle cx="56" cy="100" r="7" />
        <circle cx="160" cy="76" r="7" />
        <circle cx="264" cy="132" r="7" />
      </g>
    </g>
  )
}

const MOTIFS = {
  automation: AutomationMotif,
  instrumentation: InstrumentationMotif,
  vision: VisionMotif,
  embedded: EmbeddedMotif,
  web: WebMotif,
  ai: AIMotif,
}

export function ProjectCover({ project, className = '' }) {
  const { t } = useLang()
  const gridId = useId()
  if (project.image) {
    return <img src={project.image} alt={t(project.title)} loading="lazy" className={`h-full w-full object-cover ${className}`} />
  }
  const Motif = MOTIFS[project.category] ?? EmbeddedMotif
  // espejo determinista por slug para que dos proyectos de la misma categoría no se vean idénticos
  // (solo motivos sin texto, para no invertir etiquetas)
  const mirrored = (project.category === 'automation' || project.category === 'embedded') &&
    [...project.slug].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 2 === 1
  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={t(project.title)}
      className={`h-full w-full bg-surface-raised ${className}`}
    >
      <GridBackground id={gridId} />
      {/* margen superior libre para el badge de categoría */}
      <g transform="translate(24 30) scale(0.85)">
        <g transform={mirrored ? 'translate(320 0) scale(-1 1)' : undefined}>
          <Motif />
        </g>
      </g>
    </svg>
  )
}

const NODE_W = 132
const NODE_H = 56
const GAP = 36

// Diagrama de bloques: cadena de nodos izquierda→derecha (vertical en móvil) con un
// lazo de realimentación opcional { from, to, label } (índices de nodo).
export function FlowDiagram({ diagram }) {
  const { t } = useLang()
  const markerId = useId()
  if (!diagram) return null
  return (
    <figure className="rounded-xl border border-line bg-void/50 p-3">
      <div className="hidden sm:block">
        <Diagram diagram={diagram} t={t} vertical={false} markerId={`${markerId}h`} />
      </div>
      <div className="mx-auto max-w-[260px] sm:hidden">
        <Diagram diagram={diagram} t={t} vertical markerId={`${markerId}v`} />
      </div>
    </figure>
  )
}

function Diagram({ diagram, t, vertical, markerId }) {
  const { nodes, feedback } = diagram
  const n = nodes.length
  const pad = 12
  const loopSpace = feedback ? 44 : 0

  const pos = nodes.map((_, i) =>
    vertical
      ? { x: pad, y: pad + i * (NODE_H + GAP) }
      : { x: pad + i * (NODE_W + GAP), y: pad },
  )
  const width = vertical ? NODE_W + pad * 2 + loopSpace : pad * 2 + n * NODE_W + (n - 1) * GAP
  const height = vertical ? pad * 2 + n * NODE_H + (n - 1) * GAP : NODE_H + pad * 2 + loopSpace

  const arrows = pos.slice(0, -1).map((p, i) =>
    vertical
      ? `M${p.x + NODE_W / 2} ${p.y + NODE_H}V${pos[i + 1].y - 3}`
      : `M${p.x + NODE_W} ${p.y + NODE_H / 2}H${pos[i + 1].x - 3}`,
  )

  let loop = null
  if (feedback) {
    const a = pos[feedback.from]
    const b = pos[feedback.to]
    if (vertical) {
      const x = pad + NODE_W + 26
      loop = {
        d: `M${a.x + NODE_W} ${a.y + NODE_H / 2}H${x}V${b.y + NODE_H / 2}H${b.x + NODE_W + 3}`,
        tx: x + 6,
        ty: (a.y + b.y + NODE_H) / 2,
      }
    } else {
      const y = pad + NODE_H + 26
      loop = {
        d: `M${a.x + NODE_W / 2} ${a.y + NODE_H}V${y}H${b.x + NODE_W / 2}V${b.y + NODE_H + 3}`,
        tx: (a.x + b.x + NODE_W) / 2,
        ty: y + 12,
      }
    }
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={nodes.map((nd) => t(nd.label)).join(' → ')}>
      <defs>
        <marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L8 4L0 8z" fill="currentColor" />
        </marker>
      </defs>

      <g className="text-cyan" stroke="currentColor" fill="none" strokeWidth="1.5">
        {arrows.map((d) => (
          <path key={d} d={d} markerEnd={`url(#${markerId})`} />
        ))}
      </g>

      {loop && (
        <g className="text-magenta">
          <path d={loop.d} stroke="currentColor" fill="none" strokeWidth="1.5" strokeDasharray="5 4" markerEnd={`url(#${markerId})`} />
          <text
            x={loop.tx}
            y={loop.ty}
            fill="currentColor"
            fontFamily="JetBrains Mono, monospace"
            fontSize="10"
            textAnchor={vertical ? 'start' : 'middle'}
            writingMode={vertical ? 'vertical-rl' : undefined}
          >
            {t(feedback.label)}
          </text>
        </g>
      )}

      {nodes.map((nd, i) => (
        <g key={i} transform={`translate(${pos[i].x} ${pos[i].y})`}>
          <rect width={NODE_W} height={NODE_H} rx="6" className="fill-surface stroke-cyan/50" strokeWidth="1.2" />
          <text x={NODE_W / 2} y={nd.sub ? 24 : 32} textAnchor="middle" className="fill-slate-100" fontFamily="JetBrains Mono, monospace" fontSize="11.5" fontWeight="600">
            {t(nd.label)}
          </text>
          {nd.sub && (
            <text x={NODE_W / 2} y="41" textAnchor="middle" className="fill-slate-400" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
              {t(nd.sub)}
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}
