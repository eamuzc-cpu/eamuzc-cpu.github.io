export default {
  status: { es: 'Banco de trabajo personal en uso (GPU local)', en: 'Personal workbench in use (local GPU)' },
  related: ['axiom-2', 'beta-actualiza', 'asistente-pi-v3'],
  es: {
    lead: 'Un banco de trabajo local para generar imágenes y video con modelos abiertos en una GPU RTX, donde cada resultado queda guardado junto a su seed, modelo, LoRA, prompts y licencia. La imagen se puede repetir y se puede demostrar con qué modelos se hizo.',
    context: [
      'Generar con modelos locales produce imágenes que luego no se pueden repetir: se pierde qué seed, qué modelo, qué LoRA o qué prompt las originó. Además es fácil usar sin darse cuenta un modelo cuya licencia no permite uso comercial.',
      'Para trabajo con clientes, como fotos de producto con IA, hace falta poder reproducir una imagen y demostrar que se usaron modelos con licencia adecuada. Esa trazabilidad es lo que este proyecto resuelve.',
    ],
    how: [
      { t: 'Una bodega de workflows', d: 'Cada workflow de ComfyUI se guarda en formato UI, con un índice. Hay 44 registrados, así que repetir un flujo es abrir su archivo.' },
      { t: 'Notas de conocimiento', d: 'Junto a los workflows hay notas sobre los modelos y el equipo (qué corre bien en 16 GB de VRAM, qué parámetros funcionan).' },
      { t: 'Generar en la GPU local', d: 'La generación corre en ComfyUI sobre una GPU RTX de 16 GB, con modelos como Z-Image y Qwen-Image.' },
      { t: 'Leer el grafo desde el PNG', d: 'ComfyUI incrusta el grafo del workflow dentro de cada PNG. Un script en Python (registrar.py) lo lee de la propia imagen.' },
      { t: 'Registrar todo', d: 'registrar.py guarda modelos, LoRA, muestreo (seed, pasos, CFG, sampler), resolución, prompts, iluminación y licencia en un CSV y en un JSON junto a la imagen.' },
      { t: 'Bloquear lo no comercial', d: 'En modo de uso comercial, el registro se niega a guardar resultados hechos con modelos no comerciales (Qwen 2.1 y 4x-UltraSharp), para que no se cuelen en un trabajo para un cliente.' },
      { t: 'Un agente que opera el banco', d: 'Un agente especializado opera ComfyUI y mantiene el registro, de modo que anotar no depende de acordarse.' },
    ],
    concepts: [
      { t: 'Workflow de ComfyUI', d: 'Un grafo de nodos (cargar modelo, escribir prompt, muestrear, guardar) que describe por completo cómo se genera una imagen.' },
      { t: 'Seed', d: 'Número que inicializa el ruido aleatorio. Con la misma seed y los mismos parámetros, el mismo modelo reproduce la misma imagen.' },
      { t: 'LoRA', d: 'Pequeño añadido que modifica un modelo grande para dar un estilo o un sujeto concreto, sin reentrenarlo entero.' },
      { t: 'CFG y sampler', d: 'CFG es cuánto obedece el modelo al prompt; el sampler es el algoritmo que va quitando ruido paso a paso.' },
      { t: 'Licencia no comercial', d: 'Algunos modelos se pueden usar para probar pero no para vender el resultado. Usarlos sin darse cuenta es un riesgo legal.' },
    ],
    decisions: [
      { t: 'Registrar automáticamente', d: 'Una bitácora que hay que llenar a mano se abandona. Si el registro sale del propio PNG, siempre está al día.' },
      { t: 'Guardar al lado de la imagen', d: 'El JSON junto al archivo evita que la información se separe de la imagen cuando esta se copia o se mueve.' },
      { t: 'Que la licencia bloquee, no avise', d: 'Un aviso se ignora. En modo comercial el registro directamente no acepta modelos no comerciales.' },
      { t: 'Copias en formato UI', d: 'El formato UI se abre tal cual en ComfyUI y se puede ajustar a mano, no solo ejecutar.' },
    ],
    verified: [
      '44 workflows registrados en la bodega.',
      'Control de licencia comercial automático y 16 GB de VRAM de la GPU.',
    ],
    limits: [
      'Es una herramienta de uso personal que depende de una GPU local y de ComfyUI; no hay demo en el navegador.',
      'El bloqueo solo conoce los modelos que figuran como no comerciales en su lista; hay que mantener esa lista al día.',
      'La trazabilidad demuestra con qué se generó una imagen, no reemplaza revisar la licencia de un modelo nuevo.',
    ],
    next: [
      'Agregar al registro la huella (hash) de cada archivo de modelo para detectar versiones distintas con el mismo nombre.',
      'Generar una ficha por lote con las imágenes y sus datos para entregar al cliente.',
    ],
  },
  en: {
    lead: 'A local workbench to generate images and video with open models on an RTX GPU, where each result is stored with its seed, model, LoRA, prompts and licence. An image can be reproduced and you can show which models it was made with.',
    context: [
      'Generating with local models produces images that later cannot be repeated: what seed, model, LoRA or prompt created them gets lost. It is also easy to use, without noticing, a model whose licence does not allow commercial use.',
      'For client work, such as AI product photos, you need to be able to reproduce an image and show that suitably licensed models were used. That traceability is what this project solves.',
    ],
    how: [
      { t: 'A workflow vault', d: 'Each ComfyUI workflow is stored in UI format, with an index. There are 44 registered, so repeating a flow is just opening its file.' },
      { t: 'Knowledge notes', d: 'Alongside the workflows there are notes on models and hardware (what runs well on 16 GB of VRAM, which parameters work).' },
      { t: 'Generate on the local GPU', d: 'Generation runs in ComfyUI on a 16 GB RTX GPU, with models such as Z-Image and Qwen-Image.' },
      { t: 'Read the graph from the PNG', d: 'ComfyUI embeds the workflow graph inside each PNG. A Python script (registrar.py) reads it from the image itself.' },
      { t: 'Record everything', d: 'registrar.py saves models, LoRAs, sampling (seed, steps, CFG, sampler), resolution, prompts, lighting and licence in a CSV and a JSON next to the image.' },
      { t: 'Block non-commercial work', d: 'In commercial-use mode, the log refuses to record results made with non-commercial models (Qwen 2.1 and 4x-UltraSharp), so they do not slip into client work.' },
      { t: 'An agent that runs the bench', d: 'A specialised agent operates ComfyUI and maintains the log, so recording does not depend on remembering to do it.' },
    ],
    concepts: [
      { t: 'ComfyUI workflow', d: 'A node graph (load model, write prompt, sample, save) that fully describes how an image is generated.' },
      { t: 'Seed', d: 'A number that initialises the random noise. With the same seed and parameters, the same model reproduces the same image.' },
      { t: 'LoRA', d: 'A small add-on that modifies a large model to give a specific style or subject, without retraining the whole thing.' },
      { t: 'CFG and sampler', d: 'CFG is how closely the model obeys the prompt; the sampler is the algorithm that removes noise step by step.' },
      { t: 'Non-commercial licence', d: 'Some models can be used for testing but not to sell the result. Using them unknowingly is a legal risk.' },
    ],
    decisions: [
      { t: 'Record automatically', d: 'A log that must be filled in by hand gets abandoned. If the record comes from the PNG itself, it is always up to date.' },
      { t: 'Store next to the image', d: 'The JSON beside the file stops the information separating from the image when it is copied or moved.' },
      { t: 'Make the licence block, not warn', d: 'A warning gets ignored. In commercial mode the log simply does not accept non-commercial models.' },
      { t: 'Copies in UI format', d: 'The UI format opens as-is in ComfyUI and can be tweaked by hand, not just executed.' },
    ],
    verified: [
      '44 workflows registered in the vault.',
      'Automatic commercial-licence control and the GPU’s 16 GB of VRAM.',
    ],
    limits: [
      'It is a personal tool that depends on a local GPU and ComfyUI; there is no browser demo.',
      'The block only knows the models listed as non-commercial in its list; that list has to be kept up to date.',
      'Traceability shows what an image was generated with; it does not replace checking the licence of a new model.',
    ],
    next: [
      'Add each model file’s hash to the record to detect different versions with the same name.',
      'Generate a per-batch sheet with images and their data to hand to the client.',
    ],
  },
  diagrams: [
    {
      kind: 'graph',
      placement: 'how-top',
      title: { es: 'Del workflow al registro', en: 'From workflow to record' },
      caption: {
        es: 'El registro sale de la propia imagen y se guarda a su lado. En modo comercial, un modelo no comercial bloquea el registro antes de que llegue a un entregable.',
        en: 'The record comes from the image itself and is stored next to it. In commercial mode, a non-commercial model blocks the record before it reaches a deliverable.',
      },
      nodes: [
        { id: 'wf', label: 'Workflow', sub: 'ComfyUI', col: 0, row: 0 },
        { id: 'gen', label: { es: 'Generación', en: 'Generation' }, sub: { es: 'GPU local 16 GB', en: 'local GPU 16 GB' }, col: 1, row: 0, tone: 'emerald' },
        { id: 'reg', label: 'registrar.py', sub: { es: 'lee el grafo', en: 'reads the graph' }, col: 2, row: 0, tone: 'magenta' },
        { id: 'out', label: { es: 'Registro', en: 'Record' }, sub: 'CSV · JSON', col: 3, row: 0 },
        { id: 'lic', label: { es: 'Control de licencia', en: 'Licence check' }, sub: { es: 'bloquea no comerciales', en: 'blocks non-commercial' }, col: 2, row: 1, tone: 'amber' },
      ],
      edges: [
        { from: 'wf', to: 'gen' },
        { from: 'gen', to: 'reg', label: 'PNG' },
        { from: 'reg', to: 'out' },
        { from: 'reg', to: 'lic', label: { es: 'modo comercial', en: 'commercial mode' } },
        { from: 'out', to: 'wf', loopTop: true, dashed: true, label: { es: 'repetir con la misma seed', en: 'repeat with the same seed' } },
      ],
    },
  ],
}
