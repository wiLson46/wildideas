---
name: WildIdeas
description: >
  Contexto completo del portfolio "Wild Ideas" (e:\wild ideas): qué es, reglas de negocio,
  arquitectura de archivos, stack técnico, design system completo (colores, tipografía,
  espaciado, radii, sombras, borders, motion), sistema de work items, copy bilingüe,
  primitivos React, sistema de Tweaks, breakpoints responsivos y patrones de desarrollo.
  Usar cuando se quiera crear, modificar o extender cualquier parte de Wild Ideas
  sin tener que re-explorar el código.
---

# Wild Ideas — Documentación completa del portfolio

## ¿Qué es Wild Ideas?

Portfolio/site de un estudio freelance llamado **Wild Ideas**, fundado en 2025, con base en Lisboa.
Contacto público: **hi@wildideas.io**. El sitio muestra tres proyectos seleccionados, un bloque de
contacto y un pie con links sociales. Es bilingüe (EN / ES) y soporta dark/light mode.

No es un blog ni un e-commerce. Es una vitrina de trabajo con una sección de contacto funcional
(formulario — actualmente solo UI, sin backend real de envío).

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| UI framework | React 18.3.1 (CDN, UMD build) |
| Transpilación JSX | Babel Standalone 7.29.0 (CDN, en runtime) |
| Estilos | CSS Variables + inline `style={{}}` en React |
| Fuentes | Comfortaa (variable, TTF self-hosted), Space Mono (Bold + Regular, TTF self-hosted) |
| Animaciones | CSS transitions + IntersectionObserver + requestAnimationFrame |
| Build step | **Ninguno** — los `.jsx` se transpilan en el browser |

**No hay bundler, no hay npm, no hay node_modules.** Los archivos se sirven directamente como estáticos.

---

## Arquitectura de archivos

```
e:\wild ideas\
├── Wild Ideas.html          # Entrada única: carga scripts, define WORK_ITEMS, COPY, DEFAULTS y App
├── src/
│   ├── Primitives.jsx       # LogoMark, MagneticButton, Icon, Reveal
│   ├── Marquee.jsx          # MarqueeRow, MarqueeBand
│   ├── Sections.jsx         # Nav, ThemePill, LanguagePill, Hero, Work, WorkCard, Contact, Footer, ContactPanel
│   └── Tweaks.jsx           # TWEAK_CONTROLS, TweaksHost
└── assets/
    ├── colors_and_type.css  # TODOS los design tokens (colores, tipo, espaciado, radii, sombras, easing)
    ├── logo.svg             # Logo completo (dark)
    ├── logo-red.svg         # Logo rojo
    └── fonts/
        ├── Comfortaa-VariableFont_wght.ttf
        ├── SpaceMono-Regular.ttf
        └── SpaceMono-Bold.ttf
```

**Orden de carga de scripts (importa — cada archivo expone sus componentes via `Object.assign(window, {...})`)**:
1. `Primitives.jsx` — base (LogoMark, etc.)
2. `Marquee.jsx` — usa nada de Primitives
3. `Sections.jsx` — usa LogoMark, MagneticButton, Icon, Reveal, MarqueeBand
4. `Tweaks.jsx` — usa Icon
5. Script inline en el HTML — define WORK_ITEMS, COPY, DEFAULTS, App y llama a `ReactDOM.createRoot`

---

## Datos de trabajo — WORK_ITEMS

Definido en el script inline de `Wild Ideas.html`. Es un objeto `{ en: [...], es: [...] }`.
Siempre mantener ambas versiones sincronizadas (mismo orden, mismo `id`).

