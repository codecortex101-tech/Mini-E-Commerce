import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";

type PromoCodeInputProps = {
  onApply: (code: string, discount: number) => void;
  appliedCode?: string;
  onRemove?: () => void;
};

// Mock promo codes
const PROMO_CODES: Record<string, number> = {
  SAVE10: 10,
  WELCOME20: 20,
  FLASH30: 30,
  SUMMER15: 15,
  SAVE50: 50,
};

const PromoCodeInput = ({ onApply, appliedCode, onRemove }: PromoCodeInputProps) => {
  const [code, setCode] = useState("");
  const { showToast } = useToast();

  const handleApply = () => {
    const upperCode = code.toUpperCase().trim();
    if (PROMO_CODES[upperCode]) {
      onApply(upperCode, PROMO_CODES[upperCode]);
      showToast(`Promo code "${upperCode}" applied!`, "success");
      setCode("");
    } else {
      showToast("Invalid promo code", "error");
    }
  };

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <span className="text-green-600 dark:text-green-400 font-semibold">
            ✓ {appliedCode} Applied
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({PROMO_CODES[appliedCode]}% off)
          </span>
        </div>
        {onRemove && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold"
          >
            Remove
          </motion.button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400">
        Promo Code
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter promo code"
          className="input-primary flex-1"
          onKeyPress={(e) => e.key === "Enter" && handleApply()}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApply}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Apply
        </motion.button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Try: SAVE10, WELCOME20, FLASH30, SUMMER15, SAVE50
      </p>
    </div>
  );
};

export default PromoCodeInput;
