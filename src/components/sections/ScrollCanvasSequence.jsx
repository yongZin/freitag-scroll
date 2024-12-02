import { useState, useEffect, useRef, useCallback } from 'react';

const ScrollCanvasSequence = ({ 
  imageCount, 
  imagePath, 
  startIndex, 
  endIndex 
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(startIndex);

  // Preload images
  useEffect(() => {
    const loadedImages = [];
    const finalEndIndex = endIndex || imageCount - 1;

    const loadImage = (index) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = `${imagePath}${index}.jpg`;
        img.onload = () => {
          loadedImages[index] = img;
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    const imagePromises = Array.from(
      { length: finalEndIndex - startIndex + 1 }, 
      (_, i) => loadImage(i + startIndex)
    );

    Promise.all(imagePromises)
      .then((loadedImgs) => {
        setImages(loadedImgs);
      })
      .catch(console.error);
  }, [imageCount, imagePath, startIndex, endIndex]);

  // Draw current image on canvas
  const drawCurrentImage = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (ctx && images[currentImageIndex]) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(images[currentImageIndex], 0, 0, canvas.width, canvas.height);
    }
  }, [currentImageIndex, images]);

  // Update image based on scroll progress
  const handleScroll = useCallback((entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    const container = entry.target;
    const { top, height } = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress within the container
    const scrollProgress = 1 - (top + height) / (windowHeight + height);
    
    // Map scroll progress to image index
    const newIndex = Math.min(
      Math.max(
        Math.floor(scrollProgress * (images.length - 1)), 
        0
      ), 
      images.length - 1
    );

    setCurrentImageIndex(newIndex);
  }, [images]);

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    });

    const container = containerRef.current;
    if (container) observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, [handleScroll]);

  // Draw image when images or current index changes
  useEffect(() => {
    drawCurrentImage();
  }, [drawCurrentImage]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        height: '500vh', // Adjust for desired scroll length
        position: 'relative' 
      }}
    >
      <div 
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <canvas 
          ref={canvasRef}
          width={1280}  // Match your original canvas size
          height={720}
          style={{ 
            maxWidth: '100%', 
            height: 'auto' 
          }}
        />
      </div>
    </div>
  );
};

export default ScrollCanvasSequence;