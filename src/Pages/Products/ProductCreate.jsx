import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/components/context/AuthContext";


const ProductCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
  });

  const { user } = useAuth(); 
  const history = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (user && user.isAdmin) {
      try {
      
        await axios.post('https://fakeapi.platzi.com/en/rest/products/', formData);

        history.push('/products');
      } catch (error) {
        console.error('Error al crear el producto:', error);
      }
    } else {
      console.warn('No tienes permisos para crear productos.');
    }
  };

  return (
    <div>
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default ProductCreate;
