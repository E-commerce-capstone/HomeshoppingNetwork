import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import App from './App';
import SignUp from './SignUp';
import './index.css';
import Carts from './carts';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} key="home"/>
          <Route path="/signup" element={<SignUp />} key="signup" />
          <Route path="/carts" element={<Carts />} key="carts"/>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
