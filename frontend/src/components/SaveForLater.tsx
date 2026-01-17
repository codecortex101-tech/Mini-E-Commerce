import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const SaveForLater = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [savedItems, setSavedItems] = useState<any[]>([]);

  useEffect(() => {
    setSavedItems(JSON.parse(localStorage.getItem("savedForLater") || "[]"));
  }, []);

  return (
    <div>
      {savedItems.map((item) => (
        <motion.div key={item.id}>
          <span>{item.name}</span>
          <button
            onClick={() => {
              addToCart(item);
              showToast("Moved to cart", "success");
            }}
          >
            Move to cart
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default SaveForLater;
