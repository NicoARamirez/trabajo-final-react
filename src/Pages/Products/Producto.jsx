import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from "@/components/context/CartContext";

export const ProductDetail = () => {
    const params = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const { agregarAlCarrito } = useCart();

    const fetchProductoById = async () => {
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${params.productId}`);
            if (!response.ok) {
                throw new Error('la carga ha fallado. Intente nuevamente ');
            }
            const data = await response.json();
            setProducto(data);
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };


    useEffect(() => {
        fetchProductoById();
    }, [params.productId]);

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <Link to={`/`}>Volver al inicio</Link>
            </div>
        );
    }

    if (!producto) {
        return (
            <div>
                <p>Cargando...</p>
                <Link to={`/`}>Volver al inicio</Link>
            </div>
        );
    }

    console.log(producto.category.id)

    return (
        <div>
            <h1>Producto: {producto.title} </h1>
            <img
    src={producto.images[0]} style={{
      width: "300px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "0"
    }} // Assuming the first image in the array is the one you want to display
    alt={`Imagen de ${producto.title}`}
/>
            <p>Precio: ${producto.price} de contado efectivo </p>
            <p>Descripción {producto.description} </p>
            <p>Categoria: {producto.category.name} </p>
            <button onClick={() => agregarAlCarrito(producto)}>
                Agregar al Carrito
            </button>
            <p></p>
            <button>
                <Link to={`/producto/actualizarproducto/${producto.id}`}>Actualizar Producto</Link>
            </button>
            <p></p>
            <button>
                <Link to={`/producto/borrarproducto/${producto.id}`}>Eliminar Producto</Link>
            </button>
        </div>
    )
}

export default ProductDetail;