import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type EmptyStateProps = {
  title: string;
  message: string;
  buttonText?: string;
  buttonLink?: string;
  icon?: string;
};

const EmptyState = ({
  title,
  message,
  buttonText,
  buttonLink,
  icon = "📦",
}: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-4"
    >
      <div className="text-7xl mb-6">{icon}</div>
      <h3 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">{title}</h3>
      <p className="text-emerald-700 mb-8 max-w-md mx-auto text-lg font-medium">{message}</p>
      {buttonText && buttonLink && (
        <Link
          to={buttonLink}
          className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl transition-all font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          {buttonText}
        </Link>
      )}
    </motion.div>
  );
};

export default EmptyState;
