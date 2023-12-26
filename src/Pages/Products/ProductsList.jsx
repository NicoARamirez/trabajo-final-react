import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "@/components/context/AuthContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default'); // default, asc, desc, az y za (los filtros de busqueda)
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

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case 'asc':
          return a.price - b.price;
        case 'desc':
          return b.price - a.price;
        case 'az':
          return a.title.localeCompare(b.title);
        case 'za':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <div>
      <h2>Lista de Productos</h2>

      {/* Barra de busqueda */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filtro de busqueda */}
      <label>
        Ordenar por:
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Predeterminado</option>
          <option value="asc">Precio (Menor a Mayor)</option>
          <option value="desc">Precio (Mayor a Menor)</option>
          <option value="az">Nombre (A - Z)</option>
          <option value="za">Nombre (Z - A)</option>
        </select>
      </label>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.title}</h3>
              <img src={product.images} style={{
            width: "300px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "0"
          }}></img>
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