### Campos de cada item

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único, usado como `key` de React |
| `client` | string | Nombre del cliente (se muestra en el footer de la card) |
| `year` | string | Año o estado ("2025 - WiP", "2024", etc.) |
| `title` | string | Descripción corta / ángulo del proyecto. Texto del `<h3>` de la card |
| `outcome` | string | Resultado/entregables. Texto del `<p>` muted de la card |
| `discipline` | string | Categoría ("Web", "WebApp", "Web / Type", "Undisclosed", etc.) |
| `motif` | `'W'` \| `'type'` \| `'grid'` | Elemento visual del cover de la card |
| `motifText` | string? | Solo para `motif: 'type'` — el carácter/texto a renderizar |
| `motifColor` | string | Color CSS del motif (hex, rgba…) |
| `cover` | string | CSS background del cover (color sólido, gradiente CSS) |
| `href` | string? | URL del proyecto (si existe link externo) |

### Comportamiento de los motifs

- **`'W'`**: Renderiza `<LogoMark>` al 60% del ancho del cover, en `motifColor`. Hace scale + rotate en hover.
- **`'type'`**: Renderiza `motifText` en tipografía display gigante (`clamp(100px, 20vw, 180px)`), en `motifColor`.
- **`'grid'`**: Renderiza un CSS grid pattern (dos `linear-gradient` perpendiculares) en `motifColor`.

### Añadir un item nuevo

Agregar en **ambos** `WORK_ITEMS.en` y `WORK_ITEMS.es` con el mismo `id`. El grid es siempre los primeros N items del array.

```js
// En WORK_ITEMS.en y WORK_ITEMS.es (mismo id, misma posición):
{
  id: 'NuevoProyecto',
  client: 'Cliente',
  year: '2026',
  title: 'Una frase que captura el ángulo del proyecto.',
  outcome: 'El resultado concreto o la cosa sorprendente del stack.',
  discipline: 'Web',           // o 'WebApp', 'Brand', etc.
  motif: 'W',                  // 'W' | 'type' | 'grid'
  motifColor: '#F8F5EF',
  cover: 'linear-gradient(135deg, #3F3250 0%, #22252C 100%)',
  // href: 'https://...'       // opcional
}
```

---

## Copy bilingüe — COPY

Objeto `{ en: {...}, es: {...} }` en el script inline. Contiene todos los strings de la UI.

```
navWork, navContact           — links del nav
heroEyebrow                   — "Est. 2025" / "Desde 2025"
scroll                        — label del cue de scroll
workEyebrow                   — "Selected work"
workHeadline                  — array de 3 partes: [antes, acento rojo, después]
contactEyebrow                — "Let's talk"
contactHeadline               — array de 3 partes del titular del bloque contact
contactCopy                   — párrafo descriptivo del contact
startProject                  — CTA del botón
formTitle, formEyebrow        — encabezado del panel de contacto
fName, fEmail, fMsg           — placeholders del formulario
send                          — label del botón de envío
got, gotSub                   — confirmación post-envío
footer                        — ciudad en el footer ("Lisbon" / "Lisboa")
```

Para añadir un string nuevo: añadir la key en `COPY.en` **y** `COPY.es`. El componente lo consume como `t?.clave`.

---

## Tweaks — sistema de edición en vivo

`DEFAULTS` (en el script inline) controla los valores por defecto del panel de tweaks:

```js
const DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#E14658",    // color del acento — se aplica como --wi-red en runtime
  "marqueeSpeed": 20,     // duración en segundos de la animación del marquee
  "logoScale": 0.6,       // escala del W gigante en el hero (0.5–1.3)
  "marqueeOn": true       // muestra/oculta el marquee en el hero
}/*EDITMODE-END*/;
```

Los marcadores `/*EDITMODE-BEGIN*/` y `/*EDITMODE-END*/` permiten a una herramienta externa (padre iframe)
parsear y reescribir el objeto de defaults. **No eliminar.**

El `TweaksHost` escucha `postMessage`:
- Activa con `{ type: '__activate_edit_mode' }`
- Desactiva con `{ type: '__deactivate_edit_mode' }`
- Reporta al padre con `{ type: '__edit_mode_available' }` y `{ type: '__edit_mode_set_keys', edits: {...} }`

El panel solo se muestra cuando está activo (incrustado como iframe en una herramienta de diseño).
En uso normal en browser no aparece.

