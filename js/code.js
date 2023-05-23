//Mis constantes y variables
const televisores = [
  {
    grupo: "Televisor",
    marca: "Samsung",
    imagen: "./images/tv-samsung55.webp",
    pulgadas: 55,
    tecnologia: "LED",
    precio: 800,
  },
  {
    grupo: "Televisor",
    marca: "LG",
    imagen: "./images/tv-lg50.webp",
    pulgadas: 50,
    tecnologia: "OLED",
    precio: 1200,
  },
  {
    grupo: "Televisor",
    marca: "Samsung",
    imagen: "./images/tv-samsung65.webp",
    pulgadas: 65,
    tecnologia: "QLED",
    precio: 1500,
  },
  {
    grupo: "Televisor",
    marca: "Sony",
    imagen: "./images/tv-sony65.webp",
    pulgadas: 65,
    tecnologia: "LED",
    precio: 700,
  },
  {
    grupo: "Televisor",
    marca: "LG",
    imagen: "./images/tv-lg60.webp",
    pulgadas: 60,
    tecnologia: "QLED",
    precio: 2000,
  },
];

const audifonos = [
  {
    grupo: "Audifono",
    marca: "Bose",
    imagen: "./images/audi-bose-20-i.webp",
    potencia: 20,
    tipo: "inalámbricos",
    precio: 100,
  },
  {
    grupo: "Audifono",
    marca: "JBL",
    imagen: "./images/audi-jbl-30-a.webp",
    potencia: 30,
    tipo: "alámbricos",
    precio: 50,
  },
  {
    grupo: "Audifono",
    marca: "Sony",
    imagen: "./images/audi-sony-25-i.webp",
    potencia: 25,
    tipo: "inalámbricos",
    precio: 75,
  },
  {
    grupo: "Audifono",
    marca: "Bose",
    imagen: "./images/audi-bose-15-i.webp",
    potencia: 15,
    tipo: "inalámbricos",
    precio: 80,
  },
  {
    grupo: "Audifono",
    marca: "JBL",
    imagen: "./images/audi-jbl-35-i.webp",
    potencia: 35,
    tipo: "inalámbricos",
    precio: 120,
  },
];

const proyectores = [
  {
    grupo: "Proyector",
    marca: "Epson",
    imagen: "./images/proy-epson-2000.webp",
    lumens: 2000,
    precio: 400,
  },
  {
    grupo: "Proyector",
    marca: "BenQ",
    imagen: "./images/proy-benq-2500.webp",
    lumens: 2500,
    precio: 550,
  },
  {
    grupo: "Proyector",
    marca: "Epson",
    imagen: "./images/proy-epson-3500.webp",
    lumens: 3500,
    precio: 700,
  },
  {
    grupo: "Proyector",
    marca: "Epson",
    imagen: "./images/proy-epson-1500.webp",
    lumens: 1500,
    precio: 300,
  },
  {
    grupo: "Proyector",
    marca: "BenQ",
    imagen: "./images/proy-benq-3500.webp",
    lumens: 3500,
    precio: 900,
  },
];

const smartphones = [
  {
    grupo: "Smartphone",
    marca: "Samsung",
    imagen: "./images/phone-samsung-6.1.webp",
    pantalla: "6.1 pulgadas",
    ram: "4GB",
    capacidad: "128GB",
    procesador: "Snapdragon 765",
    precio: 400,
  },
  {
    grupo: "Smartphone",
    marca: "Xiaomi",
    imagen: "./images/phone-xiaomi-6.5.webp",
    pantalla: "6.5 pulgadas",
    ram: "6GB",
    capacidad: "128GB",
    procesador: "MediaTek Helio G95",
    precio: 300,
  },
  {
    grupo: "Smartphone",
    marca: "Samsung",
    imagen: "./images/phone-samsung-5.8.webp",
    pantalla: "5.8 pulgadas",
    ram: "3GB",
    capacidad: "64GB",
    procesador: "Apple A14",
    precio: 800,
  },
  {
    grupo: "Smartphone",
    marca: "OnePlus",
    imagen: "./images/phone-oneplus-6.7.webp",
    pantalla: "6.7 pulgadas",
    ram: "8GB",
    capacidad: "256GB",
    procesador: "Qualcomm Snapdragon 888",
    precio: 1200,
  },
  {
    grupo: "Smartphone",
    marca: "Xiaomi",
    imagen: "./images/phone-xiaomi-6.2.webp",
    pantalla: "6.2 pulgadas",
    ram: "4GB",
    capacidad: "64GB",
    procesador: "Exynos 9611",
    precio: 250,
  },
];

const todosLosProductos = televisores.concat(
  audifonos,
  proyectores,
  smartphones
);
let carritoCompra = [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carritoCompra));
}

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carritoCompra = JSON.parse(carritoGuardado);
  }

  const cantidadEnCarrito = localStorage.getItem("cantidad-carrito");
  const contador = document.getElementById("contador-carrito");

  if (cantidadEnCarrito === null || parseInt(cantidadEnCarrito) === 0) {
    contador.classList.add("esconder");
    contador.textContent = "0";
  } else {
    contador.classList.remove("esconder");
    contador.textContent = cantidadEnCarrito;
  }
}

