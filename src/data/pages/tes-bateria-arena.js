export default {
  status: { es: 'Tesis de ingeniería (modelo numérico en MATLAB)', en: 'Engineering thesis (numerical model in MATLAB)' },
  related: ['pid-pasteurizador', 'espectrograma-fft-blackman-harris', 'planificador-rutas-autonomas'],
  es: {
    lead: 'Un modelo numérico en MATLAB de un silo de arena calentado con resistencias eléctricas, pensado para guardar excedentes de energía renovable como calor. Sirve para comparar disposiciones de calefactores y decidir dónde conviene ponerlos antes de construir nada.',
    context: [
      'Las energías renovables producen más de lo que se consume en ciertos momentos. Una «batería de arena» aprovecha ese excedente calentando arena, que guarda el calor y lo puede devolver después. El problema es que su rendimiento depende de cómo se reparte la temperatura dentro del silo.',
      'Una mala disposición de los calefactores deja zonas frías y sobrecalienta otras, y se desperdicia energía almacenada. Probar cada disposición en físico sería lento y caro; por eso el trabajo es una simulación que permite comparar geometrías antes de construir.',
    ],
    how: [
      { t: 'Parámetros físicos', d: 'Se definen las propiedades de la arena y del silo (conductividad, capacidad calorífica, dimensiones) en un módulo aparte, para poder cambiarlas sin tocar el solver.' },
      { t: 'Geometría 3D del silo', d: 'El silo se representa como una malla 3D de celdas. Cada celda guarda su temperatura.' },
      { t: 'Calefactores', d: 'Los calefactores se marcan como celdas que aportan potencia. Su disposición (dónde están y cuántos) es lo que se quiere optimizar.' },
      { t: 'Conductividad térmica variable', d: 'La arena es un medio poroso: su conductividad cambia con las condiciones, y el modelo lo contempla en lugar de asumir un valor fijo.' },
      { t: 'Solver de diferencias finitas 3D', d: 'En cada paso de tiempo, la temperatura de una celda se actualiza según la de sus vecinas (ecuación del calor discretizada). Así se calcula cómo el calor se propaga por el silo.' },
      { t: 'Visualización', d: 'Los resultados se muestran como mapas de temperatura y animaciones del calentamiento.' },
      { t: 'Optimización QPSO', d: 'Un enjambre de partículas cuánticas (QPSO) propone disposiciones de calefactores y el simulador evalúa cada una. Con esa realimentación el enjambre se acerca a las mejores.' },
      { t: 'Patrones y llenado', d: 'También se compararon patrones geométricos (espiral, hexagonal, radial, fractal) y se simuló el flujo de partículas al llenar el silo.' },
    ],
    concepts: [
      { t: 'Almacenamiento térmico', d: 'Guardar energía como calor (en arena, agua, sales…) en vez de como electricidad. Es barato y duradero, pero hay que gestionar cómo se reparte el calor.' },
      { t: 'Diferencias finitas', d: 'Método numérico que reemplaza derivadas por diferencias entre celdas vecinas. Es la forma más directa de resolver la ecuación del calor en una malla.' },
      { t: 'Medio poroso', d: 'Material con huecos (como la arena) cuya conductividad efectiva depende del contacto entre granos y del aire en medio.' },
      { t: 'QPSO', d: 'Optimización por enjambre de partículas con comportamiento cuántico: muchas soluciones candidatas exploran el espacio a la vez y se atraen hacia las mejores encontradas, sin necesitar derivadas.' },
    ],
    decisions: [
      { t: 'Un simulador modular', d: 'Separar parámetros, geometría, calefactores y solver permite reutilizar el mismo solver para probar muchas disposiciones y optimizar sobre él.' },
      { t: 'Optimizar sobre el simulador', d: 'En vez de probar a mano unas cuantas disposiciones, se delega la búsqueda a un algoritmo que explora muchas más.' },
      { t: 'Comparar patrones con criterio', d: 'Las geometrías (espiral, hexagonal, radial, fractal) se evalúan con el mismo modelo, de modo que las diferencias vienen de la disposición y no del método.' },
    ],
    verified: [
      'Malla de simulación 3D con método de diferencias finitas y optimizador QPSO.',
      'Comparación de cuatro patrones geométricos de calefactores y simulación del llenado del silo.',
    ],
    limits: [
      'Es un modelo numérico de una tesis: esta página describe el modelo y el método, no incluye resultados experimentales de un silo físico.',
      'La calidad de las conclusiones depende de los parámetros físicos de la arena que se usen.',
      'Se programó en MATLAB, así que no hay demo en el navegador.',
    ],
    next: [
      'Contrastar el modelo con mediciones de temperatura de un silo real.',
      'Agregar pérdidas por las paredes y por la superficie para acercar el modelo a un caso de operación.',
    ],
  },
  en: {
    lead: 'A numerical model in MATLAB of a sand silo heated with electric resistors, meant to store renewable-energy surpluses as heat. It is used to compare heater layouts and decide where to place them before building anything.',
    context: [
      'Renewables produce more than is consumed at certain moments. A "sand battery" uses that surplus to heat sand, which holds the heat and can give it back later. The catch is that its performance depends on how temperature is distributed inside the silo.',
      'A poor heater layout leaves cold zones and overheats others, wasting stored energy. Trying each layout physically would be slow and expensive; that is why the work is a simulation that lets geometries be compared before building.',
    ],
    how: [
      { t: 'Physical parameters', d: 'The properties of the sand and silo (conductivity, heat capacity, dimensions) are defined in a separate module, so they can change without touching the solver.' },
      { t: '3D silo geometry', d: 'The silo is represented as a 3D mesh of cells. Each cell stores its temperature.' },
      { t: 'Heaters', d: 'Heaters are marked as cells that contribute power. Their layout (where they are and how many) is what is to be optimised.' },
      { t: 'Variable thermal conductivity', d: 'Sand is a porous medium: its conductivity changes with conditions, and the model accounts for it instead of assuming a fixed value.' },
      { t: '3D finite-difference solver', d: 'At each time step, a cell’s temperature is updated from its neighbours’ (the discretised heat equation). This is how heat propagation through the silo is computed.' },
      { t: 'Visualisation', d: 'Results are shown as temperature maps and heating animations.' },
      { t: 'QPSO optimisation', d: 'A quantum-behaved particle swarm (QPSO) proposes heater layouts and the simulator evaluates each one. With that feedback the swarm closes in on the best ones.' },
      { t: 'Patterns and filling', d: 'Geometric patterns (spiral, hexagonal, radial, fractal) were also compared and the flow of particles while filling the silo was simulated.' },
    ],
    concepts: [
      { t: 'Thermal storage', d: 'Keeping energy as heat (in sand, water, salts…) instead of electricity. It is cheap and durable, but you have to manage how the heat is distributed.' },
      { t: 'Finite differences', d: 'A numerical method that replaces derivatives with differences between neighbouring cells. It is the most direct way to solve the heat equation on a mesh.' },
      { t: 'Porous medium', d: 'A material with voids (like sand) whose effective conductivity depends on grain contact and the air in between.' },
      { t: 'QPSO', d: 'Particle-swarm optimisation with quantum behaviour: many candidate solutions explore the space at once and are drawn towards the best found, with no need for derivatives.' },
    ],
    decisions: [
      { t: 'A modular simulator', d: 'Separating parameters, geometry, heaters and solver allows reusing the same solver to try many layouts and optimise on top of it.' },
      { t: 'Optimise on the simulator', d: 'Instead of trying a few layouts by hand, the search is delegated to an algorithm that explores many more.' },
      { t: 'Compare patterns fairly', d: 'The geometries (spiral, hexagonal, radial, fractal) are evaluated with the same model, so differences come from the layout and not the method.' },
    ],
    verified: [
      '3D simulation mesh with a finite-difference method and a QPSO optimiser.',
      'Comparison of four heater geometries and simulation of silo filling.',
    ],
    limits: [
      'It is a thesis numerical model: this page describes the model and the method and does not include experimental results from a physical silo.',
      'The quality of the conclusions depends on the physical sand parameters used.',
      'It was programmed in MATLAB, so there is no browser demo.',
    ],
    next: [
      'Contrast the model with temperature measurements from a real silo.',
      'Add losses through the walls and surface to bring the model closer to an operating case.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'El simulador y su optimizador', en: 'The simulator and its optimiser' },
      caption: {
        es: 'La cadena de arriba calcula cómo se calienta el silo para una disposición dada; el optimizador QPSO (flecha punteada) cambia la disposición de los calefactores y vuelve a pedir el cálculo.',
        en: 'The top chain computes how the silo heats up for a given layout; the QPSO optimiser (dashed arrow) changes the heater layout and asks for the calculation again.',
      },
      nodes: [
        { id: 'par', label: { es: 'Parámetros', en: 'Parameters' }, sub: { es: 'arena · silo', en: 'sand · silo' }, col: 0, row: 0 },
        { id: 'cal', label: { es: 'Calefactores', en: 'Heaters' }, sub: { es: 'disposición 3D', en: '3D layout' }, col: 1, row: 0, tone: 'amber' },
        { id: 'sol', label: { es: 'Solver 3D', en: '3D solver' }, sub: { es: 'dif. finitas', en: 'finite diff.' }, col: 2, row: 0, tone: 'magenta' },
        { id: 'res', label: { es: 'Resultados', en: 'Results' }, sub: { es: 'mapas · animación', en: 'maps · animation' }, col: 3, row: 0, tone: 'emerald' },
      ],
      edges: [
        { from: 'par', to: 'cal' },
        { from: 'cal', to: 'sol', label: { es: 'potencia', en: 'power' } },
        { from: 'sol', to: 'res', label: 'T(x,y,z)' },
        { from: 'res', to: 'cal', loop: true, dashed: true, label: { es: 'optimización QPSO', en: 'QPSO optimisation' } },
      ],
    },
  ],
}