---

## Design System — `assets/colors_and_type.css`

Esta es la **única fuente de verdad** de tokens. Nunca hardcodear valores que estén aquí.

### Paleta de marca

| Variable | Valor | Uso |
|----------|-------|-----|
| `--wi-red` | `#E14658` | Acento principal. **Se sobreescribe en runtime** via `tweaks.accent` |
| `--wi-ink` | `#22252C` | Near-black, base oscura |
| `--wi-plum` | `#3F3250` | Secundario, premium/considerado |
| `--wi-sand` | `#C0B3A0` | Neutro cálido |

Tints disponibles: `--wi-red-{600,400,200,50}`, `--wi-ink-{900,700,500,300}`, `--wi-plum-{600,400,200}`, `--wi-sand-{400,200,100,50}`.

### Tokens semánticos (light mode por defecto)

```
--wi-bg          → --wi-sand-50  (#F8F5EF)
--wi-bg-alt      → --wi-sand-100 (#F1ECE2)
--wi-surface     → #FFFFFF
--wi-fg          → --wi-ink
--wi-fg-2        → --wi-ink-500
--wi-fg-3        → --wi-ink-300
--wi-border      → rgba(34,37,44,0.12)
--wi-border-2    → rgba(34,37,44,0.24)
--wi-accent      → --wi-red
```

Dark mode: aplicado via `[data-theme="dark"]` en `<html>`. Sobreescribe las variables semánticas.
El atributo lo gestiona `useTheme()`, persistido en `localStorage('wi-theme')`.

### Tipografía

```
--wi-font-display: 'Comfortaa', ui-rounded, ...   (headings, botones, logo text)
--wi-font-body:    'Comfortaa', ui-rounded, ...   (igual que display — misma fuente)
--wi-font-mono:    'Space Mono', ui-monospace, ... (eyebrows, labels, nav links, año)
```

Escala de tipo: `--wi-t-display` (72px) → `--wi-t-h1` (56) → `--wi-t-h2` (40) → `--wi-t-h3` (28) → `--wi-t-h4` (20) → `--wi-t-body` (16) → `--wi-t-small` (14) → `--wi-t-micro` (12).

Line heights: `--wi-lh-tight` (1.05) · `--wi-lh-snug` (1.2) · `--wi-lh-normal` (1.5) · `--wi-lh-loose` (1.7).

Letter spacing: `--wi-ls-tight` (-0.02em) · `--wi-ls-normal` (0) · `--wi-ls-wide` (0.08em, mono eyebrows) · `--wi-ls-caps` (0.14em, all-caps labels).

### Espaciado (grid de 4px)

`--wi-space-1` (4px) → `--wi-space-10` (128px). Usar siempre estas variables, no valores arbitrarios.

### Radios

`--wi-r-xs` (6px) → `--wi-r-sm` (10) → `--wi-r-md` (16) → `--wi-r-lg` (24) → `--wi-r-xl` (32) → `--wi-r-2xl` (48) → `--wi-r-pill` (999px).

### Border widths

```
--wi-bw-hair:  1px     (separadores sutiles)
--wi-bw-thin:  1.5px   (borders de inputs)
--wi-bw-med:   2px     (strokes de botones)
--wi-bw-thick: 3px     (divisores fuertes)
```

### Sombras

```
--wi-shadow-sm      → sutil, para elementos en reposo
--wi-shadow-md      → cards, panels
--wi-shadow-lg      → modals, overlays
--wi-shadow-pop     → 0 10px 0 0 var(--wi-ink)  ("stamped" offset, marca de estilo)
--wi-shadow-pop-red → idem en rojo
```

En dark mode `--wi-shadow-pop` se invierte a `0 10px 0 0 #F1ECE2`.

### Motion easings

```
--wi-ease:        cubic-bezier(.22,.61,.36,1)    — general
--wi-ease-out:    cubic-bezier(.16,1,.3,1)        — entradas (la más usada en el código)
--wi-ease-bounce: cubic-bezier(.34,1.56,.64,1)   — pills, toggles, elementos con spring
--wi-dur-fast: 120ms | --wi-dur-base: 220ms | --wi-dur-slow: 420ms
```

