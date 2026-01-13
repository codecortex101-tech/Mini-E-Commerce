import { motion } from "framer-motion";

const SkipToContent = () => {
  const handleClick = () => {
    const main = document.querySelector("main") || document.querySelector("#root");
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.a
      href="#main-content"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
      aria-label="Skip to main content"
    >
      Skip to main content
    </motion.a>
  );
};

export default SkipToContent;
