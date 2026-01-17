import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SESSION_TIMEOUT = 30 * 60 * 1000;
const WARNING_TIME = 5 * 60 * 1000;

const SessionTimeoutWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let lastActivity = Date.now();
    let countdownInterval: ReturnType<typeof setInterval>;

    const updateActivity = () => {
      lastActivity = Date.now();
      setShowWarning(false);
    };

    const handleLogout = () => {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("cart");
      navigate("/login");
    };

    const checkTimeout = () => {
      const remaining = SESSION_TIMEOUT - (Date.now() - lastActivity);

      if (remaining <= 0) {
        handleLogout();
      } else if (remaining <= WARNING_TIME && !showWarning) {
        setShowWarning(true);
        setTimeRemaining(Math.floor(remaining / 1000));

        countdownInterval = setInterval(() => {
          const sec = Math.floor(
            (SESSION_TIMEOUT - (Date.now() - lastActivity)) / 1000
          );
          setTimeRemaining(sec);
          if (sec <= 0) {
            clearInterval(countdownInterval);
            handleLogout();
          }
        }, 1000);
      }
    };

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, updateActivity));

    const interval = setInterval(checkTimeout, 60 * 1000);
    checkTimeout();

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
      events.forEach((e) => window.removeEventListener(e, updateActivity));
    };
  }, [navigate, showWarning]);

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div className="bg-white p-6 rounded-xl text-center">
            <p className="text-xl font-bold mb-2">Session Expiring</p>
            <p className="mb-4">Time left: {timeRemaining}s</p>
            <button
              onClick={() => setShowWarning(false)}
              className="px-4 py-2 bg-emerald-500 text-white rounded"
            >
              Stay Logged In
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SessionTimeoutWarning;
