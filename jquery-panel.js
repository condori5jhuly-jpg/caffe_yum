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

// ── 1. DELEGACIÓN, EN UNA LÍNEA ─────────────────────────────────────────
$("#acordeon").on("click", ".titulo", function () {
  const $titulo = $(this);
  const $respuesta = $titulo.next(".cuerpo");
  const estabaAbierto = $titulo.attr("aria-expanded") === "true";

  // Cerrar todas las respuestas
  $("#acordeon .cuerpo").not($respuesta)
    .stop(true, true)
    .hide()
    .attr("hidden", true);

  $("#acordeon .titulo").not($titulo)
    .attr("aria-expanded", "false");

  // Si estaba abierta, cerrarla
  if (estabaAbierto) {
    $respuesta.stop(true, true).hide().attr("hidden", true);
    $titulo.attr("aria-expanded", "false");
    return;
  }

  // IMPORTANTE: quitar hidden antes de mostrar la respuesta
  $respuesta
    .stop(true, true)
    .removeAttr("hidden")
    .hide()
    .slideDown(200);

  $titulo.attr("aria-expanded", "true");
});

// ── 2. LOS EFECTOS ──────────────────────────────────────────────────────

// ── 3. .each() Y EL ESCALONADO ──────────────────────────────────────────



// ── 4. .animate(), PARA LO QUE NO CUBRE UN EFECTO ───────────────────────

// ── 5. UNA FUNCIÓN PROPIA QUE DEVUELVE LA SELECCIÓN ─────────────────────
function resaltar($seleccion, milisegundos = 1200) {
  $seleccion.addClass("resaltado");
  setTimeout(() => $seleccion.removeClass("resaltado"), milisegundos);
  return $seleccion;
}

resaltar($("#panel-proyecto h2")).css("letter-spacing", "0.5px");

$("#mostrar-avisos").on("click", function () {
  const $boton = $(this);
  const $avisos = $("#avisos");
  const mostrar = $avisos.prop("hidden");

  $avisos.prop("hidden", !mostrar);
  $boton.attr("aria-expanded", String(mostrar));
  $boton.text(mostrar ? "Ocultar avisos" : "Mostrar avisos");
});



 // ── 6. PANEL DEL PROYECTO: PRODUCTOS, HORARIOS Y CONTACTO ──


$(function () {
  const $boton = $("#btn-menu-proyecto");
  const $menu = $("#menu-proyecto");

  // Eliminar controladores anteriores de este panel
  $boton.off("click.panelProyecto");
  $menu.find("a").off("click.panelProyecto");

  $boton.on("click.panelProyecto", function () {
    const abrir = $menu.prop("hidden");

    $menu.prop("hidden", !abrir);
    $boton.attr("aria-expanded", String(abrir));
  });

  $menu.find("a").on("click.panelProyecto", function () {
    $menu.prop("hidden", true);
    $boton.attr("aria-expanded", "false");
  });
});
