import React, { createContext, useState } from "react";

// Crear el contexto del carrito
export const CartContext = createContext();

// Proveedor del carrito para envolver la aplicación
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agregar un producto al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es un producto nuevo, agregarlo al carrito
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Calcular el monto total del carrito
  const getTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Calcular el número total de productos
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getTotalAmount,
        getTotalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
