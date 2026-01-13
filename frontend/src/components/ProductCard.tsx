import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import type { Product } from "../utils/products";

type ProductCardProps = {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
};

const ProductCard = ({ product, index = 0, onQuickView }: ProductCardProps) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white border-2 border-emerald-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 relative card-primary flex flex-col"
    >

      {/* Product Image - Portrait Orientation */}
      <div className="relative h-56 bg-gradient-to-br from-emerald-100 to-teal-100 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-300"
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
        <div className="absolute top-1.5 left-1.5 flex flex-col gap-2 z-10">
          <button
            onClick={handleWishlistToggle}
            className={`text-xl transition transform hover:scale-110 ${inWishlist ? "text-red-500" : "text-white/80 hover:text-red-500 drop-shadow-lg"}`}
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
            className="text-xl transition transform hover:scale-110 text-white/80 hover:text-blue-500 drop-shadow-lg"
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
            className="text-xl transition transform hover:scale-110 text-white/80 hover:text-green-500 drop-shadow-lg"
            aria-label="Share product"
            title="Share product"
          >
            🔗
          </button>
        </div>
        <button
          onClick={handleEdit}
          className="absolute bottom-1.5 right-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-2 py-1 rounded-md transition transform hover:scale-110 z-10 shadow-lg font-semibold"
          aria-label="Edit product"
          title="Edit product"
        >
          ✏️ Edit
        </button>
        {isOutOfStock && (
          <div className="absolute top-1.5 right-1.5 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-md z-10 font-semibold shadow-lg">
            Out of Stock
          </div>
        )}
        {product.stock !== undefined && product.stock > 0 && product.stock <= 5 && !isOutOfStock && (
          <div className="absolute top-1.5 right-1.5 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-md z-10 font-semibold shadow-lg">
            Low Stock
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="block mb-1.5">
          <h3 className="text-base font-semibold text-gray-800 hover:text-emerald-600 cursor-pointer transition line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <p className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            ${product.price}
          </p>
          {product.rating && (
            <div className="flex items-center text-xs text-gray-600">
              <span>⭐ {product.rating}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="px-3 bg-teal-100 text-teal-700 py-2 rounded-lg hover:bg-teal-200 transition-all font-semibold text-sm shadow-md hover:shadow-lg"
              title="Quick View"
            >
              👁️
            </button>
          )}
          <Link
            to={`/product/${product.id}`}
            className={`text-center bg-emerald-100 text-emerald-700 py-2 rounded-lg hover:bg-emerald-200 transition-all font-semibold text-sm shadow-md hover:shadow-lg ${onQuickView ? 'flex-1' : 'flex-1'}`}
          >
            View
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm shadow-lg hover:shadow-xl"
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