function mostrarCarrito() {
  const contenedorCarrito = document.getElementById("mi-carrito");
  contenedorCarrito.innerHTML = "";

  const cerrarIcono = document.createElement("i");
  cerrarIcono.classList.add("fa-solid", "fa-xmark", "close-cart");

  cerrarIcono.addEventListener("click", () => {
    aparecer.style.right = "-505px";
  });

  contenedorCarrito.prepend(cerrarIcono);

  if (carritoCompra.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "El carrito está vacío";
    contenedorCarrito.appendChild(mensaje);

    const contador = document.getElementById("contador-carrito");
    contador.classList.add("esconder");
    contador.textContent = "0";

    return;
  }

  let cantidadEnCarrito = carritoCompra.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  let valorTotalCarrito = carritoCompra.reduce((total, producto) => {
    return total + (producto.precio * producto.cantidad);
  }, 0);

  const contador = document.getElementById("contador-carrito");

  if (cantidadEnCarrito === 0) {
    contador.classList.add("esconder");
  } else {
    contador.classList.remove("esconder");
    contador.textContent = cantidadEnCarrito;
  }

  carritoCompra.forEach((producto) => {
    const productoDiv = document.createElement("div");

    const miniFoto = document.createElement("img");
    miniFoto.src = producto.imagen;

    const tituloMarcaGrupoDiv = document.createElement("div");
    tituloMarcaGrupoDiv.textContent = `${producto.grupo} ${producto.marca}`;

    const cantidadDiv = document.createElement("div");
    cantidadDiv.textContent = `X ${producto.cantidad}`;

    const valorTotalDiv = document.createElement("div");
    valorTotalDiv.textContent = `Valor total: USD ${producto.precio * producto.cantidad}`;

    const eliminarIcono = document.createElement("i");
    eliminarIcono.classList.add("fa-solid", "fa-circle-xmark");
    eliminarIcono.title = "Eliminar Item";

    eliminarIcono.addEventListener("click", () => {
      let index = carritoCompra.findIndex((item) =>
        objetosIguales(item, producto)
      );
      carritoCompra.splice(index, 1);
      cantidadEnCarrito = carritoCompra.reduce(
        (total, producto) => total + producto.cantidad,
        0
      );
      localStorage.setItem("cantidad-carrito", cantidadEnCarrito.toString());
      guardarCarrito();
      mostrarCarrito();
    });

    productoDiv.appendChild(miniFoto);
    productoDiv.appendChild(tituloMarcaGrupoDiv);
    productoDiv.appendChild(cantidadDiv);
    productoDiv.appendChild(valorTotalDiv);
    productoDiv.appendChild(eliminarIcono);

    contenedorCarrito.appendChild(productoDiv);
  });

  

  const valorTotalCarritoTitle = document.createElement('h4');
  valorTotalCarritoTitle.textContent=`Valor Total del Carrito: USD ${valorTotalCarrito}`;
  contenedorCarrito.appendChild(valorTotalCarritoTitle);

  const botonVaciar = document.createElement("a");
  botonVaciar.textContent = "Vaciar Carrito";
  botonVaciar.className = "boton";

  botonVaciar.addEventListener("click", () => {
    carritoCompra = [];
    localStorage.removeItem("carrito");
    localStorage.setItem("cantidad-carrito", "0");
    mostrarCarrito();
  });

  contenedorCarrito.appendChild(botonVaciar);
}

function objetosIguales(objeto1, objeto2) {
  const propsObj1 = Object.getOwnPropertyNames(objeto1);
  const propsObj2 = Object.getOwnPropertyNames(objeto2);

  if (propsObj1.length !== propsObj2.length) {
    return false;
  }

  for (let i = 0; i < propsObj1.length; i++) {
    const propName = propsObj1[i];
    if (objeto1[propName] !== objeto2[propName]) {
      return false;
    }
  }

  return true;
}

const contenedorProductos = document.getElementById("contenedor-productos");

todosLosProductos.forEach((producto) => {
  const card = document.createElement("div");
  card.className = "card";

  const titulo = document.createElement("h3");
  titulo.textContent = `${producto.grupo} ${producto.marca}`;

  const foto = document.createElement("img");
  foto.src = producto.imagen;

  const precio = document.createElement("div");
  precio.textContent = `USD ${producto.precio}`;

  const listaCaracteristicas = document.createElement("ul");
  for (const propiedad in producto) {
    if (
      propiedad !== "grupo" &&
      propiedad !== "marca" &&
      propiedad !== "precio" &&
      propiedad !== "imagen"
    ) {
      const caracteristica = document.createElement("li");
      caracteristica.textContent = `${propiedad}: ${producto[propiedad]}`;
      listaCaracteristicas.appendChild(caracteristica);
    }
  }

  const boton = document.createElement("a");
  boton.textContent = "Agregar al Carrito";
  boton.className = "boton";

  boton.addEventListener("click", () => {
    let indexProductoEnCarrito = -1;

    for (let i = 0; i < carritoCompra.length; i++) {
      if (objetosIguales(carritoCompra[i], producto)) {
        indexProductoEnCarrito = i;
        break;
      }
    }

    if (indexProductoEnCarrito >= 0) {
      carritoCompra[indexProductoEnCarrito].cantidad++;
    } else {
      producto.cantidad = 1;
      carritoCompra.push(producto);
    }

    console.log("Carrito:", carritoCompra);
    mostrarCarrito();
    guardarCarrito();
  });

  card.appendChild(titulo);
  card.appendChild(foto);
  card.appendChild(precio);
  card.appendChild(listaCaracteristicas);
  card.appendChild(boton);
  contenedorProductos.appendChild(card);
});

const iconCart = document.querySelector(".icon-cart");
const aparecer = document.querySelector(".aparecer");

iconCart.addEventListener("click", () => {
  aparecer.style.right = aparecer.style.right === "0px" ? "-510px" : "0px";
});

cargarCarrito();
mostrarCarrito();
