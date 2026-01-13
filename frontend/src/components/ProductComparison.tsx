import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../utils/products";
import type { Product } from "../utils/products";

type ProductComparisonProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProductComparison = ({ isOpen, onClose }: ProductComparisonProps) => {
  const navigate = useNavigate();
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const comparedIds = JSON.parse(localStorage.getItem("comparedProducts") || "[]");
    const products = comparedIds
      .map((id: number) => getProductById(id))
      .filter((p: Product | undefined): p is Product => p !== undefined);
    setComparedProducts(products);
  }, [isOpen]);

  const removeFromComparison = (id: number) => {
    const comparedIds = JSON.parse(localStorage.getItem("comparedProducts") || "[]");
    const updated = comparedIds.filter((pid: number) => pid !== id);
    localStorage.setItem("comparedProducts", JSON.stringify(updated));
    setComparedProducts(comparedProducts.filter(p => p.id !== id));
  };

  const clearComparison = () => {
    localStorage.setItem("comparedProducts", JSON.stringify([]));
    setComparedProducts([]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Product Comparison</h2>
                <div className="flex gap-2">
                  <button
                    onClick={clearComparison}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>

              {comparedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">No products to compare</p>
                  <p className="text-gray-400 text-sm">Add products to comparison to see them here</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="p-4 text-left font-semibold text-gray-700">Features</th>
                        {comparedProducts.map((product) => (
                        <th key={product.id} className="p-4 text-center min-w-[200px]">
                          <button
                            onClick={() => removeFromComparison(product.id)}
                            className="float-right text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                          <div className="mt-8">
                            {product.image && (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                              />
                            )}
                            <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-2xl font-bold text-emerald-600 mb-4">${product.price}</p>
                            <button
                              onClick={() => {
                                onClose();
                                navigate(`/product/${product.id}`);
                              }}
                              className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
                            >
                              View Details
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-700">Price</td>
                      {comparedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          ${product.price}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-700">Rating</td>
                      {comparedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          {product.rating ? `⭐ ${product.rating}` : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-700">Category</td>
                      {comparedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          {product.category || "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-700">Stock</td>
                      {comparedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          {product.stock !== undefined
                            ? product.stock > 0
                              ? `${product.stock} available`
                              : "Out of Stock"
                            : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-700">Description</td>
                      {comparedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center text-sm text-gray-600">
                          {product.description?.substring(0, 100) || "N/A"}...
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductComparison;
