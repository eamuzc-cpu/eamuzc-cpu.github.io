export default {
  status: { es: 'Simulado: calculadora de RF sin pérdidas (sin hardware)', en: 'Simulated: lossless RF calculator (no hardware)' },
  related: ['sintonizador-bode-nyquist', 'visor-gerber-pcb', 'espectrograma-fft-blackman-harris'],
  es: {
    lead: 'Se coloca una carga en la carta de Smith y se ve su coeficiente de reflexión, ROE y pérdida de retorno; al alargar la línea el punto gira por el círculo de ROE constante. Calcula la red de adaptación en L con sus dos soluciones y sintetiza una línea microstrip de la impedancia que se pida.',
    context: [
      'Adaptar una carga exige pasar de impedancias a admitancias y elegir entre dos soluciones; un error de signo da una red que no adapta. Y las fórmulas de microstrip son aproximaciones que hay que contrastar.',
      'El resultado es una calculadora de RF que verifica por separado lo que diseña, y que dejó en evidencia un error numérico del documento de origen.',
    ],
    how: [
      { t: 'Coeficiente de reflexión', d: 'Γ = (ZL − Z0)/(ZL + Z0) mide cuánta onda se refleja en la carga. De Γ salen la razón de onda estacionaria (ROE) y la pérdida de retorno.' },
      { t: 'La carta de Smith', d: 'La carga se elige haciendo clic en la carta, que es un mapa de Γ en el que los círculos de resistencia y de reactancia constante se pueden leer directamente. Su correcta ubicación se comprobó con puntos conocidos.' },
      { t: 'Mover a lo largo de la línea', d: 'Alargar una línea sin pérdidas hace girar el punto alrededor del centro, a ROE constante: un cuarto de onda invierte la impedancia, media onda la repite, y una carga adaptada no cambia.' },
      { t: 'Red de adaptación en L', d: 'Una bobina y un condensador transforman una carga compleja en una impedancia igual a la de la fuente. Se diseña con admitancias y siempre hay dos soluciones.' },
      { t: 'Verificación independiente', d: 'La red se comprueba con un cálculo circuital aparte: con 300 cargas complejas aleatorias, las dos soluciones dan una impedancia de entrada igual a Rs con error menor a 1e-6 Ω.' },
      { t: 'Microstrip', d: 'Con las fórmulas de Hammerstad-Jensen se sintetiza el ancho W/h para una impedancia pedida y se calcula la Z0 con ambas ramas de la fórmula.' },
      { t: 'La tabla del informe', d: 'Se compara la tabla del informe con el cálculo y se marca una fila incorrecta.' },
    ],
    concepts: [
      { t: 'Coeficiente de reflexión (Γ)', d: 'Número complejo entre 0 y 1 en módulo: 0 significa que no se refleja nada (carga adaptada) y 1 que se refleja todo.' },
      { t: 'ROE (VSWR)', d: 'Razón de onda estacionaria: qué tanto varía la tensión a lo largo de la línea por la onda reflejada. Vale 1 con una carga adaptada.' },
      { t: 'Pérdida de retorno', d: 'La potencia reflejada expresada en dB: cuanto mayor, mejor adaptada está la carga.' },
      { t: 'Red en L', d: 'La red de adaptación más simple: un elemento en serie y uno en paralelo, que transforma una impedancia en otra a una frecuencia.' },
      { t: 'Microstrip', d: 'Línea de transmisión formada por una pista de cobre sobre un sustrato con plano de masa. Su impedancia depende del ancho de la pista, del espesor del sustrato y de su constante dieléctrica.' },
    ],
    decisions: [
      { t: 'Verificar el diseño con otro cálculo', d: 'Diseñar y comprobar con el mismo método esconde errores. El cálculo circuital independiente detecta cualquier signo mal puesto.' },
      { t: 'Contrastar el documento de origen', d: 'La tabla del informe tiene un error en la fila 25 + j25 Ω: dice 126,8° y 6,93 dB, y los valores correctos son 116,6° y 6,99 dB. Las otras tres filas coinciden.' },
      { t: 'Ambas ramas de Hammerstad', d: 'La síntesis y el análisis del microstrip usan las dos ramas (ancho estrecho y ancho), y deben coincidir entre sí a menos de 1,5 %.' },
      { t: 'Declarar las simplificaciones', d: 'Sin pérdidas, espesor de cobre ni dispersión; sin zoom ni d3.' },
    ],
    tour: [
      'En «Carta de Smith (clic para elegir la carga)» haz clic en un punto y mira Γ, ROE y pérdida de retorno; mueve «Resistencia de la carga» y «Reactancia de la carga».',
      'Mueve «Longitud eléctrica» y observa cómo el punto gira: con λ/4 se invierte y con λ/2 vuelve al mismo lugar.',
      'En «Red de adaptación en L a Rs = Z0» mira las dos soluciones y su verificación (✔); con 100 MHz y 100 Ω → 50 Ω salen 79,6 nH y 15,9 pF.',
      'En «Tabla del informe frente al cálculo» busca la fila de 25 + j25 Ω, marcada como error.',
      'En «Microstrip (Hammerstad-Jensen)» pide una «Z0 deseada» de 50 Ω sobre un sustrato de εr = 4,4 y altura de 1,6 mm: el ancho sale 3,06 mm.',
    ],
    verified: [
      'λ/4 invierte, λ/2 repite y la carga adaptada no cambia; círculos de resistencia y reactancia comprobados con puntos conocidos.',
      'Con 300 cargas complejas aleatorias las dos soluciones de la red en L dan una impedancia de entrada igual a Rs con error < 1e-6 Ω; a 100 MHz, 100 Ω → 50 Ω da 79,6 nH y 15,9 pF.',
      '50 Ω sobre FR4 de 1,6 mm (εr = 4,4): W = 3,06 mm y εeff = 3,33; síntesis y análisis coinciden a menos de 1,5 %. 12 pruebas automáticas.',
    ],
    limits: [
      'Las líneas son sin pérdidas: el microstrip no incluye espesor de cobre ni dispersión.',
      'Es una calculadora: no simula un circuito completo ni usa parámetros S medidos.',
      'Es una simulación, sin hardware ni prototipo.',
    ],
    next: [
      'Agregar adaptación con un stub de una línea y comparar con la red en L.',
      'Incluir pérdidas del dieléctrico y del conductor en la línea microstrip.',
    ],
  },
  en: {
    lead: 'A load is placed on the Smith chart and its reflection coefficient, VSWR and return loss are seen; as the line is lengthened the point rotates around the constant-VSWR circle. It computes the L matching network with its two solutions and synthesises a microstrip line of any requested impedance.',
    context: [
      'Matching a load requires going from impedances to admittances and choosing between two solutions; a sign error gives a network that does not match. And microstrip formulas are approximations that must be cross-checked.',
      'The result is an RF calculator that verifies separately what it designs, and that exposed a numerical error in the source document.',
    ],
    how: [
      { t: 'Reflection coefficient', d: 'Γ = (ZL − Z0)/(ZL + Z0) measures how much of the wave is reflected at the load. VSWR and return loss come from Γ.' },
      { t: 'The Smith chart', d: 'The load is chosen by clicking on the chart, a map of Γ in which constant-resistance and constant-reactance circles can be read directly. Its correct placement was checked with known points.' },
      { t: 'Moving along the line', d: 'Lengthening a lossless line rotates the point around the centre, at constant VSWR: a quarter wave inverts the impedance, a half wave repeats it, and a matched load does not change.' },
      { t: 'L matching network', d: 'An inductor and a capacitor transform a complex load into an impedance equal to the source’s. It is designed with admittances and there are always two solutions.' },
      { t: 'Independent verification', d: 'The network is checked with a separate circuit calculation: with 300 random complex loads, both solutions give an input impedance equal to Rs with an error below 1e-6 Ω.' },
      { t: 'Microstrip', d: 'With the Hammerstad-Jensen formulas the W/h width is synthesised for a requested impedance and Z0 is computed with both branches of the formula.' },
      { t: 'The report’s table', d: 'The report’s table is compared with the calculation and one incorrect row is flagged.' },
    ],
    concepts: [
      { t: 'Reflection coefficient (Γ)', d: 'A complex number between 0 and 1 in magnitude: 0 means nothing is reflected (matched load) and 1 means everything is reflected.' },
      { t: 'VSWR', d: 'Voltage standing-wave ratio: how much the voltage varies along the line because of the reflected wave. It is 1 with a matched load.' },
      { t: 'Return loss', d: 'The reflected power expressed in dB: the greater it is, the better matched the load.' },
      { t: 'L network', d: 'The simplest matching network: one series element and one shunt element, transforming one impedance into another at one frequency.' },
      { t: 'Microstrip', d: 'A transmission line made of a copper track on a substrate with a ground plane. Its impedance depends on the track width, substrate thickness and dielectric constant.' },
    ],
    decisions: [
      { t: 'Verify the design with another calculation', d: 'Designing and checking with the same method hides errors. The independent circuit calculation catches any misplaced sign.' },
      { t: 'Cross-check the source document', d: 'The report’s table has an error in the row 25 + j25 Ω: it says 126.8° and 6.93 dB, and the correct values are 116.6° and 6.99 dB. The other three rows match.' },
      { t: 'Both Hammerstad branches', d: 'The microstrip synthesis and analysis use both branches (narrow and wide), and must agree with each other within 1.5 %.' },
      { t: 'State the simplifications', d: 'No losses, copper thickness or dispersion; no zoom or d3.' },
    ],
    tour: [
      'Under "Carta de Smith (clic para elegir la carga)" (Smith chart, click to choose the load) click on a point and see Γ, VSWR and return loss; move "Resistencia de la carga" and "Reactancia de la carga" (load resistance and reactance).',
      'Move "Longitud eléctrica" (electrical length) and watch the point rotate: at λ/4 it inverts and at λ/2 it returns to the same place.',
      'Under "Red de adaptación en L a Rs = Z0" (L network matching to Rs = Z0) look at the two solutions and their verification (✔); at 100 MHz and 100 Ω → 50 Ω you get 79.6 nH and 15.9 pF.',
      'Under "Tabla del informe frente al cálculo" (report table versus calculation) find the row of 25 + j25 Ω, flagged as an error.',
      'Under "Microstrip (Hammerstad-Jensen)" ask for a "Z0 deseada" (desired Z0) of 50 Ω on a substrate with εr = 4.4 and a height of 1.6 mm: the width comes out 3.06 mm.',
    ],
    verified: [
      'λ/4 inverts, λ/2 repeats and the matched load does not change; resistance and reactance circles checked with known points.',
      'With 300 random complex loads, both L-network solutions give an input impedance equal to Rs with error < 1e-6 Ω; at 100 MHz, 100 Ω → 50 Ω gives 79.6 nH and 15.9 pF.',
      '50 Ω on 1.6 mm FR4 (εr = 4.4): W = 3.06 mm and εeff = 3.33; synthesis and analysis agree within 1.5 %. 12 automated tests.',
    ],
    limits: [
      'The lines are lossless: the microstrip does not include copper thickness or dispersion.',
      'It is a calculator: it does not simulate a complete circuit nor use measured S-parameters.',
      'It is a simulation, with no hardware or prototype.',
    ],
    next: [
      'Add single-stub matching and compare with the L network.',
      'Include dielectric and conductor losses in the microstrip line.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'De la carga a la adaptación', en: 'From load to matching' },
      caption: {
        es: 'La carga define el coeficiente de reflexión; la línea la transforma; la red de adaptación (o el microstrip) debe lograr que la impedancia vista por la fuente sea Z0.',
        en: 'The load defines the reflection coefficient; the line transforms it; the matching network (or the microstrip) must make the impedance seen by the source equal Z0.',
      },
      nodes: [
        { id: 'car', label: { es: 'Carga', en: 'Load' }, sub: 'ZL = R + jX', col: 0, row: 0, tone: 'emerald' },
        { id: 'gam', label: { es: 'Reflexión', en: 'Reflection' }, sub: 'Γ · ROE · RL', col: 1, row: 0, tone: 'magenta' },
        { id: 'lin', label: { es: 'Línea', en: 'Line' }, sub: { es: 'giro por la carta', en: 'rotation on the chart' }, col: 2, row: 0 },
        { id: 'ada', label: { es: 'Adaptación', en: 'Matching' }, sub: { es: 'red en L · microstrip', en: 'L network · microstrip' }, col: 3, row: 0, tone: 'amber' },
      ],
      edges: [
        { from: 'car', to: 'gam' },
        { from: 'gam', to: 'lin', label: 'Γ(ℓ)' },
        { from: 'lin', to: 'ada' },
        { from: 'ada', to: 'car', loop: true, dashed: true, label: { es: 'Z de entrada = Z0', en: 'input Z = Z0' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'El error de la tabla del informe', en: 'The error in the report’s table' },
      caption: {
        es: 'Fila de la carga 25 + j25 Ω con Z0 = 50 Ω: Γ = (−25 + j25)/(75 + j25). El ángulo del informe no coincide con el cálculo; las otras tres filas sí.',
        en: 'Row for the 25 + j25 Ω load with Z0 = 50 Ω: Γ = (−25 + j25)/(75 + j25). The report’s angle does not match the calculation; the other three rows do.',
      },
      rows: [
        {
          label: { es: 'Ángulo de Γ (°)', en: 'Angle of Γ (°)' },
          items: [
            { label: { es: 'Informe', en: 'Report' }, value: 126.8, text: '126,8°', tone: 'magenta' },
            { label: { es: 'Cálculo correcto', en: 'Correct calculation' }, value: 116.6, text: '116,6°', tone: 'emerald' },
          ],
        },
      ],
    },
  ],
}
