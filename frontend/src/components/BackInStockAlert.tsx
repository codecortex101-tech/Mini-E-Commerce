import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastContext";

type BackInStockAlertProps = {
  productId: number;
  productName: string;
  currentStock: number;
};

const BackInStockAlert = ({ productId, productName, currentStock }: BackInStockAlertProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const subscribed = localStorage.getItem(`backInStock_${productId}`);
    if (subscribed === "true") {
      setIsSubscribed(true);
    }
  }, [productId]);

  useEffect(() => {
    if (isSubscribed && currentStock > 0) {
      showToast(`${productName} is back in stock!`, "success");
      localStorage.removeItem(`backInStock_${productId}`);
      setIsSubscribed(false);
    }
  }, [currentStock, isSubscribed, productId, productName, showToast]);

  const handleSubscribe = () => {
    if (currentStock > 0) {
      showToast("Product is already in stock!", "info");
      return;
    }
    
    localStorage.setItem(`backInStock_${productId}`, "true");
    setIsSubscribed(true);
    showToast("You'll be notified when this product is back in stock!", "success");
  };

  const handleUnsubscribe = () => {
    localStorage.removeItem(`backInStock_${productId}`);
    setIsSubscribed(false);
    showToast("Back in stock alert removed", "info");
  };

  if (currentStock > 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-yellow-800 dark:text-yellow-200">
              🔔 Out of Stock
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              Get notified when this product is back in stock
            </p>
          </div>
          {isSubscribed ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnsubscribe}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold text-sm"
            >
              Unsubscribe
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubscribe}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold text-sm"
            >
              Notify Me
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BackInStockAlert;
