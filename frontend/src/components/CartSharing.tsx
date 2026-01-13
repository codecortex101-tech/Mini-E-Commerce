import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import SocialShareButtons from "./SocialShareButtons";

const CartSharing = () => {
  const { cart } = useCart();
  const { showToast } = useToast();
  const [showShareMenu, setShowShareMenu] = useState(false);

  const generateCartLink = () => {
    const cartData = encodeURIComponent(JSON.stringify(cart));
    return `${window.location.origin}/cart?shared=${cartData}`;
  };

  const handleCopyLink = async () => {
    try {
      const link = generateCartLink();
      await navigator.clipboard.writeText(link);
      showToast("Cart link copied to clipboard!", "success");
    } catch (err) {
      showToast("Failed to copy link", "error");
    }
  };

  const handleEmailCart = () => {
    const subject = encodeURIComponent("My Shopping Cart");
    const body = encodeURIComponent(
      `Check out my shopping cart:\n\n${cart.map((item) => `- ${item.name} (x${item.quantity}) - $${item.price * item.quantity}`).join("\n")}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    showToast("Opening email client...", "info");
  };

  if (cart.length === 0) {
    return null;
  }

  const shareUrl = generateCartLink();
  const shareTitle = `My Shopping Cart (${cart.length} items)`;
  const shareDescription = `Check out these ${cart.length} items in my cart!`;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        🔗 Share Cart
      </motion.button>

      {showShareMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowShareMenu(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-2 right-0 z-20 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-emerald-200 dark:border-gray-700 p-4 min-w-[300px]"
          >
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
              Share Your Cart
            </h4>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyLink}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                📋 Copy Link
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEmailCart}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                📧 Email Cart
              </motion.button>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Share on Social Media:
                </p>
                <SocialShareButtons
                  url={shareUrl}
                  title={shareTitle}
                  description={shareDescription}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default CartSharing;
