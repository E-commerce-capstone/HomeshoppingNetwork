import React from 'react';

const Product = ({ product }) => {

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
     
    </div>
  );
};

export default Product;
