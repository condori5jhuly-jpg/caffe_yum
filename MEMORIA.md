# 📚 Memoria del Proyecto — Catálogo Caffe_yum

> Última actualización: 2026-10-27

---

## 📌 Descripción general

**Caffe_yum** es un catálogo web de café artesanal. Permite explorar y filtrar productos, realizar pedidos,
consultar horarios y ubicación, guardar preferencias, y utilizar el tablero de planificación y el Panel del Día.
La interfaz utiliza una identidad cálida de cafetería con tonos café, crema, caramelo y terracota.

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
├── datos.json           ← Datos usados por fetch y jQuery
├── remoto.js            ← Carga y renderizado del catálogo remoto
├── jquery-panel.js      ← Menú móvil + acordeón Panel del Día
├── jquery-comparado.js  ← Demo comparativo: vanilla JS vs jQuery
├── README.md            ← Documentación del proyecto
├── preferencias.js      ← Preferencias persistentes y geolocalización
├── tablero.js           ← Tablero de planificación conectado a datos.json
├── MEMORIA.md           ← Este archivo
└── *.jpg / *.webp       ← Imágenes de productos
```

---

## 🎯 Funcionalidades implementadas

| Funcionalidad | Descripción |
|---|---|
| 🛍️ Catálogo de productos | Tarjetas generadas dinámicamente desde `datos.js` + filtro de búsqueda |
| 📊 Tablero de planificación | Productos y stock desde `datos.json`; movimiento entre tres columnas, totales y gráfico |
| 🌐 Catálogo remoto | Carga `datos.json` al abrir y permite volver a cargar con fetch o jQuery; el botón jQuery usa fetch como respaldo si el CDN no está disponible |
| 🔍 Filtros por categoría | Botones que filtran los cafés según su tipo |
| ↕️ Ordenamiento | Orden alfabético y por precio ascendente o descendente |
| 🧾 Formulario de pedido | Sección `#pedido` con validación y mensaje de confirmación |
| 💬 Pedidos por WhatsApp | Valida los datos, calcula el total y prepara el mensaje de pedido para WhatsApp |
| 🕐 Horarios | Sección `#horarios` con información de apertura/cierre |
| 📍 Ubicación y geolocalización | Mapa, dirección y cálculo de distancia con permiso del navegador |
| 💾 Preferencias | Tema claro/oscuro y orden del catálogo persistidos en `localStorage` |
| 📋 Panel del Día | Acordeón con preguntas frecuentes + botón de avisos con animación |
| 📱 Menú móvil | Toggle con atributo `hidden` y `aria-expanded` sincronizados |
| 📣 Avisos con animación | Aparecen escalonadamente con `fadeIn` al pulsar "Mostrar avisos" |
| 🔄 Comparador JS/jQuery | Sección educativa que muestra el mismo resultado en ambos enfoques |

---

## 🗺️ Secciones del HTML (`index.html`)

| ID / Clase | Descripción |
|---|---|
| `header.encabezado` | Logo, nombre `caffe_yum`, slogan y menú de navegación |
| `.hero` | Bienvenida de la cafetería, imagen local y enlaces al catálogo y pedido |
| `#galeria` | Catálogo principal de cafés |
| `#horarios` | Horarios de atención |
| `#ubicacion` | Mapa, dirección y geolocalización |
| `#pedido` | Formulario para realizar pedidos |
| `#tablero-zona` | Planificación de productos, existencias por columna y gráfico |
| `#preferencias` | Tema, orden del catálogo y control para borrar preferencias |
| `#remoto` | Carga del catálogo de proveedor con Fetch o jQuery |
| `#panel-proyecto` | Panel del proyecto, menú, acordeón y avisos |
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
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="./jquery-comparado.js"></script>
<script src="./jquery-panel.js"></script>
<script src="./remoto.js"></script>
<script src="./app.js"></script>
<script src="./preferencias.js"></script>
<script src="./tablero.js"></script>
```

> ⚠️ **Regla crítica:** jQuery debe cargarse antes que `jquery-panel.js`, `jquery-comparado.js` y `remoto.js`,
> de lo contrario el símbolo `$` no estará definido y el panel no funcionará.
> `tablero.js` se carga después del HTML y obtiene los productos y existencias de `datos.json`; usa Live Server
> u otro servidor local para que `fetch` pueda leer ese archivo.

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
| 2026-10-27 | `index.html`, `jquery-panel.js` | Corregido el cierre de sección y unificado el controlador de avisos; eliminado un error que detenía el script del panel |
| 2026-10-27 | `datos.json`, `remoto.js` | Añadidos los datos del proveedor y endurecido el renderizado remoto |
| 2026-10-27 | `eventos.js`, `preferencias.js` | Corregido el cálculo de fecha local y protegidos los controles opcionales |
| 2026-10-27 | `eventos.js` | Eliminado el manejador obsoleto que buscaba `#menu-toggle` y `#menu-movil`; el menú del proyecto usa `#btn-menu-proyecto` y `#menu-proyecto` |
| 2026-10-27 | `remoto.js` | El botón jQuery usa `fetch` como respaldo si no carga jQuery; se informa el método utilizado y se cargan los datos al iniciar |
| 2026-10-27 | `index.html`, `tablero.js`, `estilos.css` | Integrado el tablero con productos y stock de `datos.json`, movimiento por arrastre o selección, totales y gráfico adaptable |
| 2026-10-27 | `index.html`, `estilos.css` | Añadida bienvenida visual con imagen local, llamadas a la acción y ajustes de estilo adaptable; se conservan las interacciones y los identificadores existentes |

