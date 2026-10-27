(() => {
  "use strict";

  const COLUMNAS = [
    { id: "hornear", nombre: "Preparar hoy" },
    { id: "reponer", nombre: "Reponer existencias" },
    { id: "pausa", nombre: "En pausa" },
  ];

  const COLUMNA_INICIAL = {
    "Café Espresso": "hornear",
    "Café Americano": "hornear",
    "Café Capuchino": "hornear",
    "Café Frío / Cold Brew": "reponer",
    "Café Mocaccino": "reponer",
    "Café Latte": "reponer",
    "Caffe_yum Especial": "pausa",
    "Frappé de la Casa": "pausa",
  };

  const zona = document.querySelector("#tablero-zona");
  const elTablero = zona?.querySelector("#tablero");
  const canvas = document.querySelector("#grafico");
  const estado = document.querySelector("#estado-tablero");

  if (!zona || !elTablero || !canvas || !estado) {
    console.error("No se pudo iniciar el tablero: faltan elementos requeridos en index.html.");
    return;
  }

  const columnas = new Map(
    COLUMNAS.map(({ id }) => [id, elTablero.querySelector(`[data-columna="${id}"]`)])
  );
  const listas = new Map(
    COLUMNAS.map(({ id }) => [id, columnas.get(id)?.querySelector(".lista-columna")])
  );
  const totales = new Map(
    COLUMNAS.map(({ id }) => [id, columnas.get(id)?.querySelector(".total")])
  );
  const contexto = canvas.getContext("2d");
  const productosPorColumna = Object.fromEntries(COLUMNAS.map(({ id }) => [id, []]));

  if ([...columnas.values(), ...listas.values(), ...totales.values()].some(elemento => !elemento)) {
    console.error("No se pudo iniciar el tablero: faltan columnas, listas o totales.");
    return;
  }

  COLUMNAS.forEach(({ id, nombre }) => {
    columnas.get(id).tabIndex = 0;
    columnas.get(id).setAttribute("aria-label", `Columna ${nombre}. Pulsa para mover aquí el producto seleccionado.`);
  });

  if (!contexto) {
    console.error("No se pudo dibujar el tablero: el navegador no ofrece un contexto 2D para canvas.");
    estado.textContent = "El gráfico no está disponible en este navegador.";
  }

  let productoArrastrado = null;
  let productoSeleccionado = null;

  function mostrarEstado(mensaje) {
    estado.textContent = mensaje;
  }

  function renderTablero() {
    COLUMNAS.forEach(({ id }) => {
      const lista = listas.get(id);
      const productos = productosPorColumna[id];
      lista.replaceChildren();

      productos.forEach(producto => {
        const ficha = document.createElement("li");
        ficha.className = "ficha";
        ficha.draggable = true;
        ficha.tabIndex = 0;
        ficha.setAttribute("role", "button");
        ficha.setAttribute("aria-pressed", String(productoSeleccionado === producto.nombre));
        ficha.setAttribute(
          "aria-label",
          `${producto.nombre}, ${producto.stock} ${producto.unidad} en existencias. Seleccionar para mover.`
        );
        ficha.dataset.producto = producto.nombre;

        const nombre = document.createElement("span");
        nombre.className = "ficha-nombre";
        nombre.textContent = producto.nombre;

        const stock = document.createElement("span");
        stock.className = "ficha-stock";
        stock.textContent = `${producto.stock} ${producto.unidad} en existencias`;

        ficha.append(nombre, stock);
        lista.append(ficha);
      });

      if (productos.length === 0) {
        const vacio = document.createElement("li");
        vacio.className = "tablero-vacio";
        vacio.textContent = "Suelta aquí un producto";
        lista.append(vacio);
      }

      const cantidad = productos.length;
      const stockTotal = productos.reduce((suma, producto) => suma + producto.stock, 0);
      totales.get(id).textContent =
        `${cantidad} ${cantidad === 1 ? "producto" : "productos"} · ${stockTotal} unidades en existencias`;
    });

    dibujarGrafico();
  }

  function moverProducto(nombre, destino) {
    if (!productosPorColumna[destino]) {
      console.error(`No se puede mover ${nombre}: la columna ${destino} no existe.`);
      mostrarEstado("No se pudo mover el producto a esa columna.");
      return;
    }

    const origen = COLUMNAS.find(({ id }) =>
      productosPorColumna[id].some(producto => producto.nombre === nombre)
    );

    if (!origen) {
      console.error(`No se pudo localizar el producto "${nombre}" en el tablero.`);
      mostrarEstado("No se encontró el producto seleccionado.");
      return;
    }

    productoSeleccionado = null;

    if (origen.id === destino) {
      mostrarEstado(`${nombre} ya está en «${COLUMNAS.find(columna => columna.id === destino).nombre}».`);
      renderTablero();
      return;
    }

    const indice = productosPorColumna[origen.id].findIndex(producto => producto.nombre === nombre);
    const [producto] = productosPorColumna[origen.id].splice(indice, 1);
    productosPorColumna[destino].push(producto);
    renderTablero();
    mostrarEstado(`${nombre} se movió a «${COLUMNAS.find(columna => columna.id === destino).nombre}».`);
  }

  function dibujarGrafico() {
    if (!contexto) return;

    const ancho = Math.max(280, Math.round(canvas.clientWidth || 600));
    const alto = Math.round(ancho * 220 / 600);
    const escala = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(ancho * escala);
    canvas.height = Math.round(alto * escala);
    contexto.setTransform(escala, 0, 0, escala, 0, 0);
    contexto.clearRect(0, 0, ancho, alto);

    const estilo = getComputedStyle(document.body);
    const colorBarra = estilo.getPropertyValue("--color-principal").trim() || "#4b291e";
    const colorTexto = estilo.getPropertyValue("--color-texto").trim() || "#332821";
    const colorAcento = estilo.getPropertyValue("--color-acento").trim() || "#b96550";
    const colorBorde = estilo.getPropertyValue("--borde-suave").trim() || "#e4d4c2";
    const valores = COLUMNAS.map(({ id }) =>
      productosPorColumna[id].reduce((suma, producto) => suma + producto.stock, 0)
    );
    const maximo = Math.max(...valores, 1);
    const margen = Math.max(28, ancho * 0.06);
    const zonaGrafico = ancho - margen * 2;
    const paso = zonaGrafico / COLUMNAS.length;
    const anchoBarra = Math.min(86, paso * 0.55);
    const yBase = alto - 43;
    const altoUtil = alto - 76;

    contexto.font = "12px system-ui, sans-serif";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.strokeStyle = colorBorde;
    contexto.beginPath();
    contexto.moveTo(margen / 2, yBase);
    contexto.lineTo(ancho - margen / 2, yBase);
    contexto.stroke();

    COLUMNAS.forEach(({ id, nombre }, indice) => {
      const valor = valores[indice];
      const altoBarra = (valor / maximo) * altoUtil;
      const x = margen + paso * indice + (paso - anchoBarra) / 2;
      const y = yBase - altoBarra;

      contexto.fillStyle = indice === 1 ? colorAcento : colorBarra;
      contexto.fillRect(x, y, anchoBarra, altoBarra);

      contexto.fillStyle = colorTexto;
      contexto.font = "600 12px system-ui, sans-serif";
      contexto.fillText(String(valor), x + anchoBarra / 2, Math.max(12, y - 10));

      contexto.font = "11px system-ui, sans-serif";
      const partes = nombre === "Reponer existencias"
        ? ["Reponer", "existencias"]
        : nombre === "Preparar hoy"
          ? ["Preparar hoy"]
          : ["En pausa"];
      partes.forEach((parte, linea) => {
        contexto.fillText(parte, margen + paso * indice + paso / 2, yBase + 15 + linea * 13);
      });
    });
  }

  function seleccionarProducto(ficha) {
    const nombre = ficha.dataset.producto;
    productoSeleccionado = productoSeleccionado === nombre ? null : nombre;
    elTablero.querySelectorAll(".ficha").forEach(elemento => {
      elemento.setAttribute("aria-pressed", String(elemento.dataset.producto === productoSeleccionado));
    });

    if (productoSeleccionado) {
      mostrarEstado(`${nombre} seleccionado. Elige una columna para moverlo.`);
    } else {
      mostrarEstado("Selección cancelada.");
    }
  }

  elTablero.addEventListener("dragstart", event => {
    const ficha = event.target.closest(".ficha");
    if (!ficha) return;

    productoArrastrado = ficha.dataset.producto;
    event.dataTransfer.setData("text/plain", productoArrastrado);
    event.dataTransfer.effectAllowed = "move";
    ficha.classList.add("arrastrando");
  });

  elTablero.addEventListener("dragend", event => {
    const ficha = event.target.closest(".ficha");
    if (ficha) ficha.classList.remove("arrastrando");
    productoArrastrado = null;
    columnas.forEach(columna => columna.classList.remove("encima"));
  });

  elTablero.addEventListener("dragover", event => {
    const columna = event.target.closest(".columna");
    if (!columna || !productoArrastrado) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    columna.classList.add("encima");
  });

  elTablero.addEventListener("dragleave", event => {
    const columna = event.target.closest(".columna");
    if (columna && !columna.contains(event.relatedTarget)) {
      columna.classList.remove("encima");
    }
  });

  elTablero.addEventListener("drop", event => {
    const columna = event.target.closest(".columna");
    if (!columna || !productoArrastrado) return;

    event.preventDefault();
    columna.classList.remove("encima");
    moverProducto(productoArrastrado, columna.dataset.columna);
    productoArrastrado = null;
  });

  elTablero.addEventListener("click", event => {
    const ficha = event.target.closest(".ficha");
    if (ficha) {
      seleccionarProducto(ficha);
      return;
    }

    const columna = event.target.closest(".columna");
    if (columna && productoSeleccionado) {
      moverProducto(productoSeleccionado, columna.dataset.columna);
    }
  });

  elTablero.addEventListener("keydown", event => {
    const ficha = event.target.closest(".ficha");
    if (ficha && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      seleccionarProducto(ficha);
      return;
    }

    const columna = event.target.closest(".columna");
    if (columna && productoSeleccionado && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      moverProducto(productoSeleccionado, columna.dataset.columna);
    }
  });

  if (typeof ResizeObserver === "function") {
    new ResizeObserver(dibujarGrafico).observe(canvas);
  } else {
    window.addEventListener("resize", dibujarGrafico);
  }

  new MutationObserver(dibujarGrafico).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });

  async function iniciarTablero() {
    mostrarEstado("Cargando productos del catálogo...");

    try {
      const respuesta = await fetch("./datos.json");
      if (!respuesta.ok) {
        throw new Error(`El servidor respondió ${respuesta.status}.`);
      }

      const datos = await respuesta.json();
      if (!datos || !Array.isArray(datos.productos)) {
        throw new Error("datos.json no contiene una lista de productos válida.");
      }

      const nombres = new Set();
      datos.productos.forEach(producto => {
        if (!producto || typeof producto.nombre !== "string" || !producto.nombre.trim()) {
          throw new Error("Hay un producto sin nombre válido en datos.json.");
        }
        if (nombres.has(producto.nombre)) {
          throw new Error(`El producto "${producto.nombre}" está duplicado en datos.json.`);
        }
        if (!Number.isFinite(producto.stock) || producto.stock < 0) {
          throw new Error(`El producto "${producto.nombre}" no tiene existencias válidas en datos.json.`);
        }
        if (typeof producto.unidad !== "string" || !producto.unidad.trim()) {
          throw new Error(`El producto "${producto.nombre}" no tiene unidad de stock en datos.json.`);
        }

        nombres.add(producto.nombre);
        const columna = COLUMNA_INICIAL[producto.nombre] || "hornear";
        productosPorColumna[columna].push(producto);
      });

      renderTablero();
      mostrarEstado(
        `${datos.productos.length} productos cargados. Arrastra una tarjeta o selecciónala y toca la columna de destino.` +
        (contexto ? "" : " El gráfico no está disponible en este navegador.")
      );
    } catch (error) {
      console.error("No se pudo cargar el tablero de productos:", error);
      mostrarEstado(`No se pudo cargar el tablero. ${error.message}`);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarTablero, { once: true });
  } else {
    iniciarTablero();
  }
})();
