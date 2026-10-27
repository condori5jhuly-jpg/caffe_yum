# 📚 Memoria del Proyecto — Catálogo Caffe_yum

> Última actualización: 2026-10-26

---

## 📌 Descripción general

**Caffe_yum** es un catálogo web de café artesanal. Permite explorar productos, filtrarlos por categoría,
realizar pedidos, ver horarios y ubicación, y acceder al Panel del Día con preguntas frecuentes y avisos.

---

## 📁 Estructura de archivos

```
proyecto 1 CATALOGO DE PASTELERIA/
├── index.html           ← Página principal
├── estilos.css          ← Estilos globales, tema y layout
├── datos.js             ← Datos estáticos de los productos
├── funciones.js         ← Funciones auxiliares reutilizables
├── render.js            ← Renderizado dinámico de tarjetas de producto
├── eventos.js           ← Manejadores de eventos de la UI
├── app.js               ← Punto de entrada, inicializa la app
├── jquery.js            ← Core de jQuery (debe cargarse primero)
├── jquery-panel.js      ← Menú móvil + acordeón Panel del Día
├── jquery-comparado.js  ← Demo comparativo: vanilla JS vs jQuery
├── README.md            ← Documentación del proyecto
├── project_memory.md    ← Este archivo
└── *.jpg / *.webp       ← Imágenes de productos
```

---

## 🎯 Funcionalidades implementadas

| Funcionalidad | Descripción |
|---|---|
| 🛍️ Catálogo de productos | Tarjetas generadas dinámicamente desde `datos.js` + filtro de búsqueda |
| 🔍 Filtros por categoría | Botones que filtran los cafés según su tipo |
| 🧾 Formulario de pedido | Sección `#pedido` con validación y mensaje de confirmación |
| 🕐 Horarios | Sección `#horarios` con información de apertura/cierre |
| 📍 Ubicación | Sección `#ubicacion` con dirección y datos de contacto |
| 📋 Panel del Día | Acordeón con preguntas frecuentes + botón de avisos con animación |
| 📱 Menú móvil | Toggle con atributo `hidden` y `aria-expanded` sincronizados |
| 📣 Avisos con animación | Aparecen escalonadamente con `fadeIn` al pulsar "Mostrar avisos" |
| 🔄 Comparador JS/jQuery | Sección educativa que muestra el mismo resultado en ambos enfoques |

---

## 🗺️ Secciones del HTML (`index.html`)

| ID / Clase | Descripción |
|---|---|
| `header.encabezado` | Logo, nombre `caffe_yum`, slogan y menú de navegación |
| `#galeria` | Catálogo principal de cafés |
| `#horarios` | Horarios de atención |
| `#ubicacion` | Dirección y ubicación |
| `#pedido` | Formulario para realizar pedidos |
| `#panel` | Panel del Día (acordeón + avisos) |
| `aside.curiosidad` | Dato curioso sobre el café |
| `footer#contacto` | Dirección, teléfono y copyright |

---

## 🧰 Orden de carga de scripts (importante)

```html
<!-- Scripts propios de la app (no usan jQuery) -->
<script src="./datos.js"></script>
<script src="./funciones.js"></script>
<script src="./render.js"></script>
<script src="./eventos.js"></script>

<!-- jQuery primero, luego los scripts que lo usan -->
<script src="./jquery.js"></script>
<script src="./jquery-comparado.js"></script>
<script src="./jquery-panel.js"></script>
<script src="./app.js"></script>
```

> ⚠️ **Regla crítica:** `jquery.js` SIEMPRE debe cargarse antes que `jquery-panel.js` y `jquery-comparado.js`,
> de lo contrario el símbolo `$` no estará definido y el panel no funcionará.

---

## 🛠️ Cambios y correcciones realizados

### ✅ Correcciones aplicadas

| Fecha | Archivo | Cambio |
|---|---|---|
| 2026-10-26 | `index.html` | Se reordenó el bloque de `<script>` para cargar `jquery.js` primero |
| 2026-10-26 | `index.html` | Se movió `#panel` dentro de `<main>` (antes del cierre `</main>`) |
| 2026-10-26 | `index.html` | Se eliminó "Panel del Día" del menú de navegación superior |
| 2026-10-26 | `index.html` | Se añadió slogan `bebida oscura y estimulante` debajo de `caffe_yum` en header y footer |
| 2026-10-26 | `jquery-panel.js` | Corregida lógica `hidden`: ahora se asigna `!abierto` (el opuesto del estado actual) |
| 2026-10-26 | `jquery-panel.js` | Acordeón con `slideToggle` + actualización correcta de `aria-expanded` |
| 2026-10-26 | `jquery-panel.js` | Cierre automático de otros ítems al abrir uno nuevo |
| 2026-10-26 | `jquery-comparado.js` | Verificación de existencia de `#salida-vanilla` y `#salida-jquery` antes de manipularlos |

---

## 🎨 Tema visual (estilos.css)

| Variable CSS | Valor | Uso |
|---|---|---|
| `--color-principal` | `#4B291E` | Marrón café intenso |
| `--color-acento` | `#C66F5E` | Terracota cálida |
| `--color-dorado` | `#D5A36F` | Ámbar suave |
| `--color-fondo` | `#F7EFE4` | Crema cálido |
| `--color-superficie` | `#FFFFFF` | Tarjetas y contenedores |
| `--fuente-titulos` | `Playfair Display` | Títulos elegantes |
| `--fuente-cuerpo` | `Outfit` | Texto general |

---

## 🚧 Pendientes y próximos pasos

- [ ] Probar el acordeón en distintos navegadores (Chrome, Firefox, Edge)
- [ ] Agregar más preguntas al acordeón del Panel del Día
- [ ] Implementar modo oscuro (`prefers-color-scheme: dark`)
- [ ] Optimizar imágenes pesadas (`.webp`, comprimir JPG)
- [ ] Hacer la navegación más responsiva en móviles pequeños
- [ ] Deploy a GitHub Pages o Netlify

---

## 📝 Notas del desarrollador

- El **Panel del Día** usa jQuery para el acordeón y la animación de avisos.
  La estructura HTML es:
  ```html
  <div id="acordeon">
    <div class="item">
      <button type="button" class="titulo" aria-expanded="false">Pregunta</button>
      <div class="cuerpo" hidden><p>Respuesta</p></div>
    </div>
  </div>
  ```
- El atributo `hidden` nativo de HTML5 controla la visibilidad semántica;
  jQuery lo sincroniza con `.attr("hidden", true/false)` tras cada animación.
- `aria-expanded` debe reflejar el estado visible del `.cuerpo` para accesibilidad.

---

*Generado por Antigravity – Proyecto Caffe_yum*
