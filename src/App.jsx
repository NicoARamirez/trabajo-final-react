import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import Login from './Pages/Users/Login';
import Register from './Pages/Users/Register';
import Categories from './Pages/Categories/Categories';
import ProductsList from './Pages/Products/ProductsList';
import ProductDetail from './Pages/Products/ProductDetail';
import ProductCreate from './Pages/Products/ProductCreate';
import ProductEdit from './Pages/Products/ProductEdit';
import CartDetail from './Pages/Products/CartDetail';
import {
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
