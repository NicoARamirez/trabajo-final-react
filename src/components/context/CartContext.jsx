import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const agregarAlCarrito = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const eliminarDelCarrito = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const limpiarCarrito = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};