import { ConexionApi } from "./conexionApi";
import { ListaVideos } from "./main";

const formulario = document.querySelector(".form");
const limpiar = document.querySelector('.button__limpiar');


async function CrearProducto(evento) {
  evento.preventDefault();

  const nombre = document.querySelector("[data-nombre]").value;
  const precio = document.querySelector("[data-precio]").value;
  const imagen = document.querySelector("[data-imagen]").value;

  try {
    const { createProducts } = await ConexionApi();
    await createProducts(nombre, precio, imagen);

    // Volver a cargar la lista de productos
    await ListaVideos();

    // Limpiar el formulario después de agregar el producto
    formulario.reset();
  } catch (error) {
    alert(error);
  }
}

// Función para limpiar el formulario
export const limpiarFormulario = () => {
    document.addEventListener("click", (event) => {
      if (event.target && event.target.classList.contains("button__limpiar")) {
        formulario.reset();
      }
    });
  };
  
  // Inicializar evento para el botón limpiar
  limpiarFormulario();

formulario.addEventListener("submit", (evento) => CrearProducto(evento));
