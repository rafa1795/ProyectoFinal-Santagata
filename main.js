

const productos = [
    {
        id: "cooler",
        nombre: "cooler liquido",
        imagen: "./imagenes/cooler loquido.jpg",
        precio: 80,
    },
    {
        id: "intel",
        nombre: "intel i9",
        imagen: "./imagenes/core i9.jpg",
        precio: 550,
    },
    {
        id: "fuente",
        nombre: "fuente P550",
        imagen: "./imagenes/fuente.jpg",
        precio: 100
    },


    {
        id: "gabinete",
        nombre: "gabinete con fan´s",
        imagen: "./imagenes/gabinete2.jpg",
        precio: 70,
    },
    {
        id: "grafica",
        nombre: "Grafica RTX3070",
        imagen: "./imagenes/gpu.jpg",
        precio: 400,
    },
    {
        id: "pc1",
        nombre: "PC intel I9 10th",
        imagen: "./imagenes/pc1.jpg",
        precio: 1200,
    },
    {
        id: "pc2",
        nombre: "PC intel I7 9th",
        imagen: "./imagenes/pc2.jpg",
        precio: 1100,
    },
    {
        id: "pc3",
        nombre: "PC AMD Ryzen 9",
        imagen: "./imagenes/pc3.jpg",
        precio: 1100,
    },
    {
        id: "placa",
        nombre: "Placa H410M",
        imagen:  "./imagenes/placag.jpg",
        precio: 100,
    },
    {
        id: "ram",
        nombre: "RAM Kingston 8g",
        imagen: "./imagenes/ram.jpg",
        precio: 45,
    },
    {
        id: "ssd",
        nombre: "SSD 1tb",
        imagen: "./imagenes/solido.jpg",
        precio: 90,
    },

];


let carritoProductos = [];



let precioTotal = 0;

if (localStorage.getItem('carritoProductos')) {
    carritoProductos = JSON.parse(localStorage.getItem('carritoProductos'));
}

if (localStorage.getItem('precioTotal')) {
    precioTotal = parseFloat(localStorage.getItem('precioTotal')) || 0;
}



const iconoCarrito = document.querySelector("#carrito-imagen");
const carrito = document.querySelector(".carrito");
const cerrarCarrito = document.querySelector("#cerrar-carrito");
const botonComprar = document.querySelector(".boton-comprar");
const botonVaciar = document.querySelector(".boton-vaciar");
const contenedorCarrito = document.getElementById('contenedor-carrito');
if (contenedorCarrito) {
    contenedorCarrito.innerHTML = '';
}



/*     Abrir y cerrar carrito*/

iconoCarrito.addEventListener("click", () => {
    carrito.classList.add("active");
});

cerrarCarrito.addEventListener("click", () => {
    carrito.classList.remove("active");
});

/*     Botones carrito      */

botonComprar.addEventListener("click", () => {
    if (carritoProductos.length === 0) {
        Swal.fire({
            icon: "error",
            iconColor: "#ffa500",
            title: "No hay articulos",
            text: "Debes agregar algun producto!",
        });
    } else Swal.fire({
        title: "Compra exitosa!",
        text: "Muchas gracias por elegirnos!",
        icon: "success",
        iconColor: "#ffa500",
    });
});

botonVaciar.addEventListener("click", () => {

    Swal.fire({
        icon: "warning",
        title: "Ha borrado su carrito!!",
        text: "Su carrito esta vacio",
    });

    carritoProductos = [];

    localStorage.removeItem('carritoProductos');
    localStorage.removeItem('precioTotal');

    actualizarCarrito();
});

/*       Cargar DOM      */

if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", inicio);
} else {
    inicio();
}

function inicio() {
    cargarCarritoDesdeLocalStorage();
    actualizarCarrito();
    agregarEvento();
}

/*    Agregar productos al carrito     */

function agregarEvento() {
    const botonesAgregar = document.querySelectorAll(".agregar");
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            agregarAlCarrito(index);
            Toastify({
                text: "Producto agregado!",
                duration: 2000,
                style: {
                    background: "#ffa500",
                }
            }).showToast();
        });
    });
}

function agregarAlCarrito(index) {
    if (index >= 0 && index < productos.length) {
        const productoSeleccionado = {
            id: productos[index].id,
            nombre: productos[index].nombre,
            precio: productos[index].precio,
            cantidad: 1,
        };

        const productoExistente = carritoProductos.find((producto) => producto.id === productoSeleccionado.id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carritoProductos.push(productoSeleccionado);
        }

        precioTotal = carritoProductos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    localStorage.setItem('precioTotal', precioTotal.toFixed(2));
    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));

        console.log("Carrito:", carritoProductos);
        console.log("Precio total después de agregar:", precioTotal);

        actualizarCarrito();
    } else {
        console.error(`El índice ${index} no corresponde a ningún producto.`);
    }
}

function actualizarCarrito() {
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    const precioTotalElemento = document.querySelector('.precio-total');

    let precioTotal = 0;

    contenedorCarrito.innerHTML = '';

    carritoProductos.forEach((producto) => {
        const nuevoElemento = crearElementoCarrito(producto);
        contenedorCarrito.appendChild(nuevoElemento);

        precioTotal += producto.precio * producto.cantidad;
    });

    localStorage.setItem('precioTotal', precioTotal.toFixed(2));

    precioTotalElemento.innerText = `$${precioTotal.toFixed(2)}`;
}

function crearElementoCarrito(producto) {

    const elementoProducto = document.createElement('div');
    elementoProducto.classList.add('carrito-box');

    const imagenHTML = producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-imagen-pequena">` : '';
    const nombreHTML = producto.nombre ? `<div>${producto.nombre}</div>` : '';

    elementoProducto.innerHTML = `
    ${imagenHTML}
    ${nombreHTML}
    <div class="carrito-cantidad">${producto.cantidad}</div>
    <div class="precio-carrito">$${(producto.precio * producto.cantidad).toFixed(2)}</div>
`;

    const contenedorCarrito = document.getElementById('contenedor-carrito');
    contenedorCarrito.appendChild(elementoProducto);

    return elementoProducto;
}

/*     Recupera los productos al recargar       */

function cargarCarritoDesdeLocalStorage() {
    carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')) || [];
    precioTotal = parseFloat(localStorage.getItem('precioTotal')) || 0;
}

/*       Cotizacion crypto        */

let endpoint = 'https://api.binance.com/api/v3/ticker/price';

fetch(endpoint)
    .then(response => response.json())
    .then(data => mostrarData(data))

const mostrarData = (data) => {

    const objetosDeseados = data.filter((element, index) => index === 11 || index === 12);

    const contenidoHTML = objetosDeseados.map(objeto => `<p>${objeto.symbol}: ${parseFloat(objeto.price).toFixed(2)}</p>`).join('');

    const cotizacionesDiv = document.getElementById('cotizaciones');

    cotizacionesDiv.innerHTML = '<h4>Cotizaciones:</h4> <br/>' + contenidoHTML;
};

















