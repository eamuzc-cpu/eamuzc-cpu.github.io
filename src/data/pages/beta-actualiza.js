export default {
  status: { es: 'Pipeline en uso: 22 videos producidos', en: 'Pipeline in use: 22 videos produced' },
  related: ['comfyui-studio', 'axiom-2', 'asistente-pi-v3'],
  es: {
    lead: 'El flujo de producción de un canal de ciencia para audiencia de 7 a 15 años, guiado por Beta, un robot que aprende del mundo. Guion, imágenes con IA, voz, animación y clips verticales salen de un proceso repetible con tres puertas de aprobación.',
    context: [
      'Un video de ciencia con buen ritmo visual pide decenas de imágenes y mucha GPU: en el video S10, 69 imágenes tomaron cerca de 30 minutos de GPU, además de la voz y el render.',
      'Sin un flujo repetible cada video cuesta horas, se repiten temas y se cuelan datos sin verificar. Para una audiencia de 7 a 15 años, además, cada video debe pasar reglas de contenido para público general.',
    ],
    how: [
      { t: 'Puerta 1: los datos', d: 'Antes de escribir, cada afirmación necesita dos fuentes. Si no las tiene, no entra al guion.' },
      { t: 'Puerta 2: el guion', d: 'El guion se escribe con tiempos por frase, de modo que se sabe cuánto dura cada idea antes de generar nada.' },
      { t: 'Puerta 3: la lista de imágenes', d: 'Cada imagen se ancla a la palabra que dice la voz en ese momento. Así se genera solo lo que se va a usar.' },
      { t: 'Una sola tanda de GPU', d: 'Con las tres puertas aprobadas, la GPU trabaja una vez: las imágenes con Z-Image y la voz local con Chatterbox.' },
      { t: 'Escenas en Remotion', d: 'En Remotion se arman las escenas con Beta en 3D, los diagramas y el montaje de fondos.' },
      { t: 'Audio, render y cortes', d: 'La mezcla de audio queda a −14 LUFS, se renderiza en 1080p y se sacan cortes verticales 9:16.' },
      { t: 'Entregables y control de temas', d: 'Cada video cierra con MP4, SRT, clips verticales, miniatura y descripción con fuentes, y un script revisa que el tema no se repita.' },
    ],
    concepts: [
      { t: 'Puerta de aprobación', d: 'Punto del flujo donde algo debe revisarse y aprobarse antes de seguir. Aquí evitan gastar GPU en un guion que luego hay que rehacer.' },
      { t: 'Remotion', d: 'Herramienta para crear video con código React: las escenas son componentes y el render es reproducible.' },
      { t: 'LUFS', d: 'Unidad de volumen percibido. −14 LUFS es un nivel de referencia habitual para plataformas de video.' },
      { t: 'TTS local (Chatterbox)', d: 'Síntesis de voz que corre en el propio computador, sin servicio externo ni límites de uso.' },
      { t: 'Imagen anclada a la palabra', d: 'Cada imagen del fondo está asociada al instante en que la voz dice la palabra a la que ilustra.' },
    ],
    decisions: [
      { t: 'Verificar antes de producir', d: 'Corregir un dato en la etapa del guion cuesta un párrafo; corregirlo con el video renderizado cuesta horas.' },
      { t: 'Un solo bloque de GPU', d: 'Generar imágenes y voz juntas, una vez, evita reabrir el modelo y esperar varias veces.' },
      { t: 'Fondos más lentos', d: 'Sostener cada fondo de 4 a 7 s en lugar de ~1,5 s redujo las imágenes de fondo de 58 a 21 en un video. El ritmo rápido pasó a venir de la edición y la voz, no de cambiar de imagen.' },
      { t: 'Reglas para público general', d: 'Cada video se revisa contra las reglas de contenido para una audiencia de 7 a 15 años antes de publicarse.' },
    ],
    verified: [
      '22 videos producidos con este flujo; 3 puertas de aprobación.',
      'En el video S10, las imágenes de fondo bajaron de 58 a 21 (−64 %) al sostener cada fondo de 4 a 7 s.',
    ],
    limits: [
      'Es el flujo de producción de un canal, no un producto: depende de una GPU local, ComfyUI y Remotion.',
      'La reducción de imágenes (−64 %) es la medida en un video concreto (S10), no un promedio de los 22.',
      'Esta página no incluye los guiones ni los videos finales.',
    ],
    next: [
      'Automatizar la verificación de las dos fuentes por afirmación con una lista de fuentes por tema.',
      'Medir el tiempo total por video y dejarlo como indicador en el panel del flujo.',
    ],
  },
  en: {
    lead: 'The production flow of a science channel for ages 7 to 15, hosted by Beta, a robot that learns about the world. Script, AI images, voice, animation and vertical clips come out of a repeatable process with three approval gates.',
    context: [
      'A science video with good visual rhythm needs dozens of images and a lot of GPU: in video S10, 69 images took about 30 minutes of GPU, plus voice and render.',
      'Without a repeatable flow every video costs hours, topics repeat and unverified facts slip in. For an audience of 7 to 15, every video must also pass general-audience content rules.',
    ],
    how: [
      { t: 'Gate 1: the facts', d: 'Before writing, every claim needs two sources. If it does not have them, it does not enter the script.' },
      { t: 'Gate 2: the script', d: 'The script is written with per-sentence timings, so you know how long each idea runs before generating anything.' },
      { t: 'Gate 3: the image list', d: 'Each image is anchored to the word the voice says at that moment. That way only what will be used is generated.' },
      { t: 'A single GPU batch', d: 'With all three gates passed, the GPU works once: images with Z-Image and local voice with Chatterbox.' },
      { t: 'Scenes in Remotion', d: 'The scenes are assembled in Remotion with Beta in 3D, the diagrams and the background montage.' },
      { t: 'Audio, render and cuts', d: 'The audio mix is set to −14 LUFS, rendered at 1080p and vertical 9:16 cuts are produced.' },
      { t: 'Deliverables and topic check', d: 'Each video closes with MP4, SRT, vertical clips, thumbnail and a description with sources, and a script checks that the topic is not repeated.' },
    ],
    concepts: [
      { t: 'Approval gate', d: 'A point in the flow where something must be reviewed and approved before moving on. Here they stop GPU being spent on a script that later needs redoing.' },
      { t: 'Remotion', d: 'A tool for creating video with React code: scenes are components and the render is reproducible.' },
      { t: 'LUFS', d: 'A unit of perceived loudness. −14 LUFS is a common reference level for video platforms.' },
      { t: 'Local TTS (Chatterbox)', d: 'Speech synthesis that runs on your own computer, with no external service or usage limits.' },
      { t: 'Image anchored to the word', d: 'Each background image is tied to the instant the voice says the word it illustrates.' },
    ],
    decisions: [
      { t: 'Verify before producing', d: 'Fixing a fact at the script stage costs a paragraph; fixing it with the video rendered costs hours.' },
      { t: 'One GPU block', d: 'Generating images and voice together, once, avoids reloading the model and waiting several times.' },
      { t: 'Slower backgrounds', d: 'Holding each background for 4 to 7 s instead of ~1.5 s cut the background images from 58 to 21 in one video. The fast rhythm now comes from the editing and the voice, not from switching images.' },
      { t: 'General-audience rules', d: 'Each video is checked against the content rules for a 7-to-15 audience before publishing.' },
    ],
    verified: [
      '22 videos produced with this flow; 3 approval gates.',
      'In video S10, background images dropped from 58 to 21 (−64 %) by holding each background for 4 to 7 s.',
    ],
    limits: [
      'It is a channel’s production flow, not a product: it depends on a local GPU, ComfyUI and Remotion.',
      'The image reduction (−64 %) is measured on one specific video (S10), not an average over the 22.',
      'This page does not include the scripts or the final videos.',
    ],
    next: [
      'Automate the two-sources-per-claim check with a per-topic source list.',
      'Measure total time per video and keep it as an indicator in the flow’s panel.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'El flujo con sus tres puertas', en: 'The flow and its three gates' },
      caption: {
        es: 'La GPU solo trabaja cuando las tres puertas están aprobadas. Cada video termina con un conjunto fijo de entregables.',
        en: 'The GPU only works once all three gates are approved. Each video ends with a fixed set of deliverables.',
      },
      nodes: [
        { id: 'g1', label: { es: 'Puerta 1', en: 'Gate 1' }, sub: { es: 'datos · 2 fuentes', en: 'facts · 2 sources' }, col: 0, row: 0, tone: 'amber' },
        { id: 'g2', label: { es: 'Puerta 2', en: 'Gate 2' }, sub: { es: 'guion con tiempos', en: 'timed script' }, col: 1, row: 0, tone: 'amber' },
        { id: 'g3', label: { es: 'Puerta 3', en: 'Gate 3' }, sub: { es: 'lista de imágenes', en: 'image list' }, col: 2, row: 0, tone: 'amber' },
        { id: 'gpu', label: { es: 'Tanda de GPU', en: 'GPU batch' }, sub: { es: 'imágenes + voz', en: 'images + voice' }, col: 3, row: 0, tone: 'emerald' },
        { id: 'rem', label: 'Remotion', sub: { es: 'Beta 3D · diagramas', en: 'Beta 3D · diagrams' }, col: 4, row: 0, tone: 'magenta' },
        { id: 'ent', label: { es: 'Entregables', en: 'Deliverables' }, sub: 'MP4 · SRT · 9:16', col: 4, row: 1 },
      ],
      edges: [
        { from: 'g1', to: 'g2' },
        { from: 'g2', to: 'g3' },
        { from: 'g3', to: 'gpu', label: { es: 'aprobado', en: 'approved' } },
        { from: 'gpu', to: 'rem' },
        { from: 'rem', to: 'ent', label: 'render' },
      ],
    },
    {
      kind: 'bars',
      placement: 'results',
      title: { es: 'Qué cambió al sostener cada fondo más tiempo', en: 'What changed by holding each background longer' },
      caption: {
        es: 'Medido en el video S10: imágenes de fondo generadas para el mismo video.',
        en: 'Measured on video S10: background images generated for the same video.',
      },
      rows: [
        {
          label: { es: 'Imágenes de fondo en el video S10', en: 'Background images in video S10' },
          items: [
            { label: { es: 'Fondos de ~1,5 s', en: '~1.5 s backgrounds' }, value: 58, text: '58', tone: 'magenta' },
            { label: { es: 'Fondos de 4–7 s', en: '4–7 s backgrounds' }, value: 21, text: '21', tone: 'emerald' },
          ],
        },
      ],
    },
  ],
}
