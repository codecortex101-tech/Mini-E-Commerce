import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LiveStockCounterProps = {
  currentStock: number;
  productId: number;
  productName: string;
};

const LiveStockCounter = ({
  currentStock,
  productId,
  productName,
}: LiveStockCounterProps) => {
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

  // Simulate live stock updates (in real app, this would come from WebSocket/API)
  useEffect(() => {
    const interval = setInterval(() => {
      // Random simulation - 10% chance of stock decreasing
      if (Math.random() < 0.1 && displayStock > 0) {
        const simulatedStock = Math.max(0, displayStock - 1);
        setDisplayStock(simulatedStock);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [displayStock]);

  if (displayStock === 0) {
    return (
      <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-semibold">
        Out of Stock
      </div>
    );
  }

  if (displayStock <= 5) {
    return (
      <motion.div
        animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
        className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-semibold"
      >
        ⚠️ Only {displayStock} left in stock!
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
      className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold"
    >
      ✓ {displayStock} in stock
    </motion.div>
  );
};

export default LiveStockCounter;
