import React, { useState, useEffect } from 'react';


const Carousel = ({ images, interval = 8000, buttonEnabled = false, size = '240px' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const buttonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    borderRadius: '24px',
    zIndex: 1
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images?.length - 1 ? 0 : prevIndex + 1));
    }, interval);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [images?.length, interval]);

  if (!images || images.length < 1) {
    return null;
  }


  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: size,
        maxHeight: size,
        margin: 'auto',
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      }}
    >
      {
        buttonEnabled && (
          <button onClick={goToPrevious} style={{ ...buttonStyle, left: '16px' }}>
            &#8249;
          </button>
        )
      }
      <div style={{ width: '100%' }}>
        <img
          src={images[currentIndex]}
          alt={`carousel-${currentIndex}`}
          style={{
            width: size,
            height: size,
            display: 'block',
            transition: 'opacity 2s ease-in-out'
          }}
        />
      </div>
      {
        buttonEnabled && (
          <button onClick={goToNext} style={{ ...buttonStyle, right: '16px' }}>
            &#8250;
          </button>
        )
      }
    </div>
  );
};

export default Carousel;
