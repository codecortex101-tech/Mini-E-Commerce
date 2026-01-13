import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProductById, getProducts, updateProduct } from "../utils/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("brown");
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeTab, setActiveTab] = useState<"description" | "additional" | "reviews">("description");
  const [relatedProducts, setRelatedProducts] = useState(getProducts().slice(0, 4));
  const [reviewSort, setReviewSort] = useState("newest");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    name: "",
    rating: 5,
    title: "",
    text: ""
  });
  const [userReviews, setUserReviews] = useState<Array<{
    id: number;
    name: string;
    rating: number;
    title: string;
    text: string;
    date: string;
    verified?: boolean;
  }>>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

        const product = getProductById(Number(id));
  const inWishlist = product ? isInWishlist(product.id) : false;
  const isOutOfStock = product?.stock !== undefined && product.stock === 0;

  useEffect(() => {
    // Save to recently viewed
    if (product) {
      const recent = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const updated = [product.id, ...recent.filter((id: number) => id !== product.id)].slice(0, 5);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
      
      // Load related products (same category, excluding current product)
      const allProducts = getProducts();
      const related = allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
      setRelatedProducts(related.length > 0 ? related : allProducts.filter((p) => p.id !== product.id).slice(0, 4));
      
      // Load user reviews from localStorage
      const storedReviews = localStorage.getItem(`reviews_${product.id}`);
      if (storedReviews) {
        try {
          setUserReviews(JSON.parse(storedReviews));
        } catch (error) {
          console.error("Error loading reviews:", error);
        }
      }
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      showToast(`${quantity} ${quantity === 1 ? "item" : "items"} added to cart!`, "success");
      setQuantity(1);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      handleAddToCart();
      setTimeout(() => {
        navigate("/checkout");
      }, 500);
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(quantity + delta, product?.stock || 99));
    setQuantity(newQuantity);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !reviewFormData.name.trim() || !reviewFormData.title.trim() || !reviewFormData.text.trim()) {
      showToast("Please fill in all fields", "error");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewFormData.name.trim(),
      rating: reviewFormData.rating,
      title: reviewFormData.title.trim(),
      text: reviewFormData.text.trim(),
      date: new Date().toISOString(),
      verified: false
    };

    const updatedReviews = [...userReviews, newReview];
    setUserReviews(updatedReviews);
    localStorage.setItem(`reviews_${product.id}`, JSON.stringify(updatedReviews));

    // Update product rating
    const defaultReviews = [
      { rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 5 }
    ];
    const allRatings = [...defaultReviews.map(r => r.rating), ...updatedReviews.map(r => r.rating)];
    const averageRating = allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length;
    const totalReviewCount = allRatings.length;

    updateProduct(product.id, {
      rating: Math.round(averageRating * 10) / 10,
      reviewCount: totalReviewCount
    });

    // Reset form
    setReviewFormData({ name: "", rating: 5, title: "", text: "" });
    setShowReviewForm(false);
    showToast("Review submitted successfully!", "success");
    
    // Reload page to reflect changes
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) > 1 ? 's' : ''} ago`;
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out ${product?.name} - $${product?.price}`;
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (inWishlist) {
        removeFromWishlist(product.id);
        showToast("Removed from wishlist", "info");
      } else {
        addToWishlist(product);
        showToast("Added to wishlist!", "success");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Product Not Found
          </h2>
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl transition-all font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 inline-block"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white p-4 md:p-6 flex flex-col">
      <div className="max-w-6xl mx-auto flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-emerald-100"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="mb-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-4 py-2 rounded-xl transition-all font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
          >
            ← Back
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl h-64 md:h-96 overflow-hidden relative shadow-xl">
                  {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="main-product-image w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-200 to-teal-200" style={{ display: product.image ? 'none' : 'flex' }}>
                  <span className="text-8xl">🛍️</span>
                </div>
                {isOutOfStock && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg z-10">
                    Out of Stock
                  </div>
                )}
                {product.stock !== undefined && product.stock > 0 && product.stock <= 5 && !isOutOfStock && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg z-10">
                    Only {product.stock} left
                  </div>
                )}
              </div>
              {/* Image Thumbnails */}
              {product.image && (
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-20 h-20 rounded-lg overflow-hidden border-2 border-emerald-200 hover:border-emerald-500 cursor-pointer transition-all"
                      onClick={() => {
                        // For now, same image - can be extended for multiple images
                        const img = document.querySelector('.main-product-image') as HTMLImageElement;
                        if (img) img.src = product.image || '';
                      }}
                    >
                      <img
                        src={product.image}
                        alt={`${product.name} view ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                      {product.name}
                    </h1>
                    <button
                      onClick={() => navigate(`/edit-product/${product.id}`)}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                      title="Edit product"
                    >
                      ✏️ Edit
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleWishlistToggle}
                  className={`text-4xl transition transform hover:scale-110 ${inWishlist ? "text-red-500" : "text-gray-300 hover:text-red-500"}`}
                  aria-label="Add to wishlist"
                  title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  ❤️
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {product.rating ? (
                    <>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-2xl ${i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}>⭐</span>
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-gray-700">{product.rating}</span>
                      {product.reviewCount && (
                        <span className="text-gray-600 text-sm">
                          ({product.reviewCount} {product.reviewCount === 1 ? "review" : "reviews"})
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-gray-500">No reviews yet</span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ${product.price}
                </p>
              </div>

              {/* Stock Info */}
              {product.stock !== undefined && (
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                    product.stock > 10 ? "bg-green-100 text-green-700" :
                    product.stock > 5 ? "bg-yellow-100 text-yellow-700" :
                    product.stock > 0 ? "bg-orange-100 text-orange-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                  </span>
                </div>
              )}

              {/* Short Description */}
              <div>
                <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Color Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Color: <span className="capitalize">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {["brown", "green", "red", "blue", "black"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all transform hover:scale-110 ${
                        selectedColor === color
                          ? "border-emerald-600 ring-2 ring-emerald-200 ring-offset-2"
                          : "border-gray-300 hover:border-emerald-400"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color.charAt(0).toUpperCase() + color.slice(1)}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Size: <span>{selectedSize}</span>
                  </label>
                  <button
                    onClick={() => showToast("Size guide coming soon!", "info")}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium underline"
                  >
                    View Size Guide
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? "bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105"
                          : "bg-white text-gray-700 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-emerald-700">Quantity:</label>
                <div className="flex items-center border-2 border-emerald-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock || 99}
                    value={quantity}
                    onChange={(e) => {
                      const val = Math.max(1, Math.min(Number(e.target.value), product?.stock || 99));
                      setQuantity(val);
                    }}
                    className="w-16 px-4 py-2 text-center border-0 focus:outline-none font-semibold"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stock || 99)}
                    className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl text-lg"
                >
                  {isOutOfStock ? "Out of Stock" : `🛒 Add to Cart`}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl text-lg"
                >
                  Buy Now
                </motion.button>
              </div>

              {/* Action Links */}
              <div className="flex gap-4 pt-2 border-t border-gray-200">
                <button
                  onClick={handleWishlistToggle}
                  className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium transition"
                >
                  {inWishlist ? "❤️ Remove from Wishlist" : "❤️ Add to Wishlist"}
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => showToast("Compare feature coming soon!", "info")}
                  className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium transition"
                >
                  🔄 Add to Compare
                </button>
              </div>

              {/* Categories, SKU & Tags */}
              <div className="space-y-3 pt-2 border-t border-gray-200">
                <div>
                  <span className="text-sm font-semibold text-gray-700">Category: </span>
                  <span className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer">
                    {product.category || "Other"}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700">SKU: </span>
                  <span className="text-gray-600">GHFT{String(product.id).padStart(5, '0')}AAA</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700">Tags: </span>
                  <div className="flex gap-2 flex-wrap mt-1">
                    {[
                      product.category || "Product",
                      product.name.split(" ")[0],
                      "Quality",
                      "Premium"
                    ].filter(Boolean).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Share Product */}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">Share this product:</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-110 flex items-center justify-center"
                    title="Share on Facebook"
                  >
                    f
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="w-10 h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-all transform hover:scale-110 flex items-center justify-center"
                    title="Share on Twitter"
                  >
                    𝕏
                  </button>
                  <button
                    onClick={() => handleShare("pinterest")}
                    className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all transform hover:scale-110 flex items-center justify-center"
                    title="Share on Pinterest"
                  >
                    P
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-all transform hover:scale-110 flex items-center justify-center"
                    title="Share on LinkedIn"
                  >
                    in
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description and Reviews Tabs */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex gap-4 mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === "description"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("additional")}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === "additional"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                Additional Information
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === "reviews"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                Review ({product.reviewCount || 0})
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeTab === "description" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg mb-4">
                      {product.description}
                    </p>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-800">Key Features:</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Premium quality materials for durability</li>
                        <li>Carefully crafted for excellent performance</li>
                        <li>Perfect for everyday use</li>
                        <li>Great value for money</li>
                      </ul>
                    </div>
                    {product.category && (
                      <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                        <p className="text-sm text-gray-600">
                          <strong>Category:</strong> {product.category}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Stock Status:</strong> {product.stock !== undefined && product.stock > 0 
                            ? `${product.stock} units available` 
                            : "Currently out of stock"}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "additional" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="prose max-w-none">
                    <table className="w-full border-collapse">
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50 w-1/3">SKU</td>
                          <td className="py-3 px-4 text-gray-600">GHFT{String(product.id).padStart(5, '0')}AAA</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Category</td>
                          <td className="py-3 px-4 text-gray-600">{product.category || "Other"}</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Stock Status</td>
                          <td className="py-3 px-4 text-gray-600">
                            {product.stock !== undefined && product.stock > 0 
                              ? `In Stock (${product.stock} available)` 
                              : "Out of Stock"}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Weight</td>
                          <td className="py-3 px-4 text-gray-600">0.5 kg</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Dimensions</td>
                          <td className="py-3 px-4 text-gray-600">10 × 10 × 5 cm</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Material</td>
                          <td className="py-3 px-4 text-gray-600">Premium Quality</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Warranty</td>
                          <td className="py-3 px-4 text-gray-600">1 Year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Write Review Form */}
                  <div className="bg-white rounded-xl border-2 border-emerald-100 p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">Write a Review</h3>
                      {!showReviewForm && (
                        <button
                          onClick={() => setShowReviewForm(true)}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg transition-all font-semibold shadow-md hover:shadow-lg"
                        >
                          ✍️ Write Review
                        </button>
                      )}
                    </div>
                    {showReviewForm && (
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            value={reviewFormData.name}
                            onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Rating *
                          </label>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                                className={`text-3xl transition transform hover:scale-110 ${
                                  star <= reviewFormData.rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                              >
                                ⭐
                              </button>
                            ))}
                            <span className="ml-2 text-sm font-semibold text-gray-700">
                              {reviewFormData.rating} out of 5
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Review Title *
                          </label>
                          <input
                            type="text"
                            value={reviewFormData.title}
                            onChange={(e) => setReviewFormData({ ...reviewFormData, title: e.target.value })}
                            placeholder="Enter review title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Review *
                          </label>
                          <textarea
                            value={reviewFormData.text}
                            onChange={(e) => setReviewFormData({ ...reviewFormData, text: e.target.value })}
                            placeholder="Write your review here..."
                            rows={5}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 resize-none"
                            required
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg transition-all font-semibold shadow-md hover:shadow-lg"
                          >
                            Submit Review
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowReviewForm(false);
                              setReviewFormData({ name: "", rating: 5, title: "", text: "" });
                            }}
                            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {product.reviewCount && product.reviewCount > 0 ? (
                    <>
                      {/* Rating Summary */}
                      <div className="bg-emerald-50 rounded-xl p-6 mb-6">
                        <div className="flex items-center gap-6 mb-4">
                          <div className="text-5xl font-bold text-gray-800">
                            {product.rating?.toFixed(1)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-3xl ${i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}>⭐</span>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">
                              {product.rating?.toFixed(1)} out of 5 ({product.reviewCount} {product.reviewCount === 1 ? "Review" : "Reviews"})
                            </p>
                          </div>
                        </div>
                        
                        {/* Rating Distribution */}
                        <div className="space-y-3 pt-4 border-t border-emerald-200">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Distribution</h4>
                          {[5, 4, 3, 2, 1].map((star) => {
                            const count = Math.floor((product.reviewCount || 0) * (star === 5 ? 0.6 : star === 4 ? 0.25 : star === 3 ? 0.1 : star === 2 ? 0.03 : 0.02));
                            const percentage = product.reviewCount ? (count / product.reviewCount) * 100 : 0;
                            return (
                              <div key={star} className="flex items-center gap-4">
                                <div className="flex items-center gap-1 w-20">
                                  <span className="text-sm font-medium text-gray-700">{star}</span>
                                  <span className="text-yellow-400">⭐</span>
                                </div>
                                <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                  <div
                                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-700 rounded-full"
                                    style={{ width: `${Math.max(percentage, 2)}%`, minWidth: percentage > 0 ? '4px' : '0px' }}
                                  />
                                </div>
                                <span className="text-sm font-semibold text-gray-700 w-12 text-right">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Review List Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Review List</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Sort by:</span>
                          <select
                            value={reviewSort}
                            onChange={(e) => setReviewSort(e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                          >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="highest">Highest Rating</option>
                            <option value="lowest">Lowest Rating</option>
                          </select>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Showing 1-{Math.min(4, product.reviewCount || 0)} of {product.reviewCount} results
                      </p>

                      {/* Individual Reviews */}
                      <div className="space-y-6">
                        {[
                          ...userReviews.map(review => ({
                            ...review,
                            time: formatDate(review.date)
                          })),
                          { name: "Kristin Watson", verified: true, rating: 5, title: "Love It: My Recent Clothing Purchase", text: "I recently picked up some new clothes and I have to say, I'm loving them! From the fit to the fabric, everything about these pieces is just perfect. They're comfortable, stylish, and exactly what I was looking for.", time: "1 month ago" },
                          { name: "Bessie Cooper", verified: true, rating: 5, title: "Excellent Product, I like It!", text: "I recently treated myself to some new clothes, and I couldn't be happier with my purchase! The fit is spot-on, and the fabric feels amazing against my skin. These pieces are not only comfortable but incredibly stylish as well.", time: "2 months ago" },
                          { name: "Robert Fox", verified: true, rating: 4, title: "Good Quality Product", text: "Overall a great product. The quality is good and the price is reasonable. Would recommend to others looking for similar items.", time: "3 months ago" },
                          { name: "Jane Smith", verified: true, rating: 5, title: "Amazing Purchase!", text: "This product exceeded my expectations. The quality is outstanding and it arrived quickly. Very satisfied with my purchase!", time: "4 months ago" }
                        ]
                        .sort((a, b) => {
                          if (reviewSort === "newest") {
                            if ('date' in a && !('date' in b)) return -1;
                            if (!('date' in a) && 'date' in b) return 1;
                            if ('date' in a && 'date' in b) {
                              return new Date(b.date).getTime() - new Date(a.date).getTime();
                            }
                            return 0;
                          }
                          if (reviewSort === "oldest") {
                            if ('date' in a && 'date' in b) {
                              return new Date(a.date).getTime() - new Date(b.date).getTime();
                            }
                            return 0;
                          }
                          if (reviewSort === "highest") return b.rating - a.rating;
                          if (reviewSort === "lowest") return a.rating - b.rating;
                          return 0;
                        })
                        .slice(0, Math.min(20, (product.reviewCount || 0) + userReviews.length)).map((review, i) => (
                          <div key={i} className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {review.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-gray-800">{review.name}</p>
                                  {review.verified && (
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                                      Verified
                                    </span>
                                  )}
                                </div>
                                <p className="font-semibold text-gray-900 mb-2">{review.title}</p>
                                <div className="flex items-center gap-1 mb-2">
                                  {[...Array(5)].map((_, j) => (
                                    <span key={j} className={`text-lg ${j < review.rating ? "text-yellow-400" : "text-gray-300"}`}>⭐</span>
                                  ))}
                                  <span className="text-sm font-semibold text-gray-700 ml-1">{review.rating}.0</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{review.time}</p>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg mb-4">No reviews yet</p>
                      <p className="text-gray-400">Be the first to review this product!</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 border-t border-gray-200 pt-8">
              <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
