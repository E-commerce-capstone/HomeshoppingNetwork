
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './component/CartContext'; 
import App from './App';
import SignUp from './component/SignUp';
import './index.css';
import ShoppingCart from './component/ShoppingCart';
import Login from './component/Login';
import ProductsList from './component/ProductsList';

const secretKey = process.env.REACT_APP_SECRET_KEY;

const apiUrl = process.env.REACT_APP_API_URL;


const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider> 
          <Routes>
            <Route path="/" element={<App />} key="home" />
            <Route path="/login" element={<Login />} key="login" />
            <Route path="/signup" element={<SignUp />} key="signup" />
            <Route path="/carts" element={<ShoppingCart />} key="carts" />
            <Route path="/products" element={<ProductsList />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
