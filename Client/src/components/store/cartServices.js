import axios from "axios";

// Función para obtener el carrito del cliente logueado
export const getCart = async () => {
  try {
    // Obtener el username del cliente logueado desde el localStorage
    const username = localStorage.getItem("userCliente");

    // Verificar que el usuario esté logueado
    if (!username) {
      throw new Error("Usuario no logueado");
    }

    // Enviar solicitud al backend con el username en el cuerpo de la solicitud
    const response = await axios.post("http://localhost:5000/cart/get", { username }, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;  // Devuelve los datos del carrito
  } catch (error) {
    console.error("Error obteniendo el carrito:", error);
    throw error;  // Lanza el error para ser manejado en el front-end
  }
};

// Función para crear o actualizar el carrito del cliente logueado
export const createCart = async (cartData) => {
  try {
    console.log("Enviando datos del carrito:", cartData);  // Agregar log para depuración
    const response = await axios.post("http://localhost:5000/cart", cartData, {  // Aqui Salta error 
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear/actualizar el carrito:", error.response?.data || error.message);
    throw error;
  }
};

// Función para obtener todos los carritos (ventas)
export const getAllCarts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/cart/getAll");
    return response.data.carts;  // Devuelve los datos de los carritos (ventas)
  } catch (error) {
    console.error("Error obteniendo todos los carritos:", error);
    throw error;
  }
};

