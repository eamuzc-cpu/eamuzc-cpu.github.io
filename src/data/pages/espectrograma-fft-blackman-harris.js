export default {
  status: { es: 'Simulado: señales sintéticas, FFT propia (sin micrófono)', en: 'Simulated: synthetic signals, own FFT (no microphone)' },
  related: ['vibracion-predictivo', 'comandos-de-voz-mfcc', 'sintonizador-bode-nyquist'],
  es: {
    lead: 'Una transformada de Fourier de tiempo corto (N = 2048, solape de 75 %) con una FFT radix-2 propia y ventana Blackman-Harris. Se eligen señales sintéticas, se comparan ventanas y, al pasar el ratón por el espectrograma, se ve el espectro de esa trama.',
    context: [
      'La fuga espectral de una ventana mala esconde las señales débiles junto a las fuertes. Para medir bien hay que conocer la ventana, la resolución y su rango dinámico, y que la FFT sea correcta.',
      'Este proyecto deja ver, con números, qué aporta cada ventana y qué resolución en frecuencia y en tiempo se obtiene con cada frecuencia de muestreo.',
    ],
    how: [
      { t: 'Señales sintéticas', d: 'Se generan señales conocidas: dos tonos y uno débil de −66 dB, un chirp de 100 Hz a 8 kHz, un chirp con una ráfaga de ruido, una voz sintética con tres formantes y ruido blanco con un tono de 1 kHz.' },
      { t: 'Tramas con solape', d: 'La señal se parte en tramas de 2048 muestras, avanzando de 512 en 512 (solape de 75 %).' },
      { t: 'Ventana', d: 'Cada trama se multiplica por una ventana (Blackman-Harris, Hann o rectangular) para reducir la fuga espectral en los bordes.' },
      { t: 'FFT radix-2 propia', d: 'Una FFT de Cooley-Tukey en sitio, escrita desde cero, calcula el espectro de cada trama.' },
      { t: 'Espectro y pico', d: 'La magnitud se expresa en dBFS, y el pico de un tono se estima con interpolación parabólica para obtener su frecuencia con un error menor a 3 Hz.' },
      { t: 'Espectrograma en cascada', d: 'Las tramas sucesivas se apilan como imagen en Canvas 2D, con un mapa de color (viridis o magma) y un rango dinámico ajustable. Al pasar el ratón, se muestra el espectro de esa trama.' },
    ],
    concepts: [
      { t: 'STFT', d: 'Transformada de Fourier de tiempo corto: una FFT sobre tramas sucesivas, que permite ver cómo cambia el espectro en el tiempo.' },
      { t: 'Fuga espectral', d: 'Un tono que no cae justo en un bin de la FFT se «derrama» sobre bins vecinos. La ventana controla cuánto y con qué rapidez decae.' },
      { t: 'Ventana Blackman-Harris', d: 'Ventana de lóbulos laterales muy bajos (por debajo de −90 dB), a cambio de un lóbulo principal más ancho que el de la rectangular.' },
      { t: 'Resolución en frecuencia', d: 'La separación entre bins: fs/N. Con 48 kHz y N = 2048 son 23,44 Hz; con 44,1 kHz son 21,53 Hz.' },
      { t: 'dBFS', d: 'Decibeles respecto de la escala completa: 0 dBFS es el nivel de un tono de amplitud máxima.' },
    ],
    decisions: [
      { t: 'Comparar ventanas en la misma señal', d: 'Con «Dos tonos y uno débil (−66 dB)» se ve que la ventana rectangular tapa el tono débil y Blackman-Harris lo deja ver.' },
      { t: 'FFT escrita a mano y verificada', d: 'Se verificó contra la DFT directa a 1e-9, con el teorema de Parseval y con el nivel de 0 dBFS de un tono centrado en un bin.' },
      { t: 'Distinguir las frecuencias de muestreo', d: 'El informe da una resolución de 23,4 Hz (que corresponde a 48 kHz) con un paso de 11,6 ms (que corresponde a 44,1 kHz): son frecuencias distintas. Aquí se muestran ambas.' },
      { t: 'Canvas 2D sin WebGL', d: '465 FFT de 2048 puntos se calculan en unos 70 ms, así que no hace falta GPU ni Web Audio.' },
    ],
    tour: [
      'En «Señal» elige «Dos tonos y uno débil (−66 dB)» y en «Ventana» alterna entre Rectangular y Blackman-Harris: con la rectangular el tono débil desaparece.',
      'Elige «Chirp 100 Hz → 8 kHz» y mira cómo la frecuencia sube en el espectrograma; pasa el ratón para ver el espectro de una trama.',
      'Cambia «fs» entre 48 kHz y 44,1 kHz y compara la resolución en frecuencia y el paso en tiempo.',
      'Prueba «Voz sintética (3 formantes)» y «Chirp + ráfaga de ruido».',
      'Ajusta el «Rango dinámico» y la «Frecuencia máx.», y cambia el «Mapa» de colores (viridis o magma).',
      'Pulsa «Reproducir» para animar el espectrograma.',
    ],
    verified: [
      'FFT verificada contra la DFT directa a 1e-9, con el teorema de Parseval y con el nivel de 0 dBFS de un tono centrado en un bin.',
      'Con los coeficientes de Blackman-Harris del informe, todo lo que está a más de 5 bins de un tono queda por debajo de −90 dB; un tono 66 dB más débil a 20 bins se distingue con esa ventana y queda tapado con la rectangular.',
      '465 FFT de 2048 puntos en unos 70 ms; error del pico < 3 Hz; 13 pruebas automáticas.',
    ],
    limits: [
      'No usa micrófono, Web Audio ni WebGL2: las señales son sintéticas y el espectrograma se dibuja en Canvas 2D.',
      'La resolución y el rango dinámico dependen de las ventanas y de N elegidos aquí; no se pretende reemplazar un analizador de espectro de laboratorio.',
      'Es una simulación, sin hardware ni prototipo.',
    ],
    next: [
      'Agregar entrada de micrófono con Web Audio para analizar audio real.',
      'Incluir más ventanas (Kaiser, flat-top) y comparar su ancho de lóbulo principal.',
    ],
  },
  en: {
    lead: 'A short-time Fourier transform (N = 2048, 75 % overlap) with an own radix-2 FFT and a Blackman-Harris window. Synthetic signals are chosen, windows are compared and, when hovering over the spectrogram, that frame’s spectrum is shown.',
    context: [
      'Spectral leakage from a poor window hides weak signals next to strong ones. To measure well you must know the window, the resolution and its dynamic range, and the FFT must be correct.',
      'This project shows, with numbers, what each window contributes and what frequency and time resolution you get with each sampling rate.',
    ],
    how: [
      { t: 'Synthetic signals', d: 'Known signals are generated: two tones and a weak one at −66 dB, a chirp from 100 Hz to 8 kHz, a chirp with a noise burst, a synthetic voice with three formants and white noise with a 1 kHz tone.' },
      { t: 'Overlapping frames', d: 'The signal is split into frames of 2048 samples, advancing by 512 (75 % overlap).' },
      { t: 'Window', d: 'Each frame is multiplied by a window (Blackman-Harris, Hann or rectangular) to reduce spectral leakage at the edges.' },
      { t: 'Own radix-2 FFT', d: 'An in-place Cooley-Tukey FFT, written from scratch, computes each frame’s spectrum.' },
      { t: 'Spectrum and peak', d: 'Magnitude is expressed in dBFS, and a tone’s peak is estimated with parabolic interpolation to get its frequency within less than 3 Hz.' },
      { t: 'Waterfall spectrogram', d: 'Successive frames are stacked as an image on Canvas 2D, with a colour map (viridis or magma) and an adjustable dynamic range. Hovering shows that frame’s spectrum.' },
    ],
    concepts: [
      { t: 'STFT', d: 'Short-time Fourier transform: an FFT over successive frames, which lets you see how the spectrum changes over time.' },
      { t: 'Spectral leakage', d: 'A tone that does not fall exactly on an FFT bin "spills" over neighbouring bins. The window controls how much and how fast it decays.' },
      { t: 'Blackman-Harris window', d: 'A very-low-sidelobe window (below −90 dB), in exchange for a wider main lobe than the rectangular one.' },
      { t: 'Frequency resolution', d: 'The spacing between bins: fs/N. With 48 kHz and N = 2048 it is 23.44 Hz; with 44.1 kHz it is 21.53 Hz.' },
      { t: 'dBFS', d: 'Decibels relative to full scale: 0 dBFS is the level of a maximum-amplitude tone.' },
    ],
    decisions: [
      { t: 'Compare windows on the same signal', d: 'With "Dos tonos y uno débil (−66 dB)" the rectangular window hides the weak tone and Blackman-Harris lets it show.' },
      { t: 'A handwritten, verified FFT', d: 'It was verified against the direct DFT to 1e-9, with Parseval’s theorem and with the 0 dBFS level of a tone centred on a bin.' },
      { t: 'Tell the sampling rates apart', d: 'The report gives a resolution of 23.4 Hz (which corresponds to 48 kHz) with a step of 11.6 ms (which corresponds to 44.1 kHz): they are different rates. Both are shown here.' },
      { t: 'Canvas 2D without WebGL', d: '465 FFTs of 2048 points take about 70 ms, so no GPU or Web Audio is needed.' },
    ],
    tour: [
      'Under "Señal" (signal) pick "Dos tonos y uno débil (−66 dB)" and under "Ventana" (window) switch between Rectangular and Blackman-Harris: with the rectangular one the weak tone disappears.',
      'Pick "Chirp 100 Hz → 8 kHz" and watch the frequency rise in the spectrogram; hover to see a frame’s spectrum.',
      'Switch "fs" between 48 kHz and 44.1 kHz and compare frequency resolution and time step.',
      'Try "Voz sintética (3 formantes)" and "Chirp + ráfaga de ruido".',
      'Adjust the "Rango dinámico" (dynamic range) and "Frecuencia máx." (max frequency), and change the colour "Mapa" (viridis or magma).',
      'Press "Reproducir" (play) to animate the spectrogram.',
    ],
    verified: [
      'FFT verified against the direct DFT to 1e-9, with Parseval’s theorem and with the 0 dBFS level of a tone centred on a bin.',
      'With the report’s Blackman-Harris coefficients, everything more than 5 bins away from a tone falls below −90 dB; a tone 66 dB weaker at 20 bins is distinguishable with that window and hidden with the rectangular one.',
      '465 FFTs of 2048 points in about 70 ms; peak error < 3 Hz; 13 automated tests.',
    ],
    limits: [
      'It does not use a microphone, Web Audio or WebGL2: the signals are synthetic and the spectrogram is drawn on Canvas 2D.',
      'Resolution and dynamic range depend on the windows and N chosen here; it does not aim to replace a lab spectrum analyser.',
      'It is a simulation, with no hardware or prototype.',
    ],
    next: [
      'Add microphone input with Web Audio to analyse real audio.',
      'Include more windows (Kaiser, flat-top) and compare their main-lobe width.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'De la señal al espectrograma', en: 'From signal to spectrogram' },
      caption: {
        es: 'Cada trama pasa por la ventana y la FFT; las tramas sucesivas forman el espectrograma. Cambiar la ventana y volver a mirar es la forma de comparar fuga espectral.',
        en: 'Each frame goes through the window and the FFT; successive frames form the spectrogram. Changing the window and looking again is how spectral leakage is compared.',
      },
      nodes: [
        { id: 'sig', label: { es: 'Señal', en: 'Signal' }, sub: { es: 'sintética', en: 'synthetic' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'ven', label: { es: 'Ventana', en: 'Window' }, sub: 'Blackman-Harris', col: 1, row: 0, tone: 'amber' },
        { id: 'fft', label: 'FFT', sub: 'radix-2 · N = 2048', col: 2, row: 0, tone: 'magenta' },
        { id: 'esp', label: { es: 'Espectrograma', en: 'Spectrogram' }, sub: 'dBFS · hop 512', col: 3, row: 0 },
      ],
      edges: [
        { from: 'sig', to: 'ven', label: { es: 'trama', en: 'frame' } },
        { from: 'ven', to: 'fft' },
        { from: 'fft', to: 'esp', label: '|X|' },
        { from: 'esp', to: 'ven', loop: true, dashed: true, label: { es: 'comparar ventanas', en: 'compare windows' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Resolución según la frecuencia de muestreo', en: 'Resolution by sampling rate' },
      caption: {
        es: 'Con N = 2048 y un paso de 512 muestras. El informe mezclaba la resolución de una frecuencia con el paso de la otra.',
        en: 'With N = 2048 and a 512-sample hop. The report mixed one rate’s resolution with the other’s step.',
      },
      rows: [
        {
          label: { es: 'Resolución en frecuencia (Hz)', en: 'Frequency resolution (Hz)' },
          items: [
            { label: '48 kHz', value: 23.44, text: '23,44 Hz', tone: 'cyan' },
            { label: '44,1 kHz', value: 21.53, text: '21,53 Hz', tone: 'amber' },
          ],
        },
        {
          label: { es: 'Paso entre tramas (ms)', en: 'Hop between frames (ms)' },
          items: [
            { label: '48 kHz', value: 10.67, text: '10,67 ms', tone: 'cyan' },
            { label: '44,1 kHz', value: 11.61, text: '11,61 ms', tone: 'amber' },
          ],
        },
      ],
    },
  ],
}
