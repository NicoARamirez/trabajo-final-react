import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from "@/components/context/AuthContext";


export function Header() {
  const { user, logout } = useAuth();
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/"> Inicio </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/productos"> Productos </Link>
              </li>
              <li>
                <Link to="/categorias"> Categorías </Link>
              </li>
              <li>
                <Link to="/cart-detail"> Carrito </Link>
              </li>
              <li>
                <button onClick={logout}>Cerrar Sesion</button>
              </li>
            </>
          ) : (
            <>
            <li>
                <Link to="/productos"> Productos </Link>
              </li>
            <li>
                <Link to="/categorias"> Categorías </Link>
              </li>
              <li>
                <Link to="/login"> Iniciar Sesión </Link>
              </li>
              <li>
                <Link to="/register"> Registrarse </Link>
              </li>   
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </div >
  )
};

export default Header;