### Clases utilitarias (definidas en colors_and_type.css)

`.wi-display`, `.wi-h1`–`.wi-h4`, `.wi-body`, `.wi-small`, `.wi-eyebrow`, `.wi-code`, `.wi-hl` (rojo), `.wi-hl-plum`, `.wi-marker` (highlight rojo bajo el texto).

---

## Breakpoints responsivos

Definidos en el `<style>` del HTML principal (no en el CSS externo):

```
> 960px   → Work grid de 3 columnas
640–960px → Work grid de 2 columnas · nav logo-text visible
< 640px   → Work grid de 1 columna · nav logo-text oculto (display:none en .wi-nav-logo-text)
< 380px   → Marquee animation-duration forzada a 60s (evita motion sickness en pantallas chicas)
```

Se usa `clamp()` extensivamente en hero, contact y cards para tamaños de fuente y padding.

---

## Hook `useTheme()`

Definido en el script inline de `Wild Ideas.html`.

```js
function useTheme() {
  // Inicializa desde localStorage o prefers-color-scheme del SO
  const [theme, setTheme] = React.useState(
    localStorage.getItem('wi-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('wi-theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
```

La key de localStorage es `'wi-theme'`. El idioma usa `'wi-lang'`.

---

## Componentes — Primitives.jsx

### `LogoMark`

SVG del logo W de Wild Ideas. 3 polígonos: `main` (el W completo), `left` y `right` (triángulos decorativos).

Props:
- `size` — px o "100%"
- `color` — color CSS (default: `currentColor`)
- `animated` — entry animation (los polígonos vuelan a posición desde fuera). Usa doble rAF.
- `hoverable` — en hover, los polígonos `left` y `right` se separan con spring

### `MagneticButton`

Botón con cursor-following translate magnético. Variantes: `primary` (rojo, sombra stamped), `outline`, `dark`.
El `strength` prop controla la intensidad del efecto (default 14).

### `Icon`

SVG inline. Íconos disponibles: `arrow-right`, `arrow-up-right`, `sun`, `moon`, `mail`, `x`.
Para añadir un ícono nuevo, agregar el path en el objeto `paths` dentro del componente.

### `Reveal`

Wrapper de fade-up en scroll via IntersectionObserver (threshold 0.12, rootMargin bottom -40px).
Props: `delay` (ms), `style`. Se dispara una sola vez (desconecta el observer al hacerse visible).

---

## Componentes — Sections.jsx

### `Nav`

Pill flotante fija (`position: fixed`). Glassmorphism via `backdrop-filter: blur(14px)` + `color-mix`.
Se vuelve más opaca al hacer scroll (`scrollY > 20`). Contiene: logo, links Work/Contact, LanguagePill, ThemePill.

### `ThemePill` / `LanguagePill`

Toggle pills con sliding thumb animado (spring bounce). Persisten en localStorage.

### `Hero`

Sección full-viewport. El W gigante es un `LogoMark` con `animated`. Tiene parallax suave en mouse move (±10px).
El marquee overlay usa `mixBlendMode: 'difference'` para que funcione tanto en light como dark.

### `WorkCard`

Card de proyecto con:
- Cover 5:4 con motif (W, type o grid)
- Badge de índice (01, 02…) en top-left
- Body: eyebrow (discipline / year), h3 (title), p muted (outcome), footer (client + "View →")
- En hover: `translateY(-8px)`, sombra stamped más alta (0 14px 0 0)

### `Work`

Grid de cards. CSS grid de 3 columnas, responsivo via clases en `<style>` del HTML:
- `> 960px`: 3 columnas
- `640–960px`: 2 columnas
- `< 640px`: 1 columna

### `Contact`

