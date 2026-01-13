import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import type { Product } from "../utils/products";

type ProductCardListProps = {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
};

const ProductCardList = ({ product, index = 0, onQuickView }: ProductCardListProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = product.stock !== undefined && product.stock === 0;

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit-product/${product.id}`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast("Removed from wishlist", "info");
    } else {
      addToWishlist(product);
      showToast("Added to wishlist!", "success");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product);
      showToast("Added to cart!", "success");
    }
  };

  const handleAddToCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const comparedIds = JSON.parse(localStorage.getItem("comparedProducts") || "[]");
    if (comparedIds.includes(product.id)) {
      showToast("Product already in comparison", "info");
      return;
    }
    if (comparedIds.length >= 4) {
      showToast("Maximum 4 products can be compared", "error");
      return;
    }
    comparedIds.push(product.id);
    localStorage.setItem("comparedProducts", JSON.stringify(comparedIds));
    showToast("Added to comparison!", "success");
    window.dispatchEvent(new Event("comparisonUpdated"));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/product/${product.id}`;
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard!", "success");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white border-2 border-emerald-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full"
    >
      <div className="flex flex-col sm:flex-row gap-4 p-4 w-full min-h-[200px]">
        {/* Product Image */}
        <div className="relative w-full sm:w-48 h-48 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg overflow-hidden flex-shrink-0">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.parentElement?.querySelector('.image-fallback') as HTMLElement;
                if (fallback) {
                  fallback.style.display = 'flex';
                }
              }}
            />
          ) : null}
          <div className="image-fallback absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-200 to-teal-200" style={{ display: product.image ? 'none' : 'flex' }}>
            <span className="text-4xl">🛍️</span>
          </div>
          <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
            <button
              onClick={handleWishlistToggle}
              className={`text-lg transition transform hover:scale-110 ${inWishlist ? "text-red-500" : "text-white/80 hover:text-red-500 drop-shadow-lg"}`}
              aria-label="Add to wishlist"
              title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              ❤️
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCompare(e);
              }}
              className="text-lg transition transform hover:scale-110 text-white/80 hover:text-blue-500 drop-shadow-lg"
              aria-label="Add to comparison"
              title="Compare product"
            >
              ⚖️
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleShare(e);
              }}
              className="text-lg transition transform hover:scale-110 text-white/80 hover:text-green-500 drop-shadow-lg"
              aria-label="Share product"
              title="Share product"
            >
              🔗
            </button>
          </div>
          {isOutOfStock && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md z-10 font-semibold shadow-lg">
              Out of Stock
            </div>
          )}
          {product.stock !== undefined && product.stock > 0 && product.stock <= 5 && !isOutOfStock && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md z-10 font-semibold shadow-lg">
              Low Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <Link to={`/product/${product.id}`} className="block mb-2">
              <h3 className="text-xl font-bold text-gray-800 hover:text-emerald-600 cursor-pointer transition mb-2">
                {product.name}
              </h3>
            </Link>
            {product.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {product.description}
              </p>
            )}
            <div className="flex items-center gap-4 mb-3">
              <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ${product.price}
              </p>
              {product.rating && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-semibold">{product.rating}</span>
                  {product.reviewCount && (
                    <span className="text-gray-500">({product.reviewCount})</span>
                  )}
                </div>
              )}
              {product.category && (
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">
                  {product.category}
                </span>
              )}
            </div>
            {product.stock !== undefined && (
              <p className="text-xs text-gray-500 mb-3">
                {isOutOfStock ? (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                ) : (
                  <span className="text-emerald-600 font-semibold">{product.stock} units available</span>
                )}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:min-w-[200px]">
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-all font-semibold text-sm shadow-md hover:shadow-lg"
                title="Quick View"
              >
                👁️ Quick View
              </button>
            )}
            <Link
              to={`/product/${product.id}`}
              className="px-4 py-2 text-center bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-all font-semibold text-sm shadow-md hover:shadow-lg"
            >
              View Details
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm shadow-lg hover:shadow-xl"
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </motion.button>
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition transform hover:scale-105 font-semibold text-sm shadow-lg"
              aria-label="Edit product"
              title="Edit product"
            >
              ✏️ Edit
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardList;
