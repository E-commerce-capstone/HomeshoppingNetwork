import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);

  useEffect(() => {
    // Fetch available items from your API
    async function fetchAvailableItems() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (response.ok) {
          const data = await response.json();
          setAvailableItems(data);
        } else {
          console.error('Failed to fetch available items');
        }
      } catch (error) {
        console.error('Error fetching available items:', error);
      }
    }

    fetchAvailableItems();
  }, []);

  const addItemToCart = (title) => {
    const selectedItem = availableItems.find(item => item.title === title);
    if (selectedItem) {
      setCartItems([...cartItems, selectedItem]);
    }
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    calculateTotalPrice,
  };
}

function Carts() {
  const { cartItems } = useCart();

  return (
    <div>
      <div className="navigation">
        <Link to="/signup">Sign Up</Link>
        <Link to="/">Home</Link>
      </div>
      <div>
        <h1>My Carts</h1>
        {cartItems.map((item) => (
          <div key={`${item.id}`}>
            <h2>{item.title}</h2>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carts;
