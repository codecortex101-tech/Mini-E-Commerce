import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type TermsModalProps = {
  isOpen: boolean;
  onAccept: () => void;
  onDecline?: () => void;
};

const TermsModal = ({ isOpen, onAccept, onDecline }: TermsModalProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [acceptEnabled, setAcceptEnabled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrolledToBottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
    setHasScrolled(true);
    setAcceptEnabled(scrolledToBottom);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            onClick={onDecline}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col border-2 border-emerald-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                📜 Terms & Conditions
              </h2>
              {onDecline && (
                <button
                  onClick={onDecline}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition text-2xl"
                  aria-label="Close"
                >
                  ✕
                </button>
              )}
            </div>

            <div
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto pr-4 mb-6 space-y-4 text-gray-700 dark:text-gray-300"
            >
              <section>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  1. Acceptance of Terms
                </h3>
                <p className="text-sm leading-relaxed">
                  By accessing and using this website, you accept and agree to be bound by the terms
                  and provision of this agreement. If you do not agree to these terms, please do not
                  use our services.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  2. Use License
                </h3>
                <p className="text-sm leading-relaxed">
                  Permission is granted to temporarily download one copy of the materials on our
                  website for personal, non-commercial transitory viewing only. This is the grant of
                  a license, not a transfer of title.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  3. Payment Terms
                </h3>
                <p className="text-sm leading-relaxed">
                  All payments are processed securely. By making a purchase, you agree to our payment
                  terms and refund policy. Prices are subject to change without notice.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  4. Return Policy
                </h3>
                <p className="text-sm leading-relaxed">
                  Items can be returned within 30 days of purchase in original condition. Refunds will
                  be processed within 5-7 business days. Shipping costs are non-refundable.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  5. Privacy Policy
                </h3>
                <p className="text-sm leading-relaxed">
                  Your privacy is important to us. We collect and use your personal information in
                  accordance with our Privacy Policy. By using our services, you consent to our data
                  collection and usage practices.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  6. Limitation of Liability
                </h3>
                <p className="text-sm leading-relaxed">
                  In no event shall our company be liable for any damages arising out of the use or
                  inability to use the materials on our website, even if we have been notified orally
                  or in writing of the possibility of such damage.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  7. Governing Law
                </h3>
                <p className="text-sm leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws
                  of your jurisdiction. Any disputes relating to these terms will be subject to the
                  exclusive jurisdiction of the courts in your jurisdiction.
                </p>
              </section>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex gap-4">
              {onDecline && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onDecline}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition"
                >
                  Decline
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onAccept}
                disabled={!acceptEnabled}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
                  acceptEnabled
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
              >
                {acceptEnabled ? "✓ I Accept" : "Scroll to Accept"}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