---

## ✨ Rediseño visual y experiencia adaptable (2026-10-27)

- Se añadió en `index.html` una portada `.hero` con el mensaje «Una pausa que sabe a hogar», la imagen local `cafeamericano.jpg` y enlaces para explorar el catálogo o ir al formulario de pedido.
- Se actualizaron el título de la página, la descripción SEO y el color del tema del navegador.
- En `estilos.css` se consolidó una identidad visual artesanal con marrón café, caramelo/dorado, crema y terracota. El botón de envío de pedido conserva una tonalidad verde para distinguir la acción de WhatsApp.
- Se ajustaron tipografía, espaciado, bordes, sombras, navegación, tarjetas, precios, filtros, formularios, tabla, mapa, tablero, gráfico y pie de página. Los efectos de hover y transiciones son discretos y se respeta `prefers-reduced-motion`.
- La portada se reorganiza en pantallas pequeñas; el catálogo, las columnas del tablero, los formularios y las tablas mantienen reglas adaptables. El tema oscuro incluye estilos para la portada y los mensajes de confirmación.
- La bienvenida usa una imagen existente del proyecto; no se añadieron dependencias ni se alteraron los datos de productos.
- Se conservaron los IDs del HTML existentes y no se cambió la lógica JavaScript ni el formato de `datos.json` durante este rediseño.

### Comprobaciones del rediseño

- Se verificó estáticamente que los 44 atributos `id` anteriores de `index.html` se conservaran, que las referencias locales a scripts existieran y que `datos.json` siguiera conteniendo 8 productos.
- Se comprobó el balance de llaves CSS y `git diff --check`.
- La revisión visual en navegador y la comprobación de consola no se pudieron realizar en esa sesión; el resultado visual no se considera validado en navegador.

---

## 🎨 Tema visual (estilos.css)

| Variable CSS | Valor | Uso |
|---|---|---|
| `--color-principal` | `#4B291E` | Marrón café intenso (crema cálido en modo oscuro) |
| `--color-acento` | `#BD674A` | Terracota cálida |
| `--color-dorado` | `#D3A15F` | Caramelo/dorado |
| `--color-fondo` | `#F4EDE3` | Crema cálido |
| `--color-superficie` | `#FFFDF9` | Tarjetas y contenedores |
| `--fuente-titulos` | `Playfair Display` | Títulos elegantes |
| `--fuente-cuerpo` | `Outfit` | Texto general |

---

## 🚧 Pendientes y próximos pasos

- [ ] Probar el acordeón en distintos navegadores (Chrome, Firefox, Edge)
- [ ] Agregar más preguntas al acordeón del Panel del Día
- [x] Mejorar el modo oscuro y guardar la preferencia del tema con `localStorage`
- [ ] Revisar visualmente el rediseño en escritorio, tableta y celular; verificar errores en la consola
- [ ] Optimizar imágenes pesadas (`.webp`, comprimir JPG)
- [ ] Hacer la navegación más responsiva en móviles pequeños
- [ ] Deploy a GitHub Pages o Netlify

---

## 📝 Notas del desarrollador

- El catálogo remoto usa el formato `{ negocio: { nombre }, productos: [...] }` de `datos.json`. Cada producto incluye `nombre`, `precio`, `unidad`, `stock` y `disponible`.
- `#cargar-fetch` carga con la API Fetch; `#cargar-jquery` usa `$.getJSON` y recurre a Fetch si el CDN de jQuery no está disponible; `#cargar-roto` solicita deliberadamente `no-existe.json` para mostrar el estado de error.
- El catálogo remoto se carga automáticamente al ejecutar `remoto.js`. En la revisión del 2026-10-27 se verificó la carga de 8 productos con Fetch, con jQuery y con el respaldo Fetch al bloquear el CDN. El botón de error limpia las tarjetas y muestra el mensaje de fallo esperado.
- Para peticiones de red en otros navegadores, abrir el proyecto con Five Server o Live Server; abrir `index.html` con `file://` puede estar sujeto a restricciones del navegador.
- `eventos.js` no gestiona el menú del panel: esa interacción está en `jquery-panel.js`, que usa los IDs actuales de `index.html`.

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
