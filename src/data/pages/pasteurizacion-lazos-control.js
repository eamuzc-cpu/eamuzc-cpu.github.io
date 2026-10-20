export default {
  status: { es: 'Trabajo real en planta (planta láctea, 2023)', en: 'Real plant work (dairy plant, 2023)' },
  verifiedTitle: { es: 'Resultados reportados', en: 'Reported results' },
  related: ['pid-pasteurizador', 'scada-web-pasteurizador', 'alarmas-isa182'],
  es: {
    lead: 'La recalibración y sintonía de los lazos de temperatura de un pasteurizador, para que la leche siga siempre la curva reglamentaria. El trabajo recorrió toda la cadena: sensor, transmisor, PLC y válvula de vapor.',
    context: [
      'En una pasteurizadora la leche debe alcanzar una temperatura y mantenerla un tiempo mínimo, y eso se verifica con un registro de temperatura. Como referencia, la pasteurización rápida (HTST) suele ser de unos 72 °C durante 15 s. Si la temperatura oscila o se queda corta, la curva sale de norma.',
      'Aquí había desviaciones de temperatura y oscilaciones que ponían en riesgo la curva pasteurizadora reglamentaria y comprometían el batch completo. Una curva fuera de norma obliga a reprocesar o, peor, expone al consumidor final si no se detecta a tiempo; el cumplimiento bromatológico y sanitario no era negociable.',
      'Esta página explica el enfoque técnico del caso; no incluye programas, planos ni datos internos de la planta.',
    ],
    how: [
      { t: 'Asegurar la medición', d: 'Un lazo solo puede ser tan bueno como lo que mide. Se recalibraron los transmisores sanitarios con sensor RTD PT100, que entregan una señal 4-20 mA con protocolo HART.' },
      { t: 'Verificar la cadena sensor-transmisor-entrada', d: 'La temperatura que ve el PLC debe coincidir con la real. HART permite configurar y verificar el transmisor desde el mismo cable de señal, y contrastar lo que mide con un patrón de referencia.' },
      { t: 'Sintonizar el lazo de vapor', d: 'En el PLC Siemens S7-300 se afinó el lazo de vapor mediante bloques de función (FB) programados en AWL y Ladder.' },
      { t: 'Ajustar las válvulas modulantes', d: 'La válvula neumática que regula el vapor se ajustó para eliminar el sobreimpulso térmico: una válvula que responde mal obliga al control a corregir de más.' },
      { t: 'Comprobar en régimen permanente', d: 'Con medición confiable, lazo sintonizado y válvula ajustada, el error de control quedó en ±0,3 °C en régimen permanente.' },
      { t: 'Dejar trazabilidad', d: 'Las curvas de temperatura quedan registradas, de modo que cada batch pueda demostrar su cumplimiento.' },
    ],
    concepts: [
      { t: 'RTD PT100', d: 'Sensor cuya resistencia vale 100 Ω a 0 °C y aumenta de forma casi lineal con la temperatura. Es muy estable, por eso es el estándar en procesos sanitarios.' },
      { t: '4-20 mA', d: 'Señal analógica de corriente donde 4 mA es el mínimo de la escala y 20 mA el máximo. El «cero vivo» de 4 mA permite detectar un cable cortado (0 mA).' },
      { t: 'HART', d: 'Protocolo digital montado sobre el mismo cable de 4-20 mA que permite configurar, calibrar y diagnosticar el transmisor sin interrumpir la señal analógica.' },
      { t: 'Bloque de función (FB)', d: 'Unidad de programa reutilizable del PLC con memoria propia. Un lazo PID suele vivir en uno.' },
      { t: 'Curva pasteurizadora', d: 'Registro de temperatura contra tiempo que demuestra que el producto alcanzó y mantuvo la temperatura de pasteurización el tiempo requerido.' },
    ],
    decisions: [
      { t: 'Empezar por el sensor', d: 'Sintonizar un lazo sobre una medición desviada solo lleva a controlar con precisión la temperatura equivocada. La calibración va antes que la sintonía.' },
      { t: 'Tratar la válvula como parte del lazo', d: 'El sobreimpulso no siempre es culpa del PID: una válvula con mala respuesta lo causa también. Por eso se actuó en ambos.' },
      { t: 'Registrar todo', d: 'En una planta sanitaria, un control que funciona pero no deja evidencia no sirve ante una auditoría. La trazabilidad de curvas era parte del resultado.' },
    ],
    verified: [
      'Resultados reportados para el caso: error de control de ±0,3 °C en régimen permanente.',
      'Trazabilidad de curvas al 100 %.',
      'Reprocesos evitados: total, según lo reportado para el caso.',
    ],
    limits: [
      'Es trabajo real de planta: no hay demo ni simulación; para ver la lógica de un lazo similar existe el proyecto «Sintonía PID con anti-windup», que es una simulación didáctica.',
      'Las cifras son las reportadas para el caso; el valor ±0,3 °C corresponde al régimen permanente, no a los transitorios de arranque.',
      'Esta página explica el enfoque técnico; no publica programas, planos ni datos internos.',
    ],
    next: [
      'Agregar alarmas con retardo y banda muerta al lazo, como en el proyecto «Gestión de alarmas ISA-18.2».',
      'Llevar los registros a un SCADA con bitácora, como en «SCADA web de un pasteurizador HTST».',
    ],
  },
  en: {
    lead: 'Recalibration and tuning of the temperature loops of a pasteurizer so the milk always follows the regulatory curve. The work covered the whole chain: sensor, transmitter, PLC and steam valve.',
    context: [
      'In a pasteurizer the milk must reach a temperature and hold it for a minimum time, and that is verified with a temperature record. As a reference, high-temperature short-time (HTST) pasteurization is usually around 72 °C for 15 s. If the temperature oscillates or falls short, the curve leaves the standard.',
      'Here there were temperature deviations and oscillations putting the regulatory pasteurization curve at risk and compromising the entire batch. A non-compliant curve forces reprocessing or, worse, exposes the final consumer if it is not caught in time; food-safety compliance was non-negotiable.',
      'This page explains the technical approach of the case; it does not include programs, drawings or the plant’s internal data.',
    ],
    how: [
      { t: 'Secure the measurement', d: 'A loop can only be as good as what it measures. The sanitary transmitters with an RTD PT100 sensor, which deliver a 4-20 mA signal with the HART protocol, were recalibrated.' },
      { t: 'Verify the sensor–transmitter–input chain', d: 'The temperature the PLC sees must match the real one. HART lets the transmitter be configured and verified over the same signal cable, and what it measures compared against a reference standard.' },
      { t: 'Tune the steam loop', d: 'On the Siemens S7-300 PLC the steam loop was fine-tuned through function blocks (FB) programmed in AWL and Ladder.' },
      { t: 'Adjust the modulating valves', d: 'The pneumatic valve that regulates steam was adjusted to remove thermal overshoot: a valve that responds poorly forces the control to over-correct.' },
      { t: 'Check at steady state', d: 'With a reliable measurement, a tuned loop and an adjusted valve, the control error settled at ±0.3 °C at steady state.' },
      { t: 'Leave traceability', d: 'Temperature curves are recorded, so each batch can demonstrate compliance.' },
    ],
    concepts: [
      { t: 'RTD PT100', d: 'A sensor whose resistance is 100 Ω at 0 °C and rises almost linearly with temperature. It is very stable, which is why it is the standard in sanitary processes.' },
      { t: '4-20 mA', d: 'An analog current signal where 4 mA is the scale minimum and 20 mA the maximum. The 4 mA "live zero" lets a cut wire (0 mA) be detected.' },
      { t: 'HART', d: 'A digital protocol riding on the same 4-20 mA cable that allows the transmitter to be configured, calibrated and diagnosed without interrupting the analog signal.' },
      { t: 'Function block (FB)', d: 'A reusable PLC program unit with its own memory. A PID loop usually lives in one.' },
      { t: 'Pasteurization curve', d: 'A temperature-versus-time record proving the product reached and held the pasteurization temperature for the required time.' },
    ],
    decisions: [
      { t: 'Start with the sensor', d: 'Tuning a loop on a drifting measurement only means controlling the wrong temperature precisely. Calibration comes before tuning.' },
      { t: 'Treat the valve as part of the loop', d: 'Overshoot is not always the PID’s fault: a valve with poor response causes it too. So both were addressed.' },
      { t: 'Record everything', d: 'In a sanitary plant, a control that works but leaves no evidence is no use in an audit. Curve traceability was part of the result.' },
    ],
    verified: [
      'Results reported for the case: ±0.3 °C control error at steady state.',
      '100 % curve traceability.',
      'Reprocessing avoided: total, as reported for the case.',
    ],
    limits: [
      'This is real plant work: there is no demo or simulation; to see the logic of a similar loop there is the "PID tuning with anti-windup" project, a didactic simulation.',
      'The figures are those reported for the case; ±0.3 °C refers to steady state, not start-up transients.',
      'This page explains the technical approach; it does not publish programs, drawings or internal data.',
    ],
    next: [
      'Add delayed alarms with a deadband to the loop, as in the "ISA-18.2 alarm management" project.',
      'Take the records to a SCADA with an audit log, as in "Web SCADA for an HTST pasteurizer".',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'El lazo de temperatura', en: 'The temperature loop' },
      caption: {
        es: 'La cadena que se revisó de punta a punta: un error en cualquiera de sus eslabones se ve, desde el PLC, como un problema de «control».',
        en: 'The chain that was reviewed end to end: an error in any link looks, from the PLC, like a "control" problem.',
      },
      nodes: [
        { id: 'rtd', label: 'RTD PT100', sub: { es: 'sanitario', en: 'sanitary' }, col: 0, row: 0 },
        { id: 'tx', label: { es: 'Transmisor', en: 'Transmitter' }, sub: '4-20 mA · HART', col: 1, row: 0, tone: 'amber' },
        { id: 'plc', label: 'PLC S7-300', sub: { es: 'FB PID (AWL/Ladder)', en: 'PID FB (AWL/Ladder)' }, col: 2, row: 0, tone: 'magenta' },
        { id: 'val', label: { es: 'Válvula de vapor', en: 'Steam valve' }, sub: { es: 'neumática modulante', en: 'pneumatic modulating' }, col: 3, row: 0, tone: 'amber' },
        { id: 'pr', label: { es: 'Proceso', en: 'Process' }, sub: { es: 'leche en el pasteurizador', en: 'milk in the pasteurizer' }, col: 4, row: 0, tone: 'emerald' },
      ],
      edges: [
        { from: 'rtd', to: 'tx', label: 'Ω' },
        { from: 'tx', to: 'plc', label: 'mA' },
        { from: 'plc', to: 'val', label: { es: 'salida', en: 'output' } },
        { from: 'val', to: 'pr', label: { es: 'vapor', en: 'steam' } },
        { from: 'pr', to: 'rtd', loop: true, dashed: true, label: { es: 'temperatura de proceso', en: 'process temperature' } },
      ],
    },
  ],
}
