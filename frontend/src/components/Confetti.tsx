import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ConfettiProps = {
  show: boolean;
  onComplete?: () => void;
};

const Confetti = ({ show, onComplete }: ConfettiProps) => {
  const colors = ["#10b981", "#059669", "#34d399", "#6ee7b7", "#a7f3d0"];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => i);

  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confettiPieces.map((i) => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const duration = 1 + Math.random() * 2;

            return (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: color,
                  left: `${left}%`,
                  top: "-10px",
                }}
                initial={{
                  y: 0,
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  y: window.innerHeight + 100,
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                  opacity: [1, 1, 0],
                  x: (Math.random() - 0.5) * 100,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration,
                  delay,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};

export default Confetti;
