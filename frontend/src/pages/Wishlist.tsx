import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import EmptyState from "../components/EmptyState";
import Footer from "../components/Footer";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (item: { id: number; name: string; price: number }) => {
    addToCart(item);
    removeFromWishlist(item.id);
    showToast("Added to cart!", "success");
  };

  const handleRemove = (id: number) => {
    removeFromWishlist(id);
    showToast("Removed from wishlist", "info");
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <EmptyState
            title="Your Wishlist is Empty"
            message="Save your favorite products to your wishlist for later"
            buttonText="Start Shopping"
            buttonLink="/dashboard"
            icon="❤️"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex flex-col">
      <div className="max-w-4xl mx-auto flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            My Wishlist ({wishlist.length})
          </h2>

          <div className="space-y-4">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4"
                >
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-lg font-semibold text-gray-800 hover:text-black"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xl font-bold text-black mt-1">
                      ${item.price}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMoveToCart(item)}
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl"
                    >
                      🛒 Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemove(item.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                      Remove
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
