export default {
  status: { es: 'Simulado: modelo de cinco máquinas con eventos aleatorios', en: 'Simulated: five-machine model with random events' },
  related: ['oee-modbus', 'linea-envasado-grafcet', 'gestor-mantenimiento-tpm'],
  es: {
    lead: 'Un gemelo digital de una línea de envasado de cinco máquinas en serie con buffers, averías, microparos y estados de espera. Calcula el flujo, encuentra el cuello de botella y responde a «¿qué pasaría si acelero esta máquina o agrando este buffer?».',
    context: [
      'En una línea de envasado la velocidad nominal de cada máquina dice poco: el flujo real depende de las averías, de los microparos y de cuánto aíslan los buffers a una máquina de las demás. Sin un modelo, se corre el riesgo de invertir en acelerar la máquina equivocada.',
      'Identificar el verdadero cuello de botella y el tamaño de buffer que vale la pena evita inversiones que no mueven la producción y orienta el mantenimiento hacia las paradas que de verdad cuestan unidades.',
    ],
    how: [
      { t: 'Cinco máquinas en serie', d: 'Llenadora, tapadora, etiquetadora, encajonadora y paletizador, unidas por buffers de acumulación. Cada una tiene su velocidad, su MTBF y su MTTR.' },
      { t: 'Pasos de 1 segundo', d: 'En cada paso, cada máquina decide si produce, si espera producto (hambre), si está bloqueada porque la siguiente no recibe, si está averiada o si está en un microparo.' },
      { t: 'Averías y microparos aleatorios', d: 'Las averías tienen tiempos exponenciales a partir del MTBF y del MTTR; los microparos ocurren al azar con una frecuencia y una duración.' },
      { t: 'Contabilizar el tiempo por estado', d: 'Cada máquina registra cuánto tiempo estuvo en cada estado. De ahí salen el flujo, la eficiencia de la línea y el aporte de cada pérdida.' },
      { t: 'Dos cuellos de botella', d: 'El teórico (velocidad por disponibilidad) y el observado (la máquina que más tiempo trabaja sin esperar). Si no coinciden, hay algo que el modelo ayuda a entender.' },
      { t: 'Qué pasaría si', d: 'La demo permite acelerar cada máquina un 10 % y barrer el tamaño de los buffers, promediando tres semillas de 8 h para que el resultado no dependa de la suerte de una corrida.' },
    ],
    concepts: [
      { t: 'Cuello de botella', d: 'La máquina que limita el flujo de toda la línea. Mejorar cualquier otra no cambia el flujo; mejorar la del cuello sí.' },
      { t: 'Hambre y bloqueo', d: 'Una máquina está «hambrienta» si le falta producto de la anterior, y «bloqueada» si la siguiente no puede recibir. Son pérdidas causadas por otras máquinas.' },
      { t: 'MTBF y MTTR', d: 'Tiempo medio entre fallas y tiempo medio de reparación. La disponibilidad de una máquina es MTBF / (MTBF + MTTR).' },
      { t: 'Buffer', d: 'Espacio de acumulación entre máquinas. Un buffer grande permite que una máquina siga trabajando mientras la vecina está averiada.' },
      { t: 'Rendimientos decrecientes', d: 'Agregar buffer ayuda mucho al principio y cada vez menos: llega un punto en que más espacio ya no sube el flujo.' },
    ],
    decisions: [
      { t: 'Simular, no calcular a mano', d: 'Con averías aleatorias, hambre y bloqueo, el flujo de una línea no se deduce con una fórmula simple. Simularlo es la forma honesta de estimarlo.' },
      { t: 'Promediar semillas', d: 'Una sola corrida de 8 h puede salir buena o mala por azar; promediar tres semillas da una estimación más estable.' },
      { t: 'Verificar con propiedades físicas', d: 'Las pruebas comprueban que las unidades se conservan, que los buffers nunca se salen de sus límites y que el flujo nunca supera la capacidad del cuello.' },
      { t: 'Mostrar dos cuellos', d: 'Ver el teórico y el observado enseña que la máquina más lenta en papel no siempre es la que limita en la práctica.' },
    ],
    tour: [
      'Mira la línea (verde: produce, ámbar: espera, rojo: falla) y cómo se llenan y vacían los buffers; sube la velocidad con ×600 o ×3600.',
      'Elige un escenario con una etiquetadora lenta: las máquinas anteriores se bloquean y las posteriores esperan.',
      'En «Flujo de la línea y niveles de los buffers» pulsa «Calcular (3 semillas · 8 h)» y compara buffers mínimos con 800 unidades: el flujo sube de 91,8 a 106,2 u/min, con rendimientos decrecientes.',
      'En «Tiempo de cada máquina por estado» pulsa «Calcular»: acelerar otra máquina un 10 % deja el flujo igual; acelerar la etiquetadora lo sube 7,4 u/min.',
      'Cambia los «Parámetros» (velocidad, MTBF, MTTR) y pulsa «Aplicar y reiniciar».',
    ],
    verified: [
      'Con el escenario base, pasar de buffers mínimos a 800 unidades sube el flujo de 91,8 a 106,2 u/min (promedio de tres semillas de 8 h).',
      'Con una etiquetadora lenta, acelerar cualquier otra máquina un 10 % deja el flujo igual; acelerar la etiquetadora lo sube 7,4 u/min.',
      '15 pruebas: conservación de unidades, buffers acotados, disponibilidad medida igual a MTBF / (MTBF + MTTR), 12 microparos por hora de 5 s promedian 1,7 % del tiempo y el flujo nunca supera la capacidad del cuello.',
    ],
    limits: [
      'Es un modelo con parámetros didácticos, no una línea medida: los números de flujo valen para el escenario base.',
      'Las máquinas son simples (velocidad, MTBF, MTTR, microparos); no modela cambios de formato, calidad ni operadores.',
      'Para tomar una decisión de inversión habría que calibrar el modelo con datos reales de la línea.',
    ],
    next: [
      'Calibrar el modelo con los registros de paros del proyecto de OEE con Modbus.',
      'Agregar cambios de formato y rechazos por calidad como nuevos estados.',
    ],
  },
  en: {
    lead: 'A digital twin of a five-machine packaging line in series with buffers, breakdowns, micro-stops and waiting states. It computes throughput, finds the bottleneck and answers "what would happen if I speed this machine up or enlarge this buffer?".',
    context: [
      'On a packaging line, each machine’s nominal speed says little: real throughput depends on breakdowns, micro-stops and how much the buffers isolate one machine from the others. Without a model, you risk investing in speeding up the wrong machine.',
      'Identifying the true bottleneck and the buffer size worth having avoids investments that do not move production and steers maintenance towards the stops that really cost units.',
    ],
    how: [
      { t: 'Five machines in series', d: 'Filler, capper, labeller, case packer and palletiser, linked by accumulation buffers. Each has its own speed, MTBF and MTTR.' },
      { t: '1-second steps', d: 'At each step, every machine decides whether it produces, waits for product (starved), is blocked because the next one will not receive, is broken down or is in a micro-stop.' },
      { t: 'Random breakdowns and micro-stops', d: 'Breakdowns have exponential times from the MTBF and MTTR; micro-stops happen at random with a frequency and duration.' },
      { t: 'Account for time per state', d: 'Each machine records how long it spent in each state. Throughput, line efficiency and each loss’s contribution come from that.' },
      { t: 'Two bottlenecks', d: 'The theoretical one (speed times availability) and the observed one (the machine that works the most without waiting). If they differ, there is something the model helps understand.' },
      { t: 'What if', d: 'The demo lets you speed up each machine by 10 % and sweep the buffer size, averaging three 8-hour seeds so the result does not depend on the luck of one run.' },
    ],
    concepts: [
      { t: 'Bottleneck', d: 'The machine that limits the whole line’s throughput. Improving any other does not change throughput; improving the bottleneck does.' },
      { t: 'Starvation and blocking', d: 'A machine is "starved" if it lacks product from the previous one, and "blocked" if the next cannot receive. They are losses caused by other machines.' },
      { t: 'MTBF and MTTR', d: 'Mean time between failures and mean time to repair. A machine’s availability is MTBF / (MTBF + MTTR).' },
      { t: 'Buffer', d: 'Accumulation space between machines. A large buffer lets a machine keep working while its neighbour is down.' },
      { t: 'Diminishing returns', d: 'Adding buffer helps a lot at first and less and less: there comes a point where more space no longer raises throughput.' },
    ],
    decisions: [
      { t: 'Simulate, do not compute by hand', d: 'With random breakdowns, starvation and blocking, a line’s throughput is not deduced from a simple formula. Simulating is the honest way to estimate it.' },
      { t: 'Average seeds', d: 'A single 8-hour run can come out good or bad by chance; averaging three seeds gives a steadier estimate.' },
      { t: 'Verify with physical properties', d: 'The tests check that units are conserved, buffers never leave their limits and throughput never exceeds the bottleneck’s capacity.' },
      { t: 'Show two bottlenecks', d: 'Seeing the theoretical and the observed one teaches that the slowest machine on paper is not always the one limiting in practice.' },
    ],
    tour: [
      'Watch the line (green: producing, amber: waiting, red: failed) and how the buffers fill and empty; speed up with ×600 or ×3600.',
      'Pick a scenario with a slow labeller: the machines before it get blocked and those after it wait.',
      'Under "Flujo de la línea y niveles de los buffers" (line flow and buffer levels) press "Calcular (3 semillas · 8 h)" and compare minimum buffers with 800 units: throughput rises from 91.8 to 106.2 u/min, with diminishing returns.',
      'Under "Tiempo de cada máquina por estado" (time per machine per state) press "Calcular": speeding up another machine by 10 % leaves throughput unchanged; speeding up the labeller raises it by 7.4 u/min.',
      'Change the "Parámetros" (speed, MTBF, MTTR) and press "Aplicar y reiniciar" (apply and restart).',
    ],
    verified: [
      'With the base scenario, going from minimum buffers to 800 units raises throughput from 91.8 to 106.2 u/min (average of three 8-hour seeds).',
      'With a slow labeller, speeding up any other machine by 10 % leaves throughput unchanged; speeding up the labeller raises it by 7.4 u/min.',
      '15 tests: unit conservation, bounded buffers, measured availability equal to MTBF / (MTBF + MTTR), 12 micro-stops per hour of 5 s average 1.7 % of the time and throughput never exceeds the bottleneck’s capacity.',
    ],
    limits: [
      'It is a model with didactic parameters, not a measured line: throughput figures hold for the base scenario.',
      'The machines are simple (speed, MTBF, MTTR, micro-stops); it does not model changeovers, quality or operators.',
      'To make an investment decision the model would have to be calibrated with the line’s real data.',
    ],
    next: [
      'Calibrate the model with downtime records from the OEE-with-Modbus project.',
      'Add changeovers and quality rejects as new states.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'La línea de cinco máquinas', en: 'The five-machine line' },
      caption: {
        es: 'Entre cada par de máquinas hay un buffer. Cuando uno se llena, la máquina anterior se bloquea; cuando se vacía, la siguiente queda con hambre.',
        en: 'Between each pair of machines there is a buffer. When one fills, the previous machine is blocked; when it empties, the next one is starved.',
      },
      nodes: [
        { id: 'll', label: { es: 'Llenadora', en: 'Filler' }, col: 0, row: 0 },
        { id: 'ta', label: { es: 'Tapadora', en: 'Capper' }, col: 1, row: 0 },
        { id: 'et', label: { es: 'Etiquetadora', en: 'Labeller' }, sub: { es: 'cuello de botella', en: 'bottleneck' }, col: 2, row: 0, tone: 'magenta' },
        { id: 'en', label: { es: 'Encajonadora', en: 'Case packer' }, col: 3, row: 0 },
        { id: 'pa', label: { es: 'Paletizador', en: 'Palletiser' }, col: 4, row: 0 },
      ],
      edges: [
        { from: 'll', to: 'ta', label: 'buffer' },
        { from: 'ta', to: 'et', label: 'buffer' },
        { from: 'et', to: 'en', label: 'buffer' },
        { from: 'en', to: 'pa', label: 'buffer' },
      ],
    },
    {
      kind: 'graph',
      placement: 'concepts',
      title: { es: 'Los cinco estados de una máquina', en: 'A machine’s five states' },
      caption: {
        es: 'En cada segundo simulado, cada máquina está en exactamente uno de estos estados. El tiempo que pasa en cada uno es lo que explica el flujo de la línea.',
        en: 'In each simulated second, every machine is in exactly one of these states. The time spent in each is what explains the line’s throughput.',
      },
      nodes: [
        { id: 'pr', label: { es: 'Produce', en: 'Producing' }, tone: 'emerald', col: 0, row: 0 },
        { id: 'ha', label: { es: 'Hambre', en: 'Starved' }, sub: { es: 'falta producto', en: 'no product' }, tone: 'amber', col: 1, row: 0 },
        { id: 'bl', label: { es: 'Bloqueada', en: 'Blocked' }, sub: { es: 'la siguiente no recibe', en: 'next one will not take' }, tone: 'amber', col: 2, row: 0 },
        { id: 'av', label: { es: 'Averiada', en: 'Broken down' }, sub: 'MTBF · MTTR', tone: 'magenta', col: 3, row: 0 },
        { id: 'mi', label: { es: 'Microparo', en: 'Micro-stop' }, sub: { es: 'segundos', en: 'seconds' }, tone: 'magenta', col: 4, row: 0 },
      ],
      edges: [],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Qué mueve el flujo y qué no', en: 'What moves throughput and what does not' },
      caption: {
        es: 'Los buffers ayudan con rendimientos decrecientes (escenario base). Con una etiquetadora lenta, acelerar una máquina que no es el cuello no cambia nada.',
        en: 'Buffers help with diminishing returns (base scenario). With a slow labeller, speeding up a machine that is not the bottleneck changes nothing.',
      },
      rows: [
        {
          label: { es: 'Flujo según el tamaño de los buffers (u/min)', en: 'Throughput by buffer size (u/min)' },
          items: [
            { label: { es: 'Buffers mínimos', en: 'Minimum buffers' }, value: 91.8, text: '91,8', tone: 'amber' },
            { label: { es: 'Buffers de 800 u', en: '800 u buffers' }, value: 106.2, text: '106,2', tone: 'emerald' },
          ],
        },
        {
          label: { es: 'Ganancia de acelerar una máquina un 10 % (u/min)', en: 'Gain from speeding up one machine by 10 % (u/min)' },
          items: [
            { label: { es: 'Cualquier otra máquina', en: 'Any other machine' }, value: 0, text: '0', tone: 'magenta' },
            { label: { es: 'La etiquetadora (el cuello)', en: 'The labeller (the bottleneck)' }, value: 7.4, text: '+7,4', tone: 'emerald' },
          ],
        },
      ],
    },
  ],
}
