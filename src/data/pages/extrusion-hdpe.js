export default {
  status: { es: 'Trabajo real en planta (puesta en marcha, 2022)', en: 'Real plant work (commissioning, 2022)' },
  verifiedTitle: { es: 'Resultados reportados', en: 'Reported results' },
  related: ['pid-pasteurizador', 'variador-vdf-motor', 'simulador-ladder'],
  es: {
    lead: 'La automatización de una línea que extruye tubería de HDPE y la corta a medida. El reto era doble: mantener la temperatura del cañón pareja en seis zonas y que la guillotina corte en la posición exacta del tubo, aunque la velocidad del extrusor cambie.',
    context: [
      'En una línea de extrusión, el plástico se funde dentro de un cañón calefaccionado, sale por un dado con la forma del tubo y es arrastrado por un equipo de tiro mientras se enfría. Si la temperatura no es pareja, el material sale con viscosidad distinta y el diámetro y la pared del tubo varían; si el corte no sigue al avance real del tubo, las piezas salen con largo distinto.',
      'Aquí ambas cosas pasaban: variaciones térmicas que daban tolerancias dimensionales no homogéneas, y cortes asincrónicos respecto al avance real del material. Cada desviación se traducía en desperdicio directo de materia prima HDPE y piezas fuera de especificación, y había que lograr un arranque de línea que no detuviera el proceso continuo.',
      'Esta página explica el enfoque técnico del caso; no incluye programas, planos ni datos internos de la planta.',
    ],
    how: [
      { t: 'Medir la temperatura de cada zona', d: 'El cañón se divide en zonas de calefacción y enfriamiento. Cada una tiene su termocupla J o K, que es la realimentación del lazo de esa zona.' },
      { t: 'Un lazo PID independiente por zona', d: 'En el PLC Delta se programaron lazos PID independientes: seis zonas activas. Como cada zona tiene su propia inercia térmica y su propia influencia sobre las vecinas, sintonizarlas por separado permite que cada una llegue a su temperatura sin pelearse con las demás.' },
      { t: 'Calentar y enfriar con lazos propios', d: 'Las zonas de calefacción y las de enfriamiento del cañón tienen lazos propios, de modo que la temperatura puede corregirse hacia arriba y hacia abajo en vez de solo esperar que se enfríe sola.' },
      { t: 'Sincronizar la velocidad de arrastre', d: 'El equipo de tiro lo mueve un variador de frecuencia. La velocidad de arrastre se sincroniza con la del extrusor para que el tubo no se estire ni se acumule.' },
      { t: 'Medir el avance real con un encoder', d: 'Un encoder incremental entrega pulsos proporcionales al avance real del tubo. El PLC convierte esos pulsos en longitud.' },
      { t: 'Cortar por posición, no por tiempo', d: 'Cuando la longitud acumulada llega al valor pedido, el PLC dispara el accionamiento de la guillotina de corte rápido. Como la referencia es el avance medido, el corte sigue siendo correcto aunque la velocidad de la línea cambie.' },
    ],
    concepts: [
      { t: 'Zonas del cañón', d: 'Secciones del cañón con calefacción y enfriamiento propios. El material va subiendo de temperatura a lo largo de ellas hasta fundirse de forma pareja.' },
      { t: 'Termocupla J/K', d: 'Sensor de temperatura formado por dos metales distintos que generan un pequeño voltaje según la temperatura. Los tipos J y K son los más usados en procesos plásticos.' },
      { t: 'Lazo PID', d: 'Controlador que corrige según el error actual (P), el acumulado (I) y su tendencia (D). Es el mismo principio de la simulación del proyecto «Sintonía PID con anti-windup».' },
      { t: 'Encoder incremental', d: 'Sensor que emite una cantidad fija de pulsos por vuelta o por unidad de longitud. Contando pulsos se obtiene posición y velocidad reales.' },
      { t: 'Variador de frecuencia (VFD)', d: 'Equipo que cambia la frecuencia con que se alimenta un motor de inducción para controlar su velocidad con suavidad.' },
    ],
    decisions: [
      { t: 'Seis lazos en vez de uno', d: 'Una sola sintonía para todo el cañón obliga a comprometer a todas las zonas. Con un lazo por zona, cada una se ajusta a su propio comportamiento térmico.' },
      { t: 'Cortar según el encoder', d: 'Cortar por temporizador asume que la velocidad es constante. Usar el encoder hace que el corte dependa de lo que realmente avanzó el tubo.' },
      { t: 'Atender el arranque', d: 'En el arranque de línea se pierde material mientras todo se estabiliza. Por eso el scrap de arranque (−18 % en este caso) es una de las métricas con que se midió el trabajo.' },
    ],
    verified: [
      'Resultados reportados para el caso: 99,2 % de precisión de corte y −18 % de scrap de arranque.',
      'Seis zonas con lazo PID activo, cada una con su termocupla.',
    ],
    limits: [
      'Es trabajo real de planta: no hay demo ni simulación, porque el equipo y los datos son de la planta.',
      'Las cifras son las reportadas para el caso; no incluyen un protocolo de medición publicado.',
      'Esta página explica el enfoque técnico; no publica programas, planos ni datos internos.',
    ],
    next: [
      'Registrar la temperatura de cada zona y el largo de cada corte para tener un historial por lote.',
      'Estudiar la interacción entre zonas vecinas con un modelo térmico simple antes de volver a sintonizar.',
    ],
  },
  en: {
    lead: 'Automation of a line that extrudes HDPE pipe and cuts it to length. The challenge was twofold: keep the barrel temperature even across six zones and make the guillotine cut at the exact position of the pipe, even when the extruder speed changes.',
    context: [
      'In an extrusion line, plastic melts inside a heated barrel, leaves through a die shaped like the pipe and is pulled by a haul-off while it cools. If the temperature is uneven, the material leaves with different viscosity and the pipe’s diameter and wall vary; if the cut does not follow the real advance of the pipe, pieces come out with different lengths.',
      'Here both happened: thermal variations produced non-uniform dimensional tolerances, and cuts were asynchronous with respect to the real advance of the material. Every deviation turned directly into wasted HDPE raw material and out-of-spec pieces, and the line start-up had to avoid stopping the continuous process.',
      'This page explains the technical approach of the case; it does not include programs, drawings or the plant’s internal data.',
    ],
    how: [
      { t: 'Measure each zone’s temperature', d: 'The barrel is split into heating and cooling zones. Each has its own J or K thermocouple, which is the feedback of that zone’s loop.' },
      { t: 'An independent PID loop per zone', d: 'The Delta PLC runs independent PID loops: six active zones. Since each zone has its own thermal inertia and influences its neighbours, tuning them separately lets each one reach its temperature without fighting the others.' },
      { t: 'Heat and cool with their own loops', d: 'The barrel’s heating zones and cooling zones have loops of their own, so temperature can be corrected upwards and downwards instead of just waiting for it to cool by itself.' },
      { t: 'Synchronise the haul-off speed', d: 'The haul-off is moved by a variable frequency drive. Its speed is synchronised with the extruder’s so the pipe is neither stretched nor piled up.' },
      { t: 'Measure the real advance with an encoder', d: 'An incremental encoder delivers pulses proportional to the real advance of the pipe. The PLC converts those pulses into length.' },
      { t: 'Cut by position, not by time', d: 'When the accumulated length reaches the requested value, the PLC triggers the fast-cut guillotine drive. Because the reference is the measured advance, the cut stays correct even if line speed changes.' },
    ],
    concepts: [
      { t: 'Barrel zones', d: 'Sections of the barrel with their own heating and cooling. The material rises in temperature along them until it melts evenly.' },
      { t: 'J/K thermocouple', d: 'A temperature sensor made of two different metals that generate a small voltage depending on temperature. Types J and K are the most common in plastics processing.' },
      { t: 'PID loop', d: 'A controller that corrects based on the current error (P), the accumulated error (I) and its trend (D). Same principle as the "PID tuning with anti-windup" simulation project.' },
      { t: 'Incremental encoder', d: 'A sensor that emits a fixed number of pulses per turn or per unit of length. Counting pulses gives real position and speed.' },
      { t: 'Variable frequency drive (VFD)', d: 'Equipment that changes the frequency supplied to an induction motor to control its speed smoothly.' },
    ],
    decisions: [
      { t: 'Six loops instead of one', d: 'A single tuning for the whole barrel forces a compromise on every zone. With a loop per zone, each is adjusted to its own thermal behaviour.' },
      { t: 'Cut according to the encoder', d: 'Cutting on a timer assumes constant speed. Using the encoder makes the cut depend on how far the pipe really moved.' },
      { t: 'Pay attention to the start-up', d: 'Material is lost at line start-up while everything stabilises. That is why start-up scrap (−18 % in this case) is one of the metrics used to measure the work.' },
    ],
    verified: [
      'Results reported for the case: 99.2 % cutting accuracy and −18 % start-up scrap.',
      'Six zones with an active PID loop, each with its own thermocouple.',
    ],
    limits: [
      'This is real plant work: there is no demo or simulation, because the equipment and the data belong to the plant.',
      'The figures are those reported for the case; they do not come with a published measurement protocol.',
      'This page explains the technical approach; it does not publish programs, drawings or internal data.',
    ],
    next: [
      'Log each zone’s temperature and each cut’s length to keep a per-batch history.',
      'Study the interaction between neighbouring zones with a simple thermal model before re-tuning.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'De la temperatura al corte', en: 'From temperature to cut' },
      caption: {
        es: 'Las termocuplas alimentan los seis lazos PID del PLC; el variador mueve el arrastre y el encoder mide el avance real: con él el PLC dispara la guillotina en la posición exacta.',
        en: 'The thermocouples feed the PLC’s six PID loops; the drive moves the haul-off and the encoder measures the real advance: with it the PLC triggers the guillotine at the exact position.',
      },
      nodes: [
        { id: 'tc', label: { es: 'Termocuplas', en: 'Thermocouples' }, sub: 'J / K', col: 0, row: 0 },
        { id: 'plc', label: 'PLC Delta', sub: { es: '6 lazos PID', en: '6 PID loops' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'vfd', label: { es: 'Variador (VFD)', en: 'Drive (VFD)' }, sub: { es: 'arrastre', en: 'haul-off' }, col: 2, row: 0, tone: 'amber' },
        { id: 'tubo', label: { es: 'Tubo en arrastre', en: 'Pipe on haul-off' }, sub: 'HDPE', col: 3, row: 0, tone: 'emerald' },
        { id: 'cut', label: { es: 'Guillotina', en: 'Guillotine' }, sub: { es: 'corte rápido', en: 'fast cut' }, col: 4, row: 0, tone: 'amber' },
        { id: 'enc', label: { es: 'Encoder incremental', en: 'Incremental encoder' }, sub: { es: 'avance real', en: 'real advance' }, col: 3, row: 1 },
      ],
      edges: [
        { from: 'tc', to: 'plc', label: '°C' },
        { from: 'plc', to: 'vfd', label: { es: 'velocidad', en: 'speed' } },
        { from: 'vfd', to: 'tubo' },
        { from: 'tubo', to: 'cut' },
        { from: 'tubo', to: 'enc', label: { es: 'avance', en: 'advance' } },
        { from: 'enc', to: 'plc', loop: true, dashed: true, label: { es: 'pulsos', en: 'pulses' } },
        { from: 'plc', to: 'cut', loopTop: true, dashed: true, label: { es: 'dispara el corte', en: 'triggers the cut' } },
      ],
    },
  ],
}
