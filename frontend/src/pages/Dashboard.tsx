import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import Products from "./Products";
import RecentlyViewed from "../components/RecentlyViewed";
import CartDropdown from "../components/CartDropdown";
import ProductComparison from "../components/ProductComparison";
import ThemeToggle from "../components/ThemeToggle";

const Dashboard = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleComparisonUpdate = () => {
      setShowComparison(true);
    };
    window.addEventListener("comparisonUpdated", handleComparisonUpdate);
    return () => window.removeEventListener("comparisonUpdated", handleComparisonUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white px-4 py-5 md:px-8 shadow-2xl"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            🛍️ Mini E-Commerce Dashboard
          </h1>

          <div className="flex items-center gap-3 flex-wrap">
            <ThemeToggle />
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/add-product"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                ➕ Add Product
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/profile"
                className="bg-white/90 backdrop-blur-sm text-emerald-700 px-5 py-2.5 rounded-xl hover:bg-white transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                Profile
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/orders"
                className="bg-white/90 backdrop-blur-sm text-emerald-700 px-5 py-2.5 rounded-xl hover:bg-white transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                Orders
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/wishlist"
                className="bg-white/90 backdrop-blur-sm text-emerald-700 px-5 py-2.5 rounded-xl hover:bg-white transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                Wishlist
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
              <button
                onClick={() => setShowCartDropdown(!showCartDropdown)}
                className="relative bg-white/90 backdrop-blur-sm text-emerald-700 px-5 py-2.5 rounded-xl hover:bg-white transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                Cart
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </motion.div>
            <CartDropdown isOpen={showCartDropdown} onClose={() => setShowCartDropdown(false)} />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => setShowComparison(true)}
                className="relative bg-white/90 backdrop-blur-sm text-emerald-700 px-5 py-2.5 rounded-xl hover:bg-white transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                Compare
                {(() => {
                  const compared = JSON.parse(localStorage.getItem("comparedProducts") || "[]");
                  return compared.length > 0 ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
                    >
                      {compared.length}
                    </motion.span>
                  ) : null;
                })()}
              </button>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl hover:bg-white/30 transition-all font-semibold shadow-lg border border-white/30"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Products */}
      <Products />

      {/* Recently Viewed */}
      <div className="px-4 md:px-6">
        <RecentlyViewed />
      </div>

      {/* Announcements */}
      <div className="px-4 md:px-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-6 md:p-8 border-2 border-emerald-200 dark:border-emerald-700 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              📢 Important Announcements
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Welcome to your dashboard! Browse our collection, manage your wishlist, and enjoy seamless shopping experience.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Stay updated with the latest products and exclusive deals. Happy shopping!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Product Comparison Modal */}
      <ProductComparison isOpen={showComparison} onClose={() => setShowComparison(false)} />
    </div>
  );
};

export default Dashboard;
