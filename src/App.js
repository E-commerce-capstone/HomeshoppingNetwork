import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import './App.css';
import Carts from './carts';

function App() {
  
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [carts, setCarts] = useState ([]);

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
        console.log(JSON.stringify(data, null, 2));
        setProducts(data);
        setSortedProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  

      // Fetch carts when component mounts
      fetch('https://fakestoreapi.com/carts')
      .then((response) => response.json())
      .then((data) => {
        setCarts(data);
      })
      .catch((error) => console.error('Error fetching carts:', error));
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
 const addToCart = (product) => {
    setCarts ((prevCart) => [...prevCart, product]);
 }
  const sortDescending = () => {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    setSortedProducts(sorted);
  };

  return (
    <div className="App">
      <div className="navigation">
        <Link to="/signup">Sign Up</Link>
        <Link to="/carts">Cart</Link>
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
            <div key={`product-${product.id}`} className="product">
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
      </div>
      <div className="carts">
        <h2>All Carts</h2>
        {carts.map((cart) => (
          <div key={cart.id} className="cart-item">
            <h3>Cart ID: {cart.id}</h3>
            <p>Total Price: ${cart.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
}


export default App;
