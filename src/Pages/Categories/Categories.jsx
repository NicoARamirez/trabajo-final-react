import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorCategories, setErrorCategories] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        const data = await response.json();
        setCategories(data);
        setLoadingCategories(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setErrorCategories('Error fetching categories');
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (selectedCategoryId !== null) {
        try {
          setLoadingProducts(true);
          const response = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${selectedCategoryId}`);
          const data = await response.json();

          const newCategoryProducts = data.products || [];

          setCategoryProducts(newCategoryProducts);
        } catch (error) {
          console.error('Error fetching category products:', error);
          setErrorProducts('Error fetching category products');
        } finally {
          setLoadingProducts(false);
        }
      } else {
        setCategoryProducts([]);
        setLoadingProducts(false);
      }
    };

    fetchCategoryProducts();
  }, [selectedCategoryId]);

  return (
    <div>
      <h2>Categorías</h2>
      {errorCategories ? (
        <p>{errorCategories}</p>
      ) : loadingCategories ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
            <img src={category.image} style={{
            width: "300px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "0"
          }}></img>
            <Link to={`/categories/${category.id}/products`}>{category.name}</Link>  
          </li>
          ))}
        </ul>
      )}

      <h2>Productos de la categoría</h2>
      {errorProducts ? (
        <p>{errorProducts}</p>
      ) : loadingProducts ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {categoryProducts.map((product) => (
            <li key={product.id}>{product.name}
            <img src={product.image}></img>
            </li>
            
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
