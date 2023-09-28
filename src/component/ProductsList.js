import React from 'react';
import Product from './Product';

const ProductsList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
