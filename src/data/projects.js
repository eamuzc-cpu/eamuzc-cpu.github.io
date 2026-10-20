// Bitácora de proyectos. Para agregar un caso nuevo, añade un objeto al arreglo
// `projects` siguiendo el esquema de cualquiera de los existentes. No se necesita
// tocar ningún otro archivo (`featured: n` = visible de entrada, en el puesto n; el resto queda bajo "Ver más"): la UI (filtros, grid, modal, terminal) se genera sola
// a partir de esta lista. Texto traducible = { es, en } (ver src/i18n.jsx).
// `category` es un id de CATEGORIES. `image`: ruta a una foto real (ej. '/projects/<slug>.jpg'
// en public/); null usa la portada SVG temática. `diagram`: diagrama de bloques del modal.

export const CATEGORIES = [
  { id: 'all', label: { es: 'Todos', en: 'All' } },
  { id: 'automation', label: { es: 'Automatización & PLCs', en: 'Automation & PLCs' } },
  { id: 'instrumentation', label: { es: 'Instrumentación & Procesos', en: 'Instrumentation & Process' } },
  { id: 'vision', label: { es: 'Visión Artificial & Software', en: 'Computer Vision & Software' } },
  { id: 'embedded', label: { es: 'Electrónica & Embebidos', en: 'Electronics & Embedded' } },
  { id: 'web', label: { es: 'Desarrollo Web', en: 'Web Development' } },
  { id: 'ai', label: { es: 'IA & Herramientas', en: 'AI & Tooling' } },
]

export const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id

