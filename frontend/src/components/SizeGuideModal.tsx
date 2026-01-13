import { motion, AnimatePresence } from "framer-motion";

type SizeGuideModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
};

const SizeGuideModal = ({ isOpen, onClose, category = "Clothing" }: SizeGuideModalProps) => {
  const sizeCharts = {
    Clothing: {
      headers: ["Size", "Chest (inches)", "Waist (inches)", "Length (inches)"],
      rows: [
        ["XS", "34-36", "28-30", "26"],
        ["S", "36-38", "30-32", "27"],
        ["M", "38-40", "32-34", "28"],
        ["L", "40-42", "34-36", "29"],
        ["XL", "42-44", "36-38", "30"],
        ["XXL", "44-46", "38-40", "31"],
      ],
    },
    Shoes: {
      headers: ["US Size", "EU Size", "UK Size", "Length (cm)"],
      rows: [
        ["7", "40", "6", "25"],
        ["8", "41", "7", "26"],
        ["9", "42", "8", "27"],
        ["10", "43", "9", "28"],
        ["11", "44", "10", "29"],
        ["12", "45", "11", "30"],
      ],
    },
  };

  const chart = sizeCharts[category as keyof typeof sizeCharts] || sizeCharts.Clothing;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-3xl w-full mx-4 border-2 border-emerald-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                📏 Size Guide
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition text-2xl"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Find your perfect fit! Use the measurements below to select the right size.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-emerald-50 dark:bg-emerald-900/20">
                      {chart.headers.map((header, index) => (
                        <th
                          key={index}
                          className="border-2 border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chart.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border-2 border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 <strong>Tip:</strong> If you're between sizes, we recommend sizing up for a
                more comfortable fit.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
              >
                Got it!
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SizeGuideModal;
