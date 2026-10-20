export default {
  status: { es: 'Simulado: motor de eventos propio en el navegador (sin hardware)', en: 'Simulated: own event engine in the browser (no hardware)' },
  related: ['simulador-ladder', 'gemelo-digital-envasado', 'visor-gerber-pcb'],
  es: {
    lead: 'Un simulador de eventos discretos con lógica de cuatro valores (0, 1, X, Z), cola de prioridad, retardo de propagación inercial y flip-flops que comprueban setup y hold. Se ven en un diagrama de tiempos un contador de 3 bits, un sumador, un latch SR, un oscilador en anillo, una violación de setup/hold y una aleta.',
    context: [
      'Los circuitos digitales reales fallan por tiempos: un pulso demasiado corto, un dato que cambia pegado al flanco, una realimentación que oscila. Un simulador solo vale si trata bien el tiempo y los estados desconocidos.',
      'El proyecto hace visible el límite de frecuencia de un circuito sincrónico y por qué las aletas y las violaciones de tiempo producen X.',
    ],
    how: [
      { t: 'Tiempo entero', d: 'El tiempo se mide en números enteros de 10 ps, para que dos eventos del mismo instante sean exactamente simultáneos y no haya errores de coma flotante.' },
      { t: 'Cola de eventos', d: 'Los cambios se guardan en un montículo binario real, con desempate por orden de inserción: 5000 eventos aleatorios salen ordenados.' },
      { t: 'Lógica de cuatro valores', d: 'Cada señal puede ser 0, 1, X (desconocido) o Z (alta impedancia). Las tablas de verdad propagan X, y se resuelven varios excitadores sobre un mismo nodo, incluidos buffers de tres estados.' },
      { t: 'Retardo inercial', d: 'Un pulso más corto que el retardo de la compuerta se absorbe: uno de 1 ns no atraviesa una compuerta de 2 ns, pero uno de 3 ns sí.' },
      { t: 'Flip-flops con setup y hold', d: 'Un flip-flop exige que el dato esté estable 1,5 ns antes del flanco (setup) y 0,8 ns después (hold). Con 1,50 ns pasa y con 1,49 ns falla y produce X.' },
      { t: 'Eventos simultáneos por tandas', d: 'Los eventos del mismo instante se procesan por tandas: primero se actualizan las redes y luego se evalúan las cargas. Así un latch SR simétrico oscila al soltarse S y R a la vez, como en un simulador HDL.' },
      { t: 'El diagrama de tiempos', d: 'Cada señal se dibuja con sus valores 0, 1, X y Z en el tiempo, y la sección «Qué pasa en este circuito» explica lo que se ve.' },
    ],
    concepts: [
      { t: 'Simulación por eventos', d: 'En vez de recalcular todo en cada paso, solo se procesa lo que cambia: cada cambio programa nuevos eventos futuros.' },
      { t: 'Retardo inercial', d: 'Modelo de retardo donde una compuerta ignora los pulsos más cortos que su retardo, como hace un circuito real.' },
      { t: 'Setup y hold', d: 'Ventana alrededor del flanco de reloj donde el dato no debe cambiar. Si cambia dentro de ella, el flip-flop puede quedar en un estado indefinido (X).' },
      { t: 'Camino crítico', d: 'La ruta de mayor retardo entre dos flip-flops. Fija la frecuencia máxima del reloj.' },
      { t: 'Aleta (glitch)', d: 'Un pulso corto e indeseado producido por retardos distintos en las rutas de una misma señal.' },
    ],
    decisions: [
      { t: 'Un montículo real', d: 'El código del informe reordena todo el arreglo de eventos en cada inserción aunque habla de «min-heap»; aquí es un montículo binario real.' },
      { t: 'Procesar por tandas', d: 'Es lo que hacen los simuladores HDL y evita que el resultado dependa del orden arbitrario en que se evalúan compuertas simultáneas.' },
      { t: 'Declarar lo propio', d: 'El tcq del flip-flop y los circuitos de ejemplo son míos.' },
      { t: 'Probar los límites exactos', d: 'Que 1,50 ns pase y 1,49 ns falle, o que 3 ns atraviese y 1 ns no, son pruebas que fijan el comportamiento en el borde.' },
    ],
    tour: [
      'En «Circuito» elige el contador de 3 bits y mira el «Diagrama de tiempos»; fija el «Periodo de reloj» en 8 ns: cuenta bien. Bájalo a 7 ns: aparecen violaciones de setup.',
      'Elige el oscilador en anillo y mueve «Inversores (impar)» y «Retardo por inversor»: con tres inversores de 2 ns el periodo es 12,00 ns.',
      'Elige el latch SR y pon «Soltar S y R a la vez» en 1: el latch oscila.',
      'Elige el flip-flop con violación de setup/hold y mueve «D cambia antes (+) o después (−) del flanco»: pasa o falla según el instante.',
      'Elige el circuito con la aleta y cambia el «Retardo de la NOT» para ver el pulso espurio.',
      'Lee «Qué pasa en este circuito» para cada caso.',
    ],
    verified: [
      '5000 eventos aleatorios salen ordenados; flip-flop con setup 1,5 ns y hold 0,8 ns (1,50 ns pasa y 1,49 falla).',
      'Retardo inercial: un pulso de 1 ns se absorbe en una compuerta de 2 ns y uno de 3 ns pasa; un latch SR simétrico oscila al soltarse S y R a la vez.',
      'El contador de 3 bits cuenta bien a 8 ns (camino crítico = tcq 2 + AND 2 + XOR 2 + setup 1,5 = 7,5 ns) y a 7 ns aparecen violaciones de setup; el oscilador de 3 inversores de 2 ns mide 12,00 ns. 17 pruebas.',
    ],
    limits: [
      'El tcq del flip-flop y los circuitos son míos: no corresponden a una tecnología real.',
      'No es un simulador HDL: no lee Verilog ni VHDL, y los circuitos son los de ejemplo.',
      'Es una simulación, sin hardware ni prototipo.',
    ],
    next: [
      'Agregar un editor para armar circuitos propios con compuertas y flip-flops.',
      'Importar un subconjunto de Verilog estructural.',
    ],
  },
  en: {
    lead: 'A discrete-event simulator with four-valued logic (0, 1, X, Z), a priority queue, inertial propagation delay and flip-flops that check setup and hold. A 3-bit counter, an adder, an SR latch, a ring oscillator, a setup/hold violation and a glitch are seen on a timing diagram.',
    context: [
      'Real digital circuits fail because of timing: a pulse that is too short, data changing right at the clock edge, a feedback that oscillates. A simulator is only worth anything if it treats time and unknown states well.',
      'The project makes visible the frequency limit of a synchronous circuit and why glitches and timing violations produce X.',
    ],
    how: [
      { t: 'Integer time', d: 'Time is measured in whole numbers of 10 ps, so two events at the same instant are exactly simultaneous and there are no floating-point errors.' },
      { t: 'Event queue', d: 'Changes are kept in a real binary heap, with ties broken by insertion order: 5000 random events come out ordered.' },
      { t: 'Four-valued logic', d: 'Each signal can be 0, 1, X (unknown) or Z (high impedance). The truth tables propagate X, and several drivers on one node are resolved, including tri-state buffers.' },
      { t: 'Inertial delay', d: 'A pulse shorter than the gate’s delay is absorbed: a 1 ns pulse does not pass through a 2 ns gate, but a 3 ns one does.' },
      { t: 'Flip-flops with setup and hold', d: 'A flip-flop requires data stable 1.5 ns before the edge (setup) and 0.8 ns after (hold). At 1.50 ns it passes and at 1.49 ns it fails and produces X.' },
      { t: 'Simultaneous events in batches', d: 'Events at the same instant are processed in batches: first the nets are updated and then the loads are evaluated. That is how a symmetric SR latch oscillates when S and R are released together, as in an HDL simulator.' },
      { t: 'The timing diagram', d: 'Each signal is drawn with its 0, 1, X and Z values over time, and the "Qué pasa en este circuito" (what happens in this circuit) section explains what is seen.' },
    ],
    concepts: [
      { t: 'Event-driven simulation', d: 'Instead of recomputing everything at each step, only what changes is processed: each change schedules new future events.' },
      { t: 'Inertial delay', d: 'A delay model in which a gate ignores pulses shorter than its delay, as a real circuit does.' },
      { t: 'Setup and hold', d: 'A window around the clock edge where data must not change. If it changes inside it, the flip-flop may end in an undefined state (X).' },
      { t: 'Critical path', d: 'The longest-delay route between two flip-flops. It sets the maximum clock frequency.' },
      { t: 'Glitch', d: 'A short unwanted pulse produced by different delays on the paths of one signal.' },
    ],
    decisions: [
      { t: 'A real heap', d: 'The report’s code re-sorts the whole event array on every insertion even though it talks about a "min-heap"; here it is a real binary heap.' },
      { t: 'Process in batches', d: 'It is what HDL simulators do and prevents the result from depending on the arbitrary order in which simultaneous gates are evaluated.' },
      { t: 'State what is mine', d: 'The flip-flop’s tcq and the example circuits are mine.' },
      { t: 'Test the exact limits', d: 'That 1.50 ns passes and 1.49 ns fails, or that 3 ns passes through and 1 ns does not, are tests that pin the behaviour at the edge.' },
    ],
    tour: [
      'Under "Circuito" (circuit) choose the 3-bit counter and look at the "Diagrama de tiempos"; set the "Periodo de reloj" (clock period) to 8 ns: it counts correctly. Lower it to 7 ns: setup violations appear.',
      'Choose the ring oscillator and move "Inversores (impar)" (inverters, odd) and "Retardo por inversor" (delay per inverter): with three 2 ns inverters the period is 12.00 ns.',
      'Choose the SR latch and set "Soltar S y R a la vez" (release S and R together) to 1: the latch oscillates.',
      'Choose the flip-flop with setup/hold violation and move "D cambia antes (+) o después (−) del flanco" (D changes before (+) or after (−) the edge): it passes or fails depending on the instant.',
      'Choose the circuit with the glitch and change the "Retardo de la NOT" (NOT delay) to see the spurious pulse.',
      'Read "Qué pasa en este circuito" for each case.',
    ],
    verified: [
      '5000 random events come out ordered; flip-flop with setup 1.5 ns and hold 0.8 ns (1.50 ns passes and 1.49 fails).',
      'Inertial delay: a 1 ns pulse is absorbed in a 2 ns gate and a 3 ns one passes; a symmetric SR latch oscillates when S and R are released together.',
      'The 3-bit counter counts correctly at 8 ns (critical path = tcq 2 + AND 2 + XOR 2 + setup 1.5 = 7.5 ns) and at 7 ns setup violations appear; the 3-inverter 2 ns oscillator measures 12.00 ns. 17 tests.',
    ],
    limits: [
      'The flip-flop’s tcq and the circuits are mine: they do not correspond to a real technology.',
      'It is not an HDL simulator: it does not read Verilog or VHDL, and the circuits are the example ones.',
      'It is a simulation, with no hardware or prototype.',
    ],
    next: [
      'Add an editor to assemble own circuits with gates and flip-flops.',
      'Import a subset of structural Verilog.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'El motor de eventos', en: 'The event engine' },
      caption: {
        es: 'Cada cambio programa eventos futuros en la cola; las compuertas y los flip-flops los procesan por tandas y generan nuevos eventos. El resultado se dibuja como diagrama de tiempos.',
        en: 'Each change schedules future events in the queue; gates and flip-flops process them in batches and generate new events. The result is drawn as a timing diagram.',
      },
      nodes: [
        { id: 'est', label: { es: 'Estímulos', en: 'Stimuli' }, sub: { es: 'reloj y datos', en: 'clock and data' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'col', label: { es: 'Cola de eventos', en: 'Event queue' }, sub: { es: 'montículo binario', en: 'binary heap' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'cff', label: { es: 'Compuertas y FF', en: 'Gates and FFs' }, sub: 'tpd · setup · hold', col: 2, row: 0, tone: 'amber' },
        { id: 'dia', label: { es: 'Diagrama de tiempos', en: 'Timing diagram' }, sub: '0 · 1 · X · Z', col: 3, row: 0 },
      ],
      edges: [
        { from: 'est', to: 'col' },
        { from: 'col', to: 'cff', label: { es: 'evento', en: 'event' } },
        { from: 'cff', to: 'dia' },
        { from: 'cff', to: 'col', loop: true, dashed: true, label: { es: 'nuevos eventos', en: 'new events' } },
      ],
    },
    {
      kind: 'graph',
      placement: 'results',
      title: { es: 'El camino crítico del contador', en: 'The counter’s critical path' },
      caption: {
        es: 'El periodo de reloj no puede ser menor que la suma de estos retardos: 2 + 2 + 2 + 1,5 = 7,5 ns. A 8 ns el contador cuenta bien; a 7 ns aparecen violaciones de setup.',
        en: 'The clock period cannot be shorter than the sum of these delays: 2 + 2 + 2 + 1.5 = 7.5 ns. At 8 ns the counter counts fine; at 7 ns setup violations appear.',
      },
      nodes: [
        { id: 'ff1', label: 'Flip-flop', sub: 'tcq = 2 ns', col: 0, row: 0, tone: 'emerald' },
        { id: 'and', label: 'AND', sub: '2 ns', col: 1, row: 0 },
        { id: 'xor', label: 'XOR', sub: '2 ns', col: 2, row: 0 },
        { id: 'ff2', label: 'Flip-flop', sub: 'setup = 1,5 ns', col: 3, row: 0, tone: 'amber' },
      ],
      edges: [
        { from: 'ff1', to: 'and' },
        { from: 'and', to: 'xor' },
        { from: 'xor', to: 'ff2', label: '= 7,5 ns' },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Periodo de reloj frente al camino crítico', en: 'Clock period versus critical path' },
      caption: {
        es: 'Con 7 ns, menos que el camino crítico, el contador viola el setup; con 8 ns hay margen.',
        en: 'At 7 ns, below the critical path, the counter violates setup; at 8 ns there is margin.',
      },
      rows: [
        {
          label: { es: 'Periodo de reloj (ns)', en: 'Clock period (ns)' },
          items: [
            { label: { es: '7 ns: violaciones de setup', en: '7 ns: setup violations' }, value: 7, text: '7 ns', tone: 'magenta' },
            { label: { es: 'Camino crítico', en: 'Critical path' }, value: 7.5, text: '7,5 ns', tone: 'amber' },
            { label: { es: '8 ns: funciona', en: '8 ns: works' }, value: 8, text: '8 ns', tone: 'emerald' },
          ],
        },
      ],
    },
  ],
}
