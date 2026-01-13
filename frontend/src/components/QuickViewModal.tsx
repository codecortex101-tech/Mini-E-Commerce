import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import type { Product } from "../utils/products";

type QuickViewModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = product.stock !== undefined && product.stock === 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product);
      showToast("Added to cart!", "success");
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast("Removed from wishlist", "info");
    } else {
      addToWishlist(product);
      showToast("Added to wishlist!", "success");
    }
  };

  const handleViewDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Product Image */}
                <div className="relative">
                  <button
                    onClick={onClose}
                    className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                  >
                    ✕
                  </button>
                  <div className="relative h-80 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl">🛍️</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                    <div className="flex items-center gap-4 mb-4">
                      <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        ${product.price}
                      </p>
                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400 text-xl">⭐</span>
                          <span className="font-semibold text-gray-700">{product.rating}</span>
                        </div>
                      )}
                    </div>
                    {product.description && (
                      <p className="text-gray-600 line-clamp-3">{product.description}</p>
                    )}
                  </div>

                  {/* Stock Status */}
                  {product.stock !== undefined && (
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700">
                        {isOutOfStock ? (
                          <span className="text-red-600">Out of Stock</span>
                        ) : (
                          <span className="text-emerald-600">{product.stock} units available</span>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
                    >
                      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                    </motion.button>
                    <button
                      onClick={handleWishlistToggle}
                      className={`px-4 py-3 rounded-lg transition ${
                        inWishlist
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {inWishlist ? "❤️" : "🤍"}
                    </button>
                  </div>

                  <button
                    onClick={handleViewDetails}
                    className="w-full bg-emerald-100 text-emerald-700 py-3 rounded-lg hover:bg-emerald-200 transition-all font-semibold"
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
