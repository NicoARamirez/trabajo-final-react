import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      const existingProductIndex = state.findIndex((item) => item.id === action.payload.id);

      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingProductIndex].quantity += action.payload.quantity;
        updatedCart.totalItems += action.payload.quantity; // Actualiza la cantidad total de ítems
        updatedCart.totalPrice += action.payload.price * action.payload.quantity; // Actualiza el precio total
        return updatedCart;
      } else {
        const newCart = [...state, action.payload];
        newCart.totalItems += action.payload.quantity; // Actualiza la cantidad total de ítems
        newCart.totalPrice += action.payload.price * action.payload.quantity; // Actualiza el precio total
        return newCart;
      }

    case ACTIONS.REMOVE_FROM_CART:
      const updatedCart = state.filter((item) => item.id !== action.payload);
      updatedCart.totalItems -= 1; // Saca uno a la cantidad total de ítems
      updatedCart.totalPrice -= action.payload.price; // SAca el precio del producto eliminado
      return updatedCart;

    case ACTIONS.CLEAR_CART:
      return { items: [], totalItems: 0, totalPrice: 0 };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], totalItems: 0, totalPrice: 0 });

  const addToCart = (product) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }

  return context;
};
