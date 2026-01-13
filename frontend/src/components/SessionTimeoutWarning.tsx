import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before timeout

const SessionTimeoutWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let lastActivity = Date.now();
    let warningTimer: NodeJS.Timeout;
    let timeoutTimer: NodeJS.Timeout;

    const updateActivity = () => {
      lastActivity = Date.now();
    };

    const checkTimeout = () => {
      const timeSinceActivity = Date.now() - lastActivity;
      const timeUntilTimeout = SESSION_TIMEOUT - timeSinceActivity;

      if (timeUntilTimeout <= 0) {
        // Session expired
        handleLogout();
      } else if (timeUntilTimeout <= WARNING_TIME && !showWarning) {
        // Show warning
        setShowWarning(true);
        setTimeRemaining(Math.floor(timeUntilTimeout / 1000));

        // Start countdown
        const countdownInterval = setInterval(() => {
          const remaining = Math.floor(
            (SESSION_TIMEOUT - (Date.now() - lastActivity)) / 1000
          );
          if (remaining > 0) {
            setTimeRemaining(remaining);
          } else {
            clearInterval(countdownInterval);
            handleLogout();
          }
        }, 1000);
      }
    };

    const handleLogout = () => {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("cart");
      navigate("/login");
      setShowWarning(false);
    };

    // Track user activity
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    events.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    // Check timeout every minute
    const interval = setInterval(checkTimeout, 60 * 1000);

    // Initial check
    checkTimeout();

    return () => {
      clearInterval(interval);
      if (warningTimer) clearTimeout(warningTimer);
      if (timeoutTimer) clearTimeout(timeoutTimer);
      events.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, [navigate, showWarning]);

  const handleExtendSession = () => {
    setShowWarning(false);
    // Reset activity time
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    events.forEach((event) => {
      window.dispatchEvent(new Event(event));
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("cart");
    navigate("/login");
    setShowWarning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {showWarning && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={handleExtendSession}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-emerald-200 dark:border-gray-700"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Session Timeout Warning
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your session will expire in:
              </p>
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
                {formatTime(timeRemaining)}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Would you like to extend your session?
              </p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExtendSession}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
                >
                  Stay Logged In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition"
                >
                  Logout
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SessionTimeoutWarning;
