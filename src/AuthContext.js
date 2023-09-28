import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userFirstName, setUserFirstName] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      
      if (response.data.user && response.data.user.name && response.data.user.name.firstname) {
        const userFirstName = response.data.user.name.firstname;
        setUserFirstName(userFirstName);
        setUserInfo(response.data.user); 
        console.log(response.data); 
      } else {
        console.error('User information not found in API response.');
     
      }
  
      setUser({ username });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserInfo(null);
    setUserFirstName('');
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
