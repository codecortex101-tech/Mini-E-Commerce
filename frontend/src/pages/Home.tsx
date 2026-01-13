import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-white">
      {/* Hero Section */}
      <div className="flex items-center justify-center px-4 py-20 bg-gradient-to-b from-green-100 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-green-800 mb-4"
          >
            Welcome to Mini E-Commerce
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-green-700 mb-8"
          >
            Your one-stop shop for quality products at great prices
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-medium inline-block shadow-lg"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition font-medium inline-block shadow-md"
              >
                Register
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Special Offers Section */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
          >
            🎉 Special Offers
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2 text-emerald-800">Free Shipping</h3>
              <p className="text-gray-700">
                Get free shipping on orders over $50. No hidden fees, just fast delivery to your door.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-2 text-emerald-800">Secure Payment</h3>
              <p className="text-gray-700">
                Shop with confidence. All transactions are encrypted and secure. Multiple payment options available.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">↩️</div>
              <h3 className="text-xl font-bold mb-2 text-emerald-800">Easy Returns</h3>
              <p className="text-gray-700">
                Not satisfied? Return any item within 30 days for a full refund. Hassle-free returns process.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Link
              to="/login"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl text-center"
            >
              Start Shopping
            </Link>
            <Link
              to="/register"
              className="bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl text-center"
            >
              Create Account
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
