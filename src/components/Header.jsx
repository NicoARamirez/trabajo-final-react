import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "@/components/context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/categories">Categorías</Link>
          </li>
          <li>
            <Link to="/products">Productos</Link>
          </li>
          {user ? (
            <li>
              <button onClick={logout}>Cerrar Sesión</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
              <li>
                <Link to="/register">Registrarse</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
