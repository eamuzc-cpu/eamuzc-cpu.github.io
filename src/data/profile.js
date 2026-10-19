// Texto traducible = objeto { es, en }. Ver src/i18n.jsx.

export const profile = {
  name: 'Esteban Alexander Muñoz Cáceres',
  shortName: 'Esteban Muñoz',
  title: { es: 'Ingeniero Civil Electrónico', en: 'Electronic Engineer' },
  role: {
    es: 'Automatización Industrial · Instrumentación · Ingeniería Electrónica',
    en: 'Industrial Automation · Instrumentation · Electronic Engineering',
  },
  location: 'Chile',
  whatsapp: 'https://wa.me/56962618697',
  whatsappLabel: '+56 9 6261 8697',
  email: 'eamuzc@gmail.com',
  linkedin: 'https://linkedin.com/in/eamuz',
  cvPath: { es: '/cv-es.pdf', en: '/cv-en.pdf' },
}

// Los 5 primeros grupos se ven de entrada; el resto queda bajo "Ver más" (ver Skills.jsx).
// `icon` elige el ícono en Skills.jsx. Solo hay habilidades respaldadas por el CV o por un proyecto del sitio.
export const skillGroups = [
  {
    icon: 'cpu',
    title: 'PLCs & SCADA',
    items: [
      'Allen-Bradley ControlLogix (RSLogix / Studio 5000)',
      'Siemens S7-300 / TIA Portal',
      { es: 'PLC y HMI Delta', en: 'Delta PLC and HMI' },
      'FactoryTalk',
      { es: 'Ladder, FBD, AWL, Structured Text y SFC', en: 'Ladder, FBD, STL, Structured Text and SFC' },
      { es: 'SCADA e integración de sistemas', en: 'SCADA and systems integration' },
      { es: 'Modbus TCP y comunicación entre equipos', en: 'Modbus TCP and device-to-device communication' },
    ],
  },
  {
    icon: 'gauge',
    title: { es: 'Instrumentación y control', en: 'Instrumentation and control' },
    items: [
      '4-20 mA / HART',
      { es: 'RTD PT100 y termocuplas J/K', en: 'RTD PT100 and J/K thermocouples' },
      { es: 'Caudal, nivel y conductividad', en: 'Flow, level and conductivity' },
      { es: 'Válvulas neumáticas y modulantes', en: 'Pneumatic and modulating valves' },
      { es: 'Lazos PID, sintonía y anti-windup', en: 'PID loops, tuning and anti-windup' },
      { es: 'Gestión de alarmas (ISA-18.2) y OEE', en: 'Alarm management (ISA-18.2) and OEE' },
      { es: 'Calibración y puesta en marcha', en: 'Calibration and commissioning' },
      { es: 'Procesos lácteos: pasteurización y envasado', en: 'Dairy processes: pasteurization and packaging' },
    ],
  },
  {
    icon: 'shield',
    title: { es: 'Mantenimiento & Seguridad', en: 'Maintenance & Safety' },
    items: [
      { es: 'Mantenimiento preventivo y correctivo', en: 'Preventive and corrective maintenance' },
      { es: 'TPM autónomo', en: 'Autonomous TPM' },
      { es: 'Procedimientos LOTO', en: 'LOTO procedures' },
      { es: 'Diagnóstico en línea', en: 'Online diagnostics' },
      { es: 'Mantenimiento predictivo (vibración, FFT)', en: 'Predictive maintenance (vibration, FFT)' },
      { es: 'Planes de mantención y repuestos', en: 'Maintenance plans and spare parts' },
      { es: 'Confiabilidad operacional', en: 'Operational reliability' },
      { es: 'Normativas eléctricas y seguridad industrial', en: 'Electrical codes and industrial safety' },
    ],
  },
  {
    icon: 'terminal',
    title: { es: 'Programación', en: 'Programming' },
    items: [
      'Python',
      'C / C++',
      'JavaScript',
      'MATLAB',
      'Visual Basic',
      { es: 'Ensamblador PIC', en: 'PIC assembly' },
      'VHDL / Verilog',
      { es: 'Programación orientada a objetos', en: 'Object-oriented programming' },
    ],
  },
  {
    icon: 'vision',
    title: { es: 'Visión artificial e IA', en: 'Computer vision and AI' },
    items: [
      'OpenCV',
      'YOLO (Ultralytics)',
      'PyTorch',
      { es: 'Seguimiento, conteo y mapas de calor', en: 'Tracking, counting and heatmaps' },
      'OCR',
      { es: 'LLM locales (llama.cpp, Qwen) y APIs (Gemini, Claude)', en: 'Local LLMs (llama.cpp, Qwen) and APIs (Gemini, Claude)' },
      { es: 'Voz: reconocimiento offline (Vosk) y en GPU', en: 'Speech: offline (Vosk) and GPU recognition' },
      { es: 'Homografía, seguimiento y zonas de seguridad', en: 'Homography, tracking and safety zones' },
    ],
  },
  {
    icon: 'web',
    title: { es: 'Web, datos y despliegue', en: 'Web, data and deployment' },
    items: [
      'React · Node.js',
      { es: 'Django 5 y HTMX', en: 'Django 5 and HTMX' },
      'FastAPI',
      { es: 'SQLite y bases de datos', en: 'SQLite and databases' },
      { es: 'Tailwind CSS, WebGL y Canvas 2D', en: 'Tailwind CSS, WebGL and Canvas 2D' },
      { es: 'Pagos y boleta electrónica (Webpay, Flow, OpenFactura)', en: 'Payments and e-invoicing (Webpay, Flow, OpenFactura)' },
      { es: 'Pruebas automáticas e instaladores (.exe)', en: 'Automated tests and installers (.exe)' },
      { es: 'Docker, GitHub y Tailscale (acceso remoto)', en: 'Docker, GitHub and Tailscale (remote access)' },
      { es: 'Bots de Telegram', en: 'Telegram bots' },
    ],
  },
  {
    icon: 'circuit',
    title: { es: 'Electrónica, embebidos e IoT', en: 'Electronics, embedded and IoT' },
    items: [
      { es: 'ESP32 y Arduino (C++)', en: 'ESP32 and Arduino (C++)' },
      'Raspberry Pi',
      { es: 'Firmware para microcontroladores', en: 'Microcontroller firmware' },
      { es: 'IoT con MQTT y domótica (Home Assistant)', en: 'IoT with MQTT and home automation (Home Assistant)' },
      { es: 'Sensores PIR / RF y audio (DFPlayer)', en: 'PIR / RF sensors and audio (DFPlayer)' },
      { es: 'Análisis de circuitos analógicos y digitales', en: 'Analog and digital circuit analysis' },
      { es: 'Electrónica de potencia', en: 'Power electronics' },
      { es: 'Sistemas digitales (FPGA) y redes', en: 'Digital systems (FPGA) and networks' },
    ],
  },
  {
    icon: 'ruler',
    title: { es: 'Diseño CAD & Simulación', en: 'CAD Design & Simulation' },
    items: [
      { es: 'AutoCAD (2D y 3D)', en: 'AutoCAD (2D and 3D)' },
      'Proteus · Eagle',
      'SPICE · Multisim',
      { es: 'MATLAB: modelado y simulación numérica', en: 'MATLAB: modeling and numerical simulation' },
      { es: 'Planos P&ID', en: 'P&ID drawings' },
      { es: 'Dimensionamiento de tableros y cables', en: 'Panel and cable sizing' },
      { es: 'Sincronización cinemática', en: 'Kinematic synchronization' },
      'Cisco Packet Tracer · Cofaso',
    ],
  },
  {
    icon: 'media',
    title: { es: 'IA generativa y video', en: 'Generative AI and video' },
    items: [
      { es: 'ComfyUI (imagen y video)', en: 'ComfyUI (image and video)' },
      'Qwen-Image · Z-Image',
      { es: 'Pipelines de video con Remotion y ffmpeg', en: 'Video pipelines with Remotion and ffmpeg' },
      { es: 'Voz sintética (Chatterbox) y música con IA (ACE-Step)', en: 'Synthetic voice (Chatterbox) and AI music (ACE-Step)' },
      { es: 'Registro reproducible: seed, modelo y licencia', en: 'Reproducible logging: seed, model and license' },
      { es: 'GPU local (RTX) para modelos abiertos', en: 'Local GPU (RTX) for open models' },
    ],
  },
  {
    icon: 'people',
    title: { es: 'Gestión e idiomas', en: 'Management and languages' },
    items: [
      { es: 'Español nativo · Inglés B1', en: 'Spanish native · English B1' },
      { es: 'Gestión de proyectos y planificación', en: 'Project management and planning' },
      { es: 'Atención a proveedores y contratistas', en: 'Supplier and contractor management' },
      { es: 'Trabajo en equipo y comunicación efectiva', en: 'Teamwork and effective communication' },
      { es: 'Matemáticas y física aplicadas', en: 'Applied math and physics' },
    ],
  },
]

