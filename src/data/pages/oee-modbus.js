export default {
  status: { es: 'Simulado: servidor Modbus propio y datos sintéticos', en: 'Simulated: own Modbus server and synthetic data' },
  related: ['gemelo-digital-envasado', 'gestor-mantenimiento-tpm', 'monitor-energia-esp32'],
  es: {
    lead: 'Un servidor Modbus TCP escrito desde cero hace de PLC de una línea de envasado; un recolector lo sondea y guarda los datos en SQLite, y un tablero calcula el OEE por turno, la línea de tiempo, el Pareto de paros, el MTBF y el MTTR.',
    context: [
      'Calcular un OEE confiable exige leer contadores y estados con un protocolo industrial, separar los paros planificados de los no planificados y no mezclar el tiempo de descanso con la disponibilidad. Si cada turno se mide distinto, las mejoras se discuten por intuición.',
      'Con un OEE medido igual en cada turno, y con un Pareto de paros, se ve dónde se pierden los minutos. Este proyecto construye toda la cadena, desde el protocolo hasta el tablero, para entender cada eslabón.',
    ],
    how: [
      { t: 'Un PLC simulado', d: 'Un modelo de línea de envasado genera marcha, paros por causa, cambios de formato, CIP (limpieza en sitio), velocidad reducida y rechazos. Cada segundo simulado actualiza un bloque de registros.' },
      { t: 'El protocolo Modbus TCP, desde cero', d: 'Se implementó con la biblioteca estándar de Python: lectura de registros de retención (función 03), escritura simple (06) y múltiple (16), excepciones y la cabecera MBAP. Un servidor expone los registros.' },
      { t: 'Un recolector que sondea', d: 'Cada 10 s simulados, el recolector hace una sola lectura (función 03) del bloque de 14 registros y la guarda con su hora en SQLite, agrupada por turno.' },
      { t: 'El cálculo del OEE', d: 'OEE = Disponibilidad × Rendimiento × Calidad. Los descansos quedan fuera del tiempo planificado, así que no bajan la disponibilidad.' },
      { t: 'El análisis de paros', d: 'Los paros se agrupan por causa en un Pareto, y se calculan MTBF (tiempo medio entre fallas) y MTTR (tiempo medio de reparación).' },
      { t: 'Tres turnos de punta a punta', d: 'Se recogieron 3 turnos de 8 horas: 17.286 transacciones Modbus, 0 errores y latencia p95 de 0,09 ms en localhost.' },
    ],
    concepts: [
      { t: 'Modbus TCP', d: 'Protocolo industrial muy extendido: un cliente pide leer o escribir registros numerados a un servidor (el PLC) sobre TCP. Cada petición lleva una cabecera MBAP con identificador de transacción.' },
      { t: 'Disponibilidad', d: 'Fracción del tiempo planificado en que la línea estuvo marchando (se restan los paros).' },
      { t: 'Rendimiento', d: 'Cuánto produjo la línea respecto de lo que habría producido a su velocidad ideal mientras marchaba (se restan las velocidades reducidas).' },
      { t: 'Calidad', d: 'Fracción de lo producido que salió bueno a la primera (se restan los rechazos).' },
      { t: 'Pareto de paros', d: 'Gráfico que ordena las causas de paro por minutos perdidos: pocas causas suelen explicar la mayor parte.' },
      { t: 'MTBF y MTTR', d: 'Tiempo medio entre fallas y tiempo medio para repararlas; resumen de qué tan confiable y qué tan mantenible es un equipo.' },
    ],
    decisions: [
      { t: 'Escribir el protocolo en vez de usar una librería', d: 'Implementarlo obliga a entender los bytes: qué es una transacción, cómo se codifican los registros, qué es una excepción. Y se prueba contra ejemplos de la especificación.' },
      { t: 'Descansos fuera del tiempo planificado', d: 'Un almuerzo no es una pérdida de la línea. Contarlo como paro infla la «indisponibilidad» y oculta los paros reales.' },
      { t: 'Verificar el OEE de dos maneras', d: 'El cálculo se contrastó con un caso hecho a mano y con la identidad OEE = buenos × tiempo de ciclo ideal / tiempo planificado.' },
      { t: 'Una lectura por sondeo', d: 'Leer un bloque entero de una vez es más eficiente y evita leer registros relacionados en instantes distintos.' },
    ],
    tour: [
      'Mira el tablero OEE por turno y fíjate en el OEE del día (≈ 59,2 %), con turnos entre 55,3 % y 61,2 %.',
      'Multiplica a mano la Disponibilidad, el Rendimiento y la Calidad de un turno y comprueba que da su OEE.',
      'Revisa el Pareto de paros: ¿cuál es la causa que más minutos pierde?',
      'Mira la línea de tiempo del turno: marcha, paros, cambios de formato y CIP.',
      'Compara el MTBF y el MTTR de la línea con los de los paros más largos.',
    ],
    verified: [
      '17.286 transacciones Modbus sin errores de protocolo; latencia p95 de 0,09 ms en localhost.',
      'El OEE se verificó contra un caso hecho a mano y contra la identidad OEE = buenos × tiempo de ciclo ideal / tiempo planificado.',
      'Pruebas con unittest sobre el protocolo, el PLC simulado y el cálculo.',
    ],
    limits: [
      'Los datos son sintéticos: el PLC es una simulación y las cifras de OEE no vienen de una planta real.',
      'La latencia de 0,09 ms se midió en localhost, sin red real ni un PLC físico.',
      'El protocolo implementa solo las tres funciones necesarias (03, 06 y 16), no el estándar completo.',
    ],
    next: [
      'Conectar el recolector a un PLC o a un simulador Modbus de terceros para validar la interoperabilidad.',
      'Agregar paros planificados por calendario (mantenimiento, cambios de turno) y tiempos de ciclo por producto.',
    ],
  },
  en: {
    lead: 'A Modbus TCP server written from scratch acts as the PLC of a packaging line; a collector polls it and stores the data in SQLite, and a dashboard computes OEE per shift, the timeline, the downtime Pareto, MTBF and MTTR.',
    context: [
      'Computing a reliable OEE requires reading counters and states with an industrial protocol, separating planned from unplanned stops and not mixing break time into availability. If every shift is measured differently, improvements are argued by intuition.',
      'With OEE measured the same way every shift, and with a downtime Pareto, you can see where the minutes are lost. This project builds the whole chain, from protocol to dashboard, to understand every link.',
    ],
    how: [
      { t: 'A simulated PLC', d: 'A packaging-line model generates running, stops by cause, format changeovers, CIP (clean-in-place), reduced speed and rejects. Each simulated second updates a block of registers.' },
      { t: 'The Modbus TCP protocol, from scratch', d: 'It was implemented with Python’s standard library: reading holding registers (function 03), single write (06) and multiple write (16), exceptions and the MBAP header. A server exposes the registers.' },
      { t: 'A collector that polls', d: 'Every 10 simulated seconds, the collector does a single read (function 03) of the 14-register block and stores it with its timestamp in SQLite, grouped by shift.' },
      { t: 'The OEE calculation', d: 'OEE = Availability × Performance × Quality. Breaks are excluded from planned time, so they do not lower availability.' },
      { t: 'Downtime analysis', d: 'Stops are grouped by cause in a Pareto, and MTBF (mean time between failures) and MTTR (mean time to repair) are computed.' },
      { t: 'Three shifts end to end', d: '3 shifts of 8 hours were collected: 17,286 Modbus transactions, 0 errors and p95 latency of 0.09 ms on localhost.' },
    ],
    concepts: [
      { t: 'Modbus TCP', d: 'A very widespread industrial protocol: a client asks a server (the PLC) to read or write numbered registers over TCP. Each request carries an MBAP header with a transaction identifier.' },
      { t: 'Availability', d: 'The fraction of planned time in which the line was running (stops are subtracted).' },
      { t: 'Performance', d: 'How much the line produced compared with what it would have produced at its ideal speed while running (reduced speeds are subtracted).' },
      { t: 'Quality', d: 'The fraction of what was produced that came out good first time (rejects are subtracted).' },
      { t: 'Downtime Pareto', d: 'A chart ordering stop causes by minutes lost: a few causes usually explain most of it.' },
      { t: 'MTBF and MTTR', d: 'Mean time between failures and mean time to repair them; a summary of how reliable and how maintainable equipment is.' },
    ],
    decisions: [
      { t: 'Write the protocol instead of using a library', d: 'Implementing it forces you to understand the bytes: what a transaction is, how registers are encoded, what an exception is. And it is tested against examples from the specification.' },
      { t: 'Breaks outside planned time', d: 'A lunch is not a line loss. Counting it as a stop inflates "unavailability" and hides the real stops.' },
      { t: 'Verify the OEE two ways', d: 'The calculation was contrasted with a hand-worked case and with the identity OEE = good units × ideal cycle time / planned time.' },
      { t: 'One read per poll', d: 'Reading a whole block at once is more efficient and avoids reading related registers at different instants.' },
    ],
    tour: [
      'Look at the per-shift OEE dashboard and note the day’s OEE (≈ 59.2 %), with shifts between 55.3 % and 61.2 %.',
      'Multiply a shift’s Availability, Performance and Quality by hand and check it gives its OEE.',
      'Review the downtime Pareto: which cause loses the most minutes?',
      'Look at the shift timeline: running, stops, format changeovers and CIP.',
      'Compare the line’s MTBF and MTTR with those of the longest stops.',
    ],
    verified: [
      '17,286 Modbus transactions with no protocol errors; p95 latency of 0.09 ms on localhost.',
      'OEE was verified against a hand-worked case and against the identity OEE = good units × ideal cycle time / planned time.',
      'unittest tests on the protocol, the simulated PLC and the calculation.',
    ],
    limits: [
      'The data is synthetic: the PLC is a simulation and the OEE figures do not come from a real plant.',
      'The 0.09 ms latency was measured on localhost, with no real network or physical PLC.',
      'The protocol implements only the three functions needed (03, 06 and 16), not the full standard.',
    ],
    next: [
      'Connect the collector to a PLC or a third-party Modbus simulator to validate interoperability.',
      'Add scheduled planned stops (maintenance, shift changes) and per-product cycle times.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'De los registros al OEE', en: 'From registers to OEE' },
      caption: {
        es: 'El servidor Modbus y el recolector se hablan por TCP real (en localhost). El recolector repite la lectura cada 10 segundos simulados y deja todo en SQLite para el tablero.',
        en: 'The Modbus server and the collector talk over real TCP (on localhost). The collector repeats the read every 10 simulated seconds and leaves everything in SQLite for the dashboard.',
      },
      nodes: [
        { id: 'plc', label: { es: 'PLC simulado', en: 'Simulated PLC' }, sub: { es: 'servidor Modbus', en: 'Modbus server' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'tcp', label: 'Modbus TCP', sub: 'FC 03 · 06 · 16', col: 1, row: 0, tone: 'amber' },
        { id: 'rec', label: { es: 'Recolector', en: 'Collector' }, sub: 'SQLite', col: 2, row: 0, tone: 'magenta' },
        { id: 'tab', label: { es: 'Tablero OEE', en: 'OEE dashboard' }, sub: 'Pareto · MTBF · MTTR', col: 3, row: 0 },
      ],
      edges: [
        { from: 'plc', to: 'tcp', label: { es: 'registros', en: 'registers' } },
        { from: 'tcp', to: 'rec' },
        { from: 'rec', to: 'tab', label: { es: 'turnos', en: 'shifts' } },
        { from: 'rec', to: 'plc', loopTop: true, dashed: true, label: { es: 'sondeo cada 10 s', en: 'poll every 10 s' } },
      ],
    },
    {
      kind: 'graph',
      placement: 'concepts',
      title: { es: 'Qué resta cada factor del OEE', en: 'What each OEE factor subtracts' },
      caption: {
        es: 'Cada factor se queda con lo que el anterior dejó: del tiempo planificado, la disponibilidad descuenta los paros; el rendimiento, la velocidad reducida; la calidad, los rechazos.',
        en: 'Each factor keeps what the previous one left: from planned time, availability discounts stops; performance, reduced speed; quality, rejects.',
      },
      nodes: [
        { id: 'pl', label: { es: 'Tiempo planificado', en: 'Planned time' }, sub: { es: 'sin descansos', en: 'without breaks' }, col: 0, row: 0 },
        { id: 'di', label: { es: 'Disponibilidad', en: 'Availability' }, sub: { es: 'resta los paros', en: 'minus stops' }, col: 1, row: 0, tone: 'amber' },
        { id: 're', label: { es: 'Rendimiento', en: 'Performance' }, sub: { es: 'resta velocidad baja', en: 'minus slow speed' }, col: 2, row: 0, tone: 'amber' },
        { id: 'ca', label: { es: 'Calidad', en: 'Quality' }, sub: { es: 'resta rechazos', en: 'minus rejects' }, col: 3, row: 0, tone: 'amber' },
        { id: 'oe', label: 'OEE', sub: 'D × R × C', col: 4, row: 0, tone: 'emerald' },
      ],
      edges: [
        { from: 'pl', to: 'di' },
        { from: 'di', to: 're' },
        { from: 're', to: 'ca' },
        { from: 'ca', to: 'oe' },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'OEE de la simulación de 3 turnos', en: 'OEE of the 3-shift simulation' },
      caption: {
        es: 'Datos sintéticos. El OEE del día se calcula sobre los tres turnos; los extremos son el peor y el mejor turno.',
        en: 'Synthetic data. The day’s OEE is computed over the three shifts; the extremes are the worst and best shift.',
      },
      rows: [
        {
          label: { es: 'OEE (%)', en: 'OEE (%)' },
          items: [
            { label: { es: 'Turno con menor OEE', en: 'Lowest-OEE shift' }, value: 55.3, text: '55,3 %', tone: 'amber' },
            { label: { es: 'OEE del día', en: 'Day OEE' }, value: 59.2, text: '59,2 %', tone: 'emerald' },
            { label: { es: 'Turno con mayor OEE', en: 'Highest-OEE shift' }, value: 61.2, text: '61,2 %', tone: 'cyan' },
          ],
        },
      ],
    },
  ],
}
