export default {
  status: { es: 'Simulado: vehículo y mapa propios (sin hardware ni prototipo)', en: 'Simulated: own vehicle and map (no hardware or prototype)' },
  related: ['brazo-robotico-4gdl', 'pendulo-invertido-pid-lqr', 'gemelo-digital-nodo-iot'],
  es: {
    lead: 'Un vehículo tipo Ackermann va de un punto a otro de un mapa de 60 × 40 m. Se planifica con A* o RRT, se acorta la ruta por línea de vista y el vehículo la sigue con Pure Pursuit. Con un clic se mueve la meta y con Mayús + clic se pone un obstáculo: replanifica desde donde está.',
    context: [
      'Un camino óptimo en una grilla no es un camino que un auto pueda seguir: tiene esquinas y no respeta el radio de giro. Y seguirlo con Pure Pursuit recorta esas esquinas y puede rozar obstáculos.',
      'El proyecto muestra la cadena completa de planificación y seguimiento, y por qué hace falta un margen de seguridad, con números medidos.',
    ],
    how: [
      { t: 'El mapa de ocupación', d: 'El mapa de 60 × 40 m se representa como una grilla de celdas de 0,2 m (300 × 200). Los obstáculos se «inflan» con el radio del vehículo más un margen de seguridad.' },
      { t: 'A* de ocho vecinos', d: 'A* busca el camino más barato con heurística octil y sin cortar esquinas. Su costo es igual al de Dijkstra en 120 mapas aleatorios, con 10 585 expansiones y unos 40 ms en el escenario.' },
      { t: 'RRT como alternativa', d: 'RRT hace crecer un árbol de puntos aleatorios (con semilla fija, para que sea reproducible) hasta alcanzar la meta; encuentra caminos rápido, pero no óptimos.' },
      { t: 'Acortar y remuestrear', d: 'La ruta se acorta por línea de vista (saltando puntos intermedios si el segmento libre es directo) y se remuestrea a puntos equiespaciados.' },
      { t: 'El vehículo', d: 'Un modelo de bicicleta con distancia entre ejes de 2,5 m y dirección máxima de 35°, resuelto de forma exacta: con dirección constante describe un círculo de radio L/tan δ.' },
      { t: 'Pure Pursuit', d: 'El vehículo apunta a un punto de la ruta a una distancia Ld por delante (entre 3 y 8 m, según la velocidad) con δ = atan2(2·L·sin α, Ld).' },
      { t: 'Replanificar', d: 'Un clic cambia la meta y Mayús + clic agrega un obstáculo: se vuelve a planificar desde la posición actual. La «evitación dinámica» es replanificación completa.' },
    ],
    concepts: [
      { t: 'Mapa de ocupación', d: 'Grilla donde cada celda dice si está libre u ocupada.' },
      { t: 'A*', d: 'Búsqueda en grafo que usa una heurística (una estimación del costo restante) para explorar menos celdas que Dijkstra y aun así dar el camino óptimo.' },
      { t: 'RRT', d: 'Rapidly-exploring Random Tree: árbol que crece hacia puntos aleatorios del espacio; muy usado en dimensiones altas, pero no óptimo.' },
      { t: 'Modelo de bicicleta (Ackermann)', d: 'Simplificación de un auto como una bicicleta con una rueda delantera orientable y una trasera; relaciona dirección, velocidad y giro.' },
      { t: 'Pure Pursuit', d: 'Seguimiento de trayectoria que apunta a un punto de la ruta delante del vehículo; es simple y robusto, pero recorta las esquinas.' },
    ],
    decisions: [
      { t: 'Inflar con un margen', d: 'Inflar los obstáculos solo con el radio del vehículo (1,0 m) deja que Pure Pursuit recorte esquinas y roce obstáculos; con 1,2 m el vehículo llega con 0 colisiones.' },
      { t: 'Probar A* contra Dijkstra', d: 'Que A* dé el mismo costo que Dijkstra en 120 mapas aleatorios comprueba que la heurística no sacrifica optimalidad.' },
      { t: 'Ser claro con las limitaciones', d: 'El camino de la grilla no respeta el radio mínimo de giro de 3,57 m: Pure Pursuit lo suaviza, no lo garantiza. RRT no es óptimo.' },
      { t: 'Declarar lo propio', d: 'El mapa, la velocidad y el Ld en función de la velocidad son míos.' },
    ],
    tour: [
      'En «Método» elige A* o RRT y pulsa «Planificar y salir»: el vehículo sigue la ruta con Pure Pursuit.',
      'Marca «mostrar inflado» para ver los obstáculos inflados con el margen.',
      'Haz clic en el mapa para poner una nueva meta, o Mayús + clic para poner un obstáculo: replanifica desde donde está. También puedes usar «Obstáculo sobre la ruta» y «Quitar obstáculos nuevos».',
      'Baja el «Margen de seguridad» a 1,0 m: el vehículo recorta esquinas y roza los obstáculos; con 1,2 m llega con 0 colisiones.',
      'Cambia la «Velocidad» y la «Velocidad de la simulación», y usa «Pausa» para detener la animación.',
    ],
    verified: [
      'A* da el mismo costo que Dijkstra en 120 mapas aleatorios; en el escenario hace 10 585 expansiones en unos 40 ms.',
      'Con obstáculos inflados solo por el radio del vehículo (1,0 m) el vehículo recorta esquinas (error transversal de ≈ 1,1 a 1,5 m) y roza los obstáculos; con un margen de 1,2 m llega a la meta con 0 colisiones, también tras replanificar con un obstáculo nuevo.',
      '17 pruebas automáticas.',
    ],
    limits: [
      'El camino de la grilla no respeta el radio mínimo de giro de 3,57 m: Pure Pursuit lo suaviza, no lo garantiza.',
      'RRT no es óptimo, y la «evitación dinámica» es replanificación completa, no un controlador reactivo.',
      'El mapa, la velocidad y el Ld en función de la velocidad son míos; es una simulación, sin hardware ni prototipo.',
    ],
    next: [
      'Planificar con restricciones de giro (por ejemplo, curvas de Reeds-Shepp o hybrid A*).',
      'Agregar un seguidor que garantice el radio mínimo y obstáculos que se mueven.',
    ],
  },
  en: {
    lead: 'An Ackermann-type vehicle goes from one point to another on a 60 × 40 m map. It plans with A* or RRT, the route is shortened by line of sight and the vehicle follows it with Pure Pursuit. A click moves the goal and Shift + click places an obstacle: it replans from where it is.',
    context: [
      'An optimal path on a grid is not a path a car can follow: it has corners and does not respect the turning radius. And following it with Pure Pursuit cuts those corners and may graze obstacles.',
      'The project shows the whole planning and tracking chain, and why a safety margin is needed, with measured numbers.',
    ],
    how: [
      { t: 'The occupancy map', d: 'The 60 × 40 m map is represented as a grid of 0.2 m cells (300 × 200). Obstacles are "inflated" by the vehicle’s radius plus a safety margin.' },
      { t: 'Eight-neighbour A*', d: 'A* searches for the cheapest path with an octile heuristic and no corner cutting. Its cost equals Dijkstra’s on 120 random maps, with 10,585 expansions and about 40 ms in the scenario.' },
      { t: 'RRT as an alternative', d: 'RRT grows a tree of random points (with a fixed seed, so it is reproducible) until it reaches the goal; it finds paths fast, but not optimal ones.' },
      { t: 'Shorten and resample', d: 'The route is shortened by line of sight (skipping intermediate points if the free segment is direct) and resampled to evenly spaced points.' },
      { t: 'The vehicle', d: 'A bicycle model with a 2.5 m wheelbase and 35° maximum steering, solved exactly: with constant steering it describes a circle of radius L/tan δ.' },
      { t: 'Pure Pursuit', d: 'The vehicle aims at a point on the route a distance Ld ahead (between 3 and 8 m, depending on speed) with δ = atan2(2·L·sin α, Ld).' },
      { t: 'Replan', d: 'A click changes the goal and Shift + click adds an obstacle: it replans from the current position. "Dynamic avoidance" is full replanning.' },
    ],
    concepts: [
      { t: 'Occupancy map', d: 'A grid where each cell says whether it is free or occupied.' },
      { t: 'A*', d: 'A graph search that uses a heuristic (an estimate of the remaining cost) to explore fewer cells than Dijkstra and still give the optimal path.' },
      { t: 'RRT', d: 'Rapidly-exploring Random Tree: a tree that grows towards random points in space; widely used in high dimensions, but not optimal.' },
      { t: 'Bicycle model (Ackermann)', d: 'A simplification of a car as a bicycle with a steerable front wheel and a rear one; it relates steering, speed and turn.' },
      { t: 'Pure Pursuit', d: 'Path tracking that aims at a point on the route ahead of the vehicle; it is simple and robust, but cuts corners.' },
    ],
    decisions: [
      { t: 'Inflate with a margin', d: 'Inflating obstacles only by the vehicle’s radius (1.0 m) lets Pure Pursuit cut corners and graze obstacles; with 1.2 m the vehicle arrives with 0 collisions.' },
      { t: 'Test A* against Dijkstra', d: 'A* giving the same cost as Dijkstra on 120 random maps checks that the heuristic does not sacrifice optimality.' },
      { t: 'Be clear about limitations', d: 'The grid path does not respect the minimum turning radius of 3.57 m: Pure Pursuit smooths it, it does not guarantee it. RRT is not optimal.' },
      { t: 'State what is mine', d: 'The map, the speed and Ld as a function of speed are mine.' },
    ],
    tour: [
      'Under "Método" (method) choose A* or RRT and press "Planificar y salir" (plan and go): the vehicle follows the route with Pure Pursuit.',
      'Tick "mostrar inflado" (show inflation) to see the obstacles inflated with the margin.',
      'Click on the map to set a new goal, or Shift + click to place an obstacle: it replans from where it is. You can also use "Obstáculo sobre la ruta" (obstacle on the route) and "Quitar obstáculos nuevos" (remove new obstacles).',
      'Lower the "Margen de seguridad" (safety margin) to 1.0 m: the vehicle cuts corners and grazes obstacles; with 1.2 m it arrives with 0 collisions.',
      'Change the "Velocidad" (speed) and the "Velocidad de la simulación" (simulation speed), and use "Pausa" to stop the animation.',
    ],
    verified: [
      'A* gives the same cost as Dijkstra on 120 random maps; in the scenario it makes 10,585 expansions in about 40 ms.',
      'With obstacles inflated only by the vehicle’s radius (1.0 m) the vehicle cuts corners (cross-track error of ≈ 1.1 to 1.5 m) and grazes obstacles; with a 1.2 m margin it reaches the goal with 0 collisions, also after replanning with a new obstacle.',
      '17 automated tests.',
    ],
    limits: [
      'The grid path does not respect the minimum turning radius of 3.57 m: Pure Pursuit smooths it, it does not guarantee it.',
      'RRT is not optimal, and "dynamic avoidance" is full replanning, not a reactive controller.',
      'The map, the speed and Ld as a function of speed are mine; it is a simulation, with no hardware or prototype.',
    ],
    next: [
      'Plan with turning constraints (for example, Reeds-Shepp curves or hybrid A*).',
      'Add a follower that guarantees the minimum radius and moving obstacles.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Del mapa al vehículo', en: 'From map to vehicle' },
      caption: {
        es: 'La ruta se planifica sobre el mapa inflado y el vehículo la sigue; si cambia la meta o aparece un obstáculo, se vuelve a planificar desde la posición actual.',
        en: 'The route is planned on the inflated map and the vehicle follows it; if the goal changes or an obstacle appears, it replans from the current position.',
      },
      nodes: [
        { id: 'map', label: { es: 'Mapa', en: 'Map' }, sub: { es: 'celdas de 0,2 m', en: '0.2 m cells' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'pla', label: { es: 'Planificador', en: 'Planner' }, sub: 'A* / RRT', col: 1, row: 0, tone: 'magenta' },
        { id: 'pp', label: 'Pure Pursuit', sub: 'Ld 3–8 m', col: 2, row: 0, tone: 'amber' },
        { id: 'veh', label: { es: 'Vehículo', en: 'Vehicle' }, sub: { es: 'Ackermann · 35°', en: 'Ackermann · 35°' }, col: 3, row: 0 },
      ],
      edges: [
        { from: 'map', to: 'pla' },
        { from: 'pla', to: 'pp', label: { es: 'ruta', en: 'route' } },
        { from: 'pp', to: 'veh', label: 'δ' },
        { from: 'veh', to: 'map', loop: true, dashed: true, label: { es: 'replanificar', en: 'replan' } },
      ],
    },
    {
      kind: 'graph',
      placement: 'decisions',
      title: { es: 'Por qué hace falta un margen', en: 'Why a margin is needed' },
      caption: {
        es: 'El camino óptimo de A* pasa pegado a los obstáculos. Pure Pursuit recorta las esquinas, así que sin margen el vehículo roza o choca; con un margen de 1,2 m llega con 0 colisiones.',
        en: 'A*’s optimal path hugs the obstacles. Pure Pursuit cuts corners, so without margin the vehicle grazes or hits; with a 1.2 m margin it arrives with 0 collisions.',
      },
      nodes: [
        { id: 'a', label: { es: 'Camino óptimo', en: 'Optimal path' }, sub: { es: 'con esquinas', en: 'with corners' }, col: 0, row: 0 },
        { id: 'b', label: { es: 'Pure Pursuit', en: 'Pure Pursuit' }, sub: { es: 'recorta esquinas', en: 'cuts corners' }, col: 1, row: 0, tone: 'amber' },
        { id: 'c', label: { es: 'Sin margen (1,0 m)', en: 'No margin (1.0 m)' }, sub: { es: 'roza obstáculos', en: 'grazes obstacles' }, col: 2, row: 0, tone: 'magenta' },
        { id: 'd', label: { es: 'Margen de 1,2 m', en: '1.2 m margin' }, sub: { es: '0 colisiones', en: '0 collisions' }, col: 2, row: 1, tone: 'emerald' },
      ],
      edges: [
        { from: 'a', to: 'b' },
        { from: 'b', to: 'c', label: { es: 'sin margen', en: 'no margin' } },
        { from: 'b', to: 'd', label: { es: 'con margen', en: 'with margin' } },
      ],
    },
  ],
}
