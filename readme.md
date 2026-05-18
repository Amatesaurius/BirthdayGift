# Birthday Gift

Página web estática tipo tarjeta interactiva para cumpleaños.
Static interactive birthday card web page.

El proyecto incluye:
The project includes:

- Pantalla de inicio con GIF principal.
- Start screen with main GIF.

- Título con efecto máquina de escribir.
- Title with typewriter effect.

- Tres memorias con GIFs intercambiables.
- Three memories with interchangeable GIFs.

- Carta final con un GIF pequeño decorativo.
- Final letter with a small decorative GIF.

- Fondo animado con estrellas en cascada.
- Animated background with falling stars.

- Diseño responsive para móvil y escritorio.
- Responsive design for mobile and desktop.

## Estructura del proyecto

- `index.html`: estructura principal de la experiencia.
- `index.html`: main structure of the experience.

- `style.css`: estilos visuales, responsive y animaciones.
- `style.css`: visual styles, responsive layout, and animations.

- `script.js`: lógica de navegación, estrellas, memorias y efecto de escritura.
- `script.js`: navigation logic, stars, memories, and typing effect.

- `assets/`: carpeta donde debes colocar los 5 GIF.
- `assets/`: folder where you should place the 5 GIFs.

## GIF que debes agregar

Coloca estos archivos dentro de `assets/`:
Place these files inside `assets/`:

- `hero.gif` → GIF principal del inicio.
- `hero.gif` → main GIF for the intro.

- `memory-1.gif` → primera memoria.
- `memory-1.gif` → first memory.

- `memory-2.gif` → segunda memoria.
- `memory-2.gif` → second memory.

- `memory-3.gif` → tercera memoria.
- `memory-3.gif` → third memory.

- `letter.gif` → GIF pequeño de la carta.
- `letter.gif` → small GIF for the letter.

Si usas otros nombres, también debes cambiar las rutas dentro de `index.html` y `script.js`.
If you use different file names, you should also update the paths in `index.html` and `script.js`.

## Cómo abrirlo en Visual Studio Code

1. Abre la carpeta del proyecto en VS Code.
1. Open the project folder in VS Code.

2. Coloca los GIF en la carpeta `assets/`.
2. Place the GIFs in the `assets/` folder.

3. Abre `index.html` con Live Server o con un servidor local similar.
3. Open `index.html` with Live Server or a similar local server.

4. Interactúa con los botones para avanzar entre las pantallas.
4. Interact with the buttons to move through the screens.

## Qué modifica cada archivo

### `index.html`
Controla la estructura de la página: inicio, memorias y carta.
Controls the page structure: intro, memories, and letter.

### `style.css`
Controla colores, tipografía, distribución, tarjetas, fondos, responsive y animaciones visuales.
Controls colors, typography, layout, cards, background, responsive behavior, and visual animations.

### `script.js`
Controla:
Controls:

- el fondo de estrellas,
- the star background,

- el efecto de máquina de escribir,
- the typewriter effect,

- el cambio entre pantallas,
- the screen transitions,

- la carga de los GIF,
- GIF loading,

- y los mensajes emergentes.
- and toast messages.

## Sugerencias de edición

- Para cambiar el título, edita `data-text` en el `h1` del inicio.
- To change the title, edit `data-text` on the intro `h1`.

- Para cambiar los GIF, reemplaza los archivos en `assets/`.
- To change the GIFs, replace the files in `assets/`.

- Para cambiar los textos de las memorias, edita el arreglo `memories` en `script.js`.
- To change the memory texts, edit the `memories` array in `script.js`.

- Para modificar colores o tamaños, revisa las variables CSS en `:root`.
- To modify colors or sizes, check the CSS variables in `:root`.

## Nota

El proyecto no requiere backend. Todo funciona del lado del navegador.
The project does not require a backend. Everything runs in the browser.
