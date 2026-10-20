export default {
  status: { es: 'Simulado: convertidor de lazo abierto en el navegador (sin hardware)', en: 'Simulated: open-loop converter in the browser (no hardware)' },
  related: ['convertidor-buck-boost-sincrono', 'variador-vdf-motor', 'sintonizador-bode-nyquist'],
  es: {
    lead: 'La simulación de un convertidor reductor (buck) o elevador (boost) de lazo abierto con resistencia del inductor, RDS(on), ESR y caída del diodo. Muestra cómo pasa de conducción continua a discontinua, el rizado, la eficiencia, el arranque y el balance de pérdidas.',
    context: [
      'Los parásitos y el modo de conducción cambian por completo la tensión de salida: con carga ligera, un buck deja de seguir Vout = D·Vin. Hace falta un modelo que lo muestre y que se pueda comprobar contra la teoría.',
      'Sirve para ver por qué un convertidor real entrega menos que el ideal, cuánto pierde cada elemento y dónde está la frontera entre los dos modos de conducción.',
    ],
    how: [
      { t: 'Las ecuaciones del informe', d: 'El buck usa L = 100 µH, resistencia del inductor (DCR) de 45 mΩ, C = 220 µF con ESR de 15 mΩ, 100 kHz y un interruptor con RDS(on) de 25 mΩ. El boost usa el mismo motor de cálculo.' },
      { t: 'Dos fases por periodo', d: 'En cada periodo hay una fase ON (el interruptor conduce) y una OFF (conduce el diodo). Se integran por separado, subdividiendo cada una, para que el ciclo de trabajo sea exacto.' },
      { t: 'RK4 en vez de Euler', d: 'El informe integra con Euler explícito; aquí se usa Runge-Kutta de cuarto orden, mucho más preciso con el mismo número de puntos (200 por periodo).' },
      { t: 'El diodo', d: 'Se modela con una caída fija de 0,5 V (elección propia). Cuando la corriente del inductor llega a cero en la fase OFF, el convertidor pasa a conducción discontinua (DCM).' },
      { t: 'Qué se mide', d: 'La tensión media de salida, el rizado de corriente y de tensión, la eficiencia, el arranque y el balance de potencia: lo que entra, lo que sale y cuánto se pierde en cada elemento.' },
    ],
    concepts: [
      { t: 'Buck y boost', d: 'El buck baja la tensión: ideal Vout = D·Vin. El boost la sube: ideal Vout = Vin/(1 − D). D es el ciclo de trabajo, la fracción del periodo con el interruptor encendido.' },
      { t: 'CCM y DCM', d: 'En conducción continua (CCM) la corriente del inductor nunca llega a cero. En discontinua (DCM) se anula durante parte del periodo, y la relación entre Vin y Vout cambia.' },
      { t: 'Inductancia crítica', d: 'El valor de L que separa los dos modos para una carga y una frecuencia dadas.' },
      { t: 'Parásitos', d: 'Resistencias y caídas que el modelo ideal ignora: DCR del inductor, RDS(on) del interruptor, ESR del condensador y caída del diodo. Cada una disipa potencia y reduce la salida.' },
      { t: 'Balance de energía', d: 'La potencia de entrada, menos la de salida, debe ser igual a la suma de las pérdidas de cada elemento. Si no, el modelo está inventando o perdiendo energía.' },
    ],
    decisions: [
      { t: 'Subdividir las fases', d: 'Si las fases ON y OFF se integran por separado, el ciclo de trabajo cae exactamente donde corresponde, sin errores de redondeo en el paso.' },
      { t: 'Verificar con teoría y con energía', d: 'Las fórmulas ideales (Vout = D·Vin, Vin/(1 − D), rizado, frontera CCM/DCM) deben coincidir a menos de 2 %, y el balance de energía a menos de 1 %.' },
      { t: 'Modelo de lazo abierto', d: 'Sin controlador se ve la física del convertidor sola; el lazo cerrado es el tema del proyecto del convertidor buck-boost síncrono.' },
      { t: 'Preajustes didácticos', d: 'Un buck de 12 a 5 V, un boost de 5 a 12 V, un buck en DCM y un caso sin parásitos muestran cada fenómeno por separado.' },
    ],
    tour: [
      'En «Preajustes…» elige «Buck 12 → 5 V»: con D = 0,42 entrega ≈ 4,70 V con 93,2 % de eficiencia, frente a 5,04 V del caso ideal.',
      'Elige «Sin parásitos» y compara: la salida se acerca a D·Vin.',
      'Elige «Buck en DCM (carga ligera)» o sube «Carga R» y observa cómo la corriente del inductor toca cero y cambia la tensión de salida.',
      'Cambia la «Topología» a «Boost (elevador)» y el preajuste «Boost 5 → 12 V».',
      'Mueve «Inductor L», «Condensador C», «ESR», «DCR del inductor» y «RDS(on)» y mira cómo cambian el rizado, la eficiencia y el «Balance de potencia en régimen».',
      'Mira el «Arranque: tensión media de salida por periodo (primeros 7 ms)».',
    ],
    verified: [
      'Vout = D·Vin y Vin/(1 − D) en CCM, rizado de corriente y de tensión, frontera CCM/DCM y tensión en DCM, todo a menos de 2 % de las fórmulas.',
      'Balance de energía: potencia de entrada menos la de salida coincide con las pérdidas (DCR, RDS, diodo, ESR) a menos de 1 %.',
      'El caso por defecto entrega 4,70 V con 93,2 % de eficiencia frente a 5,04 V del ideal. 11 pruebas automáticas.',
    ],
    limits: [
      'Es un modelo de lazo abierto sin tiempos muertos, sin capacidades parásitas ni saturación del inductor.',
      'El diodo de 0,5 V es elección propia, no del informe.',
      'Es una simulación, sin hardware ni prototipo.',
    ],
    next: [
      'Agregar tiempos muertos y la capacidad parásita del interruptor.',
      'Cerrar el lazo con un compensador, como se hace en el proyecto del convertidor buck-boost síncrono.',
    ],
  },
  en: {
    lead: 'A simulation of an open-loop step-down (buck) or step-up (boost) converter with inductor resistance, RDS(on), ESR and diode drop. It shows how it passes from continuous to discontinuous conduction, the ripple, the efficiency, the start-up and the loss balance.',
    context: [
      'Parasitics and conduction mode change the output voltage entirely: with a light load, a buck stops following Vout = D·Vin. A model is needed that shows this and can be checked against theory.',
      'It helps see why a real converter delivers less than the ideal, how much each element loses and where the boundary between the two conduction modes lies.',
    ],
    how: [
      { t: 'The report’s equations', d: 'The buck uses L = 100 µH, inductor resistance (DCR) of 45 mΩ, C = 220 µF with 15 mΩ ESR, 100 kHz and a switch with 25 mΩ RDS(on). The boost uses the same calculation engine.' },
      { t: 'Two phases per period', d: 'In each period there is an ON phase (the switch conducts) and an OFF phase (the diode conducts). They are integrated separately, subdividing each, so the duty cycle is exact.' },
      { t: 'RK4 instead of Euler', d: 'The report integrates with explicit Euler; here fourth-order Runge-Kutta is used, far more accurate with the same number of points (200 per period).' },
      { t: 'The diode', d: 'It is modelled with a fixed 0.5 V drop (my own choice). When the inductor current reaches zero in the OFF phase, the converter enters discontinuous conduction (DCM).' },
      { t: 'What is measured', d: 'The mean output voltage, current and voltage ripple, efficiency, start-up and the power balance: what goes in, what comes out and how much is lost in each element.' },
    ],
    concepts: [
      { t: 'Buck and boost', d: 'The buck steps the voltage down: ideal Vout = D·Vin. The boost steps it up: ideal Vout = Vin/(1 − D). D is the duty cycle, the fraction of the period with the switch on.' },
      { t: 'CCM and DCM', d: 'In continuous conduction (CCM) the inductor current never reaches zero. In discontinuous (DCM) it drops to zero for part of the period, and the relation between Vin and Vout changes.' },
      { t: 'Critical inductance', d: 'The value of L separating the two modes for a given load and frequency.' },
      { t: 'Parasitics', d: 'Resistances and drops the ideal model ignores: the inductor DCR, the switch RDS(on), the capacitor ESR and the diode drop. Each dissipates power and reduces the output.' },
      { t: 'Energy balance', d: 'Input power minus output power must equal the sum of each element’s losses. If not, the model is inventing or losing energy.' },
    ],
    decisions: [
      { t: 'Subdivide the phases', d: 'If the ON and OFF phases are integrated separately, the duty cycle falls exactly where it should, with no step round-off errors.' },
      { t: 'Verify with theory and with energy', d: 'The ideal formulas (Vout = D·Vin, Vin/(1 − D), ripple, CCM/DCM boundary) must match to under 2 %, and the energy balance to under 1 %.' },
      { t: 'Open-loop model', d: 'Without a controller the converter’s physics is seen on its own; the closed loop is the subject of the synchronous buck-boost converter project.' },
      { t: 'Didactic presets', d: 'A 12 to 5 V buck, a 5 to 12 V boost, a buck in DCM and a case without parasitics show each phenomenon separately.' },
    ],
    tour: [
      'Under "Preajustes…" (presets) choose "Buck 12 → 5 V": with D = 0.42 it delivers ≈ 4.70 V at 93.2 % efficiency, against 5.04 V in the ideal case.',
      'Choose "Sin parásitos" (no parasitics) and compare: the output gets close to D·Vin.',
      'Choose "Buck en DCM (carga ligera)" or raise "Carga R" (load) and watch the inductor current touch zero and the output voltage change.',
      'Change the "Topología" (topology) to "Boost (elevador)" and the preset "Boost 5 → 12 V".',
      'Move "Inductor L", "Condensador C", "ESR", "DCR del inductor" and "RDS(on)" and see how the ripple, the efficiency and the "Balance de potencia en régimen" (steady-state power balance) change.',
      'Look at the "Arranque: tensión media de salida por periodo (primeros 7 ms)" (start-up: mean output voltage per period).',
    ],
    verified: [
      'Vout = D·Vin and Vin/(1 − D) in CCM, current and voltage ripple, the CCM/DCM boundary and the DCM voltage, all within 2 % of the formulas.',
      'Energy balance: input power minus output power matches the losses (DCR, RDS, diode, ESR) within 1 %.',
      'The default case delivers 4.70 V at 93.2 % efficiency against 5.04 V ideal. 11 automated tests.',
    ],
    limits: [
      'It is an open-loop model with no dead times, no parasitic capacitances and no inductor saturation.',
      'The 0.5 V diode is my own choice, not the report’s.',
      'It is a simulation, with no hardware or prototype.',
    ],
    next: [
      'Add dead times and the switch’s parasitic capacitance.',
      'Close the loop with a compensator, as in the synchronous buck-boost converter project.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'El convertidor y sus parásitos', en: 'The converter and its parasitics' },
      caption: {
        es: 'Cada elemento real agrega una pérdida (DCR, RDS(on), ESR, diodo). La corriente del inductor realimenta el cálculo de cada fase y decide si el convertidor está en CCM o en DCM.',
        en: 'Each real element adds a loss (DCR, RDS(on), ESR, diode). The inductor current feeds back into each phase’s calculation and decides whether the converter is in CCM or DCM.',
      },
      nodes: [
        { id: 'vin', label: 'Vin · D', sub: { es: 'ciclo de trabajo', en: 'duty cycle' }, col: 0, row: 0, tone: 'emerald' },
        { id: 'sw', label: { es: 'Interruptor + diodo', en: 'Switch + diode' }, sub: 'ON / OFF', col: 1, row: 0, tone: 'amber' },
        { id: 'lc', label: 'L · C', sub: { es: 'con parásitos', en: 'with parasitics' }, col: 2, row: 0, tone: 'magenta' },
        { id: 'car', label: { es: 'Carga', en: 'Load' }, sub: 'Vout · η', col: 3, row: 0 },
      ],
      edges: [
        { from: 'vin', to: 'sw' },
        { from: 'sw', to: 'lc', label: 'vL' },
        { from: 'lc', to: 'car', label: 'Vout' },
        { from: 'lc', to: 'sw', loop: true, dashed: true, label: { es: 'corriente del inductor', en: 'inductor current' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'El caso por defecto: ideal frente a real', en: 'The default case: ideal versus real' },
      caption: {
        es: 'Buck de 12 V a 5 V con D = 0,42. La diferencia de ≈ 0,34 V son las pérdidas en el inductor, el interruptor, el diodo y el condensador.',
        en: '12 V to 5 V buck with D = 0.42. The ≈ 0.34 V difference is the losses in the inductor, switch, diode and capacitor.',
      },
      rows: [
        {
          label: { es: 'Tensión de salida (V)', en: 'Output voltage (V)' },
          items: [
            { label: { es: 'Ideal: D·Vin', en: 'Ideal: D·Vin' }, value: 5.04, text: '5,04 V', tone: 'cyan' },
            { label: { es: 'Con parásitos', en: 'With parasitics' }, value: 4.7, text: '4,70 V', tone: 'amber' },
          ],
        },
      ],
    },
  ],
}
