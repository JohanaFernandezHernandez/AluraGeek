import { ConexionApi } from "./conexionApi";

const lista = document.querySelector(".container__card");

//Listar Productos
export default function construyendoCard(precio, nombre, imagen, id) {
  const card = document.createElement("li");
  card.classList = "card";

  card.innerHTML = `<img class="card__img" src=${imagen} alt="Producto 1" />
            <p class="parrafo">${nombre}</p>
            <div class="card__precio">
              <p class="parrafo">${precio}</p>
              <button class="card__button" data-id="${id}" >
                <img src="./public/Vector.png" alt="Eliminar">
              </button>
            </div>`;

  return card;
}

export const ListaVideos = async () => {
  try {
    const { getProducts, deleteProduct } = await ConexionApi();
    const ListaApi = await getProducts();

    // Limpiar el contenedor de tarjetas antes de renderizar
    lista.innerHTML = "";

    ListaApi.forEach((element) => {
      const cardElement = construyendoCard(
        element.precio,
        element.nombre,
        element.imagen,
        element.id 
      );

       // Asignar evento al botón de eliminar
       const deleteButton = cardElement.querySelector(".card__button");
       deleteButton.addEventListener("click", async () => {
         try {
           await deleteProduct(element.id);
           await ListaVideos();
         } catch (error) {
           console.error("Error al eliminar el producto:", error);
         }
       });

      
      lista.appendChild(cardElement); 
    });
  } catch (error) {
    console.error("Error al cargar la lista de videos:", error);
    lista.innerHTML = `<h2 class="mensaje__titulo">No fue posible cargar la lista de videos</h2>`;
  }
};

ListaVideos();
