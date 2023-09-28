import React, { useEffect } from 'react';
import { useCart } from './CartContext';

export function useCartFunctions() {
  const { cartItems, addItemToCart, removeItemFromCart } = useCart();

  useEffect(() => {
    async function fetchAvailableItems() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (response.ok) {
          const data = await response.json();
        } else {
          console.error('Failed to fetch available items');
        }
      } catch (error) {
        console.error('Error fetching available items:', error);
      }
    }

    fetchAvailableItems();
  }, []);

}

