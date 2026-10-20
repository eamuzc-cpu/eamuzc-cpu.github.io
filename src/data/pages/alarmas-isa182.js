export default {
  status: { es: 'Simulado en el navegador (proceso y alarmas simulados)', en: 'Simulated in the browser (simulated process and alarms)' },
  related: ['scada-dos-estanques-isa182', 'scada-web-pasteurizador', 'pid-pasteurizador'],
  es: {
    lead: 'Un control de nivel de dos tanques con un motor de alarmas que sigue las ideas de ISA-18.2: retardo, banda muerta, prioridades, supresión por estado, repisado y detección de inundación. Compara, en seis escenarios, qué ve el operador con umbrales directos frente a alarmas bien gestionadas.',
    context: [
      'Un sistema de alarmas con umbrales directos dispara por el ruido del sensor y por cada efecto en cascada de una falla: el operador recibe decenas de avisos y pierde los que importan. Con el nivel pegado al umbral, una señal ruidosa puede activar y desactivar la misma alarma cientos de veces.',
      'En una inundación de alarmas el operador deja de leerlas. Las guías de gestión (ISA-18.2, y EEMUA 191 como referencia) fijan límites de carga por operador justamente para que las alarmas críticas se vean.',
    ],
    how: [
      { t: 'Un proceso con ruido', d: 'Dos tanques conectados, una bomba, una válvula y un PI de nivel. El sensor tiene ruido, como uno real, y se pueden provocar fallas: bomba fallada, válvula atascada, demanda alta.' },
      { t: 'Alarmas con estados', d: 'Cada alarma tiene un ciclo de vida: normal, activa sin reconocer, reconocida, normalizada sin reconocer, repisada y suprimida. El operador reconoce y repisa; el sistema normaliza y suprime.' },
      { t: 'Retardo y banda muerta', d: 'Una alarma solo se activa si la condición dura un tiempo (retardo) y solo se desactiva cuando la variable se aleja del umbral una cierta banda (banda muerta). Así un valor que oscila sobre el umbral no genera cientos de avisos.' },
      { t: 'Prioridades por consecuencia', d: 'Las alarmas se clasifican según la consecuencia de no atenderlas, de modo que el operador sepa cuál leer primero.' },
      { t: 'Supresión por estado', d: 'Si el proceso está en modo parada, ciertas alarmas pierden sentido (que un nivel sea bajo con la bomba apagada no es una novedad) y se suprimen automáticamente.' },
      { t: 'Detección de inundación y KPI', d: 'Más de 10 alarmas en 10 minutos cuenta como inundación. El sistema mide el promedio por 10 minutos, el pico, el tiempo en inundación y las mayores generadoras de alarmas.' },
      { t: 'Seis escenarios con y sin gestión', d: 'Cada escenario de 60 minutos se corre dos veces: con umbrales directos y con el motor de alarmas, para que la diferencia sea medible.' },
    ],
    concepts: [
      { t: 'ISA-18.2', d: 'Norma de gestión del ciclo de vida de los sistemas de alarmas en la industria de procesos: define estados, prioridades, racionalización y métricas.' },
      { t: 'Retardo (on-delay)', d: 'Tiempo que una condición debe mantenerse antes de que la alarma se active. Filtra picos breves de ruido.' },
      { t: 'Banda muerta (histéresis)', d: 'Distancia entre el umbral de activación y el de desactivación. Evita que una alarma «vibre» cuando la señal está pegada al umbral.' },
      { t: 'Repisado', d: 'Silenciar temporalmente una alarma ruidosa de forma controlada y registrada, para volver a atenderla después.' },
      { t: 'Inundación de alarmas', d: 'Situación en que llegan más alarmas de las que un operador puede atender. Aquí se define como más de 10 en 10 minutos.' },
    ],
    decisions: [
      { t: 'Atacar el ruido con retardo y banda muerta', d: 'Es la forma más barata de eliminar activaciones falsas, y por sí sola explica gran parte de la reducción de 396 a 0 alarmas.' },
      { t: 'Una alarma debe pedir una acción', d: 'Si la alarma no requiere que el operador haga algo, sobra. Las prioridades y la supresión por estado eliminan avisos que solo informan.' },
      { t: 'Medir con KPI', d: 'Sin números (promedio, pico, tiempo en inundación) cualquier mejora es una impresión. Los KPI permiten comparar escenarios y gestionar.' },
      { t: 'Comparar contra umbrales directos', d: 'El mismo proceso y las mismas fallas se corren con y sin gestión; así la diferencia se debe a las alarmas y no a otra cosa.' },
    ],
    tour: [
      'Elige en «Escenario» el del nivel pegado al umbral y pulsa «Ejecutar comparación del escenario»: las alarmas pasan de 396 (crudo) a 0 (gestionado).',
      'Elige la inundación (bomba fallada, válvula atascada, demanda alta y sensor ruidoso) y compara de nuevo: de 50 a 7 alarmas.',
      'Acelera con ×60 o ×300 y reconoce una alarma activa con «Reconocer» (o todas con «Reconocer todas»): cambia su estado en la lista.',
      'Usa «Repisar» en una alarma ruidosa y luego «Quitar repisado»: queda registrada como repisada, no borrada.',
      'Cambia a «Modo planta: PARADA» y mira qué alarmas se suprimen; revisa la tabla de las cinco mayores generadoras.',
    ],
    verified: [
      'Seis escenarios de 60 minutos corridos con y sin gestión.',
      'Con el nivel pegado al umbral bajo: de 396 alarmas a 0. En la inundación: de 50 a 7 alarmas (−86 %), de 2 episodios de inundación a ninguno y de 40 % del tiempo en inundación a 0 %.',
      'Pruebas automáticas con node:test sobre el motor de alarmas y el proceso.',
    ],
    limits: [
      'Es una simulación: el proceso, los umbrales y los tiempos de retardo son elecciones didácticas, no los de una planta.',
      'No incluye la racionalización completa de ISA-18.2 (revisión de cada alarma con operación y seguridad), que en una planta real es la parte más larga del trabajo.',
      'EEMUA 191 se usa solo como referencia conceptual para los límites de carga.',
    ],
    next: [
      'Agregar alarmas dependientes (suprimir las consecuencias de una causa raíz) como en las guías de racionalización.',
      'Conectar este motor al simulador SCADA de dos estanques para ver las alarmas sobre el sinóptico.',
    ],
  },
  en: {
    lead: 'A two-tank level control with an alarm engine that follows ISA-18.2 ideas: delay, deadband, priorities, state-based suppression, shelving and flood detection. In six scenarios it compares what the operator sees with raw thresholds versus well-managed alarms.',
    context: [
      'An alarm system with raw thresholds fires on sensor noise and on every cascading effect of a fault: the operator gets dozens of notices and misses the ones that matter. With the level stuck at the threshold, a noisy signal can activate and clear the same alarm hundreds of times.',
      'In an alarm flood the operator stops reading them. Management guidelines (ISA-18.2, and EEMUA 191 as a reference) set per-operator load limits precisely so critical alarms stay visible.',
    ],
    how: [
      { t: 'A process with noise', d: 'Two connected tanks, a pump, a valve and a level PI. The sensor has noise, like a real one, and faults can be triggered: failed pump, stuck valve, high demand.' },
      { t: 'Alarms with states', d: 'Each alarm has a life cycle: normal, active unacknowledged, acknowledged, returned-to-normal unacknowledged, shelved and suppressed. The operator acknowledges and shelves; the system normalises and suppresses.' },
      { t: 'Delay and deadband', d: 'An alarm only activates if the condition lasts a while (delay) and only clears once the variable moves away from the threshold by some band (deadband). A value oscillating around the threshold then does not generate hundreds of notices.' },
      { t: 'Priorities by consequence', d: 'Alarms are classified by the consequence of not attending them, so the operator knows which to read first.' },
      { t: 'State-based suppression', d: 'If the process is in shutdown mode, some alarms lose meaning (a low level with the pump off is no news) and are suppressed automatically.' },
      { t: 'Flood detection and KPIs', d: 'More than 10 alarms in 10 minutes counts as a flood. The system measures the 10-minute average, the peak, time in flood and the top alarm generators.' },
      { t: 'Six scenarios with and without management', d: 'Each 60-minute scenario is run twice: with raw thresholds and with the alarm engine, so the difference is measurable.' },
    ],
    concepts: [
      { t: 'ISA-18.2', d: 'A standard for managing the life cycle of alarm systems in the process industry: it defines states, priorities, rationalisation and metrics.' },
      { t: 'Delay (on-delay)', d: 'The time a condition must hold before the alarm activates. It filters brief noise spikes.' },
      { t: 'Deadband (hysteresis)', d: 'The distance between the activation and deactivation thresholds. It stops an alarm "chattering" when the signal sits on the threshold.' },
      { t: 'Shelving', d: 'Temporarily silencing a noisy alarm in a controlled, recorded way, to attend to it later.' },
      { t: 'Alarm flood', d: 'A situation where more alarms arrive than an operator can handle. Here defined as more than 10 in 10 minutes.' },
    ],
    decisions: [
      { t: 'Tackle noise with delay and deadband', d: 'It is the cheapest way to remove false activations, and by itself explains much of the drop from 396 to 0 alarms.' },
      { t: 'An alarm must call for an action', d: 'If an alarm does not require the operator to do something, it is surplus. Priorities and state-based suppression remove notices that only inform.' },
      { t: 'Measure with KPIs', d: 'Without numbers (average, peak, time in flood) any improvement is an impression. KPIs allow comparing scenarios and managing.' },
      { t: 'Compare against raw thresholds', d: 'The same process and faults are run with and without management; the difference therefore comes from the alarms and nothing else.' },
    ],
    tour: [
      'Pick in "Escenario" (scenario) the one with the level stuck at the threshold and press "Ejecutar comparación del escenario" (run the comparison): alarms go from 396 (raw) to 0 (managed).',
      'Pick the flood (failed pump, stuck valve, high demand and noisy sensor) and compare again: from 50 to 7 alarms.',
      'Speed up with ×60 or ×300 and acknowledge an active alarm with "Reconocer" (or all with "Reconocer todas"): its state changes in the list.',
      'Use "Repisar" (shelve) on a noisy alarm and then "Quitar repisado" (unshelve): it stays recorded as shelved, not deleted.',
      'Switch to "Modo planta: PARADA" (plant mode: stopped) and see which alarms get suppressed; look at the table of the top five generators.',
    ],
    verified: [
      'Six 60-minute scenarios run with and without management.',
      'With the level stuck at the low threshold: from 396 alarms to 0. In the flood: from 50 to 7 alarms (−86 %), from 2 flood episodes to none and from 40 % of time in flood to 0 %.',
      'Automated tests with node:test on the alarm engine and the process.',
    ],
    limits: [
      'It is a simulation: the process, thresholds and delay times are didactic choices, not a plant’s.',
      'It does not include the full ISA-18.2 rationalisation (reviewing each alarm with operations and safety), which in a real plant is the longest part of the work.',
      'EEMUA 191 is used only as a conceptual reference for load limits.',
    ],
    next: [
      'Add dependent alarms (suppress the consequences of a root cause), as in the rationalisation guides.',
      'Connect this engine to the two-tank SCADA simulator to see the alarms over the mimic.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Del proceso al operador', en: 'From process to operator' },
      caption: {
        es: 'El motor de alarmas se interpone entre el proceso y el operador: filtra, prioriza y suprime. Lo que el operador reconoce vuelve al motor y alimenta los KPI.',
        en: 'The alarm engine sits between the process and the operator: it filters, prioritises and suppresses. What the operator acknowledges goes back to the engine and feeds the KPIs.',
      },
      nodes: [
        { id: 'pr', label: { es: 'Proceso', en: 'Process' }, sub: { es: '2 tanques · PI de nivel', en: '2 tanks · level PI' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'mo', label: { es: 'Motor de alarmas', en: 'Alarm engine' }, sub: { es: 'retardo · banda muerta', en: 'delay · deadband' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'op', label: 'Operador', sub: { es: 'reconocer · repisar', en: 'acknowledge · shelve' }, col: 2, row: 0, tone: 'amber' },
        { id: 'kpi', label: 'KPI', sub: { es: 'inundación · top 5', en: 'flood · top 5' }, col: 3, row: 0 },
      ],
      edges: [
        { from: 'pr', to: 'mo', label: { es: 'nivel', en: 'level' } },
        { from: 'mo', to: 'op', label: { es: 'alarmas', en: 'alarms' } },
        { from: 'op', to: 'kpi' },
        { from: 'op', to: 'mo', loop: true, dashed: true, label: { es: 'reconocimiento', en: 'acknowledgement' } },
      ],
    },
    {
      kind: 'graph',
      placement: 'concepts',
      title: { es: 'El ciclo de vida de una alarma', en: 'An alarm’s life cycle' },
      caption: {
        es: 'Los estados principales. Aparte de estos, una alarma puede quedar repisada (silenciada a propósito y registrada) o suprimida (el estado del proceso la hace irrelevante).',
        en: 'The main states. Besides these, an alarm can be shelved (deliberately silenced and recorded) or suppressed (the process state makes it irrelevant).',
      },
      nodes: [
        { id: 'nor', label: 'Normal', col: 0, row: 0, tone: 'emerald' },
        { id: 'act', label: { es: 'Activa sin reconocer', en: 'Active, unacknowledged' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'rec', label: { es: 'Activa reconocida', en: 'Active, acknowledged' }, col: 2, row: 0, tone: 'amber' },
        { id: 'nsr', label: { es: 'Normalizada sin reconocer', en: 'Cleared, unacknowledged' }, col: 2, row: 1 },
      ],
      edges: [
        { from: 'nor', to: 'act', label: { es: 'retardo', en: 'delay' } },
        { from: 'act', to: 'rec', label: { es: 'reconoce', en: 'ack' } },
        { from: 'rec', to: 'nor', loopTop: true, dashed: true, label: { es: 'vuelve a normal', en: 'returns to normal' } },
        { from: 'act', to: 'nsr', label: { es: 'normaliza', en: 'clears' } },
        { from: 'nsr', to: 'nor', loop: true, dashed: true, label: { es: 'reconoce', en: 'ack' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Con y sin gestión de alarmas', en: 'With and without alarm management' },
      caption: {
        es: 'Resultados de los escenarios simulados de 60 minutos. «Sin gestión» es el umbral directo; «con gestión», el motor de alarmas.',
        en: 'Results of the simulated 60-minute scenarios. "Without management" is the raw threshold; "with management", the alarm engine.',
      },
      rows: [
        {
          label: { es: 'Nivel pegado al umbral bajo: alarmas en 60 min', en: 'Level stuck at the low threshold: alarms in 60 min' },
          items: [
            { label: { es: 'Sin gestión', en: 'Without management' }, value: 396, text: '396', tone: 'magenta' },
            { label: { es: 'Con gestión', en: 'With management' }, value: 0, text: '0', tone: 'emerald' },
          ],
        },
        {
          label: { es: 'Inundación (bomba fallada, válvula atascada…): alarmas', en: 'Flood (failed pump, stuck valve…): alarms' },
          items: [
            { label: { es: 'Sin gestión', en: 'Without management' }, value: 50, text: '50', tone: 'magenta' },
            { label: { es: 'Con gestión', en: 'With management' }, value: 7, text: '7', tone: 'emerald' },
          ],
        },
        {
          label: { es: 'Tiempo en inundación en ese escenario (%)', en: 'Time in flood in that scenario (%)' },
          items: [
            { label: { es: 'Sin gestión', en: 'Without management' }, value: 40, text: '40 %', tone: 'magenta' },
            { label: { es: 'Con gestión', en: 'With management' }, value: 0, text: '0 %', tone: 'emerald' },
          ],
        },
      ],
    },
  ],
}
