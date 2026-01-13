import { useState } from "react";
import { motion } from "framer-motion";

type Product360ViewerProps = {
  images: string[];
  productName?: string;
};

const Product360Viewer = ({ images, productName = "Product" }: Product360ViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  if (!images || images.length === 0) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const delta = dragStart - e.clientX;
    const threshold = 50;

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        // Drag left - next image
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        // Drag right - previous image
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      setDragStart(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const delta = dragStart - e.touches[0].clientX;
    const threshold = 50;

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      setDragStart(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full">
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${productName} view ${currentIndex + 1}`}
          className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          draggable={false}
        />

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full p-2 shadow-lg transition-all z-10"
          aria-label="Previous view"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full p-2 shadow-lg transition-all z-10"
          aria-label="Next view"
        >
          →
        </button>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === index
                  ? "border-emerald-500 dark:border-emerald-400 ring-2 ring-emerald-200 dark:ring-emerald-800"
                  : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
              }`}
              aria-label={`View ${index + 1}`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Instructions */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
        👆 Drag or swipe to rotate • {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
};

export default Product360Viewer;
