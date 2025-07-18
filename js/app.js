document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const renderizarProductos = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        let contenedorProductos = document.getElementById("contenedor-productos");
        contenedorProductos.innerHTML = ""; // Limpia antes de renderizar

        for (const producto of data.products) {
          let tarjetaProducto = document.createElement("article");
          tarjetaProducto.classList.add("producto-card");

          let imagenProducto = document.createElement("img");
          imagenProducto.src = producto.images[0]; // <- corregido
          imagenProducto.alt = producto.description;

          let tituloProducto = document.createElement("h3");
          tituloProducto.classList.add("titulo-producto");
          tituloProducto.textContent = producto.title;

          let precioProducto = document.createElement("p");
          precioProducto.textContent = `$${producto.price}`;

          let btnAgregar = document.createElement("button");
          btnAgregar.textContent = "Agregar";

          btnAgregar.addEventListener("click", () => {
            alert(`${producto.title} agregado al carrito`);
            agregarProducto(producto); 
            actualizarAgregados();
          });

          // Añadir elementos a la tarjeta
          tarjetaProducto.appendChild(imagenProducto);
          tarjetaProducto.appendChild(tituloProducto);
          tarjetaProducto.appendChild(precioProducto);
          tarjetaProducto.appendChild(btnAgregar); 

          // Añadir la tarjeta al contenedor
          contenedorProductos.appendChild(tarjetaProducto);
        }
      })
      .catch((err) => console.error("Error: ", err));
  };

  const agregarProducto = (producto) => {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const actualizarAgregados = () => {
    const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito) {
      contadorCarrito.textContent = carrito.length;
    }
  };

  renderizarProductos();
  actualizarAgregados();
});
