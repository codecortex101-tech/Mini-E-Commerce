import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

type SavedItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  date: string;
};

const SaveForLater = () => {
  const { cart, removeFromCart, addToCart } = useCart();
  const { showToast } = useToast();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedForLater");
    if (saved) {
      try {
        setSavedItems(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading saved items:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedForLater", JSON.stringify(savedItems));
  }, [savedItems]);

  const handleSaveItem = (item: typeof cart[0]) => {
    const savedItem: SavedItem = {
      ...item,
      date: new Date().toISOString(),
    };
    setSavedItems((prev) => [...prev, savedItem]);
    removeFromCart(item.id);
    showToast(`${item.name} saved for later!`, "success");
  };

  const handleMoveToCart = (item: SavedItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
    });
    setSavedItems((prev) => prev.filter((i) => i.id !== item.id));
    showToast(`${item.name} moved to cart!`, "success");
  };

  const handleRemove = (id: number) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== id));
    showToast("Item removed from saved", "info");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        💾 Saved for Later
      </h3>

      {savedItems.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            No items saved for later yet
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Saved {new Date(item.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoveToCart(item)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold text-sm transition"
                >
                  Move to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRemove(item.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm transition"
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SaveForLater;
