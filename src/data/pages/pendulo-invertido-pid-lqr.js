export default {
  status: { es: 'Simulado: física no lineal propia (sin hardware ni prototipo)', en: 'Simulated: own nonlinear physics (no hardware or prototype)' },
  related: ['sintonizador-bode-nyquist', 'pid-pasteurizador', 'brazo-robotico-4gdl'],
  es: {
    lead: 'Un carro con un péndulo invertido cae en menos de 1,5 s si nadie lo controla. Aquí lo estabilizan un PID de ángulo con PD de posición y un LQR cuya ganancia sale de resolver la ecuación de Riccati, sobre una física no lineal integrada con RK4. Se puede empujar, agregar ruido al sensor y limitar la fuerza.',
    context: [
      'Un péndulo invertido es inestable y de fase no mínima: para recuperar la vertical, el carro tiene que alejarse primero en la dirección contraria. Un control digital con retención de orden cero, ruido en el sensor y fuerza limitada puede perderlo con facilidad.',
      'Comparar dos controles sobre el mismo modelo muestra qué ofrece cada uno: el LQR sale de una optimización y se desvía menos; el PID es más simple pero necesita el lazo de posición o el carro se escapa de la pista.',
    ],
    how: [
      { t: 'El modelo físico', d: 'Ecuaciones de Euler-Lagrange del informe para un carro de 1 kg y un péndulo de 0,1 kg con su centro a 0,5 m. No se linealizan: la simulación usa las ecuaciones completas.' },
      { t: 'Integración y control a distinto ritmo', d: 'La física se integra con RK4 a 500 Hz y el controlador actúa a 100 Hz con retención de orden cero, como un controlador digital real que mantiene la fuerza constante entre muestras.' },
      { t: 'Una prueba de energía', d: 'Con el sistema sin fuerza ni fricción, la energía total debe conservarse: la deriva es menor que 1e-7 en 10 s, lo que confirma que las ecuaciones del informe son coherentes.' },
      { t: 'El LQR', d: 'La ganancia K = [−10,0; −12,5; −82,3; −19,7] se obtiene resolviendo la ecuación de Riccati: se integra hasta el régimen y el residuo queda en ≈ 1e-11. Realimenta posición, velocidad, ángulo y velocidad angular.' },
      { t: 'El PID', d: 'Un PID de ángulo estabiliza el péndulo, y un PD de posición evita que el carro se escape de la pista. Sin ese PD, el ángulo se estabiliza pero el carro se desliza y sale de la pista.' },
      { t: 'Perturbaciones', d: 'Se pueden dar empujones, agregar ruido de 0,002 rad al sensor, y limitar la fuerza máxima (30 N por defecto).' },
      { t: 'Región de atracción', d: 'Una calculadora barre ángulos iniciales y marca desde cuáles el control logra recuperar la vertical.' },
    ],
    concepts: [
      { t: 'Fase no mínima', d: 'Sistema cuya respuesta inicial va en sentido contrario a la final: el carro debe moverse «hacia atrás» antes de poder levantar el péndulo.' },
      { t: 'LQR', d: 'Regulador cuadrático lineal: calcula la realimentación de estado que minimiza un costo que penaliza el error de los estados (matriz Q) y el esfuerzo de control (matriz R).' },
      { t: 'Ecuación de Riccati', d: 'Ecuación matricial cuya solución define la ganancia óptima del LQR.' },
      { t: 'Retención de orden cero', d: 'El controlador digital mantiene constante su salida entre dos muestras. Añade un retraso efectivo que reduce los márgenes de estabilidad.' },
      { t: 'Región de atracción', d: 'Conjunto de estados iniciales desde los cuales el control logra llevar el sistema al equilibrio.' },
    ],
    decisions: [
      { t: 'Simular la física no lineal', d: 'Probar el control sobre las ecuaciones completas, y no sobre el modelo linealizado con que se diseñó, es lo que revela dónde deja de funcionar (a 1,2 rad se cae).' },
      { t: 'Control a 100 Hz sobre física a 500 Hz', d: 'Separa lo que hace el mundo (continuo, integrado con paso fino) de lo que hace el computador (muestreado).' },
      { t: 'Declarar lo que es mío', d: 'Las ganancias del PID, las matrices Q y R, los 30 N y la pista de ±2,5 m son elecciones propias: el informe no las da, y así se dice.' },
      { t: 'Probar con una verificación física', d: 'La conservación de energía y el residuo de Riccati son pruebas independientes de «que se vea bien».' },
    ],
    tour: [
      'Elige en «Control» la opción «Sin control» y pulsa «Reiniciar con el ángulo inicial»: el péndulo cae en menos de 1,5 s.',
      'Prueba «LQR» y «PID + PD de posición» y pulsa «Empujón ◄» o «Empujón ►»: el ángulo máximo es ≈ 0,029 rad con LQR y ≈ 0,044 rad con PID (con ruido del sensor activado).',
      'Elige «PID solo de ángulo»: el péndulo se mantiene, pero el carro se desliza y sale de la pista.',
      'En «Parámetros» sube el «Ángulo inicial» hasta 0,9 rad con «Fuerza máxima» de 30 N: ambos controles recuperan; con 1,2 rad fallan.',
      'Baja la «Fuerza máxima» y activa «ruido del sensor» para ver cómo se degradan los controles.',
      'Pulsa «Calcular» para obtener la región de atracción del control elegido.',
    ],
    verified: [
      '14 pruebas automáticas, incluida una de conservación de energía (deriva < 1e-7 en 10 s) y el residuo de Riccati ≈ 1e-11.',
      'Ambos controles recuperan hasta 0,9 rad con 30 N y fallan con 1,2 rad.',
      'Ante un empujón de 10 N con ruido de 0,002 rad, el ángulo máximo es de 0,029 rad con LQR y 0,044 rad con PID.',
    ],
    limits: [
      'Es una simulación: no hay péndulo, motor ni sensor reales.',
      'Las ganancias del PID, las matrices Q y R, la fuerza de 30 N y la pista de ±2,5 m son elecciones mías; el informe no las da.',
      'El modelo no incluye la dinámica del motor ni la fricción del carro, por lo que un montaje real necesitaría ajustar las ganancias.',
    ],
    next: [
      'Agregar la dinámica del motor y fricción para acercar el modelo a un prototipo.',
      'Implementar el levantamiento (swing-up) desde la posición colgante.',
    ],
  },
  en: {
    lead: 'A cart with an inverted pendulum falls in under 1.5 s if nobody controls it. Here a PID on the angle with a position PD and an LQR whose gain comes from solving the Riccati equation stabilise it, on nonlinear physics integrated with RK4. You can push it, add sensor noise and limit the force.',
    context: [
      'An inverted pendulum is unstable and non-minimum-phase: to recover the vertical, the cart has to move away in the opposite direction first. A digital controller with zero-order hold, sensor noise and limited force can easily lose it.',
      'Comparing two controllers on the same model shows what each offers: the LQR comes from an optimisation and deviates less; the PID is simpler but needs the position loop or the cart runs off the track.',
    ],
    how: [
      { t: 'The physical model', d: 'The report’s Euler-Lagrange equations for a 1 kg cart and a 0.1 kg pendulum with its centre at 0.5 m. They are not linearised: the simulation uses the full equations.' },
      { t: 'Integration and control at different rates', d: 'Physics is integrated with RK4 at 500 Hz and the controller acts at 100 Hz with a zero-order hold, like a real digital controller that keeps the force constant between samples.' },
      { t: 'An energy test', d: 'With no force or friction, total energy must be conserved: drift is below 1e-7 in 10 s, confirming the report’s equations are coherent.' },
      { t: 'The LQR', d: 'The gain K = [−10.0; −12.5; −82.3; −19.7] is obtained by solving the Riccati equation: it is integrated to steady state and the residual ends at ≈ 1e-11. It feeds back position, velocity, angle and angular velocity.' },
      { t: 'The PID', d: 'A PID on the angle stabilises the pendulum, and a position PD keeps the cart from running off the track. Without that PD, the angle is stabilised but the cart drifts and leaves the track.' },
      { t: 'Disturbances', d: 'You can give pushes, add 0.002 rad of sensor noise and limit the maximum force (30 N by default).' },
      { t: 'Region of attraction', d: 'A calculator sweeps initial angles and marks from which ones the controller manages to recover the vertical.' },
    ],
    concepts: [
      { t: 'Non-minimum phase', d: 'A system whose initial response goes opposite to the final one: the cart must move "backwards" before it can lift the pendulum.' },
      { t: 'LQR', d: 'Linear-quadratic regulator: it computes the state feedback that minimises a cost penalising state error (matrix Q) and control effort (matrix R).' },
      { t: 'Riccati equation', d: 'A matrix equation whose solution defines the LQR’s optimal gain.' },
      { t: 'Zero-order hold', d: 'The digital controller keeps its output constant between two samples. It adds an effective delay that reduces stability margins.' },
      { t: 'Region of attraction', d: 'The set of initial states from which the controller manages to bring the system to equilibrium.' },
    ],
    decisions: [
      { t: 'Simulate the nonlinear physics', d: 'Testing the controller on the full equations, not on the linearised model it was designed on, is what reveals where it stops working (at 1.2 rad it falls).' },
      { t: 'Control at 100 Hz over physics at 500 Hz', d: 'It separates what the world does (continuous, integrated with a fine step) from what the computer does (sampled).' },
      { t: 'Declare what is mine', d: 'The PID gains, the Q and R matrices, the 30 N and the ±2.5 m track are my own choices: the report does not give them, and this is stated.' },
      { t: 'Test with a physical check', d: 'Energy conservation and the Riccati residual are independent tests, not just "it looks right".' },
    ],
    tour: [
      'Under "Control" choose "Sin control" (no control) and press "Reiniciar con el ángulo inicial" (restart): the pendulum falls in under 1.5 s.',
      'Try "LQR" and "PID + PD de posición" and press "Empujón ◄" or "Empujón ►" (push): the maximum angle is ≈ 0.029 rad with LQR and ≈ 0.044 rad with PID (with sensor noise on).',
      'Choose "PID solo de ángulo" (angle-only PID): the pendulum holds, but the cart drifts and leaves the track.',
      'Under "Parámetros" raise the "Ángulo inicial" (initial angle) to 0.9 rad with a "Fuerza máxima" (maximum force) of 30 N: both controllers recover; at 1.2 rad they fail.',
      'Lower the "Fuerza máxima" and turn on "ruido del sensor" (sensor noise) to see the controllers degrade.',
      'Press "Calcular" (compute) to get the chosen controller’s region of attraction.',
    ],
    verified: [
      '14 automated tests, including energy conservation (drift < 1e-7 in 10 s) and the Riccati residual ≈ 1e-11.',
      'Both controllers recover up to 0.9 rad with 30 N and fail at 1.2 rad.',
      'Against a 10 N push with 0.002 rad of noise, the maximum angle is 0.029 rad with LQR and 0.044 rad with PID.',
    ],
    limits: [
      'It is a simulation: there is no real pendulum, motor or sensor.',
      'The PID gains, the Q and R matrices, the 30 N force and the ±2.5 m track are my own choices; the report does not give them.',
      'The model does not include motor dynamics or cart friction, so a real rig would need its gains re-tuned.',
    ],
    next: [
      'Add motor dynamics and friction to bring the model closer to a prototype.',
      'Implement the swing-up from the hanging position.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'El lazo de control', en: 'The control loop' },
      caption: {
        es: 'El sensor entrega ángulo y posición (con ruido); el control calcula una fuerza a 100 Hz; el actuador la limita; la física no lineal avanza a 500 Hz y el nuevo estado vuelve al sensor.',
        en: 'The sensor delivers angle and position (with noise); the controller computes a force at 100 Hz; the actuator limits it; the nonlinear physics advances at 500 Hz and the new state returns to the sensor.',
      },
      nodes: [
        { id: 'sen', label: { es: 'Sensor', en: 'Sensor' }, sub: { es: 'θ, x · ruido', en: 'θ, x · noise' }, col: 0, row: 0 },
        { id: 'con', label: { es: 'Control', en: 'Controller' }, sub: 'LQR / PID · 100 Hz', col: 1, row: 0, tone: 'magenta' },
        { id: 'act', label: { es: 'Actuador', en: 'Actuator' }, sub: { es: 'fuerza ≤ 30 N', en: 'force ≤ 30 N' }, col: 2, row: 0, tone: 'amber' },
        { id: 'fis', label: { es: 'Física', en: 'Physics' }, sub: 'RK4 · 500 Hz', col: 3, row: 0, tone: 'emerald' },
      ],
      edges: [
        { from: 'sen', to: 'con', label: { es: 'estado', en: 'state' } },
        { from: 'con', to: 'act', label: 'u' },
        { from: 'act', to: 'fis', label: 'F' },
        { from: 'fis', to: 'sen', loop: true, dashed: true, label: { es: 'estado', en: 'state' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'LQR frente a PID ante un empujón', en: 'LQR versus PID against a push' },
      caption: {
        es: 'Empujón de 10 N con 0,002 rad de ruido en el sensor. Es el mismo modelo, la misma perturbación y el mismo ruido.',
        en: 'A 10 N push with 0.002 rad of sensor noise. Same model, same disturbance and same noise.',
      },
      rows: [
        {
          label: { es: 'Ángulo máximo alcanzado (rad)', en: 'Maximum angle reached (rad)' },
          items: [
            { label: 'LQR', value: 0.029, text: '0,029 rad', tone: 'emerald' },
            { label: 'PID', value: 0.044, text: '0,044 rad', tone: 'amber' },
          ],
        },
      ],
    },
  ],
}
