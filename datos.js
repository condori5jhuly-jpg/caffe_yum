// ── 1. OBJETO LITERAL ───────────────────────────────────────────────────
const cafeEspresso = {
  nombre: "Café Espresso",
  precio: 10.0,
  categoria: "cafes",
  stock: 40,
  disponible: true,
};

console.log(cafeEspresso.nombre);

const propiedad = "precio";
console.log(cafeEspresso[propiedad]);

cafeEspresso.stock = 35;
cafeEspresso.integral = false;
delete cafeEspresso.integral;

// ── 2. DESTRUCTURING ────────────────────────────────────────────────────
const { nombre, precio } = cafeEspresso;
console.log(`${nombre} cuesta Bs ${precio}`);

const cafeEnOferta = { ...cafeEspresso, precio: 8.0, nombre: "Café Espresso en oferta" };
console.log(cafeEnOferta);

// ── 3. ARREGLO DE OBJETOS ───────────────────────────────────────────────
const productos = [
  { nombre: "Café Espresso",          precio: 10.0, categoria: "cafes", stock: 40, disponible: true,
    imagen: "cafeespreso.webp", descripcion: "Café concentrado de sabor intenso, aroma profundo y una deliciosa capa de crema." },
  { nombre: "Caffe_yum Especial",     precio: 18.0, categoria: "especiales", stock: 25, disponible: true,
    imagen: "cafeespecial.jpg", descripcion: "Nuestra receta exclusiva combina café, dulzura y un sabor único." },
  { nombre: "Café Frío / Cold Brew",  precio: 15.0, categoria: "cafes_frios", stock: 8, disponible: true,
    imagen: "cafefrio.jpg", descripcion: "Café extraído en frío, suave y refrescante, ideal para los días calurosos." },
  { nombre: "Café Americano",         precio: 15.0, categoria: "cafes", stock: 30, disponible: true,
    imagen: "cafeamericano.jpg", descripcion: "Una clásica bebida a base de espresso, rebajada con agua caliente." },
  { nombre: "Café Capuchino",         precio: 14.0, categoria: "cafes", stock: 20, disponible: true,
    imagen: "cafecapuchino.jpg", descripcion: "Espreso con leche vaporizada y espuma cremosa para disfrutar en cualquier momento." },
  { nombre: "Frappé de la Casa",      precio: 15.0, categoria: "frappes", stock: 15, disponible: true,
    imagen: "frapedelacasa.jpg", descripcion: "La combinación de café, banano y canela en un frappé crea una experiencia refrescante." },
  { nombre: "Café Mocaccino", precio: 17.0, categoria: "cafes", stock: 12, disponible: true,
    imagen: "mochaccino.jpg", descripcion: "Deliciosa combinación de café espresso, chocolate y leche cremosa." },
{ nombre: "Café Latte", precio: 16.0, categoria: "cafes", stock: 18, disponible: true,
    imagen: "cafe-latte.jpg", descripcion: "Suave café espresso mezclado con leche vaporizada y una fina capa de espuma." }
];
// ── 4. LOS MÉTODOS QUE IMPORTAN ─────────────────────────────────────────

productos.forEach(p => console.log(p.nombre));

const nombres = productos.map(p => p.nombre);
console.log(nombres);

const disponibles = productos.filter(p => p.disponible);
console.log(disponibles.length, "de", productos.length, "disponibles");

const caro = productos.find(p => p.precio > 17);
console.log(caro);

console.log(nombres.includes("Café Espresso"));
console.log(productos.some(p => p.stock === 0));
console.log(productos.every(p => p.precio > 0));

const porPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log(porPrecio.map(p => p.nombre));

const valorInventario = productos.reduce(
  (acumulador, p) => acumulador + p.precio * p.stock,
  0
);

console.log("Valor del inventario: Bs", valorInventario.toFixed(2));
// ── 5. ENCADENAR ────────────────────────────────────────────────────────
const nombresDisponibles = productos
  .filter(p => p.disponible)
  .map(p => p.nombre);
console.log(nombresDisponibles);

const totalCafesFriosEnStock = productos
  .filter(p => p.categoria === "cafes_frios" && p.disponible)
  .reduce((total, p) => total + p.precio * p.stock, 0);
console.log("Cafés fríos en stock: Bs", totalCafesFriosEnStock.toFixed(2));

const porCategoria = productos.reduce((grupos, p) => {
  if (!grupos[p.categoria]) grupos[p.categoria] = [];
  grupos[p.categoria].push(p.nombre);
  return grupos;
}, {});
console.log(porCategoria);

// ── 6. CLASES ───────────────────────────────────────────────────────────
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  estaDisponible() {
    return this.stock > 0;
  }

  valorEnStock() {
    return this.precio * this.stock;
  }
}

const cafeEspecial = new Producto("Caffe_yum Especial", 18.0, 50);
console.log(cafeEspecial.nombre, cafeEspecial.estaDisponible(), cafeEspecial.valorEnStock());

class ProductoConDescuento extends Producto {
  constructor(nombre, precio, stock, descuento) {
    super(nombre, precio, stock);
    this.descuento = descuento;
  }

  precioFinal() {
    return this.precio * (1 - this.descuento / 100);
  }
}

const espressoConDescuento = new ProductoConDescuento("Café Espresso", 10.0, 20, 25);
console.log(espressoConDescuento.precioFinal(), espressoConDescuento.estaDisponible());

