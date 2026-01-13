import { useMemo } from "react";
import { motion } from "framer-motion";

type PasswordStrengthMeterProps = {
  password: string;
};

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const strength = useMemo(() => {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { level: "weak", color: "red", percentage: 33 };
    if (score === 3) return { level: "fair", color: "yellow", percentage: 50 };
    if (score === 4) return { level: "good", color: "blue", percentage: 75 };
    return { level: "strong", color: "green", percentage: 100 };
  }, [password]);

  if (!password) return null;

  const colorClasses = {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  const textClasses = {
    red: "text-red-600 dark:text-red-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-semibold ${textClasses[strength.color]}`}>
          Password Strength: {strength.level}
        </span>
        <span className={`text-xs font-semibold ${textClasses[strength.color]}`}>
          {strength.percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${strength.percentage}%` }}
          transition={{ duration: 0.3 }}
          className={`h-full ${colorClasses[strength.color]} transition-all`}
        />
      </div>
      <ul className="mt-2 text-xs text-gray-600 dark:text-gray-400 space-y-1">
        <li className={password.length >= 8 ? "text-green-600" : ""}>
          {password.length >= 8 ? "✓" : "○"} At least 8 characters
        </li>
        <li className={/[a-z]/.test(password) && /[A-Z]/.test(password) ? "text-green-600" : ""}>
          {/[a-z]/.test(password) && /[A-Z]/.test(password) ? "✓" : "○"} Uppercase and lowercase
        </li>
        <li className={/\d/.test(password) ? "text-green-600" : ""}>
          {/\d/.test(password) ? "✓" : "○"} At least one number
        </li>
        <li className={/[^a-zA-Z0-9]/.test(password) ? "text-green-600" : ""}>
          {/[^a-zA-Z0-9]/.test(password) ? "✓" : "○"} At least one special character
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrengthMeter;
