import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from "@/components/context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);

        if (!response.ok) {
          throw new Error(`No se encontró el detalle del producto con ID ${id}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error obteniendo el detalle del producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDeleteProduct = () => {
    if (user && user.isAdmin) {
      console.log(`Eliminar producto con ID ${id}`);
    } else {
      console.warn('No tienes permisos para eliminar productos.');
    }
  };

  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.images} style={{
            width: "300px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "0"
          }}></img>
      <p>Precio: ${product.price}</p>
      <p>{product.description}</p>
      {user && user.isAdmin && (
        <button onClick={handleDeleteProduct}>
          Eliminar producto
        </button>
      )}
    </div>
  );
};

export default ProductDetail;
