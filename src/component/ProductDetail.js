import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../App.css';
import { useCart } from './CartContext';
// import ProductSearch from './searchBar';
// import Product  from './Product';
function ProductDetail({ product, products }) { 
  const { isAuthenticated } = useAuth();
  const { addItemToCart } = useCart();
  const [showSignInMessage, setShowSignInMessage] = useState(false); 

  const handleAddToCart = () => {
    if (isAuthenticated()) {
      addItemToCart(product);
      console.log('Item added to cart.');
    } else {
      console.log('User is not authenticated.');
      setShowSignInMessage(true);
    }
  };

  const navigate = useNavigate();

  const navigateToRegistration = () => {
    navigate('/signup');
  };

  function SignInMessage({ message, onSignInClick }) {
    return (
      <div className="sign-in-message">
        <p>{message}</p>
        <button onClick={onSignInClick}>Sign In</button>
      </div>
    );
  }

  return (
    <div className="product-detail">
    //  
    
      {isAuthenticated() ? (
        <div>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      ) : (
        <div>
          <p>
            Please <Link to="/login">login</Link> to add items to your cart.
          </p>
        </div>
      )}
      {!isAuthenticated() && (
        <button onClick={navigateToRegistration}>Register</button>
      )}
      {showSignInMessage && (
        <SignInMessage onClose={() => setShowSignInMessage(false)} />
      )}
      <p>Description: {product.description}</p>
      <div className="rating">
        <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
      </div>
    </div>
  );
}

export default ProductDetail;
