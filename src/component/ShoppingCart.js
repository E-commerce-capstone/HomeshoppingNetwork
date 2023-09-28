import React, { useEffect, useState } from 'react';
import { useCartFunctions } from './CartContext';
import { Link } from 'react-router-dom';

function ShoppingCart() {
  const { cartItems, removeItemFromCart,  } = useCartFunctions();


  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleCheckoutClick = () => {
    setShowCheckoutModal(true);
  };

  const handleCheckout = (creditCardInfo) => {
    handleClearCart();
    setShowCheckoutModal(false);
  };

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
  }, []);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };

  const addToCart = (newItem) => {
    const existingItemIndex = cart.findIndex((item) => item.id === newItem.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...newItem, quantity: 1 }]);
    }

    
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleClearCart = () => {

    setCart([]);

    localStorage.removeItem('cart');
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <div className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="item-details">
                <p>{item.title}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p>Total items: {cart.length}</p>
      <p>Total price: ${calculateTotalPrice()}</p>

      <button onClick={handleClearCart}>Clear Cart</button>
      <br/><br/>
      <button onClick={handleCheckoutClick}>Checkout</button>
      <br/><br/>
      {showCheckoutModal && (
        <div className="checkout-modal">
          <h3>Enter Credit Card Information</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Card Number:</label>
            <input type="text" />

            <label>Expiration Date:</label>
            <input type="text" />

            <label>CVC:</label>
            <input type="text" />

            <button onClick={() => handleCheckout()}>Submit Payment</button>
          </form>
          <button onClick={() => setShowCheckoutModal(false)}>Cancel</button>
          
        </div>
      )}
      <Link to="/">Keep Shopping</Link>
    </div>
  );
}
      



export default ShoppingCart;
