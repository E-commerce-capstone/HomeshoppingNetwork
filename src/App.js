import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ProductDetail from './component/ProductDetail';
import SidebarNavbar from './component/SidebarNavbar';
import image1  from './component/slideshow/image1.jpeg';
import image2 from './component/slideshow/image2.jpeg';
import image3 from './component/slideshow/image3.jpeg';
import image4 from './component/slideshow/image4.jpeg';
import image5 from './component/slideshow/image5.jpeg';
import ProductsList from './component/ProductsList';
import Slideshow from './component/Slideshow';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [slideshowImages, setSlideshowImages] = useState ([image1, image2, image3, image4, image5]);
  const navigate = useNavigate();

  const handleShopClick = () => {
    setShowProducts(true);
    navigate('/products');
  };
  
  
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
  const sortAscending = () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };


  return (
    <div className="main-container">
      {!showProducts && (
        <div className="slideshow-container">
          <Slideshow images={slideshowImages} />
          {!showProducts && (
        <Link to="#" className="shop-link" onClick={handleShopClick}>
          Shop
        </Link>
      )}

        </div>
      )}

   
  <SidebarNavbar fetchProductsByCategory={fetchProductsByCategory} 
  sortDescending={sortDescending} 
  sortAscending={sortAscending}/>


  {showProducts && (
        
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
       
      )}
    </div>
  );
}


      


export default App;
