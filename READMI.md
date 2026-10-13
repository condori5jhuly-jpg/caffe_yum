# [Caffe_yum — Cafetería y pedidos de café]

**Estudiante:** [Jhuly Condori Tito]
**Cliente:** [Caffe_yum]
**URL publicada:** [DESPUES, PROXIMA SEMANA]

## Qué resuelve
[Caffe_yum presenta productos de una cafetería, mostrar sus precios y horarios de atención para facilitar que los clientes realicen sus pedidos. El sitio incluye una galería con imágenes y descripciones de seis variedades de café, una tabla de precios y disponibilidad, un formulario para solicitar pedidos y una sección con información de contacto.]

## Cómo está construido
- **Semántica:** [Utilicé  etiquetas como header, nav, main, section, article, aside y footer para organizar el contenido.Como tambien  una tabla con caption, thead, tbody y encabezados th para presentar los precios y la disponibilidad de los productos. También utilicé form, fieldset, legend y label para estructurar el formulario de pedidos, junto con validaciones HTML para los campos obligatorios y el número de teléfono. Las imágenes incluyen atributos alt para describir su contenido.]
- **Layout:** [Utilicé Flexbox en el encabezado para distribuir el nombre de la cafetería, el logotipo y el menú de navegación. También lo utilicé para alinear los enlaces y organizar los elementos del encabezado. Implementé CSS Grid en la sección de productos para distribuir las tarjetas en columnas. En la galería utilicé cuatro columnas en pantallas grandes, dos columnas en tabletas y una columna en celulares. Además, incorporé media queries para adaptar los tamaños, espacios y distribución de los elementos a diferentes pantallas.]
- **Diseño:** [Elegí una paleta de colores inspirada en el café, con tonos oscuros y cálidos. El color principal es #320000 (marrón muy oscuro), el color de acento es #B8471F (terracota), el fondo utiliza #F7EFE4 (crema) y las tarjetas tienen un fondo blanco #FFFFFF. También utilicé bordes en tonos marrones para mantener una identidad visual coherente. Para la tipografía elegí una familia de sistema (system-ui, Segoe UI y Roboto como alternativas), buscando una lectura clara y una apariencia moderna. Añadí sombras suaves, bordes redondeados y efectos al pasar el cursor sobre las tarjetas.]

## Capturas
![Escritorio](captura-escritorio.png)
![Móvil 375px](ruta/a/captura-movil.png) DESPUES, PROXIMA SEMANA

## Lo más difícil
[Uno de los retos técnicos fue adaptar la galería de productos a diferentes tamaños de pantalla sin que las tarjetas se desbordaran o perdieran su organización. Para resolverlo, utilicé CSS Grid con grid-template-columns y minmax(0, 1fr), estableciendo cuatro columnas para pantallas grandes, dos columnas cuando el ancho es de 900 píxeles o menos y una columna cuando el ancho es de 480 píxeles o menos. También utilicé min-width: 0 y overflow: hidden en las tarjetas para controlar el contenido y evitar desbordamientos.

Otro aspecto importante fue adaptar el encabezado para que el nombre de la cafetería, el logotipo y los enlaces de navegación pudieran organizarse en pantallas pequeñas mediante Flexbox y media queries.]


