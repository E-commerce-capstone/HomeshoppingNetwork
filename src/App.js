import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import ProductDetail from './component/ProductDetail';

import SidebarNavbar from './component/SidebarNavbar';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(['All', ...data]); 
      })
      .catch((error) => console.error('Error fetching categories:', error));

    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setSortedProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const fetchProductsByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setSortedProducts(products); 
    } else {
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then((response) => response.json())
        .then((data) => setSortedProducts(data))
        .catch((error) => console.error('Error fetching products:', error));
    }
  };

  const sortDescending = () => {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    setSortedProducts(sorted);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };


  return (
      <div className="main-container">
  <SidebarNavbar fetchProductsByCategory={fetchProductsByCategory}/>
        <button onClick={sortDescending}>Sort Descending</button>
        <div className="product-list">
          {sortedProducts
            .filter((product) => !selectedCategory || selectedCategory === 'All' || product.category === selectedCategory)
            .map((product) => (
              <div key={`product-${product.id}`} className="product">
                <img src={product.image} alt={product.title} />
                <h2>{product.title}</h2>
                <p>Price: ${product.price}</p>
                <button onClick={() => handleProductClick(product)}>Details</button>
                {selectedProduct && selectedProduct.id === product.id && (
                  <ProductDetail product={selectedProduct} />
                )}
              </div>
            ))}
        </div>
      </div>
  
  );
}

export default App;
