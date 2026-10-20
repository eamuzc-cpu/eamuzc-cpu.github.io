export default {
  status: { es: 'Diseño y simulación propios: no existe un prototipo medido', en: 'Own design and simulation: no measured prototype exists' },
  related: ['simulador-convertidor-dcdc', 'sintonizador-bode-nyquist', 'pendulo-invertido-pid-lqr'],
  es: {
    lead: 'El diseño de un convertidor de cuatro interruptores que entrega 24 V / 5 A desde una entrada de 9 a 36 V, con control digital en un STM32G474. La página reproduce el informe de ingeniería y, al llevarlo a simulación, encontró seis puntos que habrían aparecido recién en el laboratorio.',
    context: [
      'Mantener 24 V estables con una entrada que puede estar por encima o por debajo de la salida (batería, panel o bus automotriz) obliga a pasar de reductor a elevador sin saltos. Y en modo elevador aparece un cero en el semiplano derecho que limita el ancho de banda del lazo: un compensador mal calculado oscila o se dispara antes de arrancar.',
      'Reproducir el informe en simulación antes de fabricar la placa permite encontrar errores sin riesgo de dañar MOSFET. El diseño revisado queda con margen de fase y de ganancia en todo el rango de entrada y resiste los escenarios probados.',
    ],
    how: [
      { t: 'La especificación', d: 'Un convertidor de 120 W a 250 kHz que entrega 24 V / 5 A desde 9 a 36 V, con cuatro MOSFET (convertidor buck-boost síncrono).' },
      { t: 'Dimensionamiento', d: 'Inductor de 6,8 µH, capacitor de salida de 470 µF y pérdidas del MOSFET BSC050N04LSG. La calculadora de la página devuelve las once cifras del informe.' },
      { t: 'Modelo de pequeña señal', d: 'En modo elevador aparece un cero en el semiplano derecho en 13,7 kHz que limita el ancho de banda alcanzable del lazo.' },
      { t: 'Una variable de control', d: 'Una sola variable u modula la rama buck hasta 0,9 y, pasado ese punto, la rama boost, de modo que el compensador no ve el cambio de modo.' },
      { t: 'Compensador digital', d: 'Un compensador tipo III se discretiza con Tustin y se implementa como filtro 3P3Z en el acelerador FMAC del STM32G474; el PWM sale del HRTIM de 184 ps y la protección de 20 A usa COMP1 más un DAC.' },
      { t: 'Simulación del lazo cerrado', d: 'Un modelo promediado integrado con RK4 y un retardo de una muestra reproduce el arranque, un escalón de carga de 0,5 a 4,5 A, un escalón y un barrido de entrada, un cortocircuito y la pérdida de carga.' },
      { t: 'Revisión del informe', d: 'Al reproducirlo aparecieron seis puntos y se calculó un compensador revisado que da 54 a 61° de margen de fase entre 9 y 36 V.' },
    ],
    concepts: [
      { t: 'Buck-boost síncrono de cuatro interruptores', d: 'Un convertidor con dos ramas de media puente: una puede reducir la tensión (buck) y otra elevarla (boost). Con el control adecuado pasa de una a otra sin interrumpir la salida.' },
      { t: 'Cero en el semiplano derecho', d: 'Efecto del modo elevador: al aumentar el ciclo de trabajo, la tensión primero baja y luego sube. Obliga a limitar el ancho de banda del lazo muy por debajo de ese cero.' },
      { t: 'Margen de fase', d: 'Cuánta fase extra tiene el lazo antes de volverse inestable en el cruce de ganancia. Con poco margen, el sistema oscila; con mucho, es robusto pero lento.' },
      { t: 'Compensador 3P3Z y Tustin', d: 'Un filtro digital de tres polos y tres ceros, obtenido discretizando el compensador analógico con la transformación de Tustin.' },
      { t: 'HRTIM y FMAC', d: 'El temporizador de alta resolución del STM32G474 (184 ps) y su acelerador de filtros: permiten PWM fino y cálculo del compensador sin cargar la CPU.' },
    ],
    decisions: [
      { t: 'Reproducir antes de construir', d: 'Es mucho más barato descubrir en simulación que los coeficientes no cuadran que descubrirlo con una placa humeando.' },
      { t: 'Cotejar contra el script original', d: 'Las 18 pruebas comparan la síntesis con el script del informe ejecutado con scipy; coinciden hasta el sexto dígito, y así se sabe qué parte del código no es la del script.' },
      { t: 'Contar los hallazgos', d: 'Documentar los seis puntos, y no solo corregirlos, deja claro qué estaba mal en el informe original y por qué importa.' },
      { t: 'Decir que no hay prototipo', d: 'El modelo promediado no incluye pérdidas de conmutación ni saturación del inductor, y no existe una placa medida. Se declara en la ficha.' },
    ],
    tour: [
      'En «Resumen» mira la arquitectura y la variable de control unificada u.',
      'En «Dimensionamiento» pulsa «Valores del informe» y revisa «Resultados del dimensionamiento»; cambia los «Datos de entrada» para ver cómo se mueven las cifras.',
      'En «Lazo de control» mueve el compensador y mira el margen de fase y de ganancia del Bode, y los coeficientes de la ecuación en diferencias.',
      'En «Simulación» elige un «Escenario» (arranque, escalón de carga, barrido de entrada, cortocircuito, pérdida de carga) y pulsa «Simular»; usa «Ver todo» para ver la forma completa.',
      'En «Revisión del diseño» lee los seis puntos, lo que sí se confirmó y la versión revisada del compensador.',
      'En «Firmware y BOM» revisa el firmware y la lista de materiales.',
    ],
    verified: [
      '18 pruebas: la síntesis del compensador coincide con el script original en scipy hasta el sexto dígito, y se verifica cada escenario.',
      'El compensador revisado da 54 a 61° de margen de fase entre 9 y 36 V y supera todos los escenarios.',
      'Los seis puntos hallados: coeficientes del código C distintos de los del script, margen de fase real de 28 a 42° (no más de 50°), un piso de u que dispara la protección en el arranque a 36 V, un hundimiento de 150 mV inalcanzable con 470 µF (≈ 0,5 V), un tiempo muerto de 12,5 ns y no 50 ns, y una tabla de rizado que no coincide con el cálculo.',
    ],
    limits: [
      'Es un diseño y una simulación propios: no hay prototipo medido («Prototipo medido: pendiente»).',
      'El modelo promediado no incluye pérdidas de conmutación ni saturación del inductor.',
      'El firmware en C para el STM32G474 está escrito pero no se ha probado en hardware.',
    ],
    next: [
      'Construir la placa y medir el margen de fase real con un analizador de respuesta en frecuencia.',
      'Agregar pérdidas de conmutación y saturación del inductor al modelo de simulación.',
    ],
  },
  en: {
    lead: 'The design of a four-switch converter that delivers 24 V / 5 A from a 9 to 36 V input, with digital control on an STM32G474. The page reproduces the engineering report and, on taking it to simulation, found six points that would only have shown up in the lab.',
    context: [
      'Keeping 24 V stable with an input that may be above or below the output (battery, panel or automotive bus) forces a smooth switch from step-down to step-up. And in boost mode a right-half-plane zero appears that limits the loop bandwidth: a badly computed compensator oscillates or trips before starting.',
      'Reproducing the report in simulation before building the board allows errors to be found with no risk of damaging MOSFETs. The revised design keeps phase and gain margin across the whole input range and withstands the scenarios tried.',
    ],
    how: [
      { t: 'The specification', d: 'A 120 W, 250 kHz converter that delivers 24 V / 5 A from 9 to 36 V, with four MOSFETs (a synchronous buck-boost converter).' },
      { t: 'Sizing', d: '6.8 µH inductor, 470 µF output capacitor and BSC050N04LSG MOSFET losses. The page’s calculator returns the report’s eleven figures.' },
      { t: 'Small-signal model', d: 'In boost mode a right-half-plane zero appears at 13.7 kHz that limits the loop’s achievable bandwidth.' },
      { t: 'One control variable', d: 'A single variable u modulates the buck leg up to 0.9 and, beyond that point, the boost leg, so the compensator does not see the mode change.' },
      { t: 'Digital compensator', d: 'A type III compensator is discretised with Tustin and implemented as a 3P3Z filter in the STM32G474’s FMAC accelerator; PWM comes from the 184 ps HRTIM and the 20 A protection uses COMP1 plus a DAC.' },
      { t: 'Closed-loop simulation', d: 'An averaged model integrated with RK4 and a one-sample delay reproduces start-up, a 0.5 to 4.5 A load step, an input step and sweep, a short circuit and loss of load.' },
      { t: 'Review of the report', d: 'On reproducing it, six points appeared and a revised compensator was computed that gives 54 to 61° of phase margin between 9 and 36 V.' },
    ],
    concepts: [
      { t: 'Four-switch synchronous buck-boost', d: 'A converter with two half-bridge legs: one can step the voltage down (buck) and the other up (boost). With the right control it passes from one to the other without interrupting the output.' },
      { t: 'Right-half-plane zero', d: 'A boost-mode effect: when the duty cycle increases, the voltage first drops and then rises. It forces the loop bandwidth to stay well below that zero.' },
      { t: 'Phase margin', d: 'How much extra phase the loop has before becoming unstable at gain crossover. With little margin the system oscillates; with a lot, it is robust but slow.' },
      { t: '3P3Z compensator and Tustin', d: 'A digital filter with three poles and three zeros, obtained by discretising the analog compensator with the Tustin transform.' },
      { t: 'HRTIM and FMAC', d: 'The STM32G474’s high-resolution timer (184 ps) and its filter accelerator: they allow fine PWM and compensator computation without loading the CPU.' },
    ],
    decisions: [
      { t: 'Reproduce before building', d: 'It is much cheaper to find in simulation that the coefficients do not add up than to find out with a smoking board.' },
      { t: 'Cross-check against the original script', d: 'The 18 tests compare the synthesis with the report’s script run with scipy; they agree to the sixth digit, so it is known which part of the code is not the script’s.' },
      { t: 'Count the findings', d: 'Documenting the six points, not just fixing them, makes clear what was wrong in the original report and why it matters.' },
      { t: 'Say there is no prototype', d: 'The averaged model does not include switching losses or inductor saturation, and no measured board exists. This is stated on the project sheet.' },
    ],
    tour: [
      'In "Resumen" (summary) look at the architecture and the unified control variable u.',
      'In "Dimensionamiento" (sizing) press "Valores del informe" (report values) and review "Resultados del dimensionamiento"; change the "Datos de entrada" (inputs) to see the figures move.',
      'In "Lazo de control" (control loop) move the compensator and watch the Bode phase and gain margins, and the difference-equation coefficients.',
      'In "Simulación" pick a "Escenario" (start-up, load step, input sweep, short circuit, loss of load) and press "Simular"; use "Ver todo" (view all) to see the full shape.',
      'In "Revisión del diseño" (design review) read the six points, what was confirmed and the revised compensator version.',
      'In "Firmware y BOM" review the firmware and the bill of materials.',
    ],
    verified: [
      '18 tests: the compensator synthesis matches the original scipy script to the sixth digit, and each scenario is verified.',
      'The revised compensator gives 54 to 61° of phase margin between 9 and 36 V and passes all scenarios.',
      'The six findings: the C code’s coefficients differ from the script’s, the real phase margin is 28 to 42° (not over 50°), a floor on u trips the protection at start-up at 36 V, a 150 mV dip is unreachable with 470 µF (≈ 0.5 V), a dead time of 12.5 ns rather than 50 ns, and a ripple table that does not match the calculation.',
    ],
    limits: [
      'It is an own design and simulation: there is no measured prototype ("Measured prototype: pending").',
      'The averaged model does not include switching losses or inductor saturation.',
      'The STM32G474 C firmware is written but has not been tested on hardware.',
    ],
    next: [
      'Build the board and measure the real phase margin with a frequency-response analyser.',
      'Add switching losses and inductor saturation to the simulation model.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'El lazo digital del convertidor', en: 'The converter’s digital loop' },
      caption: {
        es: 'El STM32G474 mide la entrada, la salida y la corriente del inductor, calcula el compensador en el FMAC y genera el PWM con el HRTIM. La etapa de potencia devuelve esas mismas variables al ADC.',
        en: 'The STM32G474 measures input, output and inductor current, computes the compensator in the FMAC and generates PWM with the HRTIM. The power stage returns those same variables to the ADC.',
      },
      nodes: [
        { id: 'adc', label: 'ADC', sub: 'Vin · Vout · IL', col: 0, row: 0 },
        { id: 'com', label: { es: 'Compensador', en: 'Compensator' }, sub: '3P3Z · FMAC', col: 1, row: 0, tone: 'magenta' },
        { id: 'hr', label: 'HRTIM', sub: 'PWM A/B · 184 ps', col: 2, row: 0, tone: 'amber' },
        { id: 'pot', label: { es: 'Etapa de potencia', en: 'Power stage' }, sub: { es: '4 MOSFET · 250 kHz', en: '4 MOSFETs · 250 kHz' }, col: 3, row: 0, tone: 'emerald' },
      ],
      edges: [
        { from: 'adc', to: 'com', label: 'e(k)' },
        { from: 'com', to: 'hr', label: 'u' },
        { from: 'hr', to: 'pot', label: 'PWM' },
        { from: 'pot', to: 'adc', loop: true, dashed: true, label: { es: 'sensado', en: 'sensing' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Qué cambió con la revisión', en: 'What the review changed' },
      caption: {
        es: 'Resultados de la simulación. El informe afirmaba más de 50° de margen y un hundimiento de 150 mV; el diseño reproducido daba 28° en el peor caso y un hundimiento cercano a 0,5 V.',
        en: 'Simulation results. The report claimed over 50° of margin and a 150 mV dip; the reproduced design gave 28° in the worst case and a dip close to 0.5 V.',
      },
      rows: [
        {
          label: { es: 'Margen de fase mínimo entre 9 y 36 V (°)', en: 'Minimum phase margin between 9 and 36 V (°)' },
          items: [
            { label: { es: 'Diseño del informe (reproducido)', en: 'Report design (reproduced)' }, value: 28, text: '28°', tone: 'magenta' },
            { label: { es: 'Compensador revisado', en: 'Revised compensator' }, value: 54, text: '54°', tone: 'emerald' },
          ],
        },
        {
          label: { es: 'Hundimiento de la salida en el escalón de carga (mV)', en: 'Output dip in the load step (mV)' },
          items: [
            { label: { es: 'Meta del informe', en: 'Report target' }, value: 150, text: '150 mV', tone: 'cyan' },
            { label: { es: 'Simulado con 470 µF', en: 'Simulated with 470 µF' }, value: 500, text: '≈ 500 mV', tone: 'magenta' },
          ],
        },
      ],
    },
  ],
}
