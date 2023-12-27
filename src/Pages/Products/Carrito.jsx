// FALTA TERMINAR - SACAR AXIOS Y CORREGIR LA API

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "@/components/context/AuthContext";


const CartDetail = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://fakeapi.platzi.com/en/rest/cart/');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error obteniendo los detalles del carrito:', error);
      }
    };

    fetchCartItems();
  }, [user]); 

  return (
    <div>
      <h2>Detalle del Carrito</h2>
      {user ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <h3>{item.product.title}</h3>
              <p>Precio: ${item.product.price}</p>
              <p>Cantidad: {item.quantity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Debes iniciar sesión para ver el detalle del carrito.</p>
      )}
    </div>
  );
};

export default CartDetail;
