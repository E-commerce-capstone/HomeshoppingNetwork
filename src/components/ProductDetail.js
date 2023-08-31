import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ products }) {
  const { productId } = useParams();
  const product = products.find((product) => product.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetail;
