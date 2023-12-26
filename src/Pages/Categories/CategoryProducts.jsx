import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from "@/components/context/AuthContext";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCategoryInfo = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`);
        if (!response.ok) {
          throw new Error('Error al obtener información de la categoría');
        }
        const categoryData = await response.json();
        setCategoryName(categoryData.name);
      } catch (error) {
        console.error('Error al obtener información de la categoría:', error.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error.message);
      }
    };

    fetchCategoryInfo();
    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <h1>Productos de la Categoría {categoryName}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.title}</h3>
              <img src={product.images}></img>
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

export default CategoryProducts;
