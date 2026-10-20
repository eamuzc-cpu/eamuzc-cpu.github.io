export default {
  status: { es: 'Proyecto de I+D personal (prototipo funcional)', en: 'Personal R&D project (working prototype)' },
  related: ['zonas-riesgo-vision', 'deteccion-personas-aforo', 'distorsion-lente-calibracion'],
  es: {
    lead: 'Un pipeline de visión artificial que, con una sola cámara de video común, reconstruye las trayectorias de los jugadores y sus mapas de calor sobre un plano 2D de la cancha, sin sensores en el cuerpo ni infraestructura costosa.',
    context: [
      'El análisis táctico en deportes suele apoyarse en sistemas caros: varias cámaras calibradas o chips GPS en cada jugador. Eso deja fuera a los equipos sin ese presupuesto, aunque lo que piden (dónde estuvo cada jugador, cuánto corrió, dónde se concentró el juego) se puede estimar a partir del video.',
      'El reto es que una cámara solo entrega píxeles en perspectiva: dos jugadores a la misma distancia real se ven de tamaños distintos, y cuando se cruzan uno tapa al otro. Había que convertir esos píxeles en metros sobre la cancha y mantener la identidad de cada jugador a pesar de las oclusiones.',
    ],
    how: [
      { t: 'Una sola toma de video', d: 'La entrada es video de una cámara estándar. No se requieren sensores wearables (cero) ni más de una cámara.' },
      { t: 'Detección en cada cuadro', d: 'YOLOv8 detecta personas y balón en cada frame. En una GPU RTX el procesamiento supera los 45 cuadros por segundo.' },
      { t: 'Homografía de perspectiva', d: 'Con OpenCV se calcula una homografía: una transformación que lleva un punto de la imagen a su posición en un plano 2D de la cancha, a partir de puntos conocidos de la cancha (por ejemplo, las esquinas de las líneas).' },
      { t: 'Seguimiento con filtros de estimación', d: 'Cada jugador se sigue entre cuadros. Los filtros de estimación predicen dónde debería estar y corrigen con cada detección, de modo que el seguimiento se sostiene cuando otro jugador lo tapa por unos cuadros.' },
      { t: 'Métricas', d: 'Con las posiciones sobre el plano se obtienen trayectorias, velocidades y mapas de calor por jugador.' },
    ],
    concepts: [
      { t: 'Detección y seguimiento', d: 'Detectar es decir «hay una persona aquí» en un cuadro; seguir es decidir que la persona del cuadro 100 es la misma del cuadro 101.' },
      { t: 'Homografía', d: 'Matriz 3×3 que relaciona dos vistas de un mismo plano. Con al menos cuatro puntos conocidos se calcula, y permite pasar de píxeles de la cámara a metros de la cancha.' },
      { t: 'Oclusión', d: 'Cuando un objeto tapa a otro. El seguimiento debe predecir la posición durante esos cuadros y recuperar la identidad al reaparecer.' },
      { t: 'Mapa de calor', d: 'Imagen que muestra cuánto tiempo estuvo un jugador (o el balón) en cada zona de la cancha.' },
    ],
    decisions: [
      { t: 'Una cámara, no varias', d: 'Es la restricción central del proyecto: si hace falta un montaje con muchas cámaras, deja de ser accesible. Todo el diseño parte de ahí.' },
      { t: 'Proyectar al plano de la cancha', d: 'Medir en píxeles engaña (el jugador lejano parece más lento). Pasar a metros antes de calcular velocidades y distancias hace que las métricas tengan sentido físico.' },
      { t: 'Filtrar en vez de confiar en la detección cuadro a cuadro', d: 'Un detector puede fallar en un cuadro. Un filtro de estimación suaviza esos fallos y evita que la trayectoria salte.' },
    ],
    verified: [
      'Precisión de trayectoria reportada: 94 %.',
      'Procesamiento sobre 45 FPS en GPU RTX; cero sensores wearables.',
    ],
    limits: [
      'Es un prototipo de I+D personal; la precisión depende de la cámara, la iluminación y de qué tan bien se marquen los puntos de referencia de la cancha.',
      'La homografía supone que los pies del jugador están en el plano del suelo; el balón en el aire no se proyecta bien.',
      'El 94 % es la cifra reportada para el caso; no se publica aquí el conjunto de prueba.',
    ],
    next: [
      'Reidentificar jugadores tras una oclusión larga con apariencia (color del uniforme).',
      'Calibrar la cámara para corregir la distorsión del lente antes de la homografía, como en el proyecto «Calibración y corrección de distorsión de lente».',
    ],
  },
  en: {
    lead: 'A computer-vision pipeline that, from a single ordinary video camera, reconstructs player trajectories and heat maps on a 2D plan of the pitch, with no body sensors and no costly infrastructure.',
    context: [
      'Tactical analysis in sports usually relies on expensive systems: several calibrated cameras or GPS chips on each player. That leaves out teams without that budget, even though what they ask for (where each player was, how far they ran, where play concentrated) can be estimated from video.',
      'The catch is that a camera only delivers pixels in perspective: two players at the same real distance look different sizes, and when they cross one hides the other. Those pixels had to be converted into metres on the pitch and each player’s identity kept despite occlusions.',
    ],
    how: [
      { t: 'A single video shot', d: 'The input is video from a standard camera. No wearable sensors (zero) and no more than one camera are needed.' },
      { t: 'Detection on every frame', d: 'YOLOv8 detects people and the ball in each frame. On an RTX GPU processing exceeds 45 frames per second.' },
      { t: 'Perspective homography', d: 'OpenCV computes a homography: a transformation that takes an image point to its position on a 2D plan of the pitch, from known pitch points (for example, line corners).' },
      { t: 'Tracking with estimation filters', d: 'Each player is followed across frames. Estimation filters predict where they should be and correct with every detection, so tracking holds when another player hides them for a few frames.' },
      { t: 'Metrics', d: 'With positions on the plan, trajectories, speeds and heat maps per player are obtained.' },
    ],
    concepts: [
      { t: 'Detection and tracking', d: 'Detecting means saying "there is a person here" in one frame; tracking means deciding the person in frame 100 is the same as in frame 101.' },
      { t: 'Homography', d: 'A 3×3 matrix relating two views of the same plane. With at least four known points it can be computed, and it takes you from camera pixels to pitch metres.' },
      { t: 'Occlusion', d: 'When one object hides another. Tracking has to predict the position during those frames and recover the identity when it reappears.' },
      { t: 'Heat map', d: 'An image showing how long a player (or the ball) spent in each zone of the pitch.' },
    ],
    decisions: [
      { t: 'One camera, not several', d: 'This is the central constraint of the project: if a multi-camera rig is needed, it stops being accessible. The whole design starts there.' },
      { t: 'Project onto the pitch plane', d: 'Measuring in pixels is misleading (a distant player looks slower). Converting to metres before computing speeds and distances gives the metrics physical meaning.' },
      { t: 'Filter instead of trusting frame-by-frame detection', d: 'A detector can fail on one frame. An estimation filter smooths those failures and keeps the trajectory from jumping.' },
    ],
    verified: [
      'Reported trajectory accuracy: 94 %.',
      'Processing above 45 FPS on an RTX GPU; zero wearable sensors.',
    ],
    limits: [
      'It is a personal R&D prototype; accuracy depends on the camera, lighting and how well the pitch reference points are marked.',
      'The homography assumes the player’s feet are on the ground plane; a ball in the air does not project well.',
      'The 94 % is the figure reported for the case; the test set is not published here.',
    ],
    next: [
      'Re-identify players after a long occlusion using appearance (kit colour).',
      'Calibrate the camera to correct lens distortion before the homography, as in the "Lens distortion calibration and correction" project.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Del video a las métricas', en: 'From video to metrics' },
      caption: {
        es: 'Cada etapa recibe el resultado de la anterior; el filtro de seguimiento reutiliza su propia predicción para cubrir los cuadros en que un jugador queda oculto.',
        en: 'Each stage takes the previous result; the tracking filter reuses its own prediction to cover frames where a player is hidden.',
      },
      nodes: [
        { id: 'cam', label: { es: 'Cámara', en: 'Camera' }, sub: { es: '1 sola toma', en: 'single shot' }, col: 0, row: 0 },
        { id: 'det', label: 'YOLOv8', sub: { es: 'detección', en: 'detection' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'hom', label: { es: 'Homografía', en: 'Homography' }, sub: { es: 'plano 2D', en: '2D plane' }, col: 2, row: 0, tone: 'amber' },
        { id: 'trk', label: 'Tracking', sub: { es: 'filtros', en: 'filters' }, col: 3, row: 0 },
        { id: 'met', label: { es: 'Métricas', en: 'Metrics' }, sub: { es: 'heatmaps', en: 'heatmaps' }, col: 4, row: 0, tone: 'emerald' },
      ],
      edges: [
        { from: 'cam', to: 'det', label: { es: 'cuadros', en: 'frames' } },
        { from: 'det', to: 'hom', label: { es: 'cajas', en: 'boxes' } },
        { from: 'hom', to: 'trk', label: 'm' },
        { from: 'trk', to: 'met' },
      ],
    },
  ],
}
