// Página completa del proyecto. Estructura común a todas las páginas (ver ProjectPage.jsx):
// es/en: lead, context[], how[{t,d}], concepts[{t,d}], decisions[{t,d}], tour[], verified[], limits[], next[]
// diagrams[]: { kind: 'graph' | 'bars', placement: 'overview' | 'context' | 'how-top' | 'how' | 'concepts' | 'decisions' | 'results' }
export default {
  status: { es: 'Simulado en el navegador (planta didáctica)', en: 'Simulated in the browser (didactic plant)' },
  related: ['alarmas-isa182', 'scada-web-pasteurizador', 'pendulo-invertido-pid-lqr'],
  es: {
    lead: 'Un simulador para entender por qué una sintonía que funciona en el papel puede fallar con la planta real, y cómo un anti-windup bien puesto salva el arranque de un pasteurizador. Compara cuatro métodos clásicos sobre la misma planta y deja romper el modelo a propósito.',
    context: [
      'Un pasteurizador mantiene el producto a una temperatura exacta durante un tiempo exacto. Si se pasa de temperatura se daña; si se queda corto, la válvula de desvío lo manda de vuelta y se pierde producción. Entre ambos extremos está el lazo de temperatura: un PID que decide cuánto abrir la válvula de vapor.',
      'El problema tiene dos caras. Las reglas de sintonía clásicas se calculan con un modelo de la planta, y se degradan cuando la planta real es más lenta o tiene más ganancia que ese modelo. Y la válvula tiene límites físicos (0 a 100 %): si el controlador pide más de lo que ella puede dar, la integral sigue acumulando error (windup) y cuando por fin se alcanza la consigna, esa integral acumulada empuja la temperatura de largo.',
      'Este proyecto es una simulación didáctica: la planta (K = 1 °C/%, τ = 90 s, θ = 15 s) no es un pasteurizador medido, pero tiene el comportamiento que importa para el problema: respuesta lenta, retraso puro y un actuador que satura.',
    ],
    how: [
      { t: 'Modelo de la planta (primer orden con tiempo muerto)', d: 'La planta es T = Tamb + K·u: K = 1 °C por cada 1 % de válvula, una constante de tiempo τ = 90 s (qué tan lento responde) y un tiempo muerto θ = 15 s (el retraso puro antes de que se note un cambio). Es la forma estándar de resumir un proceso térmico a partir de una prueba de escalón.' },
      { t: 'Sintonía a partir del modelo', d: 'Con K, τ y θ se calculan las ganancias del PID (Kp, Ti, Td) por cuatro métodos: Ziegler-Nichols PI, Ziegler-Nichols PID, Cohen-Coon PI y lambda (IMC) PI. Las fórmulas están escritas tal cual en el código y se contrastaron con un cálculo a mano para K = 1, τ = 90 s, θ = 15 s.' },
      { t: 'PID discreto cada 0,5 s', d: 'Proporcional sobre el error; integral acumulada en cada paso; derivada calculada sobre la medición (no sobre el error) y filtrada. La salida se limita a 0–100 %, como una válvula real.' },
      { t: 'Anti-windup por retrocálculo', d: 'Cuando la salida pedida supera el límite, la diferencia entre lo que se pidió y lo que la válvula pudo dar se devuelve a la integral con una constante de tiempo Tt = Ti/2. Así la integral deja de crecer mientras la válvula está saturada y no hay que «descargarla» después.' },
      { t: 'La planta simulada', d: 'El tiempo muerto es una cola de θ/dt muestras; la dinámica de primer orden usa la solución exacta discreta (a = e^(−dt/τ)); el ruido de medición es gaussiano con semilla fija, así que el mismo experimento siempre da el mismo resultado.' },
      { t: 'Métricas para comparar', d: 'Cada respuesta se resume con sobreimpulso, tiempo de asentamiento (banda de ±2 % del escalón), IAE e ITAE. Son los números con que los textos de control comparan sintonías.' },
    ],
    concepts: [
      { t: 'FOPDT', d: 'First-Order Plus Dead Time: primer orden más tiempo muerto. Tres números (K, τ, θ) bastan para describir un proceso lento y poder calcular un controlador.' },
      { t: 'Ziegler-Nichols y Cohen-Coon', d: 'Reglas empíricas que convierten K, τ y θ en ganancias de PID. Son rápidas de aplicar, pero asumen que el modelo es correcto y tienden a dar lazos agresivos.' },
      { t: 'Lambda (IMC)', d: 'Se elige qué tan rápido se quiere el lazo cerrado (aquí λ = 2·θ) y la regla calcula las ganancias. Suele ser la más robusta ante errores de modelo, a cambio de ser algo más lenta.' },
      { t: 'Windup', d: 'La integral sigue sumando error mientras el actuador está saturado. Al salir de la saturación, esa carga acumulada provoca sobreimpulso y un asentamiento largo.' },
      { t: 'IAE e ITAE', d: 'Integral del error absoluto, sin ponderar (IAE) o ponderada por el tiempo (ITAE, que castiga más los errores que duran). Un solo número por respuesta para comparar sintonías.' },
    ],
    decisions: [
      { t: 'Derivada sobre la medición', d: 'Si la derivada se calculara sobre el error, un escalón de consigna produciría un pico instantáneo en la salida. Derivando la medición, la consigna puede cambiar de golpe sin sacudir la válvula.' },
      { t: 'Retrocálculo en vez de simplemente congelar la integral', d: 'Con retrocálculo la integral se corrige de forma continua hacia un valor coherente con lo que la válvula realmente entrega, y la salida del anti-windup se comporta bien aunque la saturación entre y salga varias veces.' },
      { t: 'Arranque sin salto', d: 'La integral parte en el valor de equilibrio con error cero, de modo que la simulación no empieza con un transitorio artificial y las diferencias entre sintonías son solo de las sintonías.' },
      { t: 'Romper el modelo a propósito', d: 'La demo permite que la planta real sea peor que la estimada (θ +50 %, K +30 %). Es la situación normal de planta: el modelo siempre está un poco equivocado, y una sintonía solo es buena si aguanta eso.' },
      { t: 'Ruido determinista', d: 'El ruido de medición usa una semilla fija: cada comparación es reproducible y las pruebas automáticas pueden afirmar resultados exactos.' },
    ],
    tour: [
      'Con el escenario «Escalón 40→72 °C» y el modelo exacto, cambia el «Método de sintonía» y compara: lambda no sobrepasa la consigna (0 %), mientras Ziegler-Nichols PI sobrepasa cerca de 8,5 %.',
      'Sube «Error de modelo: θ real» a +50 % y «Error de modelo: K real» a +30 %: Ziegler-Nichols y Cohen-Coon dejan de asentarse; lambda sigue estable y se asienta en unos 172 s.',
      'Elige el escenario «Escalón grande 40→110 °C (satura)» y alterna la casilla de anti-windup: sin él, el sobreimpulso es 14,2 % y el asentamiento 836 s; con él, 0 % y 199 s.',
      'Sube el «Ruido de medición» y baja el «Límite superior del actuador» para ver cómo cambian la salida y las métricas.',
      'Mira la tabla «Comparación de sintonías»: el método con menor sobreimpulso no siempre es el de menor error acumulado (IAE e ITAE).',
    ],
    verified: [
      'La planta alcanza Tamb + K·u en régimen permanente y el tiempo muerto retrasa exactamente θ segundos la respuesta.',
      'Las fórmulas de sintonía coinciden con un cálculo a mano (K = 1, τ = 90 s, θ = 15 s); un método desconocido lanza error.',
      'Las cuatro sintonías llevan la planta nominal a la consigna; lambda tiene menos sobreimpulso que Ziegler-Nichols PI y queda bajo 10 %.',
      'El actuador respeta 0–100 %; el anti-windup reduce el sobreimpulso cuando satura; una perturbación de carga se recupera.',
      'Con el modelo real peor que el estimado (θ +50 %, K +30 %), lambda sigue estable. En total son 11 pruebas automáticas con node:test.',
    ],
    limits: [
      'La planta es didáctica, no un pasteurizador medido: no incluye la dinámica real del intercambiador, la histéresis de la válvula ni otras no linealidades.',
      'Hay un solo lazo de temperatura; no hay cascada con la presión de vapor ni compensación de caudal.',
      'Ziegler-Nichols está pensado para rechazar perturbaciones, no para seguir una consigna: que sobrepase aquí describe el criterio de comparación, no un defecto absoluto del método.',
      'Es un ejercicio de ingeniería de control; no reemplaza el comisionamiento y la calibración de un lazo real.',
    ],
    next: [
      'Agregar autotuning por relé para obtener el modelo a partir de datos en vez de asumirlo.',
      'Probar un predictor de Smith, que está pensado para procesos con tiempo muerto grande.',
      'Contrastar la sintonía con registros de un lazo real de temperatura sanitaria.',
    ],
  },
  en: {
    lead: 'A simulator to understand why a tuning that works on paper can fail on the real plant, and how a well-placed anti-windup saves a pasteurizer start-up. It compares four classic methods on the same plant and lets you break the model on purpose.',
    context: [
      'A pasteurizer holds the product at an exact temperature for an exact time. Overshoot damages it; falling short sends it back through the diversion valve and production is lost. Between those extremes sits the temperature loop: a PID deciding how far to open the steam valve.',
      'The problem has two sides. Classic tuning rules are computed from a plant model, and they degrade when the real plant is slower or has more gain than that model. And the valve has physical limits (0 to 100 %): if the controller asks for more than it can give, the integral keeps accumulating error (windup) and, when the setpoint is finally reached, that stored integral pushes the temperature past it.',
      'This project is a didactic simulation: the plant (K = 1 °C/%, τ = 90 s, θ = 15 s) is not a measured pasteurizer, but it has the behaviour that matters for the problem: slow response, pure delay and an actuator that saturates.',
    ],
    how: [
      { t: 'Plant model (first order plus dead time)', d: 'The plant is T = Tamb + K·u: K = 1 °C per 1 % of valve, a time constant τ = 90 s (how slowly it responds) and a dead time θ = 15 s (the pure delay before a change shows). It is the standard way to summarise a thermal process from a step test.' },
      { t: 'Tuning from the model', d: 'From K, τ and θ the PID gains (Kp, Ti, Td) are computed by four methods: Ziegler-Nichols PI, Ziegler-Nichols PID, Cohen-Coon PI and lambda (IMC) PI. The formulas are written as-is in the code and were checked against a hand calculation for K = 1, τ = 90 s, θ = 15 s.' },
      { t: 'Discrete PID every 0.5 s', d: 'Proportional on the error; integral accumulated at every step; derivative taken on the measurement (not the error) and filtered. The output is limited to 0–100 %, like a real valve.' },
      { t: 'Back-calculation anti-windup', d: 'When the requested output exceeds the limit, the difference between what was asked and what the valve could deliver is fed back to the integral with a time constant Tt = Ti/2. The integral stops growing while the valve is saturated and does not have to be "discharged" later.' },
      { t: 'The simulated plant', d: 'The dead time is a queue of θ/dt samples; the first-order dynamics use the exact discrete solution (a = e^(−dt/τ)); measurement noise is Gaussian with a fixed seed, so the same experiment always gives the same result.' },
      { t: 'Metrics to compare', d: 'Each response is summarised by overshoot, settling time (±2 % band of the step), IAE and ITAE. These are the numbers control textbooks use to compare tunings.' },
    ],
    concepts: [
      { t: 'FOPDT', d: 'First-Order Plus Dead Time. Three numbers (K, τ, θ) are enough to describe a slow process and compute a controller for it.' },
      { t: 'Ziegler-Nichols and Cohen-Coon', d: 'Empirical rules that turn K, τ and θ into PID gains. They are quick to apply, but assume the model is right and tend to produce aggressive loops.' },
      { t: 'Lambda (IMC)', d: 'You choose how fast you want the closed loop (here λ = 2·θ) and the rule computes the gains. It is usually the most robust against model error, at the cost of being a bit slower.' },
      { t: 'Windup', d: 'The integral keeps adding error while the actuator is saturated. When it leaves saturation, that stored charge causes overshoot and a long settling time.' },
      { t: 'IAE and ITAE', d: 'Integral of the absolute error, unweighted (IAE) or weighted by time (ITAE, which punishes errors that last). One number per response to compare tunings.' },
    ],
    decisions: [
      { t: 'Derivative on the measurement', d: 'If the derivative were taken on the error, a setpoint step would cause an instant spike on the output. Differentiating the measurement lets the setpoint jump without jolting the valve.' },
      { t: 'Back-calculation instead of just freezing the integral', d: 'With back-calculation the integral is continuously corrected towards a value consistent with what the valve actually delivers, and it behaves well even when saturation comes and goes several times.' },
      { t: 'Bumpless start', d: 'The integral starts at its equilibrium value with zero error, so the simulation does not begin with an artificial transient and differences between tunings come only from the tunings.' },
      { t: 'Breaking the model on purpose', d: 'The demo lets the real plant be worse than the estimated one (θ +50 %, K +30 %). That is the normal situation in a plant: the model is always a bit wrong, and a tuning is only good if it survives that.' },
      { t: 'Deterministic noise', d: 'Measurement noise uses a fixed seed: every comparison is reproducible and the automated tests can assert exact results.' },
    ],
    tour: [
      'With the "Escalón 40→72 °C" scenario and the exact model, change the "Método de sintonía" (tuning method) and compare: lambda does not overshoot the setpoint (0 %), while Ziegler-Nichols PI overshoots by about 8.5 %.',
      'Raise "Error de modelo: θ real" to +50 % and "Error de modelo: K real" to +30 %: Ziegler-Nichols and Cohen-Coon stop settling; lambda stays stable and settles in about 172 s.',
      'Pick the "Escalón grande 40→110 °C (satura)" scenario and toggle the anti-windup checkbox: without it overshoot is 14.2 % and settling 836 s; with it, 0 % and 199 s.',
      'Raise the "Ruido de medición" (measurement noise) and lower the "Límite superior del actuador" (actuator upper limit) to see how the output and the metrics change.',
      'Look at the "Comparación de sintonías" table: the method with the least overshoot is not always the one with the least accumulated error (IAE and ITAE).',
    ],
    verified: [
      'The plant reaches Tamb + K·u at steady state and the dead time delays the response by exactly θ seconds.',
      'The tuning formulas match a hand calculation (K = 1, τ = 90 s, θ = 15 s); an unknown method throws an error.',
      'All four tunings bring the nominal plant to the setpoint; lambda overshoots less than Ziegler-Nichols PI and stays under 10 %.',
      'The actuator respects 0–100 %; anti-windup reduces overshoot when it saturates; a load disturbance is recovered.',
      'With the real model worse than the estimated one (θ +50 %, K +30 %), lambda stays stable. There are 11 automated tests in total, using node:test.',
    ],
    limits: [
      'The plant is didactic, not a measured pasteurizer: it does not include the real heat-exchanger dynamics, valve hysteresis or other nonlinearities.',
      'There is a single temperature loop; no cascade with steam pressure and no flow compensation.',
      'Ziegler-Nichols is designed to reject disturbances, not to track a setpoint: its overshoot here reflects the comparison criterion, not an absolute defect of the method.',
      'It is a control-engineering exercise; it does not replace the commissioning and calibration of a real loop.',
    ],
    next: [
      'Add relay autotuning to obtain the model from data instead of assuming it.',
      'Try a Smith predictor, which is meant for processes with a large dead time.',
      'Contrast the tuning with records from a real sanitary temperature loop.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'El lazo completo', en: 'The complete loop' },
      caption: {
        es: 'Cadena de cálculo (arriba) y los dos lazos de realimentación: la medición con ruido que vuelve al PID, y el retrocálculo del anti-windup, que mide cuánto de lo pedido no pudo dar la válvula.',
        en: 'Calculation chain (top) and the two feedback paths: the noisy measurement returning to the PID, and the anti-windup back-calculation, which measures how much of the request the valve could not deliver.',
      },
      nodes: [
        { id: 'mod', label: { es: 'Modelo FOPDT', en: 'FOPDT model' }, sub: 'K · τ · θ', col: 0, row: 0 },
        { id: 'sint', label: { es: 'Sintonía', en: 'Tuning' }, sub: 'ZN · CC · lambda', col: 1, row: 0 },
        { id: 'pid', label: { es: 'PID discreto', en: 'Discrete PID' }, sub: 'dt = 0,5 s', col: 2, row: 0, tone: 'magenta' },
        { id: 'act', label: { es: 'Actuador', en: 'Actuator' }, sub: { es: 'límites 0–100 %', en: 'limits 0–100 %' }, col: 3, row: 0, tone: 'amber' },
        { id: 'pl', label: { es: 'Planta simulada', en: 'Simulated plant' }, sub: 'τ = 90 s · θ = 15 s', col: 4, row: 0, tone: 'emerald' },
        { id: 'aw', label: 'Anti-windup', sub: { es: 'retrocálculo', en: 'back-calculation' }, col: 3, row: 1, tone: 'amber' },
      ],
      edges: [
        { from: 'mod', to: 'sint' },
        { from: 'sint', to: 'pid', label: 'Kp·Ti·Td' },
        { from: 'pid', to: 'act', label: 'u' },
        { from: 'act', to: 'pl' },
        { from: 'pl', to: 'pid', loopTop: true, dashed: true, label: { es: 'medición + ruido', en: 'measurement + noise' } },
        { from: 'act', to: 'aw', label: { es: 'u pedido − u real', en: 'u asked − u real' } },
        { from: 'aw', to: 'pid', loop: true, dashed: true, tone: 'amber', label: { es: 'corrige la integral', en: 'corrects the integral' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Qué mejora cada decisión', en: 'What each decision improves' },
      caption: {
        es: 'Cifras de las pruebas del proyecto (planta didáctica). La última fila no es un tiempo medido: «> 900 s» significa que la respuesta no llegó a asentarse en los 900 s simulados.',
        en: 'Figures from the project tests (didactic plant). The last row is not a measured time: "> 900 s" means the response had not settled within the 900 s simulated.',
      },
      rows: [
        {
          label: { es: 'Asentamiento en el escalón 40 → 110 °C con la válvula saturada (s)', en: 'Settling in the 40 → 110 °C step with the valve saturated (s)' },
          items: [
            { label: { es: 'Sin anti-windup', en: 'No anti-windup' }, value: 836, text: '836 s', tone: 'magenta' },
            { label: { es: 'Con anti-windup', en: 'With anti-windup' }, value: 199, text: '199 s', tone: 'emerald' },
          ],
        },
        {
          label: { es: 'Sobreimpulso en ese mismo escalón (%)', en: 'Overshoot in that same step (%)' },
          items: [
            { label: { es: 'Sin anti-windup', en: 'No anti-windup' }, value: 14.2, text: '14,2 %', tone: 'magenta' },
            { label: { es: 'Con anti-windup', en: 'With anti-windup' }, value: 0, text: '0 %', tone: 'emerald' },
          ],
        },
        {
          label: { es: 'Sobreimpulso con el modelo exacto (%)', en: 'Overshoot with the exact model (%)' },
          items: [
            { label: 'Ziegler-Nichols PI', value: 8.5, text: '8,5 %', tone: 'magenta' },
            { label: 'Lambda (IMC)', value: 0, text: '0 %', tone: 'emerald' },
          ],
        },
        {
          label: { es: 'Con error de modelo (θ +50 %, K +30 %): asentamiento', en: 'With model error (θ +50 %, K +30 %): settling' },
          items: [
            { label: 'Ziegler-Nichols / Cohen-Coon', value: 900, text: '> 900 s', tone: 'magenta' },
            { label: 'Lambda (IMC)', value: 172, text: '172 s', tone: 'emerald' },
          ],
        },
      ],
    },
  ],
}
