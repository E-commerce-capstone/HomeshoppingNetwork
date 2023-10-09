
import React, { useState, useEffect } from 'react';

const Slideshow = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
