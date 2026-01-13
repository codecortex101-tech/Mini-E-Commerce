import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export type PaymentFormData = {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  paymentMethod: "card" | "paypal" | "applepay" | "googlepay";
};

type PaymentFormProps = {
  onSubmit: (data: PaymentFormData) => void;
  isLoading?: boolean;
};

const PaymentForm = ({ onSubmit, isLoading = false }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "applepay" | "googlepay">("card");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PaymentFormData>({
    defaultValues: {
      paymentMethod: "card",
    },
  });

  const cardNumber = watch("cardNumber") || "";

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setValue("cardNumber", formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setValue("expiryDate", formatted);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "card", label: "💳 Card", icon: "💳" },
            { value: "paypal", label: "PayPal", icon: "🔵" },
            { value: "applepay", label: "Apple Pay", icon: "🍎" },
            { value: "googlepay", label: "Google Pay", icon: "🔴" },
          ].map((method) => (
            <motion.label
              key={method.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                paymentMethod === method.value
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-emerald-300"
              }`}
            >
              <input
                type="radio"
                value={method.value}
                checked={paymentMethod === method.value}
                onChange={(e) => {
                  setPaymentMethod(e.target.value as any);
                  setValue("paymentMethod", e.target.value as any);
                }}
                className="sr-only"
              />
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {method.icon} {method.label.replace(/[^\w\s]/g, "")}
              </span>
            </motion.label>
          ))}
        </div>
      </div>

      {paymentMethod === "card" && (
        <>
          {/* Card Number */}
          <div>
            <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
              Card Number
            </label>
            <input
              type="text"
              {...register("cardNumber", {
                required: "Card number is required",
                pattern: {
                  value: /^[\d\s]{13,19}$/,
                  message: "Invalid card number",
                },
              })}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`input-primary ${
                errors.cardNumber ? "border-red-500 focus:ring-red-400" : ""
              }`}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber.message}</p>
            )}
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              {...register("cardName", {
                required: "Cardholder name is required",
              })}
              placeholder="John Doe"
              className={`input-primary ${errors.cardName ? "border-red-500 focus:ring-red-400" : ""}`}
            />
            {errors.cardName && (
              <p className="text-red-500 text-xs mt-1">{errors.cardName.message}</p>
            )}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                {...register("expiryDate", {
                  required: "Expiry date is required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "MM/YY format",
                  },
                })}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength={5}
                className={`input-primary ${errors.expiryDate ? "border-red-500 focus:ring-red-400" : ""}`}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-xs mt-1">{errors.expiryDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                CVV
              </label>
              <input
                type="text"
                {...register("cvv", {
                  required: "CVV is required",
                  pattern: {
                    value: /^\d{3,4}$/,
                    message: "Invalid CVV",
                  },
                })}
                placeholder="123"
                maxLength={4}
                className={`input-primary ${errors.cvv ? "border-red-500 focus:ring-red-400" : ""}`}
              />
              {errors.cvv && (
                <p className="text-red-500 text-xs mt-1">{errors.cvv.message}</p>
              )}
            </div>
          </div>
        </>
      )}

      {paymentMethod !== "card" && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {paymentMethod === "paypal" && "You will be redirected to PayPal to complete payment."}
            {paymentMethod === "applepay" && "You will be redirected to Apple Pay to complete payment."}
            {paymentMethod === "googlepay" && "You will be redirected to Google Pay to complete payment."}
          </p>
        </div>
      )}
    </form>
  );
};

export default PaymentForm;
