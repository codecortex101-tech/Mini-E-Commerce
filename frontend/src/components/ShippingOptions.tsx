import { motion } from "framer-motion";

export type ShippingOption = {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
};

type ShippingOptionsProps = {
  selected: string;
  onSelect: (id: string) => void;
};

const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 5.99,
    estimatedDays: "5-7 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 12.99,
    estimatedDays: "2-3 business days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    price: 24.99,
    estimatedDays: "Next business day",
  },
  {
    id: "free",
    name: "Free Shipping",
    description: "7-10 business days (Free on orders over $50)",
    price: 0,
    estimatedDays: "7-10 business days",
  },
];

const ShippingOptions = ({ selected, onSelect }: ShippingOptionsProps) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
        Shipping Method
      </label>
      {SHIPPING_OPTIONS.map((option) => (
        <motion.label
          key={option.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
            selected === option.id
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
              : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700"
          }`}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={selected === option.id}
                onChange={() => onSelect(option.id)}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {option.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {option.description}
                </div>
              </div>
            </div>
          </div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">
            {option.price === 0 ? "FREE" : `$${option.price.toFixed(2)}`}
          </div>
        </motion.label>
      ))}
    </div>
  );
};

export default ShippingOptions;
export { SHIPPING_OPTIONS };
