export default {
  status: { es: 'Simulado: proceso y HMI propios (sin hardware ni prototipo)', en: 'Simulated: own process and HMI (no hardware or prototype)' },
  related: ['alarmas-isa182', 'scada-web-pasteurizador', 'pid-pasteurizador'],
  es: {
    lead: 'Dos estanques en serie que se vacían por gravedad, con un PI maestro de nivel que le pide flujo a un PI esclavo que mueve la válvula. Una HMI animada muestra el proceso, cuatro alarmas ISA-18.2 con retardo y banda muerta, un enclavamiento por nivel muy alto y escenarios de falla.',
    context: [
      'Un control en cascada sin protección contra el windup se descontrola cuando el actuador se satura, y una mala gestión de alarmas inunda al operador de avisos.',
      'El proyecto hace visible la diferencia entre una integral libre y una condicional, y cómo se comporta cada estado de una alarma ISA-18.2.',
    ],
    how: [
      { t: 'Dos estanques por gravedad', d: 'El estanque 1 alimenta al 2 y el 2 se vacía por un orificio, con la ley de Torricelli (el caudal de salida crece con la raíz de la altura). Con 30 L/min el segundo estanque se estabiliza en 1,000 m.' },
      { t: 'Control en cascada', d: 'Un PI maestro de nivel le pide un flujo a un PI esclavo de flujo, que mueve la válvula. El lazo interno (flujo) es rápido; el externo (nivel), lento.' },
      { t: 'Cuatro alarmas', d: 'Nivel muy alto HH (1,85 m), nivel alto H (1,60 m), flujo bajo (5 L/min) y temperatura alta (65 °C). Tienen retardo de activación y banda muerta, y siguen los estados activa-sin-reconocer, activa-reconocida y retorno-sin-reconocer.' },
      { t: 'Supresión', d: 'La alarma de flujo bajo se suprime en modo manual, en parada y durante los primeros 30 s.' },
      { t: 'Anti-windup condicional', d: 'El código del informe dice «anti-windup» pero solo satura la salida. Aquí, con integración condicional, la integral deja de crecer cuando la salida está saturada.' },
      { t: 'Enclavamiento por nivel muy alto', d: 'Una protección (LAHH) dispara y detiene el llenado si el nivel supera el límite; hay que rearmarla de forma explícita.' },
      { t: 'Escenarios de falla', d: 'Una fuga en el estanque 2, la bomba al 30 %, la válvula pegada cerrada y el sobrecalentamiento del fluido permiten probar alarmas y protecciones.' },
    ],
    concepts: [
      { t: 'Ley de Torricelli', d: 'La velocidad de salida de un líquido por un orificio es √(2gh): por eso el caudal depende de la altura y el sistema es no lineal.' },
      { t: 'Control en cascada', d: 'Dos lazos anidados: el externo fija la consigna del interno. Mejora el rechazo de perturbaciones en la variable rápida.' },
      { t: 'Windup', d: 'Acumulación de la integral mientras el actuador está saturado, que luego provoca un sobrepaso grande.' },
      { t: 'Integración condicional', d: 'Técnica de anti-windup que congela la integral mientras la salida está saturada y el error empuja hacia el mismo lado.' },
      { t: 'LAHH', d: 'Alarma de nivel muy alto con enclavamiento: una protección que actúa sin esperar al operador.' },
    ],
    decisions: [
      { t: 'Anti-windup de verdad', d: 'El informe «satura» pero no impide que la integral crezca. Con la bomba al 30 % esa integral llega a 37 762 y, al restaurarla, el nivel rebasa el estanque.' },
      { t: 'Precargar las integrales', d: 'Al iniciar, las integrales parten en un valor coherente con el régimen, por lo que el arranque es sin sobresalto.' },
      { t: 'Alarmas con retardo y banda muerta', d: 'Como en el proyecto de alarmas, el ruido del sensor no debe generar avisos repetidos.' },
      { t: 'Declarar las constantes', d: 'Áreas, orificios, válvula, constantes y ganancias de los PI son míos: el informe no los da.' },
    ],
    tour: [
      'En «Operación» deja marcados «cascada en automático», «anti-windup» y «enclavamiento LAHH» y mira el nivel con la «Consigna de nivel».',
      'Pulsa «Bomba al 30 %» y luego «Normalizar todo»: con anti-windup el nivel sube a ≈ 1,15 m y vuelve a 1,0 m.',
      'Desmarca «anti-windup», repite «Bomba al 30 %» y «Normalizar todo»: el nivel rebasa el estanque (≥ 1,95 m).',
      'Pulsa «Válvula pegada cerrada» o «Fuga en el estanque 2» y observa qué alarmas ISA-18.2 se activan en «Alarmas (ISA-18.2)»; usa «Reconocer» o «Reconocer todas».',
      'Si salta el enclavamiento LAHH, usa «Rearmar el disparo».',
      'Prueba «Sobrecalentar fluido» y mira la tendencia de los últimos 15 minutos simulados; usa ×20 o ×60 para acelerar.',
    ],
    verified: [
      'Con la bomba al 30 % la integral del esclavo crece hasta 37 762 y, al restaurarla, el nivel rebasa el estanque (≥ 1,95 m); con integración condicional el pico es de 1,15 m y vuelve a 1,0 m.',
      'Régimen de Torricelli (h2 = 1,000 m con 30 L/min), conservación del volumen a 0,2 %, asentamiento del escalón, arranque sin sobresalto, enclavamiento y rearme.',
      '15 pruebas automáticas; 4 alarmas ISA-18.2.',
    ],
    limits: [
      'Las áreas, los orificios, la válvula, las constantes y las ganancias de los PI son míos: el informe no los da.',
      'Es una simulación, sin hardware ni prototipo, y no un sistema SCADA conectado a instrumentos.',
      'Sirve para entender el control en cascada y las alarmas; un diseño real requiere el comisionamiento de cada lazo.',
    ],
    next: [
      'Conectar este proceso al motor de alarmas del proyecto ISA-18.2 para comparar con y sin gestión.',
      'Agregar roles y bitácora, como en el SCADA web del pasteurizador.',
    ],
  },
  en: {
    lead: 'Two tanks in series that drain by gravity, with a master level PI that asks a slave PI for flow, which moves the valve. An animated HMI shows the process, four ISA-18.2 alarms with delay and deadband, a very-high-level interlock and fault scenarios.',
    context: [
      'A cascade control without windup protection runs away when the actuator saturates, and poor alarm management floods the operator with notices.',
      'The project makes visible the difference between a free integral and a conditional one, and how each state of an ISA-18.2 alarm behaves.',
    ],
    how: [
      { t: 'Two gravity-fed tanks', d: 'Tank 1 feeds tank 2 and tank 2 drains through an orifice, following Torricelli’s law (outflow grows with the square root of the height). At 30 L/min the second tank settles at 1.000 m.' },
      { t: 'Cascade control', d: 'A master level PI asks a slave flow PI for a flow, which moves the valve. The inner (flow) loop is fast; the outer (level) one is slow.' },
      { t: 'Four alarms', d: 'Very high level HH (1.85 m), high level H (1.60 m), low flow (5 L/min) and high temperature (65 °C). They have activation delay and deadband, and follow the states active-unacknowledged, active-acknowledged and returned-unacknowledged.' },
      { t: 'Suppression', d: 'The low-flow alarm is suppressed in manual mode, in shutdown and during the first 30 s.' },
      { t: 'Conditional anti-windup', d: 'The report’s code says "anti-windup" but only saturates the output. Here, with conditional integration, the integral stops growing when the output is saturated.' },
      { t: 'Very-high-level interlock', d: 'A protection (LAHH) trips and stops filling if the level exceeds the limit; it must be explicitly reset.' },
      { t: 'Fault scenarios', d: 'A leak in tank 2, the pump at 30 %, the valve stuck closed and fluid overheating allow testing alarms and protections.' },
    ],
    concepts: [
      { t: 'Torricelli’s law', d: 'The outflow velocity of a liquid through an orifice is √(2gh): that is why flow depends on height and the system is nonlinear.' },
      { t: 'Cascade control', d: 'Two nested loops: the outer one sets the inner one’s setpoint. It improves disturbance rejection on the fast variable.' },
      { t: 'Windup', d: 'The integral accumulating while the actuator is saturated, which later causes a large overshoot.' },
      { t: 'Conditional integration', d: 'An anti-windup technique that freezes the integral while the output is saturated and the error pushes the same way.' },
      { t: 'LAHH', d: 'A very-high-level alarm with an interlock: a protection that acts without waiting for the operator.' },
    ],
    decisions: [
      { t: 'A real anti-windup', d: 'The report "saturates" but does not stop the integral from growing. With the pump at 30 % that integral reaches 37,762 and, on restoring it, the level overflows the tank.' },
      { t: 'Preload the integrals', d: 'At start, the integrals begin at a value consistent with steady state, so the start-up is bumpless.' },
      { t: 'Alarms with delay and deadband', d: 'As in the alarms project, sensor noise must not generate repeated notices.' },
      { t: 'State the constants', d: 'Areas, orifices, valve, constants and PI gains are mine: the report does not give them.' },
    ],
    tour: [
      'Under "Operación" (operation) leave "cascada en automático", "anti-windup" and "enclavamiento LAHH" ticked and watch the level with the "Consigna de nivel" (level setpoint).',
      'Press "Bomba al 30 %" (pump at 30 %) and then "Normalizar todo" (normalise all): with anti-windup the level rises to ≈ 1.15 m and returns to 1.0 m.',
      'Untick "anti-windup", repeat "Bomba al 30 %" and "Normalizar todo": the level overflows the tank (≥ 1.95 m).',
      'Press "Válvula pegada cerrada" (valve stuck closed) or "Fuga en el estanque 2" (leak in tank 2) and see which ISA-18.2 alarms activate under "Alarmas (ISA-18.2)"; use "Reconocer" or "Reconocer todas".',
      'If the LAHH interlock trips, use "Rearmar el disparo" (reset the trip).',
      'Try "Sobrecalentar fluido" (overheat fluid) and look at the trend of the last 15 simulated minutes; use ×20 or ×60 to speed up.',
    ],
    verified: [
      'With the pump at 30 % the slave’s integral grows to 37,762 and, on restoring it, the level overflows the tank (≥ 1.95 m); with conditional integration the peak is 1.15 m and returns to 1.0 m.',
      'Torricelli steady state (h2 = 1.000 m at 30 L/min), volume conservation to 0.2 %, step settling, bumpless start, interlock and reset.',
      '15 automated tests; 4 ISA-18.2 alarms.',
    ],
    limits: [
      'The areas, orifices, valve, constants and PI gains are mine: the report does not give them.',
      'It is a simulation, with no hardware or prototype, and not a SCADA connected to instruments.',
      'It serves to understand cascade control and alarms; a real design requires commissioning each loop.',
    ],
    next: [
      'Connect this process to the ISA-18.2 project’s alarm engine to compare with and without management.',
      'Add roles and an audit log, as in the web SCADA of the pasteurizer.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'La cascada de control', en: 'The control cascade' },
      caption: {
        es: 'El PI maestro decide cuánto flujo hace falta; el esclavo lo consigue moviendo la válvula. La medición de nivel vuelve al maestro, y las alarmas observan el proceso.',
        en: 'The master PI decides how much flow is needed; the slave gets it by moving the valve. The level measurement returns to the master, and the alarms watch the process.',
      },
      nodes: [
        { id: 'mae', label: { es: 'PI maestro', en: 'Master PI' }, sub: { es: 'nivel → flujo', en: 'level → flow' }, col: 0, row: 0, tone: 'magenta' },
        { id: 'esc', label: { es: 'PI esclavo', en: 'Slave PI' }, sub: { es: 'flujo → válvula', en: 'flow → valve' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'est', label: { es: 'Estanques', en: 'Tanks' }, sub: 'Torricelli', col: 2, row: 0, tone: 'emerald' },
        { id: 'ala', label: { es: 'Alarmas', en: 'Alarms' }, sub: 'ISA-18.2', col: 3, row: 0, tone: 'amber' },
      ],
      edges: [
        { from: 'mae', to: 'esc', label: { es: 'flujo', en: 'flow' } },
        { from: 'esc', to: 'est', label: { es: 'válvula', en: 'valve' } },
        { from: 'est', to: 'ala' },
        { from: 'est', to: 'mae', loopTop: true, dashed: true, label: { es: 'nivel', en: 'level' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Qué cambia con el anti-windup', en: 'What anti-windup changes' },
      caption: {
        es: 'Se pierde la bomba (30 %) y luego se restaura. Con una integral libre el nivel rebasa el estanque; con integración condicional el pico es mucho menor.',
        en: 'The pump is lost (30 %) and then restored. With a free integral the level overflows the tank; with conditional integration the peak is far lower.',
      },
      rows: [
        {
          label: { es: 'Pico del nivel tras perder la bomba (m)', en: 'Level peak after losing the pump (m)' },
          items: [
            { label: { es: 'Sin anti-windup', en: 'Without anti-windup' }, value: 1.95, text: '≥ 1,95 m', tone: 'magenta' },
            { label: { es: 'Con anti-windup', en: 'With anti-windup' }, value: 1.15, text: '1,15 m', tone: 'emerald' },
          ],
        },
      ],
    },
  ],
}
