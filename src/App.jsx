// react y router
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// contextos
import { AuthProvider } from "@/components/context/AuthContext";
import { CartProvider } from "@/components/context/CartContext";

// usuario
import Login from './Pages/Users/Login';
import Register from './Pages/Users/Register';
import { AdminRoute } from './Pages/Users/isAdmin';

// categorias
import Categories from './Pages/Categories/Categorias';
import CategoryProducts from './Pages/Categories/ProductosCategorias'; // Este será tu nuevo componente
import AddCategory from './Pages/Categories/AgregarCategoria'; 
import DeleteCategory from './Pages/Categories/BorrarCategoria'; 
import UpdateCategory from './Pages/Categories/ActualizarCategoria'; 

// productos
import ProductsList from './Pages/Products/ListaProductos';
import ProductDetail from './Pages/Products/Producto';
import ProductCreate from './Pages/Products/CrearProducto';
import UpdateProduct from './Pages/Products/ActualizarProducto';
import DeleteProduct from './Pages/Products/BorrarProducto';

// carrito
import CartDetail from './Pages/Products/Carrito';

// header, footer y home
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';


const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <CartProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Header />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/categorias" element={<Categories />} />
              <Route path="/categorias/:CategoryId/productos" element={<CategoryProducts />} />
              <Route path="/categorias/agregarcategoria" element={
              <AdminRoute>
                <AddCategory />
              </AdminRoute>
            } />
            <Route path= "/categoria/borrarcategoria/:CategoryId" element= {
              <AdminRoute>
                <DeleteCategory />
              </AdminRoute> } />
              <Route path="/categoria/actualizarcategoria/:CategoryId" element= {
              <AdminRoute>
                <UpdateCategory />
              </AdminRoute> } /> 
              <Route path="/productos" element={<ProductsList />} />
              <Route path="/producto/:productId" element={<ProductDetail />} />
              <Route path="/producto/agregarproducto" element={
              <AdminRoute>
                <ProductCreate />
              </AdminRoute>} />
              <Route path="/producto/actualizarproducto/:productId" element={
              <AdminRoute>
                <UpdateProduct />
              </AdminRoute>} />
              <Route path="/producto/borrarproducto/:productId" element={
              <AdminRoute>
                <DeleteProduct />
              </AdminRoute>} />
              <Route path="/cart-detail" element={<CartDetail />} /></Route>
            </Routes>
            <Footer />
          </AuthProvider>
        </CartProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
