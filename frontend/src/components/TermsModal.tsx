import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onAccept: () => void;
};

const TermsModal = ({ isOpen, onAccept }: Props) => {
  const [acceptEnabled, setAcceptEnabled] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <motion.div className="bg-white p-6 rounded">
            <div
              onScroll={(e) =>
                setAcceptEnabled(
                  e.currentTarget.scrollHeight -
                    e.currentTarget.scrollTop <=
                    e.currentTarget.clientHeight + 10
                )
              }
              className="h-40 overflow-y-auto"
            >
              Terms content…
            </div>
            <button disabled={!acceptEnabled} onClick={onAccept}>
              Accept
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
