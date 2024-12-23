import Swal from "sweetalert2";

export const ConexionApi = async () => {
  const url = "http://localhost:3001/tareas";

  const getProducts = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("API responde correctamente", data);
        return data;
      } else {
        console.log("no se pudo conectar a la api");
      }
    } catch (error) {
      throw error;
    }
  };

  const createProducts = async (nombre, precio, imagen) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nombre, precio, imagen }),
      });
      if (!response.ok) {
        throw new Error("No fue posible crear el producto");
      }
      const data = await response.json();
      Swal.fire({
        title: '¡Éxito!',
        text: 'Tu producto se ha creado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      return data;

    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
        console.log(url)
        const response = await fetch(`${url}/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        if(!response.ok) {
            throw new Error('No fue posible eliminar el producto');
        }else{
            Swal.fire({
                title: '��Éxito!',
                text: 'Tu producto se ha eliminado correctamente.',
                icon:'success',
                confirmButtonText: 'Aceptar'
            })
        }
    } catch (error) {
        console.log(error)
    }

  }

  return { getProducts, createProducts, deleteProduct };
};
