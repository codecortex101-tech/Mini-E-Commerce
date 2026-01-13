import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import SocialShareButtons from "./SocialShareButtons";

const CartShare = () => {
  const { cart } = useCart();
  const { showToast } = useToast();
  const [showShare, setShowShare] = useState(false);

  const generateCartLink = () => {
    const cartData = JSON.stringify(cart);
    const encoded = btoa(cartData);
    return `${window.location.origin}/cart?shared=${encoded}`;
  };

  const handleCopyLink = async () => {
    try {
      const link = generateCartLink();
      await navigator.clipboard.writeText(link);
      showToast("Cart link copied to clipboard! 📋", "success");
    } catch (err) {
      showToast("Failed to copy link", "error");
    }
  };

  if (cart.length === 0) return null;

  const cartLink = generateCartLink();
  const shareText = `Check out my cart! ${cart.length} item${cart.length > 1 ? "s" : ""}`;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowShare(!showShare)}
        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
      >
        <span>🔗</span>
        <span>Share Cart</span>
      </motion.button>

      {showShare && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowShare(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-emerald-200 dark:border-gray-700 p-6 z-50 min-w-[300px]"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Share Your Cart
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Cart Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cartLink}
                    readOnly
                    className="flex-1 px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold text-sm"
                  >
                    Copy
                  </motion.button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Share on Social Media
                </label>
                <SocialShareButtons url={cartLink} title={shareText} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default CartShare;