Panel oscuro (`background: var(--wi-fg)`) con animated color blobs (CSS keyframes: `wi-blob-a`, `wi-blob-b`, `wi-blob-c`).
Scrim semitransparente para mantener el texto legible sobre los blobs. Botón primary + link mailto (`hi@wildideas.io`).
`@media (prefers-reduced-motion: reduce)` deshabilita las animaciones de blobs con `animation: none !important`.

### `ContactPanel`

Modal con overlay blur. Formulario de 3 campos (nombre, email, mensaje). Submit → estado "sent" con LogoMark animado.
**No hay backend real.** El `onSubmit` previene el default y setea `sent: true`.

### `Footer`

Links: Are.na, Github, Read.cv, Email. Logo + copyright + ciudad.

---

## Componentes — Marquee.jsx

### `MarqueeBand`

Dos filas de "WILD IDEAS" en loop (`wi-mq-left` / `wi-mq-right`). Modo `overlay`: sin fondo ni bordes,
usado en el Hero con `mixBlendMode: 'difference'`. Modo normal: fondo `--wi-bg-alt`, con bordes.

---

## Patrones de desarrollo

### Estilos

**Todo el styling es inline via `style={{}}`** — no hay CSS modules ni clases de Tailwind.
Las únicas excepciones son:
1. Clases responsivas del grid (`wi-work-grid`) definidas en el `<style>` del HTML
2. Clases de animación CSS (`wi-mq-left`, `wi-mq-right`, `wi-blob`, `wi-blob-a/b/c`) definidas en el `<style>` del HTML
3. Clases utilitarias de `colors_and_type.css` (`.wi-eyebrow`, etc.)

**Regla**: si el valor es dinámico o depende de props → `style={{}}`. Si es estructural/animación → CSS class.

### Añadir nueva sección

1. Crear el componente en `Sections.jsx`
2. Exportarlo en el `Object.assign(window, {...})` al final del archivo
3. Instanciarlo en el `App()` del script inline del HTML
4. Si tiene copy bilingüe, añadir strings en `COPY.en` y `COPY.es`

### No hay rutas

Es una Single Page sin router. La navegación es via anchor hash (`#top`, `#work`, `#contact`).
Smooth scroll habilitado en CSS (`scroll-behavior: smooth`).

### Accesibilidad / responsive

- Texto del logo en nav oculto en mobile (`wi-nav-logo-text` → `display: none` en ≤640px)
- `clamp()` en casi todos los tamaños de fuente y padding del hero/contact
- `prefers-reduced-motion` deshabilita los blobs de contact (`animation: none !important`)
- `aria-label` en todos los botones icon-only
- `lang` del documento no se actualiza dinámicamente al cambiar idioma (mejora potencial)

---

## Reglas críticas para colaborar con IA

1. **No re-explorar el stack.** Confiar en este archivo. Si algo aquí conflictúa con el código, actualizar este archivo.
2. **El único CSS externo a inline styles es `colors_and_type.css`.** Todos los tokens nuevos van ahí.
3. **Cambios de copy** → editar `COPY.en` y `COPY.es` en el script inline del HTML.
4. **Cambios de work items** → editar `WORK_ITEMS.en` y `WORK_ITEMS.es` en el script inline del HTML. Siempre ambos.
5. **Componentes nuevos** → van en el `.jsx` correspondiente + exportados en `Object.assign(window, {...})`.
6. **No hay build.** Editar los `.jsx` directamente. El browser los transpila.
7. **El accent color (`--wi-red`) es la única variable CSS sobreescrita en runtime** (via `tweaks.accent`). El resto solo cambia entre light/dark via el selector `[data-theme="dark"]`.
8. **Para íconos nuevos**: agregar el path SVG al objeto `paths` en `Icon` dentro de `Primitives.jsx`.
9. **`DEFAULTS` tiene marcadores `/*EDITMODE-BEGIN*/` y `/*EDITMODE-END*/`.** No eliminar ni mover.
10. **El formulario de contacto no tiene backend.** Si se implementa envío real, conectar en `ContactPanel.onSubmit`.
