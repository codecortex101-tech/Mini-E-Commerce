import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";

type TwoFactorAuthProps = {
  onVerify: (code: string) => void;
  onCancel?: () => void;
};

const TwoFactorAuth = ({ onVerify, onCancel }: TwoFactorAuthProps) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const { showToast } = useToast();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newCode = [...code];
    newCode[index] = value.replace(/\D/g, ""); // Only numbers
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto-submit when all digits are filled
    if (newCode.every((digit) => digit !== "") && index === 5) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pastedData[i] || "";
    }
    setCode(newCode);
    if (pastedData.length === 6) {
      handleVerify(pastedData);
    } else {
      inputRefs[pastedData.length]?.current?.focus();
    }
  };

  const handleVerify = (codeToVerify: string) => {
    if (codeToVerify.length !== 6) {
      showToast("Please enter a 6-digit code", "error");
      return;
    }
    onVerify(codeToVerify);
  };

  const handleResend = () => {
    setCode(["", "", "", "", "", ""]);
    inputRefs[0].current?.focus();
    showToast("New code sent to your email", "success");
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-emerald-200 dark:border-gray-700">
      <div className="text-center mb-6">
        <div className="text-5xl mb-4">🔐</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Two-Factor Authentication
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
        {code.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition"
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleVerify(code.join(""))}
          className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
        >
          Verify Code
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleResend}
          className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition"
        >
          Resend Code
        </motion.button>

        {onCancel && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCancel}
            className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg font-semibold transition"
          >
            Cancel
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default TwoFactorAuth;
