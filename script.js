/* =========================================================
   BIRTHDAY GIFT

   Archivo encargado de:
   File responsible for:
   - Generar las estrellas del fondo.
   - Generate the starfield background.
   - Animar el título pixelado letra por letra.
   - Animate the pixelated title letter by letter.
   - Cambiar entre pantallas.
   - Switch between screens.
   - Mostrar las memorias GIF.
   - Display the memory GIFs.
   - Administrar mensajes cortos de estado.
   - Manage short status messages.
   ========================================================= */

const screens = {
  inicio: document.getElementById("inicio"),
  memories: document.getElementById("memories"),
  letter: document.getElementById("letter"),
};

const starfield = document.querySelector(".starfield");
const heroTitle = document.getElementById("heroTitle");
const startBtn = document.querySelector('[data-action="start"]');
const nextMemoryBtn = document.getElementById("nextMemoryBtn");
const replayBtn = document.getElementById("replayBtn");
const toast = document.getElementById("toast");
const memoriesTitle = document.getElementById("memoriesTitle");
const progressFill = document.getElementById("progressFill");
const memoryFileLabel = document.getElementById("memoryFileLabel");
const memoryQuote = document.getElementById("memoryQuote");
const memoryWrap = document.querySelector(".memory-media-wrap");
const memoryImage = document.getElementById("memoryImage");

/*
  Aquí puedes cambiar fácilmente las imágenes GIF.
  Solo sustituye las rutas por tus archivos:
  - assets/hero.gif
  - assets/memory-1.jpeg
  - assets/memory-2.gif
  - assets/memory-3.gif
  - assets/letter.gif

  Si cambias los nombres, solo actualiza las rutas en este arreglo
  y en el HTML.
  
  You can easily change the GIF images here.
  Just replace the paths with your files:
  - assets/hero.gif
  - assets/memory-1.jpeg
  - assets/memory-2.gif
  - assets/memory-3.gif
  - assets/letter.gif

  If you change the file names, update the paths in this array
  and in the HTML.
*/
const memories = [
  {
    title: "Memory 1 of 3",
    file: "MEMORY_01.GIF",
    quote: '"Haces que cada momento sea especial, incluso los más simples."',
    src: "assets/memory-1.jpeg",
    alt: "GIF de la primera memoria"
  },
  {
    title: "Memory 2 of 3",
    file: "MEMORY_02.GIF",
    quote: '"Que solo cosas buenas te pasen, hoy y siempre"',
    src: "assets/memory-2.gif",
    alt: "GIF de la segunda memoria"
  },
  {
    title: "Memory 3 of 3",
    file: "MEMORY_03.GIF",
    quote: '"Espero que este año te traiga paz, confianza y momentos que te recuerden lo amad que eres."',
    src: "assets/memory-3.gif",
    alt: "GIF de la tercera memoria"
  }
];

