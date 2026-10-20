export default {
  status: { es: 'Herramienta de escritorio de uso personal (2 versiones)', en: 'Personal desktop tool (2 versions)' },
  related: ['axiom-2', 'deteccion-personas-aforo', 'filtros-imagen-canny'],
  es: {
    lead: 'Una aplicación de escritorio que vigila la pantalla y, cuando aparece una imagen o un texto, ejecuta una secuencia de clics y teclas. Sirve para dejar tareas largas corriendo sin supervisión: instaladores que piden «Continuar» o agentes que preguntan «y/n».',
    context: [
      'Muchos procesos largos se detienen en una pantalla esperando que alguien haga clic: un instalador con un botón «Continuar», un agente de terminal que pregunta si seguir. Eso obliga a estar frente al computador.',
      'Vigilar la pantalla a mano es tiempo perdido y propenso a olvidos: cada espera sin atender detiene el proceso hasta que alguien vuelve. La herramienta cambia esa vigilancia por reglas que se ejecutan solas.',
    ],
    how: [
      { t: 'Capturar la pantalla', d: 'La aplicación (PyQt6) captura la pantalla de forma continua con la librería mss, que es rápida y no depende del navegador.' },
      { t: 'Buscar una imagen', d: 'Con OpenCV se busca en la captura una imagen de referencia, por ejemplo el recorte de un botón. Si aparece con suficiente parecido, la condición se cumple.' },
      { t: 'Buscar un texto con OCR (versión 2)', d: 'La versión 2 suma el OCR nativo de Windows para buscar una frase en vez de un recorte. Es más cómodo cuando el botón cambia de tamaño, de color o de lugar.' },
      { t: 'Reglas IF / ELSE IF', d: 'Las condiciones se combinan en reglas múltiples con AND / OR y con ramas IF / ELSE IF: «si aparece X y no aparece Y, haz esto; si no, haz aquello».' },
      { t: 'Acciones', d: 'Cada regla dispara una secuencia de clics, teclas, atajos y pausas. También puede grabarse con la grabadora de macros (F9 para terminar), emitir una alerta sonora o mostrar una notificación toast de Windows.' },
      { t: 'Seguir vigilando y poder parar', d: 'Terminada una regla, la aplicación sigue vigilando. En cualquier momento, ESC es una parada de emergencia que detiene todo.' },
    ],
    concepts: [
      { t: 'Coincidencia de plantilla', d: 'Técnica de OpenCV que desliza una imagen pequeña sobre una grande y mide en cada posición qué tan parecidas son. Si el parecido supera un umbral, se considera encontrada.' },
      { t: 'OCR', d: 'Reconocimiento óptico de caracteres: convertir los píxeles de la pantalla en texto que se puede buscar.' },
      { t: 'Regla IF / ELSE IF', d: 'Cadena de condiciones evaluadas en orden; se ejecuta la primera que se cumple.' },
      { t: 'Macro', d: 'Secuencia grabada de acciones (clics, teclas, pausas) que se puede repetir.' },
      { t: 'Parada de emergencia', d: 'Una tecla global (ESC) que corta cualquier automatización en curso.' },
    ],
    decisions: [
      { t: 'Buscar texto, no solo imágenes', d: 'Un recorte de un botón se rompe si cambia el tema de colores o la resolución. Una frase leída por OCR sobrevive a esos cambios.' },
      { t: 'Reglas en lugar de una sola condición', d: 'Los procesos reales tienen varias pantallas posibles. Las reglas con AND / OR permiten responder a cada una distinto.' },
      { t: 'Una parada siempre disponible', d: 'Una herramienta que hace clic sola puede equivocarse. ESC como parada de emergencia hace que probar reglas nuevas sea seguro.' },
      { t: 'Avisar de lo que pasó', d: 'Las alertas sonoras y las notificaciones permiten saber qué regla se ejecutó aunque no se esté mirando la pantalla.' },
    ],
    verified: [
      'Dos versiones: la 1 busca imágenes; la 2 suma OCR, reglas múltiples, macros y parada de emergencia.',
      'Condiciones combinables con AND / OR y parada de emergencia con ESC.',
    ],
    limits: [
      'Funciona sobre Windows (usa su OCR nativo) y con un escritorio visible; no controla aplicaciones que no estén en pantalla.',
      'Una regla mal escrita puede hacer clic donde no debe. Conviene probar las reglas con la parada de emergencia a mano y evitar usarlas en pantallas con datos sensibles.',
      'Es una herramienta personal; no se distribuye como producto.',
    ],
    next: [
      'Agregar una vista previa que muestre dónde encontraría la imagen o el texto antes de ejecutar la acción.',
      'Registrar un historial de reglas disparadas con captura de la pantalla en ese momento.',
    ],
  },
  en: {
    lead: 'A desktop application that watches the screen and, when an image or text appears, runs a sequence of clicks and keystrokes. It is for leaving long tasks running unattended: installers asking "Continue" or agents asking "y/n".',
    context: [
      'Many long processes stall on a screen waiting for someone to click: an installer with a "Continue" button, a terminal agent asking whether to go on. That forces you to stay at the computer.',
      'Watching the screen by hand is wasted time and easy to forget: every unattended wait stops the process until somebody comes back. The tool replaces that vigilance with rules that run by themselves.',
    ],
    how: [
      { t: 'Capture the screen', d: 'The application (PyQt6) captures the screen continuously with the mss library, which is fast and does not depend on a browser.' },
      { t: 'Look for an image', d: 'OpenCV searches the capture for a reference image, for example a crop of a button. If it appears with enough similarity, the condition is met.' },
      { t: 'Look for text with OCR (version 2)', d: 'Version 2 adds Windows’ native OCR to look for a phrase instead of a crop. It is handier when the button changes size, colour or place.' },
      { t: 'IF / ELSE IF rules', d: 'Conditions are combined into multiple rules with AND / OR and IF / ELSE IF branches: "if X appears and Y does not, do this; otherwise do that".' },
      { t: 'Actions', d: 'Each rule triggers a sequence of clicks, keys, shortcuts and pauses. It can also be recorded with the macro recorder (F9 to finish), play a sound alert or show a Windows toast notification.' },
      { t: 'Keep watching, and be able to stop', d: 'After a rule runs, the application keeps watching. At any moment, ESC is an emergency stop that halts everything.' },
    ],
    concepts: [
      { t: 'Template matching', d: 'An OpenCV technique that slides a small image over a large one and measures how alike they are at every position. If the similarity exceeds a threshold, it counts as found.' },
      { t: 'OCR', d: 'Optical character recognition: turning screen pixels into searchable text.' },
      { t: 'IF / ELSE IF rule', d: 'A chain of conditions evaluated in order; the first one that holds is executed.' },
      { t: 'Macro', d: 'A recorded sequence of actions (clicks, keys, pauses) that can be replayed.' },
      { t: 'Emergency stop', d: 'A global key (ESC) that cuts any running automation.' },
    ],
    decisions: [
      { t: 'Search for text, not just images', d: 'A button crop breaks if the colour theme or the resolution changes. A phrase read by OCR survives those changes.' },
      { t: 'Rules instead of a single condition', d: 'Real processes have several possible screens. Rules with AND / OR let each one get a different response.' },
      { t: 'A stop that is always available', d: 'A tool that clicks by itself can be wrong. ESC as an emergency stop makes trying new rules safe.' },
      { t: 'Report what happened', d: 'Sound alerts and notifications let you know which rule ran even if you are not looking at the screen.' },
    ],
    verified: [
      'Two versions: v1 looks for images; v2 adds OCR, multiple rules, macros and an emergency stop.',
      'Conditions combinable with AND / OR and an emergency stop on ESC.',
    ],
    limits: [
      'It works on Windows (it uses its native OCR) with a visible desktop; it does not control applications that are not on screen.',
      'A badly written rule can click where it should not. Test rules with the emergency stop at hand and avoid using them on screens with sensitive data.',
      'It is a personal tool; it is not distributed as a product.',
    ],
    next: [
      'Add a preview showing where it would find the image or text before running the action.',
      'Keep a history of fired rules with a screenshot taken at that moment.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'El ciclo de vigilancia', en: 'The watch cycle' },
      caption: {
        es: 'La aplicación repite el ciclo sin parar; la tecla ESC corta la ejecución desde cualquier punto.',
        en: 'The application repeats the cycle non-stop; the ESC key cuts execution from any point.',
      },
      nodes: [
        { id: 'scr', label: { es: 'Pantalla', en: 'Screen' }, sub: { es: 'captura mss', en: 'mss capture' }, col: 0, row: 0 },
        { id: 'cond', label: { es: 'Condiciones', en: 'Conditions' }, sub: { es: 'imagen · OCR', en: 'image · OCR' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'rul', label: { es: 'Reglas', en: 'Rules' }, sub: 'IF / ELSE IF', col: 2, row: 0, tone: 'amber' },
        { id: 'act', label: { es: 'Acciones', en: 'Actions' }, sub: { es: 'clic · teclas · alerta', en: 'click · keys · alert' }, col: 3, row: 0, tone: 'emerald' },
        { id: 'esc', label: { es: 'Parada de emergencia', en: 'Emergency stop' }, sub: 'ESC', col: 3, row: 1, tone: 'amber' },
      ],
      edges: [
        { from: 'scr', to: 'cond', label: { es: 'cuadro', en: 'frame' } },
        { from: 'cond', to: 'rul', label: { es: 'cumple', en: 'met' } },
        { from: 'rul', to: 'act' },
        { from: 'act', to: 'scr', loopTop: true, dashed: true, label: { es: 'sigue vigilando', en: 'keeps watching' } },
        { from: 'esc', to: 'act', label: { es: 'detiene', en: 'stops' } },
      ],
    },
  ],
}
