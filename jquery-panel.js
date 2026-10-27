// ── 0. PANEL DROPDOWN (botón superior derecho del header) ────────────────
$("#btn-panel").on("click", function (e) {
  e.stopPropagation();
  const $dropdown = $("#panel-dropdown");
  const abierto = $(this).attr("aria-expanded") === "true";

  if (abierto) {
    $dropdown.stop(true).slideUp(180, function () {
      $dropdown.attr("hidden", true);
    });
    $(this).attr("aria-expanded", "false");
  } else {
    $dropdown.removeAttr("hidden").hide().stop(true).slideDown(200);
    $(this).attr("aria-expanded", "true");
  }
});

// Cerrar dropdown al hacer clic fuera
$(document).on("click", function (e) {
  if (!$(e.target).closest(".panel-dropdown-wrapper").length) {
    const $dropdown = $("#panel-dropdown");
    if ($dropdown.is(":visible")) {
      $dropdown.stop(true).slideUp(180, function () {
        $dropdown.attr("hidden", true);
      });
      $("#btn-panel").attr("aria-expanded", "false");
    }
  }
});

// Cerrar dropdown al hacer clic en un enlace
$("#panel-dropdown a").on("click", function () {
  $("#panel-dropdown").stop(true).slideUp(180, function () {
    $(this).attr("hidden", true);
  });
  $("#btn-panel").attr("aria-expanded", "false");
});

// ── 1. .on() ES LA FORMA ÚNICA ──────────────────────────────────────────
$("#menu-toggle").on("click", function () {
  const $menu = $("#menu-movil");

  const abierto = $(this).attr("aria-expanded") === "true";
  $menu.toggle(200);
  // hidden should be the opposite of abierto after toggle
  $menu.attr("hidden", !abierto);
  $(this).attr("aria-expanded", !abierto);
});

// ── 2. DELEGACIÓN, EN UNA LÍNEA ─────────────────────────────────────────
$("#acordeon").on("click", ".titulo", function () {
  const $titulo = $(this);
  const $cuerpo = $titulo.next(".cuerpo");

  // Toggle visibility with animation and update hidden attribute
  $cuerpo.stop(true, true).slideToggle(200, function () {
    $cuerpo.attr("hidden", !$cuerpo.is(":visible"));
  });

  // Update aria-expanded on the button
  $titulo.attr("aria-expanded", $titulo.attr("aria-expanded") !== "true");

  // Close other accordion items and hide them
  $("#acordeon .cuerpo").not($cuerpo).stop(true, true).slideUp(200, function () {
    $(this).attr("hidden", true);
  });
  $("#acordeon .titulo").not($titulo).attr("aria-expanded", "false");
});

// ── 3. LOS EFECTOS ──────────────────────────────────────────────────────

// ── 4. .each() Y EL ESCALONADO ──────────────────────────────────────────
$("#mostrar-avisos").on("click", function () {
  $("#avisos li").each(function (indice) {

    $(this).stop(true, true).delay(indice * 120).fadeIn(250);
  });

  $(this).text("Ocultar avisos").off("click").on("click", function () {
    $("#avisos li").stop(true, true).fadeOut(200);
    $(this).text("Mostrar avisos");
  });
});

// ── 5. .animate(), PARA LO QUE NO CUBRE UN EFECTO ───────────────────────

// ── 6. UNA FUNCIÓN PROPIA QUE DEVUELVE LA SELECCIÓN ─────────────────────
function resaltar($seleccion, milisegundos = 1200) {
  $seleccion.addClass("resaltado");
  setTimeout(() => $seleccion.removeClass("resaltado"), milisegundos);
  return $seleccion;
}

resaltar($("#panel h2")).css("letter-spacing", "0.5px");
