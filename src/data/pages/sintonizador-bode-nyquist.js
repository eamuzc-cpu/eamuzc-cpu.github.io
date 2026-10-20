export default {
  status: { es: 'Simulado: cálculo exacto en el navegador (sin hardware)', en: 'Simulated: exact computation in the browser (no hardware)' },
  related: ['pendulo-invertido-pid-lqr', 'pid-pasteurizador', 'convertidor-buck-boost-sincrono'],
  es: {
    lead: 'Arrastra polos y ceros en el plano s y mira al instante el diagrama de Bode, el de Nyquist, los márgenes de ganancia y de fase, los polos del lazo cerrado y la respuesta al escalón, calculada de forma exacta.',
    context: [
      'Sintonizar un lazo a ojo es un ejercicio de prueba y error. Para entender márgenes y estabilidad hay que ver cómo cada polo y cada cero cambia la curva, y que el resultado sea exacto, no aproximado.',
      'Esta herramienta de práctica muestra al instante qué le pasa a la estabilidad al mover un polo o al subir la ganancia, con la respuesta al escalón calculada sin pasos de integración.',
    ],
    how: [
      { t: 'El sistema en forma cero-polo-ganancia', d: 'El sistema se describe con sus polos, ceros y una ganancia K, como en el informe. Los polos y ceros pueden ser reales o pares complejos conjugados.' },
      { t: 'Arrastrar en el plano s', d: 'Los polos (×) y ceros (○) se arrastran con el ratón; cada movimiento recalcula todo. Se pueden agregar y quitar con los botones.' },
      { t: 'Respuesta en frecuencia', d: 'Se evalúa como el producto de los factores, en 500 puntos entre 10⁻² y 10⁵ rad/s. La fase se desenrolla partiendo de su rama natural, para que no salte 360° de golpe.' },
      { t: 'Márgenes', d: 'El margen de ganancia y el de fase se buscan por los cruces de 0 dB y de −180°.' },
      { t: 'Polos del lazo cerrado', d: 'Las raíces del lazo cerrado se calculan con el método de Durand-Kerner, que obtiene todas las raíces de un polinomio a la vez.' },
      { t: 'Escalón exacto', d: 'La respuesta al escalón sale de la exponencial de una matriz en forma canónica controlable: es exacta, sin paso de integración.' },
    ],
    concepts: [
      { t: 'Diagrama de Bode', d: 'Gráficos de magnitud (en dB) y fase de la respuesta en frecuencia, con frecuencia en escala logarítmica.' },
      { t: 'Diagrama de Nyquist', d: 'La respuesta en frecuencia como curva en el plano complejo. Su relación con el punto −1 decide la estabilidad del lazo cerrado.' },
      { t: 'Margen de ganancia y de fase', d: 'Cuánto se puede multiplicar la ganancia (o cuánta fase se puede perder) antes de que el lazo cerrado se vuelva inestable.' },
      { t: 'Cero en el semiplano derecho', d: 'Un cero con parte real positiva. Produce subimpulso: la respuesta al escalón arranca en sentido contrario y limita el ancho de banda posible.' },
      { t: 'Durand-Kerner', d: 'Método iterativo para hallar todas las raíces de un polinomio a la vez.' },
    ],
    decisions: [
      { t: 'Cálculo exacto', d: 'La exponencial de matriz evita errores de integración. El informe menciona una «transformada Z inversa implícita»: aquí se usa la exponencial, que es exacta.' },
      { t: 'Comprobar contra soluciones analíticas', d: 'Para K/[s(s+1)(s+2)] hay fórmulas cerradas conocidas; la herramienta debe coincidir con ellas, y así se prueba.' },
      { t: 'Fase desenrollada', d: 'Sin desenrollar, la fase salta 360° y los márgenes quedan mal calculados.' },
      { t: 'Ejemplos listos', d: 'Un lazo clásico, un segundo orden, un PID, un adelanto y un cero en el semiplano derecho cubren los casos que más enseñan.' },
    ],
    tour: [
      'Elige un ejemplo en el selector (lazo clásico, segundo orden, PID, adelanto o cero en el semiplano derecho) y mira Bode, Nyquist y la respuesta al escalón.',
      'Arrastra un polo del plano s hacia la derecha y observa cómo los márgenes se achican hasta que el sistema se vuelve inestable.',
      'Con el lazo clásico, sube la «Ganancia K» hasta 6: los polos cerrados quedan en ±j√2, el límite de estabilidad.',
      'Pulsa «+ par de polos» para agregar un segundo orden y mira cómo un amortiguamiento ζ = 0,5 da un sobreimpulso de ≈ 16,3 %.',
      'Carga el ejemplo con el cero en el semiplano derecho y marca «escalón en lazo cerrado (realimentación unitaria)» para ver el subimpulso.',
    ],
    verified: [
      'Para K/[s(s+1)(s+2)] el margen de ganancia es 20·log10(6/K) en ω = √2: 15,56 dB con K = 1, y con K = 6 los polos cerrados quedan en ±j√2.',
      'El segundo orden con ζ = 0,5 da un sobreimpulso de 16,3 %; el cero en el semiplano derecho produce subimpulso.',
      '11 pruebas automáticas.',
    ],
    limits: [
      'Trabaja con sistemas racionales de polos y ceros: no incluye retardos puros ni sistemas no lineales.',
      'Es una herramienta de práctica; no analiza datos medidos de un proceso real.',
      'Es una simulación, sin hardware ni prototipo.',
    ],
    next: [
      'Agregar un retardo puro con aproximación de Padé y ver su efecto en el margen de fase.',
      'Permitir ajustar un PID y ver sus tres ganancias sobre el lazo.',
    ],
  },
  en: {
    lead: 'Drag poles and zeros on the s-plane and instantly see the Bode plot, the Nyquist plot, the gain and phase margins, the closed-loop poles and the step response, computed exactly.',
    context: [
      'Tuning a loop by eye is trial and error. To understand margins and stability you have to see how each pole and zero changes the curve, and the result must be exact, not approximate.',
      'This practice tool instantly shows what happens to stability when a pole is moved or the gain is raised, with the step response computed without integration steps.',
    ],
    how: [
      { t: 'The system in zero-pole-gain form', d: 'The system is described by its poles, zeros and a gain K, as in the report. Poles and zeros can be real or complex-conjugate pairs.' },
      { t: 'Drag on the s-plane', d: 'Poles (×) and zeros (○) are dragged with the mouse; every move recomputes everything. They can be added and removed with the buttons.' },
      { t: 'Frequency response', d: 'It is evaluated as the product of the factors, at 500 points between 10⁻² and 10⁵ rad/s. The phase is unwrapped from its natural branch, so it does not jump 360° at once.' },
      { t: 'Margins', d: 'The gain and phase margins are found from the 0 dB and −180° crossings.' },
      { t: 'Closed-loop poles', d: 'The closed-loop roots are computed with the Durand-Kerner method, which obtains all the roots of a polynomial at once.' },
      { t: 'Exact step', d: 'The step response comes from the exponential of a matrix in controllable canonical form: it is exact, with no integration step.' },
    ],
    concepts: [
      { t: 'Bode plot', d: 'Plots of magnitude (in dB) and phase of the frequency response, with frequency on a logarithmic scale.' },
      { t: 'Nyquist plot', d: 'The frequency response as a curve in the complex plane. Its relation to the point −1 decides closed-loop stability.' },
      { t: 'Gain and phase margin', d: 'How much the gain can be multiplied (or how much phase can be lost) before the closed loop becomes unstable.' },
      { t: 'Right-half-plane zero', d: 'A zero with a positive real part. It produces undershoot: the step response starts in the opposite direction and limits the achievable bandwidth.' },
      { t: 'Durand-Kerner', d: 'An iterative method to find all the roots of a polynomial at once.' },
    ],
    decisions: [
      { t: 'Exact computation', d: 'The matrix exponential avoids integration errors. The report mentions an "implicit inverse Z transform": here the exponential is used, which is exact.' },
      { t: 'Check against analytic solutions', d: 'For K/[s(s+1)(s+2)] there are known closed-form formulas; the tool must match them, and that is how it is tested.' },
      { t: 'Unwrapped phase', d: 'Without unwrapping, the phase jumps 360° and the margins come out wrong.' },
      { t: 'Ready-made examples', d: 'A classic loop, a second-order system, a PID, a lead and a right-half-plane zero cover the cases that teach the most.' },
    ],
    tour: [
      'Pick an example in the selector (classic loop, second order, PID, lead or right-half-plane zero) and look at Bode, Nyquist and the step response.',
      'Drag a pole on the s-plane to the right and watch the margins shrink until the system becomes unstable.',
      'With the classic loop, raise the "Ganancia K" (gain) to 6: the closed-loop poles sit at ±j√2, the stability limit.',
      'Press "+ par de polos" (add a pole pair) to add a second-order system and see how a damping ζ = 0.5 gives an overshoot of ≈ 16.3 %.',
      'Load the example with the right-half-plane zero and tick "escalón en lazo cerrado (realimentación unitaria)" (closed-loop step, unity feedback) to see the undershoot.',
    ],
    verified: [
      'For K/[s(s+1)(s+2)] the gain margin is 20·log10(6/K) at ω = √2: 15.56 dB with K = 1, and with K = 6 the closed-loop poles sit at ±j√2.',
      'The second-order system with ζ = 0.5 gives an overshoot of 16.3 %; the right-half-plane zero produces undershoot.',
      '11 automated tests.',
    ],
    limits: [
      'It works with rational pole-zero systems: it does not include pure delays or nonlinear systems.',
      'It is a practice tool; it does not analyse measured data from a real process.',
      'It is a simulation, with no hardware or prototype.',
    ],
    next: [
      'Add a pure delay with a Padé approximation and see its effect on the phase margin.',
      'Allow adjusting a PID and seeing its three gains on the loop.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'De los polos y ceros a la estabilidad', en: 'From poles and zeros to stability' },
      caption: {
        es: 'Cada vez que se mueve un polo o un cero se recalcula toda la cadena. El ajuste vuelve al plano s hasta lograr los márgenes que se buscan.',
        en: 'Each time a pole or zero is moved, the whole chain is recomputed. Adjustment returns to the s-plane until the desired margins are achieved.',
      },
      nodes: [
        { id: 'pz', label: { es: 'Polos y ceros', en: 'Poles and zeros' }, sub: { es: 'plano s', en: 's-plane' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'fr', label: { es: 'Respuesta en frecuencia', en: 'Frequency response' }, sub: { es: '500 puntos', en: '500 points' }, col: 1, row: 0 },
        { id: 'mg', label: { es: 'Márgenes', en: 'Margins' }, sub: 'GM · PM', col: 2, row: 0, tone: 'amber' },
        { id: 'lc', label: { es: 'Lazo cerrado', en: 'Closed loop' }, sub: { es: 'escalón exacto', en: 'exact step' }, col: 3, row: 0, tone: 'magenta' },
      ],
      edges: [
        { from: 'pz', to: 'fr', label: 'L(jω)' },
        { from: 'fr', to: 'mg' },
        { from: 'mg', to: 'lc' },
        { from: 'lc', to: 'pz', loop: true, dashed: true, label: { es: 'ajuste', en: 'adjustment' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Margen de ganancia de K/[s(s+1)(s+2)]', en: 'Gain margin of K/[s(s+1)(s+2)]' },
      caption: {
        es: 'Valores de la fórmula exacta 20·log10(6/K). A K = 6 el margen se agota y los polos cerrados caen sobre el eje imaginario.',
        en: 'Values from the exact formula 20·log10(6/K). At K = 6 the margin is used up and the closed-loop poles land on the imaginary axis.',
      },
      rows: [
        {
          label: { es: 'Margen de ganancia (dB)', en: 'Gain margin (dB)' },
          items: [
            { label: 'K = 1', value: 15.56, text: '15,56 dB', tone: 'emerald' },
            { label: 'K = 3', value: 6.02, text: '6,02 dB', tone: 'amber' },
            { label: 'K = 6', value: 0, text: '0 dB', tone: 'magenta' },
          ],
        },
      ],
    },
  ],
}
