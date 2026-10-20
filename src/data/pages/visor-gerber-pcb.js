export default {
  status: { es: 'Simulado: analizador propio sobre una placa de ejemplo (sin hardware)', en: 'Simulated: own parser on an example board (no hardware)' },
  related: ['simulador-logica-digital', 'convertidor-buck-boost-sincrono', 'esp32-alarma-mp3'],
  es: {
    lead: 'Un analizador de archivos Gerber escrito desde cero (formato numérico, unidades, aperturas, trazos, destellos, regiones y arcos) que dibuja las cuatro capas de una placa de ejemplo de 50 × 35 mm en vista plana o apilada en 3D simplificado. El texto de cada capa es editable y la vista se actualiza al instante.',
    context: [
      'El formato Gerber tiene coordenadas modales, formatos numéricos declarados, regiones y arcos multicuadrante: un analizador ingenuo falla en cuanto el archivo no se parece al de los ejemplos.',
      'El visor sirve para inspeccionar cómo se compone una placa por capas, y deja un analizador que lee el formato que declara cada archivo.',
    ],
    how: [
      { t: 'El formato declarado', d: 'El analizador lee el formato numérico (%FS) y las unidades (%MO) que declara cada archivo, y no asume ninguno. Así entiende, por ejemplo, el formato 4.6 de la placa de ejemplo.' },
      { t: 'Aperturas', d: 'Soporta aperturas circulares, rectangulares y oblongas, que son las formas de «pincel» con que se dibujan trazos y destellos.' },
      { t: 'Comandos modales', d: 'D01 (trazar), D02 (mover) y D03 (destello) usan coordenadas modales: una coordenada que no se repite conserva el valor de la línea anterior.' },
      { t: 'Regiones y arcos', d: 'Las regiones G36/G37 forman polígonos rellenos; los arcos G02/G03 se entienden en modo multicuadrante.' },
      { t: 'Polígonos a triángulos', d: 'Los polígonos se triangulan por recorte de orejas para poder rellenarlos, y la suma de las áreas de los triángulos coincide con el área del polígono.' },
      { t: 'Vista plana o apilada', d: 'La vista plana muestra la placa desde arriba; la apilada separa las capas con una proyección isométrica, con giro, inclinación y separación ajustables. La máscara se dibuja con las aberturas recortadas.' },
      { t: 'Edición en vivo', d: 'El texto de cada capa es editable; al cambiarlo, el analizador vuelve a leerlo y la vista se actualiza al instante.' },
    ],
    concepts: [
      { t: 'Gerber RS-274X', d: 'Formato estándar para describir las capas de una placa de circuito impreso: cobre, máscara, serigrafía y contorno.' },
      { t: 'Apertura', d: 'La forma con que se «pinta»: un círculo, un rectángulo o un óvalo que se arrastra para hacer un trazo o se coloca para hacer un destello.' },
      { t: 'Coordenadas modales', d: 'En un archivo Gerber una coordenada ausente significa «igual que antes», así que el analizador debe recordar el último valor.' },
      { t: 'Arco multicuadrante', d: 'Un arco que puede abarcar más de un cuarto de círculo; el sentido y el centro se deducen del comando y del desplazamiento del centro.' },
      { t: 'Recorte de orejas', d: 'Algoritmo para dividir un polígono en triángulos: se «recorta» un vértice cuyo triángulo está vacío, y se repite.' },
    ],
    decisions: [
      { t: 'Leer el formato declarado', d: 'El analizador del informe divide siempre por 10⁵ (formato 3.5) y exige X e Y en cada línea; con el formato 4.6 de esta placa sus coordenadas salen 10 veces demasiado grandes. Aquí se lee lo que declara cada archivo.' },
      { t: 'Generar la placa con el propio código', d: 'La placa de ejemplo la genera el mismo código (cabecera de 2 × 6, pasivos, LED, orificios, relleno de cobre y contorno redondeado), de modo que cada capa se puede comparar con lo generado.' },
      { t: 'Avisar de lo no soportado', d: 'No soporta polaridad clara, un cuadrante (G74), macros ni polígonos, y el visor lo avisa en lugar de dibujar algo incorrecto.' },
      { t: 'Una línea de prueba contra el informe', d: 'Una sección compara este analizador con el del informe sobre una línea de texto, para ver el error de escala.' },
    ],
    tour: [
      'Marca y desmarca «cobre», «máscara», «serigrafía» y «contorno» para ver las capas de la placa.',
      'Cambia de «Vista plana (cenital)» a «Capas apiladas (3D simplificado)» y mueve «Giro», «Inclinación» y «Separación de capas».',
      'En «Archivo» elige una capa (cobre superior, máscara de soldadura, serigrafía o contorno), edita su texto y mira cómo se actualiza la vista; «Restaurar el ejemplo» vuelve al original.',
      'En «Línea de prueba: este analizador frente al del informe» pulsa «Analizar» y compara los resultados: el del informe sale con coordenadas 10 veces demasiado grandes.',
    ],
    verified: [
      'Un cuarto de círculo de radio 10 queda a 10 ± 1e-9 y mide 2π·10/4 a 0,1 %.',
      'Cada capa de la placa de ejemplo coincide con lo generado (pads, trazos, longitud, regiones, arcos); la suma de áreas de la triangulación coincide.',
      'El análisis de las 4 capas toma 1,2 ms. 14 pruebas automáticas.',
    ],
    limits: [
      'No soporta polaridad clara, un cuadrante (G74), macros ni polígonos (se avisa).',
      'No usa Clipper2 ni extrusión 3D real: la vista apilada es una proyección isométrica simplificada.',
      'Es una simulación, sin hardware ni prototipo.',
    ],
    next: [
      'Agregar las capas de taladros (Excellon) y el cobre inferior.',
      'Implementar macros de apertura y polaridad clara para leer archivos de más herramientas.',
    ],
  },
  en: {
    lead: 'A Gerber file parser written from scratch (number format, units, apertures, strokes, flashes, regions and arcs) that draws the four layers of a 50 × 35 mm example board in flat or stacked, simplified-3D view. Each layer’s text is editable and the view updates instantly.',
    context: [
      'The Gerber format has modal coordinates, declared number formats, regions and multi-quadrant arcs: a naive parser fails as soon as a file does not look like the examples.',
      'The viewer serves to inspect how a board is composed in layers, and leaves a parser that reads the format each file declares.',
    ],
    how: [
      { t: 'The declared format', d: 'The parser reads the number format (%FS) and units (%MO) each file declares, and assumes none. That way it understands, for example, the example board’s 4.6 format.' },
      { t: 'Apertures', d: 'It supports circular, rectangular and oblong apertures, the "brush" shapes used to draw strokes and flashes.' },
      { t: 'Modal commands', d: 'D01 (draw), D02 (move) and D03 (flash) use modal coordinates: a coordinate that is not repeated keeps the previous line’s value.' },
      { t: 'Regions and arcs', d: 'G36/G37 regions form filled polygons; G02/G03 arcs are understood in multi-quadrant mode.' },
      { t: 'Polygons to triangles', d: 'Polygons are triangulated by ear clipping so they can be filled, and the sum of the triangles’ areas equals the polygon’s area.' },
      { t: 'Flat or stacked view', d: 'The flat view shows the board from above; the stacked one separates the layers with an isometric projection, with adjustable rotation, tilt and separation. The mask is drawn with its openings cut out.' },
      { t: 'Live editing', d: 'Each layer’s text is editable; when changed, the parser reads it again and the view updates instantly.' },
    ],
    concepts: [
      { t: 'Gerber RS-274X', d: 'The standard format to describe a printed-circuit board’s layers: copper, mask, silkscreen and outline.' },
      { t: 'Aperture', d: 'The shape that is "painted" with: a circle, rectangle or oval dragged to make a stroke or placed to make a flash.' },
      { t: 'Modal coordinates', d: 'In a Gerber file a missing coordinate means "same as before", so the parser must remember the last value.' },
      { t: 'Multi-quadrant arc', d: 'An arc that may span more than a quarter circle; the direction and centre are deduced from the command and the centre offset.' },
      { t: 'Ear clipping', d: 'An algorithm to split a polygon into triangles: a vertex whose triangle is empty is "clipped off", and this is repeated.' },
    ],
    decisions: [
      { t: 'Read the declared format', d: 'The report’s parser always divides by 10⁵ (3.5 format) and demands X and Y on every line; with this board’s 4.6 format its coordinates come out 10 times too large. Here what each file declares is read.' },
      { t: 'Generate the board with the code itself', d: 'The example board is generated by the same code (2 × 6 header, passives, LED, holes, copper fill and rounded outline), so each layer can be compared with what was generated.' },
      { t: 'Warn about what is unsupported', d: 'It does not support clear polarity, single quadrant (G74), macros or polygons, and the viewer warns instead of drawing something wrong.' },
      { t: 'A test line against the report', d: 'A section compares this parser with the report’s on a line of text, to see the scale error.' },
    ],
    tour: [
      'Tick and untick "cobre" (copper), "máscara" (mask), "serigrafía" (silkscreen) and "contorno" (outline) to see the board’s layers.',
      'Switch from "Vista plana (cenital)" (flat, top-down) to "Capas apiladas (3D simplificado)" (stacked layers) and move "Giro" (rotation), "Inclinación" (tilt) and "Separación de capas" (layer separation).',
      'Under "Archivo" (file) choose a layer (top copper, solder mask, silkscreen or outline), edit its text and watch the view update; "Restaurar el ejemplo" (restore the example) goes back to the original.',
      'Under "Línea de prueba: este analizador frente al del informe" (test line: this parser versus the report’s) press "Analizar" (analyse) and compare the results: the report’s comes out with coordinates 10 times too large.',
    ],
    verified: [
      'A quarter circle of radius 10 lands at 10 ± 1e-9 and measures 2π·10/4 to 0.1 %.',
      'Each layer of the example board matches what was generated (pads, strokes, length, regions, arcs); the triangulation’s area sum matches.',
      'Analysing the 4 layers takes 1.2 ms. 14 automated tests.',
    ],
    limits: [
      'It does not support clear polarity, single quadrant (G74), macros or polygons (a warning is shown).',
      'It does not use Clipper2 or real 3D extrusion: the stacked view is a simplified isometric projection.',
      'It is a simulation, with no hardware or prototype.',
    ],
    next: [
      'Add the drill layers (Excellon) and the bottom copper.',
      'Implement aperture macros and clear polarity to read files from more tools.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Del texto Gerber a la vista', en: 'From Gerber text to the view' },
      caption: {
        es: 'El analizador lee primero el formato declarado y recién entonces interpreta los comandos. Editar el texto vuelve a empezar la cadena y la vista se actualiza.',
        en: 'The parser first reads the declared format and only then interprets the commands. Editing the text restarts the chain and the view updates.',
      },
      nodes: [
        { id: 'arc', label: { es: 'Archivo Gerber', en: 'Gerber file' }, sub: 'RS-274X', col: 0, row: 0, tone: 'emerald' },
        { id: 'ana', label: { es: 'Analizador', en: 'Parser' }, sub: { es: 'formato · modal', en: 'format · modal' }, col: 1, row: 0, tone: 'magenta' },
        { id: 'pol', label: { es: 'Polígonos', en: 'Polygons' }, sub: { es: 'triangulación', en: 'triangulation' }, col: 2, row: 0 },
        { id: 'vis', label: { es: 'Vista', en: 'View' }, sub: { es: 'plana / apilada', en: 'flat / stacked' }, col: 3, row: 0, tone: 'amber' },
      ],
      edges: [
        { from: 'arc', to: 'ana', label: { es: 'texto', en: 'text' } },
        { from: 'ana', to: 'pol', label: { es: 'figuras', en: 'shapes' } },
        { from: 'pol', to: 'vis' },
        { from: 'vis', to: 'arc', loop: true, dashed: true, label: { es: 'edición', en: 'editing' } },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'El error de escala del informe', en: 'The report’s scale error' },
      caption: {
        es: 'El analizador del informe divide siempre por 10⁵. Con el formato 4.6 de esta placa, sus coordenadas salen 10 veces demasiado grandes; este analizador lee el formato del archivo.',
        en: 'The report’s parser always divides by 10⁵. With this board’s 4.6 format, its coordinates come out 10 times too large; this parser reads the file’s format.',
      },
      rows: [
        {
          label: { es: 'Escala de las coordenadas (1 = correcta)', en: 'Coordinate scale (1 = correct)' },
          items: [
            { label: { es: 'Analizador del informe', en: 'Report’s parser' }, value: 10, text: '× 10', tone: 'magenta' },
            { label: { es: 'Este analizador', en: 'This parser' }, value: 1, text: '× 1', tone: 'emerald' },
          ],
        },
      ],
    },
  ],
}
