// Definición de variables y constantes
let televisores = [];
let audifonos = [];
let proyectores = [];
let smartphones = [];
// Arreglo para almacenar los productos que se encuentran en el carrito de compra
let carritoCompra = [];

// Función para cargar la información inicial desde un archivo JSON
function cargarInformacionInicial() {
  fetch("productos.json")
    .then((response) => response.json())
    .then((data) => {
      // Obtener los arrays de cada producto
      televisores = data.televisores;
      audifonos = data.audifonos;
      proyectores = data.proyectores;
      smartphones = data.smartphones;

      // Combinar los arrays en uno solo
      const todosLosProductos = televisores.concat(
        audifonos,
        proyectores,
        smartphones
      );

      // Función para mostrar los productos que se encuentran en el carrito de compra
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
          return total + producto.precio * producto.cantidad;
        }, 0);

        const contador = document.getElementById("contador-carrito");

        if (cantidadEnCarrito === 0) {
          contador.classList.add("esconder");
        } else {
          contador.classList.remove("esconder");
          contador.textContent = cantidadEnCarrito;
        }

        const fragmento = document.createDocumentFragment();

        carritoCompra.forEach((producto) => {
          const productoDiv = document.createElement("div");

          const miniFoto = document.createElement("img");
          miniFoto.src = producto.imagen;

          const tituloMarcaGrupoDiv = document.createElement("div");
          tituloMarcaGrupoDiv.textContent = `${producto.grupo} ${producto.marca}`;

          const cantidadDiv = document.createElement("div");
          cantidadDiv.textContent = `X ${producto.cantidad}`;

          const valorTotalDiv = document.createElement("div");
          valorTotalDiv.textContent = `Valor total: USD ${
            producto.precio * producto.cantidad
          }`;

          // Icono para eliminar el producto del carrito de compra
          const eliminarIcono = document.createElement("i");
          eliminarIcono.classList.add("fa-solid", "fa-circle-xmark");
          eliminarIcono.title = "Eliminar Item";

          // Listener Remover el producto del carrito cuando se hace click en el icono correspondiente
          eliminarIcono.addEventListener("click", () => {
            Swal.fire({
              title: "Deseas eliminar este item?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#0a192f",
              cancelButtonText: "Cancelar",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, eliminarlo",
            }).then((result) => {
              if (result.isConfirmed) {
                const index = carritoCompra.findIndex((item) =>
                  objetosIguales(item, producto)
                );
                carritoCompra.splice(index, 1);
                cantidadEnCarrito -= producto.cantidad;
                localStorage.setItem(
                  "cantidad-carrito",
                  cantidadEnCarrito.toString()
                );
                guardarCarrito();
                mostrarCarrito();
              }
            });
          });

          // Agregar los elementos HTML creados para cada producto al fragmento
          productoDiv.appendChild(miniFoto);
          productoDiv.appendChild(tituloMarcaGrupoDiv);
          productoDiv.appendChild(cantidadDiv);
          productoDiv.appendChild(valorTotalDiv);
          productoDiv.appendChild(eliminarIcono);

          fragmento.appendChild(productoDiv);
        });

        contenedorCarrito.appendChild(fragmento);

        // Agregar un elemento HTML que muestre el valor total del contenido actual del carrito de compra
        const valorTotalCarritoTitle = document.createElement("h4");
        valorTotalCarritoTitle.textContent = `Valor Total del Carrito: USD ${valorTotalCarrito}`;
        contenedorCarrito.appendChild(valorTotalCarritoTitle);

        // Agregar un botón para vaciar el contenido del carrito
        const botonVaciar = document.createElement("a");
        botonVaciar.textContent = "Vaciar Carrito";
        botonVaciar.className = "boton";

        // Listener Vaciar el contenido cuando se hace click en el botón correspondiente
        botonVaciar.addEventListener("click", () => {
          Swal.fire({
            title: "Deseas vaciar el carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0a192f",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, vaciarlo",
          }).then((result) => {
            if (result.isConfirmed) {
              carritoCompra = [];
              localStorage.removeItem("carrito");
              localStorage.setItem("cantidad-carrito", "0");
              mostrarCarrito();
            }
          });
        }
        );

        contenedorCarrito.appendChild(botonVaciar);
      }

      // Obtener el contenedor HTML donde se agregarán los productos a la venta
      const contenedorProductos = document.getElementById(
        "contenedor-productos"
      );

      // Recorrer todos los productos y crear elementos HTML para cada uno
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

        // Lista de características para cada producto
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

        // Agregar un botón para agregar el producto al carrito de compra
        const boton = document.createElement("a");
        boton.textContent = "Agregar al Carrito";
        boton.className = "boton";

        // Listener para agregar el producto cuando se hace click en el botón correspondiente
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

        // Agregar los elementos HTML creados para cada producto al contenedor general de productos a la venta
        card.appendChild(titulo);
        card.appendChild(foto);
        card.appendChild(precio);
        card.appendChild(listaCaracteristicas);
        card.appendChild(boton);
        contenedorProductos.appendChild(card);
      });

      // Obtener los elementos HTML para mostrar el carrito de compra
      const iconCart = document.querySelector(".icon-cart");
      const aparecer = document.querySelector(".aparecer");

      // Event listener para mostrar u ocultar el carrito de compra al hacer click en su correspondiente ícono
      iconCart.addEventListener("click", () => {
        aparecer.style.right =
          aparecer.style.right === "0px" ? "-510px" : "0px";
      });

      // Cargar y mostrar el contenido previo del carrito de compra
      cargarCarrito();
      mostrarCarrito();
    });
}

// Cargar la información inicial
cargarInformacionInicial();
