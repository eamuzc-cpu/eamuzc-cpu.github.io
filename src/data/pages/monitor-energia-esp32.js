export default {
  status: { es: 'Panel simulado; firmware escrito pero sin probar en hardware', en: 'Simulated dashboard; firmware written but not tested on hardware' },
  related: ['pipeline-mqtt-grafana', 'red-sensores-mqtt', 'esp32-alarma-mp3'],
  es: {
    lead: 'Un monitor de energía hecho de un ESP32 y un medidor PZEM-004T que publica por MQTT, más un panel que valida el mensaje y calcula energía, demanda de 15 minutos, costo de la cuenta, alertas, anomalías de consumo y armónicos. El firmware está escrito pero aún no se probó en hardware; el panel usa datos simulados.',
    context: [
      'La electricidad es un gasto grande y casi invisible: sin medir no se sabe cuánto consume cada carga, cuánta demanda máxima se paga, si el factor de potencia es malo ni si algún equipo quedó encendido de noche.',
      'Un medidor barato con un microcontrolador permite ver el consumo por hora, detectar fugas de energía y justificar acciones (corregir el factor de potencia, mover cargas fuera de la hora punta) antes de que lleguen en la cuenta.',
    ],
    how: [
      { t: 'El firmware lee el medidor', d: 'El ESP32 lee un PZEM-004T por UART: tensión, corriente, potencia, energía, frecuencia y factor de potencia.' },
      { t: 'Publica un JSON por MQTT', d: 'Cada 2 s publica un mensaje JSON en planta/energia/<id>. Usa última voluntad para declarar «offline», reconecta Wi-Fi y MQTT con espera creciente, tiene perro guardián y un modo simulado sin medidor.' },
      { t: 'El panel valida el mensaje', d: 'Antes de usar un dato, el panel comprueba tipos y rangos, y que la potencia sea coherente con tensión por corriente por factor de potencia (P ≈ V·I·FP).' },
      { t: 'Energía y demanda', d: 'Integra la potencia en el tiempo para obtener la energía, y calcula la demanda máxima de 15 minutos y el factor de carga.' },
      { t: 'La cuenta', d: 'Con una tarifa editable (energía, demanda y cargo fijo) proyecta lo que costaría la cuenta del mes.' },
      { t: 'Alertas y armónicos', d: 'Dispara alertas de tensión, corriente, factor de potencia y frecuencia, y muestra el espectro de armónicos de la corriente.' },
      { t: 'Anomalías de consumo', d: 'Compara la potencia suavizada con el perfil de los 14 días anteriores por tramos de 15 minutos, y avisa cuando hay un exceso sostenido.' },
    ],
    concepts: [
      { t: 'PZEM-004T', d: 'Módulo medidor de energía AC que mide tensión, corriente, potencia, energía, frecuencia y factor de potencia y los entrega por UART.' },
      { t: 'Demanda máxima de 15 minutos', d: 'El promedio de potencia más alto en una ventana de 15 minutos. En muchas tarifas se cobra por esa punta además de por la energía.' },
      { t: 'Factor de potencia', d: 'Qué parte de la corriente realiza trabajo útil. Un factor bajo implica más corriente para la misma potencia y suele penalizarse.' },
      { t: 'THD y armónicos', d: 'Distorsión armónica total de la corriente. Un variador de 6 pulsos suele llegar a un THD alto porque la corriente que toma no es una senoide.' },
      { t: 'Última voluntad (LWT)', d: 'Mensaje que el broker publica si el dispositivo desaparece sin avisar, para marcarlo «offline».' },
    ],
    decisions: [
      { t: 'Validar el mensaje en el borde del panel', d: 'Un dato con tipo o rango incorrecto, o una potencia que no cuadra con V·I·FP, se rechaza antes de contaminar la energía acumulada.' },
      { t: 'Anomalía contra el perfil propio', d: 'En vez de un umbral fijo, la comparación es contra el consumo habitual de esa hora. Así una fuga nocturna de 800 W se ve claramente, sin falsas alarmas en operación normal.' },
      { t: 'Exigir más en las horas variables', d: 'En las horas de más variación, el detector pide un exceso mayor para alertar, a cambio de no molestar con falsos positivos.' },
      { t: 'Declarar lo que no se probó', d: 'El firmware está escrito y revisado, pero no se ha probado en hardware real, y así se dice en el proyecto.' },
    ],
    tour: [
      'Observa «Potencia de las últimas 24 h» y la «Energía diaria»; sube la velocidad con ×60, ×600 o ×3600.',
      'Pulsa «Agregar fuga nocturna de 800 W (22–24 h)» y comprueba que el panel la detecta una sola vez; usa «Saltar a las 21:30» para llegar rápido a esa hora.',
      'Pulsa «Hueco de tensión (20 s)» y mira qué alertas se disparan.',
      'En «Cuenta de electricidad (proyección)» cambia las tarifas de energía, demanda y cargo fijo y mira cómo cambia el costo.',
      'Mira «Armónicos de la corriente» y el THD de un variador de 6 pulsos.',
      'En «Probar la validación con tu propio mensaje» edita el JSON y pulsa «Validar»: cambia un valor fuera de rango o una potencia que no cuadre.',
    ],
    verified: [
      'Una fuga nocturna de 800 W se detecta una sola vez y sin falsas alarmas en la operación normal, aunque en las horas de más variación exige un exceso mayor.',
      'Un variador de 6 pulsos da cerca de 42 % de THD en el panel.',
      '15 pruebas: el mensaje y su validación, integración de energía, demanda, costo, alertas, anomalías y armónicos.',
    ],
    limits: [
      'El firmware no se ha probado en hardware real («Hardware probado: pendiente»); el panel trabaja con un medidor simulado de cinco cargas.',
      'El detector de anomalías se calibra con el perfil simulado de 14 días, no con datos de un edificio real.',
      'Las tarifas son editables pero genéricas: no representan la de una empresa distribuidora concreta.',
    ],
    next: [
      'Probar el firmware con un medidor real y comparar contra un instrumento calibrado.',
      'Enviar los datos a la pila MQTT, Telegraf, InfluxDB y Grafana del proyecto de telemetría.',
    ],
  },
  en: {
    lead: 'An energy monitor made of an ESP32 and a PZEM-004T meter publishing over MQTT, plus a dashboard that validates the message and computes energy, 15-minute demand, bill cost, alerts, consumption anomalies and harmonics. The firmware is written but not yet tested on hardware; the dashboard uses simulated data.',
    context: [
      'Electricity is a big and almost invisible expense: without measuring you do not know how much each load consumes, how much peak demand you pay for, whether the power factor is poor or whether some equipment was left on overnight.',
      'A cheap meter with a microcontroller lets you see hourly consumption, detect energy leaks and justify actions (correcting the power factor, moving loads out of the peak) before they show up on the bill.',
    ],
    how: [
      { t: 'The firmware reads the meter', d: 'The ESP32 reads a PZEM-004T over UART: voltage, current, power, energy, frequency and power factor.' },
      { t: 'It publishes JSON over MQTT', d: 'Every 2 s it publishes a JSON message on planta/energia/<id>. It uses a last will to declare "offline", reconnects Wi-Fi and MQTT with increasing back-off, has a watchdog and a simulated mode with no meter.' },
      { t: 'The dashboard validates the message', d: 'Before using a datum, the dashboard checks types and ranges, and that the power is consistent with voltage times current times power factor (P ≈ V·I·PF).' },
      { t: 'Energy and demand', d: 'It integrates power over time to get energy, and computes 15-minute maximum demand and the load factor.' },
      { t: 'The bill', d: 'With an editable tariff (energy, demand and fixed charge) it projects what the month’s bill would cost.' },
      { t: 'Alerts and harmonics', d: 'It raises alerts for voltage, current, power factor and frequency, and shows the current’s harmonic spectrum.' },
      { t: 'Consumption anomalies', d: 'It compares smoothed power with the previous 14 days’ profile in 15-minute slots, and warns when there is a sustained excess.' },
    ],
    concepts: [
      { t: 'PZEM-004T', d: 'An AC energy-meter module that measures voltage, current, power, energy, frequency and power factor and delivers them over UART.' },
      { t: '15-minute maximum demand', d: 'The highest average power in a 15-minute window. In many tariffs that peak is charged in addition to energy.' },
      { t: 'Power factor', d: 'What part of the current does useful work. A low factor means more current for the same power and is often penalised.' },
      { t: 'THD and harmonics', d: 'Total harmonic distortion of the current. A 6-pulse drive tends to reach a high THD because the current it draws is not a sine wave.' },
      { t: 'Last will (LWT)', d: 'A message the broker publishes if the device disappears without warning, to mark it "offline".' },
    ],
    decisions: [
      { t: 'Validate the message at the dashboard’s edge', d: 'A datum with a wrong type or range, or a power that does not match V·I·PF, is rejected before it can contaminate accumulated energy.' },
      { t: 'Anomaly against its own profile', d: 'Instead of a fixed threshold, the comparison is against that hour’s usual consumption. That way an overnight 800 W leak stands out clearly, with no false alarms in normal operation.' },
      { t: 'Demand more in variable hours', d: 'In the hours with the most variation, the detector asks for a larger excess before alerting, in exchange for not bothering with false positives.' },
      { t: 'State what was not tested', d: 'The firmware is written and reviewed, but has not been tested on real hardware, and the project says so.' },
    ],
    tour: [
      'Watch "Potencia de las últimas 24 h" (power over the last 24 h) and the "Energía diaria" (daily energy); speed up with ×60, ×600 or ×3600.',
      'Press "Agregar fuga nocturna de 800 W (22–24 h)" (add an 800 W night leak) and check the dashboard detects it once; use "Saltar a las 21:30" (jump to 21:30) to reach that hour quickly.',
      'Press "Hueco de tensión (20 s)" (voltage sag) and see which alerts fire.',
      'Under "Cuenta de electricidad (proyección)" (electricity bill projection) change the energy, demand and fixed-charge tariffs and watch the cost change.',
      'Look at "Armónicos de la corriente" (current harmonics) and the THD of a 6-pulse drive.',
      'Under "Probar la validación con tu propio mensaje" (test validation with your own message) edit the JSON and press "Validar": change a value out of range or a power that does not add up.',
    ],
    verified: [
      'An overnight 800 W leak is detected once and with no false alarms in normal operation, though in the hours of most variation it requires a larger excess.',
      'A 6-pulse drive gives about 42 % THD on the dashboard.',
      '15 tests: the message and its validation, energy integration, demand, cost, alerts, anomalies and harmonics.',
    ],
    limits: [
      'The firmware has not been tested on real hardware ("Hardware tested: pending"); the dashboard works with a simulated five-load meter.',
      'The anomaly detector is calibrated with the simulated 14-day profile, not with data from a real building.',
      'The tariffs are editable but generic: they do not represent a specific distribution company’s.',
    ],
    next: [
      'Test the firmware with a real meter and compare against a calibrated instrument.',
      'Send the data to the MQTT, Telegraf, InfluxDB and Grafana stack from the telemetry project.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Del medidor al panel', en: 'From meter to dashboard' },
      caption: {
        es: 'El mensaje JSON que publica el ESP32 cada 2 s es el mismo que valida el panel. Los umbrales del panel (alertas y anomalías) vuelven a decidir qué se muestra.',
        en: 'The JSON message the ESP32 publishes every 2 s is the same one the dashboard validates. The dashboard’s thresholds (alerts and anomalies) in turn decide what is shown.',
      },
      nodes: [
        { id: 'pz', label: 'Medidor PZEM', sub: 'UART · Modbus', col: 0, row: 0 },
        { id: 'es', label: 'ESP32', sub: { es: 'Wi-Fi · última voluntad', en: 'Wi-Fi · last will' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'mq', label: 'MQTT', sub: 'planta/energia/<id>', col: 2, row: 0, tone: 'amber' },
        { id: 'pa', label: { es: 'Panel', en: 'Dashboard' }, sub: { es: 'kWh · demanda · alertas', en: 'kWh · demand · alerts' }, col: 3, row: 0, tone: 'emerald' },
      ],
      edges: [
        { from: 'pz', to: 'es', label: 'V I P' },
        { from: 'es', to: 'mq', label: 'JSON' },
        { from: 'mq', to: 'pa' },
        { from: 'pa', to: 'es', loopTop: true, dashed: true, label: { es: 'umbrales', en: 'thresholds' } },
      ],
    },
    {
      kind: 'graph',
      placement: 'decisions',
      title: { es: 'Detectar una fuga contra el perfil propio', en: 'Detecting a leak against the load’s own profile' },
      caption: {
        es: 'El perfil de los 14 días anteriores, por tramos de 15 minutos, es la referencia. Solo un exceso sostenido sobre ese perfil se declara anomalía.',
        en: 'The previous 14 days’ profile, in 15-minute slots, is the reference. Only a sustained excess over that profile is declared an anomaly.',
      },
      nodes: [
        { id: 'pot', label: { es: 'Potencia suavizada', en: 'Smoothed power' }, col: 0, row: 0 },
        { id: 'per', label: { es: 'Perfil de 14 días', en: '14-day profile' }, sub: { es: 'tramos de 15 min', en: '15-min slots' }, col: 0, row: 1, tone: 'amber' },
        { id: 'cmp', label: { es: 'Comparar', en: 'Compare' }, sub: { es: 'exceso sostenido', en: 'sustained excess' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'ano', label: { es: 'Anomalía', en: 'Anomaly' }, sub: { es: 'fuga de 800 W', en: '800 W leak' }, col: 2, row: 0, tone: 'emerald' },
      ],
      edges: [
        { from: 'pot', to: 'cmp' },
        { from: 'per', to: 'cmp', label: { es: 'referencia', en: 'reference' } },
        { from: 'cmp', to: 'ano', label: { es: 'alerta', en: 'alert' } },
      ],
    },
  ],
}
