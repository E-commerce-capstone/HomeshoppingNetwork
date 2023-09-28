import React from 'react';
import { Link } from 'react-router-dom';

const CartLink = ({ isAuthenticated }) => {
  return (
    <li>
      {isAuthenticated && <Link to="/carts">Cart</Link>}
    </li>
  );
};

export default CartLink;
