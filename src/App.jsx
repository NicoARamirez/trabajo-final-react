import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Categories from './components/pages/Categories';
import ProductsList from './components/pages/ProductsList';
import ProductDetail from './components/pages/ProductDetail';
import ProductCreate from './components/pages/ProductCreate';
import ProductEdit from './components/pages/ProductEdit';
import CartDetail from './components/pages/CartDetail';
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div>
        {/* Header */}
        <Header />
        
        {/* Definir las rutas */}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<ProductsList  />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />
          <Route path="/cart-detail" element={<CartDetail />} />
          {/* Agregar más rutas según sea necesario */}
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
