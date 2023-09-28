import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const isAuthenticated = true; 

  const addItemToCart = (item) => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('Adding item to cart:', item);
  
    if (isAuthenticated) {
      setCartItems([...cartItems, item]);
      console.log('Item added to cart.');
    } else {
      console.log('User is not authenticated. Item not added to cart.');
    }
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const fetchAvailableItems = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch available items');
      }
      const data = await response.json();
      setAvailableItems(data); 
    } catch (error) {
      console.error('Error fetching available items:', error);
    }
  };

  useEffect(() => {
    fetchAvailableItems(); 
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  return (
    <CartContext.Provider value={{ isAuthenticated, cartItems, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export function useCartFunctions() {
  const { cartItems, addItemToCart, removeItemFromCart, availableItems } = useCart();

  return { cartItems, addItemToCart, removeItemFromCart, availableItems };
}

