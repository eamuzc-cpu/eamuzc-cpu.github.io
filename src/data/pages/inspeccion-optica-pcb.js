export default {
  status: { es: 'Funcional: el mismo motor del programa, en el navegador, con placas reales escaneadas', en: 'Working: the program’s own engine, in the browser, with real scanned boards' },
  related: ['visor-gerber-pcb', 'filtros-imagen-canny', 'zonas-riesgo-vision'],
  es: {
    lead: 'Un inspector óptico para placas de circuito impreso: compara cada placa con una referencia buena, la alinea a sub-píxel, encuentra el cobre de más y el que falta, y clasifica cada defecto según qué conductores toca o separa. Da un veredicto por placa, la posición de cada defecto en milímetros y un historial con informe.',
    context: [
      'En la fabricación de placas, los defectos típicos del cobre son cortocircuitos, pistas abiertas, mordidas, espolones, cobre espurio y pinholes. Revisarlos a ojo es lento y depende del cansancio del operador.',
      'La inspección por comparación con una placa patrón es el método clásico de los equipos AOI: no necesita miles de imágenes etiquetadas, solo una referencia buena del mismo diseño.',
    ],
    how: [
      { t: 'Alinear con la referencia', d: 'Busca puntos ORB en ambas imágenes, se queda con los emparejamientos claros (razón de Lowe) y estima una homografía con RANSAC. Luego la refina a sub-píxel con ECC. Si la placa tiene pocas esquinas, parte de la traslación que menos píxeles deja distintos.' },
      { t: 'Separar el cobre', d: 'Binariza la referencia y la placa alineada con Otsu. Funciona con cobre claro sobre fondo oscuro y con cobre oscuro sobre fondo claro, como en un escáner.' },
      { t: 'Exceso y falta de cobre', d: 'El exceso es cobre en la placa que no está en la referencia; la falta, lo contrario. Se ignora la franja de un píxel pegada a los bordes de la referencia, que es diferencia de registro y no defecto.' },
      { t: 'Descartar rayas', d: 'Las manchas de menos de dos píxeles de ancho medio (2·área / perímetro) se descartan: son rayas del escáner, no defectos de fabricación.' },
      { t: 'Clasificar por topología', d: 'Un exceso que une dos conductores es un cortocircuito, uno que toca uno solo es un espolón y uno suelto es cobre espurio. Una falta que parte un conductor es una pista abierta, una que lo muerde sin cortarlo es una mordida y una rodeada de cobre es un pinhole.' },
      { t: 'Veredicto e informe', d: 'Si hay un cortocircuito, una pista abierta o un pad ausente, la placa se rechaza; si solo hay defectos menores, queda para revisión. Cada defecto trae su posición en milímetros y un recorte junto a la referencia.' },
    ],
    concepts: [
      { t: 'AOI', d: 'Inspección óptica automatizada: cámaras o escáneres que revisan cada placa contra lo que debería ser, en vez de un operador con lupa.' },
      { t: 'Homografía', d: 'Transformación que lleva los puntos de una imagen plana a otra vista del mismo plano. Corrige traslación, giro, escala e inclinación de la cámara.' },
      { t: 'ECC', d: 'Método de alineación que ajusta la homografía maximizando la correlación entre las dos imágenes. Logra precisión de fracciones de píxel.' },
      { t: 'Topología', d: 'Lo que importa no es la forma de la mancha sino qué conecta o desconecta: una mordida y un corte pueden medir lo mismo y tener consecuencias opuestas.' },
      { t: 'IoU', d: 'Intersección sobre unión de dos cajas. La métrica oficial del conjunto DeepPCB cuenta una detección como correcta si su IoU con una caja real de la misma clase supera 0,33.' },
    ],
    decisions: [
      { t: 'Refinar a sub-píxel', d: 'Un desfase de un píxel convierte cada borde en una línea de defectos falsos. Con ECC, el F en placas reales pasa de 81,8 % (alineación del conjunto) a 93,4 %.' },
      { t: 'Topología en vez de forma', d: 'Con área y circularidad no hay manera de separar una mordida de un pinhole ni el cobre espurio de un espolón. Mirar qué conductores toca cada defecto separa las seis clases.' },
      { t: 'Calibrar con unas placas y medir con otras', d: 'Los umbrales se eligieron con 1000 pares de entrenamiento y la medición se hizo una vez con 500 pares distintos, que incluyen grupos de escaneo que la calibración nunca vio.' },
      { t: 'El mismo motor en el navegador', d: 'La demo no es una grabación: es el inspector escrito para OpenCV.js. Se validó con las mismas 500 placas y da F = 94,1 %.' },
    ],
    tour: [
      'Espera a que arriba aparezca «Motor listo» (descarga unos 10 MB la primera vez).',
      'En «Placas de ejemplo» toca «Placa 1»: verás el veredicto, los defectos numerados sobre la placa y la lista a la derecha.',
      'Toca un defecto de la lista para ver el recorte de la «Referencia» junto a la «Placa».',
      'Cambia entre «Placa», «Referencia» y «Diferencias»: en la última, rojo es cobre de más y ámbar cobre que falta.',
      'En «Tus imágenes» carga una referencia y una placa del mismo diseño y toca «Inspeccionar»: todo se procesa en tu navegador.',
    ],
    verified: [
      '500 placas reales del conjunto DeepPCB que no se usaron para calibrar: F = 93,4 % (precisión 92,4 %, recall 94,4 %); 94,8 % en los grupos de escaneo nuevos.',
      'Por tipo: pinhole 98,8 %, cobre espurio 98,3 %, pista abierta 92,9 %, cortocircuito 91,9 %, mordida 89,9 % y espolón 89,9 %.',
      'Motor del navegador en las mismas 500 placas: F = 94,1 %, sin ninguna placa sin alinear.',
      'Placas sintéticas con giro, inclinación y luz despareja: los siete tipos de defecto detectados y clasificados, sin falsos positivos en placas limpias.',
    ],
    limits: [
      'Buena parte de los defectos del conjunto DeepPCB se agregaron a mano sobre escaneos reales; no se probó en una línea de producción con cámara.',
      'Necesita una imagen de referencia buena del mismo diseño, capturada con la misma polaridad y una resolución parecida.',
      'El espolón y la mordida son las clases con más falsos positivos; por eso mandan la placa a revisión y no la rechazan.',
      'Las placas de ejemplo son de DeepPCB, que se publica para uso de investigación.',
    ],
    next: [
      'Probarlo con fotos de una línea real y una cámara fija con iluminación controlada.',
      'Agregar la inspección de componentes montados (presencia, polaridad y desplazamiento).',
      'Llevar el veredicto a un PLC o MES para separar las placas automáticamente.',
    ],
  },
  en: {
    lead: 'An optical inspector for printed circuit boards: it compares each board with a good reference, aligns it to sub-pixel accuracy, finds extra and missing copper, and classifies each defect by which conductors it touches or splits. It gives a verdict per board, each defect’s position in millimetres and a history with a report.',
    context: [
      'In board manufacturing, the typical copper defects are shorts, opens, mouse bites, spurs, spurious copper and pinholes. Checking them by eye is slow and depends on how tired the operator is.',
      'Inspection by comparison with a master board is the classic method of AOI equipment: it needs no thousands of labelled images, only one good reference of the same design.',
    ],
    how: [
      { t: 'Align with the reference', d: 'It finds ORB points in both images, keeps the clear matches (Lowe’s ratio) and estimates a homography with RANSAC. It then refines it to sub-pixel accuracy with ECC. If the board has few corners, it starts from the translation that leaves the fewest differing pixels.' },
      { t: 'Separate the copper', d: 'It binarizes the reference and the aligned board with Otsu. It works with light copper on a dark background and with dark copper on a light background, as from a scanner.' },
      { t: 'Extra and missing copper', d: 'Excess is copper on the board that is not on the reference; lack is the opposite. The one-pixel band next to the reference’s edges is ignored, since it is a registration difference and not a defect.' },
      { t: 'Discard streaks', d: 'Blobs less than two pixels in mean width (2·area / perimeter) are discarded: they are scanner streaks, not manufacturing defects.' },
      { t: 'Classify by topology', d: 'An excess that joins two conductors is a short, one that touches a single conductor is a spur and a loose one is spurious copper. A lack that splits a conductor is an open, one that bites it without cutting it is a mouse bite and one surrounded by copper is a pinhole.' },
      { t: 'Verdict and report', d: 'If there is a short, an open or a missing pad, the board is rejected; if there are only minor defects, it goes to review. Each defect comes with its position in millimetres and a crop next to the reference.' },
    ],
    concepts: [
      { t: 'AOI', d: 'Automated optical inspection: cameras or scanners that check each board against what it should be, instead of an operator with a magnifier.' },
      { t: 'Homography', d: 'A transformation that maps the points of a flat image to another view of the same plane. It corrects translation, rotation, scale and camera tilt.' },
      { t: 'ECC', d: 'An alignment method that adjusts the homography by maximizing the correlation between the two images. It reaches fractions-of-a-pixel accuracy.' },
      { t: 'Topology', d: 'What matters is not the blob’s shape but what it connects or disconnects: a mouse bite and a cut can measure the same and have opposite consequences.' },
      { t: 'IoU', d: 'Intersection over union of two boxes. The DeepPCB set’s official metric counts a detection as correct if its IoU with a real box of the same class exceeds 0.33.' },
    ],
    decisions: [
      { t: 'Refine to sub-pixel', d: 'A one-pixel offset turns every edge into a line of false defects. With ECC, F on real boards goes from 81.8% (the set’s alignment) to 93.4%.' },
      { t: 'Topology instead of shape', d: 'With area and circularity there is no way to tell a mouse bite from a pinhole or spurious copper from a spur. Looking at which conductors each defect touches separates the six classes.' },
      { t: 'Calibrate on some boards and measure on others', d: 'The thresholds were chosen with 1000 training pairs and the measurement was made once on 500 different pairs, including scan groups the calibration never saw.' },
      { t: 'The same engine in the browser', d: 'The demo is not a recording: it is the inspector written for OpenCV.js. It was validated on the same 500 boards and scores F = 94.1%.' },
    ],
    tour: [
      'Wait until "Motor listo" (engine ready) appears at the top (it downloads about 10 MB the first time).',
      'Under "Placas de ejemplo" (example boards) tap "Placa 1": you will see the verdict, the numbered defects on the board and the list on the right.',
      'Tap a defect in the list to see the crop of the "Referencia" (reference) next to the "Placa" (board).',
      'Switch between "Placa", "Referencia" and "Diferencias" (differences): in the last one, red is extra copper and amber is missing copper.',
      'Under "Tus imágenes" (your images) load a reference and a board of the same design and tap "Inspeccionar": everything is processed in your browser.',
    ],
    verified: [
      '500 real boards from the DeepPCB set not used for calibration: F = 93.4% (precision 92.4%, recall 94.4%); 94.8% on the new scan groups.',
      'By type: pinhole 98.8%, spurious copper 98.3%, open 92.9%, short 91.9%, mouse bite 89.9% and spur 89.9%.',
      'Browser engine on the same 500 boards: F = 94.1%, with no board left unaligned.',
      'Synthetic boards with rotation, tilt and uneven light: all seven defect types detected and classified, with no false positives on clean boards.',
    ],
    limits: [
      'Many of the DeepPCB set’s defects were added by hand over real scans; it was not tested on a production line with a camera.',
      'It needs a good reference image of the same design, captured with the same polarity and a similar resolution.',
      'Spurs and mouse bites are the classes with the most false positives; that is why they send the board to review instead of rejecting it.',
      'The example boards come from DeepPCB, which is published for research use.',
    ],
    next: [
      'Test it with photos from a real line and a fixed camera with controlled lighting.',
      'Add inspection of mounted components (presence, polarity and offset).',
      'Send the verdict to a PLC or MES to sort the boards automatically.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'De la imagen al veredicto', en: 'From image to verdict' },
      caption: {
        es: 'La referencia sirve dos veces: para alinear la placa y para saber dónde debería haber cobre. La clasificación mira qué conductores de la referencia toca o separa cada mancha.',
        en: 'The reference is used twice: to align the board and to know where copper should be. Classification looks at which reference conductors each blob touches or splits.',
      },
      nodes: [
        { id: 'ref', label: { es: 'Referencia', en: 'Reference' }, sub: { es: 'placa buena', en: 'good board' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'pla', label: { es: 'Placa', en: 'Board' }, sub: { es: 'escaneo o foto', en: 'scan or photo' }, col: 0, row: 1 },
        { id: 'ali', label: { es: 'Alineación', en: 'Alignment' }, sub: 'ORB · RANSAC · ECC', col: 1, row: 1, tone: 'cyan' },
        { id: 'dif', label: { es: 'Diferencia', en: 'Difference' }, sub: { es: 'exceso · falta', en: 'excess · lack' }, col: 2, row: 1 },
        { id: 'top', label: { es: 'Topología', en: 'Topology' }, sub: { es: 'qué conductor toca', en: 'which conductor' }, col: 3, row: 1, tone: 'magenta' },
        { id: 'ver', label: { es: 'Veredicto', en: 'Verdict' }, sub: { es: 'aprobada · rechazada', en: 'pass · reject' }, col: 4, row: 1, tone: 'amber' },
      ],
      edges: [
        { from: 'ref', to: 'ali' },
        { from: 'pla', to: 'ali', label: 'H' },
        { from: 'ali', to: 'dif', label: { es: 'alineada', en: 'aligned' } },
        { from: 'ref', to: 'top', label: { es: 'conductores', en: 'conductors' } },
        { from: 'dif', to: 'top', label: { es: 'manchas', en: 'blobs' } },
        { from: 'top', to: 'ver' },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'F en 500 placas reales', en: 'F on 500 real boards' },
      caption: {
        es: 'Correcto = IoU mayor a 0,33 con una anotación de la misma clase. El motor del navegador rinde igual que el programa en Python, y la alineación sub-píxel es lo que más pesa.',
        en: 'Correct = IoU above 0.33 with an annotation of the same class. The browser engine performs like the Python program, and sub-pixel alignment is what weighs the most.',
      },
      rows: [
        {
          label: { es: 'Dónde corre el motor', en: 'Where the engine runs' },
          items: [
            { label: { es: 'Programa (Python)', en: 'Program (Python)' }, value: 93.4, text: '93,4 %', tone: 'emerald' },
            { label: { es: 'Demo (navegador)', en: 'Demo (browser)' }, value: 94.1, text: '94,1 %', tone: 'cyan' },
          ],
        },
        {
          label: { es: 'Alineación', en: 'Alignment' },
          items: [
            { label: { es: 'ORB + ECC sub-píxel', en: 'ORB + ECC sub-pixel' }, value: 93.4, text: '93,4 %', tone: 'emerald' },
            { label: { es: 'La que trae el conjunto', en: 'The set’s own' }, value: 81.8, text: '81,8 %', tone: 'magenta' },
          ],
        },
      ],
    },
  ],
}
