export default {
  status: { es: 'Simulado: motor de 5,5 kW y variador modelados', en: 'Simulated: modelled 5.5 kW motor and drive' },
  related: ['calculadora-conductores-protecciones', 'tablero-electrico', 'simulador-convertidor-dcdc'],
  es: {
    lead: 'Un simulador de variador de frecuencia con control escalar V/f sobre un motor de inducción de 5,5 kW: rampas, boost, cargas de par constante o cuadrática con inercia, curva par–velocidad en vivo, bus de continua con regeneración y fallas con enclavamiento.',
    context: [
      'Un variador no solo cambia la velocidad. A baja frecuencia el motor pierde flujo y par; al frenar una carga con inercia el motor regenera energía y puede sobrecargar el bus de continua; y una sobrecarga mantenida lo calienta aunque la corriente parezca «normal».',
      'En una línea de envasado o de extrusión, un paro por sobretensión (F-OV) o por sobrecarga (F-OL) detiene la producción. Saber por qué ocurre y qué parámetro lo evita es la diferencia entre reiniciar a ciegas y resolver la causa.',
    ],
    how: [
      { t: 'El motor', d: 'Un motor de 5,5 kW, 380 V, 4 polos, con par proporcional al deslizamiento y al flujo al cuadrado, y un par máximo de 2,5 veces el nominal. Marcha en vacío a 1500 rpm y con carga nominal a 1450 rpm.' },
      { t: 'Control V/f', d: 'La tensión se aumenta junto con la frecuencia para mantener el flujo. A baja frecuencia, la caída en el estator reduce el flujo; el «boost» compensa parte de eso.' },
      { t: 'Rampas', d: 'La frecuencia sube y baja de forma lineal con tiempos de aceleración y desaceleración ajustables.' },
      { t: 'Corriente y memoria térmica', d: 'La corriente es magnetizante más corriente de par. Una memoria térmica acumula el calentamiento: 150 % de corriente durante 60 s dispara la sobrecarga F-OL.' },
      { t: 'Bus de continua', d: 'El bus almacena energía. Cuando se frena una carga con inercia, el motor se vuelve generador y la devuelve al bus, que sube de tensión.' },
      { t: 'Resistencia de frenado', d: 'Si el bus supera un umbral, la resistencia de frenado disipa la energía en forma de calor y limita la tensión.' },
      { t: 'Fallas con enclavamiento', d: 'Sobrecorriente, sobrecarga térmica, sobretensión y subtensión disparan una falla que queda enclavada hasta reiniciar con el bus y el motor en condiciones.' },
    ],
    concepts: [
      { t: 'Control escalar V/f', d: 'Método simple que mantiene la relación tensión/frecuencia constante para conservar el flujo del motor. No controla el par directamente, pero es suficiente para bombas, ventiladores y cintas.' },
      { t: 'Deslizamiento', d: 'Diferencia entre la velocidad del campo giratorio y la del eje. Sin él no hay par; por eso a 1500 rpm sin carga y 1450 rpm con carga nominal.' },
      { t: 'Regeneración', d: 'Cuando la carga empuja al motor más rápido que el campo, el motor genera y devuelve energía al bus del variador.' },
      { t: 'Leyes de afinidad', d: 'En ventiladores y bombas, la potencia crece con el cubo de la velocidad: a la mitad de la velocidad, la potencia es del orden de un octavo.' },
      { t: 'Hueco de red', d: 'Caída momentánea de la tensión de alimentación. El bus del variador puede sostener la carga unos instantes con la energía almacenada.' },
    ],
    decisions: [
      { t: 'Modelar el bus de continua', d: 'Sin el bus, no se vería la regeneración ni las fallas de sobretensión y subtensión, que son las más frecuentes en un variador.' },
      { t: 'Probar con balance de energía', d: 'Que la energía que entra, la que sale, la almacenada y la perdida cuadren (error menor a 2 %) da confianza de que el modelo no «inventa» energía.' },
      { t: 'Escenarios guiados', d: 'Seis escenarios llevan a las situaciones que enseñan algo: arranque con carga, frenado con inercia, hueco de red, sobrecarga y otros.' },
      { t: 'Mostrar el par contra la carga', d: 'La curva par–velocidad del motor contra la de la carga, en tiempo real, hace visible por qué el motor acelera, se estabiliza o se cala.' },
    ],
    tour: [
      'Pulsa «▶ Adelante» con carga ligera y observa cómo el motor llega a 1500 rpm; con la carga nominal, a 1450 rpm.',
      'Cambia el tipo de carga entre «Par constante (correa)» y «Cuadrática (ventilador)» y mira cómo cambia la potencia: un ventilador a media velocidad consume ≈ 13,5 % de la potencia.',
      'Aumenta la «Inercia de la carga» a 1,5 kg·m² y baja la «Desaceleración» a 3 s: el bus sube a ≈ 815 V y salta F-OV; con la resistencia de frenado queda en ≈ 750 V.',
      'Pulsa «Hueco de red 0,3 s» y «Hueco de red 2 s» sin carga y con carga nominal, y observa cuándo salta F-UV.',
      'Sube la carga más allá del 150 % y espera a que salte F-OL; reinicia con «↺ Reiniciar falla».',
      'Prueba los botones de «Escenarios» para recorrer las situaciones guiadas.',
    ],
    verified: [
      'Pruebas: 1500 rpm sin carga y 1450 rpm con carga nominal (corriente y par nominales); rampa lineal.',
      'Un ventilador a la mitad de velocidad consume 13,5 % de la potencia (≈ 1/8); balance de energía con error menor a 2 %.',
      'Sobrecarga del 150 % dispara F-OL a los 58 s; con 1,5 kg·m² de inercia y rampa de 3 s el bus llega a 815 V (F-OV) y con resistencia de frenado queda en 750 V.',
      'Un hueco de red de 0,3 s lo aguanta el bus sin carga y dispara F-UV con carga nominal. 17 pruebas automáticas.',
    ],
    limits: [
      'Es un modelo simplificado de variador y motor: no incluye saturación magnética, armónicos ni efectos de la longitud del cable.',
      'El control es escalar, no vectorial: no controla el par en forma directa.',
      'Los valores del motor y las protecciones son los del modelo; un variador real se configura con los datos de su placa y de su manual.',
    ],
    next: [
      'Agregar control vectorial sin sensor para comparar el par a baja velocidad.',
      'Conectar con la calculadora de conductores para dimensionar la alimentación del variador.',
    ],
  },
  en: {
    lead: 'A variable-frequency-drive simulator with scalar V/f control on a 5.5 kW induction motor: ramps, boost, constant-torque or quadratic loads with inertia, a live torque–speed curve, a DC bus with regeneration and faults with latching.',
    context: [
      'A drive does not only change speed. At low frequency the motor loses flux and torque; when braking a load with inertia the motor regenerates energy and can overload the DC bus; and a sustained overload heats it even when the current looks "normal".',
      'In a packaging or extrusion line, an overvoltage (F-OV) or overload (F-OL) trip stops production. Knowing why it happens and which parameter prevents it is the difference between restarting blindly and fixing the cause.',
    ],
    how: [
      { t: 'The motor', d: 'A 5.5 kW, 380 V, 4-pole motor, with torque proportional to slip and to flux squared, and a maximum torque of 2.5 times nominal. It runs at 1500 rpm unloaded and 1450 rpm at nominal load.' },
      { t: 'V/f control', d: 'Voltage is raised together with frequency to keep the flux. At low frequency the stator drop reduces flux; the "boost" compensates part of that.' },
      { t: 'Ramps', d: 'Frequency rises and falls linearly with adjustable acceleration and deceleration times.' },
      { t: 'Current and thermal memory', d: 'Current is magnetising current plus torque current. A thermal memory accumulates heating: 150 % current for 60 s trips the F-OL overload.' },
      { t: 'DC bus', d: 'The bus stores energy. When braking a load with inertia, the motor becomes a generator and returns it to the bus, whose voltage rises.' },
      { t: 'Braking resistor', d: 'If the bus exceeds a threshold, the braking resistor dissipates the energy as heat and limits the voltage.' },
      { t: 'Latching faults', d: 'Overcurrent, thermal overload, overvoltage and undervoltage trigger a fault that stays latched until reset with the bus and motor in condition.' },
    ],
    concepts: [
      { t: 'Scalar V/f control', d: 'A simple method that keeps the voltage/frequency ratio constant to keep the motor’s flux. It does not control torque directly, but it is enough for pumps, fans and conveyors.' },
      { t: 'Slip', d: 'The difference between the rotating-field speed and the shaft speed. Without it there is no torque; hence 1500 rpm unloaded and 1450 rpm at nominal load.' },
      { t: 'Regeneration', d: 'When the load pushes the motor faster than the field, the motor generates and returns energy to the drive’s bus.' },
      { t: 'Affinity laws', d: 'In fans and pumps, power grows with the cube of speed: at half speed, power is around one eighth.' },
      { t: 'Voltage sag', d: 'A momentary drop in supply voltage. The drive’s bus can sustain the load for a few moments with the stored energy.' },
    ],
    decisions: [
      { t: 'Model the DC bus', d: 'Without the bus, you would not see regeneration or the overvoltage and undervoltage faults, which are the most common in a drive.' },
      { t: 'Test with an energy balance', d: 'That the energy in, out, stored and lost add up (error under 2 %) gives confidence the model does not "invent" energy.' },
      { t: 'Guided scenarios', d: 'Six scenarios lead to the situations that teach something: starting under load, braking with inertia, voltage sag, overload and others.' },
      { t: 'Show torque against the load', d: 'The motor’s torque–speed curve against the load’s, in real time, makes visible why the motor accelerates, settles or stalls.' },
    ],
    tour: [
      'Press "▶ Adelante" (forward) with a light load and watch the motor reach 1500 rpm; with the nominal load, 1450 rpm.',
      'Switch the load type between "Par constante (correa)" (constant torque, belt) and "Cuadrática (ventilador)" (quadratic, fan) and see how the power changes: a fan at half speed uses ≈ 13.5 % of the power.',
      'Raise the "Inercia de la carga" (load inertia) to 1.5 kg·m² and set "Desaceleración" (deceleration) to 3 s: the bus rises to ≈ 815 V and F-OV trips; with the braking resistor it stays at ≈ 750 V.',
      'Press "Hueco de red 0,3 s" and "Hueco de red 2 s" (voltage sag) with no load and with nominal load, and see when F-UV trips.',
      'Raise the load past 150 % and wait for F-OL to trip; reset with "↺ Reiniciar falla" (reset fault).',
      'Try the "Escenarios" (scenarios) buttons to walk through the guided situations.',
    ],
    verified: [
      'Tests: 1500 rpm unloaded and 1450 rpm at nominal load (nominal current and torque); linear ramp.',
      'A fan at half speed uses 13.5 % of the power (≈ 1/8); energy balance with error under 2 %.',
      'A 150 % overload trips F-OL at 58 s; with 1.5 kg·m² inertia and a 3 s ramp the bus reaches 815 V (F-OV) and with a braking resistor stays at 750 V.',
      'A 0.3 s voltage sag is ridden through by the bus with no load and trips F-UV at nominal load. 17 automated tests.',
    ],
    limits: [
      'It is a simplified model of drive and motor: it does not include magnetic saturation, harmonics or cable-length effects.',
      'Control is scalar, not vector: it does not control torque directly.',
      'The motor values and protections are the model’s; a real drive is configured with its nameplate and manual data.',
    ],
    next: [
      'Add sensorless vector control to compare low-speed torque.',
      'Connect with the conductors calculator to size the drive’s supply.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'De la referencia al bus', en: 'From reference to bus' },
      caption: {
        es: 'La frecuencia de referencia pasa por la curva V/f y alimenta al motor; el motor y la carga devuelven corriente y energía al bus. Los limitadores corrigen la referencia cuando una protección se acerca a su límite.',
        en: 'The reference frequency goes through the V/f curve and feeds the motor; the motor and load return current and energy to the bus. The limiters correct the reference when a protection nears its limit.',
      },
      nodes: [
        { id: 'ref', label: { es: 'Referencia', en: 'Reference' }, sub: { es: 'Hz · rampas', en: 'Hz · ramps' }, col: 0, row: 0 },
        { id: 'vf', label: 'V/f', sub: { es: 'boost · flujo', en: 'boost · flux' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'mot', label: { es: 'Motor y carga', en: 'Motor and load' }, sub: { es: 'par · inercia', en: 'torque · inertia' }, col: 2, row: 0, tone: 'emerald' },
        { id: 'bus', label: { es: 'Bus y protecciones', en: 'Bus and protections' }, sub: 'OC · OL · OV · UV', col: 3, row: 0, tone: 'amber' },
      ],
      edges: [
        { from: 'ref', to: 'vf' },
        { from: 'vf', to: 'mot', label: 'V, f' },
        { from: 'mot', to: 'bus', label: 'I, W' },
        { from: 'bus', to: 'ref', loopTop: true, dashed: true, label: { es: 'limitadores', en: 'limiters' } },
      ],
    },
    {
      kind: 'graph',
      placement: 'decisions',
      title: { es: 'Qué pasa al frenar una carga con inercia', en: 'What happens when braking a high-inertia load' },
      caption: {
        es: 'La energía de la carga vuelve al bus: sin resistencia de frenado, la tensión sube hasta disparar F-OV; con resistencia, se disipa como calor y la tensión queda acotada.',
        en: 'The load’s energy returns to the bus: without a braking resistor, voltage rises until F-OV trips; with a resistor it is dissipated as heat and the voltage stays bounded.',
      },
      nodes: [
        { id: 'car', label: { es: 'Carga con inercia', en: 'Load with inertia' }, sub: { es: 'frena', en: 'decelerates' }, col: 0, row: 0 },
        { id: 'gen', label: { es: 'Motor generador', en: 'Motor as generator' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'bus', label: { es: 'Bus de continua', en: 'DC bus' }, sub: { es: 'la tensión sube', en: 'voltage rises' }, col: 2, row: 0, tone: 'amber' },
        { id: 'res', label: { es: 'Resistencia de frenado', en: 'Braking resistor' }, sub: { es: 'disipa calor', en: 'dissipates heat' }, col: 3, row: 0, tone: 'emerald' },
        { id: 'ov', label: { es: 'Falla F-OV', en: 'Fault F-OV' }, sub: { es: 'sin resistencia', en: 'no resistor' }, col: 2, row: 1, tone: 'magenta' },
      ],
      edges: [
        { from: 'car', to: 'gen', label: 'W' },
        { from: 'gen', to: 'bus', label: 'W' },
        { from: 'bus', to: 'res', label: { es: 'con freno', en: 'braking' } },
        { from: 'bus', to: 'ov', label: { es: 'si supera el límite', en: 'if limit exceeded' }, tone: 'magenta' },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Tensión del bus al frenar una carga con inercia', en: 'Bus voltage when braking a high-inertia load' },
      caption: {
        es: 'Con 1,5 kg·m² de inercia y rampa de 3 s. Sin resistencia el bus dispara F-OV; con ella queda en 750 V.',
        en: 'With 1.5 kg·m² of inertia and a 3 s ramp. Without a resistor the bus trips F-OV; with it, it stays at 750 V.',
      },
      rows: [
        {
          label: { es: 'Tensión máxima del bus (V)', en: 'Maximum bus voltage (V)' },
          items: [
            { label: { es: 'Sin resistencia de frenado', en: 'No braking resistor' }, value: 815, text: '815 V · F-OV', tone: 'magenta' },
            { label: { es: 'Con resistencia de frenado', en: 'With braking resistor' }, value: 750, text: '750 V', tone: 'emerald' },
          ],
        },
      ],
    },
  ],
}
