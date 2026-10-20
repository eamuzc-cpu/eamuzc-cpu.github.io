export default {
  status: { es: 'Simulado: IMU sintética (sin hardware ni broker)', en: 'Simulated: synthetic IMU (no hardware or broker)' },
  related: ['red-sensores-mqtt', 'monitor-energia-esp32', 'comandos-de-voz-mfcc'],
  es: {
    lead: 'Una placa con IMU se mueve y su gemelo estima la actitud (pitch y roll) con un filtro complementario y la temperatura con un modelo térmico RC. Cada muestra se codifica como un mensaje binario tipo Protocol Buffers de 21 bytes frente a 126 del JSON equivalente.',
    context: [
      'El giroscopio deriva y el acelerómetro es ruidoso y se confunde con las vibraciones. Además, enviar telemetría a 50 Hz en texto desperdicia ancho de banda.',
      'El gemelo muestra por qué se mezclan los dos sensores, cuánto cuesta el sesgo del giroscopio y cuánto ahorra una codificación binaria.',
    ],
    how: [
      { t: 'Una IMU sintética', d: 'Se simula una placa que se mueve (balanceo suave, giro rápido, vuelco brusco o quieta inclinada) y se generan las lecturas de acelerómetro y giroscopio, con ruido y sesgo configurables.' },
      { t: 'Filtro complementario', d: 'La actitud se estima como θ = α(θ + ω·dt) + (1 − α)·θ_acel, con α = 0,98 a 50 Hz. Confía en el giroscopio a corto plazo y en el acelerómetro a largo plazo; la constante de tiempo es 0,98 s.' },
      { t: 'Modelo térmico RC', d: 'La temperatura sigue T = T_amb + P·Rth·(1 − e^(−t/τ)), con Rth = 45,2 K/W y Cth = 0,12 J/K (τ = 5,42 s), según el perfil de potencia que disipa la placa.' },
      { t: 'Telemetría binaria', d: 'Cada muestra se codifica con un formato tipo Protocol Buffers: números enteros de longitud variable (varint) y con signo comprimido (zigzag). El mensaje ocupa 21 bytes; el JSON equivalente, 126.' },
      { t: 'La placa en isométrico', d: 'La placa se dibuja en perspectiva isométrica en Canvas 2D: sólida con la actitud estimada, punteada con la verdadera.' },
    ],
    concepts: [
      { t: 'IMU', d: 'Unidad de medición inercial: acelerómetro y giroscopio (y a veces magnetómetro) en un mismo chip.' },
      { t: 'Filtro complementario', d: 'Mezcla un estimador bueno a corto plazo (giroscopio integrado, que deriva) con uno bueno a largo plazo (acelerómetro, ruidoso) para obtener lo mejor de cada uno.' },
      { t: 'Sesgo del giroscopio', d: 'Un error constante en la velocidad angular que, al integrarse, genera una deriva creciente en el ángulo.' },
      { t: 'Varint y zigzag', d: 'Un varint usa menos bytes para números pequeños; zigzag convierte enteros con signo en positivos pequeños para que también sean cortos. Así 150 se codifica como 0x96 0x01.' },
      { t: 'Gemelo digital', d: 'Un modelo que sigue en paralelo a un objeto real y permite estimar lo que no se mide directamente.' },
    ],
    decisions: [
      { t: 'Mezclar sensores en lugar de elegir uno', d: 'Ninguno de los dos sirve solo: el giroscopio deriva y el acelerómetro se confunde con las vibraciones. El complementario usa cada uno donde es bueno.' },
      { t: 'Codificar a mano', d: 'Escribir el varint y el zigzag permite entender exactamente qué ocupa cada byte del mensaje.' },
      { t: 'Dibujar la estimada y la verdadera', d: 'Ver ambas a la vez hace visible el error del estimador en lugar de solo medirlo.' },
      { t: 'Declarar que es sintético', d: 'No hay Three.js, modelos GLTF, broker WebSocket/MQTT ni hardware: la IMU es sintética y los niveles de ruido y el perfil de potencia son míos.' },
    ],
    tour: [
      'En «Movimiento» elige «Balanceo suave» y mira la placa: sólida es la actitud estimada, punteada la verdadera.',
      'Prueba «Giro rápido» y «Vuelco brusco (escalón)» y mira la gráfica «Pitch: estimadores frente al verdadero»; el error RMS es ≈ 0,83° con el complementario, 2,9° con el acelerómetro solo y 22° con el giroscopio solo.',
      'Mueve «α del filtro», «Sesgo del giroscopio» y «Ruido del acelerómetro» y mira cómo cambia cada estimador.',
      'Marca «vibración de 17 Hz (20–30 s)» para ver que el acelerómetro se confunde con la vibración.',
      'En «Potencia» cambia entre el «Perfil del nodo», «Constante 0,3 W» y «Constante 1,2 W» y mira la «Temperatura de la placa y potencia disipada».',
      'Mira «Telemetría de la muestra actual»: 21 bytes frente a 126 de JSON.',
    ],
    verified: [
      'Con los valores por defecto el error RMS de pitch es 0,83° con el complementario, 2,9° con el acelerómetro solo y 22° con el giroscopio solo.',
      'El mensaje de 21 bytes ocupa el 17 % del JSON y a 50 Hz ahorra unos 5 kB/s.',
      '12 pruebas: la constante de tiempo exacta, el error por sesgo b·τ, la reducción de ruido unas 10 veces, la solución térmica a 0,3 % y el codificador de varint y zigzag (150 → 0x96 0x01).',
    ],
    limits: [
      'La IMU es sintética; no hay Three.js, modelos GLTF, broker WebSocket/MQTT ni hardware.',
      'Los niveles de ruido y el perfil de potencia son elecciones propias.',
      'Es una simulación, sin hardware ni prototipo.',
    ],
    next: [
      'Probar el filtro con datos de una IMU real, grabados desde un microcontrolador.',
      'Enviar los mensajes binarios por MQTT al broker del proyecto de red de sensores.',
    ],
  },
  en: {
    lead: 'A board with an IMU moves and its twin estimates attitude (pitch and roll) with a complementary filter and temperature with an RC thermal model. Each sample is encoded as a 21-byte Protocol-Buffers-style binary message versus 126 for the equivalent JSON.',
    context: [
      'The gyroscope drifts and the accelerometer is noisy and gets confused by vibration. Also, sending telemetry at 50 Hz as text wastes bandwidth.',
      'The twin shows why the two sensors are mixed, how much the gyro bias costs and how much a binary encoding saves.',
    ],
    how: [
      { t: 'A synthetic IMU', d: 'A moving board is simulated (gentle rocking, fast turn, sudden tip-over or resting tilted) and accelerometer and gyroscope readings are generated, with configurable noise and bias.' },
      { t: 'Complementary filter', d: 'Attitude is estimated as θ = α(θ + ω·dt) + (1 − α)·θ_acc, with α = 0.98 at 50 Hz. It trusts the gyroscope in the short term and the accelerometer in the long term; the time constant is 0.98 s.' },
      { t: 'RC thermal model', d: 'Temperature follows T = T_amb + P·Rth·(1 − e^(−t/τ)), with Rth = 45.2 K/W and Cth = 0.12 J/K (τ = 5.42 s), according to the power profile the board dissipates.' },
      { t: 'Binary telemetry', d: 'Each sample is encoded with a Protocol-Buffers-like format: variable-length integers (varint) and compressed signed values (zigzag). The message takes 21 bytes; the equivalent JSON, 126.' },
      { t: 'The board in isometric', d: 'The board is drawn in isometric perspective on Canvas 2D: solid with the estimated attitude, dotted with the true one.' },
    ],
    concepts: [
      { t: 'IMU', d: 'Inertial measurement unit: accelerometer and gyroscope (and sometimes magnetometer) on one chip.' },
      { t: 'Complementary filter', d: 'It mixes an estimator good in the short term (integrated gyro, which drifts) with one good in the long term (accelerometer, noisy) to get the best of each.' },
      { t: 'Gyro bias', d: 'A constant error in angular velocity that, once integrated, creates a growing drift in the angle.' },
      { t: 'Varint and zigzag', d: 'A varint uses fewer bytes for small numbers; zigzag turns signed integers into small positive ones so they are short too. That is how 150 is encoded as 0x96 0x01.' },
      { t: 'Digital twin', d: 'A model that tracks a real object in parallel and lets you estimate what is not measured directly.' },
    ],
    decisions: [
      { t: 'Mix sensors instead of choosing one', d: 'Neither works alone: the gyro drifts and the accelerometer is confused by vibration. The complementary filter uses each where it is good.' },
      { t: 'Encode by hand', d: 'Writing the varint and the zigzag lets you understand exactly what each byte of the message holds.' },
      { t: 'Draw the estimated and the true', d: 'Seeing both at once makes the estimator’s error visible instead of only measuring it.' },
      { t: 'State that it is synthetic', d: 'There is no Three.js, GLTF models, WebSocket/MQTT broker or hardware: the IMU is synthetic and the noise levels and power profile are my own.' },
    ],
    tour: [
      'Under "Movimiento" (motion) choose "Balanceo suave" (gentle rocking) and watch the board: solid is the estimated attitude, dotted the true one.',
      'Try "Giro rápido" and "Vuelco brusco (escalón)" and look at the "Pitch: estimadores frente al verdadero" chart; the RMS error is ≈ 0.83° with the complementary filter, 2.9° with the accelerometer alone and 22° with the gyro alone.',
      'Move "α del filtro", "Sesgo del giroscopio" (gyro bias) and "Ruido del acelerómetro" (accelerometer noise) and see how each estimator changes.',
      'Tick "vibración de 17 Hz (20–30 s)" (17 Hz vibration) to see the accelerometer get confused by the vibration.',
      'Under "Potencia" (power) switch between the "Perfil del nodo", "Constante 0,3 W" and "Constante 1,2 W" and watch the "Temperatura de la placa y potencia disipada".',
      'Look at "Telemetría de la muestra actual": 21 bytes against 126 of JSON.',
    ],
    verified: [
      'With the default values the RMS pitch error is 0.83° with the complementary filter, 2.9° with the accelerometer alone and 22° with the gyro alone.',
      'The 21-byte message takes 17 % of the JSON and at 50 Hz saves about 5 kB/s.',
      '12 tests: the exact time constant, the bias error b·τ, noise reduction of about 10 times, the thermal solution to 0.3 % and the varint and zigzag encoder (150 → 0x96 0x01).',
    ],
    limits: [
      'The IMU is synthetic; there is no Three.js, GLTF models, WebSocket/MQTT broker or hardware.',
      'The noise levels and the power profile are my own choices.',
      'It is a simulation, with no hardware or prototype.',
    ],
    next: [
      'Test the filter with data from a real IMU, recorded from a microcontroller.',
      'Send the binary messages over MQTT to the sensor-network project’s broker.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'De la IMU al mensaje de 21 bytes', en: 'From IMU to the 21-byte message' },
      caption: {
        es: 'El filtro estima la actitud mezclando acelerómetro y giroscopio; el modelo térmico estima la temperatura a partir de la potencia. Ambos terminan en un único mensaje binario por muestra.',
        en: 'The filter estimates attitude by mixing accelerometer and gyroscope; the thermal model estimates temperature from power. Both end up in a single binary message per sample.',
      },
      nodes: [
        { id: 'imu', label: 'IMU', sub: { es: 'acelerómetro + giroscopio', en: 'accelerometer + gyro' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'fil', label: { es: 'Filtro', en: 'Filter' }, sub: 'α = 0,98', col: 1, row: 0, tone: 'magenta' },
        { id: 'ter', label: { es: 'Modelo térmico', en: 'Thermal model' }, sub: 'Rth · Cth', col: 2, row: 0, tone: 'amber' },
        { id: 'tel', label: { es: 'Telemetría', en: 'Telemetry' }, sub: { es: '21 bytes · 50 Hz', en: '21 bytes · 50 Hz' }, col: 3, row: 0 },
      ],
      edges: [
        { from: 'imu', to: 'fil', label: 'a, ω' },
        { from: 'fil', to: 'ter', label: 'pitch' },
        { from: 'ter', to: 'tel' },
        { from: 'tel', to: 'imu', loop: true, dashed: true, label: { es: 'siguiente muestra', en: 'next sample' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Qué estimador acierta más', en: 'Which estimator is most accurate' },
      caption: {
        es: 'Con los valores por defecto. El filtro complementario supera a cada sensor por separado; la codificación binaria encoge cada muestra seis veces.',
        en: 'With the default values. The complementary filter beats each sensor on its own; binary encoding shrinks each sample six times.',
      },
      rows: [
        {
          label: { es: 'Error RMS del pitch (°)', en: 'RMS pitch error (°)' },
          items: [
            { label: { es: 'Filtro complementario', en: 'Complementary filter' }, value: 0.83, text: '0,83°', tone: 'emerald' },
            { label: { es: 'Acelerómetro solo', en: 'Accelerometer alone' }, value: 2.9, text: '2,9°', tone: 'amber' },
            { label: { es: 'Giroscopio solo', en: 'Gyro alone' }, value: 22, text: '22°', tone: 'magenta' },
          ],
        },
        {
          label: { es: 'Tamaño de cada muestra (bytes)', en: 'Size of each sample (bytes)' },
          items: [
            { label: { es: 'Binario tipo protobuf', en: 'Protobuf-style binary' }, value: 21, text: '21 B', tone: 'emerald' },
            { label: 'JSON', value: 126, text: '126 B', tone: 'magenta' },
          ],
        },
      ],
    },
  ],
}
