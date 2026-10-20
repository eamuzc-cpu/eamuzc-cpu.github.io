export default {
  status: { es: 'Simulado en el navegador; broker probado también sobre TCP real', en: 'Simulated in the browser; broker also tested over real TCP' },
  related: ['pipeline-mqtt-grafana', 'monitor-energia-esp32', 'gemelo-digital-nodo-iot'],
  es: {
    lead: 'Un broker MQTT 3.1.1 escrito desde cero, con su cliente, cinco nodos tipo ESP32 simulados y un inspector que muestra los bytes de cada paquete. Sirve para entender qué pasa con un nodo que se apaga sin avisar, con un mensaje que nadie confirma o con un suscriptor que llega tarde.',
    context: [
      'MQTT parece simple hasta que hay que decidir qué pasa en los casos incómodos: un nodo que se apaga sin avisar, un mensaje que nadie confirma, un suscriptor que se conecta después de que el sensor publicó.',
      'En una planta, un sensor mudo que el tablero sigue mostrando como válido es peor que uno que se declara caído. El testamento retenido y el keepalive resuelven justamente eso, y para entenderlo bien conviene implementarlos.',
    ],
    how: [
      { t: 'Codificar y decodificar paquetes', d: 'Se escribió el formato binario de MQTT 3.1.1: cabecera fija con tipo y longitud variable, y los paquetes CONNECT, CONNACK, PUBLISH, PUBACK, SUBSCRIBE, SUBACK, PING y DISCONNECT. Las tramas se comprobaron contra bytes de referencia.' },
      { t: 'Un broker con las funciones clave', d: 'Comodines + y #, mensajes retenidos, testamento (LWT), keepalive de 1,5 ×, toma de sesión por ClientId y reenvío de QoS 1.' },
      { t: 'Un cliente con reintentos', d: 'El cliente publica con QoS 0 (sin confirmación) o con QoS 1 (con PUBACK) y reintenta si la confirmación no llega.' },
      { t: 'Cinco nodos simulados', d: 'En la demo corre el mismo broker dentro del navegador con cinco nodos tipo ESP32 que publican telemetría por topics como planta/#.' },
      { t: 'Un inspector de bytes', d: 'Muestra el contenido binario de cada paquete, para ver qué cambia entre un PUBLISH de QoS 0 y uno de QoS 1.' },
      { t: 'Comprobar contra el mundo real', d: 'El broker sobre TCP real se probó con mqtt.js 5.16.1: QoS 1, comodines, mensajes retenidos, testamento y una carga de 100 kB.' },
    ],
    concepts: [
      { t: 'QoS 0 y QoS 1', d: 'QoS 0 envía una vez y no confirma («a lo sumo una vez»). QoS 1 exige un PUBACK y reenvía hasta recibirlo («al menos una vez», con posibles duplicados).' },
      { t: 'Mensaje retenido', d: 'El broker guarda el último mensaje de un topic y se lo entrega a quien se suscriba después. Así un tablero nuevo ve el último valor sin esperar.' },
      { t: 'Testamento (LWT)', d: 'Mensaje que el nodo deja registrado al conectarse y que el broker publica si el nodo desaparece sin despedirse. Permite declarar «offline» de forma explícita.' },
      { t: 'Keepalive', d: 'Intervalo en que el cliente promete comunicarse. Si pasa 1,5 veces ese tiempo sin noticias, el broker lo da por muerto.' },
      { t: 'Comodines', d: '«+» reemplaza un nivel del topic (planta/+/temp); «#» reemplaza todos los niveles siguientes (planta/#).' },
    ],
    decisions: [
      { t: 'Implementar el protocolo para entenderlo', d: 'Escribir los paquetes obliga a conocer el formato; con ello el inspector puede mostrar bytes reales y no una explicación.' },
      { t: 'Probar con un cliente independiente', d: 'Que mqtt.js, escrito por otros, se conecte y funcione con este broker es una prueba más fuerte que probarlo solo contra su propio cliente.' },
      { t: 'Declarar la caída en vez de callar', d: 'Con testamento retenido y keepalive, un nodo que se apaga queda como «offline» en pocos segundos, en vez de quedar con su último valor para siempre.' },
      { t: 'Medir con pérdida simulada', d: 'Simular un enlace que pierde el 20 % de los paquetes enseña, con números, para qué sirve QoS 1.' },
    ],
    tour: [
      'Observa los cinco nodos publicando en la «Topología en vivo» (cada punto es un paquete MQTT) y en el «Inspector de paquetes».',
      'Sube la «Pérdida simulada en el enlace» a 20 % y pulsa «Ejecutar comparación»: con QoS 1 la entrega llega a ≈ 99,4 % y con QoS 0 a ≈ 79,1 %. También puedes alternar los botones QoS 0 / QoS 1 de la telemetría.',
      'Pulsa «Apagar» en un nodo (equivale a apagarse sin DISCONNECT) y mira cómo el testamento lo declara caído tras unos segundos de keepalive; «Reconectar» lo recupera.',
      'Prueba «Publicar retenida» con una consigna y luego «Conectar un panel nuevo»: el panel recibe el valor retenido al instante.',
      'Cambia el «Keepalive de los nodos» (5 s o 30 s) y observa cuánto tarda en declararse caído un nodo apagado.',
    ],
    verified: [
      'Con 20 % de pérdida simulada: QoS 1 entrega el 99,4 % (con 331 reintentos) frente a 79,1 % con QoS 0.',
      'Un nodo cortado sin DISCONNECT queda offline en unos 15 s con keepalive de 10 s.',
      'El broker sobre TCP real movió unos 19.000 mensajes por segundo en una ráfaga de 20.000 mensajes QoS 0 en localhost.',
      '21 pruebas automáticas; interoperabilidad comprobada con mqtt.js.',
    ],
    limits: [
      'No hay firmware probado en hardware: los nodos de la demo son simulados.',
      'Implementa MQTT 3.1.1 con QoS 0 y 1; no incluye QoS 2, autenticación ni TLS.',
      'El rendimiento de 19.000 mensajes por segundo se midió en localhost y no representa una red real.',
    ],
    next: [
      'Agregar QoS 2 y autenticación por usuario y contraseña.',
      'Conectar un ESP32 real que publique al broker, como en el proyecto del monitor de energía.',
    ],
  },
  en: {
    lead: 'An MQTT 3.1.1 broker written from scratch, with its client, five simulated ESP32-style nodes and an inspector that shows each packet’s bytes. It helps understand what happens with a node that powers off without warning, a message nobody confirms or a subscriber that arrives late.',
    context: [
      'MQTT looks simple until you have to decide what happens in the awkward cases: a node that powers off without warning, a message nobody confirms, a subscriber that connects after the sensor published.',
      'In a plant, a silent sensor that the dashboard keeps showing as valid is worse than one that declares itself down. The retained will and the keepalive solve exactly that, and to understand them well it helps to implement them.',
    ],
    how: [
      { t: 'Encode and decode packets', d: 'The binary format of MQTT 3.1.1 was written: a fixed header with type and variable length, and the CONNECT, CONNACK, PUBLISH, PUBACK, SUBSCRIBE, SUBACK, PING and DISCONNECT packets. Frames were checked against reference bytes.' },
      { t: 'A broker with the key features', d: 'Wildcards + and #, retained messages, last will (LWT), 1.5× keepalive, session takeover by ClientId and QoS 1 redelivery.' },
      { t: 'A client with retries', d: 'The client publishes with QoS 0 (no acknowledgement) or QoS 1 (with PUBACK) and retries if the acknowledgement does not arrive.' },
      { t: 'Five simulated nodes', d: 'In the demo the same broker runs inside the browser with five ESP32-style nodes publishing telemetry on topics such as planta/#.' },
      { t: 'A byte inspector', d: 'It shows the binary content of each packet, to see what differs between a QoS 0 PUBLISH and a QoS 1 one.' },
      { t: 'Check against the real world', d: 'The broker over real TCP was tested with mqtt.js 5.16.1: QoS 1, wildcards, retained messages, last will and a 100 kB payload.' },
    ],
    concepts: [
      { t: 'QoS 0 and QoS 1', d: 'QoS 0 sends once and does not confirm ("at most once"). QoS 1 requires a PUBACK and resends until it arrives ("at least once", with possible duplicates).' },
      { t: 'Retained message', d: 'The broker stores a topic’s last message and delivers it to whoever subscribes later. That way a new dashboard sees the last value without waiting.' },
      { t: 'Last will (LWT)', d: 'A message the node registers on connecting and the broker publishes if the node disappears without saying goodbye. It allows declaring "offline" explicitly.' },
      { t: 'Keepalive', d: 'The interval in which the client promises to communicate. If 1.5 times that time passes with no news, the broker considers it dead.' },
      { t: 'Wildcards', d: '"+" replaces one topic level (planta/+/temp); "#" replaces all following levels (planta/#).' },
    ],
    decisions: [
      { t: 'Implement the protocol to understand it', d: 'Writing the packets forces you to know the format; that way the inspector can show real bytes, not an explanation.' },
      { t: 'Test with an independent client', d: 'That mqtt.js, written by others, connects and works with this broker is a stronger test than trying it only against its own client.' },
      { t: 'Declare the failure instead of going silent', d: 'With a retained last will and keepalive, a node that powers off ends up "offline" within seconds, instead of keeping its last value forever.' },
      { t: 'Measure with simulated loss', d: 'Simulating a link that drops 20 % of packets teaches, with numbers, what QoS 1 is for.' },
    ],
    tour: [
      'Watch the five nodes publishing in the "Topología en vivo" (live topology; each dot is an MQTT packet) and in the "Inspector de paquetes" (packet inspector).',
      'Raise the "Pérdida simulada en el enlace" (simulated link loss) to 20 % and press "Ejecutar comparación" (run comparison): with QoS 1 delivery reaches ≈ 99.4 % and with QoS 0 ≈ 79.1 %. You can also toggle the QoS 0 / QoS 1 buttons for the telemetry.',
      'Press "Apagar" (power off) on a node (equivalent to going down without DISCONNECT) and watch the last will declare it down after a few seconds of keepalive; "Reconectar" brings it back.',
      'Try "Publicar retenida" (publish retained) with a setpoint and then "Conectar un panel nuevo" (connect a new panel): the panel receives the retained value instantly.',
      'Change the nodes’ "Keepalive" (5 s or 30 s) and see how long a powered-off node takes to be declared down.',
    ],
    verified: [
      'With 20 % simulated loss: QoS 1 delivers 99.4 % (with 331 retries) against 79.1 % with QoS 0.',
      'A node cut without DISCONNECT goes offline in about 15 s with a 10 s keepalive.',
      'The broker over real TCP moved about 19,000 messages per second in a burst of 20,000 QoS 0 messages on localhost.',
      '21 automated tests; interoperability checked with mqtt.js.',
    ],
    limits: [
      'There is no firmware tested on hardware: the demo’s nodes are simulated.',
      'It implements MQTT 3.1.1 with QoS 0 and 1; it does not include QoS 2, authentication or TLS.',
      'The 19,000 messages-per-second figure was measured on localhost and does not represent a real network.',
    ],
    next: [
      'Add QoS 2 and username/password authentication.',
      'Connect a real ESP32 publishing to the broker, as in the energy-monitor project.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Nodos, broker y tablero', en: 'Nodes, broker and dashboard' },
      caption: {
        es: 'Los nodos publican en topics; el broker los reparte a los suscriptores y, con QoS 1, exige confirmación. El inspector es un suscriptor especial que muestra los bytes.',
        en: 'Nodes publish to topics; the broker hands them to subscribers and, with QoS 1, demands acknowledgement. The inspector is a special subscriber that shows the bytes.',
      },
      nodes: [
        { id: 'nod', label: { es: 'Nodos ESP32', en: 'ESP32 nodes' }, sub: { es: '5 simulados', en: '5 simulated' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'bro', label: { es: 'Broker MQTT', en: 'MQTT broker' }, sub: 'QoS 0/1 · LWT', col: 1, row: 0, tone: 'magenta' },
        { id: 'tab', label: { es: 'Tablero', en: 'Dashboard' }, sub: 'planta/#', col: 2, row: 0 },
        { id: 'ins', label: { es: 'Inspector', en: 'Inspector' }, sub: { es: 'bytes del paquete', en: 'packet bytes' }, col: 3, row: 0, tone: 'amber' },
      ],
      edges: [
        { from: 'nod', to: 'bro', label: 'PUBLISH' },
        { from: 'bro', to: 'tab', label: { es: 'reparte', en: 'delivers' } },
        { from: 'tab', to: 'ins' },
        { from: 'bro', to: 'nod', loop: true, dashed: true, label: { es: 'PUBACK · reintentos', en: 'PUBACK · retries' } },
      ],
    },
    {
      kind: 'graph',
      placement: 'concepts',
      title: { es: 'QoS 1: confirmar y reintentar', en: 'QoS 1: confirm and retry' },
      caption: {
        es: 'Si el PUBACK no vuelve, el nodo repite el PUBLISH. Por eso QoS 1 entrega «al menos una vez»: a cambio, puede haber duplicados.',
        en: 'If the PUBACK does not come back, the node repeats the PUBLISH. That is why QoS 1 delivers "at least once": in exchange, there may be duplicates.',
      },
      nodes: [
        { id: 'pub', label: { es: 'Nodo', en: 'Node' }, sub: { es: 'publica y espera', en: 'publishes and waits' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'brk', label: 'Broker', sub: { es: 'guarda y reparte', en: 'stores and delivers' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'sub', label: { es: 'Suscriptor', en: 'Subscriber' }, col: 2, row: 0 },
      ],
      edges: [
        { from: 'pub', to: 'brk', label: 'PUBLISH' },
        { from: 'brk', to: 'sub', label: 'PUBLISH' },
        { from: 'brk', to: 'pub', loop: true, dashed: true, label: 'PUBACK' },
        { from: 'pub', to: 'brk', loopTop: true, dashed: true, tone: 'amber', label: { es: 'sin PUBACK: reintento', en: 'no PUBACK: retry' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Entrega con 20 % de pérdida en el enlace', en: 'Delivery with 20 % link loss' },
      caption: {
        es: 'Telemetría simulada. QoS 1 necesitó 331 reintentos para llegar casi al 100 %.',
        en: 'Simulated telemetry. QoS 1 needed 331 retries to get close to 100 %.',
      },
      rows: [
        {
          label: { es: 'Mensajes entregados (%)', en: 'Messages delivered (%)' },
          items: [
            { label: 'QoS 0', value: 79.1, text: '79,1 %', tone: 'magenta' },
            { label: 'QoS 1', value: 99.4, text: '99,4 %', tone: 'emerald' },
          ],
        },
      ],
    },
  ],
}