// Más reciente primero: la línea de tiempo se dibuja en el orden de este arreglo.
export const experience = [
  {
    start: 2024,
    end: null,
    role: { es: 'Desarrollo de Software (I+D)', en: 'Software Development (R&D)' },
    place: { es: 'Proyectos personales y freelance', en: 'Personal and freelance projects' },
    description: {
      es: 'Visión artificial en Python/OpenCV/YOLOv8, asistentes embebidos en Raspberry Pi con IoT y aplicaciones web full-stack con React y Node.js.',
      en: 'Computer vision in Python/OpenCV/YOLOv8, embedded assistants on Raspberry Pi with IoT, and full-stack web apps with React and Node.js.',
    },
    icon: 'code',
  },
  {
    start: 2023,
    end: null,
    role: { es: 'Automatización y mantenimiento', en: 'Automation and maintenance' },
    place: { es: 'Soprole — Planta Láctea', en: 'Soprole — Dairy Plant' },
    description: {
      es: 'Mantenimiento preventivo y correctivo de líneas de envasado Tetra Pak Speed A3 y equipos de empaquetado, mantenciones planificadas (TPM) y diagnóstico en PLC Allen-Bradley y Siemens, con procedimientos de seguridad LOTO.',
      en: 'Preventive and corrective maintenance of Tetra Pak Speed A3 packaging lines and packing equipment, planned maintenance (TPM) and diagnostics on Allen-Bradley and Siemens PLCs, following LOTO safety procedures.',
    },
    icon: 'factory',
  },
  {
    start: 2022,
    end: 2022,
    role: { es: 'Proyecto de puesta en marcha HDPE', en: 'HDPE commissioning project' },
    place: { es: 'Dipolitec', en: 'Dipolitec' },
    description: {
      es: 'Puesta en marcha de maquinaria para fabricar tubería de polietileno de alta densidad: programas PLC Delta para extrusión, corte, enfriamiento y embalaje.',
      en: 'Commissioning of machinery that makes high-density polyethylene pipe: Delta PLC programs for extrusion, cutting, cooling and packing.',
    },
    icon: 'cog',
  },
  {
    start: 2017,
    end: 2022,
    role: { es: 'Técnico en instalaciones eléctricas', en: 'Electrical installations technician' },
    place: { es: 'Indsol y Dipolitec', en: 'Indsol and Dipolitec' },
    description: {
      es: 'Instalación y mantenimiento de sistemas eléctricos, fotovoltaicos y de seguridad en entornos residenciales, comerciales e industriales; lectura de planos, pruebas, mediciones y soldadura estructural.',
      en: 'Installation and maintenance of electrical, photovoltaic and security systems in residential, commercial and industrial settings; drawing interpretation, testing, measurements and structural welding.',
    },
    icon: 'zap',
  },
]

// Año en que empieza la programación de PLC / automatización (puesta en marcha HDPE), usado para
// calcular "años en automatización" en "Sobre mí" sin inflarlos con los trabajos eléctricos previos.
export const careerStartYear = 2022