let currentMemoryIndex = 0;
let typewriterIndex = 0;
let typewriterTimer = null;
let toastTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function showScreen(screenId) {
  Object.entries(screens).forEach(([key, element]) => {
    element.classList.toggle("active", key === screenId);
  });

  screens[screenId].scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildFallbackCard() {
  const fallback = document.createElement("div");
  fallback.className = "memory-placeholder";
  fallback.innerHTML = `
    <div>
      <strong>GIF no encontrado</strong>
      <span>Coloca tu archivo en <code>assets/</code> y actualiza la ruta en <code>script.js</code>.</span>
    </div>
  `;
  return fallback;
}

function ensureMemoryImage() {
  let image = document.getElementById("memoryImage");

  if (image) return image;

  memoryWrap.innerHTML = "";
  image = document.createElement("img");
  image.id = "memoryImage";
  image.className = "memory-image";
  image.loading = "eager";
  memoryWrap.appendChild(image);
  return image;
}

function renderMemory(index) {
  const memory = memories[index];
  currentMemoryIndex = index;

  memoriesTitle.textContent = memory.title;
  memoryFileLabel.textContent = memory.file;
  memoryQuote.textContent = memory.quote;
  progressFill.style.width = `${((index + 1) / memories.length) * 100}%`;

  const image = ensureMemoryImage();
  image.src = memory.src;
  image.alt = memory.alt;
  image.dataset.fallbackApplied = "false";
  image.onerror = () => {
    if (image.dataset.fallbackApplied === "true") return;
    image.dataset.fallbackApplied = "true";
    const fallback = buildFallbackCard();
    image.replaceWith(fallback);
  };

  showToast(memory.title);
}

function goToNextMemory() {
  if (currentMemoryIndex < memories.length - 1) {
    renderMemory(currentMemoryIndex + 1);
    if (currentMemoryIndex === memories.length - 1) {
      nextMemoryBtn.textContent = "READ LETTER";
    }
    return;
  }

  showScreen("letter");
  showToast("Abriendo la carta...");
}

function replayExperience() {
  nextMemoryBtn.textContent = "NEXT MEMORY";
  renderMemory(0);
  showScreen("inicio");
  showToast("Reiniciando experiencia");
}

function createStars(count = 80) {
  const sizes = [2, 3, 4, 5, 6, 7, 8];
  const colors = ["#dfb7cd", "#ffd7d7", "#f5b2de", "#f5d9a4", "#d9f1ff"];

  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    star.className = `star ${Math.random() > 0.55 ? "twinkle" : ""}`.trim();

    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * 100;
    const duration = 8 + Math.random() * 10;
    const delay = -(Math.random() * duration);
    const drift = `${-20 + Math.random() * 40}vw`;
    const opacity = 0.25 + Math.random() * 0.65;

    star.style.setProperty("--size", `${size}px`);
    star.style.setProperty("--shine", color);
    star.style.setProperty("--x", `${x}vw`);
    star.style.setProperty("--duration", `${duration}s`);
    star.style.setProperty("--delay", `${delay}s`);
    star.style.setProperty("--drift", drift);
    star.style.setProperty("--opacity", opacity.toFixed(2));

    starfield.appendChild(star);
  }
}

function typeWriterEffect() {
  const text = heroTitle.dataset.text || heroTitle.textContent.trim();
  heroTitle.textContent = "";
  heroTitle.classList.add("typing");
  typewriterIndex = 0;

  clearTimeout(typewriterTimer);

  const write = () => {
    heroTitle.textContent = text.slice(0, typewriterIndex + 1);
    typewriterIndex += 1;

    if (typewriterIndex < text.length) {
      typewriterTimer = setTimeout(write, 95);
    } else {
      heroTitle.classList.remove("typing");
    }
  };

  write();
}

/* ========================================= */
/* LLUVIA DE GIFS EN EL BACKGROUND */
/* GIF RAIN IN THE BACKGROUND */
/* ========================================= */

// Contenedor donde caerán los GIFs
// Container where the GIFs will fall
const gifRainContainer = document.querySelector(".gif-rain-container");

/*
    FUNCIÓN:
    Crea múltiples GIFs cayendo
    
    FUNCTION:
    Creates multiple falling GIFs
*/
function createGifRain() {

    // Cantidad de GIFs simultáneos
    const totalGifs = 25;

    for (let i = 0; i < totalGifs; i++) {

        // Crear imagen
        const gif = document.createElement("img");

        // Ruta del GIF
        gif.src = "assets/falling.gif";

        // Clase CSS
        gif.classList.add("falling-gif");

        /*
            POSICIÓN HORIZONTAL ALEATORIA
        */
        gif.style.left = Math.random() * 100 + "vw";

        /*
            TAMAÑO ALEATORIO
            ENTRE 40px Y 120px
        */
        const size = Math.random() * 80 + 40;

        gif.style.width = size + "px";

        /*
            DURACIÓN ALEATORIA
            ENTRE 6 Y 15 SEGUNDOS
        */
        const duration = Math.random() * 9 + 6;

        gif.style.animationDuration = duration + "s";

        /*
            DELAY ALEATORIO
            PARA QUE NO CAIGAN TODAS JUNTAS
        */
        gif.style.animationDelay = Math.random() * 5 + "s";

        /*
            OPACIDAD ALEATORIA
            RANDOM OPACITY
        */
        gif.style.opacity = Math.random() * 0.5 + 0.4;

        // Agregar al contenedor
        // Add to the container
        gifRainContainer.appendChild(gif);
    }
}

// Inicializar lluvia
// Initialize GIF rain
createGifRain();

// Eventos principales
// Main event listeners
startBtn.addEventListener("click", () => {
  renderMemory(0);
  showScreen("memories");
});

nextMemoryBtn.addEventListener("click", goToNextMemory);
replayBtn.addEventListener("click", replayExperience);

// Inicialización
// Initialization
createStars(90);
typeWriterEffect();
renderMemory(0);
