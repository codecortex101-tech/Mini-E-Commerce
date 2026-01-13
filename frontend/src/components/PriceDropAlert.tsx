import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastContext";

type PriceDropAlertProps = {
  productId: number;
  productName: string;
  currentPrice: number;
  originalPrice?: number;
};

const PriceDropAlert = ({
  productId,
  productName,
  currentPrice,
  originalPrice,
}: PriceDropAlertProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const subscribed = localStorage.getItem(`priceAlert_${productId}`);
    if (subscribed) {
      const savedPrice = parseFloat(subscribed);
      if (currentPrice < savedPrice) {
        showToast(
          `💰 Price dropped! ${productName} is now $${currentPrice.toFixed(2)}`,
          "success"
        );
        localStorage.removeItem(`priceAlert_${productId}`);
        setIsSubscribed(false);
      } else {
        setIsSubscribed(true);
      }
    }
  }, [currentPrice, productId, productName, showToast]);

  const handleSubscribe = () => {
    localStorage.setItem(`priceAlert_${productId}`, currentPrice.toString());
    setIsSubscribed(true);
    showToast("You'll be notified if the price drops!", "success");
  };

  const handleUnsubscribe = () => {
    localStorage.removeItem(`priceAlert_${productId}`);
    setIsSubscribed(false);
    showToast("Price alert removed", "info");
  };

  const discount = originalPrice && currentPrice < originalPrice 
    ? ((originalPrice - currentPrice) / originalPrice * 100).toFixed(0)
    : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            {discount && (
              <p className="font-bold text-red-600 dark:text-red-400 text-lg">
                {discount}% OFF
              </p>
            )}
            <p className="font-semibold text-blue-800 dark:text-blue-200">
              💰 Price Alert
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Get notified if the price drops further
            </p>
          </div>
          {isSubscribed ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnsubscribe}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm"
            >
              Unsubscribe
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubscribe}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm"
            >
              Alert Me
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PriceDropAlert;
