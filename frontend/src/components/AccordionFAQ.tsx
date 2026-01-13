import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

type AccordionFAQProps = {
  items: FAQItem[];
  title?: string;
};

const AccordionFAQ = ({ items, title = "Frequently Asked Questions" }: AccordionFAQProps) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          {title}
        </h2>
      )}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:border-emerald-300 dark:hover:border-emerald-600"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
              aria-expanded={openId === item.id}
            >
              <span className="font-semibold text-gray-900 dark:text-gray-100 pr-4">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: openId === item.id ? 180 : 0 }}
                className="flex-shrink-0 text-2xl text-emerald-600 dark:text-emerald-400"
              >
                ▼
              </motion.span>
            </button>
            <AnimatePresence>
              {openId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccordionFAQ;
