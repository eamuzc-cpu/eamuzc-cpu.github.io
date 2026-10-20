export default {
  status: { es: 'Trabajo real en planta (Soprole, 2023)', en: 'Real plant work (Soprole, 2023)' },
  verifiedTitle: { es: 'Resultados reportados', en: 'Reported results' },
  related: ['linea-envasado-grafcet', 'gemelo-digital-envasado', 'gestor-mantenimiento-tpm'],
  es: {
    lead: 'Una línea de envasado de lácteos que se detenía por micro-paradas en el empaque final. La intervención combinó mantenimiento preventivo y autónomo (TPM), diagnóstico en línea con el PLC y ajuste fino de servomotores, siempre bajo bloqueo y etiquetado (LOTO).',
    context: [
      'En una línea continua de alta velocidad los equipos están encadenados: cuando uno se detiene, aunque sea unos segundos, los demás esperan o se acumulan. Esas detenciones cortas e imprevistas se llaman micro-paradas y son difíciles de ver, porque cada una dura poco pero se repiten durante todo el turno.',
      'Aquí aparecían en el empaque final: el Cardboard Packer, el Accumulator Helix y los aplicadores Meurer/Tetra Pak. Cada una significaba merma de producto envasado, riesgo de atascamiento mecánico y exposición a incumplimientos de inocuidad alimentaria, además de un throughput contractual que había que sostener.',
      'Esta página explica el enfoque técnico del caso; no incluye programas, planos ni datos internos de la planta.',
    ],
    how: [
      { t: 'Hacer visibles las micro-paradas', d: 'Se usó diagnóstico en línea con los PLC Allen-Bradley y Studio 5000 para ver, en vez de suponer, qué equipo y qué condición frenaba el ciclo. Una micro-parada que nadie registra se vuelve «normal»; registrarla es el primer paso para eliminarla.' },
      { t: 'Concentrarse en los subsistemas críticos', d: 'El diagnóstico apuntó al empaque final: Cardboard Packer, Accumulator Helix y aplicadores. El trabajo se concentró donde estaba la pérdida de ciclo en lugar de intervenir toda la línea.' },
      { t: 'Mantenimiento preventivo por subsistema', d: 'Para esos equipos se establecieron planes preventivos con tareas programadas, en vez de esperar a que la falla detuviera la línea.' },
      { t: 'Mantenimiento autónomo (TPM)', d: 'Parte del cuidado cotidiano pasa a quien opera la línea: limpiar, inspeccionar y detectar anomalías tempranas es el primer pilar del TPM. El operador ve el equipo todos los días; el técnico no.' },
      { t: 'Ajuste micrométrico de servomotores y resincronización', d: 'Los aplicadores dependen de servomotores sincronizados con la línea por una cadena cinemática electrónica. Se ajustaron los servomotores de forma micrométrica y se resincronizó la cadena cinemática del aplicador, apoyándose en la realimentación de los encoders, para que actúe en el instante correcto del ciclo.' },
      { t: 'Intervención segura con LOTO', d: 'Todo se hizo con procedimientos estrictos de bloqueo y etiquetado, porque parte del diagnóstico exige trabajar cerca de equipo energizado. El 100 % de las intervenciones se ejecutó bajo LOTO.' },
    ],
    concepts: [
      { t: 'Micro-parada', d: 'Detención breve e imprevista de un equipo (segundos a pocos minutos) que no llega a registrarse como falla, pero que sumada durante el turno le quita disponibilidad a la línea.' },
      { t: 'TPM', d: 'Mantenimiento Productivo Total. Mezcla mantenimiento planificado con mantenimiento autónomo hecho por el propio operador, para que los equipos se cuiden todos los días y no solo cuando fallan.' },
      { t: 'Servo y cadena cinemática electrónica', d: 'En lugar de un eje mecánico que une todas las partes, cada servomotor sigue por software la posición de un eje maestro. Si esa relación está desajustada, el aplicador llega antes o después de lo debido.' },
      { t: 'Encoder', d: 'Sensor que informa la posición o la velocidad de un eje. Es la «medición» del lazo del servo; sin él no hay forma de sincronizar ni de diagnosticar con precisión.' },
      { t: 'LOTO', d: 'Lockout-Tagout: bloquear con candado y etiquetar las fuentes de energía antes de intervenir una máquina, para que nadie la energice mientras alguien trabaja en ella.' },
    ],
    decisions: [
      { t: 'Medir antes de intervenir', d: 'Ajustar a ojo un servo o cambiar un repuesto sin datos puede mover el problema de lugar. El diagnóstico en línea permitió decidir dónde actuar y comprobar después si el cambio funcionó.' },
      { t: 'Empezar por el empaque final', d: 'Era donde se concentraban las pérdidas de ciclo. Atacar primero lo que más detiene la línea da el mayor beneficio con el menor número de intervenciones.' },
      { t: 'Prevenir y también delegar el cuidado básico', d: 'El preventivo programado y el mantenimiento autónomo se complementan: uno no depende de que alguien note la anomalía, el otro la detecta antes de que se programe una tarea.' },
      { t: 'La seguridad no se negocia', d: 'Intervenir en equipo energizado sin LOTO es un riesgo real de accidente. Por eso las intervenciones siguieron el procedimiento completo, aunque eso agregara minutos a cada trabajo.' },
    ],
    verified: [
      'Resultados reportados para el caso: −28 % de micro-paradas y +12 % de disponibilidad global de la línea.',
      'El 100 % de las intervenciones se hizo bajo procedimientos LOTO.',
    ],
    limits: [
      'Es trabajo real de planta: no hay demo ni simulación, porque el equipo y los datos son de la planta.',
      'Las cifras son las reportadas para el caso; el cálculo de disponibilidad depende de cómo la planta define el tiempo planificado.',
      'Esta página explica el enfoque técnico; no publica programas, planos ni datos internos.',
    ],
    next: [
      'Dejar un indicador permanente de micro-paradas por causa y por turno, como en el proyecto «OEE con Modbus TCP».',
      'Pasar de un preventivo por calendario a uno por condición, usando los mismos datos que ya entrega el PLC.',
    ],
  },
  en: {
    lead: 'A dairy packaging line that kept stopping from micro-stops at final packaging. The work combined preventive and autonomous maintenance (TPM), online diagnostics from the PLC and fine tuning of servomotors, always under lockout-tagout (LOTO).',
    context: [
      'In a high-speed continuous line the machines are chained together: when one stops, even for a few seconds, the others wait or pile up. Those short, unplanned stops are called micro-stops, and they are hard to see because each lasts a short time but they repeat throughout the shift.',
      'Here they showed up at final packaging: the Cardboard Packer, the Accumulator Helix and the Meurer/Tetra Pak applicators. Each one meant lost packed product, risk of mechanical jams and exposure to food-safety non-compliance, on top of a contractual throughput to sustain.',
      'This page explains the technical approach of the case; it does not include programs, drawings or the plant’s internal data.',
    ],
    how: [
      { t: 'Make the micro-stops visible', d: 'Online diagnostics with the Allen-Bradley PLCs and Studio 5000 were used to see, instead of guessing, which machine and which condition was slowing the cycle. A micro-stop nobody records becomes "normal"; recording it is the first step to removing it.' },
      { t: 'Focus on the critical subsystems', d: 'The diagnosis pointed at final packaging: Cardboard Packer, Accumulator Helix and applicators. The effort went where the cycle loss was instead of touching the whole line.' },
      { t: 'Preventive maintenance by subsystem', d: 'For those machines, preventive plans with scheduled tasks were set up instead of waiting for a failure to stop the line.' },
      { t: 'Autonomous maintenance (TPM)', d: 'Part of the daily care moves to whoever runs the line: cleaning, inspecting and catching early anomalies is the first pillar of TPM. The operator sees the machine every day; the technician does not.' },
      { t: 'Micrometric servo tuning and re-synchronisation', d: 'The applicators depend on servomotors synchronised with the line through an electronic kinematic chain. The servomotors were tuned micrometrically and the applicator’s kinematic chain was re-synchronised, relying on encoder feedback, so it acts at the right moment of the cycle.' },
      { t: 'Safe intervention with LOTO', d: 'Everything was done with strict lockout-tagout procedures, because part of the diagnosis requires working near energised equipment. 100 % of the interventions were carried out under LOTO.' },
    ],
    concepts: [
      { t: 'Micro-stop', d: 'A short, unplanned stop of a machine (seconds to a few minutes) that is never recorded as a failure, but adds up over the shift and takes availability away from the line.' },
      { t: 'TPM', d: 'Total Productive Maintenance. It blends planned maintenance with autonomous maintenance done by the operator, so equipment is cared for every day and not only when it fails.' },
      { t: 'Servo and electronic kinematic chain', d: 'Instead of a mechanical shaft tying everything together, each servomotor follows a master axis in software. If that relationship drifts, the applicator arrives earlier or later than it should.' },
      { t: 'Encoder', d: 'A sensor that reports an axis position or speed. It is the "measurement" of the servo loop; without it there is no way to synchronise or to diagnose precisely.' },
      { t: 'LOTO', d: 'Lockout-Tagout: padlocking and tagging energy sources before servicing a machine, so nobody energises it while someone is working on it.' },
    ],
    decisions: [
      { t: 'Measure before intervening', d: 'Tuning a servo by eye or swapping a part without data can just move the problem. Online diagnostics made it possible to decide where to act and to check afterwards whether the change worked.' },
      { t: 'Start at final packaging', d: 'That is where the cycle losses concentrated. Attacking what stops the line most gives the largest benefit with the fewest interventions.' },
      { t: 'Prevent, and also delegate basic care', d: 'Scheduled preventive work and autonomous maintenance complement each other: one does not depend on someone noticing an anomaly, the other catches it before a task is scheduled.' },
      { t: 'Safety is not negotiable', d: 'Working on energised equipment without LOTO is a real accident risk. The interventions therefore followed the full procedure, even if it added minutes to each job.' },
    ],
    verified: [
      'Results reported for the case: −28 % micro-stops and +12 % overall line availability.',
      '100 % of the interventions were done under LOTO procedures.',
    ],
    limits: [
      'This is real plant work: there is no demo or simulation, because the equipment and the data belong to the plant.',
      'The figures are those reported for the case; the availability calculation depends on how the plant defines planned time.',
      'This page explains the technical approach; it does not publish programs, drawings or internal data.',
    ],
    next: [
      'Leave a permanent micro-stop indicator by cause and shift, as in the "OEE with Modbus TCP" project.',
      'Move from calendar-based preventive work to condition-based, using the same data the PLC already provides.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Dónde se actuó', en: 'Where the work happened' },
      caption: {
        es: 'Cadena de control de la línea (arriba), con el diagnóstico en línea y el plan TPM debajo. Los encoders devuelven la posición de los ejes al PLC.',
        en: 'The line’s control chain (top), with online diagnostics and the TPM plan underneath. The encoders return axis position to the PLC.',
      },
      nodes: [
        { id: 'hmi', label: 'HMI', sub: 'FactoryTalk', col: 0, row: 0 },
        { id: 'plc', label: 'PLC', sub: 'ControlLogix', col: 1, row: 0, tone: 'magenta' },
        { id: 'drv', label: 'Servodrives', sub: { es: 'ajuste fino', en: 'fine tuning' }, col: 2, row: 0, tone: 'amber' },
        { id: 'app', label: { es: 'Aplicador / Packer', en: 'Applicator / Packer' }, sub: 'Accumulator Helix', col: 3, row: 0, tone: 'emerald' },
        { id: 'diag', label: { es: 'Diagnóstico en línea', en: 'Online diagnostics' }, sub: 'Studio 5000', col: 1, row: 1 },
        { id: 'tpm', label: { es: 'Plan TPM', en: 'TPM plan' }, sub: { es: 'preventivo + autónomo', en: 'preventive + autonomous' }, col: 3, row: 1, tone: 'amber' },
      ],
      edges: [
        { from: 'hmi', to: 'plc' },
        { from: 'plc', to: 'drv', label: { es: 'consigna', en: 'setpoint' } },
        { from: 'drv', to: 'app' },
        { from: 'app', to: 'plc', loopTop: true, dashed: true, label: 'encoders' },
        { from: 'plc', to: 'diag', label: { es: 'datos', en: 'data' } },
        { from: 'diag', to: 'tpm', label: { es: 'prioriza', en: 'prioritises' } },
        { from: 'tpm', to: 'app', label: { es: 'mantiene', en: 'maintains' } },
      ],
    },
    {
      kind: 'graph',
      placement: 'decisions',
      title: { es: 'El ciclo de mejora', en: 'The improvement cycle' },
      caption: {
        es: 'Cada vuelta empieza midiendo y termina comprobando con la misma medición que el cambio sirvió.',
        en: 'Each lap starts by measuring and ends by checking, with the same measurement, that the change worked.',
      },
      nodes: [
        { id: 'm', label: { es: 'Medir', en: 'Measure' }, sub: { es: 'micro-paradas', en: 'micro-stops' }, col: 0, row: 0 },
        { id: 'p', label: { es: 'Priorizar', en: 'Prioritise' }, sub: { es: 'subsistema crítico', en: 'critical subsystem' }, col: 1, row: 0 },
        { id: 'i', label: { es: 'Intervenir', en: 'Intervene' }, sub: { es: 'bajo LOTO', en: 'under LOTO' }, col: 2, row: 0, tone: 'amber' },
        { id: 'v', label: { es: 'Verificar', en: 'Verify' }, sub: { es: 'misma medición', en: 'same measurement' }, col: 3, row: 0, tone: 'emerald' },
      ],
      edges: [
        { from: 'm', to: 'p' },
        { from: 'p', to: 'i' },
        { from: 'i', to: 'v' },
        { from: 'v', to: 'm', loop: true, dashed: true, label: { es: 'repetir', en: 'repeat' } },
      ],
    },
  ],
}