export const projects = [
  {
    slug: 'tetra-pak-soprole',
    featured: 1,
    title: {
      es: 'Optimización y Mantenimiento de Línea de Envasado Tetra Pak Speed A3',
      en: 'Optimization and Maintenance of a Tetra Pak Speed A3 Packaging Line',
    },
    client: 'Soprole',
    category: 'automation',
    year: 2023,
    image: '/projects/tetra-pak-soprole.jpg',
    resultBadge: { es: '+12% disponibilidad de línea', en: '+12% line availability' },
    summary: {
      es: 'Diagnóstico y ajuste de una línea continua de alta velocidad para lácteos, eliminando micro-paradas en el empaque final.',
      en: 'Diagnosis and tuning of a high-speed continuous dairy line, eliminating micro-stops at final packaging.',
    },
    stack: ['Allen-Bradley ControlLogix', 'Studio 5000', { es: 'Servomotores', en: 'Servomotors' }, 'TPMS'],
    challenge: {
      es: 'Línea continua de alta velocidad para lácteos con micro-paradas imprevistas en empaque final: Cardboard Packer, Accumulator Helix y aplicadores Meurer/Tetra Pak generaban pérdidas constantes de ciclo.',
      en: 'A high-speed continuous dairy line with unplanned micro-stops at final packaging: the Cardboard Packer, Accumulator Helix and Meurer/Tetra Pak applicators caused constant cycle losses.',
    },
    impact: {
      es: 'Cada micro-parada representaba merma de producto envasado, riesgo de atascamiento mecánico y exposición a incumplimientos de inocuidad alimentaria. Resolverlo era crítico para sostener el throughput contractual con la planta.',
      en: 'Every micro-stop meant packaged product loss, risk of mechanical jams and exposure to food-safety non-compliance. Fixing it was critical to sustain the plant’s contractual throughput.',
    },
    solution: {
      es: 'Se implementaron planes de mantenimiento preventivo y autónomo (TPM) sobre los subsistemas críticos, con diagnóstico en línea usando PLCs Allen-Bradley y Studio 5000. Se realizó ajuste micrométrico de servomotores y resincronización de la cadena cinemática del aplicador, todo bajo procedimientos LOTO estrictos para intervención segura en equipo energizado.',
      en: 'Preventive and autonomous maintenance plans (TPM) were rolled out on the critical subsystems, with online diagnostics using Allen-Bradley PLCs and Studio 5000. Servomotors were micro-adjusted and the applicator’s kinematic chain was resynchronized, all under strict LOTO procedures for safe work on energized equipment.',
    },
    metrics: [
      { label: { es: 'Micro-paradas', en: 'Micro-stops' }, value: '-28%' },
      { label: { es: 'Disponibilidad global', en: 'Overall availability' }, value: '+12%' },
      { label: { es: 'Intervenciones LOTO', en: 'LOTO interventions' }, value: '100%' },
    ],
    diagram: {
      nodes: [
        { label: 'HMI', sub: 'FactoryTalk' },
        { label: 'PLC', sub: 'ControlLogix' },
        { label: { es: 'Servodrives', en: 'Servo drives' }, sub: { es: 'ajuste fino', en: 'fine tuning' } },
        { label: { es: 'Aplicador', en: 'Applicator' }, sub: 'Helix / Packer' },
      ],
      feedback: { from: 3, to: 1, label: 'encoders' },
    },
    tools: {
      hardware: ['Allen-Bradley ControlLogix', { es: 'Servomotores', en: 'Servomotors' }, 'Encoders'],
      software: ['Studio 5000', 'FactoryTalk', 'TPMS'],
    },
  },
  {
    slug: 'extrusion-hdpe',
    featured: 2,
    title: {
      es: 'Automatización Integral de Línea de Extrusión y Corte de Tuberías HDPE',
      en: 'End-to-End Automation of an HDPE Pipe Extrusion and Cutting Line',
    },
    client: { es: 'Planta de manufactura HDPE', en: 'HDPE manufacturing plant' },
    category: 'automation',
    year: 2022,
    image: '/projects/extrusion-hdpe.jpg',
    resultBadge: { es: '99.2% precisión de corte', en: '99.2% cutting accuracy' },
    summary: {
      es: 'Sincronización de extrusión y corte automático de tuberías HDPE eliminando desviaciones térmicas y cortes asincrónicos.',
      en: 'Synchronized extrusion and automatic cutting of HDPE pipes, eliminating thermal drift and out-of-sync cuts.',
    },
    stack: ['PLC Delta', { es: 'Variadores VFD', en: 'VFD drives' }, 'Encoders', { es: 'Termocuplas J/K', en: 'J/K thermocouples' }],
    challenge: {
      es: 'El proceso de extrusión presentaba variaciones térmicas que generaban tolerancias dimensionales no homogéneas, con cortes asincrónicos respecto al avance real del material.',
      en: 'The extrusion process showed thermal variations that produced uneven dimensional tolerances, with cuts out of sync with the actual material feed.',
    },
    impact: {
      es: 'Cada desviación térmica se traducía en desperdicio directo de materia prima HDPE y piezas fuera de especificación. Sincronizar el corte al avance real del extrusor era necesario para sostener el arranque de línea sin detener el proceso continuo.',
      en: 'Every thermal deviation translated into wasted HDPE raw material and out-of-spec parts. Syncing the cut to the extruder’s real feed was required to keep the line running without stopping the continuous process.',
    },
    solution: {
      es: 'Se programó el PLC Delta con lazos PID independientes para las zonas de calefacción y enfriamiento del cañón, usando termocuplas J/K como realimentación. La velocidad de arrastre se sincronizó mediante variadores de frecuencia y un encoder incremental, que dispara el accionamiento de la guillotina de corte rápido en la posición exacta.',
      en: 'The Delta PLC was programmed with independent PID loops for the barrel’s heating and cooling zones, using J/K thermocouples as feedback. Haul-off speed was synchronized through variable frequency drives and an incremental encoder that fires the fast-cut guillotine at the exact position.',
    },
    metrics: [
      { label: { es: 'Precisión de corte', en: 'Cutting accuracy' }, value: '99.2%' },
      { label: { es: 'Scrap de arranque', en: 'Start-up scrap' }, value: '-18%' },
      { label: { es: 'Zonas PID activas', en: 'Active PID zones' }, value: '6' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Termocuplas', en: 'Thermocouples' }, sub: 'J / K' },
        { label: 'PLC Delta', sub: { es: '6 lazos PID', en: '6 PID loops' } },
        { label: 'VFD', sub: { es: 'arrastre', en: 'haul-off' } },
        { label: { es: 'Guillotina', en: 'Guillotine' }, sub: { es: 'corte rápido', en: 'fast cut' } },
      ],
      feedback: { from: 2, to: 1, label: { es: 'encoder de avance', en: 'feed encoder' } },
    },
    tools: {
      hardware: ['PLC Delta', 'HMI Delta', { es: 'Variadores VFD', en: 'VFD drives' }, { es: 'Termocuplas J/K', en: 'J/K thermocouples' }],
      software: ['WPLSoft', 'ISPSoft'],
    },
  },
  {
    slug: 'pasteurizacion-lazos-control',
    title: {
      es: 'Comisionamiento y Calibración de Lazos de Control Sanitario para Pasteurización',
      en: 'Commissioning and Calibration of Sanitary Control Loops for Pasteurization',
    },
    client: { es: 'Planta láctea', en: 'Dairy plant' },
    category: 'instrumentation',
    year: 2023,
    image: '/projects/pasteurizacion-lazos-control.jpg',
    resultBadge: { es: '±0.3°C en régimen permanente', en: '±0.3°C at steady state' },
    summary: {
      es: 'Recalibración de lazos de temperatura del pasteurizador para asegurar la curva reglamentaria de la leche.',
      en: 'Recalibration of the pasteurizer’s temperature loops to guarantee the milk’s regulatory curve.',
    },
    stack: ['Siemens S7-300', 'TIA Portal', 'RTD PT100', 'HART'],
    challenge: {
      es: 'Desviaciones de temperatura en el pasteurizador ponían en riesgo la curva pasteurizadora reglamentaria de la leche, con oscilaciones que comprometían el batch completo.',
      en: 'Temperature deviations in the pasteurizer put the milk’s regulatory pasteurization curve at risk, with oscillations that compromised the whole batch.',
    },
    impact: {
      es: 'Una curva fuera de norma obliga al reprocesamiento del batch o, peor, expone al consumidor final si no se detecta a tiempo. Asegurar el cumplimiento bromatológico y sanitario era no negociable para la operación de la planta.',
      en: 'An out-of-spec curve forces the batch to be reprocessed or, worse, exposes the end consumer if not caught in time. Food-safety and sanitary compliance was non-negotiable for the plant.',
    },
    solution: {
      es: 'Se recalibraron los transmisores RTD PT100 sanitarios con protocolo 4-20 mA HART, se sintonizó finamente el lazo de vapor mediante bloques de función (FB) en AWL/Ladder sobre PLC Siemens S7-300, y se ajustaron las válvulas modulantes neumáticas para eliminar el sobreimpulso térmico.',
      en: 'The sanitary RTD PT100 transmitters were recalibrated over 4-20 mA HART, the steam loop was fine-tuned with function blocks (FB) in STL/Ladder on a Siemens S7-300 PLC, and the pneumatic modulating valves were adjusted to eliminate thermal overshoot.',
    },
    metrics: [
      { label: { es: 'Error de control', en: 'Control error' }, value: '±0.3°C' },
      { label: { es: 'Trazabilidad de curvas', en: 'Curve traceability' }, value: '100%' },
      { label: { es: 'Reprocesos evitados', en: 'Reprocessing avoided' }, value: { es: 'Total', en: 'All' } },
    ],
    diagram: {
      nodes: [
        { label: 'RTD PT100', sub: { es: 'sanitario', en: 'sanitary' } },
        { label: '4-20 mA', sub: 'HART' },
        { label: 'S7-300', sub: 'FB PID' },
        { label: { es: 'Válvula vapor', en: 'Steam valve' }, sub: { es: 'modulante', en: 'modulating' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'temperatura de proceso', en: 'process temperature' } },
    },
    tools: {
      hardware: ['Siemens S7-300', 'RTD PT100', { es: 'Válvulas neumáticas', en: 'Pneumatic valves' }],
      software: ['TIA Portal', 'AWL / Ladder'],
    },
  },
  {
    slug: 'vision-tracking-deportivo',
    title: {
      es: 'Sistema de Tracking y Visión Artificial para Análisis Deportivo en Tiempo Real',
      en: 'Real-Time Computer Vision Tracking System for Sports Analytics',
    },
    client: { es: 'Proyecto de I+D personal', en: 'Personal R&D project' },
    category: 'vision',
    year: 2024,
    image: '/projects/vision-tracking-deportivo.jpg',
    resultBadge: { es: '94% precisión de trayectoria', en: '94% trajectory accuracy' },
    summary: {
      es: 'Pipeline de visión artificial que reconstruye trayectorias y mapas de calor de jugadores desde una sola cámara.',
      en: 'Computer vision pipeline that reconstructs player trajectories and heatmaps from a single camera.',
    },
    stack: ['Python', 'OpenCV', 'YOLOv8', 'PyTorch'],
    challenge: {
      es: 'Se necesitaba registrar trayectorias, mapas de calor y velocidad de jugadores sin depender de sensores corporales ni wearables invasivos, usando solo una cámara de video estándar.',
      en: 'The goal was to record player trajectories, heatmaps and speed without body sensors or invasive wearables, using only a standard video camera.',
    },
    impact: {
      es: 'Los sistemas de tracking deportivo comerciales dependen de infraestructura costosa (múltiples cámaras, chips GPS). Un pipeline funcional desde una sola toma habilita análisis táctico accesible para equipos sin ese presupuesto.',
      en: 'Commercial sports tracking systems rely on expensive infrastructure (multiple cameras, GPS chips). A working single-shot pipeline makes tactical analysis accessible to teams without that budget.',
    },
    solution: {
      es: 'Se construyó un pipeline en Python con YOLOv8 para detección de personas y balón en cada frame, homografía de perspectiva con OpenCV para proyectar las coordenadas de cámara sobre un plano 2D de la cancha, y filtros de estimación para sostener el tracking durante oclusiones entre jugadores.',
      en: 'A Python pipeline was built with YOLOv8 for per-frame person and ball detection, OpenCV perspective homography to project camera coordinates onto a 2D pitch plane, and estimation filters to keep tracking through occlusions between players.',
    },
    metrics: [
      { label: { es: 'Procesamiento en GPU RTX', en: 'Processing on RTX GPU' }, value: '>45 FPS' },
      { label: { es: 'Precisión de trayectoria', en: 'Trajectory accuracy' }, value: '94%' },
      { label: { es: 'Sensores wearables', en: 'Wearable sensors' }, value: '0' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Cámara', en: 'Camera' }, sub: { es: '1 toma', en: 'single shot' } },
        { label: 'YOLOv8', sub: { es: 'detección', en: 'detection' } },
        { label: { es: 'Homografía', en: 'Homography' }, sub: { es: 'plano 2D', en: '2D pitch' } },
        { label: 'Tracking', sub: { es: 'filtros', en: 'filters' } },
        { label: { es: 'Métricas', en: 'Metrics' }, sub: 'heatmaps' },
      ],
    },
    tools: {
      hardware: ['GPU RTX', { es: 'Cámara estándar', en: 'Standard camera' }],
      software: ['Python', 'OpenCV', 'YOLOv8', 'PyTorch', 'NumPy'],
    },
  },
  {
    slug: 'asistente-pi-v3',
    title: {
      es: 'Asistente de Voz Embebido en Raspberry Pi con IA, IoT y Domótica',
      en: 'Embedded Voice Assistant on Raspberry Pi with AI, IoT and Home Automation',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'embedded',
    year: 2026,
    image: '/projects/asistente-pi-v3.jpg',
    resultBadge: { es: 'Wake word 100% offline', en: '100% offline wake word' },
    summary: {
      es: 'Asistente de voz con cara animada que corre 24/7 en una Raspberry Pi: reconocimiento de voz offline, LLM multimodal, bot de Telegram y control real de domótica.',
      en: 'Voice assistant with an animated face running 24/7 on a Raspberry Pi: offline speech recognition, multimodal LLM, Telegram bot and real home-automation control.',
    },
    stack: ['Raspberry Pi', 'Python', 'Vosk', 'Home Assistant'],
    challenge: {
      es: 'La versión anterior tenía credenciales en el código, una inyección de comandos real, latencia alta por depender de la nube para cada frase, y funciones simuladas: domótica que fingía éxito y alarmas que se perdían al reiniciar.',
      en: 'The previous version had credentials in the code, a real command-injection bug, high latency from sending every phrase to the cloud, and simulated features: home automation that faked success and alarms that were lost on reboot.',
    },
    impact: {
      es: 'Un asistente que corre en casa con micrófono abierto y acceso al sistema tiene que ser seguro y confiable antes que vistoso. La reescritura lo convierte en un sistema embebido de uso diario, no en una demo.',
      en: 'An assistant running at home with an always-on microphone and system access has to be secure and reliable before it is flashy. The rewrite turns it into an everyday embedded system, not a demo.',
    },
    solution: {
      es: 'Reescritura completa: wake word y reconocimiento de voz offline con Vosk, resolución local de comandos triviales sin LLM, router multi-modelo (Gemini/OpenAI/Ollama) con herramientas auto-descubiertas, domótica real vía HTTP a Tasmota/Home Assistant, alarmas persistentes en disco, bot de Telegram con lista blanca, panel de administración web y servicio systemd con reinicio automático.',
      en: 'Full rewrite: offline wake word and speech recognition with Vosk, local handling of trivial commands without the LLM, a multi-model router (Gemini/OpenAI/Ollama) with auto-discovered tools, real home automation over HTTP to Tasmota/Home Assistant, alarms persisted to disk, a whitelisted Telegram bot, a web admin panel and a systemd service with automatic restart.',
    },
    metrics: [
      { label: { es: 'Herramientas para el LLM', en: 'LLM tools' }, value: '47' },
      { label: { es: 'Proveedores de LLM', en: 'LLM providers' }, value: '3' },
      { label: { es: 'Módulos de tests unitarios', en: 'Unit test modules' }, value: '12' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Micrófono', en: 'Microphone' }, sub: 'wake word' },
        { label: 'Vosk STT', sub: 'offline' },
        { label: { es: 'Router LLM', en: 'LLM router' }, sub: { es: 'intents locales', en: 'local intents' } },
        { label: 'Plugins', sub: { es: '47 herramientas', en: '47 tools' } },
        { label: { es: 'Voz + cara', en: 'Voice + face' }, sub: 'TTS / WebSocket' },
      ],
      feedback: { from: 3, to: 2, label: { es: 'resultado de tool', en: 'tool result' } },
    },
    tools: {
      hardware: ['Raspberry Pi', 'Tasmota', 'Home Assistant'],
      software: ['Python', 'Vosk', 'Gemini / OpenAI / Ollama', 'Telegram Bot API', 'WebSockets', 'systemd'],
    },
  },
  {
    slug: 'ethereal-jewelry',
    title: {
      es: 'E-commerce Full-Stack para Marca de Joyería Ethereal Jewelry',
      en: 'Full-Stack E-commerce for the Ethereal Jewelry Brand',
    },
    client: 'Ethereal Jewelry',
    category: 'web',
    year: 2026,
    image: '/projects/ethereal-jewelry.jpg',
    resultBadge: { es: '3 pasarelas de pago chilenas', en: '3 Chilean payment gateways' },
    summary: {
      es: 'Tienda online de joyería demi-fine con catálogo, carrito persistente, checkout con Webpay, Mercado Pago y Flow, seguimiento de pedidos y panel de administración.',
      en: 'Online store for demi-fine jewelry with catalog, persistent cart, checkout with Webpay, Mercado Pago and Flow, order tracking and an admin panel.',
    },
    stack: ['React', 'Node.js / Express', 'Webpay', 'Playwright'],
    challenge: {
      es: 'La marca necesitaba una tienda con estética editorial de alta gama que además vendiera de verdad en Chile: pagos locales, cupones, stock, correos transaccionales y un panel para gestionar todo sin tocar código.',
      en: 'The brand needed a store with a high-end editorial look that would also actually sell in Chile: local payments, coupons, stock, transactional emails and a panel to manage everything without touching code.',
    },
    impact: {
      es: 'Una tienda solo visual no vende: sin pasarelas locales ni gestión de pedidos, cada venta sería manual. Integrar los medios de pago chilenos y el back-office habilita la operación real del negocio.',
      en: 'A purely visual store does not sell: without local gateways or order management, every sale would be manual. Integrating Chilean payment methods and a back office enables the business to actually operate.',
    },
    solution: {
      es: 'Frontend en React con Vite, React Router y Zustand (carrito y checkout persistentes). Backend en Express con autenticación JWT para el admin, rate limiting, validación, cupones, cálculo de precios y envío en servidor, e integración con Transbank Webpay, Mercado Pago y Flow. Verificación end-to-end con Playwright y tests con Vitest.',
      en: 'React frontend with Vite, React Router and Zustand (persistent cart and checkout). Express backend with JWT authentication for the admin, rate limiting, validation, coupons, server-side pricing and shipping, and integrations with Transbank Webpay, Mercado Pago and Flow. End-to-end verification with Playwright and tests with Vitest.',
    },
    metrics: [
      { label: { es: 'Pasarelas de pago', en: 'Payment gateways' }, value: '3' },
      { label: { es: 'Vistas de administración', en: 'Admin views' }, value: '8' },
      { label: { es: 'Páginas públicas', en: 'Public pages' }, value: '14' },
    ],
    diagram: {
      nodes: [
        { label: 'React SPA', sub: { es: 'carrito Zustand', en: 'Zustand cart' } },
        { label: 'API Express', sub: 'JWT · rate limit' },
        { label: { es: 'Pagos', en: 'Payments' }, sub: 'Webpay · MP · Flow' },
        { label: { es: 'Pedidos', en: 'Orders' }, sub: { es: 'email + admin', en: 'email + admin' } },
      ],
      feedback: { from: 2, to: 1, label: { es: 'confirmación de pago', en: 'payment confirmation' } },
    },
    tools: {
      hardware: [],
      software: ['React', 'Vite', 'Zustand', 'Express', 'JWT', 'Transbank Webpay', 'Mercado Pago', 'Flow', 'Playwright', 'Vitest'],
    },
  },
  {
    slug: 'tes-bateria-arena',
    title: {
      es: 'Simulación 3D y Optimización de un Almacenamiento Térmico en Batería de Arena',
      en: '3D Simulation and Optimization of a Sand-Battery Thermal Energy Store',
    },
    client: { es: 'Tesis de ingeniería', en: 'Engineering thesis' },
    category: 'instrumentation',
    year: 2025,
    image: '/projects/tes-bateria-arena.jpg',
    resultBadge: { es: 'Calefactores optimizados con QPSO', en: 'Heaters optimized with QPSO' },
    summary: {
      es: 'Modelo numérico en MATLAB de un silo de arena calentado con resistencias eléctricas, para guardar excedentes de energía renovable como calor y decidir dónde ubicar los calefactores.',
      en: 'MATLAB numerical model of a sand silo heated with electrical resistances, to store surplus renewable energy as heat and decide where to place the heaters.',
    },
    stack: ['MATLAB', { es: 'Diferencias finitas 3D', en: '3D finite differences' }, 'QPSO', { es: 'Medio poroso', en: 'Porous medium' }],
    challenge: {
      es: 'Las energías renovables generan excedentes que no coinciden con la demanda. Una batería de arena los guarda como calor, pero su rendimiento depende de cómo se reparte la temperatura dentro del silo, y probar cada disposición de calefactores en físico sería lento y caro.',
      en: 'Renewable sources produce surpluses that do not match demand. A sand battery stores them as heat, but its performance depends on how temperature spreads inside the silo, and testing every heater layout physically would be slow and expensive.',
    },
    impact: {
      es: 'Una mala disposición deja zonas frías y sobrecalienta otras, desperdiciando la energía almacenada. Simular antes de construir permite comparar geometrías y reducir el prototipado físico.',
      en: 'A poor layout leaves cold zones and overheats others, wasting the stored energy. Simulating before building makes it possible to compare geometries and cut down physical prototyping.',
    },
    solution: {
      es: 'Se construyó en MATLAB un simulador modular: parámetros físicos, geometría 3D del silo, calefactores, conductividad térmica variable y un solver de diferencias finitas 3D, con visualización y animación de resultados. Sobre ese modelo se corrió una optimización QPSO (enjambre de partículas cuánticas) para buscar la disposición de los calefactores, se compararon patrones geométricos (espiral, hexagonal, radial, fractal) y se simuló el flujo de partículas al llenar el silo.',
      en: 'A modular simulator was built in MATLAB: physical parameters, 3D silo geometry, heaters, variable thermal conductivity and a 3D finite-difference solver, with result visualization and animation. On top of that model a QPSO (quantum-behaved particle swarm) optimization searched for the heater layout, geometric patterns (spiral, hexagonal, radial, fractal) were compared, and particle flow while filling the silo was simulated.',
    },
    metrics: [
      { label: { es: 'Malla de simulación', en: 'Simulation grid' }, value: '3D' },
      { label: { es: 'Método numérico', en: 'Numerical method' }, value: { es: 'MDF', en: 'FDM' } },
      { label: { es: 'Optimizador', en: 'Optimizer' }, value: 'QPSO' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Parámetros', en: 'Parameters' }, sub: { es: 'arena · silo', en: 'sand · silo' } },
        { label: { es: 'Calefactores', en: 'Heaters' }, sub: { es: 'disposición 3D', en: '3D layout' } },
        { label: 'Solver 3D', sub: { es: 'dif. finitas', en: 'finite diff.' } },
        { label: { es: 'Resultados', en: 'Results' }, sub: { es: 'mapas · animación', en: 'maps · animation' } },
      ],
      feedback: { from: 3, to: 1, label: { es: 'optimización QPSO', en: 'QPSO optimization' } },
    },
    tools: {
      hardware: [],
      software: ['MATLAB', { es: 'Diferencias finitas 3D', en: '3D finite differences' }, 'QPSO'],
    },
  },
  {
    slug: 'deteccion-personas-aforo',
    featured: 5,
    title: {
      es: 'Plataforma de Detección de Personas, Aforo y Alarmas por Visión Artificial',
      en: 'People Detection, Occupancy and Alarm Platform with Computer Vision',
    },
    client: { es: 'Producto propio (I+D)', en: 'Own product (R&D)' },
    category: 'vision',
    year: 2026,
    image: '/projects/deteccion-personas-aforo.jpg',
    resultBadge: { es: 'El video se procesa en el sitio', en: 'Video is processed on-site' },
    summary: {
      es: 'Cuenta personas que cruzan líneas virtuales, vigila zonas prohibidas con alarma y foto de evidencia, y entrega telemetría en Excel y CSV desde cámaras USB o RTSP.',
      en: 'Counts people crossing virtual lines, watches restricted zones with an alarm and photo evidence, and delivers telemetry in Excel and CSV from USB or RTSP cameras.',
    },
    stack: ['Python', 'FastAPI', 'YOLO (Ultralytics)', 'OpenCV'],
    challenge: {
      es: 'Comercios y recintos necesitan saber cuánta gente entra y sale, y alertar cuando alguien invade una zona restringida, sin depender de internet ni enviar video a terceros.',
      en: 'Shops and venues need to know how many people come and go, and to alert when someone enters a restricted zone, without depending on the internet or sending video to third parties.',
    },
    impact: {
      es: 'Un sistema que manda video a la nube es un problema de privacidad y de costo, y uno que se cae sin internet no sirve para seguridad. Debía contar y alarmar en el propio sitio y, aun así, poder facturarse por cámara.',
      en: 'A system that ships video to the cloud is a privacy and cost problem, and one that fails without internet is useless for security. It had to count and alarm on-site and still be billable per camera.',
    },
    solution: {
      es: 'Aplicación local con FastAPI y detección YOLO con aceleración por GPU NVIDIA: líneas de conteo direccional y zonas prohibidas calibrables con clics (se reescalan solas si la cámara cambia de resolución), alarma sonora con foto de evidencia, panel en vivo y telemetría por hora exportable a Excel y CSV. Las credenciales de cámara van cifradas en la base de datos, la contraseña de administrador se genera en el primer arranque y los eventos se purgan a los 90 días. Un servicio aparte (control plane multi-tenant) lleva cuentas, sitios y facturación por cámara activa con Stripe, y recibe solo un latido con el número de cámaras, nunca video.',
      en: 'Local application with FastAPI and YOLO detection accelerated on NVIDIA GPUs: directional counting lines and restricted zones calibrated by clicking (they rescale automatically if the camera changes resolution), audible alarm with photo evidence, a live dashboard and hourly telemetry exportable to Excel and CSV. Camera credentials are encrypted in the database, the admin password is generated on first start and events are purged after 90 days. A separate multi-tenant control-plane service handles accounts, sites and per-active-camera billing with Stripe, and receives only a heartbeat with the camera count, never video.',
    },
    metrics: [
      { label: { es: 'Video enviado a la nube', en: 'Video sent to the cloud' }, value: '0' },
      { label: { es: 'Retención de evidencia', en: 'Evidence retention' }, value: { es: '90 días', en: '90 days' } },
      { label: { es: 'Funciones de prueba (2 servicios)', en: 'Test functions (2 services)' }, value: '31' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Cámaras', en: 'Cameras' }, sub: 'USB · RTSP' },
        { label: 'YOLO', sub: { es: 'detección', en: 'detection' } },
        { label: { es: 'Líneas y zonas', en: 'Lines and zones' }, sub: { es: 'aforo · alarma', en: 'count · alarm' } },
        { label: { es: 'Telemetría', en: 'Telemetry' }, sub: 'Excel · CSV' },
        { label: 'Control plane', sub: { es: 'latido · Stripe', en: 'heartbeat · Stripe' } },
      ],
    },
    tools: {
      hardware: [{ es: 'GPU NVIDIA', en: 'NVIDIA GPU' }, { es: 'Cámaras USB / RTSP', en: 'USB / RTSP cameras' }],
      software: ['Python', 'FastAPI', 'Ultralytics YOLO', 'OpenCV', 'openpyxl', 'Stripe'],
    },
  },
  {
    slug: 'visual-auto-trigger',
    title: {
      es: 'Visual Auto Trigger: Automatización de Escritorio por Visión de Pantalla y OCR',
      en: 'Visual Auto Trigger: Desktop Automation by Screen Vision and OCR',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'vision',
    year: 2026,
    image: '/projects/visual-auto-trigger.jpg',
    resultBadge: { es: 'Reglas IF / ELSE con OCR y macros', en: 'IF / ELSE rules with OCR and macros' },
    summary: {
      es: 'Vigila la pantalla y, cuando aparece una imagen o un texto, ejecuta una secuencia de clics y teclas: permite dejar tareas largas corriendo sin supervisión.',
      en: 'Watches the screen and, when an image or a piece of text appears, runs a sequence of clicks and keystrokes so long tasks can run unattended.',
    },
    stack: ['Python', 'PyQt6', 'OpenCV', { es: 'OCR de Windows', en: 'Windows OCR' }],
    challenge: {
      es: 'Instaladores y agentes de terminal se quedan esperando a que alguien pulse «Continuar» o responda «y/n», y obligan a estar frente al computador.',
      en: 'Installers and terminal agents sit waiting for someone to press “Continue” or answer “y/n”, forcing you to stay at the computer.',
    },
    impact: {
      es: 'Cada espera sin atender detiene un proceso largo; vigilar la pantalla a mano es tiempo perdido y propenso a olvidos.',
      en: 'Every unattended prompt stalls a long process; watching the screen by hand wastes time and is easy to forget.',
    },
    solution: {
      es: 'Aplicación de escritorio en PyQt6 que captura la pantalla (mss) y busca imágenes con OpenCV. La versión 2 suma OCR nativo de Windows para buscar una frase en vez de recortar un botón, reglas múltiples IF / ELSE IF con condiciones AND / OR, secuencias de clics, teclas, atajos y pausas, una grabadora de macros (F9 para terminar), alertas sonoras, notificaciones toast de Windows y una parada de emergencia con ESC.',
      en: 'PyQt6 desktop app that captures the screen (mss) and searches for images with OpenCV. Version 2 adds native Windows OCR to search for a phrase instead of cropping a button, multiple IF / ELSE IF rules with AND / OR conditions, sequences of clicks, keys, shortcuts and pauses, a macro recorder (F9 to finish), sound alerts, Windows toast notifications and an ESC emergency stop.',
    },
    metrics: [
      { label: { es: 'Versiones', en: 'Versions' }, value: '2' },
      { label: { es: 'Condiciones combinables', en: 'Combinable conditions' }, value: 'AND / OR' },
      { label: { es: 'Parada de emergencia', en: 'Emergency stop' }, value: 'ESC' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Pantalla', en: 'Screen' }, sub: { es: 'captura mss', en: 'mss capture' } },
        { label: { es: 'Condiciones', en: 'Conditions' }, sub: { es: 'imagen · OCR', en: 'image · OCR' } },
        { label: { es: 'Reglas', en: 'Rules' }, sub: 'IF / ELSE IF' },
        { label: { es: 'Acciones', en: 'Actions' }, sub: { es: 'clic · teclas · alerta', en: 'click · keys · alert' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'sigue vigilando', en: 'keeps watching' } },
    },
    tools: {
      hardware: [],
      software: ['Python', 'PyQt6', 'OpenCV', 'mss', 'pyautogui', 'winocr'],
    },
  },
  {
    slug: 'axiom-2',
    featured: 6,
    title: {
      es: 'AXIOM 2: Asistente de Escritorio por Voz con Cerebro Local, Gemini o Claude',
      en: 'AXIOM 2: Voice Desktop Assistant with a Local, Gemini or Claude Brain',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'ai',
    year: 2026,
    image: '/projects/axiom-2.jpg',
    resultBadge: { es: '3 cerebros intercambiables', en: '3 swappable brains' },
    summary: {
      es: 'Se activa con dos palmadas, transcribe en GPU y responde con voz y un orbe animado; controla Windows, archivos, navegador y ComfyUI, y pide confirmación en las acciones riesgosas.',
      en: 'Wakes with a double clap, transcribes on the GPU and answers with voice and an animated orb; it controls Windows, files, browser and ComfyUI, and asks for confirmation on risky actions.',
    },
    stack: ['Python', 'Qwen (llama.cpp)', 'Gemini', 'Claude'],
    challenge: {
      es: 'Un asistente de escritorio con micrófono abierto y acceso al sistema no puede depender de un solo proveedor, y no debe ejecutar nada riesgoso sin que el usuario lo autorice.',
      en: 'A desktop assistant with an open microphone and system access cannot depend on a single provider, and must not run anything risky without the user’s approval.',
    },
    impact: {
      es: 'Un asistente que borra archivos, envía correos o hace clics por su cuenta es un riesgo; uno que solo funciona con nube se cae cuando falla el servicio o se agota la cuota. Debía ser seguro por diseño y tener un modo local.',
      en: 'An assistant that deletes files, sends email or clicks on its own is a risk; one that only works with the cloud fails when the service goes down or the quota runs out. It had to be safe by design and offer a local mode.',
    },
    solution: {
      es: 'Aplicación para Windows con activación por doble palmada, transcripción en GPU, panel de chat y un orbe de 600 partículas que muestra el estado (escuchando, pensando, hablando, esperando confirmación). Tres cerebros intercambiables, incluso por voz: Qwen local con llama.cpp, Gemini y Claude. Herramientas para Windows, archivos, web, Chrome, visión de pantalla, correo, GitHub, notas de Obsidian y generación de imágenes en ComfyUI, ampliables con plugins, habilidades y servidores MCP. Un «centinela» configurable pide confirmación antes de borrar, escribir, hacer clics, enviar correo o navegar, con tres modos de permisos: Consulta, Automático y Restringido.',
      en: 'Windows application with double-clap activation, GPU transcription, a chat panel and a 600-particle orb that shows its state (listening, thinking, speaking, awaiting confirmation). Three swappable brains, even by voice: local Qwen with llama.cpp, Gemini and Claude. Tools for Windows, files, the web, Chrome, screen vision, email, GitHub, Obsidian notes and image generation in ComfyUI, extendable with plugins, skills and MCP servers. A configurable “sentinel” asks for confirmation before deleting, writing, clicking, sending email or browsing, with three permission modes: Ask, Automatic and Restricted.',
    },
    metrics: [
      { label: { es: 'Cerebros disponibles', en: 'Available brains' }, value: '3' },
      { label: { es: 'Partículas del orbe', en: 'Orb particles' }, value: '600' },
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '61' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Doble palmada', en: 'Double clap' }, sub: { es: 'activación', en: 'wake' } },
        { label: { es: 'Transcripción', en: 'Transcription' }, sub: 'GPU' },
        { label: { es: 'Cerebro', en: 'Brain' }, sub: { es: 'local · Gemini · Claude', en: 'local · Gemini · Claude' } },
        { label: { es: 'Herramientas', en: 'Tools' }, sub: { es: 'con centinela', en: 'with sentinel' } },
        { label: { es: 'Voz + orbe', en: 'Voice + orb' }, sub: 'TTS' },
      ],
      feedback: { from: 3, to: 2, label: { es: 'resultado de acción', en: 'action result' } },
    },
    tools: {
      hardware: [{ es: 'Micrófono', en: 'Microphone' }, 'GPU'],
      software: ['Python', 'llama.cpp (Qwen)', 'Gemini', 'Claude', 'MCP', 'ComfyUI'],
    },
  },
  {
    slug: 'comfyui-studio',
    title: {
      es: 'Estudio de IA Generativa Local con ComfyUI y Registro Reproducible de Resultados',
      en: 'Local Generative-AI Studio with ComfyUI and Reproducible Result Logging',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'ai',
    year: 2026,
    image: '/projects/comfyui-studio.jpg',
    resultBadge: { es: '44 workflows registrados', en: '44 registered workflows' },
    summary: {
      es: 'Banco de trabajo local para generar imágenes y video con modelos abiertos en una GPU RTX, con cada resultado guardado junto a su seed, modelo, LoRA y licencia.',
      en: 'Local workbench to generate images and video with open models on an RTX GPU, with every result saved alongside its seed, model, LoRA and license.',
    },
    stack: ['ComfyUI', 'Z-Image', 'Qwen-Image', 'Python'],
    challenge: {
      es: 'Generar con modelos locales produce imágenes que luego no se pueden repetir: se pierde qué seed, modelo, LoRA o prompt las originó, y es fácil usar sin darse cuenta un modelo cuya licencia no permite uso comercial.',
      en: 'Generating with local models produces images that cannot be repeated later: the seed, model, LoRA or prompt behind them gets lost, and it is easy to unknowingly use a model whose license forbids commercial use.',
    },
    impact: {
      es: 'Para trabajo con clientes, como fotos de producto con IA, hace falta poder reproducir una imagen y demostrar que se usaron modelos con licencia adecuada.',
      en: 'For client work, such as AI product photography, you must be able to reproduce an image and show that models with a suitable license were used.',
    },
    solution: {
      es: 'Se organizó una bodega con copias de cada workflow en formato UI y un índice, notas de conocimiento sobre modelos y equipo, y un script en Python (registrar.py) que lee el grafo del PNG y guarda modelos, LoRA, muestreo (seed, pasos, CFG, sampler), resolución, prompts, iluminación y licencia en un CSV y en un JSON junto a la imagen. El modo de uso comercial bloquea y no registra resultados con modelos no comerciales (Qwen 2.1 y 4x-UltraSharp). Un agente especializado opera ComfyUI y mantiene el registro.',
      en: 'A workshop was organized with copies of every workflow in UI format and an index, knowledge notes on models and hardware, and a Python script (registrar.py) that reads the PNG graph and stores models, LoRAs, sampling (seed, steps, CFG, sampler), resolution, prompts, lighting and license in a CSV and in a JSON beside the image. Commercial-use mode blocks and does not log results made with non-commercial models (Qwen 2.1 and 4x-UltraSharp). A specialized agent operates ComfyUI and maintains the log.',
    },
    metrics: [
      { label: { es: 'Workflows registrados', en: 'Registered workflows' }, value: '44' },
      { label: { es: 'Control de licencia comercial', en: 'Commercial license check' }, value: { es: 'Automático', en: 'Automatic' } },
      { label: { es: 'Memoria de la GPU', en: 'GPU memory' }, value: '16 GB' },
    ],
    diagram: {
      nodes: [
        { label: 'Workflow', sub: 'ComfyUI' },
        { label: { es: 'Generación', en: 'Generation' }, sub: { es: 'GPU local', en: 'local GPU' } },
        { label: 'registrar.py', sub: { es: 'lee el grafo', en: 'reads the graph' } },
        { label: { es: 'Registro', en: 'Log' }, sub: 'CSV · JSON' },
      ],
      feedback: { from: 3, to: 0, label: { es: 'repetir con la misma seed', en: 'repeat with the same seed' } },
    },
    tools: {
      hardware: [{ es: 'GPU RTX de 16 GB', en: '16 GB RTX GPU' }],
      software: ['ComfyUI', 'Z-Image', 'Qwen-Image 2.1', 'Python'],
    },
  },
  {
    slug: 'beta-actualiza',
    title: {
      es: 'Pipeline de Producción de un Canal Educativo de YouTube con IA y Remotion',
      en: 'AI and Remotion Production Pipeline for an Educational YouTube Channel',
    },
    client: 'Beta Actualiza',
    category: 'ai',
    year: 2026,
    image: '/projects/beta-actualiza.jpg',
    resultBadge: { es: '22 videos producidos', en: '22 videos produced' },
    summary: {
      es: 'Canal de ciencia para audiencia de 7 a 15 años guiado por Beta, un robot que aprende del mundo: guion, imágenes con IA, voz, animación y clips verticales salen de un flujo repetible.',
      en: 'Science channel for a 7-to-15 audience guided by Beta, a robot that learns about the world: script, AI images, voice, animation and vertical clips come out of a repeatable workflow.',
    },
    stack: ['Remotion', 'ComfyUI', 'ffmpeg', 'Chatterbox'],
    challenge: {
      es: 'Un video de ciencia con buen ritmo visual pide decenas de imágenes y mucha GPU: en el video S10, 69 imágenes tomaron cerca de 30 minutos de GPU, además de la voz y el render.',
      en: 'A science video with good visual pacing needs dozens of images and a lot of GPU time: in video S10, 69 images took about 30 minutes of GPU, on top of voice and render.',
    },
    impact: {
      es: 'Sin un flujo repetible cada video cuesta horas, se repiten temas y se cuelan datos sin verificar. Para una audiencia de 7 a 15 años, además, cada video debe pasar reglas de contenido para público general.',
      en: 'Without a repeatable workflow every video costs hours, topics repeat and unverified facts slip in. For a 7-to-15 audience, each video must also pass general-audience content rules.',
    },
    solution: {
      es: 'Flujo con 3 puertas de aprobación: datos con dos fuentes por afirmación, guion con tiempos por frase y lista de imágenes ancladas a la palabra que dice la voz; luego una sola tanda de GPU (imágenes con Z-Image, voz local con Chatterbox), escenas en Remotion con Beta en 3D, diagramas y montaje de fondos, mezcla de audio a −14 LUFS, render 1080p y cortes verticales 9:16. Sostener cada fondo 4–7 s en lugar de ~1,5 s redujo las imágenes de fondo de 58 a 21 en un video, y el ritmo rápido pasó a venir de la edición y la voz. Cada video cierra con MP4, SRT, clips verticales, miniatura y descripción con fuentes, y un script revisa que el tema no se repita.',
      en: 'Workflow with 3 approval gates: facts with two sources per claim, a script with per-sentence timing and a list of images anchored to the word the voice says; then a single GPU batch (images with Z-Image, local voice with Chatterbox), Remotion scenes with a 3D Beta, diagrams and background montages, audio mixed to −14 LUFS, 1080p render and 9:16 vertical cuts. Holding each background for 4–7 s instead of ~1.5 s cut the background images from 58 to 21 in one video, with the fast pace coming from editing and voice. Every video ships with MP4, SRT, vertical clips, thumbnail and a description with sources, and a script checks that the topic is not repeated.',
    },
    metrics: [
      { label: { es: 'Videos producidos', en: 'Videos produced' }, value: '22' },
      { label: { es: 'Imágenes de fondo por video (S10)', en: 'Background images per video (S10)' }, value: '-64%' },
      { label: { es: 'Puertas de aprobación', en: 'Approval gates' }, value: '3' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Guion', en: 'Script' }, sub: { es: 'datos · 2 fuentes', en: 'facts · 2 sources' } },
        { label: { es: 'Imágenes + voz', en: 'Images + voice' }, sub: { es: 'GPU local', en: 'local GPU' } },
        { label: 'Remotion', sub: { es: 'Beta 3D · diagramas', en: '3D Beta · diagrams' } },
        { label: { es: 'Entregables', en: 'Deliverables' }, sub: { es: 'MP4 · clips 9:16', en: 'MP4 · 9:16 clips' } },
      ],
    },
    tools: {
      hardware: [{ es: 'GPU RTX', en: 'RTX GPU' }],
      software: ['Remotion', 'ComfyUI', 'Z-Image', 'Chatterbox', 'ffmpeg', 'Python'],
    },
  },
  {
    slug: 'esp32-alarma-mp3',
    title: {
      es: 'Central de Alarma con ESP32, Panel Web y Avisos de Voz MP3',
      en: 'ESP32 Alarm Panel with Web Dashboard and MP3 Voice Alerts',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'embedded',
    year: 2026,
    image: '/projects/esp32-alarma-mp3.jpg',
    resultBadge: { es: 'WiFi dual: opera sin el router', en: 'Dual WiFi: works without the router' },
    summary: {
      es: 'Firmware para ESP32 que lee 4 zonas de sensores RF/PIR y un botón de pánico, anuncia el estado con un DFPlayer Mini y se controla desde un panel web en el celular.',
      en: 'ESP32 firmware that reads 4 RF/PIR sensor zones and a panic button, announces status through a DFPlayer Mini and is controlled from a web panel on a phone.',
    },
    stack: ['ESP32', 'C++ (Arduino)', 'DFPlayer Mini', 'PIR / RF'],
    challenge: {
      es: 'Los receptores RF y sensores PIR baratos generan ruido y señales atascadas que disparan falsas alarmas, y una alarma casera que depende del WiFi del router queda inútil cuando este se cae.',
      en: 'Cheap RF receivers and PIR sensors produce noise and stuck signals that trigger false alarms, and a home alarm that depends on the router’s WiFi becomes useless when it goes down.',
    },
    impact: {
      es: 'Una falsa alarma resta credibilidad y una central colgada deja la casa sin protección. Debía filtrar el ruido, avisar de sensores defectuosos y recuperarse sola de un bloqueo.',
      en: 'A false alarm erodes trust and a hung panel leaves the house unprotected. It had to filter noise, flag faulty sensors and recover on its own from a lock-up.',
    },
    solution: {
      es: 'Firmware en C++ con una estructura por entrada que aplica antirrebote de 60 ms y marca como «señal atascada» un sensor activo por más de 2 minutos. Un watchdog de 10 s reinicia la placa si se cuelga, y el WiFi funciona en modo dual: se conecta al router y además emite su propia red privada, de modo que el panel sigue accesible aunque el router caiga, con reconexión automática cada 10 s. El panel web (HTML embebido y API JSON) arma, desarma y activa el pánico, y muestra zonas, memoria libre y tiempo encendido; un interruptor físico de palanca arma y desarma por flancos, y el DFPlayer Mini reproduce los avisos de activada, desactivada y pánico.',
      en: 'C++ firmware with a per-input structure that applies 60 ms debounce and flags a sensor active for more than 2 minutes as “stuck signal”. A 10 s watchdog resets the board if it hangs, and WiFi runs in dual mode: it joins the router and also broadcasts its own private network, so the panel stays reachable even if the router goes down, with automatic reconnection every 10 s. The web panel (embedded HTML and JSON API) arms, disarms and triggers the panic alarm, and shows zones, free memory and uptime; a physical toggle switch arms and disarms on edges, and the DFPlayer Mini plays the armed, disarmed and panic alerts.',
    },
    metrics: [
      { label: { es: 'Zonas PIR + pánico', en: 'PIR zones + panic' }, value: '4 + 1' },
      { label: { es: 'Redes WiFi simultáneas', en: 'Simultaneous WiFi networks' }, value: '2' },
      { label: 'Watchdog', value: '10 s' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Sensores', en: 'Sensors' }, sub: 'RF / PIR' },
        { label: 'ESP32', sub: { es: 'antirrebote · watchdog', en: 'debounce · watchdog' } },
        { label: { es: 'Panel web', en: 'Web panel' }, sub: 'AP + STA' },
      ],
      feedback: { from: 2, to: 1, label: { es: 'armar / desarmar / pánico', en: 'arm / disarm / panic' } },
    },
    tools: {
      hardware: ['ESP32', 'DFPlayer Mini', { es: 'Sensores PIR / RF', en: 'PIR / RF sensors' }, { es: 'Interruptor de palanca', en: 'Toggle switch' }],
      software: ['C++ (Arduino)', 'WebServer', { es: 'API JSON', en: 'JSON API' }],
    },
  },
  {
    slug: 'bodega-contabilidad-farmacia',
    title: {
      es: 'Sistema de Bodega y Contabilidad con Boleta Electrónica para Comercios Chilenos',
      en: 'Inventory and Accounting System with E-Invoicing for Chilean Retailers',
    },
    client: { es: 'Farmacia piloto', en: 'Pilot pharmacy' },
    category: 'web',
    year: 2026,
    image: '/projects/bodega-contabilidad-farmacia.jpg',
    resultBadge: { es: '148 pruebas automáticas en verde', en: '148 automated tests passing' },
    summary: {
      es: 'Caja, inventario con vencimientos, boleta electrónica y panel del dueño para una farmacia, instalable con doble clic en un PC Windows y consultable desde el celular.',
      en: 'Checkout, expiry-aware inventory, e-invoicing and an owner dashboard for a pharmacy, installable with a double click on a Windows PC and reachable from a phone.',
    },
    stack: ['Django 5.2', 'HTMX', 'SQLite', 'OpenFactura'],
    challenge: {
      es: 'Una farmacia de barrio necesita vender con escáner, controlar lotes con fecha de vencimiento y emitir boleta electrónica, pero no tiene equipo de TI: el sistema debe instalarse solo, aguantar cortes de internet y respaldarse sin que nadie lo recuerde.',
      en: 'A neighborhood pharmacy needs to sell with a scanner, track batches with expiry dates and issue electronic receipts, but has no IT staff: the system must install itself, survive internet outages and back itself up without anyone remembering.',
    },
    impact: {
      es: 'Un producto vencido en el mostrador es un riesgo sanitario y legal, una boleta que no sale por falta de internet frena la venta, y sin arqueo de caja las diferencias no se detectan.',
      en: 'An expired product at the counter is a health and legal risk, a receipt that cannot be issued without internet stalls the sale, and without cash reconciliation discrepancies go unnoticed.',
    },
    solution: {
      es: 'Aplicación Django 5.2 con HTMX y SQLite en modo WAL, servida con waitress y empaquetada como Farmacia.exe con instalador INSTALAR.bat. Caja con escáner USB, efectivo, tarjeta y transferencia, vuelto y arqueo por cajera y turno; inventario por lotes con alertas de stock mínimo y vencimiento, compras con IVA e importación de catálogo CSV; boleta electrónica vía OpenFactura que reintenta cada 5 minutos hasta 23 horas si no hay internet y genera la nota de crédito al anular; panel del dueño con IVA, margen y gastos, planillas CSV para el contador, respaldo diario local y en OneDrive, resumen por Telegram y acceso remoto por Tailscale. Existe además una variante multitienda para 14 rubros.',
      en: 'Django 5.2 application with HTMX and SQLite in WAL mode, served with waitress and packaged as Farmacia.exe with an INSTALAR.bat installer. Checkout with USB scanner, cash, card and transfer, change and cash reconciliation per cashier and shift; batch inventory with minimum-stock and expiry alerts, purchases with VAT and CSV catalog import; e-invoicing through OpenFactura that retries every 5 minutes for up to 23 hours without internet and issues the credit note when voiding; owner dashboard with VAT, margin and expenses, CSV spreadsheets for the accountant, daily backup locally and to OneDrive, Telegram summary and remote access through Tailscale. A multi-store variant for 14 retail types also exists.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '148' },
      { label: { es: 'Reintento de boleta sin internet', en: 'Receipt retry without internet' }, value: '23 h' },
      { label: { es: 'Rubros (variante multitienda)', en: 'Retail types (multi-store variant)' }, value: '14' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Caja', en: 'Checkout' }, sub: { es: 'lector USB', en: 'USB scanner' } },
        { label: 'Django + HTMX', sub: { es: 'inventario · lotes', en: 'inventory · batches' } },
        { label: 'OpenFactura', sub: { es: 'boleta electrónica', en: 'e-invoicing' } },
        { label: { es: 'Panel del dueño', en: 'Owner dashboard' }, sub: { es: 'IVA · margen', en: 'VAT · margin' } },
      ],
      feedback: { from: 2, to: 1, label: { es: 'reintento cada 5 min', en: 'retry every 5 min' } },
    },
    tools: {
      hardware: [{ es: 'Lector de códigos USB', en: 'USB barcode scanner' }],
      software: ['Django 5.2', 'HTMX', 'SQLite (WAL)', 'waitress', 'OpenFactura', 'Telegram Bot', 'Tailscale'],
    },
  },
  {
    slug: 'laboratorio-fractales',
    title: {
      es: 'Laboratorio Interactivo de Fractales con WebGL y Canvas 2D',
      en: 'Interactive Fractal Lab with WebGL and Canvas 2D',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'web',
    year: 2026,
    image: '/projects/laboratorio-fractales.jpg',
    demo: { src: '/fractal-lab/index.html' },
    resultBadge: { es: '15 sistemas fractales en un solo archivo', en: '15 fractal systems in a single file' },
    summary: {
      es: 'Explorador en el navegador de 15 sistemas fractales con ecuación en vivo, 8 paletas, 12 semillas famosas, zoom y modo evolución; no hay nada que instalar.',
      en: 'Browser-based explorer of 15 fractal systems with a live equation, 8 palettes, 12 famous seeds, zoom and an evolution mode; nothing to install.',
    },
    stack: ['WebGL (GLSL)', 'Canvas 2D', 'JavaScript', 'Tailwind CSS'],
    challenge: {
      es: 'Dibujar en tiempo real conjuntos que exigen cientos de iteraciones por píxel y, a la vez, reunir sistemas de naturaleza muy distinta (plano complejo, atractores caóticos, curvas recursivas y sistemas de funciones iteradas) bajo una sola interfaz de parámetros y color.',
      en: 'Drawing in real time sets that need hundreds of iterations per pixel while bringing very different systems (complex plane, chaotic attractors, recursive curves and iterated function systems) under a single parameter and color interface.',
    },
    impact: {
      es: 'Ver cambiar la ecuación y la imagen al mismo tiempo mientras se mueve un parámetro hace tangibles la dinámica compleja y el caos. Todo corre en el navegador, sin instalación.',
      en: 'Watching the equation and the image change together as a parameter moves makes complex dynamics and chaos tangible. Everything runs in the browser, with no installation.',
    },
    solution: {
      es: 'Una sola página HTML. Siete sistemas del plano complejo (Mandelbrot y Multibrot, Julia, Burning Ship, Phoenix, Newton-Raphson, Tricornio y Celtic, y una ecuación híbrida) se calculan como shaders GLSL en la GPU mediante WebGL; los otros ocho (árbol recursivo, atractores de Clifford y de Peter de Jong, copo de Koch/Cesàro, curva del dragón, helecho de Barnsley, Sierpinski y espirales de polígonos) se dibujan en Canvas 2D. Cada sistema declara sus propios parámetros y la interfaz genera a partir de ellos los deslizadores y la ecuación en vivo con los valores actuales. Incluye 8 paletas procedurales con control de frecuencia, fase, brillo y resplandor, 12 semillas famosas, zoom hacia el cursor con la rueda y desplazamiento arrastrando, un modo que mueve la semilla de Julia con el ratón, un modo evolución que oscila los parámetros, mutación aleatoria, captura en PNG y modo inmersivo.',
      en: 'A single HTML page. Seven complex-plane systems (Mandelbrot and Multibrot, Julia, Burning Ship, Phoenix, Newton-Raphson, Tricorn and Celtic, and a hybrid equation) are computed as GLSL shaders on the GPU through WebGL; the other eight (recursive tree, Clifford and Peter de Jong attractors, Koch/Cesàro snowflake, dragon curve, Barnsley fern, Sierpinski and polygon spirals) are drawn on Canvas 2D. Each system declares its own parameters and the interface builds the sliders and the live equation, with the current values, from them. It includes 8 procedural palettes with frequency, phase, brightness and glow controls, 12 famous seeds, wheel zoom toward the cursor and drag to pan, a mode that moves the Julia seed with the mouse, an evolution mode that oscillates the parameters, random mutation, PNG capture and an immersive mode.',
    },
    metrics: [
      { label: { es: 'Sistemas fractales', en: 'Fractal systems' }, value: '15' },
      { label: { es: 'Paletas procedurales', en: 'Procedural palettes' }, value: '8' },
      { label: { es: 'Semillas famosas', en: 'Famous seeds' }, value: '12' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Parámetros', en: 'Parameters' }, sub: { es: 'deslizadores · ratón', en: 'sliders · mouse' } },
        { label: 'WebGL / Canvas 2D', sub: { es: '7 shaders · 8 en 2D', en: '7 shaders · 8 in 2D' } },
        { label: { es: 'Paleta', en: 'Palette' }, sub: { es: '8 procedurales', en: '8 procedural' } },
        { label: { es: 'Lienzo', en: 'Canvas' }, sub: { es: 'ecuación en vivo', en: 'live equation' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'zoom · arrastre', en: 'zoom · drag' } },
    },
    tools: {
      hardware: [],
      software: ['WebGL', 'GLSL', 'Canvas 2D', 'JavaScript', 'Tailwind CSS', 'Lucide Icons'],
    },
  },
  {
    slug: 'linea-envasado-grafcet',
    title: {
      es: 'Simulador de línea de envasado con lógica GRAFCET y enclavamientos de seguridad',
      en: 'Packaging Line Simulator with GRAFCET Logic and Safety Interlocks',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/linea-envasado-grafcet.jpg',
    demo: { src: '/demos/linea-envasado-grafcet/index.html' },
    resultBadge: { es: '1,2 M de ciclos verificados sin romper un enclavamiento', en: '1.2 M scan cycles verified with no interlock broken' },
    summary: {
      es: 'Línea de envasado modelada como un GRAFCET de 11 pasos y ejecutada en ciclos de scan de 100 ms, con paro de emergencia, falla con rearme manual y vigilancia de tiempo.',
      en: 'Packaging line modeled as an 11-step GRAFCET and run in 100 ms scan cycles, with emergency stop, fault state with manual reset and a time watchdog.',
    },
    stack: ['GRAFCET / SFC', { es: 'Ciclo de scan de PLC', en: 'PLC scan cycle' }, 'JavaScript', 'node:test'],
    challenge: {
      es: 'Una secuencia de envasado debe arrancar solo en condiciones seguras, detenerse de inmediato ante una falla y no volver a marchar sola: cada una de esas reglas es fácil de enunciar y fácil de romper en un caso límite.',
      en: 'A packaging sequence must start only under safe conditions, stop immediately on a fault and never restart by itself: each of those rules is easy to state and easy to break in an edge case.',
    },
    impact: {
      es: 'Un rearranque automático tras un paro de emergencia, o una cinta que avanza mientras la válvula llena, son errores que en planta lastiman personas o producto; por eso las reglas se verifican de forma sistemática y no solo a mano.',
      en: 'An automatic restart after an emergency stop, or a belt moving while the valve fills, are the mistakes that hurt people or product on a plant floor; that is why the rules are verified systematically, not only by hand.',
    },
    solution: {
      es: 'La lógica se escribió como un GRAFCET de 11 pasos (reposo, preparación, avance y llenado, avance y tapado, avance e inspección, salida, rechazo y falla) ejecutado en ciclos de scan de 100 ms, con transiciones de máxima prioridad hacia FALLA ante paro de emergencia, resguardo abierto, aire bajo o atasco, vigilancia de tiempo en cada avance y rearme manual obligatorio. Una planta mínima (envase, cinta y cinco estaciones) cierra el lazo con sensores. Las propiedades de seguridad (la cinta nunca avanza mientras se llena, se tapa o se rechaza; de FALLA solo se sale a REPOSO; no se arranca con una condición insegura) se comprueban en 200 corridas aleatorias de 10 minutos, 1,2 millones de ciclos de scan en total. La demo muestra el GRAFCET activo, las entradas y salidas del PLC y un registro de eventos, e inyecta fallas en vivo.',
      en: 'The logic was written as an 11-step GRAFCET (idle, preparation, advance and fill, advance and cap, advance and inspect, exit, reject and fault) run in 100 ms scan cycles, with top-priority transitions to FAULT on emergency stop, open guard, low air or jam, a time watchdog on every advance and a mandatory manual reset. A minimal plant (container, belt and five stations) closes the loop through sensors. The safety properties (the belt never moves while filling, capping or rejecting; FAULT can only be left toward IDLE; no start under an unsafe condition) are checked in 200 random 10-minute runs, 1.2 million scan cycles in total. The demo shows the active GRAFCET, the PLC inputs and outputs and an event log, and injects faults live.',
    },
    metrics: [
      { label: { es: 'Ciclos de scan verificados', en: 'Scan cycles verified' }, value: { es: '1,2 M', en: '1.2 M' } },
      { label: { es: 'Pasos del GRAFCET', en: 'GRAFCET steps' }, value: '11' },
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '15' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Botonera y sensores', en: 'Controls and sensors' }, sub: { es: '13 entradas', en: '13 inputs' } },
        { label: 'GRAFCET', sub: { es: '11 pasos · scan 100 ms', en: '11 steps · 100 ms scan' } },
        { label: { es: 'Salidas', en: 'Outputs' }, sub: { es: 'cinta · válvula · baliza', en: 'belt · valve · beacon' } },
        { label: { es: 'Planta simulada', en: 'Simulated plant' }, sub: { es: 'envase · 5 estaciones', en: 'container · 5 stations' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'sensores', en: 'sensors' } },
    },
    tools: { hardware: [], software: ['GRAFCET', { es: 'Lógica de PLC (ciclo de scan)', en: 'PLC logic (scan cycle)' }, 'JavaScript', 'node:test'] },
  },
  {
    slug: 'pid-pasteurizador',
    featured: 4,
    title: {
      es: 'Sintonía de un lazo PID de temperatura con anti-windup, simulado sobre un pasteurizador',
      en: 'PID Temperature Loop Tuning with Anti-Windup, Simulated on a Pasteurizer',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'instrumentation',
    year: 2026,
    image: '/projects/pid-pasteurizador.jpg',
    demo: { src: '/demos/pid-pasteurizador/index.html' },
    resultBadge: { es: 'Anti-windup: asentamiento de 836 s a 199 s', en: 'Anti-windup: settling from 836 s to 199 s' },
    summary: {
      es: 'Simulador interactivo que compara cuatro métodos de sintonía (Ziegler-Nichols PI y PID, Cohen-Coon y lambda) sobre una planta de primer orden con tiempo muerto, con error de modelo, ruido y saturación del actuador.',
      en: 'Interactive simulator that compares four tuning methods (Ziegler-Nichols PI and PID, Cohen-Coon and lambda) on a first-order-plus-dead-time plant, with model error, noise and actuator saturation.',
    },
    stack: [{ es: 'PID discreto', en: 'Discrete PID' }, 'FOPDT', 'Anti-windup', 'JavaScript'],
    challenge: {
      es: 'Las reglas clásicas de sintonía funcionan sobre el modelo con que se calcularon y se degradan cuando la planta real es más lenta o tiene más ganancia; además, un actuador que satura hace que la integral se acumule (windup) y el lazo se pase de largo.',
      en: 'Classic tuning rules work on the model they were computed from and degrade when the real plant is slower or has more gain; on top of that, a saturating actuator makes the integral accumulate (windup) and the loop overshoots.',
    },
    impact: {
      es: 'En un pasteurizador, pasarse de temperatura daña el producto y quedarse corto obliga a desviarlo: la sintonía y el anti-windup deciden cuánto producto se pierde en cada arranque o cambio de caudal.',
      en: 'In a pasteurizer, overshooting the temperature damages the product and falling short forces a diversion: tuning and anti-windup decide how much product is lost on each start-up or flow change.',
    },
    solution: {
      es: 'Se modeló la planta como primer orden con tiempo muerto (K = 1 °C/%, τ = 90 s, θ = 15 s) y un PID discreto con derivada sobre la medición y anti-windup por retrocálculo; las fórmulas de sintonía se verificaron contra cálculos a mano. Con el modelo exacto, lambda no sobrepasa la consigna (0 % de sobreimpulso frente a 8,5 % de Ziegler-Nichols PI); si la planta real tiene θ +50 % y K +30 %, Ziegler-Nichols y Cohen-Coon no se asientan en 900 s y lambda sí (172 s). En un escalón de 40 a 110 °C que satura la válvula, el anti-windup baja el sobreimpulso de 14,2 % a 0 % y el asentamiento de 836 s a 199 s. La demo permite mover el modelo, el error de modelo, el ruido y el límite del actuador, y compara las cuatro sintonías con IAE e ITAE.',
      en: 'The plant was modeled as first order plus dead time (K = 1 °C/%, τ = 90 s, θ = 15 s) with a discrete PID using derivative on measurement and back-calculation anti-windup; the tuning formulas were checked against hand calculations. With the exact model, lambda never overshoots the setpoint (0 % overshoot versus 8.5 % for Ziegler-Nichols PI); if the real plant has θ +50 % and K +30 %, Ziegler-Nichols and Cohen-Coon fail to settle within 900 s while lambda does (172 s). On a 40 to 110 °C step that saturates the valve, anti-windup cuts overshoot from 14.2 % to 0 % and settling from 836 s to 199 s. The demo lets you move the model, the model error, the noise and the actuator limit, and compares the four tunings with IAE and ITAE.',
    },
    metrics: [
      { label: { es: 'Asentamiento con anti-windup', en: 'Settling with anti-windup' }, value: '199 s vs 836 s' },
      { label: { es: 'Sobreimpulso lambda vs ZN-PI', en: 'Overshoot lambda vs ZN-PI' }, value: { es: '0 % vs 8,5 %', en: '0 % vs 8.5 %' } },
      { label: { es: 'Sintonías estables con error de modelo', en: 'Tunings stable under model error' }, value: { es: '1 de 4', en: '1 of 4' } },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Modelo FOPDT', en: 'FOPDT model' }, sub: 'K · τ · θ' },
        { label: { es: 'Sintonía', en: 'Tuning' }, sub: { es: '4 métodos', en: '4 methods' } },
        { label: 'PID', sub: 'anti-windup' },
        { label: { es: 'Planta simulada', en: 'Simulated plant' }, sub: { es: 'error de modelo · ruido', en: 'model error · noise' } },
      ],
      feedback: { from: 3, to: 2, label: { es: 'medición', en: 'measurement' } },
    },
    tools: { hardware: [], software: ['PID', 'Ziegler-Nichols', 'Cohen-Coon', 'Lambda (IMC)', 'JavaScript', 'node:test'] },
  },
  {
    slug: 'alarmas-isa182',
    title: {
      es: 'Gestión de alarmas ISA-18.2 en un control de nivel de dos tanques',
      en: 'ISA-18.2 Alarm Management on a Two-Tank Level Control',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'instrumentation',
    year: 2026,
    image: '/projects/alarmas-isa182.jpg',
    demo: { src: '/demos/alarmas-isa182/index.html' },
    resultBadge: { es: '−86 % de alarmas en una inundación simulada', en: '−86 % alarms in a simulated alarm flood' },
    summary: {
      es: 'Dos tanques con control de nivel y un sistema de alarmas con retardo, banda muerta, prioridades, supresión por estado, repisado, detección de inundación y KPI, comparado contra umbrales directos.',
      en: 'Two tanks with level control and an alarm system with delay, deadband, priorities, state-based suppression, shelving, flood detection and KPIs, compared against plain thresholds.',
    },
    stack: ['ISA-18.2', { es: 'Control de nivel PI', en: 'PI level control' }, 'JavaScript', 'node:test'],
    challenge: {
      es: 'Un sistema de alarmas con umbrales directos dispara por el ruido del sensor y por cada efecto en cascada de una falla: el operador recibe decenas de avisos y pierde los que importan.',
      en: 'An alarm system with plain thresholds fires on sensor noise and on every cascading effect of a fault: the operator gets dozens of notices and misses the ones that matter.',
    },
    impact: {
      es: 'En una inundación de alarmas el operador deja de leerlas: las guías de gestión (ISA-18.2, EEMUA 191) fijan límites de carga por operador justamente para que las críticas se vean.',
      en: 'In an alarm flood the operator stops reading them: management guidelines (ISA-18.2, EEMUA 191) set per-operator load limits precisely so that critical alarms stay visible.',
    },
    solution: {
      es: 'Se construyó el proceso (dos tanques, bomba, válvula, PI de nivel y ruido de sensor) y un motor de alarmas con estados (normal, activa sin reconocer, reconocida, normalizada sin reconocer, repisada, suprimida), retardo y banda muerta por alarma, prioridades por consecuencia, supresión en modo parada, detección de inundación (más de 10 alarmas en 10 minutos) y KPI (promedio por 10 minutos, pico, tiempo en inundación, mayores generadoras). Seis escenarios de 60 minutos se corren con y sin gestión: con el nivel pegado al umbral bajo, la gestión pasa de 396 alarmas a 0; en una inundación (bomba fallada, válvula atascada, demanda alta y sensor ruidoso) pasa de 50 a 7 alarmas, de 2 episodios de inundación a ninguno y de 40 % del tiempo en inundación a 0 %. La demo permite reconocer, repisar y comparar en vivo.',
      en: 'The process (two tanks, pump, valve, PI level control and sensor noise) and an alarm engine were built with states (normal, active unacknowledged, acknowledged, returned unacknowledged, shelved, suppressed), per-alarm delay and deadband, consequence-based priorities, suppression in shutdown mode, flood detection (more than 10 alarms in 10 minutes) and KPIs (average per 10 minutes, peak, time in flood, worst offenders). Six 60-minute scenarios run with and without management: with the level sitting at the low threshold, management goes from 396 alarms to 0; in a flood (failed pump, stuck valve, high demand and noisy sensor) it goes from 50 to 7 alarms, from 2 flood episodes to none and from 40 % of time in flood to 0 %. The demo lets you acknowledge, shelve and compare live.',
    },
    metrics: [
      { label: { es: 'Alarmas con el nivel pegado al umbral', en: 'Alarms with level at the threshold' }, value: '396 → 0' },
      { label: { es: 'Alarmas en una inundación', en: 'Alarms in a flood' }, value: '−86 %' },
      { label: { es: 'Tiempo en inundación', en: 'Time in flood' }, value: '40 % → 0 %' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Proceso', en: 'Process' }, sub: { es: '2 tanques · PI de nivel', en: '2 tanks · PI level' } },
        { label: { es: 'Motor de alarmas', en: 'Alarm engine' }, sub: { es: 'retardo · banda muerta', en: 'delay · deadband' } },
        { label: { es: 'Operador', en: 'Operator' }, sub: { es: 'reconocer · repisar', en: 'acknowledge · shelve' } },
        { label: 'KPI', sub: { es: 'inundación · top 5', en: 'flood · top 5' } },
      ],
      feedback: { from: 2, to: 1, label: { es: 'reconocimiento', en: 'acknowledgement' } },
    },
    tools: { hardware: [], software: ['ISA-18.2', 'EEMUA 191 (referencia)', 'JavaScript', 'node:test'] },
  },
  {
    slug: 'oee-modbus',
    title: {
      es: 'OEE y análisis de paros con datos leídos por Modbus TCP de un PLC simulado',
      en: 'OEE and Downtime Analysis from Data Read over Modbus TCP from a Simulated PLC',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/oee-modbus.jpg',
    demo: { src: '/demos/oee-modbus/index.html' },
    resultBadge: { es: '17.286 lecturas Modbus TCP sin errores', en: '17,286 Modbus TCP transactions, no errors' },
    summary: {
      es: 'Un servidor Modbus TCP escrito desde cero simula el PLC de una línea de envasado; un recolector lo sondea y guarda en SQLite, y un tablero muestra OEE por turno, línea de tiempo, Pareto de paros, MTBF y MTTR.',
      en: 'A Modbus TCP server written from scratch simulates a packaging-line PLC; a collector polls it and stores to SQLite, and a dashboard shows OEE per shift, timeline, downtime Pareto, MTBF and MTTR.',
    },
    stack: ['Modbus TCP', 'Python', 'SQLite', 'OEE'],
    challenge: {
      es: 'Calcular un OEE confiable exige leer contadores y estados con un protocolo industrial, separar paros planificados de no planificados y no mezclar el tiempo de descanso con la disponibilidad.',
      en: 'A trustworthy OEE requires reading counters and states over an industrial protocol, separating planned from unplanned stops and not mixing break time into availability.',
    },
    impact: {
      es: 'Sin un OEE medido igual en cada turno, las mejoras se discuten por intuición; con un Pareto de paros se ve dónde se pierden los minutos.',
      en: 'Without an OEE measured the same way on every shift, improvements are argued by intuition; with a downtime Pareto you can see where the minutes go.',
    },
    solution: {
      es: 'Se implementó el protocolo Modbus TCP (lectura de registros, escritura simple y múltiple, excepciones y cabecera MBAP) con solo la biblioteca estándar de Python, y un PLC simulado que genera marcha, paros por causa, cambio de formato, CIP, velocidad reducida y rechazos. El recolector lee un bloque de registros cada 10 s simulados y guarda el turno en SQLite; el cálculo (Disponibilidad × Rendimiento × Calidad, con los descansos fuera del tiempo planificado) se verificó contra un caso hecho a mano y contra la identidad OEE = buenos × tiempo de ciclo ideal / tiempo planificado. Se recogieron 3 turnos de 8 horas con 17.286 transacciones Modbus, 0 errores y latencia p95 de 0,09 ms en localhost; el OEE del día simulado fue 59,2 % (turnos entre 55,3 % y 61,2 %). Los datos son sintéticos.',
      en: 'The Modbus TCP protocol (register reads, single and multiple writes, exceptions and the MBAP header) was implemented with only the Python standard library, plus a simulated PLC that generates running, stops by cause, format changeover, CIP, reduced speed and rejects. The collector reads a register block every 10 simulated seconds and stores the shift in SQLite; the calculation (Availability × Performance × Quality, with breaks outside planned time) was checked against a hand-worked case and against the identity OEE = good units × ideal cycle time / planned time. Three 8-hour shifts were collected with 17,286 Modbus transactions, 0 errors and a p95 latency of 0.09 ms on localhost; the simulated day reached 59.2 % OEE (shifts between 55.3 % and 61.2 %). The data is synthetic.',
    },
    metrics: [
      { label: { es: 'Transacciones Modbus', en: 'Modbus transactions' }, value: { es: '17.286', en: '17,286' } },
      { label: { es: 'Errores de protocolo', en: 'Protocol errors' }, value: '0' },
      { label: { es: 'OEE del día (sintético)', en: 'Day OEE (synthetic)' }, value: { es: '59,2 %', en: '59.2 %' } },
    ],
    diagram: {
      nodes: [
        { label: { es: 'PLC simulado', en: 'Simulated PLC' }, sub: { es: 'servidor Modbus', en: 'Modbus server' } },
        { label: 'Modbus TCP', sub: 'FC 03 · 06 · 16' },
        { label: { es: 'Recolector', en: 'Collector' }, sub: 'SQLite' },
        { label: { es: 'Tablero OEE', en: 'OEE dashboard' }, sub: { es: 'Pareto · MTBF · MTTR', en: 'Pareto · MTBF · MTTR' } },
      ],
      feedback: { from: 2, to: 0, label: { es: 'sondeo cada 10 s', en: 'poll every 10 s' } },
    },
    tools: { hardware: [], software: ['Modbus TCP', 'Python', 'SQLite', 'unittest', 'OEE'] },
  },
  {
    slug: 'red-sensores-mqtt',
    title: {
      es: 'Red de sensores con un broker MQTT 3.1.1 escrito desde cero',
      en: 'Sensor Network with an MQTT 3.1.1 Broker Written from Scratch',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'embedded',
    year: 2026,
    image: '/projects/red-sensores-mqtt.jpg',
    demo: { src: '/demos/red-sensores-mqtt/index.html' },
    resultBadge: { es: 'Broker MQTT propio probado con mqtt.js', en: 'Own MQTT broker tested against mqtt.js' },
    summary: {
      es: 'Broker, cliente y nodos tipo ESP32 simulados con QoS 0 y 1, mensajes retenidos, testamento (LWT), keepalive y comodines, más un inspector que muestra los bytes de cada paquete.',
      en: 'Broker, client and simulated ESP32-style nodes with QoS 0 and 1, retained messages, last will (LWT), keepalive and wildcards, plus an inspector that shows the bytes of every packet.',
    },
    stack: ['MQTT 3.1.1', { es: 'QoS 0/1 · LWT', en: 'QoS 0/1 · LWT' }, 'JavaScript', { es: 'mqtt.js (pruebas)', en: 'mqtt.js (tests)' }],
    challenge: {
      es: 'MQTT parece simple hasta que hay que decidir qué pasa con un nodo que se apaga sin avisar, con un mensaje que nadie confirma o con un suscriptor que llega tarde.',
      en: 'MQTT looks simple until you must decide what happens with a node that dies without warning, a message nobody acknowledges or a subscriber that arrives late.',
    },
    impact: {
      es: 'En una planta, un sensor mudo que el tablero sigue mostrando como válido es peor que uno que se declara caído: el testamento retenido y el keepalive resuelven eso.',
      en: 'On a plant floor, a silent sensor that the dashboard still shows as valid is worse than one declared down: the retained last will and the keepalive solve that.',
    },
    solution: {
      es: 'Se escribió la codificación y decodificación de paquetes MQTT 3.1.1, un broker con comodines + y #, mensajes retenidos, testamento, keepalive de 1,5 ×, toma de sesión por ClientId y reenvío de QoS 1, y un cliente con reintentos. Las tramas se comprobaron contra bytes de referencia y el broker sobre TCP real se probó con mqtt.js 5.16.1 (QoS 1, comodines, retenidos, testamento y carga de 100 kB). Con 20 % de pérdida simulada en el enlace, la telemetría con QoS 1 llega al 99,4 % (con 331 reintentos) frente a 79,1 % con QoS 0; un nodo cortado sin DISCONNECT queda offline en unos 15 s con keepalive de 10 s. En localhost el broker TCP movió unos 19.000 mensajes/s en una ráfaga de 20.000 mensajes QoS 0. La demo corre el mismo broker en el navegador con cinco nodos simulados; no hay firmware probado en hardware.',
      en: 'MQTT 3.1.1 packet encoding and decoding was written, along with a broker with + and # wildcards, retained messages, last will, 1.5 × keepalive, session takeover by ClientId and QoS 1 redelivery, and a client with retries. Frames were checked against reference bytes and the broker over real TCP was tested with mqtt.js 5.16.1 (QoS 1, wildcards, retained messages, last will and a 100 kB payload). With 20 % simulated link loss, QoS 1 telemetry arrives at 99.4 % (with 331 retries) versus 79.1 % with QoS 0; a node cut without DISCONNECT goes offline in about 15 s with a 10 s keepalive. On localhost the TCP broker moved about 19,000 messages/s in a burst of 20,000 QoS 0 messages. The demo runs the same broker in the browser with five simulated nodes; there is no firmware tested on hardware.',
    },
    metrics: [
      { label: { es: 'Entrega con 20 % de pérdida (QoS 1 vs 0)', en: 'Delivery at 20 % loss (QoS 1 vs 0)' }, value: { es: '99,4 % vs 79,1 %', en: '99.4 % vs 79.1 %' } },
      { label: { es: 'Broker TCP en localhost', en: 'TCP broker on localhost' }, value: { es: '≈ 19.000 msg/s', en: '≈ 19,000 msg/s' } },
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '21' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Nodos ESP32', en: 'ESP32 nodes' }, sub: { es: '5 simulados', en: '5 simulated' } },
        { label: 'Broker MQTT', sub: 'QoS 0/1 · LWT' },
        { label: { es: 'Tablero', en: 'Dashboard' }, sub: 'planta/#' },
        { label: { es: 'Inspector', en: 'Inspector' }, sub: { es: 'bytes del paquete', en: 'packet bytes' } },
      ],
      feedback: { from: 1, to: 0, label: { es: 'PUBACK · reintentos', en: 'PUBACK · retries' } },
    },
    tools: { hardware: [], software: ['MQTT 3.1.1', 'JavaScript', 'Node.js (net)', 'mqtt.js', 'node:test'] },
  },
  {
    slug: 'scada-web-pasteurizador',
    featured: 3,
    title: {
      es: 'SCADA web de un pasteurizador HTST con roles, alarmas y bitácora de auditoría',
      en: 'Web SCADA for an HTST Pasteurizer with Roles, Alarms and an Audit Trail',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/scada-web-pasteurizador.jpg',
    demo: { src: '/demos/scada-web-pasteurizador/index.html' },
    resultBadge: { es: '3 roles, bitácora encadenada y 15 pruebas', en: '3 roles, chained audit trail and 15 tests' },
    summary: {
      es: 'Sinóptico, lazo de temperatura, válvula de desvío de flujo, alarmas y tendencias, con una bitácora encadenada donde cada acción, permitida o denegada, queda registrada según el rol del usuario.',
      en: 'Mimic, temperature loop, flow diversion valve, alarms and trends, with a chained audit trail where every action, allowed or denied, is recorded according to the user role.',
    },
    stack: ['SCADA web', { es: 'Roles y permisos', en: 'Roles and permissions' }, { es: 'Bitácora encadenada', en: 'Chained audit trail' }, 'JavaScript'],
    challenge: {
      es: 'Un SCADA no es solo pantallas: debe impedir que cualquiera cambie una consigna crítica, dejar rastro de quién hizo qué y no esconder los picos al mostrar tendencias largas.',
      en: 'A SCADA is not just screens: it must stop anyone from changing a critical setpoint, leave a trace of who did what and not hide peaks when showing long trends.',
    },
    impact: {
      es: 'En alimentos, saber quién cambió una consigna y cuándo es parte de la trazabilidad; y la válvula de desvío protege al producto cuando la temperatura o el tiempo de retención no cumplen.',
      en: 'In food processing, knowing who changed a setpoint and when is part of traceability; and the diversion valve protects the product when temperature or hold time are out of spec.',
    },
    solution: {
      es: 'Se modeló un pasteurizador HTST (intercambiador, tubo de retención de 15 s a 72 °C y válvula de desvío de flujo que desvía de inmediato y solo avanza tras 5 s cumpliendo) con un PI de temperatura, cinco alarmas con retardo y reconocimiento, histórico de 2 h con reducción que conserva mínimos y máximos, y reporte de turno. Tres roles (operador, supervisor, ingeniero) con ocho permisos y rangos por rol: toda acción pasa por sesión, permiso y rango, y queda en una bitácora cuyos registros se encadenan con el hash del anterior, de modo que una edición o un borrado se detecta en el registro exacto. 15 pruebas automáticas cubren permisos, rangos, la bitácora, la lógica de la válvula de desvío, la conservación de litros y el histórico. La autenticación de la demo es solo ilustrativa (no hay servidor ni contraseñas).',
      en: 'An HTST pasteurizer was modeled (heat exchanger, 15 s hold tube at 72 °C and a flow diversion valve that diverts immediately and only forwards after 5 s of compliance) with a PI temperature loop, five alarms with delay and acknowledgement, a 2 h history with downsampling that keeps minima and maxima, and a shift report. Three roles (operator, supervisor, engineer) with eight permissions and per-role ranges: every action goes through session, permission and range checks and lands in an audit trail whose records are chained with the hash of the previous one, so an edit or a deletion is detected at the exact record. 15 automated tests cover permissions, ranges, the audit trail, the diversion valve logic, litre conservation and the history. The demo authentication is illustrative only (no server, no passwords).',
    },
    metrics: [
      { label: { es: 'Roles / permisos', en: 'Roles / permissions' }, value: '3 / 8' },
      { label: { es: 'Acciones registradas en la bitácora', en: 'Actions in the audit trail' }, value: { es: 'todas (OK y denegadas)', en: 'all (OK and denied)' } },
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '15' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Proceso HTST', en: 'HTST process' }, sub: { es: '72 °C · 15 s', en: '72 °C · 15 s' } },
        { label: { es: 'Lazo PI + FDV', en: 'PI loop + FDV' }, sub: { es: 'válvula de desvío', en: 'diversion valve' } },
        { label: 'SCADA', sub: { es: 'sinóptico · alarmas', en: 'mimic · alarms' } },
        { label: { es: 'Bitácora', en: 'Audit trail' }, sub: { es: 'hash encadenado', en: 'chained hash' } },
      ],
      feedback: { from: 2, to: 1, label: { es: 'consignas con permiso', en: 'permitted setpoints' } },
    },
    tools: { hardware: [], software: ['SCADA', { es: 'Control de acceso por roles', en: 'Role-based access control' }, 'JavaScript', 'node:test'] },
  },
  {
    slug: 'vibracion-predictivo',
    title: {
      es: 'Mantenimiento predictivo por vibración de un rodamiento: FFT, envolvente y detección de anomalías',
      en: 'Vibration Predictive Maintenance of a Bearing: FFT, Envelope and Anomaly Detection',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'instrumentation',
    year: 2026,
    image: '/projects/vibracion-predictivo.jpg',
    demo: { src: '/demos/vibracion-predictivo/index.html' },
    resultBadge: { es: 'Alerta 28 días antes de la falla (datos sintéticos)', en: 'Alert 28 days before failure (synthetic data)' },
    summary: {
      es: 'Señales sintéticas de un rodamiento 6205 con fallas de pista exterior, pista interior y elemento rodante: espectro, envolvente, frecuencias características y un detector de Mahalanobis con alerta temprana.',
      en: 'Synthetic signals from a 6205 bearing with outer-race, inner-race and rolling-element faults: spectrum, envelope, characteristic frequencies and a Mahalanobis detector with early warning.',
    },
    stack: ['FFT', { es: 'Envolvente (Hilbert)', en: 'Envelope (Hilbert)' }, 'Mahalanobis', 'JavaScript'],
    challenge: {
      es: 'La falla incipiente de un rodamiento no se ve en el valor RMS: se esconde en impactos periódicos pequeños que excitan una resonancia y solo aparecen al demodular la señal.',
      en: 'An incipient bearing fault does not show in the RMS value: it hides in small periodic impacts that excite a resonance and only appear when the signal is demodulated.',
    },
    impact: {
      es: 'Detectar la falla semanas antes permite planificar la parada; detectarla tarde es un paro no planificado.',
      en: 'Detecting the fault weeks ahead lets you plan the shutdown; detecting it late is an unplanned stop.',
    },
    solution: {
      es: 'Se generaron señales con un modelo físico (impactos a BPFO, BPFI o 2·BSF que excitan una resonancia de 3,3 kHz, modulados por la zona de carga o la jaula, con ruido), se calcularon las frecuencias características del 6205 a partir de su geometría y se implementó la FFT, la envolvente por señal analítica, la relación señal/ruido de los picos y un detector de Mahalanobis calibrado con 200 ventanas sanas. Sobre 200 ventanas sanas y 1.500 con falla (3 tipos × 5 severidades), hubo 1 falsa alarma (0,5 %) y detección del 100 % desde severidad 0,3 en los tres tipos, con el tipo de falla identificado correctamente; en una degradación de 60 días la alerta llegó el día 32, con la falla todavía leve, 28 días antes del fallo funcional. Los datos son sintéticos, no mediciones de una máquina.',
      en: 'Signals were generated with a physical model (impacts at BPFO, BPFI or 2·BSF exciting a 3.3 kHz resonance, modulated by the load zone or the cage, plus noise), the 6205 characteristic frequencies were computed from its geometry and the FFT, the analytic-signal envelope, the peak signal-to-noise ratio and a Mahalanobis detector calibrated on 200 healthy windows were implemented. On 200 healthy windows and 1,500 faulty ones (3 types × 5 severities) there was 1 false alarm (0.5 %) and 100 % detection from severity 0.3 for all three types, with the fault type identified correctly; in a 60-day degradation the alert came on day 32, with the fault still mild, 28 days before functional failure. The data is synthetic, not measurements from a machine.',
    },
    metrics: [
      { label: { es: 'Anticipación en la degradación simulada', en: 'Lead time in the simulated degradation' }, value: { es: '28 días', en: '28 days' } },
      { label: { es: 'Falsas alarmas (1 de 200)', en: 'False alarms (1 of 200)' }, value: { es: '0,5 %', en: '0.5 %' } },
      { label: { es: 'Detección con severidad ≥ 0,3', en: 'Detection at severity ≥ 0.3' }, value: '100 %' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Señal sintética', en: 'Synthetic signal' }, sub: { es: 'modelo físico 6205', en: '6205 physical model' } },
        { label: { es: 'FFT + envolvente', en: 'FFT + envelope' }, sub: 'BPFO · BPFI · BSF' },
        { label: { es: 'Características', en: 'Features' }, sub: { es: 'RMS · curtosis · SNR', en: 'RMS · kurtosis · SNR' } },
        { label: { es: 'Detector', en: 'Detector' }, sub: 'Mahalanobis' },
      ],
      feedback: { from: 3, to: 2, label: { es: 'línea base sana', en: 'healthy baseline' } },
    },
    tools: { hardware: [], software: ['FFT', 'Transformada de Hilbert', 'Mahalanobis', 'JavaScript', 'node:test'] },
  },
  {
    slug: 'zonas-riesgo-vision',
    title: {
      es: 'Zonas de riesgo y enclavamiento con visión artificial sobre detecciones simuladas',
      en: 'Risk Zones and Interlocking with Computer Vision over Simulated Detections',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'vision',
    year: 2026,
    image: '/projects/zonas-riesgo-vision.jpg',
    demo: { src: '/demos/zonas-riesgo-vision/index.html' },
    resultBadge: { es: '200/200 cruces detenidos en ≤ 0,27 s (simulado)', en: '200/200 crossings stopped in ≤ 0.27 s (simulated)' },
    summary: {
      es: 'Homografía de píxel a plano, seguimiento de personas, zonas con antirrebote e histéresis, regla de EPP, falla segura por pérdida de visión y paro con rearme manual.',
      en: 'Pixel-to-plane homography, person tracking, zones with debounce and hysteresis, a PPE rule, fail-safe on vision loss and a latched stop with manual reset.',
    },
    stack: [{ es: 'Homografía (DLT)', en: 'Homography (DLT)' }, { es: 'Seguimiento α-β', en: 'α-β tracking' }, { es: 'Zonas de seguridad', en: 'Safety zones' }, 'JavaScript'],
    challenge: {
      es: 'Un detector de personas entrega cajas ruidosas que parpadean, desaparecen y se equivocan: convertirlas en un paro seguro sin disparos falsos exige lógica alrededor del detector.',
      en: 'A person detector delivers noisy boxes that flicker, vanish and get things wrong: turning them into a safe stop without false trips takes logic around the detector.',
    },
    impact: {
      es: 'Un paro tardío expone a la persona; un paro falso detiene la línea y hace que el sistema termine ignorado.',
      en: 'A late stop exposes the person; a false stop halts the line and gets the system ignored.',
    },
    solution: {
      es: 'El módulo convierte puntos de la imagen a metros con una homografía estimada con cuatro marcas, sigue a las personas con un filtro alfa-beta que tolera cuadros perdidos, asigna pertenencia a zonas con antirrebote (3 cuadros para entrar, 8 para salir), exige EPP completo en la zona de empaque (un dato desconocido cuenta como incumplimiento), avisa cuando alguien se dirige a la zona de peligro, para la máquina con enclavamiento y exige rearme manual con la zona libre, y aplica falla segura si la cámara deja de entregar cuadros. Con detecciones simuladas (ruido y 8 % de cuadros perdidos), 200 cruces de la zona de peligro terminaron en paro, con una reacción máxima de 4 cuadros (0,27 s a 15 cuadros/s), y 200 recorridos por el pasillo seguro no produjeron ningún paro falso; junto al borde de la zona, el antirrebote redujo los cambios de estado de 192 a 11 en 40 s. No incluye un detector real (las cajas las genera la simulación) y no sustituye un sistema de seguridad certificado.',
      en: 'The module converts image points to meters with a homography estimated from four marks, tracks people with an alpha-beta filter that tolerates dropped frames, assigns zone membership with debounce (3 frames to enter, 8 to leave), requires full PPE in the packing zone (unknown data counts as non-compliant), warns when someone heads toward the danger zone, stops the machine with an interlock that needs a manual reset with the zone clear, and fails safe if the camera stops delivering frames. With simulated detections (noise and 8 % dropped frames), 200 crossings of the danger zone ended in a stop, with a maximum reaction of 4 frames (0.27 s at 15 frames/s), and 200 walks along the safe aisle produced no false stop; next to the zone border, debounce cut state changes from 192 to 11 in 40 s. It does not include a real detector (the boxes come from the simulation) and it does not replace a certified safety system.',
    },
    metrics: [
      { label: { es: 'Cruces detenidos', en: 'Crossings stopped' }, value: '200 / 200' },
      { label: { es: 'Reacción máxima', en: 'Maximum reaction' }, value: { es: '0,27 s', en: '0.27 s' } },
      { label: { es: 'Paros falsos en el pasillo seguro', en: 'False stops in the safe aisle' }, value: '0 / 200' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Cámara', en: 'Camera' }, sub: { es: 'detecciones simuladas', en: 'simulated detections' } },
        { label: { es: 'Homografía + seguimiento', en: 'Homography + tracking' }, sub: 'm · α-β' },
        { label: { es: 'Zonas y reglas', en: 'Zones and rules' }, sub: { es: 'antirrebote · EPP', en: 'debounce · PPE' } },
        { label: { es: 'Paro enclavado', en: 'Latched stop' }, sub: { es: 'rearme manual', en: 'manual reset' } },
      ],
      feedback: { from: 3, to: 2, label: { es: 'zona libre', en: 'zone clear' } },
    },
    tools: { hardware: [], software: [{ es: 'Homografía', en: 'Homography' }, { es: 'Seguimiento de objetos', en: 'Object tracking' }, 'JavaScript', 'node:test'] },
  },
  {
    slug: 'tablero-electrico',
    title: {
      es: 'Dimensionamiento de un tablero eléctrico: protecciones, cables, lista de materiales y unifilar',
      en: 'Electrical Panel Sizing: Protections, Cables, Bill of Materials and Single-Line Diagram',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/tablero-electrico.jpg',
    demo: { src: '/demos/tablero-electrico/index.html' },
    resultBadge: { es: '7 circuitos dimensionados y 300 casos aleatorios verificados', en: '7 circuits sized and 300 random cases verified' },
    summary: {
      es: 'Calculadora para tableros industriales: corriente de diseño, protección, contactor, sección por capacidad y caída de tensión, balance de fases, interruptor general, lista de materiales y unifilar en SVG.',
      en: 'Calculator for industrial panels: design current, protection, contactor, cable size by ampacity and voltage drop, phase balancing, main breaker, bill of materials and an SVG single-line diagram.',
    },
    stack: [{ es: 'IEC 60364-5-52 (ref.)', en: 'IEC 60364-5-52 (ref.)' }, { es: 'Dimensionamiento de cables', en: 'Cable sizing' }, 'SVG', 'JavaScript'],
    challenge: {
      es: 'Dimensionar un tablero a mano implica repetir decenas de cálculos y consultas de tablas (corriente, protección, factores de temperatura y agrupamiento, caída de tensión), con muchas oportunidades de equivocarse de columna.',
      en: 'Sizing a panel by hand means repeating dozens of calculations and table look-ups (current, protection, temperature and grouping factors, voltage drop), with plenty of chances to pick the wrong column.',
    },
    impact: {
      es: 'Un cable chico o una protección mal elegida se traducen en calentamiento, disparos molestos o fallas; automatizar el primer cálculo deja tiempo para revisar lo importante.',
      en: 'An undersized cable or a badly chosen protection means overheating, nuisance trips or faults; automating the first pass leaves time to review what matters.',
    },
    solution: {
      es: 'Para cada carga (motor trifásico, resistencia trifásica o carga monofásica) se calcula la corriente de diseño, se elige guardamotor o interruptor normalizado y contactor AC-3, y la sección más chica que cumple capacidad (con factores de temperatura y agrupamiento) y caída de tensión, con advertencias cuando la sección debe aumentar; se balancean las cargas monofásicas entre fases, se dimensiona el interruptor general con factor de demanda y se generan la lista de materiales (CSV) y el unifilar (SVG). Las fórmulas se verificaron contra cálculos a mano y 300 circuitos aleatorios cumplen las propiedades de ingeniería (corriente ≤ protección ≤ capacidad del cable, caída ≤ límite). El tablero de ejemplo (7 circuitos, 14,43 kW) resulta en un general de 25 A con cable de 6 mm² y 7,1 % de desbalance. Las tablas son de referencia: hay que verificarlas con la NCh Elec. 4/2003 y el fabricante antes de ejecutar.',
      en: 'For each load (three-phase motor, three-phase resistor or single-phase load) the design current is computed, a motor protector or standard breaker and an AC-3 contactor are chosen, and the smallest cable size that meets ampacity (with temperature and grouping factors) and voltage drop, with warnings when the size must grow; single-phase loads are balanced across phases, the main breaker is sized with a demand factor and the bill of materials (CSV) and the single-line diagram (SVG) are generated. The formulas were checked against hand calculations and 300 random circuits satisfy the engineering properties (current ≤ protection ≤ cable ampacity, drop ≤ limit). The example panel (7 circuits, 14.43 kW) results in a 25 A main with a 6 mm² cable and 7.1 % phase imbalance. The tables are reference values: verify them against the Chilean NCh Elec. 4/2003 and the manufacturer before building.',
    },
    metrics: [
      { label: { es: 'Circuitos del tablero de ejemplo', en: 'Circuits in the example panel' }, value: { es: '7 (14,4 kW)', en: '7 (14.4 kW)' } },
      { label: { es: 'Circuitos aleatorios verificados', en: 'Random circuits verified' }, value: '300' },
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '13' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Cargas', en: 'Loads' }, sub: { es: 'P · cosφ · largo', en: 'P · cosφ · length' } },
        { label: { es: 'Corriente y protección', en: 'Current and protection' }, sub: { es: 'guardamotor · MCB', en: 'motor protector · MCB' } },
        { label: { es: 'Cable', en: 'Cable' }, sub: { es: 'capacidad + caída de tensión', en: 'ampacity + voltage drop' } },
        { label: { es: 'Entregables', en: 'Deliverables' }, sub: { es: 'unifilar SVG · lista CSV', en: 'SVG diagram · CSV list' } },
      ],
      feedback: { from: 2, to: 1, label: { es: 'sección ↑ si ΔV falla', en: 'size ↑ if ΔV fails' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'SVG', 'node:test', { es: 'Tablas IEC 60364-5-52 (referencia)', en: 'IEC 60364-5-52 tables (reference)' }] },
  },
  {
    slug: 'calculadora-conductores-protecciones',
    title: {
      es: 'Calculadora paso a paso de un circuito de fuerza: conductores, protecciones y curvas de disparo',
      en: 'Step-by-Step Power Circuit Calculator: Conductors, Protections and Trip Curves',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/calculadora-conductores-protecciones.jpg',
    demo: { src: '/demos/calculadora-conductores-protecciones/index.html' },
    resultBadge: { es: '400 circuitos aleatorios verificados', en: '400 random circuits verified' },
    summary: {
      es: 'Calculadora interactiva de un circuito de fuerza (motor, carga trifásica o monofásica): corriente de proyecto, interruptor, sección por capacidad de corriente, caída de tensión, resistencia térmica y alcance del disparo magnético, con las curvas de disparo contra el daño del cable.',
      en: 'Interactive calculator for a power circuit (motor, three-phase or single-phase load): design current, breaker, cable size by ampacity, voltage drop, thermal withstand and magnetic trip reach, with trip curves plotted against cable damage.',
    },
    stack: [{ es: 'Capacidad de corriente (IEC 60364-5-52)', en: 'Ampacity (IEC 60364-5-52)' }, 'k²S² ≥ I²t', { es: 'Curvas B/C/D', en: 'B/C/D curves' }, 'JavaScript'],
    challenge: {
      es: 'Dimensionar un circuito no es elegir un cable por amperes: hay que cumplir a la vez la capacidad de corriente, la caída de tensión, la resistencia térmica al cortocircuito y el disparo seguro ante una falla a tierra al final de la línea. Basta que falle uno para que el circuito sea inseguro o inútil.',
      en: 'Sizing a circuit is not picking a cable by amps: it has to satisfy ampacity, voltage drop, short-circuit thermal withstand and a reliable trip on an earth fault at the end of the line, all at once. One failed check is enough to make the circuit unsafe or useless.',
    },
    impact: {
      es: 'En planta, un cable largo con el interruptor equivocado puede no disparar ante una falla a tierra, y uno subdimensionado se calienta o provoca caídas de tensión que detienen motores en el arranque.',
      en: 'On a plant, a long cable with the wrong breaker may not trip on an earth fault, and an undersized one overheats or causes voltage drops that stall motors at start-up.',
    },
    solution: {
      es: 'Se programaron las verificaciones encadenadas: corriente de proyecto, interruptor normalizado, sección por capacidad con factores de temperatura y agrupamiento, caída de tensión (también en el arranque del motor), resistencia térmica k²S² ≥ I²t, longitud máxima por disparo magnético en esquema TN, poder de corte y coordinación entre la curva del interruptor y la curva de daño del cable. Los resultados se contrastaron con cálculos a mano (un C16 con 2,5 mm² alcanza 53,2 m con U₀ de 230 V; un motor de 7,5 kW da 15,2 A, interruptor de 16 A y 6 mm² con 40 °C y 3 circuitos agrupados) y 400 circuitos aleatorios comprueban que, cuando no hay advertencias, se cumplen todos los criterios. La demo explica cada paso con su fórmula, muestra qué criterio manda la sección, grafica la banda de disparo del interruptor contra la curva de daño del cable y permite descargar la memoria de cálculo. Usa tablas de referencia tipo IEC 60364-5-52 y límites configurables: hay que verificarlos con el pliego RIC / NCh Elec. 4/2003 vigente y el catálogo del fabricante.',
      en: 'The chained checks were programmed: design current, standard breaker, cable size by ampacity with temperature and grouping factors, voltage drop (also at motor start), thermal withstand k²S² ≥ I²t, maximum length for magnetic tripping in a TN system, breaking capacity, and coordination between the breaker curve and the cable damage curve. Results were checked against hand calculations (a C16 with 2.5 mm² reaches 53.2 m at U₀ of 230 V; a 7.5 kW motor gives 15.2 A, a 16 A breaker and 6 mm² at 40 °C with 3 grouped circuits) and 400 random circuits confirm that, whenever there are no warnings, every criterion is met. The demo explains each step with its formula, shows which criterion drives the cable size, plots the breaker trip band against the cable damage curve and lets you download the calculation report. It uses IEC 60364-5-52-style reference tables and configurable limits: they must be verified against the current RIC / NCh Elec. 4/2003 rules and the manufacturer catalogue.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '16' },
      { label: { es: 'Circuitos aleatorios verificados', en: 'Random circuits verified' }, value: '400' },
      { label: { es: 'Alcance de un C16 con 2,5 mm²', en: 'Reach of a C16 on 2.5 mm²' }, value: '53,2 m' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Carga', en: 'Load' }, sub: { es: 'P · cosφ · largo', en: 'P · cosφ · length' } },
        { label: { es: 'Corriente e interruptor', en: 'Current and breaker' }, sub: { es: 'Ib · In · curva', en: 'Ib · In · curve' } },
        { label: { es: 'Sección', en: 'Cable size' }, sub: { es: 'capacidad · caída · térmica', en: 'ampacity · drop · thermal' } },
        { label: { es: 'Verificación', en: 'Verification' }, sub: { es: 'magnético · Icc · curvas', en: 'magnetic · Icc · curves' } },
      ],
      feedback: { from: 3, to: 2, label: { es: 'sección ↑ si falla', en: 'size ↑ if it fails' } },
    },
    tools: { hardware: [], software: ['IEC 60364-5-52', { es: 'Curvas de disparo B/C/D', en: 'B/C/D trip curves' }, 'JavaScript', 'Canvas', 'node:test'] },
  },
  {
    slug: 'variador-vdf-motor',
    title: {
      es: 'Variador de frecuencia con motor de inducción: control V/f, rampas, regeneración y fallas',
      en: 'Variable Frequency Drive with an Induction Motor: V/f Control, Ramps, Regeneration and Faults',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/variador-vdf-motor.jpg',
    demo: { src: '/demos/variador-vdf-motor/index.html' },
    resultBadge: { es: 'Bus limitado a 750 V con resistencia de frenado', en: 'DC bus held at 750 V with a braking resistor' },
    summary: {
      es: 'Simulador de un variador con control escalar V/f sobre un motor de 5,5 kW: rampas, boost, cargas de par constante o cuadrática con inercia, curva par–velocidad en vivo, bus de continua con regeneración y fallas con enclavamiento (sobrecorriente, sobrecarga térmica, sobretensión y subtensión).',
      en: 'Simulator of a drive with scalar V/f control on a 5.5 kW motor: ramps, boost, constant or quadratic torque loads with inertia, live torque–speed curve, DC bus with regeneration and latched faults (overcurrent, thermal overload, overvoltage and undervoltage).',
    },
    stack: [{ es: 'Control V/f', en: 'V/f control' }, { es: 'Motor de inducción', en: 'Induction motor' }, { es: 'Bus de continua', en: 'DC bus' }, 'JavaScript'],
    challenge: {
      es: 'Un variador no solo cambia la velocidad: a baja frecuencia el motor pierde flujo y par, al frenar una carga con inercia el motor regenera y puede sobrecargar el bus de continua, y una sobrecarga mantenida lo calienta aunque la corriente parezca «normal».',
      en: 'A drive does more than change speed: at low frequency the motor loses flux and torque, braking an inertial load makes the motor regenerate and can overload the DC bus, and a sustained overload heats it even when the current looks «normal».',
    },
    impact: {
      es: 'En una línea de envasado o de extrusión, un paro por sobretensión (F-OV) o sobrecarga (F-OL) detiene la producción: saber por qué ocurre y qué parámetro lo evita es la diferencia entre reiniciar a ciegas y resolver la causa.',
      en: 'On a packaging or extrusion line, a trip on overvoltage (F-OV) or overload (F-OL) stops production: knowing why it happens and which parameter prevents it is the difference between blindly restarting and fixing the cause.',
    },
    solution: {
      es: 'Se modeló un motor de 5,5 kW, 380 V, 4 polos con par proporcional al deslizamiento y al flujo² (par máximo de 2,5 veces el nominal), flujo reducido a baja frecuencia por la caída en el estator, corriente magnetizante más corriente de par, memoria térmica de 150 % durante 60 s, bus de continua con la energía almacenada, regeneración, resistencia de frenado y descarga durante un hueco de red. Las pruebas verifican 1500 rpm sin carga y 1450 rpm con carga nominal (corriente y par nominales), la rampa lineal, que un ventilador a la mitad de velocidad consume 13,5 % de la potencia (≈ 1/8), un balance de energía con error menor a 2 %, la sobrecarga del 150 % que dispara F-OL a los 58 s, y la sobretensión: con 1,5 kg·m² de inercia y rampa de 3 s el bus llega a 815 V y dispara F-OV, mientras que con resistencia de frenado queda en 750 V. También se prueba que un hueco de red de 0,3 s lo aguanta el bus sin carga y dispara F-UV con carga nominal, y que una falla enclava hasta reiniciar con el bus y el motor en condiciones. La demo trae seis escenarios guiados y muestra la curva par–velocidad del motor contra la carga en tiempo real.',
      en: 'A 5.5 kW, 380 V, 4-pole motor was modeled with torque proportional to slip and flux² (maximum torque 2.5 times rated), flux reduced at low frequency by the stator drop, magnetizing plus torque current, a 150 % for 60 s thermal memory, and a DC bus with stored energy, regeneration, braking resistor and discharge during a mains sag. The tests verify 1500 rpm unloaded and 1450 rpm at rated load (rated current and torque), the linear ramp, that a fan at half speed draws 13.5 % of the power (≈ 1/8), an energy balance with error below 2 %, the 150 % overload that trips F-OL at 58 s, and overvoltage: with 1.5 kg·m² of inertia and a 3 s ramp the bus reaches 815 V and trips F-OV, while with a braking resistor it stays at 750 V. They also check that a 0.3 s mains sag is ridden through by the bus when unloaded and trips F-UV at rated load, and that a fault latches until reset with the bus and motor within limits. The demo includes six guided scenarios and shows the motor torque–speed curve against the load in real time.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '17' },
      { label: { es: 'Bus con inercia alta: sin frenado vs. con frenado', en: 'High-inertia bus: no braking vs. braking' }, value: '815 V vs 750 V' },
      { label: { es: 'Potencia de un ventilador a media velocidad', en: 'Fan power at half speed' }, value: '13,5 %' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Referencia', en: 'Reference' }, sub: { es: 'Hz · rampas', en: 'Hz · ramps' } },
        { label: 'V/f', sub: { es: 'boost · flujo', en: 'boost · flux' } },
        { label: { es: 'Motor y carga', en: 'Motor and load' }, sub: { es: 'par · inercia', en: 'torque · inertia' } },
        { label: { es: 'Bus y protecciones', en: 'Bus and protections' }, sub: 'OC · OL · OV · UV' },
      ],
      feedback: { from: 3, to: 0, label: { es: 'limitadores', en: 'limiters' } },
    },
    tools: { hardware: [], software: [{ es: 'Control escalar V/f', en: 'Scalar V/f control' }, { es: 'Modelo de motor de inducción', en: 'Induction motor model' }, 'JavaScript', 'Canvas', 'node:test'] },
  },
  {
    slug: 'simulador-ladder',
    title: {
      es: 'Simulador de lógica Ladder con ciclo de scan y traducción a Texto Estructurado',
      en: 'Ladder Logic Simulator with Scan Cycle and Structured Text Translation',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/simulador-ladder.jpg',
    demo: { src: '/demos/simulador-ladder/index.html' },
    resultBadge: { es: '19 instrucciones, 17 pruebas y 6 programas de ejemplo', en: '19 instructions, 17 tests and 6 example programs' },
    summary: {
      es: 'Intérprete de lógica Ladder en el navegador: se escribe la escalera en texto, se ve el flujo de energía peldaño a peldaño, se ejecuta con el ciclo de scan de un PLC, se grafica el diagrama de tiempos y se obtiene el equivalente en Texto Estructurado IEC 61131-3.',
      en: 'Ladder logic interpreter in the browser: the ladder is typed as text, the power flow is shown rung by rung, it runs with a PLC scan cycle, a timing diagram is plotted and the IEC 61131-3 Structured Text equivalent is generated.',
    },
    stack: ['IEC 61131-3', 'Ladder', { es: 'Texto Estructurado', en: 'Structured Text' }, 'SVG', 'JavaScript'],
    challenge: {
      es: 'La lógica de un PLC no se lee como un programa normal: se ejecuta en ciclos de scan, un peldaño ve el valor nuevo de los de arriba y el viejo de los de abajo, y los temporizadores y contadores tienen reglas propias. Entender esto en papel es difícil y depurarlo en un PLC real exige hardware.',
      en: 'PLC logic does not read like a normal program: it runs in scan cycles, a rung sees the new value of the rungs above it and the old value of the rungs below, and timers and counters have their own rules. This is hard to grasp on paper and debugging it on a real PLC needs hardware.',
    },
    impact: {
      es: 'Los errores de lógica en una línea de producción (un sello mal hecho, un temporizador que se reinicia, un contador que cuenta tiempo en vez de flancos) detienen máquinas; verlos en un simulador antes de descargar el programa ahorra paros.',
      en: 'Logic mistakes on a production line (a badly made seal-in, a timer that resets, a counter that counts time instead of edges) stop machines; seeing them in a simulator before downloading the program saves downtime.',
    },
    solution: {
      es: 'Se programó un compilador y un intérprete de 19 instrucciones (contactos, bobinas con retención, TON, TOF, CTU, RES, ONS, comparaciones, MOV, ADD y SUB) con ramas en paralelo anidadas y errores con número de línea. El scan lee entradas, resuelve los peldaños de arriba hacia abajo y escribe salidas, y la demo dibuja la escalera con el flujo de energía, el acumulado de cada temporizador y el diagrama de tiempos. Las 17 pruebas verifican, entre otras cosas, el sello con paro dominante, que un TON active DN en el scan exacto del preset, el retardo de un scan entre peldaños, que un contador cuente flancos y no tiempo, una luz intermitente con 50 % de ciclo útil, un semáforo de 5 s, 2 s y 3 s con error menor a 30 ms, y una histéresis de nivel que mantiene el tanque entre 28 % y 83 % con una planta simulada. También traduce el programa a Texto Estructurado con sus declaraciones (por ejemplo, motor := (marcha OR motor) AND NOT paro;).',
      en: 'A compiler and interpreter was written for 19 instructions (contacts, latching coils, TON, TOF, CTU, RES, ONS, comparisons, MOV, ADD and SUB) with nested parallel branches and errors reported with line numbers. The scan reads inputs, solves the rungs top to bottom and writes outputs, and the demo draws the ladder with its power flow, each timer accumulator and the timing diagram. The 17 tests verify, among other things, the seal-in with dominant stop, a TON setting DN on the exact preset scan, the one-scan delay between rungs, a counter counting edges rather than time, a flasher with a 50 % duty cycle, a 5 s, 2 s and 3 s traffic light with error under 30 ms, and a level hysteresis that keeps the tank between 28 % and 83 % with a simulated plant. It also translates the program into Structured Text with its declarations (for example, motor := (marcha OR motor) AND NOT paro;).',
    },
    metrics: [
      { label: { es: 'Instrucciones soportadas', en: 'Supported instructions' }, value: '19' },
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '17' },
      { label: { es: 'Programas de ejemplo', en: 'Example programs' }, value: '6' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Texto Ladder', en: 'Ladder text' }, sub: { es: 'un peldaño por línea', en: 'one rung per line' } },
        { label: { es: 'Compilador', en: 'Compiler' }, sub: { es: 'errores con línea', en: 'errors with line' } },
        { label: { es: 'Ciclo de scan', en: 'Scan cycle' }, sub: { es: 'entradas · peldaños · salidas', en: 'inputs · rungs · outputs' } },
        { label: { es: 'Vistas', en: 'Views' }, sub: { es: 'escalera · tiempos · ST', en: 'ladder · timing · ST' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'editar y repetir', en: 'edit and repeat' } },
    },
    tools: { hardware: [], software: ['IEC 61131-3', 'Ladder', { es: 'Texto Estructurado', en: 'Structured Text' }, 'SVG', 'JavaScript', 'node:test'] },
  },
  {
    slug: 'seguridad-funcional-loto',
    title: {
      es: 'Seguridad de máquinas: estimador de nivel de desempeño (ISO 13849) y práctica de bloqueo y etiquetado (LOTO)',
      en: 'Machine Safety: Performance Level Estimator (ISO 13849) and Lockout/Tagout (LOTO) Practice',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/seguridad-funcional-loto.jpg',
    demo: { src: '/demos/seguridad-funcional-loto/index.html' },
    resultBadge: { es: '11 incidentes distintos por pasos omitidos', en: '11 distinct incidents from skipped steps' },
    summary: {
      es: 'Dos herramientas de seguridad de máquinas: un estimador del nivel de desempeño (PL) de una función de seguridad con el grafo de riesgo, la categoría, el MTTFd, la cobertura de diagnóstico y las fallas de causa común, y una práctica de bloqueo y etiquetado sobre una máquina virtual con cinco fuentes de energía.',
      en: 'Two machine safety tools: a performance level (PL) estimator for a safety function using the risk graph, category, MTTFd, diagnostic coverage and common cause failures, and a lockout/tagout practice on a virtual machine with five energy sources.',
    },
    stack: ['ISO 13849-1', { es: 'Grafo de riesgo', en: 'Risk graph' }, 'LOTO', 'JavaScript'],
    challenge: {
      es: 'La seguridad funcional y el bloqueo de energías se aprenden con listas de pasos, pero los errores graves vienen de omitir uno: energía almacenada que nadie liberó, un candado sin aislar, una verificación que no se hizo. Además, elegir la arquitectura de una función de seguridad exige combinar varias magnitudes que no se intuyen.',
      en: 'Functional safety and energy lockout are learned from step lists, but serious accidents come from skipping one: stored energy nobody released, a lock on something not isolated, a verification that was never done. Choosing the architecture of a safety function also means combining several quantities that are not intuitive.',
    },
    impact: {
      es: 'En una línea de envasado conviven electricidad, aire comprimido, partes que caen por gravedad y superficies calientes: una intervención con un paso omitido puede terminar en un arranque inesperado o una quemadura. Practicar la secuencia con consecuencias visibles es más efectivo que memorizarla.',
      en: 'A packaging line combines electricity, compressed air, parts that fall by gravity and hot surfaces: an intervention with a skipped step can end in an unexpected start-up or a burn. Practicing the sequence with visible consequences works better than memorizing it.',
    },
    solution: {
      es: 'El estimador calcula el nivel requerido (PLr) con el grafo S, F y P, el PFHd con fórmulas simplificadas de uno y dos canales (tiempo de misión de 20 años), lo ubica en una escala logarítmica con las bandas a a e, lo limita de forma conservadora según la categoría y propone cambios de un parámetro que sí alcanzan el nivel requerido. No reproduce la tabla K.1 de la norma y lo declara en pantalla: el valor normativo sale de la norma o de SISTEMA. La práctica LOTO modela una estación de sellado con seccionador, variador con bus de continua, aire con purga, cuchilla vertical, barra caliente y dos trabajadores con su candado personal: el bus baja de 50 V en cerca de 50 s, el aire en 5 s y la barra tarda unos 10 minutos en enfriar. Cada paso omitido tiene su consecuencia (11 incidentes distintos, desde energizar con personal dentro hasta que un compañero cierre el seccionador sin candado), el procedimiento marca los pasos hechos fuera de orden y exige que cada uno retire solo su candado. Las 25 pruebas cubren el grafo de riesgo, las bandas, los casos de las categorías B a 4, las arquitecturas inválidas, las sugerencias, el procedimiento completo y cada tipo de incidente.',
      en: 'The estimator computes the required level (PLr) with the S, F and P graph and the PFHd with simplified one- and two-channel formulas (20-year mission time), places it on a logarithmic scale with the a to e bands, caps it conservatively by category and suggests single-parameter changes that do reach the required level. It does not reproduce the standard\'s Table K.1 and says so on screen: the normative value comes from the standard or from SISTEMA. The LOTO practice models a sealing station with a disconnect switch, a drive with a DC bus, air with a bleed valve, a vertical blade, a hot bar and two workers with their personal padlocks: the bus drops below 50 V in about 50 s, the air in 5 s and the bar takes about 10 minutes to cool. Every skipped step has its consequence (11 distinct incidents, from energizing with people inside to a coworker closing the switch with no lock), the procedure flags steps done out of order and requires each person to remove only their own lock. The 25 tests cover the risk graph, the bands, the category B to 4 cases, invalid architectures, the suggestions, the complete procedure and every incident type.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '25' },
      { label: { es: 'Fuentes de energía simuladas', en: 'Simulated energy sources' }, value: '5' },
      { label: { es: 'Pasos del procedimiento LOTO', en: 'LOTO procedure steps' }, value: '9' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Riesgo', en: 'Risk' }, sub: 'S · F · P' },
        { label: { es: 'Arquitectura', en: 'Architecture' }, sub: { es: 'categoría · MTTFd · DC', en: 'category · MTTFd · DC' } },
        { label: { es: 'PL alcanzado', en: 'Achieved PL' }, sub: { es: 'vs. PLr', en: 'vs. PLr' } },
        { label: { es: 'Práctica LOTO', en: 'LOTO practice' }, sub: { es: 'aislar · bloquear · verificar', en: 'isolate · lock · verify' } },
      ],
      feedback: { from: 2, to: 1, label: { es: 'mejorar arquitectura', en: 'improve architecture' } },
    },
    tools: { hardware: [], software: ['ISO 13849-1', 'LOTO', { es: 'Modelo de energías', en: 'Energy model' }, 'JavaScript', 'SVG', 'node:test'] },
  },
  {
    slug: 'gemelo-digital-envasado',
    title: {
      es: 'Gemelo digital de una línea de envasado: buffers, microparos y cuello de botella',
      en: 'Digital Twin of a Packaging Line: Buffers, Micro-Stops and Bottleneck',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/gemelo-digital-envasado.jpg',
    demo: { src: '/demos/gemelo-digital-envasado/index.html' },
    resultBadge: { es: 'Solo acelerar el cuello de botella sube el flujo (+7,4 u/min)', en: 'Only speeding up the bottleneck raises throughput (+7.4 u/min)' },
    summary: {
      es: 'Simulación de eventos discretos de una línea de cinco máquinas en serie (llenadora, tapadora, etiquetadora, encajonadora y paletizador) con buffers, averías, microparos y estados de espera, que calcula el flujo, el cuello de botella y el efecto de los buffers y de acelerar cada máquina.',
      en: 'Discrete-event simulation of a five-machine serial line (filler, capper, labeler, case packer and palletizer) with buffers, breakdowns, micro-stops and waiting states, which computes throughput, the bottleneck and the effect of buffers and of speeding up each machine.',
    },
    stack: [{ es: 'Simulación de eventos discretos', en: 'Discrete-event simulation' }, 'MTBF / MTTR', 'OEE', { es: 'Cuello de botella', en: 'Bottleneck' }, 'JavaScript'],
    challenge: {
      es: 'En una línea de envasado la velocidad nominal de cada máquina dice poco: el flujo real depende de las averías, de los microparos y de cuánto aíslan los buffers a una máquina de las demás. Sin un modelo, se invierte en acelerar la máquina equivocada.',
      en: 'On a packaging line each machine\'s nominal speed says little: real throughput depends on breakdowns, micro-stops and how much the buffers isolate each machine from the others. Without a model, money goes into speeding up the wrong machine.',
    },
    impact: {
      es: 'Identificar el verdadero cuello de botella y el tamaño de buffer que vale la pena evita inversiones que no mueven la producción y orienta el mantenimiento hacia las paradas que de verdad cuestan unidades.',
      en: 'Finding the real bottleneck and the buffer size worth having avoids investments that do not move production and points maintenance at the stops that actually cost units.',
    },
    solution: {
      es: 'Se simularon cinco máquinas en pasos de 1 s con averías exponenciales (MTBF y MTTR), microparos aleatorios y buffers de acumulación; cada máquina registra cuánto tiempo produce, espera producto (hambre), está bloqueada, averiada o en microparo. El modelo calcula el flujo, la eficiencia de la línea y dos cuellos de botella: el teórico (velocidad por disponibilidad) y el observado (la máquina que más tiempo trabaja sin esperar). Las pruebas verifican la conservación de unidades entre máquinas, que los buffers nunca se salgan de sus límites, que la disponibilidad medida coincida con MTBF / (MTBF + MTTR), que 12 microparos por hora de 5 s promedien 1,7 % del tiempo y que el flujo nunca supere la capacidad efectiva del cuello. Con una etiquetadora lenta, las máquinas anteriores se bloquean y las posteriores esperan; acelerar cualquier otra máquina un 10 % deja el flujo igual y acelerar la etiquetadora lo sube 7,4 u/min. Con el escenario base, pasar de buffers mínimos a 800 unidades sube el flujo de 91,8 a 106,2 u/min, con rendimientos decrecientes (la demo calcula este barrido promediando tres semillas de 8 h).',
      en: 'Five machines were simulated in 1 s steps with exponential breakdowns (MTBF and MTTR), random micro-stops and accumulation buffers; each machine records how long it produces, waits for product (starved), is blocked, broken down or in a micro-stop. The model computes throughput, line efficiency and two bottlenecks: the theoretical one (speed times availability) and the observed one (the machine that works longest without waiting). The tests verify conservation of units between machines, that buffers never leave their limits, that measured availability matches MTBF / (MTBF + MTTR), that 12 micro-stops per hour of 5 s average 1.7 % of the time and that throughput never exceeds the bottleneck\'s effective capacity. With a slow labeler, upstream machines block and downstream ones starve; speeding up any other machine by 10 % leaves throughput unchanged while speeding up the labeler raises it by 7.4 u/min. In the base scenario, going from minimum buffers to 800 units raises throughput from 91.8 to 106.2 u/min with diminishing returns (the demo computes this sweep averaging three 8-hour seeds).',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '15' },
      { label: { es: 'Flujo con buffers mínimos vs. de 800 u', en: 'Throughput with minimum vs. 800 u buffers' }, value: '91,8 vs 106,2 u/min' },
      { label: { es: 'Ganancia de acelerar el cuello +10 %', en: 'Gain from speeding up the bottleneck +10 %' }, value: '+7,4 u/min' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Parámetros', en: 'Parameters' }, sub: 'v · MTBF · MTTR' },
        { label: { es: 'Máquinas y buffers', en: 'Machines and buffers' }, sub: { es: 'paso de 1 s', en: '1 s step' } },
        { label: { es: 'Estados', en: 'States' }, sub: { es: 'produce · hambre · bloqueo', en: 'run · starved · blocked' } },
        { label: { es: 'Análisis', en: 'Analysis' }, sub: { es: 'cuello · buffers · mejoras', en: 'bottleneck · buffers · upgrades' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'qué pasaría si', en: 'what if' } },
    },
    tools: { hardware: [], software: [{ es: 'Eventos discretos', en: 'Discrete events' }, 'Monte Carlo', 'JavaScript', 'Canvas', 'SVG', 'node:test'] },
  },
  {
    slug: 'gestor-mantenimiento-tpm',
    title: {
      es: 'Gestor de mantenimiento (CMMS / TPM): órdenes de trabajo, plan preventivo, KPI y repuestos',
      en: 'Maintenance Manager (CMMS / TPM): Work Orders, Preventive Plan, KPIs and Spare Parts',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/gestor-mantenimiento-tpm.jpg',
    demo: { src: '/demos/gestor-mantenimiento-tpm/index.html' },
    resultBadge: { es: '15 pruebas y 247 órdenes sintéticas analizadas', en: '15 tests and 247 synthetic work orders analyzed' },
    summary: {
      es: 'Aplicación de mantenimiento con equipos y criticidad, plan preventivo, órdenes de trabajo con ciclo de vida validado, repuestos con clasificación ABC y un tablero de KPI (MTBF, MTTR, disponibilidad, trabajo planificado, cumplimiento del plan, Pareto de causas y peores actores).',
      en: 'Maintenance application with equipment and criticality, a preventive plan, work orders with a validated lifecycle, spare parts with ABC classification and a KPI dashboard (MTBF, MTTR, availability, planned work, plan compliance, Pareto of causes and worst actors).',
    },
    stack: ['TPM', 'CMMS', 'MTBF / MTTR', 'Pareto', { es: 'Criticidad', en: 'Criticality' }, 'JavaScript'],
    challenge: {
      es: 'El mantenimiento de una planta se gestiona con muchos datos sueltos (fallas, horas, repuestos, planes) y se decide por intuición: qué equipo es crítico, cuánto del trabajo es planificado, qué causa concentra las paradas, qué repuesto conviene tener en bodega.',
      en: 'Plant maintenance is run on scattered data (failures, hours, spares, plans) and decided by intuition: which equipment is critical, how much of the work is planned, which cause concentrates the stops, which spare part is worth keeping in stock.',
    },
    impact: {
      es: 'Con indicadores claros se pasa de apagar incendios a planificar: se ve dónde se pierden las horas de parada, se prioriza el preventivo en los equipos críticos y se compra lo que se está acabando antes de que una falla deje la línea detenida.',
      en: 'With clear indicators you move from firefighting to planning: you see where downtime hours go, prioritize preventive work on critical equipment and buy what is running out before a failure stops the line.',
    },
    solution: {
      es: 'Se construyó un CMMS que se guarda en el navegador, con datos sintéticos generados con semilla: 12 equipos, 16 planes preventivos, 14 repuestos y 247 órdenes de 180 días. La criticidad es la frecuencia de falla por la mayor consecuencia (producción, seguridad, calidad o costo) y clasifica en A, B y C con una matriz. Las órdenes siguen un ciclo abierta, asignada, en curso y cerrada que rechaza saltos de etapa, términos anteriores al inicio, paradas negativas, correctivas sin código de falla y repuestos sin stock; cerrar una preventiva reinicia la fecha de su plan. El tablero calcula MTBF, MTTR y disponibilidad por equipo, el porcentaje de trabajo planificado, el cumplimiento del plan con 2 días de tolerancia, el Pareto de causas con sus pocos vitales y el ranking de peores actores. Los repuestos se clasifican en ABC por valor de consumo y generan sugerencias de compra. Las 15 pruebas verifican las fórmulas con un caso hecho a mano (3 fallas de 60, 120 y 30 minutos en 600 horas: MTBF de 198,8 h, MTTR de 1,33 h), las reglas del ciclo de vida y la coherencia de los KPI con los datos de ejemplo.',
      en: 'A CMMS that stores its data in the browser was built with seeded synthetic data: 12 machines, 16 preventive plans, 14 spare parts and 247 work orders over 180 days. Criticality is failure frequency times the greatest consequence (production, safety, quality or cost) and classifies into A, B and C with a matrix. Orders follow an open, assigned, in-progress and closed lifecycle that rejects skipped stages, end times before the start, negative stops, corrective orders without a failure code and spares with no stock; closing a preventive order resets its plan date. The dashboard computes MTBF, MTTR and availability per machine, the share of planned work, plan compliance with a 2-day tolerance, the Pareto of causes with its vital few and the worst-actors ranking. Spare parts are ABC-classified by consumption value and generate purchase suggestions. The 15 tests verify the formulas with a hand-made case (3 failures of 60, 120 and 30 minutes in 600 hours: MTBF 198.8 h, MTTR 1.33 h), the lifecycle rules and the coherence of the KPIs with the sample data.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '15' },
      { label: { es: 'Órdenes de ejemplo analizadas', en: 'Sample orders analyzed' }, value: '247' },
      { label: { es: 'Equipos · planes · repuestos', en: 'Machines · plans · spares' }, value: '12 · 16 · 14' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Equipos', en: 'Equipment' }, sub: { es: 'criticidad A·B·C', en: 'criticality A·B·C' } },
        { label: { es: 'Plan preventivo', en: 'Preventive plan' }, sub: { es: 'vence · genera OT', en: 'due · creates WO' } },
        { label: { es: 'Órdenes de trabajo', en: 'Work orders' }, sub: { es: 'abierta → cerrada', en: 'open → closed' } },
        { label: 'KPI', sub: 'MTBF · MTTR · Pareto' },
      ],
      feedback: { from: 3, to: 0, label: { es: 'priorizar', en: 'prioritize' } },
    },
    tools: { hardware: [], software: ['TPM', 'CMMS', 'Pareto', 'ABC', 'JavaScript', 'localStorage', 'node:test'] },
  },
  {
    slug: 'monitor-energia-esp32',
    title: {
      es: 'Monitor de energía con ESP32 y medidor: consumo, demanda, costo y anomalías (MQTT)',
      en: 'Energy Monitor with ESP32 and Meter: Consumption, Demand, Cost and Anomalies (MQTT)',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'embedded',
    year: 2026,
    image: '/projects/monitor-energia-esp32.jpg',
    demo: { src: '/demos/monitor-energia-esp32/index.html' },
    resultBadge: { es: 'Fuga nocturna de 800 W detectada sin falsas alarmas', en: '800 W night leak detected with no false alarms' },
    summary: {
      es: 'Firmware de ESP32 que lee un medidor PZEM-004T y publica por MQTT, más un panel que valida el mensaje y calcula energía, demanda de 15 minutos, costo de la cuenta, alertas, anomalías de consumo y armónicos. El firmware está escrito pero aún no probado en hardware; el panel usa datos simulados.',
      en: 'ESP32 firmware that reads a PZEM-004T meter and publishes over MQTT, plus a dashboard that validates the message and computes energy, 15-minute demand, bill cost, alerts, consumption anomalies and harmonics. The firmware is written but not yet tested on hardware; the dashboard uses simulated data.',
    },
    stack: ['ESP32', 'MQTT', 'PZEM-004T', 'Arduino', { es: 'Calidad de energía', en: 'Power quality' }, 'JavaScript'],
    challenge: {
      es: 'La electricidad es un gasto grande y casi invisible: sin medir no se sabe cuánto consume cada carga, cuánta demanda máxima se paga, si el factor de potencia es malo ni si algún equipo quedó encendido de noche.',
      en: 'Electricity is a large, nearly invisible expense: without measuring you do not know what each load consumes, how much peak demand you pay for, whether the power factor is poor or whether some equipment was left on overnight.',
    },
    impact: {
      es: 'Un medidor barato con un microcontrolador permite ver el consumo por hora, detectar fugas de energía y justificar acciones (corregir el factor de potencia, mover cargas fuera del pico) antes de que lleguen en la cuenta.',
      en: 'A cheap meter with a microcontroller lets you see consumption by the hour, detect energy leaks and justify actions (correcting power factor, moving loads out of the peak) before they show up on the bill.',
    },
    solution: {
      es: 'El firmware (Arduino, en la carpeta proyectos del repositorio) lee el PZEM-004T por UART, publica un JSON cada 2 s en planta/energia/<id>, usa última voluntad para el estado «offline», reconecta Wi-Fi y MQTT con espera creciente, tiene perro guardián y un modo simulado sin medidor; está escrito y revisado, pero no se ha probado en hardware real. El panel genera un medidor con cinco cargas (iluminación LED, compresor, resistencia con termostato, bomba con variador y equipos en espera) con variación diaria, valida el mismo mensaje (tipos, rangos y que P ≈ V·I·FP), integra la energía, calcula la demanda máxima de 15 minutos y el factor de carga, proyecta la cuenta con tarifa editable (energía, demanda y cargo fijo), dispara alertas de tensión, corriente, factor de potencia y frecuencia, y muestra el espectro de armónicos (un variador de 6 pulsos da cerca de 42 % de THD). La detección de anomalías compara la potencia suavizada con el perfil de 14 días por tramos de 15 minutos: una fuga nocturna de 800 W se detecta una sola vez y sin falsas alarmas en la operación normal, aunque en las horas de más variación exige un exceso mayor. Las 15 pruebas cubren el mensaje y su validación, la integración de energía, la demanda, el costo, las alertas, las anomalías y los armónicos.',
      en: 'The firmware (Arduino, in the repository\'s proyectos folder) reads the PZEM-004T over UART, publishes a JSON every 2 s on planta/energia/<id>, uses a last will for the «offline» state, reconnects Wi-Fi and MQTT with growing back-off, has a watchdog and a simulated mode without a meter; it is written and reviewed but has not been tested on real hardware. The dashboard generates a meter with five loads (LED lighting, compressor, thermostat heater, pump with drive and standby equipment) with daily variation, validates the same message (types, ranges and P ≈ V·I·PF), integrates energy, computes the 15-minute maximum demand and the load factor, projects the bill with an editable tariff (energy, demand and fixed charge), raises voltage, current, power factor and frequency alerts, and shows the harmonic spectrum (a 6-pulse drive gives about 42 % THD). Anomaly detection compares smoothed power against a 14-day profile by 15-minute slots: an 800 W night leak is detected once with no false alarms in normal operation, although in the hours of highest variability it needs a larger excess. The 15 tests cover the message and its validation, energy integration, demand, cost, alerts, anomalies and harmonics.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '15' },
      { label: { es: 'THD de un variador de 6 pulsos', en: 'THD of a 6-pulse drive' }, value: '42 %' },
      { label: { es: 'Hardware probado', en: 'Hardware tested' }, value: { es: 'pendiente', en: 'pending' } },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Medidor PZEM', en: 'PZEM meter' }, sub: 'UART · Modbus' },
        { label: 'ESP32', sub: { es: 'Wi-Fi · última voluntad', en: 'Wi-Fi · last will' } },
        { label: 'MQTT', sub: 'planta/energia/<id>' },
        { label: { es: 'Panel', en: 'Dashboard' }, sub: { es: 'kWh · demanda · alertas', en: 'kWh · demand · alerts' } },
      ],
      feedback: { from: 3, to: 1, label: { es: 'umbrales', en: 'thresholds' } },
    },
    tools: { hardware: ['ESP32', 'PZEM-004T v3'], software: ['Arduino', 'PubSubClient', 'MQTT', 'JavaScript', 'Canvas', 'node:test'] },
  },
  {
    slug: 'pipeline-mqtt-grafana',
    title: {
      es: 'Pipeline de telemetría con Docker Compose: MQTT, Telegraf, InfluxDB y Grafana',
      en: 'Telemetry Pipeline with Docker Compose: MQTT, Telegraf, InfluxDB and Grafana',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'embedded',
    year: 2026,
    image: '/projects/pipeline-mqtt-grafana.jpg',
    demo: { src: '/demos/pipeline-mqtt-grafana/index.html' },
    resultBadge: { es: 'Probado en Docker: latencia MQTT → InfluxDB de 0,23 s', en: 'Tested in Docker: MQTT → InfluxDB latency of 0.23 s' },
    summary: {
      es: 'Pila de cinco contenedores con Docker Compose que recibe mensajes MQTT de una planta, los guarda en InfluxDB y los muestra en un tablero de Grafana provisionado, con un simulador de datos y un script que verifica todo de punta a punta. Se levanta con un solo comando.',
      en: 'A five-container Docker Compose stack that receives MQTT messages from a plant, stores them in InfluxDB and shows them on a provisioned Grafana dashboard, with a data simulator and a script that verifies everything end to end. It comes up with a single command.',
    },
    stack: ['Docker', 'Docker Compose', 'MQTT', 'Mosquitto', 'Telegraf', 'InfluxDB', 'Grafana', 'Flux'],
    challenge: {
      es: 'Una planta genera datos en muchos equipos, pero sin una cadena que los reciba, los guarde y los muestre quedan en las pantallas de cada máquina. Armar esa cadena a mano es lento, difícil de repetir y fácil de dejar insegura.',
      en: 'A plant generates data on many machines, but without a chain that receives, stores and displays it, the data stays on each machine\'s screen. Building that chain by hand is slow, hard to repeat and easy to leave insecure.',
    },
    impact: {
      es: 'Con una pila reproducible, cualquier sensor o PLC que hable MQTT se convierte en una serie de tiempo consultable y graficable en minutos, y el mismo montaje sirve para probar un firmware nuevo sin tocar la planta.',
      en: 'With a reproducible stack, any sensor or PLC that speaks MQTT becomes a queryable, plottable time series within minutes, and the same setup can test new firmware without touching the plant.',
    },
    solution: {
      es: 'Mosquitto recibe los mensajes, Telegraf se suscribe a planta/energia y planta/proceso, interpreta el JSON con json_v2 y escribe en InfluxDB 2 usando la hora del propio mensaje; Grafana trae la fuente de datos Flux y el tablero provisionados desde archivos, así que quedan idénticos en cualquier equipo. El arranque es ordenado con healthchecks y service_healthy, los puertos quedan atados a 127.0.0.1 y las claves salen de un .env (con valores de prueba por defecto). Un simulador en Node publica un medidor de energía con el mismo mensaje que el firmware del ESP32 y un pasteurizador con fallas de vapor periódicas. El script verificar.ps1 comprueba que los servicios estén sanos, que lleguen mensajes, que InfluxDB reciba puntos y que Grafana tenga su fuente de datos y su tablero. En la prueba real en Docker, los cinco servicios quedaron sanos, InfluxDB acumuló 56 puntos de cada medición en 2 minutos y un mensaje publicado fue consultable en InfluxDB en 0,23 s (mediana de 5 intentos, máximo 2,3 s); un mensaje con JSON inválido se descartó y quedó en el log. Es una pila de pruebas: el broker permite anónimos y sin TLS, y el README detalla lo que falta para exponerla (usuarios, TLS, ACL y claves propias).',
      en: 'Mosquitto receives the messages, Telegraf subscribes to planta/energia and planta/proceso, parses the JSON with json_v2 and writes to InfluxDB 2 using the message\'s own timestamp; Grafana gets its Flux data source and dashboard provisioned from files, so they are identical on any machine. Startup is ordered with healthchecks and service_healthy, ports are bound to 127.0.0.1 and credentials come from an .env file (with test defaults). A Node simulator publishes an energy meter with the same message as the ESP32 firmware and a pasteurizer with periodic steam failures. The verificar.ps1 script checks that services are healthy, that messages arrive, that InfluxDB receives points and that Grafana has its data source and dashboard. In the real Docker test, all five services came up healthy, InfluxDB accumulated 56 points of each measurement in 2 minutes and a published message was queryable in InfluxDB in 0.23 s (median of 5 attempts, maximum 2.3 s); a message with invalid JSON was dropped and logged. It is a test stack: the broker allows anonymous access without TLS, and the README details what is missing before exposing it (users, TLS, ACLs and own credentials).',
    },
    metrics: [
      { label: { es: 'Servicios sanos en la prueba', en: 'Healthy services in the test' }, value: '5 / 5' },
      { label: { es: 'Latencia MQTT → InfluxDB (mediana)', en: 'MQTT → InfluxDB latency (median)' }, value: '0,23 s' },
      { label: { es: 'Puntos por medición en 2 min', en: 'Points per measurement in 2 min' }, value: '56' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Simulador / ESP32', en: 'Simulator / ESP32' }, sub: 'JSON · MQTT' },
        { label: 'Mosquitto', sub: 'planta/#' },
        { label: 'Telegraf', sub: 'json_v2' },
        { label: 'InfluxDB → Grafana', sub: { es: 'Flux · tablero provisionado', en: 'Flux · provisioned dashboard' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'ajustar y repetir', en: 'tune and repeat' } },
    },
    tools: { hardware: [], software: ['Docker', 'Docker Compose', 'MQTT', 'Telegraf', 'InfluxDB 2', 'Grafana', 'Node.js', 'PowerShell'] },
  },
  {
    slug: 'convertidor-buck-boost-sincrono',
    title: {
      es: 'Convertidor DC-DC buck-boost síncrono de 120 W: dimensionamiento, lazo de control digital y simulación',
      en: 'Synchronous Buck-Boost DC-DC Converter (120 W): Sizing, Digital Control Loop and Simulation',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'embedded',
    year: 2026,
    image: '/projects/convertidor-buck-boost-sincrono.jpg',
    demo: { src: '/demos/convertidor-buck-boost-sincrono/index.html' },
    resultBadge: { es: 'Margen de fase de ~30° a 54–61° tras revisar el diseño', en: 'Phase margin from ~30° to 54–61° after reviewing the design' },
    summary: {
      es: 'Diseño de un convertidor de cuatro interruptores que entrega 24 V / 5 A desde una entrada de 9 a 36 V, con control digital en un STM32G474. La página reproduce el informe de ingeniería: calculadora de dimensionamiento, Bode con márgenes en vivo, sintonizador del compensador y simulación del lazo cerrado. Es un diseño con simulación propia: no existe un prototipo medido.',
      en: 'Design of a four-switch converter that delivers 24 V / 5 A from a 9 to 36 V input, with digital control on an STM32G474. The page reproduces the engineering report: sizing calculator, live Bode plot with margins, compensator tuner and closed-loop simulation. It is a design with my own simulation: there is no measured prototype.',
    },
    stack: [{ es: 'Electrónica de potencia', en: 'Power electronics' }, { es: 'Control digital', en: 'Digital control' }, 'STM32G474', 'HRTIM', 'C', 'JavaScript'],
    challenge: {
      es: 'Mantener 24 V estables con una entrada que puede estar por encima o por debajo de la salida (batería, panel o bus automotriz) obliga a pasar de reductor a elevador sin saltos. Y en modo elevador aparece un cero en el semiplano derecho que limita el ancho de banda del lazo: un compensador mal calculado oscila o se dispara antes de arrancar.',
      en: 'Holding 24 V steady from an input that can be above or below the output (battery, panel or automotive bus) means switching from buck to boost without jumps. In boost mode a right-half-plane zero appears that limits the loop bandwidth: a badly computed compensator oscillates or trips before it starts.',
    },
    impact: {
      es: 'Reproducir el informe en simulación antes de fabricar la placa encontró seis puntos que habrían aparecido recién en el laboratorio, con el riesgo de dañar MOSFET. El diseño revisado queda con margen de fase y de ganancia en todo el rango de entrada y resiste los escenarios probados.',
      en: 'Reproducing the report in simulation before building the board found six points that would only have shown up in the lab, at the risk of damaging MOSFETs. The revised design keeps phase and gain margin over the whole input range and survives the scenarios tested.',
    },
    solution: {
      es: 'El informe de ingeniería cubre un convertidor de 120 W a 250 kHz: dimensionamiento (inductor de 6,8 µH, 470 µF de salida, pérdidas del MOSFET BSC050N04LSG), modelo de pequeña señal con el cero del semiplano derecho en 13,7 kHz, compensador de tipo III discretizado con Tustin, una variable de control única u que modula la rama buck hasta 0,9 y luego la boost, firmware en C para el STM32G474 (HRTIM de 184 ps, compensador 3P3Z en el FMAC y protección de 20 A con COMP1 + DAC), lista de materiales y protocolo de puesta en marcha. La página lo reproduce en JavaScript: calculadora que devuelve las once cifras del informe, Bode con margen de fase y de ganancia en vivo para cualquier entrada, sintonizador de ceros y polos con los coeficientes listos para el firmware, y un simulador de lazo cerrado (modelo promediado, RK4, retardo de una muestra) con arranque, escalón de carga de 0,5 a 4,5 A, escalón y barrido de entrada, cortocircuito y pérdida de carga. Al reproducirlo aparecieron seis puntos: los coeficientes del código C no son la salida del script de síntesis y, usados con el error en voltios, dejan el lazo inestable (margen de fase negativo); el margen de fase real es de 28 a 42° y no de más de 50°; el piso de u = 0,08 dispara la protección de 20 A en el arranque con 36 V; el hundimiento de 150 mV en el escalón de carga no es alcanzable con 470 µF (la simulación da unos 0,5 V); el tiempo muerto de 68 cuentas son 12,5 ns y no 50 ns; y la tabla de rizado no coincide con el cálculo. El compensador revisado da 54 a 61° de margen de fase entre 9 y 36 V y supera todos los escenarios. Las 18 pruebas comparan la síntesis con el script original ejecutado con scipy (coincide hasta el sexto dígito) y verifican cada escenario. Es un diseño y una simulación: no hay prototipo medido, y el modelo promediado no incluye pérdidas de conmutación ni saturación del inductor.',
      en: 'The engineering report covers a 120 W converter at 250 kHz: sizing (6.8 µH inductor, 470 µF output, BSC050N04LSG MOSFET losses), a small-signal model with the right-half-plane zero at 13.7 kHz, a type III compensator discretized with Tustin, a single control variable u that modulates the buck leg up to 0.9 and then the boost leg, C firmware for the STM32G474 (184 ps HRTIM, 3P3Z compensator on the FMAC and 20 A protection with COMP1 + DAC), a bill of materials and a bring-up protocol. The page reproduces it in JavaScript: a calculator that returns the report\'s eleven figures, a Bode plot with live phase and gain margin for any input, a zero-and-pole tuner with coefficients ready for the firmware, and a closed-loop simulator (averaged model, RK4, one-sample delay) with start-up, a 0.5 to 4.5 A load step, input step and sweep, short circuit and load loss. Reproducing it surfaced six points: the C code coefficients are not the output of the synthesis script and, used with the error in volts, leave the loop unstable (negative phase margin); the real phase margin is 28 to 42°, not above 50°; the u = 0.08 floor trips the 20 A protection at start-up with 36 V; the 150 mV load-step undershoot is not reachable with 470 µF (the simulation gives about 0.5 V); the 68-tick dead time is 12.5 ns, not 50 ns; and the ripple table does not match the calculation. The revised compensator gives 54 to 61° of phase margin from 9 to 36 V and passes every scenario. The 18 tests compare the synthesis with the original script run with scipy (matching to the sixth digit) and verify each scenario. It is a design and a simulation: there is no measured prototype, and the averaged model leaves out switching losses and inductor saturation.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '18' },
      { label: { es: 'Margen de fase tras la revisión', en: 'Phase margin after review' }, value: '54–61°' },
      { label: { es: 'Prototipo medido', en: 'Measured prototype' }, value: { es: 'pendiente', en: 'pending' } },
    ],
    diagram: {
      nodes: [
        { label: 'ADC', sub: 'Vin · Vout · IL' },
        { label: { es: 'Compensador', en: 'Compensator' }, sub: '3P3Z · FMAC' },
        { label: 'HRTIM', sub: { es: 'PWM A/B · 184 ps', en: 'PWM A/B · 184 ps' } },
        { label: { es: 'Etapa de potencia', en: 'Power stage' }, sub: { es: '4 MOSFET · 250 kHz', en: '4 MOSFETs · 250 kHz' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'sensado', en: 'sensing' } },
    },
    tools: { hardware: ['STM32G474RE', 'BSC050N04LSG', 'UCC27282', 'INA240'], software: ['C (LL)', 'Python (scipy)', 'JavaScript', 'Canvas', 'node:test'] },
  },
  {
    slug: 'pendulo-invertido-pid-lqr',
    title: {
      es: 'Péndulo invertido sobre carro: control PID frente a LQR con física no lineal',
      en: 'Inverted Pendulum on a Cart: PID vs LQR Control on Nonlinear Physics',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/pendulo-invertido-pid-lqr.jpg',
    demo: { src: '/demos/pendulo-invertido-pid-lqr/index.html' },
    resultBadge: {
      es: 'LQR y PID recuperan hasta 0,9 rad con 30 N; el LQR se desvía menos ante un empujón',
      en: 'LQR and PID recover up to 0.9 rad with 30 N; LQR deviates less after a push',
    },
    summary: {
      es: 'Un carro con un péndulo invertido cae en menos de 1,5 s si nadie lo controla. Aquí lo estabilizan un PID de ángulo con PD de posición y un LQR cuya ganancia sale de resolver la ecuación de Riccati, a 100 Hz sobre una física no lineal integrada con RK4 a 500 Hz. Se puede empujar, agregar ruido al sensor, limitar la fuerza y medir la región de atracción.',
      en: 'A cart with an inverted pendulum falls in under 1.5 s if nobody controls it. Here a PID on the angle with a PD on position and an LQR whose gain comes from solving the Riccati equation stabilize it, at 100 Hz on nonlinear physics integrated with RK4 at 500 Hz. You can push it, add sensor noise, limit the force and measure the region of attraction.',
    },
    stack: ['JavaScript', 'Canvas 2D', { es: 'Control LQR', en: 'LQR control' }, 'PID', 'RK4', 'node:test'],
    challenge: {
      es: 'Un péndulo invertido es inestable y de fase no mínima: para recuperar la vertical el carro tiene que alejarse primero. Un control digital con retención de orden cero, ruido en el sensor y fuerza limitada puede perderlo con facilidad.',
      en: 'An inverted pendulum is unstable and non-minimum phase: to recover the vertical the cart has to move away first. A digital controller with zero-order hold, sensor noise and limited force can easily lose it.',
    },
    impact: {
      es: 'Comparar dos controles sobre el mismo modelo muestra qué ofrece cada uno: el LQR sale de una optimización y se desvía menos; el PID es más simple pero necesita el lazo de posición o el carro se escapa de la pista.',
      en: 'Comparing two controllers on the same model shows what each one offers: the LQR comes from an optimization and deviates less; the PID is simpler but needs the position loop or the cart runs off the track.',
    },
    solution: {
      es: 'Modelo de Euler-Lagrange del informe (carro de 1 kg, péndulo de 0,1 kg a 0,5 m), RK4 a 500 Hz y control a 100 Hz con retención de orden cero. Una prueba de energía (deriva < 1e-7 en 10 s) confirma que las ecuaciones del informe son coherentes. El LQR resuelve la ecuación de Riccati integrándola hasta el régimen (residuo ≈ 1e-11; K = [−10,0; −12,5; −82,3; −19,7]). Ambos controles recuperan hasta 0,9 rad con 30 N y fallan con 1,2 rad; ante un empujón de 10 N con ruido de 0,002 rad el ángulo máximo es de 0,029 rad con LQR y 0,044 rad con PID. Sin el lazo de posición, el PID estabiliza el ángulo pero el carro se desliza y sale de la pista. Hay región de atracción calculada en vivo, ruido, empujones y límite de fuerza ajustable. Las ganancias del PID, las matrices Q y R, los 30 N y la pista de ±2,5 m son elecciones mías: el informe no las da. Simulado: sin hardware ni prototipo.',
      en: 'Euler-Lagrange model from the report (1 kg cart, 0.1 kg pendulum at 0.5 m), RK4 at 500 Hz and 100 Hz control with zero-order hold. An energy test (drift < 1e-7 over 10 s) confirms the report\'s equations are consistent. The LQR solves the Riccati equation by integrating it to steady state (residual ≈ 1e-11; K = [−10.0, −12.5, −82.3, −19.7]). Both controllers recover up to 0.9 rad with 30 N and fail at 1.2 rad; after a 10 N push with 0.002 rad noise the peak angle is 0.029 rad with LQR and 0.044 rad with PID. Without the position loop the PID holds the angle but the cart drifts off the track. There is a live region-of-attraction calculation, noise, pushes and an adjustable force limit. The PID gains, the Q and R matrices, the 30 N and the ±2.5 m track are my choices: the report does not give them. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '14' },
      { label: { es: 'Ángulo inicial recuperable', en: 'Recoverable initial angle' }, value: '0,9 rad' },
      { label: { es: 'Residuo de la ecuación de Riccati', en: 'Riccati equation residual' }, value: '≈ 1e-11' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Sensor', en: 'Sensor' }, sub: 'θ, x · ruido' },
        { label: { es: 'Control', en: 'Controller' }, sub: 'LQR / PID · 100 Hz' },
        { label: { es: 'Actuador', en: 'Actuator' }, sub: { es: 'fuerza ≤ 30 N', en: 'force ≤ 30 N' } },
        { label: { es: 'Física', en: 'Physics' }, sub: 'RK4 · 500 Hz' },
      ],
      feedback: { from: 3, to: 0, label: { es: 'estado', en: 'state' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'sintonizador-bode-nyquist',
    title: {
      es: 'Sintonizador de Bode y Nyquist en tiempo real con polos y ceros arrastrables',
      en: 'Real-Time Bode and Nyquist Tuner with Draggable Poles and Zeros',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/sintonizador-bode-nyquist.jpg',
    demo: { src: '/demos/sintonizador-bode-nyquist/index.html' },
    resultBadge: {
      es: 'Márgenes de ganancia y de fase iguales a la solución analítica',
      en: 'Gain and phase margins equal to the analytic solution',
    },
    summary: {
      es: 'Arrastra polos y ceros en el plano s y mira al instante el diagrama de Bode (500 puntos entre 10⁻² y 10⁵ rad/s), el de Nyquist, los márgenes de ganancia y de fase, los polos del lazo cerrado y la respuesta al escalón.',
      en: 'Drag poles and zeros on the s-plane and instantly see the Bode plot (500 points between 10⁻² and 10⁵ rad/s), the Nyquist plot, gain and phase margins, closed-loop poles and the step response.',
    },
    stack: ['JavaScript', 'Canvas 2D', { es: 'Teoría de control', en: 'Control theory' }, 'Bode', 'Nyquist', 'node:test'],
    challenge: {
      es: 'Sintonizar un lazo a ojo es un ejercicio de prueba y error. Para entender márgenes y estabilidad hay que ver cómo cada polo y cada cero cambia la curva, y que el resultado sea exacto, no aproximado.',
      en: 'Tuning a loop by eye is trial and error. To understand margins and stability you have to see how each pole and zero changes the curve, and the result has to be exact, not approximate.',
    },
    impact: {
      es: 'Una herramienta de práctica para ver al instante qué le pasa a la estabilidad al mover un polo o al subir la ganancia, con la respuesta al escalón calculada de forma exacta.',
      en: 'A practice tool to see immediately what happens to stability when a pole moves or the gain goes up, with the step response computed exactly.',
    },
    solution: {
      es: 'Sistema en forma cero-polo-ganancia como en el informe, con polos y ceros reales o complejos conjugados que se arrastran con el ratón, ejemplos listos (lazo clásico, segundo orden, PID, adelanto y un cero en el semiplano derecho) y realimentación unitaria opcional. La respuesta en frecuencia evalúa el producto de factores; la fase se desenrolla partiendo de su rama natural; los márgenes se buscan por cruces de 0 dB y de −180°. Las raíces salen de Durand-Kerner y el escalón de la exponencial de una matriz en forma canónica controlable (exacto, sin paso de integración). Se verifica contra soluciones analíticas: para K/[s(s+1)(s+2)] el margen de ganancia es 20·log10(6/K) en ω = √2 (15,56 dB con K = 1) y con K = 6 los polos cerrados quedan en ±j√2; el segundo orden con ζ = 0,5 da un sobreimpulso de 16,3 %; el cero en el semiplano derecho produce subimpulso. 11 pruebas. El informe habla de «transformada Z inversa implícita»: aquí se usa la exponencial de matriz, que es exacta. Simulado: sin hardware ni prototipo.',
      en: 'Zero-pole-gain system as in the report, with real or complex-conjugate poles and zeros dragged with the mouse, ready examples (classic loop, second order, PID, lead and a right-half-plane zero) and optional unity feedback. The frequency response evaluates the product of factors; the phase is unwrapped starting from its natural branch; margins are found from 0 dB and −180° crossings. Roots come from Durand-Kerner and the step response from the matrix exponential of a controllable canonical form (exact, no integration step). It is verified against analytic solutions: for K/[s(s+1)(s+2)] the gain margin is 20·log10(6/K) at ω = √2 (15.56 dB with K = 1) and with K = 6 the closed-loop poles sit at ±j√2; a second order with ζ = 0.5 gives a 16.3 % overshoot; the right-half-plane zero produces undershoot. 11 tests. The report speaks of an «implicit inverse Z-transform»: here the matrix exponential is used, which is exact. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '11' },
      { label: { es: 'Puntos por barrido', en: 'Points per sweep' }, value: '500' },
      { label: { es: 'Margen de ganancia verificado (K = 1)', en: 'Verified gain margin (K = 1)' }, value: '15,56 dB' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Polos y ceros', en: 'Poles and zeros' }, sub: { es: 'plano s', en: 's-plane' } },
        { label: { es: 'Respuesta en frecuencia', en: 'Frequency response' }, sub: '500 pts' },
        { label: { es: 'Márgenes', en: 'Margins' }, sub: 'GM · PM' },
        { label: { es: 'Lazo cerrado', en: 'Closed loop' }, sub: { es: 'escalón exacto', en: 'exact step' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'ajuste', en: 'tuning' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'brazo-robotico-4gdl',
    title: {
      es: 'Brazo robótico de 4 GDL: cinemática directa e inversa con Denavit-Hartenberg',
      en: '4-DOF Robot Arm: Forward and Inverse Kinematics with Denavit-Hartenberg',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/brazo-robotico-4gdl.jpg',
    demo: { src: '/demos/brazo-robotico-4gdl/index.html' },
    resultBadge: {
      es: 'Cinemática inversa: ≥ 99 % de 300 destinos a menos de 0,5 mm',
      en: 'Inverse kinematics: ≥ 99 % of 300 targets within 0.5 mm',
    },
    summary: {
      es: 'Manipulador articulado de cuatro grados de libertad con la tabla Denavit-Hartenberg del informe. En modo directo se mueven las articulaciones; en modo inverso se fija un punto del espacio y el brazo lo alcanza con mínimos cuadrados amortiguados, con o sin cabeceo fijo de la herramienta. Hay vista lateral, vista superior y el espacio de trabajo.',
      en: 'Four-degree-of-freedom articulated manipulator with the report\'s Denavit-Hartenberg table. In forward mode the joints are moved; in inverse mode a point in space is fixed and the arm reaches it with damped least squares, with or without a fixed tool pitch. There are side and top views and the workspace.',
    },
    stack: ['JavaScript', 'Canvas 2D', 'Denavit-Hartenberg', 'DLS', { es: 'Robótica', en: 'Robotics' }, 'node:test'],
    challenge: {
      es: 'Con cuatro articulaciones y tres condiciones de posición sobra un grado de libertad, y cerca de la singularidad (brazo estirado) el jacobiano pierde rango y los métodos ingenuos dan saltos enormes o se quedan en mínimos locales.',
      en: 'With four joints and three position conditions one degree of freedom is left over, and near the singularity (arm stretched) the Jacobian loses rank and naive methods jump wildly or get stuck in local minima.',
    },
    impact: {
      es: 'Muestra cómo se llega a un punto, qué pasa en los límites articulares y fuera del alcance, y deja una cinemática inversa robusta y probada.',
      en: 'It shows how a point is reached, what happens at joint limits and out of reach, and leaves a robust, tested inverse kinematics.',
    },
    solution: {
      es: 'Cinemática directa con las matrices D-H del informe (d1 = 0,20 m; a2 = 0,40; a3 = 0,30; a4 = 0,15; α1 = π/2), verificada contra la fórmula plana cerrada en 500 configuraciones aleatorias y con rotaciones ortonormales. El jacobiano de posición analítico (3×4) coincide con las diferencias finitas. La cinemática inversa usa DLS con paso limitado a 0,3 rad, límites articulares, base alineada con el destino y reintentos con otras posturas de codo (incluida «hacia atrás»): de 300 destinos alcanzables aleatorios, ≥ 99 % queda a menos de 0,5 mm; un destino fuera de alcance se aproxima sin diverger. Opcionalmente fija el cabeceo (q2+q3+q4). El código del informe arma el jacobiano como 4×3 y lo usa como 3×4, con una inversión de 3×3 sobre una matriz de 4×4: aquí las dimensiones son las correctas. Los límites articulares son míos. 11 pruebas. Simulado: sin hardware ni prototipo.',
      en: 'Forward kinematics with the report\'s D-H matrices (d1 = 0.20 m; a2 = 0.40; a3 = 0.30; a4 = 0.15; α1 = π/2), verified against the closed planar formula on 500 random configurations and with orthonormal rotations. The analytic position Jacobian (3×4) matches finite differences. Inverse kinematics uses DLS with step limited to 0.3 rad, joint limits, base aligned to the target and retries with other elbow postures (including «backwards»): out of 300 random reachable targets, ≥ 99 % land within 0.5 mm; an out-of-reach target is approached without diverging. It can optionally fix the pitch (q2+q3+q4). The report\'s code builds the Jacobian as 4×3 and uses it as 3×4, with a 3×3 inversion on a 4×4 matrix: here the dimensions are correct. The joint limits are mine. 11 tests. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '11' },
      { label: { es: 'Destinos alcanzados (300 al azar)', en: 'Targets reached (300 random)' }, value: '≥ 99 %' },
      { label: { es: 'Alcance máximo', en: 'Maximum reach' }, value: '0,85 m' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Objetivo', en: 'Target' }, sub: 'x, y, z' },
        { label: 'DLS', sub: { es: 'jacobiano 3×4', en: '3×4 Jacobian' } },
        { label: { es: 'Articulaciones', en: 'Joints' }, sub: 'q1…q4 · límites' },
        { label: { es: 'Cinemática directa', en: 'Forward kinematics' }, sub: 'D-H' },
      ],
      feedback: { from: 3, to: 1, label: { es: 'error', en: 'error' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'simulador-convertidor-dcdc',
    title: {
      es: 'Convertidor DC-DC buck y boost con osciloscopio, parásitos y modos CCM/DCM',
      en: 'Buck and Boost DC-DC Converter with Oscilloscope, Parasitics and CCM/DCM Modes',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'embedded',
    year: 2026,
    image: '/projects/simulador-convertidor-dcdc.jpg',
    demo: { src: '/demos/simulador-convertidor-dcdc/index.html' },
    resultBadge: {
      es: 'Balance de energía a menos de 1 % y fórmulas ideales a menos de 2 %',
      en: 'Energy balance within 1 % and ideal formulas within 2 %',
    },
    summary: {
      es: 'Simulación de un convertidor reductor o elevador de lazo abierto con resistencia del inductor, RDS(on), ESR y caída del diodo, con 200 puntos por periodo de conmutación. Se ve cómo pasa de conducción continua a discontinua, el rizado, la eficiencia, el arranque y el balance de pérdidas.',
      en: 'Simulation of an open-loop buck or boost converter with inductor resistance, RDS(on), ESR and diode drop, with 200 points per switching period. You see the transition from continuous to discontinuous conduction, the ripple, efficiency, start-up and the loss budget.',
    },
    stack: [{ es: 'Electrónica de potencia', en: 'Power electronics' }, 'RK4', 'CCM / DCM', 'JavaScript', 'Canvas 2D', 'node:test'],
    challenge: {
      es: 'Los parásitos y el modo de conducción cambian por completo la tensión de salida: con carga ligera un buck deja de seguir Vout = D·Vin. Hace falta un modelo que lo muestre y que se pueda comprobar contra la teoría.',
      en: 'Parasitics and conduction mode completely change the output voltage: at light load a buck stops following Vout = D·Vin. A model is needed that shows it and can be checked against theory.',
    },
    impact: {
      es: 'Sirve para ver por qué un convertidor real entrega menos que el ideal, cuánto pierde cada elemento y dónde está la frontera entre los dos modos.',
      en: 'It shows why a real converter delivers less than the ideal, how much each element loses and where the boundary between the two modes lies.',
    },
    solution: {
      es: 'Ecuaciones del informe para el buck (L = 100 µH, DCR = 45 mΩ, C = 220 µF, ESR = 15 mΩ, 100 kHz, RDS(on) = 25 mΩ) y el mismo motor para el boost, con RK4 y las fases ON y OFF subdivididas por separado para que el ciclo sea exacto. El informe integra con Euler explícito. Se verifica con Vout = D·Vin y Vin/(1 − D) en CCM, el rizado de corriente y de tensión, la frontera CCM/DCM (L crítica) y la tensión en DCM, todo a menos de 2 %, y con un balance de energía: la potencia de entrada menos la de salida coincide con las pérdidas contabilizadas (DCR, RDS, diodo, ESR) a menos de 1 %. El caso por defecto (12 V → 5 V, D = 0,42) entrega 4,70 V con 93,2 % de eficiencia frente a 5,04 V del ideal; en carga ligera pasa a DCM. Modelo de lazo abierto sin tiempos muertos, sin capacidades parásitas ni saturación del inductor. El diodo (0,5 V) es mío. 11 pruebas. Simulado: sin hardware ni prototipo.',
      en: 'Report equations for the buck (L = 100 µH, DCR = 45 mΩ, C = 220 µF, ESR = 15 mΩ, 100 kHz, RDS(on) = 25 mΩ) and the same engine for the boost, with RK4 and the ON and OFF phases subdivided separately so the duty cycle is exact. The report integrates with explicit Euler. It is verified with Vout = D·Vin and Vin/(1 − D) in CCM, the current and voltage ripple, the CCM/DCM boundary (critical L) and the DCM voltage, all within 2 %, and with an energy balance: input power minus output power matches the accounted losses (DCR, RDS, diode, ESR) within 1 %. The default case (12 V → 5 V, D = 0.42) delivers 4.70 V at 93.2 % efficiency versus 5.04 V ideal; at light load it moves to DCM. Open-loop model with no dead times, no parasitic capacitances and no inductor saturation. The diode (0.5 V) is mine. 11 tests. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '11' },
      { label: { es: 'Error del balance de energía', en: 'Energy balance error' }, value: '< 1 %' },
      { label: { es: 'Error frente a las fórmulas ideales', en: 'Error versus ideal formulas' }, value: '< 2 %' },
    ],
    diagram: {
      nodes: [
        { label: 'Vin · D', sub: { es: 'ciclo de trabajo', en: 'duty cycle' } },
        { label: { es: 'Interruptor + diodo', en: 'Switch + diode' }, sub: 'ON / OFF' },
        { label: 'L · C', sub: { es: 'con parásitos', en: 'with parasitics' } },
        { label: { es: 'Carga', en: 'Load' }, sub: 'Vout · η' },
      ],
      feedback: { from: 3, to: 2, label: { es: 'corriente', en: 'current' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'espectrograma-fft-blackman-harris',
    title: {
      es: 'Espectrograma y analizador FFT en cascada con ventana Blackman-Harris',
      en: 'Spectrogram and Waterfall FFT Analyzer with Blackman-Harris Window',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'instrumentation',
    year: 2026,
    image: '/projects/espectrograma-fft-blackman-harris.jpg',
    demo: { src: '/demos/espectrograma-fft-blackman-harris/index.html' },
    resultBadge: {
      es: 'Un tono 66 dB más débil se ve con Blackman-Harris y lo tapa la ventana rectangular',
      en: 'A tone 66 dB weaker shows with Blackman-Harris and is hidden by the rectangular window',
    },
    summary: {
      es: 'Transformada de Fourier de tiempo corto (N = 2048, solape de 75 %) con una FFT radix-2 propia y ventana Blackman-Harris. Se eligen señales sintéticas (tonos, chirp, ráfaga de ruido, voz sintética) y se comparan ventanas; al pasar el ratón por el espectrograma se ve el espectro de esa trama.',
      en: 'Short-time Fourier transform (N = 2048, 75 % overlap) with a custom radix-2 FFT and a Blackman-Harris window. Synthetic signals are chosen (tones, chirp, noise burst, synthetic voice) and windows compared; hovering the spectrogram shows that frame\'s spectrum.',
    },
    stack: ['FFT', 'STFT', 'Blackman-Harris', 'JavaScript', 'Canvas 2D', 'node:test'],
    challenge: {
      es: 'La fuga espectral de una ventana mala esconde las señales débiles junto a las fuertes. Para medir bien hay que conocer la ventana, la resolución y su rango dinámico, y que la FFT sea correcta.',
      en: 'Spectral leakage from a poor window hides weak signals next to strong ones. To measure well you need to know the window, the resolution and its dynamic range, and the FFT must be correct.',
    },
    impact: {
      es: 'Deja ver, con números, qué aporta cada ventana y qué resolución en frecuencia y en tiempo se obtiene con cada frecuencia de muestreo.',
      en: 'It shows, with numbers, what each window offers and what frequency and time resolution each sample rate gives.',
    },
    solution: {
      es: 'FFT Cooley-Tukey en sitio como en el informe, verificada contra la DFT directa a 1e-9, con el teorema de Parseval y con el nivel de 0 dBFS de un tono centrado en un bin. Con los coeficientes de Blackman-Harris del informe, todo lo que está a más de 5 bins de un tono queda por debajo de −90 dB; un tono 66 dB más débil a 20 bins se distingue con esa ventana y queda tapado con la rectangular. El espectro usa interpolación parabólica para el pico (error < 3 Hz). 465 FFT de 2048 puntos se calculan en unos 70 ms. El informe da una resolución de 23,4 Hz (que corresponde a 48 kHz) con un paso de 11,6 ms (que corresponde a 44,1 kHz): son frecuencias de muestreo distintas; con 48 kHz son 23,44 Hz y 10,67 ms, con 44,1 kHz 21,53 Hz y 11,61 ms. No usa micrófono, Web Audio ni WebGL2: las señales son sintéticas y el espectrograma se dibuja en Canvas 2D. 13 pruebas. Simulado: sin hardware ni prototipo.',
      en: 'In-place Cooley-Tukey FFT as in the report, verified against the direct DFT to 1e-9, with Parseval\'s theorem and with the 0 dBFS level of a bin-centred tone. With the report\'s Blackman-Harris coefficients, everything more than 5 bins from a tone stays below −90 dB; a tone 66 dB weaker at 20 bins is distinguishable with that window and hidden with the rectangular one. The spectrum uses parabolic interpolation for the peak (error < 3 Hz). 465 FFTs of 2048 points take about 70 ms. The report gives a 23.4 Hz resolution (which corresponds to 48 kHz) with an 11.6 ms step (which corresponds to 44.1 kHz): those are different sample rates; at 48 kHz they are 23.44 Hz and 10.67 ms, at 44.1 kHz 21.53 Hz and 11.61 ms. It does not use a microphone, Web Audio or WebGL2: the signals are synthetic and the spectrogram is drawn on Canvas 2D. 13 tests. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '13' },
      { label: { es: 'Lóbulos laterales de la ventana', en: 'Window sidelobes' }, value: '< −90 dB' },
      { label: { es: 'Resolución con 48 kHz y N = 2048', en: 'Resolution at 48 kHz, N = 2048' }, value: '23,44 Hz' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Señal', en: 'Signal' }, sub: { es: 'sintética', en: 'synthetic' } },
        { label: { es: 'Ventana', en: 'Window' }, sub: 'Blackman-Harris' },
        { label: 'FFT', sub: 'radix-2 · N = 2048' },
        { label: { es: 'Espectrograma', en: 'Spectrogram' }, sub: 'dBFS · hop 512' },
      ],
      feedback: { from: 3, to: 1, label: { es: 'comparar ventanas', en: 'compare windows' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'comandos-de-voz-mfcc',
    title: {
      es: 'Reconocimiento de comandos de voz: MFCC y clasificador pequeño (TinyML)',
      en: 'Voice Command Recognition: MFCC and a Small Classifier (TinyML)',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'ai',
    year: 2026,
    image: '/projects/comandos-de-voz-mfcc.jpg',
    demo: { src: '/demos/comandos-de-voz-mfcc/index.html' },
    resultBadge: {
      es: '100 % con sonidos nuevos a 20 dB de ruido y 77 % a 0 dB (sonidos sintéticos)',
      en: '100 % on new sounds at 20 dB SNR and 77 % at 0 dB (synthetic sounds)',
    },
    summary: {
      es: 'El pipeline de extracción de características del informe completo (pre-énfasis, tramas de 40 ms, FFT, 40 filtros Mel, log-energías y DCT) que produce un tensor de 49 × 10, y un clasificador pequeño entrenado en la propia página que reconoce seis «comandos» sintéticos. No es voz humana ni la red DS-CNN del informe.',
      en: 'The report\'s full feature-extraction pipeline (pre-emphasis, 40 ms frames, FFT, 40 Mel filters, log-energies and DCT) producing a 49 × 10 tensor, and a small classifier trained on the page itself that recognizes six synthetic «commands». It is neither human speech nor the report\'s DS-CNN.',
    },
    stack: ['MFCC', 'Mel', 'TinyML', { es: 'Clasificador softmax', en: 'Softmax classifier' }, 'JavaScript', 'node:test'],
    challenge: {
      es: 'Reconocer comandos en un microcontrolador exige un front-end de audio preciso y un modelo diminuto. Antes de pensar en la red hay que comprobar que las características separan bien los sonidos y cómo se degradan con el ruido.',
      en: 'Recognizing commands on a microcontroller demands a precise audio front-end and a tiny model. Before thinking about the network you must check that the features separate sounds well and how they degrade with noise.',
    },
    impact: {
      es: 'Muestra de punta a punta cómo se pasa de una forma de onda a un tensor y a una decisión, y mide la robustez al ruido.',
      en: 'It shows end to end how a waveform becomes a tensor and a decision, and measures robustness to noise.',
    },
    solution: {
      es: 'Lo del informe: escala Mel M(f) = 2595·log10(1 + f/700), banco de filtros construido como en su script de Python, pre-énfasis de 0,97, ventana de 40 ms cada 20 ms (49 tramas en 1 s a 16 kHz) y DCT-II con 10 coeficientes; cada pieza tiene su prueba (banco, ortogonalidad de la DCT, un tono de 1 kHz cae en el filtro correcto). Lo mío: el clasificador es una regresión softmax de 198 parámetros sobre 32 características (nivel, duración y la media de las MFCC en tres tramos de la zona activa) entrenada con sonidos sintéticos (barrido ascendente y descendente, doble pitido, alarma, ráfaga de ruido, silencio). Con 120 sonidos nuevos a 20 dB acierta el 100 %; con 5 dB, 100 %; con 0 dB, 77 %. NO es la DS-CNN con TensorFlow Lite for Microcontrollers del informe, no usa WebAssembly ni voz humana: con palabras reales haría falta un conjunto de datos como Speech Commands, una red convolucional entrenada con él y cuantización. 11 pruebas. Simulado: sin hardware ni prototipo.',
      en: 'From the report: Mel scale M(f) = 2595·log10(1 + f/700), a filter bank built as in its Python script, 0.97 pre-emphasis, 40 ms windows every 20 ms (49 frames in 1 s at 16 kHz) and a 10-coefficient DCT-II; each piece has its test (bank, DCT orthogonality, a 1 kHz tone lands in the right filter). Mine: the classifier is a 198-parameter softmax regression over 32 features (level, duration and the mean MFCC in three segments of the active region) trained on synthetic sounds (rising and falling sweep, double beep, alarm, noise burst, silence). With 120 new sounds at 20 dB it scores 100 %; at 5 dB, 100 %; at 0 dB, 77 %. It is NOT the report\'s DS-CNN with TensorFlow Lite for Microcontrollers, uses no WebAssembly and no human speech: with real words you would need a data set like Speech Commands, a convolutional network trained on it and quantization. 11 tests. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '11' },
      { label: { es: 'Exactitud con sonidos nuevos (20 dB)', en: 'Accuracy on new sounds (20 dB)' }, value: '100 %' },
      { label: { es: 'Exactitud con 0 dB de relación señal/ruido', en: 'Accuracy at 0 dB SNR' }, value: '77 %' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Audio', en: 'Audio' }, sub: '16 kHz · 1 s' },
        { label: 'MFCC', sub: '49 × 10' },
        { label: { es: 'Características', en: 'Features' }, sub: { es: '32 por sonido', en: '32 per sound' } },
        { label: { es: 'Clasificador', en: 'Classifier' }, sub: 'softmax · 6 clases' },
      ],
      feedback: { from: 3, to: 0, label: { es: 'ruido', en: 'noise' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'gemelo-digital-nodo-iot',
    title: {
      es: 'Gemelo digital de un nodo sensor IoT: actitud, temperatura y telemetría binaria',
      en: 'Digital Twin of an IoT Sensor Node: Attitude, Temperature and Binary Telemetry',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'embedded',
    year: 2026,
    image: '/projects/gemelo-digital-nodo-iot.jpg',
    demo: { src: '/demos/gemelo-digital-nodo-iot/index.html' },
    resultBadge: {
      es: 'Error de pitch de 0,8° (el acelerómetro solo, 2,9°) y mensajes 6 veces más cortos que JSON',
      en: 'Pitch error of 0.8° (accelerometer alone, 2.9°) and messages 6 times shorter than JSON',
    },
    summary: {
      es: 'Una placa con IMU se mueve y su gemelo estima la actitud (pitch y roll) con un filtro complementario y la temperatura con un modelo térmico RC. Cada muestra se codifica como un mensaje binario tipo Protocol Buffers de 21 bytes (JSON equivalente: 126). La placa se dibuja en isométrico en Canvas 2D.',
      en: 'A board with an IMU moves and its twin estimates attitude (pitch and roll) with a complementary filter and temperature with an RC thermal model. Each sample is encoded as a 21-byte Protocol Buffers-style binary message (equivalent JSON: 126). The board is drawn isometrically on Canvas 2D.',
    },
    stack: [
      { es: 'Filtro complementario', en: 'Complementary filter' },
      'IMU',
      'IoT',
      'Protocol Buffers',
      'JavaScript',
      'node:test',
    ],
    challenge: {
      es: 'El giroscopio deriva y el acelerómetro es ruidoso y se confunde con las vibraciones. Además, enviar telemetría a 50 Hz en texto desperdicia ancho de banda.',
      en: 'The gyroscope drifts and the accelerometer is noisy and confused by vibration. Also, sending 50 Hz telemetry as text wastes bandwidth.',
    },
    impact: {
      es: 'Muestra por qué se mezclan los dos sensores, cuánto cuesta el sesgo del giroscopio y cuánto ahorra una codificación binaria.',
      en: 'It shows why the two sensors are blended, what the gyroscope bias costs and how much a binary encoding saves.',
    },
    solution: {
      es: 'Filtro complementario θ = α(θ + ω·dt) + (1 − α)·θ_acel con α = 0,98 a 50 Hz (constante de tiempo de 0,98 s) y térmica T = T_amb + P·Rth·(1 − e^(−t/τ)) con Rth = 45,2 K/W, Cth = 0,12 J/K (τ = 5,42 s), como en el informe. Las pruebas verifican la constante de tiempo exacta, el error por sesgo b·τ, la reducción de ruido unas 10 veces, la solución térmica a 0,3 % y un codificador de varint y zigzag escrito a mano (150 → 0x96 0x01). Con los valores por defecto el error RMS de pitch es 0,83° con el complementario, 2,9° con el acelerómetro solo y 22° con el giroscopio solo. El mensaje de 21 bytes ocupa el 17 % del JSON y a 50 Hz ahorra unos 5 kB/s. No hay Three.js, modelos GLTF, broker WebSocket/MQTT ni hardware: la IMU es sintética y los niveles de ruido y el perfil de potencia son míos. 12 pruebas. Simulado: sin hardware ni prototipo.',
      en: 'Complementary filter θ = α(θ + ω·dt) + (1 − α)·θ_acc with α = 0.98 at 50 Hz (0.98 s time constant) and thermal T = T_amb + P·Rth·(1 − e^(−t/τ)) with Rth = 45.2 K/W, Cth = 0.12 J/K (τ = 5.42 s), as in the report. The tests verify the exact time constant, the bias error b·τ, the roughly 10x noise reduction, the thermal solution within 0.3 % and a hand-written varint and zigzag encoder (150 → 0x96 0x01). With the default values the RMS pitch error is 0.83° with the complementary filter, 2.9° with the accelerometer alone and 22° with the gyroscope alone. The 21-byte message is 17 % of the JSON and at 50 Hz saves about 5 kB/s. There is no Three.js, GLTF models, WebSocket/MQTT broker or hardware: the IMU is synthetic and the noise levels and power profile are mine. 12 tests. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '12' },
      { label: { es: 'Mensaje binario frente a JSON', en: 'Binary message versus JSON' }, value: '21 B / 126 B' },
      {
        label: { es: 'Error RMS del pitch (complementario / acelerómetro)', en: 'RMS pitch error (complementary / accelerometer)' },
        value: '0,83° / 2,9°',
      },
    ],
    diagram: {
      nodes: [
        { label: 'IMU', sub: { es: 'acelerómetro + giroscopio', en: 'accelerometer + gyroscope' } },
        { label: { es: 'Filtro', en: 'Filter' }, sub: 'α = 0,98' },
        { label: { es: 'Modelo térmico', en: 'Thermal model' }, sub: 'Rth · Cth' },
        { label: { es: 'Telemetría', en: 'Telemetry' }, sub: { es: '21 bytes · 50 Hz', en: '21 bytes · 50 Hz' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'muestra', en: 'sample' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'scada-dos-estanques-isa182',
    title: {
      es: 'SCADA de dos estanques con control en cascada y alarmas ISA-18.2',
      en: 'Two-Tank SCADA with Cascade Control and ISA-18.2 Alarms',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/scada-dos-estanques-isa182.jpg',
    demo: { src: '/demos/scada-dos-estanques-isa182/index.html' },
    resultBadge: {
      es: 'Sin anti-windup el nivel rebasa el estanque (≥ 1,95 m); con él, 1,15 m',
      en: 'Without anti-windup the level overflows the tank (≥ 1.95 m); with it, 1.15 m',
    },
    summary: {
      es: 'Dos estanques en serie que se vacían por gravedad (ley de Torricelli) con un PI maestro de nivel que le pide flujo a un PI esclavo que mueve la válvula. Una HMI animada muestra el proceso, cuatro alarmas con retardo y banda muerta siguen los estados ISA-18.2, y hay un enclavamiento por nivel muy alto y escenarios de falla para probarlos.',
      en: 'Two tanks in series draining by gravity (Torricelli\'s law) with a master level PI that requests flow from a slave PI moving the valve. An animated HMI shows the process, four alarms with delay and deadband follow the ISA-18.2 states, and there is a high-high level interlock and fault scenarios to test them.',
    },
    stack: ['SCADA', 'HMI', 'ISA-18.2', { es: 'Control en cascada', en: 'Cascade control' }, 'JavaScript', 'node:test'],
    challenge: {
      es: 'Un control en cascada sin protección contra el windup se descontrola cuando el actuador se satura, y una mala gestión de alarmas inunda al operador de avisos.',
      en: 'A cascade controller without windup protection runs away when the actuator saturates, and poor alarm management floods the operator with notices.',
    },
    impact: {
      es: 'Hace visible la diferencia entre una integral libre y una condicional, y cómo se comporta cada estado de una alarma ISA-18.2.',
      en: 'It makes visible the difference between a free and a conditional integral, and how each ISA-18.2 alarm state behaves.',
    },
    solution: {
      es: 'Ecuaciones de Torricelli, esquema maestro-esclavo y límites de alarma del informe (HH 1,85 m, H 1,60 m, flujo bajo 5 L/min, temperatura alta 65 °C). Las alarmas tienen retardo de activación y banda muerta y los estados activa-sin-reconocer, activa-reconocida y retorno-sin-reconocer; la de flujo bajo se suprime en manual, parada y los primeros 30 s. El código del informe dice «anti-windup» pero solo satura la salida: con la bomba al 30 % la integral del esclavo crece (hasta 37 762) y al restaurarla el nivel rebasa el estanque (≥ 1,95 m); con integración condicional el pico es de 1,15 m y vuelve a 1,0 m. Se verifica el régimen de Torricelli (h2 = 1,000 m con 30 L/min), la conservación del volumen a 0,2 %, el asentamiento del escalón, el arranque sin sobresalto con las integrales precargadas, el enclavamiento y el rearme. Áreas, orificios, válvula, constantes y ganancias de los PI son míos: el informe no los da. 15 pruebas. Simulado: sin hardware ni prototipo.',
      en: 'Torricelli equations, master-slave scheme and alarm limits from the report (HH 1.85 m, H 1.60 m, low flow 5 L/min, high temperature 65 °C). The alarms have an activation delay and a deadband and the active-unacknowledged, active-acknowledged and return-unacknowledged states; the low-flow one is suppressed in manual, stopped and the first 30 s. The report\'s code says «anti-windup» but only saturates the output: with the pump at 30 % the slave integral grows (up to 37,762) and when it is restored the level overflows the tank (≥ 1.95 m); with conditional integration the peak is 1.15 m and it returns to 1.0 m. Verified: the Torricelli steady state (h2 = 1.000 m at 30 L/min), volume conservation within 0.2 %, step settling, bumpless start with preloaded integrals, the interlock and its reset. Areas, orifices, valve, constants and PI gains are mine: the report does not give them. 15 tests. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '15' },
      { label: { es: 'Alarmas ISA-18.2', en: 'ISA-18.2 alarms' }, value: '4' },
      {
        label: {
          es: 'Pico del nivel tras perder la bomba (con / sin anti-windup)',
          en: 'Level peak after losing the pump (with / without anti-windup)',
        },
        value: '1,15 m / ≥ 1,95 m',
      },
    ],
    diagram: {
      nodes: [
        { label: { es: 'PI maestro', en: 'Master PI' }, sub: { es: 'nivel → flujo', en: 'level → flow' } },
        { label: { es: 'PI esclavo', en: 'Slave PI' }, sub: { es: 'flujo → válvula', en: 'flow → valve' } },
        { label: { es: 'Estanques', en: 'Tanks' }, sub: 'Torricelli' },
        { label: { es: 'Alarmas', en: 'Alarms' }, sub: 'ISA-18.2' },
      ],
      feedback: { from: 2, to: 0, label: { es: 'nivel', en: 'level' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'SVG', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'filtros-imagen-canny',
    title: {
      es: 'Filtros de imagen a mano: luminancia BT.709, Gauss, Sobel y detector de bordes Canny',
      en: 'Hand-Written Image Filters: BT.709 Luma, Gauss, Sobel and Canny Edge Detector',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'vision',
    year: 2026,
    image: '/projects/filtros-imagen-canny.jpg',
    demo: { src: '/demos/filtros-imagen-canny/index.html' },
    resultBadge: {
      es: 'Se corrigió un error del informe en la supresión de no-máximos de Canny',
      en: 'A report error in Canny\'s non-maximum suppression was corrected',
    },
    summary: {
      es: 'Cada etapa de un detector de bordes escrita sobre arreglos planos y sin librerías de visión: luminancia BT.709, suavizado gaussiano de 5 × 5, Sobel, supresión de no-máximos e histéresis de doble umbral. Funciona con una escena sintética o con una imagen que subes (se procesa en tu navegador) y mide cada etapa.',
      en: 'Each stage of an edge detector written on flat arrays with no vision libraries: BT.709 luma, 5 × 5 Gaussian smoothing, Sobel, non-maximum suppression and double-threshold hysteresis. It works with a synthetic scene or an image you upload (processed in your browser) and times each stage.',
    },
    stack: ['Canny', 'Sobel', 'BT.709', { es: 'Visión por computador', en: 'Computer vision' }, 'JavaScript', 'node:test'],
    challenge: {
      es: 'Los detectores de bordes parecen simples hasta que se programan: el sentido del gradiente, la supresión de no-máximos y la histéresis esconden errores que no se ven a simple vista.',
      en: 'Edge detectors look simple until you program them: gradient direction, non-maximum suppression and hysteresis hide errors that are not visible at a glance.',
    },
    impact: {
      es: 'Dejó al descubierto que el código de supresión de no-máximos del informe tiene las dos diagonales intercambiadas para su propio operador de Sobel.',
      en: 'It exposed that the report\'s non-maximum suppression code has the two diagonals swapped for its own Sobel operator.',
    },
    solution: {
      es: 'Luminancia 0,2126 R + 0,7152 G + 0,0722 B; convolución con borde replicado; Sobel con la convención del informe (Gy positivo hacia abajo); Canny con histéresis conectada en 8 vecinos. Se verifica el Sobel con escalones y rampas (4·255 = 1020 en un escalón), la reducción de ruido del gaussiano a la suma de cuadrados del núcleo, la histéresis y que sobre un rectángulo todos los bordes caen a ≤ 2 px del contorno con ≥ 95 % de cobertura. La tabla de vecinos del informe corresponde a un eje y hacia arriba: con su Sobel un borde recto a 45° queda el doble de grueso (≈ 3,9 px por fila frente a ≈ 1,9) y en una escena con curvas el contorno se fragmenta (≈ 890 píxeles de borde frente a ≈ 1300 con la versión corregida). Rendimiento medido: 2 a 4 Mpíxel/s, unos 1 a 2 fps equivalentes en 1080p en el hilo principal de JavaScript (el informe plantea 60 fps, que esta versión no alcanza; sin Web Workers ni WebGL). Sin cámara web. 11 pruebas. Simulado: sin hardware ni prototipo.',
      en: 'Luma 0.2126 R + 0.7152 G + 0.0722 B; convolution with replicated border; Sobel with the report\'s convention (Gy positive downward); Canny with 8-neighbour connected hysteresis. Sobel is verified with steps and ramps (4·255 = 1020 on a step), the Gaussian\'s noise reduction to the sum of squares of the kernel, the hysteresis, and that on a rectangle all edges fall within ≤ 2 px of the outline with ≥ 95 % coverage. The report\'s neighbour table corresponds to a y-up axis: with its Sobel a straight 45° edge comes out twice as thick (≈ 3.9 px per row versus ≈ 1.9) and on a scene with curves the outline breaks up (≈ 890 edge pixels versus ≈ 1300 with the corrected version). Measured performance: 2 to 4 Mpixel/s, about 1 to 2 fps equivalent at 1080p on the JavaScript main thread (the report proposes 60 fps, which this version does not reach; no Web Workers or WebGL). No webcam. 11 tests. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '11' },
      { label: { es: 'Rendimiento en JavaScript', en: 'JavaScript throughput' }, value: '2–4 Mpíxel/s' },
      { label: { es: 'Bordes con la supresión del informe', en: 'Edges with the report\'s suppression' }, value: '−31 %' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Imagen', en: 'Image' }, sub: { es: 'RGBA', en: 'RGBA' } },
        { label: { es: 'Suavizado', en: 'Smoothing' }, sub: 'Gauss 5×5' },
        { label: { es: 'Gradiente', en: 'Gradient' }, sub: 'Sobel · NMS' },
        { label: { es: 'Bordes', en: 'Edges' }, sub: { es: 'histéresis', en: 'hysteresis' } },
      ],
      feedback: { from: 3, to: 1, label: { es: 'umbrales', en: 'thresholds' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'distorsion-lente-calibracion',
    title: {
      es: 'Calibración y corrección de distorsión de lente (modelo de Brown-Conrady)',
      en: 'Lens Distortion Calibration and Correction (Brown-Conrady Model)',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'vision',
    year: 2026,
    image: '/projects/distorsion-lente-calibracion.jpg',
    demo: { src: '/demos/distorsion-lente-calibracion/index.html' },
    resultBadge: {
      es: 'Error de reproyección de 0,04 px al calibrar con esquinas de 0,3 px de ruido',
      en: 'Reprojection error of 0.04 px calibrating with corners at 0.3 px noise',
    },
    summary: {
      es: 'Una lente barril o almohadilla curva las rectas. Se eligen los coeficientes radiales y tangenciales, se ve el tablero de ajedrez distorsionado y se corrige con una tabla de consulta inversa y remuestreo bilineal. También se calibra: se «detectan» las esquinas con ruido, se resuelven los coeficientes por mínimos cuadrados y se mide el error de reproyección.',
      en: 'A barrel or pincushion lens bends straight lines. You choose the radial and tangential coefficients, see the distorted checkerboard and correct it with an inverse look-up table and bilinear resampling. It also calibrates: corners are «detected» with noise, the coefficients are solved by least squares and the reprojection error measured.',
    },
    stack: [
      'Brown-Conrady',
      { es: 'Calibración de cámara', en: 'Camera calibration' },
      { es: 'Visión por computador', en: 'Computer vision' },
      { es: 'Mínimos cuadrados', en: 'Least squares' },
      'JavaScript',
      'node:test',
    ],
    challenge: {
      es: 'La distorsión no tiene inversa cerrada y los coeficientes k1 y k2 se confunden entre sí si el patrón de calibración no cubre todo el campo.',
      en: 'Distortion has no closed-form inverse and the k1 and k2 coefficients get confused with each other if the calibration pattern does not cover the whole field.',
    },
    impact: {
      es: 'Muestra cuánto cubre un buen patrón de calibración y la diferencia entre un error de reproyección pequeño y coeficientes bien determinados.',
      en: 'It shows how much a good calibration pattern must cover and the difference between a small reprojection error and well-determined coefficients.',
    },
    solution: {
      es: 'Modelo del informe (k1, k2, k3 radiales; p1, p2 tangenciales), verificado con un valor calculado a mano y con la simetría radial. La inversa se resuelve con Newton (error < 1e-10 en 500 puntos). La corrección usa el mapeo inverso del shader del informe: para cada píxel corregido se calcula su posición en la imagen distorsionada y se interpola bilinealmente, en JavaScript sin WebGL; de punta a punta el tablero corregido reproduce al ideal con un error medio < 12 niveles y las filas de esquinas vuelven a ser rectas (< 0,01 px). La calibración es lineal con la matriz intrínseca y el patrón conocidos y se resuelve con ecuaciones normales: con un tablero de 13 × 9 esquinas y 0,3 px de ruido el error de reproyección es de 0,04 px. Con 9 × 6 esquinas k2 tenía una desviación de ±0,14 y con 13 × 9 baja a ±0,02. No es una calibración de cámara completa (no estima fx, fy, cx, cy ni usa varias vistas) y las esquinas se generan con el modelo, no se detectan en una foto. 11 pruebas. Simulado: sin hardware ni prototipo.',
      en: 'Report model (k1, k2, k3 radial; p1, p2 tangential), verified with a hand-computed value and radial symmetry. The inverse is solved with Newton (error < 1e-10 over 500 points). Correction uses the report\'s shader inverse mapping: for each corrected pixel its position in the distorted image is computed and bilinearly interpolated, in JavaScript without WebGL; end to end the corrected checkerboard reproduces the ideal with a mean error < 12 levels and the corner rows become straight again (< 0.01 px). Calibration is linear with known intrinsics and pattern and is solved with normal equations: with a 13 × 9 corner board and 0.3 px noise the reprojection error is 0.04 px. With 9 × 6 corners k2 had a deviation of ±0.14 and with 13 × 9 it drops to ±0.02. It is not a full camera calibration (it does not estimate fx, fy, cx, cy or use several views) and the corners are generated from the model, not detected in a photo. 11 tests. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '11' },
      { label: { es: 'Error de reproyección (13 × 9, 0,3 px)', en: 'Reprojection error (13 × 9, 0.3 px)' }, value: '0,04 px' },
      { label: { es: 'Desviación de k2: 9 × 6 → 13 × 9', en: 'k2 deviation: 9 × 6 → 13 × 9' }, value: '±0,14 → ±0,02' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Tablero', en: 'Checkerboard' }, sub: { es: 'esquinas ideales', en: 'ideal corners' } },
        { label: { es: 'Lente', en: 'Lens' }, sub: 'k1 k2 k3 p1 p2' },
        { label: { es: 'Calibración', en: 'Calibration' }, sub: { es: 'mínimos cuadrados', en: 'least squares' } },
        { label: { es: 'Corrección', en: 'Correction' }, sub: { es: 'LUT + bilineal', en: 'LUT + bilinear' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'reproyección', en: 'reprojection' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'visor-gerber-pcb',
    title: {
      es: 'Visor de archivos Gerber (RS-274X) con capas apiladas y analizador editable',
      en: 'Gerber (RS-274X) File Viewer with Stacked Layers and Editable Parser',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'embedded',
    year: 2026,
    image: '/projects/visor-gerber-pcb.jpg',
    demo: { src: '/demos/visor-gerber-pcb/index.html' },
    resultBadge: {
      es: 'Analizador de RS-274X propio: 4 capas en 1,2 ms y sin el error de escala del informe',
      en: 'Own RS-274X parser: 4 layers in 1.2 ms and without the report\'s scale error',
    },
    summary: {
      es: 'Un analizador de archivos Gerber escrito desde cero (formato numérico, unidades, aperturas, trazos, destellos, regiones y arcos) que dibuja las cuatro capas de una placa de ejemplo de 50 × 35 mm en vista plana o apilada en 3D simplificado. El texto de cada capa es editable y la vista se actualiza al instante.',
      en: 'A Gerber file parser written from scratch (number format, units, apertures, strokes, flashes, regions and arcs) that draws the four layers of a 50 × 35 mm example board in flat view or stacked in simplified 3D. The text of each layer is editable and the view updates instantly.',
    },
    stack: ['Gerber RS-274X', 'PCB', { es: 'Analizador léxico', en: 'Lexical parser' }, 'JavaScript', 'Canvas 2D', 'node:test'],
    challenge: {
      es: 'El formato Gerber tiene coordenadas modales, formatos numéricos declarados, regiones y arcos multicuadrante: un analizador ingenuo falla en cuanto el archivo no se parece al de los ejemplos.',
      en: 'The Gerber format has modal coordinates, declared number formats, regions and multi-quadrant arcs: a naive parser fails as soon as the file does not look like the examples.',
    },
    impact: {
      es: 'Sirve para inspeccionar cómo se compone una placa por capas y deja un analizador que lee el formato que declara cada archivo.',
      en: 'It helps inspect how a board is composed in layers and leaves a parser that reads the format each file declares.',
    },
    solution: {
      es: 'Analiza %FS (formato), %MO (unidades), aperturas circulares, rectangulares y oblongas, D01/D02/D03 con coordenadas modales, regiones G36/G37 y arcos G02/G03 en modo multicuadrante (un cuarto de círculo de radio 10 queda a 10 ± 1e-9 y mide 2π·10/4 a 0,1 %). Una placa de ejemplo generada por el propio código (cabecera de 2 × 6, pasivos, LED, orificios, relleno de cobre y contorno redondeado) se analiza y cada capa coincide con lo generado (pads, trazos, longitud, regiones, arcos). Los polígonos se triangulan por recorte de orejas (la suma de áreas coincide) y la vista apilada usa una proyección isométrica con separación de capas ajustable; la máscara se dibuja con las aberturas recortadas. El analizador del informe divide siempre por 10⁵ (formato 3.5) y exige X e Y en cada línea: con el formato 4.6 de esta placa sus coordenadas salen 10 veces demasiado grandes. No soporta polaridad clara, un cuadrante (G74), macros ni polígonos (se avisa). No usa Clipper2 ni extrusión 3D real. 14 pruebas. Simulado: sin hardware ni prototipo.',
      en: 'Parses %FS (format), %MO (units), circular, rectangular and obround apertures, D01/D02/D03 with modal coordinates, G36/G37 regions and G02/G03 arcs in multi-quadrant mode (a radius-10 quarter circle sits at 10 ± 1e-9 and measures 2π·10/4 within 0.1 %). An example board generated by the code itself (2 × 6 header, passives, LED, holes, copper pour and rounded outline) is parsed and each layer matches what was generated (pads, strokes, length, regions, arcs). Polygons are triangulated by ear clipping (the area sum matches) and the stacked view uses an isometric projection with adjustable layer separation; the mask is drawn with its openings cut out. The report\'s parser always divides by 10⁵ (3.5 format) and demands X and Y on every line: with this board\'s 4.6 format its coordinates come out 10 times too large. It does not support clear polarity, single-quadrant (G74), macros or polygons (a warning is shown). It does not use Clipper2 or real 3D extrusion. 14 tests. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '14' },
      { label: { es: 'Análisis de las 4 capas', en: 'Parsing the 4 layers' }, value: '1,2 ms' },
      { label: { es: 'Error de escala del analizador del informe', en: 'Scale error of the report\'s parser' }, value: '10×' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Archivo Gerber', en: 'Gerber file' }, sub: 'RS-274X' },
        { label: { es: 'Analizador', en: 'Parser' }, sub: { es: 'formato · modal', en: 'format · modal' } },
        { label: { es: 'Polígonos', en: 'Polygons' }, sub: { es: 'triangulación', en: 'triangulation' } },
        { label: { es: 'Vista', en: 'View' }, sub: { es: 'plana / apilada', en: 'flat / stacked' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'edición', en: 'editing' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'simulador-logica-digital',
    title: {
      es: 'Simulador de circuitos lógicos dirigido por eventos con setup, hold y diagramas de tiempos',
      en: 'Event-Driven Logic Circuit Simulator with Setup, Hold and Timing Diagrams',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'embedded',
    year: 2026,
    image: '/projects/simulador-logica-digital.jpg',
    demo: { src: '/demos/simulador-logica-digital/index.html' },
    resultBadge: {
      es: 'Camino crítico del contador de 7,5 ns: a 8 ns funciona y a 7 ns aparecen violaciones de tiempo',
      en: 'Counter critical path of 7.5 ns: it works at 8 ns and timing violations appear at 7 ns',
    },
    summary: {
      es: 'Un simulador de eventos discretos con lógica de cuatro valores (0, 1, X, Z), cola de prioridad, retardo de propagación inercial y flip-flops que comprueban setup y hold. Se ven en un diagrama de tiempos un contador de 3 bits, un sumador, un latch SR, un oscilador en anillo, una violación de setup/hold y una aleta.',
      en: 'A discrete-event simulator with four-valued logic (0, 1, X, Z), a priority queue, inertial propagation delay and flip-flops that check setup and hold. A timing diagram shows a 3-bit counter, an adder, an SR latch, a ring oscillator, a setup/hold violation and a glitch.',
    },
    stack: [
      { es: 'Simulación por eventos', en: 'Event-driven simulation' },
      { es: 'Lógica de 4 valores', en: '4-valued logic' },
      'Setup / hold',
      'JavaScript',
      'Canvas 2D',
      'node:test',
    ],
    challenge: {
      es: 'Los circuitos digitales reales fallan por tiempos: un pulso demasiado corto, un dato que cambia pegado al flanco, una realimentación que oscila. Un simulador solo vale si trata bien el tiempo y los estados desconocidos.',
      en: 'Real digital circuits fail by timing: a pulse that is too short, data changing right at the clock edge, a feedback loop that oscillates. A simulator is only worth anything if it treats time and unknown states properly.',
    },
    impact: {
      es: 'Hace visible el límite de frecuencia de un circuito sincrónico y por qué las aletas y las violaciones de tiempo producen X.',
      en: 'It makes visible a synchronous circuit\'s frequency limit and why glitches and timing violations produce X.',
    },
    solution: {
      es: 'Tiempo entero en unidades de 10 ps, montículo binario real con desempate por orden de inserción (5000 eventos aleatorios salen ordenados), tablas de verdad de cuatro valores, resolución de varios excitadores, buffers de tres estados y flip-flops con setup 1,5 ns y hold 0,8 ns (1,50 ns pasa y 1,49 falla). El retardo es inercial: un pulso de 1 ns se absorbe en una compuerta de 2 ns y uno de 3 ns pasa. Los eventos del mismo instante se procesan por tandas (primero se actualizan las redes y luego se evalúan las cargas), así un latch SR simétrico oscila al soltarse S y R a la vez, como en un simulador HDL. El contador de 3 bits cuenta bien a 8 ns (camino crítico = tcq 2 + AND 2 + XOR 2 + setup 1,5 = 7,5 ns) y a 7 ns aparecen violaciones de setup. El oscilador de 3 inversores de 2 ns mide 12,00 ns de periodo. El código del informe reordena todo el arreglo de eventos en cada inserción aunque habla de «min-heap»; aquí es un montículo real. El tcq del flip-flop y los circuitos son míos. 17 pruebas. Simulado: sin hardware ni prototipo.',
      en: 'Integer time in 10 ps units, a real binary heap with insertion-order tie-breaking (5000 random events come out sorted), four-valued truth tables, resolution of several drivers, tri-state buffers and flip-flops with 1.5 ns setup and 0.8 ns hold (1.50 ns passes and 1.49 fails). The delay is inertial: a 1 ns pulse is absorbed in a 2 ns gate and a 3 ns pulse passes. Events at the same instant are processed in batches (nets are updated first, then loads evaluated), so a symmetric SR latch oscillates when S and R are released together, as in an HDL simulator. The 3-bit counter counts correctly at 8 ns (critical path = tcq 2 + AND 2 + XOR 2 + setup 1.5 = 7.5 ns) and at 7 ns setup violations appear. The 3-inverter 2 ns ring oscillator measures a 12.00 ns period. The report\'s code re-sorts the whole event array on every insertion although it speaks of a «min-heap»; here it is a real heap. The flip-flop tcq and the circuits are mine. 17 tests. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '17' },
      { label: { es: 'Camino crítico del contador', en: 'Counter critical path' }, value: '7,5 ns' },
      { label: { es: 'Resolución del tiempo', en: 'Time resolution' }, value: '10 ps' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Estímulos', en: 'Stimuli' }, sub: { es: 'reloj y datos', en: 'clock and data' } },
        { label: { es: 'Cola de eventos', en: 'Event queue' }, sub: { es: 'montículo binario', en: 'binary heap' } },
        { label: { es: 'Compuertas y flip-flops', en: 'Gates and flip-flops' }, sub: 'tpd · setup · hold' },
        { label: { es: 'Diagrama de tiempos', en: 'Timing diagram' }, sub: '0 1 X Z' },
      ],
      feedback: { from: 2, to: 1, label: { es: 'nuevos eventos', en: 'new events' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'carta-smith-rf-adaptacion',
    title: {
      es: 'Carta de Smith, líneas de transmisión de RF, red de adaptación en L y microstrip',
      en: 'Smith Chart, RF Transmission Lines, L-Match Network and Microstrip',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'instrumentation',
    year: 2026,
    image: '/projects/carta-smith-rf-adaptacion.jpg',
    demo: { src: '/demos/carta-smith-rf-adaptacion/index.html' },
    resultBadge: {
      es: 'Red en L verificada con 300 cargas aleatorias y un error corregido en la tabla del informe',
      en: 'L-match verified on 300 random loads and one error corrected in the report\'s table',
    },
    summary: {
      es: 'Se coloca una carga en la carta de Smith y se ve su coeficiente de reflexión, ROE y pérdida de retorno; al alargar la línea el punto gira por el círculo de ROE constante. Calcula la red de adaptación en L con sus dos soluciones y sintetiza una línea microstrip de la impedancia que se pida (Hammerstad-Jensen).',
      en: 'A load is placed on the Smith chart and its reflection coefficient, VSWR and return loss are shown; lengthening the line rotates the point around the constant-VSWR circle. It computes the L-match network with both solutions and synthesizes a microstrip line of any requested impedance (Hammerstad-Jensen).',
    },
    stack: [
      { es: 'Carta de Smith', en: 'Smith chart' },
      'RF',
      'Microstrip',
      { es: 'Adaptación de impedancias', en: 'Impedance matching' },
      'JavaScript',
      'node:test',
    ],
    challenge: {
      es: 'Adaptar una carga exige pasar de impedancias a admitancias y elegir entre dos soluciones; un error de signo da una red que no adapta. Y las fórmulas de microstrip son aproximaciones que hay que contrastar.',
      en: 'Matching a load requires going from impedances to admittances and choosing between two solutions; a sign error yields a network that does not match. And the microstrip formulas are approximations that must be checked.',
    },
    impact: {
      es: 'Una calculadora de RF que verifica por separado lo que diseña, y que dejó en evidencia un error numérico del documento de origen.',
      en: 'An RF calculator that verifies what it designs separately, and that exposed a numeric error in the source document.',
    },
    solution: {
      es: 'Γ = (ZL − Z0)/(ZL + Z0), ROE y pérdida de retorno como en el informe, transformación a lo largo de una línea sin pérdidas (λ/4 invierte, λ/2 repite, la carga adaptada no cambia) y círculos de resistencia y reactancia comprobados con puntos conocidos. La tabla del informe tiene un error en la fila 25 + j25 Ω: dice 126,8° y 6,93 dB y los valores correctos son 116,6° y 6,99 dB (Γ = (−25 + j25)/(75 + j25)); las otras tres filas coinciden. La red en L se diseña con admitancias y se verifica con un cálculo circuital independiente: con 300 cargas complejas aleatorias las dos soluciones dan una impedancia de entrada igual a Rs con error < 1e-6 Ω; a 100 MHz, 100 Ω → 50 Ω da 79,6 nH y 15,9 pF. El microstrip sintetiza W/h y calcula Z0 con ambas ramas de Hammerstad (50 Ω sobre FR4 de 1,6 mm y εr = 4,4: W = 3,06 mm, εeff = 3,33; síntesis y análisis coinciden a menos de 1,5 %). Sin pérdidas, espesor de cobre ni dispersión; sin zoom ni d3. 12 pruebas. Simulado: sin hardware ni prototipo.',
      en: 'Γ = (ZL − Z0)/(ZL + Z0), VSWR and return loss as in the report, transformation along a lossless line (λ/4 inverts, λ/2 repeats, a matched load does not change) and resistance and reactance circles checked against known points. The report\'s table has an error in the 25 + j25 Ω row: it says 126.8° and 6.93 dB and the correct values are 116.6° and 6.99 dB (Γ = (−25 + j25)/(75 + j25)); the other three rows match. The L-match is designed with admittances and verified with an independent circuit calculation: with 300 random complex loads both solutions give an input impedance equal to Rs with error < 1e-6 Ω; at 100 MHz, 100 Ω → 50 Ω gives 79.6 nH and 15.9 pF. The microstrip synthesizes W/h and computes Z0 with both Hammerstad branches (50 Ω on 1.6 mm FR4 with εr = 4.4: W = 3.06 mm, εeff = 3.33; synthesis and analysis agree within 1.5 %). No losses, copper thickness or dispersion; no zoom or d3. 12 tests. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '12' },
      { label: { es: 'Cargas con red en L verificada', en: 'Loads with a verified L-match' }, value: '300' },
      { label: { es: 'Ancho de 50 Ω sobre FR4 de 1,6 mm', en: '50 Ω width on 1.6 mm FR4' }, value: '3,06 mm' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Carga', en: 'Load' }, sub: 'ZL = R + jX' },
        { label: { es: 'Coeficiente de reflexión', en: 'Reflection coefficient' }, sub: 'Γ · ROE · RL' },
        { label: { es: 'Línea', en: 'Line' }, sub: { es: 'giro por la carta', en: 'rotation on the chart' } },
        { label: { es: 'Adaptación', en: 'Matching' }, sub: { es: 'red en L · microstrip', en: 'L-match · microstrip' } },
      ],
      feedback: { from: 3, to: 0, label: { es: 'Z de entrada = Z0', en: 'input Z = Z0' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
  {
    slug: 'planificador-rutas-autonomas',
    title: {
      es: 'Planificador de rutas para un vehículo autónomo: A*, RRT y Pure Pursuit',
      en: 'Autonomous Vehicle Path Planner: A*, RRT and Pure Pursuit',
    },
    client: { es: 'Proyecto personal', en: 'Personal project' },
    category: 'automation',
    year: 2026,
    image: '/projects/planificador-rutas-autonomas.jpg',
    demo: { src: '/demos/planificador-rutas-autonomas/index.html' },
    resultBadge: {
      es: 'A* igual de óptimo que Dijkstra en 120 mapas y 0 colisiones siguiendo la ruta',
      en: 'A* as optimal as Dijkstra on 120 maps and 0 collisions following the route',
    },
    summary: {
      es: 'Un vehículo tipo Ackermann (distancia entre ejes 2,5 m, dirección máxima 35°) va de un punto a otro de un mapa de 60 × 40 m. Se planifica con A* o RRT, se acorta la ruta por línea de vista y el vehículo la sigue con Pure Pursuit. Con un clic se mueve la meta y con Mayús + clic se pone un obstáculo: replanifica desde donde está.',
      en: 'An Ackermann-type vehicle (2.5 m wheelbase, 35° maximum steering) goes from one point to another on a 60 × 40 m map. It is planned with A* or RRT, the route is shortened by line of sight and the vehicle follows it with Pure Pursuit. A click moves the goal and Shift + click places an obstacle: it replans from where it is.',
    },
    stack: ['A*', 'RRT', 'Pure Pursuit', 'Ackermann', { es: 'Robótica móvil', en: 'Mobile robotics' }, 'JavaScript', 'node:test'],
    challenge: {
      es: 'Un camino óptimo en una grilla no es un camino que un auto pueda seguir: tiene esquinas y no respeta el radio de giro. Y seguirlo con Pure Pursuit recorta esas esquinas y puede rozar obstáculos.',
      en: 'An optimal path on a grid is not a path a car can follow: it has corners and does not respect the turning radius. And following it with Pure Pursuit cuts those corners and may graze obstacles.',
    },
    impact: {
      es: 'Muestra la cadena completa de planificación y seguimiento y por qué hace falta un margen de seguridad, con números medidos.',
      en: 'It shows the full planning and tracking chain and why a safety margin is needed, with measured numbers.',
    },
    solution: {
      es: 'Mapa de ocupación de celdas de 0,2 m (300 × 200), obstáculos inflados, A* de 8 vecinos con heurística octil sin cortar esquinas (mismo costo que Dijkstra en 120 mapas aleatorios; 10 585 expansiones y unos 40 ms en el escenario), RRT con semilla fija, atajos por línea de vista y remuestreo. El vehículo usa la solución exacta del modelo de bicicleta (con δ constante cierra un círculo de radio L/tan δ) y Pure Pursuit con δ = atan2(2·L·sin α, Ld), Ld entre 3 y 8 m. Con los obstáculos inflados solo por el radio del vehículo (1,0 m) el vehículo recorta esquinas (error transversal de ≈ 1,1 a 1,5 m) y roza los obstáculos; con un margen de 1,2 m llega a la meta con 0 colisiones, también tras replanificar con un obstáculo nuevo. El camino de la grilla no respeta el radio mínimo de giro de 3,57 m: Pure Pursuit lo suaviza, no lo garantiza. RRT no es óptimo. «Evitación dinámica» es replanificación completa. El mapa, la velocidad y el Ld en función de la velocidad son míos. 17 pruebas. Simulado: sin hardware ni prototipo.',
      en: 'Occupancy map of 0.2 m cells (300 × 200), inflated obstacles, 8-neighbour A* with an octile heuristic and no corner cutting (same cost as Dijkstra on 120 random maps; 10,585 expansions and about 40 ms in the scenario), RRT with a fixed seed, line-of-sight shortcuts and resampling. The vehicle uses the exact bicycle-model solution (with constant δ it closes a circle of radius L/tan δ) and Pure Pursuit with δ = atan2(2·L·sin α, Ld), Ld between 3 and 8 m. With obstacles inflated only by the vehicle radius (1.0 m) the vehicle cuts corners (cross-track error of ≈ 1.1 to 1.5 m) and grazes obstacles; with a 1.2 m margin it reaches the goal with 0 collisions, also after replanning with a new obstacle. The grid path does not respect the 3.57 m minimum turning radius: Pure Pursuit smooths it, it does not guarantee it. RRT is not optimal. «Dynamic avoidance» is full replanning. The map, the speed and Ld as a function of speed are mine. 17 tests. Simulated: no hardware or prototype.',
    },
    metrics: [
      { label: { es: 'Pruebas automáticas', en: 'Automated tests' }, value: '17' },
      { label: { es: 'Mapas con A* igual de óptimo que Dijkstra', en: 'Maps where A* matches Dijkstra' }, value: '120' },
      { label: { es: 'Colisiones con 1,2 m de margen', en: 'Collisions with a 1.2 m margin' }, value: '0' },
    ],
    diagram: {
      nodes: [
        { label: { es: 'Mapa', en: 'Map' }, sub: { es: 'celdas de 0,2 m', en: '0.2 m cells' } },
        { label: { es: 'Planificador', en: 'Planner' }, sub: 'A* / RRT' },
        { label: 'Pure Pursuit', sub: 'Ld 3–8 m' },
        { label: { es: 'Vehículo', en: 'Vehicle' }, sub: 'Ackermann · 35°' },
      ],
      feedback: { from: 3, to: 1, label: { es: 'replanificar', en: 'replan' } },
    },
    tools: { hardware: [], software: ['JavaScript', 'Canvas 2D', 'node:test'] },
  },
]
