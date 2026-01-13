import { motion } from "framer-motion";

type StockIndicatorProps = {
  stock: number;
  lowStockThreshold?: number;
};

const StockIndicator = ({ stock, lowStockThreshold = 5 }: StockIndicatorProps) => {
  if (stock === 0) {
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-semibold"
      >
        Out of Stock
      </motion.div>
    );
  }

  if (stock <= lowStockThreshold) {
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-semibold"
      >
        Only {stock} left!
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold"
    >
      In Stock
    </motion.div>
  );
};

export default StockIndicator;
