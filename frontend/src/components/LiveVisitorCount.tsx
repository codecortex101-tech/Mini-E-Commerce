import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type LiveVisitorCountProps = {
  productId: number;
};

const LiveVisitorCount = ({ productId }: LiveVisitorCountProps) => {
  const [visitorCount, setVisitorCount] = useState(() => {
    // Simulate visitor count based on product ID
    return Math.floor(Math.random() * 20) + 1;
  });

  useEffect(() => {
    // Simulate live visitor count changes
    const interval = setInterval(() => {
      const change = Math.random();
      if (change < 0.3) {
        // 30% chance to decrease
        setVisitorCount((prev) => Math.max(1, prev - 1));
      } else if (change > 0.7) {
        // 30% chance to increase
        setVisitorCount((prev) => Math.min(50, prev + 1));
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [productId]);

  if (visitorCount === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full text-sm"
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        className="w-2 h-2 bg-red-500 rounded-full"
      />
      <span className="text-blue-700 dark:text-blue-300 font-semibold">
        {visitorCount} {visitorCount === 1 ? "person" : "people"} viewing this product
      </span>
    </motion.div>
  );
};

export default LiveVisitorCount;
