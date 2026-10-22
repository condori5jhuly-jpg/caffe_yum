// ── 1. LOS ELEMENTOS QUE SE VAN A ESCUCHAR ──────────────────────────────
const buscador = document.querySelector("#buscador");
const filtros = document.querySelector("#filtros");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("form");
const orden = document.querySelector("#orden");
const soloDisponibles = document.querySelector("#soloDisponibles");

let categoriaActiva = "todos";
let textoBuscado = "";

// Función para normalizar texto: elimina acentos/tildes, pasa a minúsculas y quita espacios
function normalizar(texto) {
  return (texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// ── 2. UNA SOLA FUNCIÓN QUE DECIDE QUÉ MOSTRAR ──────────────────────────
function actualizar() {
  const busqueda = normalizar(textoBuscado);

  let visibles = productos
    .filter(p => categoriaActiva === "todos" || p.categoria === categoriaActiva)
    .filter(p => {
      if (!busqueda) return true;
      const nombreNorm = normalizar(p.nombre);
      const descNorm = normalizar(p.descripcion);
      return nombreNorm.includes(busqueda) || descNorm.includes(busqueda);
    })
    .filter(p => !soloDisponibles || !soloDisponibles.checked || p.disponible);

  // ORDENAR LOS PRODUCTOS (si existe el selector)
  if (orden) {
    if (orden.value === "nombre") {
      visibles.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (orden.value === "precio-menor") {
      visibles.sort((a, b) => a.precio - b.precio);
    } else if (orden.value === "precio-mayor") {
      visibles.sort((a, b) => b.precio - a.precio);
    }
  }

  render(visibles);

  if (visibles.length === 0) {
    resultado.textContent = `No se encontraron productos para "${textoBuscado.trim()}"`;
  } else if (busqueda) {
    resultado.textContent = `${visibles.length} ${visibles.length === 1 ? "producto encontrado" : "productos encontrados"} para "${textoBuscado.trim()}"`;
  } else {
    resultado.textContent = `${visibles.length} de ${productos.length} productos`;
  }
}

actualizar();

// ── 3. EL EVENTO input Y search ─────────────────────────────────────────
function manejarBusqueda(event) {
  textoBuscado = event.target.value;

  // Si el usuario escribe y tenía una categoría restringida,
  // cambiamos a "todos" para buscar en todo el catálogo sin bloqueos
  if (textoBuscado.trim().length > 0 && categoriaActiva !== "todos") {
    categoriaActiva = "todos";
    filtros.querySelectorAll("button").forEach(b => {
      b.classList.toggle("activo", b.dataset.categoria === "todos");
    });
  }

  actualizar();
}

buscador.addEventListener("input", manejarBusqueda);
buscador.addEventListener("search", manejarBusqueda);

// ── 4. DELEGACIÓN DE EVENTOS ────────────────────────────────────────────
filtros.addEventListener("click", (event) => {

  const boton = event.target.closest("button");
  if (!boton) return;

  categoriaActiva = boton.dataset.categoria;

  filtros.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
  boton.classList.add("activo");

  actualizar();
});

// ── 4.1. EVENTO PARA ORDENAR (OPCIONAL) ─────────────────────────────────
if (orden) {
  orden.addEventListener("change", () => {
    actualizar();
  });
}

// ── 4.2. EVENTO PARA MOSTRAR SOLO DISPONIBLES (OPCIONAL) ────────────────
if (soloDisponibles) {
  soloDisponibles.addEventListener("change", () => {
    actualizar();
  });
}

// ── 5. EL EVENTO submit Y preventDefault: VALIDACIÓN Y PEDIDO A WHATSAPP ───
const campoFecha = formulario.querySelector("#fecha");
const hoy = new Date().toISOString().slice(0, 10);
if (campoFecha) {
  campoFecha.min = hoy; // Evita que se seleccionen días pasados en el calendario
}

const numeroWhatsApp = "59164122861";

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formulario.reportValidity()) {
    return;
  }

  const fechaInput = formulario.querySelector("#fecha");
  if (fechaInput.value < hoy) {
    fechaInput.setCustomValidity("La fecha de entrega no puede ser anterior a hoy.");
    fechaInput.reportValidity();
    fechaInput.addEventListener("input", () => fechaInput.setCustomValidity(""), { once: true });
    return;
  }

  // 1. Obtener datos del cliente
  const nombreCliente = document.querySelector("#nombre").value.trim();
  const emailCliente = document.querySelector("#email").value.trim();
  const telefonoCliente = document.querySelector("#telefono").value.trim();

  // 2. Obtener datos del producto seleccionado
  const selectorProducto = document.querySelector("#producto");
  const productoNombre = selectorProducto.options[selectorProducto.selectedIndex].text;
  const cantidad = Number(document.querySelector("#cantidad").value);
  const fecha = fechaInput.value;
  const notas = document.querySelector("#notas").value.trim();

  // Precios oficiales
  const precios = {
    expresso: 10,
    especial: 18,
    cold_brew: 15,
    americano: 15,
    capuccino: 14,
    frappe: 15,
    mocaccino: 17,
    latte: 16
  };

  const precioUnitario = precios[selectorProducto.value] || 15;
  const total = precioUnitario * cantidad;

  // 3. Crear mensaje formateado para WhatsApp
  const mensaje = `
¡NUEVO PEDIDO - CAFFE_YUM!

DATOS DEL CLIENTE
Nombre: ${nombreCliente}
Correo: ${emailCliente}
Teléfono: ${telefonoCliente || "No proporcionado"}

DETALLES DEL PEDIDO
Producto: ${productoNombre}
Cantidad: ${cantidad}
Precio unitario: Bs ${precioUnitario.toFixed(2)}
TOTAL: Bs ${total.toFixed(2)}
Fecha de entrega: ${fecha}

Indicaciones: ${notas || "Ninguna"}

Pedido enviado desde la página web de Caffe_yum.
  `.trim();

  // 4. Abrir WhatsApp con el pedido preparado
  const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  window.open(enlaceWhatsApp, "_blank");

  // 5. Mensaje de confirmación en la misma sección de pedido
  const mensajePedido = document.querySelector("#mensaje-pedido");
  if (mensajePedido) {
    mensajePedido.textContent = `¡Gracias ${nombreCliente}! Tu pedido por Bs ${total.toFixed(2)} fue enviado. Abriendo WhatsApp para confirmar...`;
    mensajePedido.className = "mensaje-pedido exito";
  }

  formulario.reset();
  if (campoFecha) {
    campoFecha.min = hoy;
  }
});

// ── 6. EXPRESIONES REGULARES, LO JUSTO ──────────────────────────────────
const PATRONES = {
  telefono: /^[0-9]{7,8}$/,
  correo: /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i,
  ci: /^[0-9]{5,10}(-[0-9A-Za-z]{1,3})?$/,
};

console.log("70123456 válido:", PATRONES.telefono.test("70123456"));
console.log("7012 válido:", PATRONES.telefono.test("7012"));
console.log("ana@correo.bo válido:", PATRONES.correo.test("ana@correo.bo"));

// ── 7. LA VALIDACIÓN DE VERDAD NO ESTÁ AQUÍ ─────────────────────────────
