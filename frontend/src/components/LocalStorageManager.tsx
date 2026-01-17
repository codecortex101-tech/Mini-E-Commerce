import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LocalStorageManager = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {import.meta.env.DEV && (
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-24 w-12 h-12 bg-gray-600 text-white rounded-full"
        >
          💾
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default LocalStorageManager;
