const $estado = document.querySelector("#estado");
const listaRemota = document.querySelector("#lista-remota");

// ── 1. JSON ─────────────────────────────────────────────────────────────
const textoJson = '{"nombre":"Pan integral","precio":1.5,"disponible":true}';
const objeto = JSON.parse(textoJson);
console.log(objeto.precio, typeof objeto.precio);
console.log(JSON.stringify(objeto));

// ── 2. LOS TRES ESTADOS ─────────────────────────────────────────────────
function mostrarEstado(texto, tipo = "info") {
  $estado.textContent = texto;
  $estado.className = tipo;
}

function pintarRemoto(productos) {
  listaRemota.innerHTML = "";
  productos.forEach(p => {
    const art = document.createElement("article");
    art.classList.add("tarjeta");
    if (!p.disponible) art.classList.add("agotado");

    const titulo = document.createElement("h3");
    titulo.textContent = p.nombre;

    const precio = document.createElement("p");
    precio.className = "precio";
    precio.textContent = `Bs ${Number(p.precio).toFixed(2)} / ${p.unidad}`;

    const stock = document.createElement("p");
    stock.className = "stock";
    stock.textContent = p.disponible ? `${p.stock} en stock` : "Agotado";

    art.append(titulo, precio, stock);
    listaRemota.append(art);
  });
}

// ── 3. fetch Y async/await ──────────────────────────────────────────────
async function cargarConFetch(url = "datos.json", fuente = "fetch") {
  mostrarEstado(`Cargando con ${fuente}...`, "cargando");

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`El servidor respondió ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    pintarRemoto(datos.productos);

    mostrarEstado(`${datos.productos.length} productos de ${datos.negocio.nombre} (vía ${fuente})`, "ok");

  } catch (error) {

    mostrarEstado(`No se pudieron cargar los datos. ${error.message}`, "error");
    listaRemota.innerHTML = "";
  }
}

document.querySelector("#cargar-fetch")
  .addEventListener("click", () => cargarConFetch());

document.querySelector("#cargar-roto")
  .addEventListener("click", () => cargarConFetch("no-existe.json"));

// ── 4. LO MISMO CON jQUERY ──────────────────────────────────────────────
document.querySelector("#cargar-jquery").addEventListener("click", function () {
  if (typeof window.jQuery === "undefined") {
    cargarConFetch("datos.json", "fetch de respaldo; jQuery no disponible");
    return;
  }

  mostrarEstado("Cargando con jQuery...", "cargando");

  $.getJSON("datos.json")
    .done(function (datos) {
      pintarRemoto(datos.productos);
      mostrarEstado(`${datos.productos.length} productos (vía jQuery)`, "ok");
    })
    .fail(function (jqXHR) {
      mostrarEstado(`Falló la carga: ${jqXHR.status}`, "error");
      listaRemota.innerHTML = "";
    })
    .always(function () {
      console.log("La petición terminó, con éxito o sin él.");
    });
});

// ── 5. QUÉ ES UNA PROMESA ───────────────────────────────────────────────

// ── 6. LA PESTAÑA NETWORK ───────────────────────────────────────────────
fetch("./datos.json")
  .then(respuesta => {
    console.log("Estado HTTP:", respuesta.status);
    if (!respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}`);
    }
    return respuesta.json();
  })
  .then(datos => {
    console.log("Negocio:", datos.negocio.nombre);
    console.log("Cantidad de productos:", datos.productos.length);
    console.log("Productos:", datos.productos);
  })
  .catch(error => {
    console.error("Error al cargar datos.json:", error);
  });