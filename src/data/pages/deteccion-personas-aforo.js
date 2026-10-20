export default {
  status: { es: 'Producto propio de I+D (aplicación local + servicio de cuentas)', en: 'In-house R&D product (local app + accounts service)' },
  related: ['zonas-riesgo-vision', 'vision-tracking-deportivo', 'visual-auto-trigger'],
  es: {
    lead: 'Una plataforma que cuenta personas que cruzan líneas virtuales, vigila zonas prohibidas con alarma y foto de evidencia, y entrega telemetría en Excel y CSV desde cámaras USB o RTSP. Todo el video se procesa en el sitio: nunca sale a la nube.',
    context: [
      'Comercios y recintos necesitan saber cuánta gente entra y sale, y que alguien avise cuando una persona invade una zona restringida. Pero un sistema que manda el video a la nube es un problema de privacidad y de costo, y uno que se cae cuando falla internet no sirve para seguridad.',
      'El producto tenía que contar y alarmar en el propio sitio, sin depender de internet, y aun así poder facturarse por cámara. Eso obligó a separar dos piezas: una aplicación local que procesa el video y un servicio de cuentas que solo sabe cuántas cámaras hay activas.',
    ],
    how: [
      { t: 'Capturar desde la cámara', d: 'La aplicación local lee cámaras USB o por red (RTSP).' },
      { t: 'Detectar personas con YOLO', d: 'Un modelo YOLO (Ultralytics) detecta personas en cada cuadro, acelerado por una GPU NVIDIA.' },
      { t: 'Líneas de conteo y zonas prohibidas', d: 'Las líneas de conteo direccional y las zonas prohibidas se dibujan con clics sobre la imagen. Si la cámara cambia de resolución, las coordenadas se reescalan solas.' },
      { t: 'Alarma con evidencia', d: 'Cuando alguien entra a una zona prohibida suena una alarma y se guarda una foto de evidencia del momento.' },
      { t: 'Panel en vivo y telemetría', d: 'Un panel muestra el conteo en vivo, y la telemetría por hora se exporta a Excel y CSV.' },
      { t: 'Datos protegidos', d: 'Las credenciales de las cámaras se guardan cifradas en la base de datos, la contraseña de administrador se genera en el primer arranque y los eventos se purgan a los 90 días.' },
      { t: 'Facturar sin recibir video', d: 'Un servicio aparte (control plane multi-tenant) lleva cuentas, sitios y facturación por cámara activa con Stripe. Recibe solo un latido con el número de cámaras, nunca video.' },
    ],
    concepts: [
      { t: 'Línea virtual de conteo', d: 'Un segmento dibujado sobre la imagen. Una persona cuenta como «entrada» o «salida» según el lado desde el que cruza, lo que da un conteo direccional.' },
      { t: 'Zona prohibida', d: 'Polígono sobre la imagen; si el punto de una persona cae dentro, se dispara la alarma.' },
      { t: 'RTSP', d: 'Protocolo con que muchas cámaras IP entregan video por la red.' },
      { t: 'Control plane multi-tenant', d: 'Servicio central que administra varios clientes (tenants) separados: cuentas, sitios y cobros, sin manejar la operación de cada sitio.' },
      { t: 'Latido (heartbeat)', d: 'Mensaje pequeño y periódico que dice «sigo vivo» y cuántas cámaras hay activas. Es lo único que sale del sitio.' },
    ],
    decisions: [
      { t: 'El video no sale del sitio', d: 'Resuelve la privacidad, ahorra ancho de banda y hace que el conteo y la alarma sigan funcionando sin internet.' },
      { t: 'Calibrar con clics', d: 'Quien instala el sistema marca las líneas y zonas sobre la imagen, sin editar archivos ni conocer coordenadas.' },
      { t: 'Separar aplicación local y control plane', d: 'Así el cobro puede ser por cámara activa sin que el servicio de cuentas necesite ver ninguna imagen.' },
      { t: 'Secretos y retención por defecto', d: 'Cifrar credenciales, generar la contraseña inicial y purgar eventos a los 90 días son decisiones por defecto, no configuraciones que alguien deba acordarse de activar.' },
    ],
    verified: [
      '31 pruebas automáticas repartidas entre los dos servicios.',
      'Cero video enviado a la nube; retención de evidencia de 90 días.',
    ],
    limits: [
      'Es un producto propio en desarrollo: la precisión del conteo depende de la cámara, el ángulo y la iluminación, y aquí no se publican cifras de precisión.',
      'Necesita una GPU NVIDIA para la detección en tiempo real.',
      'Por privacidad no hay demo con video real; el proyecto se explica en esta página.',
    ],
    next: [
      'Medir y publicar la precisión del conteo en escenas de prueba con distinto ángulo de cámara.',
      'Agregar un modo de recuento por franja horaria con comparación semanal.',
    ],
  },
  en: {
    lead: 'A platform that counts people crossing virtual lines, watches restricted zones with an alarm and photo evidence, and delivers telemetry in Excel and CSV from USB or RTSP cameras. All video is processed on site: it never goes to the cloud.',
    context: [
      'Shops and venues need to know how many people come and go, and to be alerted when someone enters a restricted zone. But a system that ships video to the cloud is a privacy and cost problem, and one that stops when the internet fails is useless for security.',
      'The product had to count and alarm on site, without depending on the internet, and still be billable per camera. That forced two pieces apart: a local application that processes the video and an accounts service that only knows how many cameras are active.',
    ],
    how: [
      { t: 'Capture from the camera', d: 'The local application reads USB or network (RTSP) cameras.' },
      { t: 'Detect people with YOLO', d: 'A YOLO model (Ultralytics) detects people in every frame, accelerated by an NVIDIA GPU.' },
      { t: 'Counting lines and restricted zones', d: 'Directional counting lines and restricted zones are drawn with clicks on the image. If the camera changes resolution, the coordinates rescale on their own.' },
      { t: 'Alarm with evidence', d: 'When someone enters a restricted zone an alarm sounds and a photo of the moment is saved as evidence.' },
      { t: 'Live panel and telemetry', d: 'A panel shows the live count, and hourly telemetry is exported to Excel and CSV.' },
      { t: 'Protected data', d: 'Camera credentials are stored encrypted in the database, the administrator password is generated on first start and events are purged after 90 days.' },
      { t: 'Billing without receiving video', d: 'A separate service (a multi-tenant control plane) handles accounts, sites and per-active-camera billing with Stripe. It only receives a heartbeat with the number of cameras, never video.' },
    ],
    concepts: [
      { t: 'Virtual counting line', d: 'A segment drawn over the image. A person counts as "in" or "out" depending on the side they cross from, giving a directional count.' },
      { t: 'Restricted zone', d: 'A polygon over the image; if a person’s point falls inside, the alarm fires.' },
      { t: 'RTSP', d: 'The protocol many IP cameras use to deliver video over the network.' },
      { t: 'Multi-tenant control plane', d: 'A central service that manages several separate customers (tenants): accounts, sites and billing, without running each site’s operation.' },
      { t: 'Heartbeat', d: 'A small periodic message saying "I’m alive" and how many cameras are active. It is the only thing that leaves the site.' },
    ],
    decisions: [
      { t: 'Video never leaves the site', d: 'It solves privacy, saves bandwidth and keeps counting and alarms working without internet.' },
      { t: 'Calibrate with clicks', d: 'Whoever installs the system marks lines and zones on the image, without editing files or knowing coordinates.' },
      { t: 'Separate the local app from the control plane', d: 'That way billing can be per active camera without the accounts service ever needing to see an image.' },
      { t: 'Secrets and retention by default', d: 'Encrypting credentials, generating the initial password and purging events at 90 days are defaults, not settings someone must remember to enable.' },
    ],
    verified: [
      '31 automated tests spread across the two services.',
      'Zero video sent to the cloud; 90-day evidence retention.',
    ],
    limits: [
      'It is an in-house product under development: counting accuracy depends on the camera, angle and lighting, and no accuracy figures are published here.',
      'It needs an NVIDIA GPU for real-time detection.',
      'For privacy there is no demo with real video; the project is explained on this page.',
    ],
    next: [
      'Measure and publish counting accuracy on test scenes with different camera angles.',
      'Add an hourly-band recount mode with weekly comparison.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Qué se queda en el sitio y qué sale', en: 'What stays on site and what leaves' },
      caption: {
        es: 'Todo el procesamiento de video ocurre dentro del recuadro de la izquierda. Hacia el servicio de cuentas solo viaja un latido con el número de cámaras activas.',
        en: 'All video processing happens inside the left box. Only a heartbeat with the number of active cameras travels to the accounts service.',
      },
      groups: [
        { label: { es: 'En el sitio del cliente', en: 'On the customer’s site' }, cols: [0, 3], rows: [0, 0] },
        { label: { es: 'Servicio de cuentas', en: 'Accounts service' }, cols: [4, 4], rows: [0, 0] },
      ],
      nodes: [
        { id: 'cam', label: { es: 'Cámaras', en: 'Cameras' }, sub: 'USB · RTSP', col: 0, row: 0 },
        { id: 'yolo', label: 'YOLO', sub: { es: 'detección GPU', en: 'GPU detection' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'zon', label: { es: 'Líneas y zonas', en: 'Lines and zones' }, sub: { es: 'aforo · alarma', en: 'count · alarm' }, col: 2, row: 0, tone: 'amber' },
        { id: 'tel', label: { es: 'Panel + telemetría', en: 'Panel + telemetry' }, sub: 'Excel · CSV', col: 3, row: 0, tone: 'emerald' },
        { id: 'cp', label: 'Control plane', sub: { es: 'cuentas · Stripe', en: 'accounts · Stripe' }, col: 4, row: 0 },
      ],
      edges: [
        { from: 'cam', to: 'yolo', label: { es: 'video', en: 'video' } },
        { from: 'yolo', to: 'zon', label: { es: 'personas', en: 'people' } },
        { from: 'zon', to: 'tel', label: { es: 'eventos', en: 'events' } },
        { from: 'tel', to: 'cp', label: { es: 'latido', en: 'heartbeat' }, dashed: true, tone: 'magenta' },
      ],
    },
  ],
}
