// ── 1. COMPROBAR QUE CARGÓ ──────────────────────────────────────────────
if (typeof jQuery === "undefined") {
  console.warn("La comparación jQuery se omitió porque jQuery no está disponible.");
} else if (
  !document.querySelector("#salida-vanilla") ||
  !document.querySelector("#salida-jquery") ||
  !document.querySelector("#boton-vanilla") ||
  !document.querySelector("#boton-jquery")
) {
  console.info("La sección de comparación jQuery no está incluida en esta página.");
} else {
console.log("jQuery versión:", $.fn.jquery);

// ── 2. ESPERAR AL DOM ───────────────────────────────────────────────────

// ── 3. SELECCIONAR ──────────────────────────────────────────────────────
const vanillaP = document.querySelector("#salida-vanilla");
const jqueryP = $("#salida-jquery");

console.log("vanilla es un elemento:", vanillaP instanceof HTMLElement);
console.log("jQuery es una colección de", jqueryP.length);

console.log("mismo elemento:", $(vanillaP)[0] === vanillaP);

// ── 4. LEER Y ESCRIBIR CONTENIDO ────────────────────────────────────────
vanillaP.textContent = "Cambiado con vanilla: document.querySelector + textContent";
jqueryP.text("Cambiado con jQuery: $() + .text()");

// ── 5. CLASES ───────────────────────────────────────────────────────────

// ── 6. EVENTOS ──────────────────────────────────────────────────────────
document.querySelector("#boton-vanilla").addEventListener("click", () => {
  vanillaP.classList.toggle("resaltado");
});

$("#boton-jquery").on("click", function () {
  $(this).closest("section").find("#salida-jquery").toggleClass("resaltado");
});

// ── 7. CHAINING ─────────────────────────────────────────────────────────
$("#salida-jquery")
  .addClass("destacado")
  .attr("data-origen", "jquery")
  .css("cursor", "pointer");

vanillaP.classList.add("destacado");
vanillaP.setAttribute("data-origen", "vanilla");
vanillaP.style.cursor = "pointer";

// ── 8. LA COMPARACIÓN QUE IMPORTA ───────────────────────────────────────
console.log("Tarjetas que ve jQuery:", $(".tarjeta").length);
console.log("Tarjetas que ve vanilla:", document.querySelectorAll(".tarjeta").length);
}
