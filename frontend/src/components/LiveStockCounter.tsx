import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type LiveStockCounterProps = {
  currentStock: number;
};

const LiveStockCounter = ({ currentStock }: LiveStockCounterProps) => {
  const [displayStock, setDisplayStock] = useState(currentStock);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (displayStock !== currentStock) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayStock(currentStock);
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStock, displayStock]);

  if (displayStock === 0) {
    return (
      <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
        Out of Stock
      </div>
    );
  }

  return (
    <motion.div
      animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs"
    >
      ✓ {displayStock} in stock
    </motion.div>
  );
};

export default LiveStockCounter;
