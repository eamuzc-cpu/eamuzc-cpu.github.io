export default {
  status: { es: 'Proyecto personal (firmware + panel web)', en: 'Personal project (firmware + web panel)' },
  related: ['monitor-energia-esp32', 'asistente-pi-v3', 'red-sensores-mqtt'],
  es: {
    lead: 'El firmware de una central de alarma casera sobre un ESP32: lee cuatro zonas de sensores RF/PIR y un botón de pánico, anuncia el estado con avisos de voz MP3 y se controla desde un panel web en el celular. Está pensado para filtrar el ruido y seguir funcionando aunque el router caiga.',
    context: [
      'Los receptores RF y los sensores PIR baratos generan ruido y señales atascadas que disparan falsas alarmas. Una falsa alarma resta credibilidad al sistema, y una alarma casera que depende del WiFi del router queda inútil cuando este se cae.',
      'La central debía filtrar el ruido, avisar de sensores defectuosos y recuperarse sola de un bloqueo: una central colgada deja la casa sin protección.',
    ],
    how: [
      { t: 'Una estructura por entrada', d: 'Cada una de las cuatro zonas PIR y el botón de pánico se representan con una estructura que guarda su estado, su último cambio y sus banderas. Agregar una entrada es agregar un elemento a la lista.' },
      { t: 'Antirrebote de 60 ms', d: 'Un cambio de la señal solo se acepta si se mantiene 60 ms. Así un pulso de ruido de un sensor barato no cuenta como una detección.' },
      { t: 'Detectar la señal atascada', d: 'Un sensor que está activo más de 2 minutos se marca como «señal atascada»: probablemente esté defectuoso en vez de ver un intruso de forma continua.' },
      { t: 'Watchdog de 10 s', d: 'Un perro guardián reinicia la placa si el programa se cuelga y deja de reportarse durante 10 s.' },
      { t: 'WiFi dual', d: 'La placa se conecta al router y además emite su propia red privada. Si el router cae, el panel sigue accesible por esa red, y la reconexión al router se reintenta cada 10 s.' },
      { t: 'Panel web en el celular', d: 'Un servidor web embebido (HTML en el firmware y una API JSON) permite armar, desarmar y activar el pánico, y muestra las zonas, la memoria libre y el tiempo encendido.' },
      { t: 'Interruptor físico y avisos de voz', d: 'Un interruptor de palanca arma y desarma por flancos, y un DFPlayer Mini reproduce los avisos de «activada», «desactivada» y «pánico».' },
    ],
    concepts: [
      { t: 'Antirrebote', d: 'Técnica para ignorar las oscilaciones muy rápidas de una entrada digital, y aceptar su valor solo cuando se estabiliza.' },
      { t: 'Watchdog', d: 'Temporizador que el programa debe «alimentar» periódicamente; si no lo hace (porque se colgó), el hardware reinicia la placa.' },
      { t: 'AP + STA', d: 'El ESP32 puede ser a la vez cliente (STA) de un router y punto de acceso (AP) con su propia red WiFi.' },
      { t: 'Sensor PIR', d: 'Detector de movimiento por infrarrojo pasivo: reacciona al calor de una persona en movimiento.' },
      { t: 'Detección por flanco', d: 'Reaccionar al cambio de la señal (de bajo a alto o al revés) y no a su nivel, de modo que mantener la palanca en una posición no repita la acción.' },
    ],
    decisions: [
      { t: 'Filtrar en el firmware', d: 'Quitar el ruido en la placa evita que llegue al panel o a la sirena. Una detección que se ve en el panel es una detección que pasó el filtro.' },
      { t: 'Marcar al sensor, no solo ignorarlo', d: 'Un sensor atascado se muestra como tal, para que se pueda revisar o reemplazar en vez de esconder el problema.' },
      { t: 'Que no dependa del router', d: 'La red propia permite armar y desarmar aunque el WiFi de la casa esté caído. Una alarma que se cae con el router no protege cuando más hace falta.' },
      { t: 'Recuperarse sola', d: 'El watchdog y la reconexión automática hacen que la central vuelva a operar sin que alguien tenga que ir a reiniciarla.' },
    ],
    verified: [
      'Parámetros de diseño: 4 zonas PIR + 1 pánico, 2 redes WiFi simultáneas y watchdog de 10 s.',
    ],
    limits: [
      'Esta página describe el diseño del firmware; no incluye mediciones de campo ni pruebas de falsas alarmas.',
      'Es un proyecto personal: no se ofrece como sistema de seguridad certificado.',
      'Corre sobre hardware (ESP32, DFPlayer, sensores), por lo que no hay demo en el navegador.',
    ],
    next: [
      'Agregar una bitácora de eventos con hora que sobreviva a un reinicio.',
      'Medir en un caso real cuántas señales atascadas y rebotes filtra el firmware al día.',
    ],
  },
  en: {
    lead: 'The firmware of a home alarm panel on an ESP32: it reads four RF/PIR sensor zones and a panic button, announces its state with MP3 voice prompts and is controlled from a web panel on the phone. It is designed to filter noise and keep working even if the router goes down.',
    context: [
      'Cheap RF receivers and PIR sensors generate noise and stuck signals that trigger false alarms. A false alarm costs the system credibility, and a home alarm that depends on the router’s WiFi is useless when the router goes down.',
      'The panel had to filter noise, flag faulty sensors and recover on its own from a lock-up: a hung panel leaves the house unprotected.',
    ],
    how: [
      { t: 'A structure per input', d: 'Each of the four PIR zones and the panic button is represented by a structure holding its state, its last change and its flags. Adding an input means adding an item to the list.' },
      { t: '60 ms debounce', d: 'A signal change is only accepted if it lasts 60 ms. That way a noise pulse from a cheap sensor does not count as a detection.' },
      { t: 'Detect the stuck signal', d: 'A sensor that stays active for more than 2 minutes is flagged as "stuck signal": it is probably faulty rather than seeing an intruder continuously.' },
      { t: '10 s watchdog', d: 'A watchdog reboots the board if the program hangs and stops reporting for 10 s.' },
      { t: 'Dual WiFi', d: 'The board connects to the router and also broadcasts its own private network. If the router goes down, the panel stays reachable over that network, and the reconnection to the router is retried every 10 s.' },
      { t: 'Web panel on the phone', d: 'An embedded web server (HTML in the firmware and a JSON API) lets you arm, disarm and trigger panic, and shows the zones, free memory and uptime.' },
      { t: 'Physical switch and voice prompts', d: 'A toggle switch arms and disarms on edges, and a DFPlayer Mini plays the "armed", "disarmed" and "panic" prompts.' },
    ],
    concepts: [
      { t: 'Debounce', d: 'A technique to ignore very fast oscillations of a digital input and accept its value only once it settles.' },
      { t: 'Watchdog', d: 'A timer the program must periodically "feed"; if it does not (because it hung), the hardware reboots the board.' },
      { t: 'AP + STA', d: 'The ESP32 can be both a client (STA) of a router and an access point (AP) with its own WiFi network.' },
      { t: 'PIR sensor', d: 'A passive-infrared motion detector: it reacts to the heat of a moving person.' },
      { t: 'Edge detection', d: 'Reacting to the change of the signal (low to high or the reverse) and not to its level, so holding the toggle in one position does not repeat the action.' },
    ],
    decisions: [
      { t: 'Filter in the firmware', d: 'Removing noise on the board keeps it from reaching the panel or the siren. A detection you see on the panel is one that passed the filter.' },
      { t: 'Flag the sensor, do not just ignore it', d: 'A stuck sensor is shown as such, so it can be checked or replaced instead of hiding the problem.' },
      { t: 'Do not depend on the router', d: 'The own network allows arming and disarming even if the house WiFi is down. An alarm that falls over with the router does not protect when it matters most.' },
      { t: 'Recover on its own', d: 'The watchdog and automatic reconnection make the panel resume operating without someone having to go reboot it.' },
    ],
    verified: [
      'Design parameters: 4 PIR zones + 1 panic, 2 simultaneous WiFi networks and a 10 s watchdog.',
    ],
    limits: [
      'This page describes the firmware design; it does not include field measurements or false-alarm tests.',
      'It is a personal project: it is not offered as a certified security system.',
      'It runs on hardware (ESP32, DFPlayer, sensors), so there is no browser demo.',
    ],
    next: [
      'Add a timestamped event log that survives a reboot.',
      'Measure in a real case how many stuck signals and bounces the firmware filters per day.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Qué ve y qué hace la central', en: 'What the panel sees and does' },
      caption: {
        es: 'Los sensores y el interruptor entran por el ESP32, donde se filtran. El panel web llega por dos redes (el router y la propia) y devuelve órdenes de armar, desarmar y pánico.',
        en: 'The sensors and switch enter through the ESP32, where they are filtered. The web panel is reached over two networks (the router and its own) and sends back arm, disarm and panic orders.',
      },
      nodes: [
        { id: 'sen', label: { es: 'Sensores', en: 'Sensors' }, sub: 'RF / PIR', col: 0, row: 0 },
        { id: 'esp', label: 'ESP32', sub: { es: 'antirrebote · watchdog', en: 'debounce · watchdog' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'web', label: { es: 'Panel web', en: 'Web panel' }, sub: 'AP + STA', col: 2, row: 0, tone: 'emerald' },
        { id: 'sw', label: { es: 'Interruptor', en: 'Switch' }, sub: { es: 'de palanca', en: 'toggle' }, col: 0, row: 1 },
        { id: 'dfp', label: 'DFPlayer Mini', sub: { es: 'avisos de voz', en: 'voice prompts' }, col: 1, row: 1, tone: 'amber' },
      ],
      edges: [
        { from: 'sen', to: 'esp', label: { es: 'zonas', en: 'zones' } },
        { from: 'esp', to: 'web', label: 'JSON' },
        { from: 'sw', to: 'esp', label: { es: 'flancos', en: 'edges' } },
        { from: 'esp', to: 'dfp', label: 'MP3' },
        { from: 'web', to: 'esp', loopTop: true, dashed: true, label: { es: 'armar / desarmar / pánico', en: 'arm / disarm / panic' } },
      ],
    },
  ],
}
