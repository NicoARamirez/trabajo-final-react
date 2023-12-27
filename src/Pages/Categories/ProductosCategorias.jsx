import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export const CategoryProducts = () => {
    const { CategoryId } = useParams();
    const [categoria, setCategoria] = useState(null);
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);



    const fetchCategorieById = async (id) => {

        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${CategoryId}`);
            if (!response.ok) {
                throw new Error('la carga ha fallado. ');
            }
            const data = await response.json();
            setCategoria(data);
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    const fetchProductsByCategory = async () => {
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${CategoryId}/products`)
            if (!response.ok) {
                throw new Error('la carga ha fallado. Intente nuevamente');
            }
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategorieById();
        fetchProductsByCategory();
    }, [CategoryId]);




    return (

        <div className="container ">

            <h2>Productos de la categoria: {categoria?.name} </h2>
            <button>
              <Link to={`/categoria/actualizarcategoria/${CategoryId}`}>Actualizar categoria</Link>
            </button>
            <button>
              <Link to={`/producto/agregarproducto`}>Agregar producto a la categoria</Link>
            </button>
            <hr/>
            {productos.map((producto) => (
                <ul key={producto.id}>
                    <li>
                        <p>
                            <Link to={`/producto/${producto.id}`}>{producto.title}</Link>
                        </p>
                        <p> $ {producto.price}</p>
                        <p> Caracteristicas {producto.description}</p>
                        <div>
                            {producto.images.map((imagen, index) => (
                                <img
                                    key={index}
                                    src={imagen} style={{
                                      width: "300px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      marginBottom: "0"
                                    }}

                                />
                            ))}
                            <p></p>
                            <Link to={`/categories/deletecategory/${CategoryId}`}>Eliminar esta Categoria</Link>
                        </div>
                    </li>
                </ul>
            ))}
        </div>
    )
}

export default CategoryProducts;
