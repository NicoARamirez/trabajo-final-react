import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "@/components/context/AuthContext";


const ProductEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
  });

  const { user } = useAuth(); 
  const history = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakeapi.platzi.com/en/rest/products/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error obteniendo el detalle del producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

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
        await axios.put(`https://fakeapi.platzi.com/en/rest/products/${id}`, formData);

        history.push(`/products/${id}`);
      } catch (error) {
        console.error('Error al editar el producto:', error);
      }
    } else {
      console.warn('No tienes permisos para editar productos.');
    }
  };

  return (
    <div>
      <h2>Editar Producto</h2>
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
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ProductEdit;
