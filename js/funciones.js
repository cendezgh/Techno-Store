
// Función para cargar el contenido del carrito de compra previamente guardado en localStorage
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
  
  // Función para guardar el contenido del carrito de compra en localStorage
  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carritoCompra));
  }
  
  // Función para determinar si dos objetos son iguales, comparando sus propiedades
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