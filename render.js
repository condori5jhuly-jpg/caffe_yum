// ── 1. SELECCIONAR ──────────────────────────────────────────────────────
const contenedor = document.querySelector("#lista-productos");
const titulos = document.querySelectorAll("h2");

console.log("El contenedor existe:", contenedor !== null);
console.log("Hay", titulos.length, "encabezados h2 en la página");

const textosDeTitulos = [...titulos].map(t => t.textContent);
console.log(textosDeTitulos);

// ── 2. LEER Y MODIFICAR CONTENIDO ───────────────────────────────────────

// ── 3. ATRIBUTOS Y CLASES ───────────────────────────────────────────────

// ── 4. CREAR ELEMENTOS ──────────────────────────────────────────────────
function crearTarjeta(producto) {
  const articulo = document.createElement("article");

  articulo.classList.add("tarjeta", "tarjeta-cafe");
  if (!producto.disponible) {
    articulo.classList.add("agotado");
  }

  articulo.dataset.nombre = producto.nombre;

  // Mismo diseño que la galería: foto arriba y el texto en .contenido-cafe
  articulo.innerHTML = `
    ${producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}">` : ""}
    <div class="contenido-cafe">
      <h3>${producto.nombre}</h3>
      ${producto.descripcion ? `<p>${producto.descripcion}</p>` : ""}
      <div class="precio">Bs ${producto.precio.toFixed(2).replace(".", ",")}</div>
      <p class="stock">${producto.disponible ? `${producto.stock} en stock` : "Agotado"}</p>
    </div>
  `;

  return articulo;
}

// ── 5. RENDER: EL PATRÓN DEL MÓDULO ─────────────────────────────────────
function render(lista) {
  contenedor.innerHTML = "";

  lista.forEach(producto => {
    contenedor.append(crearTarjeta(producto));
  });

  if (lista.length === 0) {
    contenedor.innerHTML = '<p class="sin-productos">No hay cafés que coincidan con tu búsqueda.</p>';
  }
}

// ── 6. PINTAR ───────────────────────────────────────────────────────────
render(productos);

// ── 7. RECORRER EL ÁRBOL ────────────────────────────────────────────────
const primeraTarjeta = document.querySelector(".tarjeta");
console.log("Padre de la primera tarjeta:", primeraTarjeta.parentElement.id);
console.log("Su producto es:", primeraTarjeta.dataset.nombre);
