import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LocalStorageManager = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button - Only show in development */}
      {process.env.NODE_ENV === "development" && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-24 z-40 w-12 h-12 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center font-bold transition"
          aria-label="Open localStorage manager"
          title="LocalStorage Manager (Dev Only)"
        >
          💾
        </motion.button>
      )}

      {/* Manager Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-gray-800 z-50 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">💾 LocalStorage Manager</h2>
                  <p className="text-xs text-emerald-100">
                    Development Tool
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition text-2xl"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    LocalStorage management functionality has been disabled.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This is a development tool for debugging purposes.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LocalStorageManager;
