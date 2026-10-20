export default {
  status: { es: 'Simulado: tablas de referencia (verificar con la norma y el fabricante)', en: 'Simulated: reference tables (verify against the standard and the manufacturer)' },
  related: ['calculadora-conductores-protecciones', 'variador-vdf-motor', 'monitor-energia-esp32'],
  es: {
    lead: 'Una calculadora de tableros industriales: para cada carga obtiene la corriente de diseño, la protección, el contactor y el cable más chico que cumple, balancea las fases y entrega la lista de materiales y el unifilar en SVG.',
    context: [
      'Dimensionar un tablero a mano implica repetir decenas de cálculos y consultas de tablas (corriente, protección, factores de temperatura y agrupamiento, caída de tensión), con muchas oportunidades de equivocarse de columna.',
      'Un cable chico o una protección mal elegida se traducen en calentamiento, disparos molestos o fallas. Automatizar el primer cálculo deja tiempo para revisar lo importante, que es el criterio de ingeniería.',
    ],
    how: [
      { t: 'Describir cada carga', d: 'Cada circuito es un motor trifásico, una resistencia trifásica o una carga monofásica, con su potencia, factor de potencia y largo del cable.' },
      { t: 'Corriente de diseño', d: 'Se calcula la corriente que realmente consume la carga a partir de su potencia, la tensión y el factor de potencia.' },
      { t: 'Elegir la protección', d: 'Se elige un guardamotor o un interruptor normalizado, y un contactor AC-3 para los motores.' },
      { t: 'La sección más chica que cumple', d: 'Se busca el cable de menor sección que cumpla a la vez la capacidad de corriente (con factores de temperatura y agrupamiento) y la caída de tensión. Si no cumple, la sección sube y se advierte.' },
      { t: 'Balancear las fases', d: 'Las cargas monofásicas se reparten entre las tres fases para minimizar el desbalance.' },
      { t: 'Interruptor general y entregables', d: 'El interruptor general se dimensiona con factor de demanda. Se generan la lista de materiales (CSV) y el unifilar (SVG).' },
    ],
    concepts: [
      { t: 'Corriente de diseño', d: 'La corriente esperada del circuito en uso normal (Ib). Es el punto de partida de todo el dimensionamiento.' },
      { t: 'Guardamotor y contactor AC-3', d: 'El guardamotor protege al motor de sobrecargas y cortocircuitos; el contactor AC-3 está pensado para el arranque y la maniobra de motores de jaula.' },
      { t: 'Factores de corrección', d: 'La capacidad de un cable baja cuando la temperatura ambiente sube o cuando varios cables van juntos. Se aplican factores para corregirlo.' },
      { t: 'Caída de tensión', d: 'Pérdida de tensión a lo largo del cable; un cable largo puede cumplir por capacidad y aun así dejar la carga con poca tensión.' },
      { t: 'Desbalance de fases', d: 'Diferencia de corriente entre fases. Si es alta, calienta el neutro y desperdicia capacidad.' },
    ],
    decisions: [
      { t: 'Verificar la regla Ib ≤ In ≤ Iz', d: 'La corriente de diseño debe ser menor que la protección, y esta menor que la capacidad del cable; si no, la protección no protege. Es una propiedad que se comprueba en cada circuito.' },
      { t: 'Advertir cuando la sección debe aumentar', d: 'Que el programa explique «subí la sección porque la caída de tensión no cumplía» enseña más que entregar un número.' },
      { t: 'Tablas de referencia, no normativas', d: 'Las tablas son de referencia (tipo IEC 60364-5-52) y así se declara: hay que verificarlas con la norma vigente y con el fabricante antes de ejecutar.' },
      { t: 'Probar con casos aleatorios', d: '300 circuitos aleatorios comprueban las propiedades de ingeniería, no solo los casos que uno recuerda.' },
    ],
    tour: [
      'Pulsa «Cargar ejemplo» para ver el tablero de 7 circuitos (14,43 kW) y revisa los «Resultados por circuito».',
      'Alarga el cable de un circuito, o baja la «Caída de tensión máx.», hasta que aparezca la advertencia de aumento de sección.',
      'Cambia la «Temperatura ambiente» o los «Circuitos agrupados» en «Condiciones de la instalación» y mira cómo se corrigen las secciones.',
      'Agrega una carga con «+ Carga» y observa cómo se rebalancean las fases y cambia el interruptor general (en el ejemplo: 25 A con cable de 6 mm² y ≈ 7,1 % de desbalance).',
      'Mira el «Diagrama unifilar» y la «Lista de materiales», y descárgalos con «Descargar unifilar (SVG)» y «Descargar lista (CSV)».',
    ],
    verified: [
      'El tablero de ejemplo de 7 circuitos (14,43 kW) resulta en un general de 25 A con cable de 6 mm² y 7,1 % de desbalance.',
      '300 circuitos aleatorios cumplen las propiedades de ingeniería: corriente ≤ protección ≤ capacidad del cable, y caída de tensión ≤ límite.',
      '13 pruebas automáticas; fórmulas verificadas contra cálculos a mano.',
    ],
    limits: [
      'Las tablas son de referencia: hay que verificarlas con la NCh Elec. 4/2003 (o la norma vigente) y con el fabricante antes de ejecutar.',
      'No hace estudio de cortocircuito, selectividad ni coordinación; para eso está el proyecto de la calculadora de conductores y protecciones.',
      'Es una herramienta de apoyo al cálculo, no reemplaza la revisión de un ingeniero eléctrico.',
    ],
    next: [
      'Agregar el cálculo de cortocircuito en el tablero y la verificación del poder de corte.',
      'Exportar el unifilar a un formato editable (DXF) para continuar el plano.',
    ],
  },
  en: {
    lead: 'An industrial-panel calculator: for each load it gets the design current, the protection, the contactor and the smallest cable that complies, balances the phases and delivers the bill of materials and the single-line diagram in SVG.',
    context: [
      'Sizing a panel by hand means repeating dozens of calculations and table lookups (current, protection, temperature and grouping factors, voltage drop), with many chances to pick the wrong column.',
      'A small cable or a badly chosen protection turns into heating, nuisance trips or faults. Automating the first calculation leaves time to review what matters, which is the engineering judgement.',
    ],
    how: [
      { t: 'Describe each load', d: 'Each circuit is a three-phase motor, a three-phase resistor or a single-phase load, with its power, power factor and cable length.' },
      { t: 'Design current', d: 'The current the load actually draws is computed from its power, the voltage and the power factor.' },
      { t: 'Choose the protection', d: 'A motor protector or a standard breaker is chosen, and an AC-3 contactor for motors.' },
      { t: 'The smallest cross-section that complies', d: 'The smallest cable that meets both current capacity (with temperature and grouping factors) and voltage drop is sought. If it does not comply, the section goes up and a warning is shown.' },
      { t: 'Balance the phases', d: 'Single-phase loads are spread across the three phases to minimise imbalance.' },
      { t: 'Main breaker and deliverables', d: 'The main breaker is sized with a demand factor. The bill of materials (CSV) and the single-line diagram (SVG) are generated.' },
    ],
    concepts: [
      { t: 'Design current', d: 'The circuit’s expected current in normal use (Ib). It is the starting point of the whole sizing.' },
      { t: 'Motor protector and AC-3 contactor', d: 'The motor protector guards the motor against overloads and short circuits; the AC-3 contactor is meant for starting and switching squirrel-cage motors.' },
      { t: 'Correction factors', d: 'A cable’s capacity drops when ambient temperature rises or when several cables run together. Factors are applied to correct for it.' },
      { t: 'Voltage drop', d: 'Voltage lost along the cable; a long cable can comply on capacity and still leave the load with low voltage.' },
      { t: 'Phase imbalance', d: 'The difference in current between phases. If it is high, it heats the neutral and wastes capacity.' },
    ],
    decisions: [
      { t: 'Check the rule Ib ≤ In ≤ Iz', d: 'The design current must be below the protection, and the protection below the cable’s capacity; otherwise the protection does not protect. It is a property checked on every circuit.' },
      { t: 'Warn when the section must grow', d: 'Having the program explain "I raised the section because the voltage drop did not comply" teaches more than delivering a number.' },
      { t: 'Reference tables, not normative ones', d: 'The tables are reference ones (IEC 60364-5-52 style) and are declared as such: they must be verified against the current standard and the manufacturer before execution.' },
      { t: 'Test with random cases', d: '300 random circuits check the engineering properties, not just the cases one remembers.' },
    ],
    tour: [
      'Press "Cargar ejemplo" (load example) to see the 7-circuit panel (14.43 kW) and review the "Resultados por circuito" (results per circuit).',
      'Lengthen a circuit’s cable, or lower the "Caída de tensión máx." (max voltage drop), until the section-increase warning appears.',
      'Change the "Temperatura ambiente" or the "Circuitos agrupados" under "Condiciones de la instalación" and see how the sections are corrected.',
      'Add a load with "+ Carga" and watch the phases rebalance and the main breaker change (in the example: 25 A with a 6 mm² cable and ≈ 7.1 % imbalance).',
      'Look at the "Diagrama unifilar" (single-line diagram) and the "Lista de materiales" (bill of materials), and download them with "Descargar unifilar (SVG)" and "Descargar lista (CSV)".',
    ],
    verified: [
      'The 7-circuit example panel (14.43 kW) results in a 25 A main with a 6 mm² cable and 7.1 % imbalance.',
      '300 random circuits satisfy the engineering properties: current ≤ protection ≤ cable capacity, and voltage drop ≤ limit.',
      '13 automated tests; formulas checked against hand calculations.',
    ],
    limits: [
      'The tables are reference ones: they must be verified against NCh Elec. 4/2003 (or the current standard) and the manufacturer before execution.',
      'It does not do short-circuit studies, selectivity or coordination; the conductors-and-protections calculator project covers that.',
      'It is a calculation aid; it does not replace review by an electrical engineer.',
    ],
    next: [
      'Add the short-circuit calculation at the panel and the breaking-capacity check.',
      'Export the single-line diagram to an editable format (DXF) to continue the drawing.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'De la carga al unifilar', en: 'From load to single-line' },
      caption: {
        es: 'Si la caída de tensión no cumple, el cálculo vuelve al cable y sube la sección hasta que cumpla.',
        en: 'If the voltage drop does not comply, the calculation returns to the cable and raises the section until it does.',
      },
      nodes: [
        { id: 'car', label: { es: 'Cargas', en: 'Loads' }, sub: 'P · cosφ · largo', col: 0, row: 0, tone: 'emerald' },
        { id: 'pro', label: { es: 'Corriente y protección', en: 'Current and protection' }, sub: { es: 'guardamotor · MCB', en: 'motor protector · MCB' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'cab', label: { es: 'Cable', en: 'Cable' }, sub: { es: 'capacidad + caída', en: 'capacity + drop' }, col: 2, row: 0, tone: 'amber' },
        { id: 'ent', label: { es: 'Entregables', en: 'Deliverables' }, sub: { es: 'unifilar SVG · CSV', en: 'single-line SVG · CSV' }, col: 3, row: 0 },
      ],
      edges: [
        { from: 'car', to: 'pro', label: 'Ib' },
        { from: 'pro', to: 'cab', label: 'In' },
        { from: 'cab', to: 'ent' },
        { from: 'cab', to: 'pro', loop: true, dashed: true, label: { es: 'sección ↑ si ΔV falla', en: 'section ↑ if ΔV fails' } },
      ],
    },
    {
      kind: 'graph',
      placement: 'decisions',
      title: { es: 'La regla que protege el cable', en: 'The rule that protects the cable' },
      caption: {
        es: 'Para que el interruptor proteja el cable, la corriente de diseño debe quedar por debajo de lo que el interruptor deja pasar, y esto por debajo de lo que el cable aguanta.',
        en: 'For the breaker to protect the cable, the design current must stay below what the breaker lets through, and that below what the cable can carry.',
      },
      nodes: [
        { id: 'ib', label: { es: 'Corriente de diseño', en: 'Design current' }, sub: 'Ib', col: 0, row: 0, tone: 'emerald' },
        { id: 'in', label: { es: 'Protección', en: 'Protection' }, sub: 'In', col: 1, row: 0, tone: 'magenta' },
        { id: 'iz', label: { es: 'Capacidad del cable', en: 'Cable capacity' }, sub: 'Iz', col: 2, row: 0, tone: 'amber' },
      ],
      edges: [
        { from: 'ib', to: 'in', label: '≤' },
        { from: 'in', to: 'iz', label: '≤' },
      ],
    },
  ],
}
