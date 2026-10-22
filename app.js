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
const subtituloGaleria = document.querySelector("#galeria .subtitulo");
if (subtituloGaleria) {
  subtituloGaleria.textContent = `Disfruta nuestras ${cafesDisponibles} variedades de café artesanal.`;
}

// ── LA PREGUNTA DEL DÍA ─────────────────────────────────────────────────

// ── 7. ENVIAR PEDIDOS POR WHATSAPP ──────────────────────────────────────
// Configuración de contacto oficial de Caffe_yum (Bolivia: código +591)
// Nota: La validación completa y el envío hacia WhatsApp se gestionan de forma
// integrada en eventos.js para evitar conflictos de múltiples submit listeners.
console.log(`Sistema de pedidos listo para Caffe_yum: WhatsApp ${negocio}`);
