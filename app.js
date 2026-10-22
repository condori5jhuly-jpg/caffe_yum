// ── 1. CONSTANTES ───────────────────────────────────────────────────────
const negocio = "Caffe_yum";
const anioFundacion = 2026;

// ── 2. VARIABLES ────────────────────────────────────────────────────────
let cafesDisponibles = 8;
let pedidosRealizados = 0;
let cafeEspecialDisponible = true;

// ── 3. TIPOS ────────────────────────────────────────────────────────────
const precioEspresso = 10;
const precioEspecial = 18;
const precioColdBrew = 15;
const precioAmericano = 15;
const precioCapuchino = 14;
const precioFrappe = 15;

const abiertoHoy = true;
const promocionDelDia = null;
let telefono;

console.log("tipos:", typeof negocio, typeof precioEspresso, typeof abiertoHoy);
console.log("null es", promocionDelDia, "| sin asignar es", telefono);

// ── 4. TEMPLATE LITERAL ─────────────────────────────────────────────────
const resumen = `${negocio} abrió en ${anioFundacion} y hoy quedan ${cafesDisponibles} variedades de café.`;
console.log(resumen);

// ── 5. COMPARACIÓN ──────────────────────────────────────────────────────
console.log("10" == precioEspresso);
console.log("10" === precioEspresso);


// ── 6. PRIMER CAMBIO EN LA PÁGINA ───────────────────────────────────────
const subtitulo = document.querySelector("header p");
subtitulo.textContent = `Disfruta nuestras ${cafesDisponibles} variedades de café.`;

// ── LA PREGUNTA DEL DÍA ─────────────────────────────────────────────────

// ── 7. ENVIAR PEDIDOS POR WHATSAPP ──────────────────────────────

const formularioPedido = document.querySelector("#pedido form");

// Número de WhatsApp de Caffe_yum (Bolivia: código +591)
const numeroWhatsApp = "59164122861";

formularioPedido.addEventListener("submit", function (evento) {
  evento.preventDefault();

  // Obtener los datos del cliente
  const nombreCliente = document.querySelector("#nombre").value.trim();
  const emailCliente = document.querySelector("#email").value.trim();
  const telefonoCliente = document.querySelector("#telefono").value.trim();

  // Obtener los datos del pedido
  const selectorProducto = document.querySelector("#producto");
  const producto = selectorProducto.options[selectorProducto.selectedIndex].text;
  const cantidad = Number(document.querySelector("#cantidad").value);
  const fecha = document.querySelector("#fecha").value;
  const notas = document.querySelector("#notas").value.trim();

  // Precios de los productos
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

  const precioUnitario = precios[selectorProducto.value];

  // Calcular el total
  const total = precioUnitario * cantidad;

  // Crear el mensaje del pedido
  const mensaje = `
¡NUEVO PEDIDO - CAFFE_YUM!

DATOS DEL CLIENTE
Nombre: ${nombreCliente}
Correo: ${emailCliente}
Teléfono: ${telefonoCliente || "No proporcionado"}

DETALLES DEL PEDIDO
Producto: ${producto}
Cantidad: ${cantidad}
Precio unitario: Bs ${precioUnitario.toFixed(2)}
TOTAL: Bs ${total.toFixed(2)}
Fecha de entrega: ${fecha}

Indicaciones: ${notas || "Ninguna"}

Pedido enviado desde la página web de Caffe_yum.
  `.trim();

  // Abrir WhatsApp con el pedido preparado
  const enlaceWhatsApp =
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  window.open(enlaceWhatsApp, "_blank");
});
