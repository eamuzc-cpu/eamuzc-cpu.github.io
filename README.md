# Portafolio · Esteban Alexander Muñoz Cáceres

Ingeniero Civil Electrónico · automatización industrial, instrumentación y software.
Sitio: **https://eamuzc-cpu.github.io/**

Casos de estudio de automatización y mantenimiento, proyectos de software y visión artificial, nueve simulaciones
interactivas de automatización industrial y un laboratorio de fractales, en español e inglés.

## Stack
React 18 · Vite 6 · Tailwind CSS 4 · framer-motion · lucide-react. Sin backend: es un sitio estático.

## Ejecutarlo
```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # genera dist/
```

## Dónde está el contenido
Todo el texto sale de archivos de datos con `{ es, en }`; para agregar un proyecto basta añadir un objeto:

| Archivo | Contenido |
|---|---|
| `src/data/projects.js` | proyectos (portada, demo embebida, métricas, diagrama) |
| `src/data/profile.js` | perfil, experiencia, grupos de habilidades |
| `src/data/ui.js` | textos de la interfaz |
| `public/demos/<proyecto>/index.html` | simulaciones de un solo archivo, sin dependencias externas |
| `public/cv-es.pdf`, `public/cv-en.pdf` | currículum (generado desde los mismos datos) |

## Publicación
Cada `push` a `main` compila el sitio y lo publica en GitHub Pages con
`.github/workflows/deploy.yml` (en *Settings → Pages* la fuente debe ser **GitHub Actions**).

## Sobre el contenido
- Las simulaciones (`public/demos/`) son sistemas **simulados** inspirados en trabajo real; llevan marca de agua y no
  son mediciones de una planta.
- Varias portadas y retratos están **generados con IA** y son ilustrativos.

© Esteban Alexander Muñoz Cáceres. Todos los derechos reservados.
