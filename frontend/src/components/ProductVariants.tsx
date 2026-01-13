import { useState } from "react";
import { motion } from "framer-motion";

export type VariantOption = {
  id: string;
  label: string;
  value: string;
  available?: boolean;
};

type ProductVariantsProps = {
  variants: {
    size?: VariantOption[];
    color?: VariantOption[];
  };
  selectedSize?: string;
  selectedColor?: string;
  onSizeChange?: (size: string) => void;
  onColorChange?: (color: string) => void;
};

const ProductVariants = ({
  variants,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: ProductVariantsProps) => {
  return (
    <div className="space-y-4">
      {/* Size Selection */}
      {variants.size && variants.size.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
            Size
          </label>
          <div className="flex flex-wrap gap-2">
            {variants.size.map((size) => (
              <motion.button
                key={size.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSizeChange?.(size.value)}
                disabled={size.available === false}
                className={`px-4 py-2 rounded-lg font-semibold transition-all border-2 ${
                  selectedSize === size.value
                    ? "bg-emerald-500 text-white border-emerald-600 dark:bg-emerald-600 dark:border-emerald-500"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500"
                } ${
                  size.available === false
                    ? "opacity-50 cursor-not-allowed line-through"
                    : "cursor-pointer"
                }`}
              >
                {size.label}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {variants.color && variants.color.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
            Color
          </label>
          <div className="flex flex-wrap gap-3">
            {variants.color.map((color) => (
              <motion.button
                key={color.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onColorChange?.(color.value)}
                disabled={color.available === false}
                className={`w-12 h-12 rounded-full border-4 transition-all ${
                  selectedColor === color.value
                    ? "border-emerald-500 dark:border-emerald-400 ring-4 ring-emerald-200 dark:ring-emerald-800"
                    : "border-gray-300 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500"
                } ${
                  color.available === false ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
                style={{
                  backgroundColor: color.value,
                }}
                title={color.label}
                aria-label={color.label}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Selected: {selectedColor || "None"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductVariants;
