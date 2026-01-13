import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import type { Product } from "../utils/products";

type Bundle = {
  id: string;
  name: string;
  description: string;
  products: Product[];
  originalPrice: number;
  bundlePrice: number;
  discount: number;
  image?: string;
};

type ProductBundleProps = {
  bundle: Bundle;
  onAddToCart?: () => void;
};

const ProductBundle = ({ bundle, onAddToCart }: ProductBundleProps) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [selectedProducts, setSelectedProducts] = useState<number[]>(
    bundle.products.map((p) => p.id)
  );

  const toggleProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateBundlePrice = () => {
    const selected = bundle.products.filter((p) => selectedProducts.includes(p.id));
    if (selected.length === 0) return 0;

    const total = selected.reduce((sum, p) => sum + p.price, 0);
    if (selected.length === bundle.products.length) {
      return bundle.bundlePrice; // Full bundle discount
    }
    return total; // Individual prices
  };

  const calculateDiscount = () => {
    if (selectedProducts.length !== bundle.products.length) return 0;
    const total = bundle.products.reduce((sum, p) => sum + p.price, 0);
    return total - bundle.bundlePrice;
  };

  const handleAddToCart = () => {
    const selected = bundle.products.filter((p) => selectedProducts.includes(p.id));
    if (selected.length === 0) {
      showToast("Please select at least one product", "error");
      return;
    }

    selected.forEach((product) => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
      });
    });

    showToast(
      `Bundle added to cart! (${selected.length} ${selected.length === 1 ? "item" : "items"})`,
      "success"
    );
    onAddToCart?.();
  };

  const bundlePrice = calculateBundlePrice();
  const discount = calculateDiscount();
  const isFullBundle = selectedProducts.length === bundle.products.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-emerald-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            📦 {bundle.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">{bundle.description}</p>
        </div>
        {bundle.image && (
          <img
            src={bundle.image}
            alt={bundle.name}
            className="w-24 h-24 object-cover rounded-lg ml-4"
          />
        )}
      </div>

      {/* Bundle Products */}
      <div className="space-y-3 mb-6">
        {bundle.products.map((product) => {
          const isSelected = selectedProducts.includes(product.id);
          return (
            <motion.label
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleProduct(product.id)}
                className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {product.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            </motion.label>
          );
        })}
      </div>

      {/* Pricing */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 dark:text-gray-400">Selected Items:</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {selectedProducts.length} / {bundle.products.length}
          </span>
        </div>
        {isFullBundle && discount > 0 && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 dark:text-gray-400">Original Price:</span>
            <span className="text-gray-500 line-through">
              ${bundle.originalPrice.toFixed(2)}
            </span>
          </div>
        )}
        {isFullBundle && discount > 0 && (
          <div className="flex justify-between items-center mb-2 text-green-600 dark:text-green-400">
            <span className="font-semibold">You Save:</span>
            <span className="font-bold">-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Total:</span>
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            ${bundlePrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        disabled={selectedProducts.length === 0}
        className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        🛒 Add Bundle to Cart
      </motion.button>
    </div>
  );
};

export default ProductBundle;
