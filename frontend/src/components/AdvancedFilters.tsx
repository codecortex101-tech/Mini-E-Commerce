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
};

const AdvancedFilters = ({
  filters,
  onFiltersChange,
  availableBrands = [],
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

  const materials = [
    "Cotton",
    "Polyester",
    "Leather",
    "Wool",
    "Silk",
    "Denim",
    "Linen",
    "Synthetic",
  ];

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
              {/* Brands */}
              {availableBrands.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
                    Brands
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableBrands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={(e) =>
                            updateFilter(
                              "brands",
                              e.target.checked
                                ? [...filters.brands, brand]
                                : filters.brands.filter((b) => b !== brand)
                            )
                          }
                        />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              <div>
                <label className="block text-sm font-semibold mb-3">Colors</label>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <motion.button
                      key={color.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        updateFilter(
                          "colors",
                          filters.colors.includes(color.name)
                            ? filters.colors.filter((c) => c !== color.name)
                            : [...filters.colors, color.name]
                        )
                      }
                      className="w-10 h-10 rounded-full border-4"
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Materials
                </label>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <label key={material} className="flex gap-2">
                      <input
                        type="checkbox"
                        checked={filters.materials.includes(material)}
                        onChange={(e) =>
                          updateFilter(
                            "materials",
                            e.target.checked
                              ? [...filters.materials, material]
                              : filters.materials.filter((m) => m !== material)
                          )
                        }
                      />
                      <span>{material}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedFilters;
