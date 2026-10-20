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
]
