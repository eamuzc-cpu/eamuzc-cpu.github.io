import { motion, useReducedMotion } from 'framer-motion'

const NODES = [
  { id: 'n1', x: 40, y: 60 },
  { id: 'n2', x: 140, y: 30 },
  { id: 'n3', x: 260, y: 55 },
  { id: 'n4', x: 340, y: 110 },
  { id: 'n5', x: 70, y: 180 },
  { id: 'n6', x: 210, y: 170 },
  { id: 'n7', x: 320, y: 220 },
  { id: 'n8', x: 120, y: 280 },
  { id: 'n9', x: 260, y: 320 },
  { id: 'n10', x: 40, y: 340 },
]

const EDGES = [
  ['n1', 'n2'],
  ['n2', 'n3'],
  ['n3', 'n4'],
  ['n1', 'n5'],
  ['n2', 'n6'],
  ['n3', 'n6'],
  ['n4', 'n7'],
  ['n5', 'n6'],
  ['n6', 'n7'],
  ['n5', 'n8'],
  ['n6', 'n9'],
  ['n7', 'n9'],
  ['n8', 'n9'],
  ['n8', 'n10'],
]

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]))

export default function NetworkGraph({ className = '' }) {
  const reduce = useReducedMotion()

  return (
    <svg
      viewBox="0 0 380 380"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#22d3ee" strokeOpacity="0.18" strokeWidth="1">
        {EDGES.map(([a, b]) => {
          const from = byId[a]
          const to = byId[b]
          return <line key={`${a}-${b}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
        })}
      </g>
      <g fill="#22d3ee">
        {NODES.map((node, i) =>
          reduce ? (
            <circle key={node.id} cx={node.x} cy={node.y} r={3} opacity={0.4} />
          ) : (
            <motion.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={3}
              initial={{ opacity: 0.25 }}
              animate={{ opacity: [0.25, 0.7, 0.25] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (i % 5) * 0.4,
              }}
            />
          ),
        )}
      </g>
    </svg>
  )
}
