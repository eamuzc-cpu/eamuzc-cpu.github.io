export default {
  status: { es: 'Aplicación de escritorio de uso diario (Windows)', en: 'Desktop application for daily use (Windows)' },
  related: ['asistente-pi-v3', 'comfyui-studio', 'visual-auto-trigger'],
  es: {
    lead: 'Un asistente de escritorio que se activa con dos palmadas, transcribe la voz en la GPU y responde con voz y un orbe animado. Controla Windows, archivos, navegador y ComfyUI, y pide confirmación antes de cualquier acción riesgosa.',
    context: [
      'Un asistente con micrófono abierto y acceso al sistema no puede depender de un solo proveedor, y no debe ejecutar nada riesgoso sin que el usuario lo autorice. Uno que borra archivos, envía correos o hace clics por su cuenta es un riesgo; uno que solo funciona con nube se cae cuando falla el servicio o se agota la cuota.',
      'AXIOM 2 se diseñó para ser seguro por diseño y tener un modo local. La inteligencia es intercambiable (incluso por voz) y las acciones pasan por un «centinela» que decide cuándo hay que pedir permiso.',
    ],
    how: [
      { t: 'Activarse con dos palmadas', d: 'El micrófono detecta una doble palmada como señal de activación, un gesto simple que no requiere pronunciar nada.' },
      { t: 'Transcribir en la GPU', d: 'La voz del usuario se convierte en texto con transcripción acelerada por GPU, para que la respuesta empiece pronto.' },
      { t: 'Mostrar el estado con un orbe', d: 'Un orbe de 600 partículas indica en qué estado está el asistente: escuchando, pensando, hablando o esperando confirmación. El usuario siempre ve qué está pasando.' },
      { t: 'Elegir el cerebro', d: 'El texto va a uno de tres cerebros intercambiables, incluso por voz: Qwen local con llama.cpp, Gemini o Claude.' },
      { t: 'Usar herramientas', d: 'El cerebro puede pedir herramientas de Windows, archivos, web, Chrome, visión de pantalla, correo, GitHub, notas de Obsidian y generación de imágenes en ComfyUI. Se amplían con plugins, habilidades y servidores MCP.' },
      { t: 'Pasar por el centinela', d: 'Antes de borrar, escribir, hacer clics, enviar correo o navegar, un centinela configurable pide confirmación. Tiene tres modos de permisos: Consulta, Automático y Restringido.' },
      { t: 'Responder con voz', d: 'El resultado de la acción vuelve al cerebro, que lo explica con voz y en el panel de chat.' },
    ],
    concepts: [
      { t: 'Doble palmada', d: 'Detección de dos picos de audio seguidos dentro de una ventana de tiempo. Es un disparador barato que no requiere reconocer palabras.' },
      { t: 'llama.cpp', d: 'Motor para ejecutar modelos de lenguaje en el propio computador. Permite que el cerebro local funcione sin internet.' },
      { t: 'MCP', d: 'Model Context Protocol: un estándar abierto para que un asistente se conecte a herramientas y fuentes de datos externas.' },
      { t: 'Centinela', d: 'Capa que revisa cada acción propuesta y decide si se ejecuta sola o necesita confirmación humana, según el modo de permisos.' },
      { t: 'Modos de permisos', d: 'Consulta (solo lee), Automático (ejecuta lo permitido sin preguntar) y Restringido (pide confirmación en casi todo).' },
    ],
    decisions: [
      { t: 'Tres cerebros intercambiables', d: 'Si un servicio falla o se agota la cuota, se cambia de cerebro; si no hay internet, queda el modelo local. El asistente no queda inutilizado por depender de un proveedor.' },
      { t: 'Seguro por diseño', d: 'La confirmación no es un parche: toda acción riesgosa pasa por el centinela, y el modo de permisos lo configura el usuario.' },
      { t: 'Estado visible', d: 'El orbe evita la incertidumbre de «¿me escuchó?» o «¿está esperando que le diga que sí?».' },
      { t: 'Extensible', d: 'Plugins, habilidades y servidores MCP permiten sumar capacidades sin reescribir el núcleo.' },
    ],
    verified: [
      '61 pruebas automáticas.',
      '3 cerebros disponibles y un orbe de 600 partículas.',
    ],
    limits: [
      'Es una aplicación de escritorio para Windows de uso personal; no hay demo en el navegador.',
      'El cerebro local depende de la GPU y el modelo disponibles; Gemini y Claude requieren internet y credenciales propias.',
      'Aunque el centinela pide confirmación, conviene revisar lo que pide autorizar, sobre todo en modo Automático.',
    ],
    next: [
      'Registrar un historial auditable de las acciones confirmadas y las rechazadas.',
      'Medir y comparar la latencia de los tres cerebros para una misma orden.',
    ],
  },
  en: {
    lead: 'A desktop assistant that wakes on two claps, transcribes your voice on the GPU and answers with voice and an animated orb. It controls Windows, files, the browser and ComfyUI, and asks for confirmation before any risky action.',
    context: [
      'An assistant with an open microphone and access to the system cannot depend on a single provider, and must not run anything risky without the user’s authorisation. One that deletes files, sends emails or clicks by itself is a risk; one that only works with the cloud goes down when the service fails or the quota runs out.',
      'AXIOM 2 was designed to be safe by design and to have a local mode. The intelligence is swappable (even by voice) and actions go through a "sentinel" that decides when permission is needed.',
    ],
    how: [
      { t: 'Wake on two claps', d: 'The microphone detects a double clap as the activation signal, a simple gesture that requires no spoken word.' },
      { t: 'Transcribe on the GPU', d: 'The user’s voice becomes text with GPU-accelerated transcription, so the answer starts quickly.' },
      { t: 'Show state with an orb', d: 'A 600-particle orb shows the assistant’s state: listening, thinking, speaking or waiting for confirmation. The user always sees what is going on.' },
      { t: 'Choose the brain', d: 'The text goes to one of three swappable brains, even by voice: local Qwen with llama.cpp, Gemini or Claude.' },
      { t: 'Use tools', d: 'The brain can request tools for Windows, files, web, Chrome, screen vision, email, GitHub, Obsidian notes and image generation in ComfyUI. They are extended with plugins, skills and MCP servers.' },
      { t: 'Pass through the sentinel', d: 'Before deleting, writing, clicking, sending email or browsing, a configurable sentinel asks for confirmation. It has three permission modes: Query, Automatic and Restricted.' },
      { t: 'Answer with voice', d: 'The action’s result returns to the brain, which explains it by voice and in the chat panel.' },
    ],
    concepts: [
      { t: 'Double clap', d: 'Detection of two audio peaks in a row within a time window. A cheap trigger that does not require recognising words.' },
      { t: 'llama.cpp', d: 'An engine for running language models on your own computer. It lets the local brain work without internet.' },
      { t: 'MCP', d: 'Model Context Protocol: an open standard for an assistant to connect to external tools and data sources.' },
      { t: 'Sentinel', d: 'A layer that reviews every proposed action and decides whether it runs by itself or needs human confirmation, depending on the permission mode.' },
      { t: 'Permission modes', d: 'Query (read-only), Automatic (runs what is allowed without asking) and Restricted (asks for confirmation on almost everything).' },
    ],
    decisions: [
      { t: 'Three swappable brains', d: 'If a service fails or the quota runs out you switch brain; if there is no internet the local model remains. The assistant is not stranded by depending on one provider.' },
      { t: 'Safe by design', d: 'Confirmation is not a patch: every risky action goes through the sentinel, and the permission mode is set by the user.' },
      { t: 'Visible state', d: 'The orb removes the uncertainty of "did it hear me?" or "is it waiting for me to say yes?".' },
      { t: 'Extensible', d: 'Plugins, skills and MCP servers let capabilities be added without rewriting the core.' },
    ],
    verified: [
      '61 automated tests.',
      '3 brains available and a 600-particle orb.',
    ],
    limits: [
      'It is a Windows desktop application for personal use; there is no browser demo.',
      'The local brain depends on the available GPU and model; Gemini and Claude need internet and your own credentials.',
      'Although the sentinel asks for confirmation, review what you are asked to authorise, especially in Automatic mode.',
    ],
    next: [
      'Keep an auditable history of confirmed and rejected actions.',
      'Measure and compare the latency of the three brains for the same command.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'De la palmada a la acción', en: 'From clap to action' },
      caption: {
        es: 'Toda herramienta pasa por el centinela, que puede pedir confirmación. El resultado vuelve al cerebro, que lo comunica con voz y con el orbe.',
        en: 'Every tool goes through the sentinel, which may ask for confirmation. The result returns to the brain, which communicates it with voice and the orb.',
      },
      nodes: [
        { id: 'clap', label: { es: 'Doble palmada', en: 'Double clap' }, sub: { es: 'activación', en: 'activation' }, col: 0, row: 0 },
        { id: 'stt', label: { es: 'Transcripción', en: 'Transcription' }, sub: 'GPU', col: 1, row: 0, tone: 'emerald' },
        { id: 'brain', label: { es: 'Cerebro', en: 'Brain' }, sub: { es: 'local · Gemini · Claude', en: 'local · Gemini · Claude' }, col: 2, row: 0, tone: 'magenta' },
        { id: 'sen', label: { es: 'Centinela', en: 'Sentinel' }, sub: { es: 'pide confirmación', en: 'asks to confirm' }, col: 3, row: 0, tone: 'amber' },
        { id: 'tools', label: { es: 'Herramientas', en: 'Tools' }, sub: 'Windows · web · MCP', col: 4, row: 0 },
        { id: 'voz', label: { es: 'Voz + orbe', en: 'Voice + orb' }, sub: 'TTS', col: 2, row: 1, tone: 'emerald' },
      ],
      edges: [
        { from: 'clap', to: 'stt' },
        { from: 'stt', to: 'brain', label: { es: 'texto', en: 'text' } },
        { from: 'brain', to: 'sen', label: { es: 'acción', en: 'action' } },
        { from: 'sen', to: 'tools', label: 'ok' },
        { from: 'brain', to: 'voz', label: { es: 'respuesta', en: 'answer' } },
        { from: 'tools', to: 'voz', loop: true, dashed: true, label: { es: 'resultado de la acción', en: 'action result' } },
      ],
    },
  ],
}
