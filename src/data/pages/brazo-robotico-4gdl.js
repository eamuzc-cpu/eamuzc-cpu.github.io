export default {
  status: { es: 'Simulado: cinemática propia en el navegador (sin hardware)', en: 'Simulated: own kinematics in the browser (no hardware)' },
  related: ['planificador-rutas-autonomas', 'pendulo-invertido-pid-lqr', 'distorsion-lente-calibracion'],
  es: {
    lead: 'Un manipulador articulado de cuatro grados de libertad con la tabla Denavit-Hartenberg del informe. En modo directo se mueven las articulaciones; en modo inverso se fija un punto del espacio y el brazo lo alcanza con mínimos cuadrados amortiguados.',
    context: [
      'Con cuatro articulaciones y tres condiciones de posición sobra un grado de libertad, y cerca de la singularidad (brazo estirado) el jacobiano pierde rango: los métodos ingenuos dan saltos enormes o se quedan en mínimos locales.',
      'El proyecto muestra cómo se llega a un punto, qué pasa en los límites articulares y fuera del alcance, y deja una cinemática inversa robusta y probada.',
    ],
    how: [
      { t: 'La tabla Denavit-Hartenberg', d: 'La geometría del brazo se describe con la tabla D-H del informe: d1 = 0,20 m; a2 = 0,40; a3 = 0,30; a4 = 0,15; α1 = π/2. Cada fila genera una matriz de transformación y su producto da la posición de la herramienta.' },
      { t: 'Cinemática directa verificada', d: 'Se comprueba contra la fórmula plana cerrada en 500 configuraciones aleatorias, y que las rotaciones resultantes sean ortonormales.' },
      { t: 'El jacobiano', d: 'El jacobiano de posición analítico (3×4) relaciona las velocidades articulares con la velocidad de la punta, y coincide con las diferencias finitas.' },
      { t: 'Cinemática inversa con DLS', d: 'Mínimos cuadrados amortiguados: en cada iteración se resuelve un problema regularizado cuyo paso se limita a 0,3 rad, y se respetan los límites articulares.' },
      { t: 'Base alineada y reintentos', d: 'La base se orienta hacia el destino, y si el intento no converge se prueba con otras posturas de codo, incluida «hacia atrás».' },
      { t: 'Cabeceo opcional', d: 'La inclinación de la herramienta (q2 + q3 + q4) se puede fijar para consumir el grado de libertad sobrante.' },
      { t: 'Fuera de alcance', d: 'Un destino que el brazo no alcanza se aproxima lo más posible sin divergir.' },
    ],
    concepts: [
      { t: 'Denavit-Hartenberg', d: 'Convención para describir un brazo con cuatro parámetros por articulación (a, α, d, θ), de modo que la cinemática salga de multiplicar matrices.' },
      { t: 'Cinemática directa e inversa', d: 'La directa calcula dónde queda la herramienta dados los ángulos; la inversa, qué ángulos hacen falta para llegar a un punto.' },
      { t: 'Jacobiano', d: 'Matriz que relaciona pequeñas variaciones de las articulaciones con las de la posición de la punta. Es la herramienta de la cinemática inversa iterativa.' },
      { t: 'Singularidad', d: 'Postura en que el jacobiano pierde rango, como un brazo totalmente estirado: algunas direcciones de movimiento dejan de ser posibles.' },
      { t: 'Mínimos cuadrados amortiguados (DLS)', d: 'Variante regularizada de la pseudoinversa que evita pasos enormes cerca de las singularidades a cambio de converger más despacio.' },
    ],
    decisions: [
      { t: 'Amortiguar y limitar el paso', d: 'El DLS con paso limitado a 0,3 rad impide los saltos cerca de la singularidad.' },
      { t: 'Varias posturas de codo', d: 'Muchas veces el destino se alcanza con otra postura. Reintentar con otras posturas, incluida «hacia atrás», sube el éxito a ≥ 99 %.' },
      { t: 'Corregir al informe', d: 'El código del informe arma el jacobiano como 4×3 y lo usa como 3×4, con una inversión de 3×3 sobre una matriz de 4×4. Aquí las dimensiones son las correctas.' },
      { t: 'Probar con 300 destinos al azar', d: 'Una cinemática inversa se prueba con muchos casos, no con un ejemplo que funciona.' },
    ],
    tour: [
      'En «Modo» elige «Directa (mover articulaciones)» y mueve los sliders de «Articulaciones [°]»: la punta sigue en las vistas lateral y superior.',
      'Cambia a «Inversa (fijar un punto)», mueve x, y, z en «Objetivo [m] y cabeceo» y pulsa «Resolver IK».',
      'Pulsa «Objetivo alcanzable al azar» varias veces: casi siempre llega a menos de 0,5 mm.',
      'Prueba «Estirar el brazo» (la singularidad) y «Objetivo fuera de alcance»: el brazo se aproxima sin divergir.',
      'Marca «fijar cabeceo» y mueve «Cabeceo»; marca «mostrar espacio de trabajo (3000 puntos)» para ver hasta dónde llega el brazo (0,85 m).',
    ],
    verified: [
      'De 300 destinos alcanzables aleatorios, ≥ 99 % queda a menos de 0,5 mm; un destino fuera de alcance se aproxima sin diverger.',
      'La cinemática directa coincide con la fórmula plana cerrada en 500 configuraciones; el jacobiano coincide con diferencias finitas.',
      '11 pruebas automáticas; alcance máximo de 0,85 m.',
    ],
    limits: [
      'Es una simulación: no hay un brazo real ni control de motores.',
      'Los límites articulares son míos: el informe no los da.',
      'La cinemática inversa resuelve la posición de la punta; no planifica trayectorias ni evita obstáculos.',
    ],
    next: [
      'Agregar planificación de trayectorias suaves entre dos posturas.',
      'Evitar colisiones con obstáculos, apoyándose en el proyecto del planificador de rutas.',
    ],
  },
  en: {
    lead: 'An articulated manipulator with four degrees of freedom using the report’s Denavit-Hartenberg table. In forward mode the joints are moved; in inverse mode a point in space is fixed and the arm reaches it with damped least squares.',
    context: [
      'With four joints and three position conditions there is one degree of freedom left over, and near the singularity (arm stretched out) the Jacobian loses rank: naive methods give huge jumps or get stuck in local minima.',
      'The project shows how a point is reached, what happens at the joint limits and out of reach, and leaves a robust, tested inverse kinematics.',
    ],
    how: [
      { t: 'The Denavit-Hartenberg table', d: 'The arm’s geometry is described by the report’s D-H table: d1 = 0.20 m; a2 = 0.40; a3 = 0.30; a4 = 0.15; α1 = π/2. Each row generates a transformation matrix and their product gives the tool position.' },
      { t: 'Verified forward kinematics', d: 'It is checked against the closed-form planar formula in 500 random configurations, and that the resulting rotations are orthonormal.' },
      { t: 'The Jacobian', d: 'The analytic position Jacobian (3×4) relates joint velocities to tip velocity, and matches finite differences.' },
      { t: 'Inverse kinematics with DLS', d: 'Damped least squares: at each iteration a regularised problem is solved whose step is limited to 0.3 rad, and joint limits are respected.' },
      { t: 'Aligned base and retries', d: 'The base is oriented towards the target, and if the attempt does not converge, other elbow postures are tried, including "backwards".' },
      { t: 'Optional pitch', d: 'The tool tilt (q2 + q3 + q4) can be fixed to use up the spare degree of freedom.' },
      { t: 'Out of reach', d: 'A target the arm cannot reach is approximated as closely as possible without diverging.' },
    ],
    concepts: [
      { t: 'Denavit-Hartenberg', d: 'A convention to describe an arm with four parameters per joint (a, α, d, θ), so the kinematics come from multiplying matrices.' },
      { t: 'Forward and inverse kinematics', d: 'Forward computes where the tool ends up given the angles; inverse, which angles are needed to reach a point.' },
      { t: 'Jacobian', d: 'A matrix relating small joint variations to those of the tip position. It is the tool of iterative inverse kinematics.' },
      { t: 'Singularity', d: 'A posture where the Jacobian loses rank, such as a fully stretched arm: some directions of motion stop being possible.' },
      { t: 'Damped least squares (DLS)', d: 'A regularised variant of the pseudo-inverse that avoids huge steps near singularities in exchange for converging more slowly.' },
    ],
    decisions: [
      { t: 'Damp and limit the step', d: 'DLS with the step limited to 0.3 rad prevents jumps near the singularity.' },
      { t: 'Several elbow postures', d: 'Often the target is reached with another posture. Retrying with other postures, including "backwards", raises success to ≥ 99 %.' },
      { t: 'Correct the report', d: 'The report’s code builds the Jacobian as 4×3 and uses it as 3×4, with a 3×3 inversion on a 4×4 matrix. Here the dimensions are the right ones.' },
      { t: 'Test with 300 random targets', d: 'An inverse kinematics is tested with many cases, not with one example that works.' },
    ],
    tour: [
      'Under "Modo" (mode) choose "Directa (mover articulaciones)" (forward) and move the "Articulaciones [°]" sliders: the tip follows in the side and top views.',
      'Switch to "Inversa (fijar un punto)" (inverse), move x, y, z under "Objetivo [m] y cabeceo" and press "Resolver IK" (solve IK).',
      'Press "Objetivo alcanzable al azar" (random reachable target) several times: it nearly always lands within 0.5 mm.',
      'Try "Estirar el brazo" (stretch the arm; the singularity) and "Objetivo fuera de alcance" (target out of reach): the arm approximates without diverging.',
      'Tick "fijar cabeceo" (fix pitch) and move "Cabeceo"; tick "mostrar espacio de trabajo (3000 puntos)" (show workspace) to see how far the arm reaches (0.85 m).',
    ],
    verified: [
      'Of 300 random reachable targets, ≥ 99 % land within 0.5 mm; an out-of-reach target is approximated without diverging.',
      'Forward kinematics matches the closed-form planar formula in 500 configurations; the Jacobian matches finite differences.',
      '11 automated tests; maximum reach of 0.85 m.',
    ],
    limits: [
      'It is a simulation: there is no real arm or motor control.',
      'The joint limits are mine: the report does not give them.',
      'Inverse kinematics solves the tip position; it does not plan trajectories or avoid obstacles.',
    ],
    next: [
      'Add smooth trajectory planning between two postures.',
      'Avoid collisions with obstacles, building on the route-planner project.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Cinemática inversa iterativa', en: 'Iterative inverse kinematics' },
      caption: {
        es: 'En cada vuelta, la cinemática directa dice dónde queda la punta; el error con respecto al objetivo corrige las articulaciones a través del jacobiano, con paso amortiguado.',
        en: 'On each lap, forward kinematics says where the tip ends up; the error against the target corrects the joints through the Jacobian, with a damped step.',
      },
      nodes: [
        { id: 'obj', label: { es: 'Objetivo', en: 'Target' }, sub: 'x, y, z', col: 0, row: 0, tone: 'emerald' },
        { id: 'dls', label: 'DLS', sub: { es: 'jacobiano 3×4', en: '3×4 Jacobian' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'art', label: { es: 'Articulaciones', en: 'Joints' }, sub: { es: 'q1…q4 · límites', en: 'q1…q4 · limits' }, col: 2, row: 0, tone: 'amber' },
        { id: 'cd', label: { es: 'Cinemática directa', en: 'Forward kinematics' }, sub: 'D-H', col: 3, row: 0 },
      ],
      edges: [
        { from: 'obj', to: 'dls', label: { es: 'error', en: 'error' } },
        { from: 'dls', to: 'art', label: 'Δq' },
        { from: 'art', to: 'cd' },
        { from: 'cd', to: 'obj', loop: true, dashed: true, label: { es: 'posición de la punta', en: 'tip position' } },
      ],
    },
  ],
}
