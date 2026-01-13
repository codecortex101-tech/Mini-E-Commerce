import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-9xl mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-extrabold">
          404
        </div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Page Not Found
        </h1>
        <p className="text-emerald-700 mb-8 text-lg font-medium">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl transition-all font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          🏠 Go to Dashboard
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
