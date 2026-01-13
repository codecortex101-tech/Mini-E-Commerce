import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type CountdownTimerProps = {
  targetDate: Date;
  onComplete?: () => void;
  label?: string;
};

const CountdownTimer = ({ targetDate, onComplete, label = "Time Left" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        onComplete?.();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (isExpired) {
    return (
      <div className="text-center p-4 bg-red-100 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-xl">
        <p className="text-red-600 dark:text-red-400 font-bold text-lg">⏰ Time's Up!</p>
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="text-center p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
      <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-3">{label}</p>
      <div className="flex justify-center gap-3">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border-2 border-red-200 dark:border-red-700 min-w-[60px]">
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                {unit.value.toString().padStart(2, "0")}
              </span>
            </div>
            <span className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
