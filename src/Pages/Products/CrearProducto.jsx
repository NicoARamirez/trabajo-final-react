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


    if (user && user.AdminRoute) {
      try {
      
        await axios.post('https://fakeapi.platzi.com/en/rest/products/', formData);

        history.push('/productos');
      } catch (error) {
        console.error('Error al crear el producto:', error);
      }
    } else {
      console.warn('No tenes rol de admin');
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
        <p></p>
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <p></p>
        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <p></p>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default ProductCreate;
