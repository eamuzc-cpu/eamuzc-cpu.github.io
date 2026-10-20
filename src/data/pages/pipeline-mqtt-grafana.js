export default {
  status: { es: 'Pila real probada en Docker; la página del sitio es explicativa', en: 'Real stack tested in Docker; the site page is explanatory' },
  related: ['monitor-energia-esp32', 'red-sensores-mqtt', 'scada-web-pasteurizador'],
  es: {
    lead: 'Una pila de cinco contenedores con Docker Compose que recibe mensajes MQTT de una planta, los guarda en InfluxDB y los muestra en un tablero de Grafana provisionado. Incluye un simulador de datos y un script que verifica todo de punta a punta, y se levanta con un solo comando.',
    context: [
      'Una planta genera datos en muchos equipos, pero sin una cadena que los reciba, los guarde y los muestre, quedan en las pantallas de cada máquina. Armar esa cadena a mano es lento, difícil de repetir y fácil de dejar insegura.',
      'Con una pila reproducible, cualquier sensor o PLC que hable MQTT se convierte en una serie de tiempo consultable y graficable en minutos, y el mismo montaje sirve para probar un firmware nuevo sin tocar la planta.',
    ],
    how: [
      { t: 'Mosquitto recibe', d: 'El broker MQTT es el punto de entrada: los dispositivos publican mensajes JSON en topics como planta/energia y planta/proceso.' },
      { t: 'Telegraf traduce', d: 'Telegraf se suscribe a esos topics, interpreta el JSON con json_v2 y lo entrega a la base de datos.' },
      { t: 'InfluxDB guarda', d: 'InfluxDB 2 guarda cada punto usando la hora del propio mensaje, no la de llegada, para que un retraso de red no deforme la serie.' },
      { t: 'Grafana muestra', d: 'Grafana trae la fuente de datos (Flux) y el tablero provisionados desde archivos, así que quedan idénticos en cualquier equipo que levante la pila.' },
      { t: 'Arranque ordenado', d: 'Los servicios esperan a que sus dependencias estén sanas (healthchecks y service_healthy), los puertos se atan a 127.0.0.1 y las claves salen de un archivo .env con valores de prueba por defecto.' },
      { t: 'Un simulador que parece una planta', d: 'Un simulador en Node publica un medidor de energía con el mismo mensaje que el firmware del ESP32 y un pasteurizador con fallas de vapor periódicas.' },
      { t: 'Verificación de punta a punta', d: 'El script verificar.ps1 comprueba que los servicios estén sanos, que lleguen mensajes, que InfluxDB reciba puntos y que Grafana tenga su fuente de datos y su tablero.' },
    ],
    concepts: [
      { t: 'Docker Compose', d: 'Herramienta que describe varios contenedores en un archivo y los levanta juntos con un solo comando.' },
      { t: 'Serie de tiempo', d: 'Datos medidos a lo largo del tiempo (potencia cada 2 s, temperatura cada segundo). Una base de series de tiempo está optimizada para guardarlos y consultarlos por rango.' },
      { t: 'Telegraf', d: 'Agente que recoge datos de muchas fuentes (aquí MQTT) y los envía a una base de datos.' },
      { t: 'Flux', d: 'Lenguaje de consulta de InfluxDB 2, que se usa para armar los paneles de Grafana.' },
      { t: 'Provisionamiento', d: 'Dejar la configuración en archivos del repositorio para que la fuente de datos y el tablero se creen solos, sin pasos manuales.' },
    ],
    decisions: [
      { t: 'Que se levante con un solo comando', d: 'Una pila difícil de arrancar no se vuelve a usar. Con Compose, probar un firmware es levantar y mirar.' },
      { t: 'Usar la hora del mensaje', d: 'Si el dato lleva su propio instante, un corte de red no mueve los puntos en el gráfico.' },
      { t: 'Puertos atados a localhost', d: 'La pila queda accesible solo desde el propio equipo por defecto. Exponerla es una decisión consciente, no un descuido.' },
      { t: 'Una verificación automática', d: 'verificar.ps1 hace de prueba de humo: si algo se rompe al cambiar una configuración, se nota en segundos.' },
    ],
    tour: [
      'Revisa la sección «Arquitectura» para ver el recorrido de un mensaje desde el sensor hasta el tablero.',
      'Mira «El tablero con datos reales de la prueba»: es una captura del Grafana de la pila corriendo en Docker.',
      'En «Cómo ejecutarlo», usa los botones «copiar» para tomar los comandos, y fíjate en la sección «Mensajes» para ver el formato de los JSON.',
      'Lee «Decisiones y límites»: ahí se dice qué falta para exponer la pila (usuarios, TLS, ACL y claves propias).',
    ],
    verified: [
      'En la prueba real en Docker, los cinco servicios quedaron sanos.',
      'InfluxDB acumuló 56 puntos de cada medición en 2 minutos.',
      'Un mensaje publicado fue consultable en InfluxDB en 0,23 s (mediana de 5 intentos, máximo 2,3 s).',
      'Un mensaje con JSON inválido se descartó y quedó en el log.',
    ],
    limits: [
      'La página del portafolio es explicativa: la pila real corre con Docker en el repositorio del proyecto, no dentro del navegador.',
      'Es una pila de pruebas: el broker permite conexiones anónimas y sin TLS. El README detalla lo que falta para exponerla (usuarios, TLS, ACL y claves propias).',
      'Los datos que publica el simulador son sintéticos.',
    ],
    next: [
      'Agregar autenticación y TLS en Mosquitto y claves propias en cada servicio.',
      'Conectar un ESP32 real, como el del proyecto de monitor de energía, y comparar con los datos del simulador.',
    ],
  },
  en: {
    lead: 'A five-container Docker Compose stack that receives MQTT messages from a plant, stores them in InfluxDB and shows them on a provisioned Grafana dashboard. It includes a data simulator and a script that verifies everything end to end, and starts with a single command.',
    context: [
      'A plant generates data in many machines, but without a chain that receives, stores and shows it, it stays on each machine’s screen. Building that chain by hand is slow, hard to repeat and easy to leave insecure.',
      'With a reproducible stack, any sensor or PLC that speaks MQTT becomes a time series you can query and chart in minutes, and the same setup serves to test new firmware without touching the plant.',
    ],
    how: [
      { t: 'Mosquitto receives', d: 'The MQTT broker is the entry point: devices publish JSON messages on topics such as planta/energia and planta/proceso.' },
      { t: 'Telegraf translates', d: 'Telegraf subscribes to those topics, parses the JSON with json_v2 and hands it to the database.' },
      { t: 'InfluxDB stores', d: 'InfluxDB 2 stores each point using the message’s own time, not the arrival time, so a network delay does not distort the series.' },
      { t: 'Grafana displays', d: 'Grafana brings its data source (Flux) and dashboard provisioned from files, so they are identical on any machine that starts the stack.' },
      { t: 'Ordered start-up', d: 'Services wait for their dependencies to be healthy (healthchecks and service_healthy), ports are bound to 127.0.0.1 and secrets come from a .env file with test defaults.' },
      { t: 'A simulator that looks like a plant', d: 'A Node simulator publishes an energy meter with the same message as the ESP32 firmware and a pasteurizer with periodic steam faults.' },
      { t: 'End-to-end verification', d: 'The verificar.ps1 script checks that services are healthy, that messages arrive, that InfluxDB receives points and that Grafana has its data source and dashboard.' },
    ],
    concepts: [
      { t: 'Docker Compose', d: 'A tool that describes several containers in a file and starts them together with a single command.' },
      { t: 'Time series', d: 'Data measured over time (power every 2 s, temperature every second). A time-series database is optimised to store and query them by range.' },
      { t: 'Telegraf', d: 'An agent that collects data from many sources (here MQTT) and sends it to a database.' },
      { t: 'Flux', d: 'InfluxDB 2’s query language, used to build the Grafana panels.' },
      { t: 'Provisioning', d: 'Leaving the configuration in repository files so the data source and dashboard are created on their own, with no manual steps.' },
    ],
    decisions: [
      { t: 'Start with a single command', d: 'A stack that is hard to start does not get used again. With Compose, testing firmware is starting it and looking.' },
      { t: 'Use the message’s time', d: 'If the datum carries its own instant, a network outage does not move the points on the chart.' },
      { t: 'Ports bound to localhost', d: 'The stack is reachable only from the machine itself by default. Exposing it is a conscious decision, not an oversight.' },
      { t: 'An automatic check', d: 'verificar.ps1 acts as a smoke test: if something breaks when changing a configuration, you notice in seconds.' },
    ],
    tour: [
      'Review the "Arquitectura" (architecture) section to see a message’s path from sensor to dashboard.',
      'Look at "El tablero con datos reales de la prueba" (the dashboard with real data from the test): a capture of the stack’s Grafana running in Docker.',
      'Under "Cómo ejecutarlo" (how to run it), use the "copiar" (copy) buttons to take the commands, and look at the "Mensajes" section for the JSON format.',
      'Read "Decisiones y límites" (decisions and limits): it says what is missing to expose the stack (users, TLS, ACLs and own keys).',
    ],
    verified: [
      'In the real Docker test, all five services came up healthy.',
      'InfluxDB accumulated 56 points of each measurement in 2 minutes.',
      'A published message was queryable in InfluxDB in 0.23 s (median of 5 attempts, maximum 2.3 s).',
      'A message with invalid JSON was discarded and left in the log.',
    ],
    limits: [
      'The portfolio page is explanatory: the real stack runs with Docker from the project’s repository, not inside the browser.',
      'It is a test stack: the broker allows anonymous connections and no TLS. The README details what is missing to expose it (users, TLS, ACLs and own keys).',
      'The data the simulator publishes is synthetic.',
    ],
    next: [
      'Add authentication and TLS in Mosquitto and own keys in each service.',
      'Connect a real ESP32, like the one from the energy-monitor project, and compare with the simulator’s data.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Un mensaje, de punta a punta', en: 'One message, end to end' },
      caption: {
        es: 'Los cinco servicios corren dentro de Docker Compose y solo escuchan en localhost. Telegraf es el puente entre MQTT y la base de series de tiempo.',
        en: 'The five services run inside Docker Compose and listen only on localhost. Telegraf is the bridge between MQTT and the time-series database.',
      },
      groups: [{ label: { es: 'Docker Compose · 5 contenedores · 127.0.0.1', en: 'Docker Compose · 5 containers · 127.0.0.1' }, cols: [0, 4], rows: [0, 0] }],
      nodes: [
        { id: 'sim', label: { es: 'Simulador', en: 'Simulator' }, sub: { es: 'JSON del ESP32', en: 'ESP32 JSON' }, col: 0, row: 0 },
        { id: 'mos', label: 'Mosquitto', sub: 'planta/#', col: 1, row: 0, tone: 'magenta' },
        { id: 'tel', label: 'Telegraf', sub: 'json_v2', col: 2, row: 0, tone: 'amber' },
        { id: 'inf', label: 'InfluxDB 2', sub: { es: 'hora del mensaje', en: 'message time' }, col: 3, row: 0, tone: 'emerald' },
        { id: 'gra', label: 'Grafana', sub: { es: 'tablero provisionado', en: 'provisioned dashboard' }, col: 4, row: 0 },
      ],
      edges: [
        { from: 'sim', to: 'mos', label: 'MQTT' },
        { from: 'mos', to: 'tel', label: { es: 'suscribe', en: 'subscribes' } },
        { from: 'tel', to: 'inf', label: { es: 'puntos', en: 'points' } },
        { from: 'inf', to: 'gra', label: 'Flux' },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Latencia de un mensaje hasta InfluxDB', en: 'Latency of a message until InfluxDB' },
      caption: {
        es: 'Cinco intentos en la prueba real en Docker. La mediana es una fracción de segundo; el peor intento tardó diez veces más.',
        en: 'Five attempts in the real Docker test. The median is a fraction of a second; the worst attempt took ten times longer.',
      },
      rows: [
        {
          label: { es: 'Tiempo desde la publicación hasta que se puede consultar (s)', en: 'Time from publishing until it can be queried (s)' },
          items: [
            { label: { es: 'Mediana', en: 'Median' }, value: 0.23, text: '0,23 s', tone: 'emerald' },
            { label: { es: 'Máximo', en: 'Maximum' }, value: 2.3, text: '2,3 s', tone: 'amber' },
          ],
        },
      ],
    },
  ],
}
