export default {
  status: { es: 'Simulado: señales sintéticas de un rodamiento 6205', en: 'Simulated: synthetic signals of a 6205 bearing' },
  related: ['espectrograma-fft-blackman-harris', 'gestor-mantenimiento-tpm', 'monitor-energia-esp32'],
  es: {
    lead: 'Un detector de fallas de rodamiento que trabaja sobre señales de vibración sintéticas: calcula el espectro y la envolvente, busca las frecuencias características de cada tipo de falla y usa la distancia de Mahalanobis para avisar semanas antes de que la falla sea funcional.',
    context: [
      'La falla incipiente de un rodamiento no se ve en el valor RMS: se esconde en impactos periódicos pequeños que excitan una resonancia de la estructura y solo aparecen al demodular la señal.',
      'Detectar la falla semanas antes permite planificar la parada; detectarla tarde es un paro no planificado. Este proyecto reproduce la cadena completa de análisis, desde el modelo de la señal hasta la alerta temprana.',
    ],
    how: [
      { t: 'Generar la señal con un modelo físico', d: 'Cada falla produce impactos periódicos a una frecuencia característica (BPFO, BPFI o 2·BSF). Esos impactos excitan una resonancia de 3,3 kHz, que se modula con la zona de carga o la jaula, y se suma ruido.' },
      { t: 'Calcular las frecuencias del rodamiento', d: 'A partir de la geometría del 6205 (9 bolas, 7,94 mm de diámetro de bola, 39,04 mm de diámetro de paso) se obtienen BPFO, BPFI, BSF y FTF para cada velocidad de giro.' },
      { t: 'FFT y envolvente', d: 'La FFT da el espectro. La envolvente se obtiene filtrando alrededor de la resonancia, tomando la magnitud de la señal analítica (transformada de Hilbert) y calculando otra FFT: ahí aparecen los picos a las frecuencias de falla.' },
      { t: 'Características', d: 'De cada ventana se extraen RMS, curtosis y la relación señal/ruido de los picos de las frecuencias características.' },
      { t: 'Línea base sana y Mahalanobis', d: 'El detector se calibra con 200 ventanas sanas. La distancia de Mahalanobis mide qué tan lejos está una ventana nueva de ese comportamiento sano, teniendo en cuenta la correlación entre características.' },
      { t: 'Alerta e identificación', d: 'Si la distancia supera el umbral se da la alerta, y los picos indican el tipo de falla: pista exterior, pista interior o elemento rodante.' },
    ],
    concepts: [
      { t: 'Frecuencias características', d: 'Cada defecto de un rodamiento produce impactos a una frecuencia que depende de su geometría y de la velocidad de giro. BPFO es la de la pista exterior, BPFI la de la interior y BSF la de las bolas.' },
      { t: 'Envolvente', d: 'Curva que sigue la amplitud de la señal. Demodular la resonancia revela los impactos repetitivos que el espectro normal esconde.' },
      { t: 'Curtosis', d: 'Mide qué tan «puntiaguda» es una señal: crece cuando aparecen impactos aislados sobre un fondo tranquilo.' },
      { t: 'Distancia de Mahalanobis', d: 'Distancia estadística que tiene en cuenta la dispersión y la correlación de las características sanas. Una ventana con distancia grande es anómala.' },
      { t: 'Línea base', d: 'Conjunto de mediciones de la máquina en buen estado con el que se compara todo lo demás.' },
    ],
    decisions: [
      { t: 'Usar datos sintéticos de modelo físico', d: 'Permite controlar el tipo y la severidad de la falla y repetir el experimento. A cambio, los resultados no son mediciones de una máquina real y así se declara.' },
      { t: 'Demodular en vez de mirar el espectro directo', d: 'En una falla incipiente, el espectro directo apenas cambia; la envolvente concentra la información en picos claros.' },
      { t: 'Un detector multivariable', d: 'Combinar varias características detecta cambios que ninguna aislada mostraría. Mahalanobis lo hace sin necesidad de ejemplos de falla.' },
      { t: 'Calibrar solo con datos sanos', d: 'En una planta casi nunca hay ejemplos de fallas; sí hay muchas mediciones sanas. Entrenar con lo sano es lo realista.' },
    ],
    tour: [
      'En «Condición del rodamiento» elige un «Tipo de falla» (pista exterior) con severidad baja y pulsa «Nueva muestra»: compara el espectro (0–6 kHz) con el «Espectro de la envolvente» (0–400 Hz): ¿en cuál se ve el pico?',
      'Cambia el tipo de falla (pista interior, elemento rodante) y mira cómo cambia la frecuencia característica del pico en la envolvente.',
      'Sube la «Severidad» poco a poco y observa a partir de cuál el «Diagnóstico de esta muestra» da la alerta (esperado: desde 0,3 con detección total).',
      'Pulsa «Simular degradación» (60 días) y fíjate en el día en que se enciende la alerta (día 32) frente al día de la falla funcional.',
      'Pulsa «Evaluar» para correr la evaluación del detector con datos sintéticos independientes.',
    ],
    verified: [
      'Sobre 200 ventanas sanas y 1.500 con falla (3 tipos × 5 severidades): 1 falsa alarma (0,5 %).',
      'Detección del 100 % desde severidad 0,3 en los tres tipos, con el tipo de falla identificado correctamente.',
      'En una degradación de 60 días, la alerta llegó el día 32, con la falla todavía leve, 28 días antes del fallo funcional.',
    ],
    limits: [
      'Los datos son sintéticos, no mediciones de una máquina: la anticipación de 28 días vale para esta simulación, no es una promesa.',
      'El modelo supone un solo defecto a la vez, con velocidad constante y una resonancia conocida.',
      'Una máquina real tiene ruido de otras fuentes (engranajes, desalineación) que este modelo no incluye.',
    ],
    next: [
      'Probar el detector con datos públicos de rodamientos reales (por ejemplo, los de Case Western Reserve University).',
      'Agregar el cálculo de vida remanente a partir de la tendencia de la distancia de Mahalanobis.',
    ],
  },
  en: {
    lead: 'A bearing-fault detector working on synthetic vibration signals: it computes the spectrum and the envelope, looks for each fault type’s characteristic frequencies and uses the Mahalanobis distance to warn weeks before the fault becomes functional.',
    context: [
      'An incipient bearing fault is not visible in the RMS value: it hides in small periodic impacts that excite a structural resonance and only appear when the signal is demodulated.',
      'Detecting the fault weeks ahead lets you plan the stop; detecting it late is an unplanned shutdown. This project reproduces the whole analysis chain, from the signal model to the early warning.',
    ],
    how: [
      { t: 'Generate the signal with a physical model', d: 'Each fault produces periodic impacts at a characteristic frequency (BPFO, BPFI or 2·BSF). Those impacts excite a 3.3 kHz resonance, which is modulated by the load zone or the cage, and noise is added.' },
      { t: 'Compute the bearing’s frequencies', d: 'From the 6205 geometry (9 balls, 7.94 mm ball diameter, 39.04 mm pitch diameter), BPFO, BPFI, BSF and FTF are obtained for each shaft speed.' },
      { t: 'FFT and envelope', d: 'The FFT gives the spectrum. The envelope is obtained by filtering around the resonance, taking the magnitude of the analytic signal (Hilbert transform) and computing another FFT: the fault-frequency peaks appear there.' },
      { t: 'Features', d: 'From each window, RMS, kurtosis and the signal-to-noise ratio of the characteristic-frequency peaks are extracted.' },
      { t: 'Healthy baseline and Mahalanobis', d: 'The detector is calibrated with 200 healthy windows. The Mahalanobis distance measures how far a new window is from that healthy behaviour, accounting for the correlation between features.' },
      { t: 'Alert and identification', d: 'If the distance exceeds the threshold an alert is raised, and the peaks indicate the fault type: outer race, inner race or rolling element.' },
    ],
    concepts: [
      { t: 'Characteristic frequencies', d: 'Each bearing defect produces impacts at a frequency depending on its geometry and shaft speed. BPFO is the outer-race one, BPFI the inner-race one and BSF the ball one.' },
      { t: 'Envelope', d: 'A curve following the signal’s amplitude. Demodulating the resonance reveals the repetitive impacts the ordinary spectrum hides.' },
      { t: 'Kurtosis', d: 'It measures how "peaky" a signal is: it grows when isolated impacts appear over a calm background.' },
      { t: 'Mahalanobis distance', d: 'A statistical distance that accounts for the spread and correlation of the healthy features. A window with a large distance is anomalous.' },
      { t: 'Baseline', d: 'A set of measurements of the machine in good condition against which everything else is compared.' },
    ],
    decisions: [
      { t: 'Use synthetic physical-model data', d: 'It allows controlling the fault type and severity and repeating the experiment. In return, results are not measurements of a real machine and are declared as such.' },
      { t: 'Demodulate instead of looking at the raw spectrum', d: 'In an incipient fault the raw spectrum barely changes; the envelope concentrates the information into clear peaks.' },
      { t: 'A multivariate detector', d: 'Combining several features detects changes none would show alone. Mahalanobis does it without needing fault examples.' },
      { t: 'Calibrate with healthy data only', d: 'In a plant there are almost never fault examples; there are plenty of healthy measurements. Training on healthy data is the realistic option.' },
    ],
    tour: [
      'Under "Condición del rodamiento" (bearing condition) choose a "Tipo de falla" (fault type; outer race) with low severity and press "Nueva muestra" (new sample): compare the spectrum (0–6 kHz) with the "Espectro de la envolvente" (envelope spectrum, 0–400 Hz): in which one does the peak show?',
      'Change the fault type (inner race, rolling element) and see how the characteristic frequency of the peak changes in the envelope.',
      'Raise the "Severidad" (severity) gradually and watch from which point the "Diagnóstico de esta muestra" (diagnosis of this sample) alerts (expected: from 0.3 with full detection).',
      'Press "Simular degradación" (simulate degradation, 60 days) and note the day the alert fires (day 32) versus the day of functional failure.',
      'Press "Evaluar" (evaluate) to run the detector’s evaluation on independent synthetic data.',
    ],
    verified: [
      'Over 200 healthy windows and 1,500 with faults (3 types × 5 severities): 1 false alarm (0.5 %).',
      '100 % detection from severity 0.3 for all three types, with the fault type correctly identified.',
      'In a 60-day degradation, the alert came on day 32, with the fault still slight, 28 days before functional failure.',
    ],
    limits: [
      'The data is synthetic, not measurements from a machine: the 28-day lead applies to this simulation, it is not a promise.',
      'The model assumes a single defect at a time, with constant speed and a known resonance.',
      'A real machine has noise from other sources (gears, misalignment) that this model does not include.',
    ],
    next: [
      'Test the detector with public data from real bearings (for example, Case Western Reserve University’s).',
      'Add a remaining-useful-life estimate from the trend of the Mahalanobis distance.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'De la vibración a la alerta', en: 'From vibration to alert' },
      caption: {
        es: 'La señal pasa por dos vías (espectro y envolvente) hasta convertirse en características. La línea base sana, calibrada con 200 ventanas, es la referencia del detector.',
        en: 'The signal goes through two routes (spectrum and envelope) until it becomes features. The healthy baseline, calibrated with 200 windows, is the detector’s reference.',
      },
      nodes: [
        { id: 'sig', label: { es: 'Señal sintética', en: 'Synthetic signal' }, sub: { es: 'modelo físico 6205', en: '6205 physical model' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'fft', label: { es: 'FFT + envolvente', en: 'FFT + envelope' }, sub: 'BPFO · BPFI · BSF', col: 1, row: 0, tone: 'magenta' },
        { id: 'car', label: { es: 'Características', en: 'Features' }, sub: 'RMS · curtosis · SNR', col: 2, row: 0 },
        { id: 'det', label: { es: 'Detector', en: 'Detector' }, sub: 'Mahalanobis', col: 3, row: 0, tone: 'amber' },
        { id: 'bas', label: { es: 'Línea base sana', en: 'Healthy baseline' }, sub: { es: '200 ventanas', en: '200 windows' }, col: 3, row: 1 },
      ],
      edges: [
        { from: 'sig', to: 'fft' },
        { from: 'fft', to: 'car', label: { es: 'picos', en: 'peaks' } },
        { from: 'car', to: 'det' },
        { from: 'bas', to: 'det', label: { es: 'referencia', en: 'reference' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'La degradación simulada de 60 días', en: 'The simulated 60-day degradation' },
      caption: {
        es: 'El detector enciende la alerta cuando la falla todavía es leve, con margen para planificar la parada. Datos sintéticos.',
        en: 'The detector raises the alert while the fault is still slight, leaving time to plan the stop. Synthetic data.',
      },
      rows: [
        {
          label: { es: 'Día de la simulación', en: 'Day of the simulation' },
          items: [
            { label: { es: 'Alerta del detector', en: 'Detector alert' }, value: 32, text: { es: 'día 32', en: 'day 32' }, tone: 'emerald' },
            { label: { es: 'Fallo funcional', en: 'Functional failure' }, value: 60, text: { es: 'día 60', en: 'day 60' }, tone: 'magenta' },
          ],
        },
      ],
    },
  ],
}
