export default {
  status: { es: 'Simulado: procesamiento propio en el navegador (sin librerías de visión)', en: 'Simulated: own processing in the browser (no vision libraries)' },
  related: ['distorsion-lente-calibracion', 'laboratorio-fractales', 'zonas-riesgo-vision'],
  es: {
    lead: 'Cada etapa de un detector de bordes escrita sobre arreglos planos y sin librerías de visión: luminancia BT.709, suavizado gaussiano de 5 × 5, Sobel, supresión de no-máximos e histéresis de doble umbral. Funciona con una escena sintética o con una imagen que subes, y mide cada etapa.',
    context: [
      'Los detectores de bordes parecen simples hasta que se programan: el sentido del gradiente, la supresión de no-máximos y la histéresis esconden errores que no se ven a simple vista.',
      'Escribir cada etapa a mano dejó al descubierto que el código de supresión de no-máximos del informe tiene las dos diagonales intercambiadas para su propio operador de Sobel.',
    ],
    how: [
      { t: 'Luminancia BT.709', d: 'La imagen a color se convierte a gris con 0,2126·R + 0,7152·G + 0,0722·B, los pesos que reflejan cuánto contribuye cada color a la sensación de brillo.' },
      { t: 'Suavizado gaussiano 5 × 5', d: 'Una convolución con un núcleo gaussiano reduce el ruido antes de derivar. Los bordes de la imagen se tratan replicando el píxel extremo.' },
      { t: 'Sobel', d: 'Dos convoluciones (horizontal y vertical) dan el gradiente. Se usa la convención del informe, con Gy positivo hacia abajo.' },
      { t: 'Supresión de no-máximos', d: 'Cada píxel se compara con sus dos vecinos en la dirección del gradiente y se conserva solo si es el máximo, para que el borde quede de un píxel de ancho.' },
      { t: 'Histéresis de doble umbral', d: 'Los píxeles sobre el umbral alto son bordes seguros; los que están entre ambos umbrales solo se conservan si se conectan con uno seguro (conectividad de 8 vecinos).' },
      { t: 'Ver cada etapa', d: 'La página muestra seis paneles (original, luminancia, gaussiano, magnitud de Sobel, no-máximos y Canny) y mide el tiempo de cada etapa.' },
    ],
    concepts: [
      { t: 'Convolución', d: 'Operación que reemplaza cada píxel por una suma ponderada de sus vecinos. Es la base del suavizado y de los operadores de gradiente.' },
      { t: 'Operador de Sobel', d: 'Par de núcleos 3 × 3 que estiman la derivada horizontal y vertical de la imagen y, de ahí, la magnitud y la dirección del borde.' },
      { t: 'Supresión de no-máximos', d: 'Adelgaza los bordes: mantiene solo los píxeles que son máximos locales del gradiente en su dirección.' },
      { t: 'Histéresis', d: 'Usar dos umbrales (alto y bajo) para conservar bordes débiles conectados a bordes fuertes y descartar el ruido aislado.' },
      { t: 'Convención de ejes', d: 'En una imagen, y crece hacia abajo; si el operador y la tabla de vecinos suponen sentidos distintos, las diagonales quedan invertidas.' },
    ],
    decisions: [
      { t: 'Sin librerías', d: 'Escribir cada etapa sobre arreglos planos obliga a entender qué hace y cuánto cuesta.' },
      { t: 'Mostrar el NMS del informe', d: 'Un interruptor permite activar el NMS con las diagonales invertidas del informe y compararlo con el corregido.' },
      { t: 'Verificar con casos sencillos', d: 'Sobel con escalones y rampas (4·255 = 1020 en un escalón), la reducción de ruido del gaussiano y bordes de un rectángulo con pocos píxeles de error.' },
      { t: 'Medir el rendimiento', d: 'La página mide 2 a 4 Mpíxel/s. El informe plantea 60 fps en 1080p, que esta versión no alcanza.' },
    ],
    tour: [
      'En «Imagen» deja «Escena sintética» y mira los seis paneles, de «1 · Original» a «6 · Canny (histéresis)».',
      'Sube el «Ruido de la escena» y ajusta el «σ del gaussiano», el «Umbral alto» y el «Umbral bajo» para ver cómo cambia el resultado.',
      'Marca «NMS del informe (diagonales invertidas)» y compara: los bordes en diagonal quedan más gruesos y se fragmentan.',
      'En «Imagen» elige «Subir una imagen…» y prueba con una foto propia (se procesa en tu navegador).',
      'Mira el tiempo de cada etapa: unos 2 a 4 Mpíxel/s.',
    ],
    verified: [
      'Sobel con escalones y rampas (4·255 = 1020 en un escalón), reducción de ruido del gaussiano a la suma de cuadrados del núcleo, histéresis y bordes de un rectángulo a ≤ 2 px del contorno con ≥ 95 % de cobertura.',
      'Con el NMS del informe, un borde recto a 45° queda el doble de grueso (≈ 3,9 px por fila frente a ≈ 1,9); en una escena con curvas hay ≈ 890 píxeles de borde frente a ≈ 1300 con la versión corregida (−31 %).',
      '11 pruebas automáticas; rendimiento de 2 a 4 Mpíxel/s.',
    ],
    limits: [
      'El informe plantea 60 fps y esta versión llega a 1 a 2 fps equivalentes en 1080p en el hilo principal de JavaScript; no usa Web Workers ni WebGL.',
      'No usa cámara web: trabaja con una escena sintética o con una imagen cargada.',
      'Es una simulación, sin hardware ni prototipo.',
    ],
    next: [
      'Mover el procesamiento a un Web Worker o a un shader para acercarse a los 60 fps.',
      'Agregar la transformada de Hough para detectar líneas a partir de los bordes.',
    ],
  },
  en: {
    lead: 'Each stage of an edge detector written on flat arrays and without vision libraries: BT.709 luminance, 5 × 5 Gaussian smoothing, Sobel, non-maximum suppression and double-threshold hysteresis. It works with a synthetic scene or an image you upload, and measures each stage.',
    context: [
      'Edge detectors look simple until you program them: gradient direction, non-maximum suppression and hysteresis hide errors that cannot be seen at a glance.',
      'Writing each stage by hand revealed that the report’s non-maximum-suppression code has its two diagonals swapped for its own Sobel operator.',
    ],
    how: [
      { t: 'BT.709 luminance', d: 'The colour image is converted to grey with 0.2126·R + 0.7152·G + 0.0722·B, the weights reflecting how much each colour contributes to the sensation of brightness.' },
      { t: '5 × 5 Gaussian smoothing', d: 'A convolution with a Gaussian kernel reduces noise before differentiating. Image borders are handled by replicating the edge pixel.' },
      { t: 'Sobel', d: 'Two convolutions (horizontal and vertical) give the gradient. The report’s convention is used, with Gy positive downwards.' },
      { t: 'Non-maximum suppression', d: 'Each pixel is compared with its two neighbours along the gradient direction and kept only if it is the maximum, so the edge ends up one pixel wide.' },
      { t: 'Double-threshold hysteresis', d: 'Pixels above the high threshold are certain edges; those between the two thresholds are kept only if connected to a certain one (8-neighbour connectivity).' },
      { t: 'See each stage', d: 'The page shows six panels (original, luminance, Gaussian, Sobel magnitude, non-maxima and Canny) and measures each stage’s time.' },
    ],
    concepts: [
      { t: 'Convolution', d: 'An operation that replaces each pixel with a weighted sum of its neighbours. It is the basis of smoothing and gradient operators.' },
      { t: 'Sobel operator', d: 'A pair of 3 × 3 kernels that estimate the image’s horizontal and vertical derivative and, from them, the edge’s magnitude and direction.' },
      { t: 'Non-maximum suppression', d: 'It thins edges: it keeps only pixels that are local gradient maxima along their direction.' },
      { t: 'Hysteresis', d: 'Using two thresholds (high and low) to keep weak edges connected to strong ones and discard isolated noise.' },
      { t: 'Axis convention', d: 'In an image, y grows downwards; if the operator and the neighbour table assume different directions, the diagonals end up swapped.' },
    ],
    decisions: [
      { t: 'No libraries', d: 'Writing each stage on flat arrays forces you to understand what it does and what it costs.' },
      { t: 'Show the report’s NMS', d: 'A switch lets you turn on the NMS with the report’s swapped diagonals and compare it with the corrected one.' },
      { t: 'Verify with simple cases', d: 'Sobel with steps and ramps (4·255 = 1020 on a step), the Gaussian’s noise reduction and a rectangle’s edges with few pixels of error.' },
      { t: 'Measure performance', d: 'The page measures 2 to 4 Mpixel/s. The report poses 60 fps at 1080p, which this version does not reach.' },
    ],
    tour: [
      'Under "Imagen" (image) leave "Escena sintética" (synthetic scene) and look at the six panels, from "1 · Original" to "6 · Canny (histéresis)".',
      'Raise the "Ruido de la escena" (scene noise) and adjust the "σ del gaussiano", the "Umbral alto" (high threshold) and the "Umbral bajo" (low threshold) to see how the result changes.',
      'Tick "NMS del informe (diagonales invertidas)" (the report’s NMS, swapped diagonals) and compare: diagonal edges get thicker and fragment.',
      'Under "Imagen" choose "Subir una imagen…" (upload an image) and try one of your own photos (it is processed in your browser).',
      'Look at each stage’s time: about 2 to 4 Mpixel/s.',
    ],
    verified: [
      'Sobel with steps and ramps (4·255 = 1020 on a step), Gaussian noise reduction to the kernel’s sum of squares, hysteresis and a rectangle’s edges within ≤ 2 px of the outline with ≥ 95 % coverage.',
      'With the report’s NMS, a straight 45° edge comes out twice as thick (≈ 3.9 px per row versus ≈ 1.9); in a scene with curves there are ≈ 890 edge pixels against ≈ 1300 with the corrected version (−31 %).',
      '11 automated tests; performance of 2 to 4 Mpixel/s.',
    ],
    limits: [
      'The report poses 60 fps and this version reaches 1 to 2 equivalent fps at 1080p on JavaScript’s main thread; it uses no Web Workers or WebGL.',
      'It does not use a webcam: it works with a synthetic scene or an uploaded image.',
      'It is a simulation, with no hardware or prototype.',
    ],
    next: [
      'Move the processing to a Web Worker or a shader to get closer to 60 fps.',
      'Add the Hough transform to detect lines from the edges.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Las etapas de Canny', en: 'The Canny stages' },
      caption: {
        es: 'Cada etapa recibe el resultado de la anterior. Los umbrales de la histéresis se ajustan mirando el resultado, y es ahí donde se decide qué es borde y qué es ruido.',
        en: 'Each stage takes the previous one’s result. The hysteresis thresholds are adjusted by looking at the result, and that is where it is decided what is an edge and what is noise.',
      },
      nodes: [
        { id: 'img', label: { es: 'Imagen', en: 'Image' }, sub: 'RGBA', col: 0, row: 0, tone: 'emerald' },
        { id: 'gau', label: { es: 'Suavizado', en: 'Smoothing' }, sub: 'Gauss 5×5', col: 1, row: 0 },
        { id: 'sob', label: { es: 'Gradiente', en: 'Gradient' }, sub: 'Sobel · NMS', col: 2, row: 0, tone: 'magenta' },
        { id: 'bor', label: { es: 'Bordes', en: 'Edges' }, sub: { es: 'histéresis', en: 'hysteresis' }, col: 3, row: 0, tone: 'amber' },
      ],
      edges: [
        { from: 'img', to: 'gau', label: { es: 'gris', en: 'grey' } },
        { from: 'gau', to: 'sob' },
        { from: 'sob', to: 'bor', label: 'G, θ' },
        { from: 'bor', to: 'sob', loop: true, dashed: true, label: { es: 'umbrales', en: 'thresholds' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'El error del informe en la supresión de no-máximos', en: 'The report’s error in non-maximum suppression' },
      caption: {
        es: 'Con las diagonales intercambiadas, un borde a 45° sale el doble de grueso y, en una escena con curvas, el contorno se fragmenta y se pierde un 31 % de los píxeles de borde.',
        en: 'With swapped diagonals, a 45° edge comes out twice as thick and, in a scene with curves, the outline fragments and 31 % of the edge pixels are lost.',
      },
      rows: [
        {
          label: { es: 'Grosor de un borde a 45° (píxeles por fila)', en: 'Thickness of a 45° edge (pixels per row)' },
          items: [
            { label: { es: 'NMS del informe', en: 'Report NMS' }, value: 3.9, text: '≈ 3,9', tone: 'magenta' },
            { label: { es: 'NMS corregido', en: 'Corrected NMS' }, value: 1.9, text: '≈ 1,9', tone: 'emerald' },
          ],
        },
        {
          label: { es: 'Píxeles de borde en una escena con curvas', en: 'Edge pixels in a scene with curves' },
          items: [
            { label: { es: 'NMS del informe', en: 'Report NMS' }, value: 890, text: '≈ 890', tone: 'magenta' },
            { label: { es: 'NMS corregido', en: 'Corrected NMS' }, value: 1300, text: '≈ 1300', tone: 'emerald' },
          ],
        },
      ],
    },
  ],
}
