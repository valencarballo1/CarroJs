const comidas = [
    {
        id:1,
        name: "Bacon y Cheddar",
        img: '../images/cheddarBacon.jpg',
        precio: 850,
        cantidad: 1
    },
    {
        id:2,
        name: "Burga Bacon y Cheddar + Bondiola",
        img: '../images/Bondiola+Cebolla.jpg',
        precio: 990,
        cantidad: 1
    },
    {
        id:3,
        name: "Cuarto De Libra",
        img: '../images/cuartoLibra.jpg',
        precio: 900,
        cantidad: 1
    }
    
];

let carrito = [];

const contenedorProductos = document.querySelector('#contenedorProductos');

const contenedorCarrito = document.querySelector('#carritoContenedor');

const vaciarCarrito = document.querySelector('#vaciarCarrito');

const contadorCarrito = document.querySelector('#contadorCarrito');

const precioTotal = document.querySelector('#precioTotal');

const pay = document.querySelector('#pay')

document.addEventListener('DOMContentLoaded', () =>{
    mostrarComidas();

    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        ActualizarCarrito(carrito)
    }
})

function mostrarComidas(){
    for (const comida of comidas) {
        const divComida = document.createElement("div");
        divComida.classList.add("card");

        const imgComida = document.createElement("img");
        imgComida.classList.add("imagen-comida");
        imgComida.src = comida.img;

        const tituloComida = document.createElement("h2");
        tituloComida.classList.add("titulo-comida");
        tituloComida.textContent = comida.name;

        const tituloPrecio = document.createElement("h5");
        tituloPrecio.classList.add("precio");
        tituloPrecio.textContent = comida.precio;

        const btnComida = document.createElement("button");
        btnComida.classList.add("btn-favorito");
        btnComida.textContent = "Añadir";
        btnComida.onclick = () =>{
            agregarAlCarrito(comida.id)
            
        };

        divComida.appendChild(imgComida);
        divComida.appendChild(tituloComida);
        divComida.appendChild(tituloPrecio)
        divComida.appendChild(btnComida);

        contenedorProductos.appendChild(divComida)

        
    }
}

const agregarAlCarrito = (id) =>{
    const existe = carrito.some(comida => comida.id === id);
    if (existe){
        const comida = carrito.map (comida => {
            if (comida.id === id){
                comida.cantidad +=1
                comida.precio += comida.precio;
            }
        })
    } else{
        const comidasAgregadas = comidas.find(comida => comida.id === id);
    
        console.log(comidasAgregadas.name, comidasAgregadas.precio);
    
        carrito.push(comidasAgregadas);

    }
    ActualizarCarrito(carrito);
}

function ActualizarCarrito(agregada){
    carritoContenedor.innerHTML = "";
        for (const agregadas of agregada) {
        const divComida = document.createElement("div");
        divComida.classList.add("card");

        const imgComida = document.createElement("img");
        imgComida.classList.add("imagen-comida");
        imgComida.src = agregadas.img;

        const tituloComida = document.createElement("h2");
        tituloComida.classList.add("titulo-comida");
        tituloComida.textContent = agregadas.name;

        const tituloPrecio = document.createElement("h5");
        tituloPrecio.classList.add("precio");
        tituloPrecio.textContent = agregadas.precio;

        const tituloCantidad = document.createElement("h6");
        tituloCantidad.classList.add("precio");
        tituloCantidad.textContent = "Cantidad " + agregadas.cantidad;

        const btnComida = document.createElement("button");
        btnComida.classList.add("btn-favorito");
        btnComida.textContent = "Eliminar";
        btnComida.onclick = () =>{
            eliminarDelCarrito(agregadas.id)
            
        };

        divComida.appendChild(imgComida);
        divComida.appendChild(tituloComida);
        divComida.appendChild(tituloCantidad);
        divComida.appendChild(tituloPrecio);

        divComida.appendChild(btnComida);

        carritoContenedor.appendChild(divComida)
        localStorage.setItem('carrito', JSON.stringify(carrito))       
    }
    contadorCarrito.innerText = carrito.length;
    Total = precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0);
}

const eliminarDelCarrito = (id) =>{
    const comidasAgregadas = carrito.find(comida => comida.id === id);
    const indice = carrito.indexOf(comidasAgregadas)
    carrito.splice(indice, 1);
    ActualizarCarrito(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

vaciarCarrito.addEventListener('click', () =>{
    carrito.length = 0;
    ActualizarCarrito(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito))

})

pay.addEventListener('click', () =>{
    if (Total > 0){
        alert("El monto total es de: $" + Total);
        carrito.length = 0;
        ActualizarCarrito(carrito);
        localStorage.setItem('carrito', JSON.stringify(carrito))
    } else{
        alert("No seleccionaste ningun producto");
    }
})





