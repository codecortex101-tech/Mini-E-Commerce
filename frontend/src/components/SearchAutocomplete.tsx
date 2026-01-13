import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../utils/products";
import type { Product } from "../utils/products";

type SearchAutocompleteProps = {
  onProductSelect?: (product: Product) => void;
  onSearchChange?: (query: string) => void;
};

const SearchAutocomplete = ({ onProductSelect, onSearchChange }: SearchAutocompleteProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const products = getProducts();
      const filtered = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSelect = (product: Product) => {
    setSearchQuery("");
    setShowSuggestions(false);
    if (onProductSelect) {
      onProductSelect(product);
    } else {
      navigate(`/product/${product.id}`);
    }
    // Save to search history
    const updatedHistory = [
      product.name,
      ...searchHistory.filter((item: string) => item !== product.name),
    ].slice(0, 5);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    }
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder="🔍 Search products..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setSelectedIndex(-1);
          if (onSearchChange) {
            onSearchChange(e.target.value);
          }
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onKeyDown={handleKeyDown}
        className="w-full px-5 py-4 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:border-emerald-400 bg-white shadow-lg hover:shadow-xl transition-all text-lg"
      />

      <AnimatePresence>
        {showSuggestions && (suggestions.length > 0 || searchHistory.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-emerald-100 z-50 max-h-96 overflow-y-auto"
          >
            {suggestions.length > 0 ? (
              <div className="p-2">
                {suggestions.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelect(product)}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      selectedIndex === index
                        ? "bg-emerald-100"
                        : "hover:bg-emerald-50"
                    }`}
                  >
                    <div className="flex gap-3">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        <p className="text-sm text-emerald-600 font-bold">${product.price}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : searchQuery.length === 0 && searchHistory.length > 0 ? (
              <div className="p-2">
                <p className="text-xs text-gray-500 px-3 py-2">Recent Searches</p>
                {searchHistory.map((item: string, index: number) => (
                  <div
                    key={index}
                    onClick={() => setSearchQuery(item)}
                    className="p-3 rounded-lg cursor-pointer hover:bg-emerald-50 transition"
                  >
                    <p className="text-gray-700">🔍 {item}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchAutocomplete;
