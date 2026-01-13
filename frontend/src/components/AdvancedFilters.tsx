import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type FilterOptions = {
  category: string[];
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  brands: string[];
  colors: string[];
  materials: string[];
};

type AdvancedFiltersProps = {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableBrands?: string[];
  availableColors?: string[];
  availableMaterials?: string[];
  priceRange: [number, number];
};

const AdvancedFilters = ({
  filters,
  onFiltersChange,
  availableBrands = [],
  availableColors = [],
  availableMaterials = [],
  priceRange,
}: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = <K extends keyof FilterOptions>(
    key: K,
    value: FilterOptions[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#EF4444" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" },
    { name: "Yellow", value: "#F59E0B" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Brown", value: "#92400E" },
    { name: "Gray", value: "#6B7280" },
  ];

  const materials = ["Cotton", "Polyester", "Leather", "Wool", "Silk", "Denim", "Linen", "Synthetic"];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-emerald-100 dark:border-gray-700 p-4 mb-6">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all"
      >
        <span className="font-bold text-emerald-700 dark:text-emerald-400">
          🔍 Advanced Filters
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-emerald-600 dark:text-emerald-400"
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {/* Brands Filter */}
              {availableBrands.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
                    Brands
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableBrands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-2 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateFilter("brands", [...filters.brands, brand]);
                            } else {
                              updateFilter(
                                "brands",
                                filters.brands.filter((b) => b !== brand)
                              );
                            }
                          }}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors Filter */}
              <div>
                <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
                  Colors
                </label>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <motion.button
                      key={color.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        const newColors = filters.colors.includes(color.name)
                          ? filters.colors.filter((c) => c !== color.name)
                          : [...filters.colors, color.name];
                        updateFilter("colors", newColors);
                      }}
                      className={`w-10 h-10 rounded-full border-4 transition-all ${
                        filters.colors.includes(color.name)
                          ? "border-emerald-500 dark:border-emerald-400 ring-4 ring-emerald-200 dark:ring-emerald-800"
                          : "border-gray-300 dark:border-gray-600 hover:border-emerald-400"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      aria-label={color.name}
                    />
                  ))}
                </div>
                {filters.colors.length > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Selected: {filters.colors.join(", ")}
                  </p>
                )}
              </div>

              {/* Materials Filter */}
              <div>
                <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
                  Materials
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {materials.map((material) => (
                    <label
                      key={material}
                      className="flex items-center gap-2 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      <input
                        type="checkbox"
                        checked={filters.materials.includes(material)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFilter("materials", [...filters.materials, material]);
                          } else {
                            updateFilter(
                              "materials",
                              filters.materials.filter((m) => m !== material)
                            );
                          }
                        }}
                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={priceRange[0]}
                    max={priceRange[1]}
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      updateFilter("priceRange", [
                        Number(e.target.value),
                        filters.priceRange[1],
                      ])
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min={priceRange[0]}
                    max={priceRange[1]}
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      updateFilter("priceRange", [
                        filters.priceRange[0],
                        Number(e.target.value),
                      ])
                    }
                    className="w-full"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
                  Minimum Rating: {filters.minRating} ★
                </label>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={filters.minRating}
                  onChange={(e) => updateFilter("minRating", Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0</span>
                  <span>5</span>
                </div>
              </div>

              {/* In Stock Only */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => updateFilter("inStockOnly", e.target.checked)}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    In Stock Only
                  </span>
                </label>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onFiltersChange({
                    category: [],
                    priceRange: priceRange,
                    minRating: 0,
                    inStockOnly: false,
                    brands: [],
                    colors: [],
                    materials: [],
                  });
                }}
                className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-all"
              >
                Clear All Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedFilters;
