export default {
  status: { es: 'Simulado: sonidos sintéticos (no es voz humana ni la red del informe)', en: 'Simulated: synthetic sounds (not human voice nor the report’s network)' },
  related: ['espectrograma-fft-blackman-harris', 'gemelo-digital-nodo-iot', 'filtros-imagen-canny'],
  es: {
    lead: 'El pipeline de extracción de características del informe completo (pre-énfasis, tramas de 40 ms, FFT, 40 filtros Mel, log-energías y DCT) que produce un tensor de 49 × 10, y un clasificador pequeño entrenado en la propia página que reconoce seis «comandos» sintéticos.',
    context: [
      'Reconocer comandos en un microcontrolador exige un front-end de audio preciso y un modelo diminuto. Antes de pensar en la red hay que comprobar que las características separan bien los sonidos y cómo se degradan con el ruido.',
      'El proyecto muestra de punta a punta cómo se pasa de una forma de onda a un tensor y a una decisión, y mide la robustez al ruido. No es voz humana ni la red DS-CNN del informe, y así se declara.',
    ],
    how: [
      { t: 'Pre-énfasis', d: 'Un filtro de primer orden con coeficiente 0,97 realza las altas frecuencias, que en la voz llevan poca energía.' },
      { t: 'Tramas de 40 ms cada 20 ms', d: 'Un segundo de audio a 16 kHz se parte en 49 tramas de 40 ms con un paso de 20 ms.' },
      { t: 'FFT y banco de filtros Mel', d: 'Cada trama pasa por una FFT y por un banco de 40 filtros triangulares espaciados en escala Mel, M(f) = 2595·log10(1 + f/700), construido como en el script de Python del informe.' },
      { t: 'Log-energía y DCT-II', d: 'Se toma el logaritmo de la energía de cada filtro y una DCT-II conserva 10 coeficientes: las MFCC. El resultado es un tensor de 49 × 10.' },
      { t: 'Resumir en 32 características', d: 'Para el clasificador se resumen el nivel, la duración y la media de las MFCC en tres tramos de la zona activa: 32 características por sonido.' },
      { t: 'Un clasificador softmax pequeño', d: 'Una regresión softmax de 198 parámetros se entrena en la página con sonidos sintéticos: barrido ascendente, barrido descendente, doble pitido, alarma, ráfaga de ruido y silencio.' },
      { t: 'Medir contra el ruido', d: 'Con 120 sonidos nuevos se mide la exactitud para distintos niveles de relación señal/ruido.' },
    ],
    concepts: [
      { t: 'Escala Mel', d: 'Escala de frecuencias que imita cómo el oído distingue tonos: fina en graves y gruesa en agudos.' },
      { t: 'MFCC', d: 'Coeficientes cepstrales en la escala Mel: una descripción compacta del timbre de un sonido, muy usada en reconocimiento de voz.' },
      { t: 'DCT-II', d: 'Transformada del coseno que decorrelaciona las log-energías y concentra la información en pocos coeficientes.' },
      { t: 'Regresión softmax', d: 'Clasificador lineal que convierte puntuaciones en probabilidades de cada clase; es la capa final de muchas redes.' },
      { t: 'TinyML', d: 'Aprendizaje automático en microcontroladores, con modelos muy pequeños y cuantizados.' },
    ],
    decisions: [
      { t: 'Reproducir el front-end del informe', d: 'Cada pieza (el banco de filtros, la ortogonalidad de la DCT, que un tono de 1 kHz caiga en el filtro correcto) tiene su prueba.' },
      { t: 'Un clasificador simple y honesto', d: 'En lugar de fingir una DS-CNN, se usa un clasificador pequeño que sí se puede entrenar y evaluar en el navegador, y se dice que es distinto.' },
      { t: 'Sonidos sintéticos', d: 'Permiten controlar la clase y el ruido. Con palabras reales haría falta un conjunto de datos como Speech Commands y una red convolucional entrenada con él y cuantizada.' },
      { t: 'Medir la degradación', d: 'La exactitud frente al ruido es lo que dice cuánto se puede confiar en el sistema fuera del laboratorio.' },
    ],
    tour: [
      'Al abrir, la página se entrena sola con «Entrenamiento (sonidos sintéticos)»; pulsa «Entrenar de nuevo» para repetirlo.',
      'En «Probar un sonido» elige un «Comando» (barrido ascendente, doble pitido, alarma…) y mira la forma de onda, la log-energía Mel y el tensor MFCC 49 × 10.',
      'Pulsa «Otra muestra» y observa que cada muestra es distinta pero la clasificación se mantiene.',
      'Baja la «Relación señal/ruido» y mira cómo se degradan las probabilidades.',
      'Pulsa «Medir exactitud según el ruido (≈ 2 s)» para obtener la exactitud con 120 sonidos nuevos: 100 % a 20 dB, 100 % a 5 dB y 77 % a 0 dB.',
    ],
    verified: [
      'Con 120 sonidos nuevos: 100 % de acierto a 20 dB, 100 % a 5 dB y 77 % a 0 dB.',
      'Cada pieza del front-end tiene su prueba: el banco de filtros, la ortogonalidad de la DCT y que un tono de 1 kHz caiga en el filtro correcto.',
      '11 pruebas automáticas; clasificador de 198 parámetros sobre 32 características.',
    ],
    limits: [
      'NO es la DS-CNN con TensorFlow Lite for Microcontrollers del informe, no usa WebAssembly ni voz humana.',
      'Los sonidos son sintéticos: con palabras reales haría falta un conjunto de datos como Speech Commands, una red convolucional entrenada con él y cuantización.',
      'Es una simulación, sin hardware ni prototipo.',
    ],
    next: [
      'Entrenar con un conjunto de palabras reales y comparar con el clasificador softmax.',
      'Cuantizar a 8 bits y estimar el tamaño en memoria y el tiempo de inferencia en un microcontrolador.',
    ],
  },
  en: {
    lead: 'The report’s full feature-extraction pipeline (pre-emphasis, 40 ms frames, FFT, 40 Mel filters, log-energies and DCT) producing a 49 × 10 tensor, and a small classifier trained on the page itself that recognises six synthetic "commands".',
    context: [
      'Recognising commands on a microcontroller requires a precise audio front-end and a tiny model. Before thinking about the network, you must check that the features separate the sounds well and how they degrade with noise.',
      'The project shows end to end how to go from a waveform to a tensor and a decision, and measures noise robustness. It is not human voice nor the report’s DS-CNN network, and this is stated.',
    ],
    how: [
      { t: 'Pre-emphasis', d: 'A first-order filter with coefficient 0.97 boosts high frequencies, which carry little energy in speech.' },
      { t: '40 ms frames every 20 ms', d: 'One second of audio at 16 kHz is split into 49 frames of 40 ms with a 20 ms hop.' },
      { t: 'FFT and Mel filter bank', d: 'Each frame goes through an FFT and a bank of 40 triangular filters spaced on the Mel scale, M(f) = 2595·log10(1 + f/700), built as in the report’s Python script.' },
      { t: 'Log-energy and DCT-II', d: 'The logarithm of each filter’s energy is taken and a DCT-II keeps 10 coefficients: the MFCCs. The result is a 49 × 10 tensor.' },
      { t: 'Summarise into 32 features', d: 'For the classifier, level, duration and the mean MFCC in three segments of the active zone are summarised: 32 features per sound.' },
      { t: 'A small softmax classifier', d: 'A 198-parameter softmax regression is trained on the page with synthetic sounds: rising sweep, falling sweep, double beep, alarm, noise burst and silence.' },
      { t: 'Measure against noise', d: 'With 120 new sounds, accuracy is measured for different signal-to-noise levels.' },
    ],
    concepts: [
      { t: 'Mel scale', d: 'A frequency scale that imitates how the ear tells tones apart: fine at low frequencies and coarse at high ones.' },
      { t: 'MFCC', d: 'Mel-frequency cepstral coefficients: a compact description of a sound’s timbre, widely used in speech recognition.' },
      { t: 'DCT-II', d: 'A cosine transform that decorrelates the log-energies and concentrates information in few coefficients.' },
      { t: 'Softmax regression', d: 'A linear classifier that turns scores into per-class probabilities; it is the final layer of many networks.' },
      { t: 'TinyML', d: 'Machine learning on microcontrollers, with very small, quantised models.' },
    ],
    decisions: [
      { t: 'Reproduce the report’s front-end', d: 'Each piece (the filter bank, the DCT’s orthogonality, a 1 kHz tone falling in the right filter) has its test.' },
      { t: 'A simple, honest classifier', d: 'Instead of faking a DS-CNN, a small classifier that can really be trained and evaluated in the browser is used, and it is stated to be different.' },
      { t: 'Synthetic sounds', d: 'They allow controlling the class and the noise. With real words you would need a dataset like Speech Commands and a convolutional network trained on it and quantised.' },
      { t: 'Measure the degradation', d: 'Accuracy against noise is what says how far the system can be trusted outside the lab.' },
    ],
    tour: [
      'On opening, the page trains itself under "Entrenamiento (sonidos sintéticos)" (training, synthetic sounds); press "Entrenar de nuevo" (train again) to repeat it.',
      'Under "Probar un sonido" (try a sound) choose a "Comando" (rising sweep, double beep, alarm…) and look at the waveform, the Mel log-energy and the 49 × 10 MFCC tensor.',
      'Press "Otra muestra" (another sample) and see that each sample is different but the classification holds.',
      'Lower the "Relación señal/ruido" (signal-to-noise ratio) and watch the probabilities degrade.',
      'Press "Medir exactitud según el ruido (≈ 2 s)" (measure accuracy by noise) to get the accuracy on 120 new sounds: 100 % at 20 dB, 100 % at 5 dB and 77 % at 0 dB.',
    ],
    verified: [
      'With 120 new sounds: 100 % accuracy at 20 dB, 100 % at 5 dB and 77 % at 0 dB.',
      'Each front-end piece has its test: the filter bank, the DCT’s orthogonality and a 1 kHz tone falling in the right filter.',
      '11 automated tests; a 198-parameter classifier on 32 features.',
    ],
    limits: [
      'It is NOT the report’s DS-CNN with TensorFlow Lite for Microcontrollers, and it does not use WebAssembly or human voice.',
      'The sounds are synthetic: with real words you would need a dataset like Speech Commands, a convolutional network trained on it and quantisation.',
      'It is a simulation, with no hardware or prototype.',
    ],
    next: [
      'Train with a set of real words and compare against the softmax classifier.',
      'Quantise to 8 bits and estimate memory size and inference time on a microcontroller.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'De la onda a la decisión', en: 'From wave to decision' },
      caption: {
        es: 'El front-end (hasta las MFCC) es el del informe; el clasificador es propio y se entrena en la página. El ruido que se agrega al audio es lo que degrada la exactitud.',
        en: 'The front-end (up to the MFCCs) is the report’s; the classifier is my own and is trained on the page. The noise added to the audio is what degrades accuracy.',
      },
      nodes: [
        { id: 'aud', label: 'Audio', sub: '16 kHz · 1 s', col: 0, row: 0, tone: 'emerald' },
        { id: 'mf', label: 'MFCC', sub: '49 × 10', col: 1, row: 0, tone: 'magenta' },
        { id: 'car', label: { es: 'Características', en: 'Features' }, sub: { es: '32 por sonido', en: '32 per sound' }, col: 2, row: 0 },
        { id: 'cla', label: { es: 'Clasificador', en: 'Classifier' }, sub: { es: 'softmax · 6 clases', en: 'softmax · 6 classes' }, col: 3, row: 0, tone: 'amber' },
        { id: 'rui', label: { es: 'Ruido', en: 'Noise' }, sub: { es: 'relación señal/ruido', en: 'signal-to-noise' }, col: 0, row: 1, tone: 'amber' },
      ],
      edges: [
        { from: 'aud', to: 'mf' },
        { from: 'mf', to: 'car', label: { es: 'resumen', en: 'summary' } },
        { from: 'car', to: 'cla' },
        { from: 'rui', to: 'aud', label: { es: 'se suma', en: 'added' }, tone: 'amber' },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Exactitud frente al ruido', en: 'Accuracy against noise' },
      caption: {
        es: 'Medida con 120 sonidos nuevos (sintéticos). A 0 dB el ruido iguala a la señal y la exactitud cae.',
        en: 'Measured with 120 new (synthetic) sounds. At 0 dB the noise equals the signal and accuracy falls.',
      },
      rows: [
        {
          label: { es: 'Exactitud según la relación señal/ruido (%)', en: 'Accuracy by signal-to-noise ratio (%)' },
          items: [
            { label: '20 dB', value: 100, text: '100 %', tone: 'emerald' },
            { label: '5 dB', value: 100, text: '100 %', tone: 'emerald' },
            { label: '0 dB', value: 77, text: '77 %', tone: 'amber' },
          ],
        },
      ],
    },
  ],
}
