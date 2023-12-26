import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "@/components/context/AuthContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error obteniendo la lista de productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = (productId) => {
    if (user && user.isAdmin) {
      console.log(`Eliminar producto con ID ${productId}`);
    } else {
      console.warn('No tienes permisos para eliminar productos.');
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.title}</h3>
            </Link>
            <p>Precio: ${product.price}</p>
            <p>{product.description}</p>
            {user && user.isAdmin && (
              <button onClick={() => handleDeleteProduct(product.id)}>
                Eliminar producto
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
