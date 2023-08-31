import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    // Fetch categories when component mounts
    fetch('https://fakestoreapi.com/products/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(['All', ...data]); // Add 'All' category
      })
      .catch((error) => console.error('Error fetching categories:', error));

    // Fetch products when component mounts
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
      setSortedProducts(products); // Display all products
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

  return (

      <div className="App">
        <div className="navigation">
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <h1>E-commerce Website</h1>
        <button onClick={sortDescending}>Sort Descending</button>
        <div className="categories">
          <h2>Categories:</h2>
          {categories.map((category) => (
            <div key={category} className="category" onClick={() => fetchProductsByCategory(category)}>
              {category}
            </div>
          ))}
        </div>
        <div className="product-list">
          {sortedProducts
            .filter((product) => !selectedCategory || selectedCategory === 'All' || product.category === selectedCategory)
            .map((product) => (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.title} />
                <h2>{product.title}</h2>
                <p>Price: ${product.price}</p>
              </div>
            ))}
        </div>
      </div>
      
  );
}

export default App;
