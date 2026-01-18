/* ============================================
   GUÍA DE ESTILOS - Tailwind CSS
   ============================================ */

/*
  PRINCIPIOS:
  1. Usar clases utilitarias primero
  2. Crear @layer components para patrones reutilizables
  3. Evitar CSS personalizado innecesario
  4. Mantener consistencia de colores
  5. Responsive-first design
*/

/* ============================================
   COLORES PRINCIPALES (Paleta)
   ============================================ */

/* Purple/Pink Gradient (Principal) */
Primary: from-purple-600 to-pink-600

/* Grises (Secundarios) */
Gray: gray-50, gray-100, gray-200, gray-500, gray-700, gray-900

/* Estados */
Success: green-50, green-500, green-700
Error:   red-50,   red-500,   red-700
Warning: yellow-50, yellow-500, yellow-700

/* ============================================
   ESPACIADO (Margin/Padding)
   ============================================ */

Espacios: 2, 4, 6, 8, 10, 12, 16, 20, 24, 32

Ejemplo:
  p-4   → padding: 1rem
  mb-8  → margin-bottom: 2rem
  gap-4 → gap: 1rem

/* ============================================
   TIPOGRAFÍA
   ============================================ */

Heading LG: text-3xl font-bold       (h1)
Heading MD: text-2xl font-semibold   (h2)
Heading SM: text-xl font-semibold    (h3)
Body:       text-base font-normal    (p)
Small:      text-sm font-normal      (small)
Muted:      text-gray-600 text-sm

/* ============================================
   COMPONENTES COMUNES
   ============================================ */

BOTONES:
  <button class="btn btn-primary">Enviar</button>
  <button class="btn btn-secondary">Cancelar</button>

INPUTS:
  <input class="form-input" />
  <label class="form-label">Campo</label>

TARJETAS:
  <div class="card">Contenido</div>

ALERTAS:
  <div class="alert alert-success">Éxito</div>
  <div class="alert alert-error">Error</div>

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */

Breakpoints Tailwind:
  sm: 640px   → sm:max-w-lg
  md: 768px   → md:max-w-2xl
  lg: 1024px  → lg:max-w-4xl
  xl: 1280px  → xl:max-w-6xl

Ejemplo responsive:
  <div class="w-full md:w-1/2 lg:w-1/3">
    Content
  </div>

/* ============================================
   SOMBRAS
   ============================================ */

shadow      → sombra pequeña
shadow-md   → sombra mediana
shadow-lg   → sombra grande (tarjetas)
shadow-2xl  → sombra muy grande (modales)

Custom: shadow-lg-custom, shadow-md-custom

/* ============================================
   ANIMACIONES
   ============================================ */

.animate-slide-up    → Entrada desde abajo
.animate-slide-down  → Entrada desde arriba
.animate-shake       → Animación de error
.animate-fade-in     → Desvanecimiento

Duración: duration-200, duration-300, duration-500

Ejemplo:
  <div class="animate-slide-up">Contenido</div>

/* ============================================
   PSEUDO-CLASES
   ============================================ */

hover:    → :hover
focus:    → :focus
active:   → :active
disabled: → :disabled

Ejemplo:
  <button class="hover:bg-purple-700 focus:ring-2">
    Click me
  </button>

/* ============================================
   FLEXBOX & GRID
   ============================================ */

FLEX:
  flex                   → display: flex
  flex-col               → flex-direction: column
  items-center           → align-items: center
  justify-center         → justify-content: center
  flex-center (custom)   → center perfecto
  gap-4                  → espacio entre items

GRID:
  grid                   → display: grid
  grid-cols-1            → 1 columna
  grid-cols-2            → 2 columnas
  grid-cols-3            → 3 columnas
  md:grid-cols-2         → 2 en tablet
  gap-4                  → espacio

/* ============================================
   EJEMPLOS DE USO
   ============================================ */

LOGIN CARD:
  <div class="card w-full max-w-md animate-slide-up">
    <h1 class="heading-lg text-purple-600">Título</h1>
    <button class="btn btn-primary w-full">Enviar</button>
  </div>

FORM GROUP:
  <div class="form-group">
    <label class="form-label">Campo</label>
    <input class="form-input" placeholder="..." />
  </div>

ALERT:
  <div class="alert alert-success animate-slide-down">
    ✅ Operación exitosa
  </div>

/* ============================================
   UTILIDADES RÁPIDAS
   ============================================ */

w-full          → width: 100%
h-full          → height: 100%
rounded-lg      → border-radius: 0.5rem
rounded-xl      → border-radius: 0.75rem
border-t        → border-top
border-l-4      → border-left: 4px
opacity-50      → opacity: 0.5
transition-all  → todas las transiciones
duration-300    → 300ms
ease-in, ease-out, ease-in-out

/* ============================================
   RESTRICCIONES
   ============================================ */

❌ NO hacer:
  - Crear CSS personalizado innecesario
  - Mezclar métodos de estilos (CSS + Tailwind)
  - Usar !important
  - Estilos en línea

✅ HACER:
  - Usar clases Tailwind
  - Crear @layer components para reutilizar
  - Mantener consistencia
  - Documentar valores personalizados

/* ============================================
   HERRAMIENTAS ÚTILES
   ============================================ */

1. Tailwind Intellisense (VS Code)
   → Autocompletado de clases

2. Tailwind CSS IntelliSense
   → Preview de estilos

3. Tailwind Play
   → tailwindplay.com (playground online)

4. PostCSS Support
   → Configurado automáticamente
