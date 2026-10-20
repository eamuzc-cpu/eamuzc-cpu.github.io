export default {
  status: { es: 'Simulado: esquinas generadas con el modelo (sin foto ni cámara)', en: 'Simulated: corners generated with the model (no photo or camera)' },
  related: ['filtros-imagen-canny', 'vision-tracking-deportivo', 'brazo-robotico-4gdl'],
  es: {
    lead: 'Una lente barril o almohadilla curva las rectas. Aquí se eligen los coeficientes radiales y tangenciales, se ve el tablero de ajedrez distorsionado y se corrige con una tabla de consulta inversa y remuestreo bilineal. También se calibra: se «detectan» las esquinas con ruido, se resuelven los coeficientes por mínimos cuadrados y se mide el error de reproyección.',
    context: [
      'La distorsión no tiene inversa cerrada, y los coeficientes k1 y k2 se confunden entre sí si el patrón de calibración no cubre todo el campo.',
      'El proyecto muestra cuánto cubre un buen patrón de calibración y la diferencia entre un error de reproyección pequeño y coeficientes bien determinados.',
    ],
    how: [
      { t: 'El modelo de Brown-Conrady', d: 'Cinco coeficientes describen la distorsión: k1, k2 y k3 son radiales (barril o almohadilla) y p1 y p2 tangenciales (lente mal centrada). Se verificó con un valor calculado a mano y con la simetría radial.' },
      { t: 'Distorsionar el tablero', d: 'Un tablero de ajedrez ideal pasa por el modelo y sus rectas se curvan, igual que con una lente real.' },
      { t: 'La inversa con Newton', d: 'Como no existe una fórmula cerrada, la posición sin distorsión de cada punto se obtiene resolviendo con el método de Newton (error menor a 1e-10 en 500 puntos).' },
      { t: 'Corregir con remuestreo', d: 'Para cada píxel de la imagen corregida se calcula en qué lugar de la imagen distorsionada estaría y se interpola bilinealmente. Es el mapeo inverso del shader del informe, en JavaScript sin WebGL.' },
      { t: 'Calibrar', d: 'Con las esquinas del tablero (con ruido de 0,3 px) y la matriz intrínseca conocida, la calibración es lineal y se resuelve con ecuaciones normales por mínimos cuadrados.' },
      { t: 'Error de reproyección', d: 'Se reproyectan las esquinas con los coeficientes obtenidos y se mide la distancia a las observadas. Con un tablero de 13 × 9 esquinas, el error es de 0,04 px.' },
    ],
    concepts: [
      { t: 'Distorsión radial', d: 'Las rectas se curvan hacia afuera (barril) o hacia adentro (almohadilla) según la distancia al centro de la imagen.' },
      { t: 'Distorsión tangencial', d: 'Aparece cuando el sensor y la lente no están perfectamente paralelos; desplaza los puntos en dirección tangente.' },
      { t: 'Error de reproyección', d: 'Distancia, en píxeles, entre las esquinas observadas y las que se obtienen al proyectar el patrón con los parámetros estimados.' },
      { t: 'Mapeo inverso', d: 'Para corregir una imagen conviene recorrer los píxeles de destino y buscar de dónde vienen, y no al revés: así no quedan huecos.' },
      { t: 'Interpolación bilineal', d: 'Promedia los cuatro píxeles vecinos con pesos según la posición fraccionaria, para obtener un valor suave.' },
    ],
    decisions: [
      { t: 'Inversa numérica', d: 'Newton converge rápido y con precisión, y evita depender de aproximaciones de primer orden que fallan en los bordes.' },
      { t: 'Calibrar con muchas esquinas', d: 'Con 9 × 6 esquinas k2 tenía una desviación de ±0,14; con 13 × 9 baja a ±0,02. Más cobertura del campo determina mejor los coeficientes.' },
      { t: 'Distinguir error pequeño de coeficientes buenos', d: 'Un error de reproyección bajo no garantiza coeficientes bien determinados: por eso se mide también su desviación.' },
      { t: 'Declarar el alcance', d: 'No es una calibración de cámara completa: no estima fx, fy, cx, cy ni usa varias vistas, y las esquinas se generan con el modelo, no se detectan en una foto.' },
    ],
    tour: [
      'En «Coeficientes de la lente» elige un preajuste («Barril fuerte», «Almohadilla», «Gran angular + tangencial») y mira el «Tablero distorsionado → corregido».',
      'Mueve «k1 (radial)», «k2», «k3», «p1 (tangencial)» y «p2» y observa cómo se curvan las rectas.',
      'Marca «mostrar esquinas» para ver los puntos que usa la calibración.',
      'Sube el «Ruido de las esquinas» y pulsa «Calibrar con las esquinas ruidosas»: en «Resultado de la calibración» verás el error de reproyección y la desviación de cada coeficiente.',
      'Con el preajuste «Sin distorsión» comprueba que la corrección no altera la imagen.',
    ],
    verified: [
      'La inversa con Newton tiene un error menor a 1e-10 en 500 puntos.',
      'De punta a punta, el tablero corregido reproduce al ideal con un error medio menor a 12 niveles y las filas de esquinas vuelven a ser rectas (< 0,01 px).',
      'Con un tablero de 13 × 9 esquinas y 0,3 px de ruido, el error de reproyección es de 0,04 px; la desviación de k2 baja de ±0,14 (9 × 6) a ±0,02 (13 × 9). 11 pruebas automáticas.',
    ],
    limits: [
      'No es una calibración de cámara completa: no estima fx, fy, cx, cy ni usa varias vistas.',
      'Las esquinas se generan con el modelo; no se detectan en una foto real.',
      'Es una simulación, sin hardware ni prototipo.',
    ],
    next: [
      'Detectar las esquinas de un tablero real en una foto subida.',
      'Estimar también la matriz intrínseca y usar varias vistas del tablero.',
    ],
  },
  en: {
    lead: 'A barrel or pincushion lens bends straight lines. Here the radial and tangential coefficients are chosen, the distorted chessboard is seen and corrected with an inverse lookup table and bilinear resampling. It also calibrates: the corners are "detected" with noise, the coefficients are solved by least squares and the reprojection error is measured.',
    context: [
      'Distortion has no closed-form inverse, and the k1 and k2 coefficients get confused with each other if the calibration pattern does not cover the whole field.',
      'The project shows how much a good calibration pattern covers and the difference between a small reprojection error and well-determined coefficients.',
    ],
    how: [
      { t: 'The Brown-Conrady model', d: 'Five coefficients describe the distortion: k1, k2 and k3 are radial (barrel or pincushion) and p1 and p2 tangential (a badly centred lens). It was verified with a hand-calculated value and with radial symmetry.' },
      { t: 'Distort the chessboard', d: 'An ideal chessboard goes through the model and its lines curve, just as with a real lens.' },
      { t: 'The inverse with Newton', d: 'Since no closed-form formula exists, each point’s undistorted position is obtained by solving with Newton’s method (error below 1e-10 across 500 points).' },
      { t: 'Correct with resampling', d: 'For each pixel of the corrected image it is computed where it would be in the distorted image and bilinearly interpolated. It is the report’s shader inverse mapping, in JavaScript without WebGL.' },
      { t: 'Calibrate', d: 'With the chessboard corners (with 0.3 px of noise) and the known intrinsic matrix, the calibration is linear and is solved with normal equations by least squares.' },
      { t: 'Reprojection error', d: 'The corners are reprojected with the obtained coefficients and the distance to the observed ones is measured. With a 13 × 9-corner board, the error is 0.04 px.' },
    ],
    concepts: [
      { t: 'Radial distortion', d: 'Lines curve outwards (barrel) or inwards (pincushion) depending on the distance to the image centre.' },
      { t: 'Tangential distortion', d: 'It appears when the sensor and lens are not perfectly parallel; it shifts points in the tangential direction.' },
      { t: 'Reprojection error', d: 'The distance, in pixels, between the observed corners and those obtained when projecting the pattern with the estimated parameters.' },
      { t: 'Inverse mapping', d: 'To correct an image it is better to walk through the destination pixels and look for where they come from, not the reverse: that way there are no holes.' },
      { t: 'Bilinear interpolation', d: 'It averages the four neighbouring pixels with weights according to the fractional position, to obtain a smooth value.' },
    ],
    decisions: [
      { t: 'Numerical inverse', d: 'Newton converges fast and precisely, and avoids depending on first-order approximations that fail at the edges.' },
      { t: 'Calibrate with many corners', d: 'With 9 × 6 corners k2 had a deviation of ±0.14; with 13 × 9 it drops to ±0.02. More field coverage determines the coefficients better.' },
      { t: 'Tell a small error from good coefficients', d: 'A low reprojection error does not guarantee well-determined coefficients: that is why their deviation is measured too.' },
      { t: 'State the scope', d: 'It is not a full camera calibration: it does not estimate fx, fy, cx, cy nor use several views, and the corners are generated with the model, not detected in a photo.' },
    ],
    tour: [
      'Under "Coeficientes de la lente" (lens coefficients) choose a preset ("Barril fuerte" strong barrel, "Almohadilla" pincushion, "Gran angular + tangencial" wide-angle + tangential) and look at the "Tablero distorsionado → corregido".',
      'Move "k1 (radial)", "k2", "k3", "p1 (tangencial)" and "p2" and watch the lines curve.',
      'Tick "mostrar esquinas" (show corners) to see the points the calibration uses.',
      'Raise the "Ruido de las esquinas" (corner noise) and press "Calibrar con las esquinas ruidosas" (calibrate with the noisy corners): under "Resultado de la calibración" you will see the reprojection error and each coefficient’s deviation.',
      'With the "Sin distorsión" preset check that the correction does not alter the image.',
    ],
    verified: [
      'The inverse with Newton has an error below 1e-10 across 500 points.',
      'End to end, the corrected board reproduces the ideal with a mean error under 12 levels and the corner rows are straight again (< 0.01 px).',
      'With a 13 × 9-corner board and 0.3 px of noise, the reprojection error is 0.04 px; k2’s deviation falls from ±0.14 (9 × 6) to ±0.02 (13 × 9). 11 automated tests.',
    ],
    limits: [
      'It is not a full camera calibration: it does not estimate fx, fy, cx, cy nor use several views.',
      'The corners are generated with the model; they are not detected in a real photo.',
      'It is a simulation, with no hardware or prototype.',
    ],
    next: [
      'Detect the corners of a real chessboard in an uploaded photo.',
      'Also estimate the intrinsic matrix and use several views of the board.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Distorsionar, calibrar y corregir', en: 'Distort, calibrate and correct' },
      caption: {
        es: 'El tablero ideal se distorsiona con la lente; las esquinas observadas permiten calibrar; con los coeficientes estimados se corrige la imagen. La reproyección cierra el círculo: dice qué tan bien se estimó.',
        en: 'The ideal chessboard is distorted by the lens; the observed corners allow calibrating; with the estimated coefficients the image is corrected. Reprojection closes the loop: it says how well it was estimated.',
      },
      nodes: [
        { id: 'tab', label: { es: 'Tablero', en: 'Chessboard' }, sub: { es: 'esquinas ideales', en: 'ideal corners' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'len', label: { es: 'Lente', en: 'Lens' }, sub: 'k1 k2 k3 p1 p2', col: 1, row: 0, tone: 'magenta' },
        { id: 'cal', label: { es: 'Calibración', en: 'Calibration' }, sub: { es: 'mínimos cuadrados', en: 'least squares' }, col: 2, row: 0 },
        { id: 'cor', label: { es: 'Corrección', en: 'Correction' }, sub: { es: 'LUT + bilineal', en: 'LUT + bilinear' }, col: 3, row: 0, tone: 'amber' },
      ],
      edges: [
        { from: 'tab', to: 'len' },
        { from: 'len', to: 'cal', label: { es: 'esquinas', en: 'corners' } },
        { from: 'cal', to: 'cor', label: 'k, p' },
        { from: 'cor', to: 'tab', loop: true, dashed: true, label: { es: 'error de reproyección', en: 'reprojection error' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Cuántas esquinas hacen falta', en: 'How many corners are needed' },
      caption: {
        es: 'Desviación de k2 al calibrar con 0,3 px de ruido. Con más esquinas, que cubren mejor el campo, el coeficiente queda mucho mejor determinado.',
        en: 'Deviation of k2 when calibrating with 0.3 px of noise. With more corners, covering the field better, the coefficient is determined much better.',
      },
      rows: [
        {
          label: { es: 'Desviación de k2 (±)', en: 'Deviation of k2 (±)' },
          items: [
            { label: { es: 'Tablero de 9 × 6 esquinas', en: '9 × 6-corner board' }, value: 0.14, text: '± 0,14', tone: 'magenta' },
            { label: { es: 'Tablero de 13 × 9 esquinas', en: '13 × 9-corner board' }, value: 0.02, text: '± 0,02', tone: 'emerald' },
          ],
        },
      ],
    },
  ],
}
