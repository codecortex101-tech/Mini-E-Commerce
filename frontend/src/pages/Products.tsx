import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import ProductCardList from "../components/ProductCardList";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";
import QuickViewModal from "../components/QuickViewModal";
import SearchAutocomplete from "../components/SearchAutocomplete";
import ViewToggle from "../components/ViewToggle";
import { getProducts } from "../utils/products";
import type { Product } from "../utils/products";

type SortOption = "default" | "price-low" | "price-high" | "newest" | "rating";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [products, setProducts] = useState(getProducts());
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  useEffect(() => {
    // Load products on mount
    setProducts(getProducts());
    // Simulate API loading (backend later)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Reload products when component is focused (user might have added a product in another tab/window)
  useEffect(() => {
    const handleFocus = () => {
      setProducts(getProducts());
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // Reload products when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setProducts(getProducts());
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener("productsUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("productsUpdated", handleStorageChange);
    };
  }, []);

  // Fixed list of categories (at least 20+)
  const categories = useMemo(() => [
    "all",
    "Grocery",
    "Mobiles",
    "Fashion",
    "Electronics",
    "Clothing",
    "Accessories",
    "Home & Furniture",
    "Appliances",
    "Travel",
    "Beauty, Toys & More",
    "Two Wheelers",
    "Sports & Fitness",
    "Books & Media",
    "Health & Personal Care",
    "Automotive",
    "Pet Supplies",
    "Office Supplies",
    "Baby Products",
    "Jewelry & Watches",
    "Musical Instruments",
    "Gaming",
    "Outdoor & Camping",
    "Kitchen & Dining",
    "Tools & Hardware",
    "Other"
  ], []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = (product.rating || 0) >= minRating;
      const matchesStock = !inStockOnly || (product.stock !== undefined && product.stock > 0);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
    });

    // Sorting
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered = [...filtered].sort((a, b) => b.id - a.id);
    } else if (sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, priceRange, minRating, inStockOnly, products]);

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 min-h-screen">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
      >
        Our Products
      </motion.h2>

      {/* Search, Filter and Sort */}
      <div className="mb-8 space-y-5">
        <SearchAutocomplete 
          onProductSelect={(product) => setQuickViewProduct(product)}
          onSearchChange={(query) => setSearchQuery(query)}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 overflow-x-auto pb-2">
            <div className="flex gap-3 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl transition-all font-semibold shadow-md hover:shadow-lg whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl scale-105"
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:scale-105"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="flex gap-2">
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Minimum Rating: {minRating > 0 ? `${minRating}+ ⭐` : "Any"}
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-400"
              />
              <span className="text-sm font-semibold text-gray-700">In Stock Only</span>
            </label>
          </div>
        </div>
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <EmptyState
          title="No Products Found"
          message="Try adjusting your search or filter criteria"
          buttonText="View All Products"
          buttonLink="/dashboard"
          icon="🔍"
        />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              Showing {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-5 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-emerald-700 font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <option value="default">Sort: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ViewToggle view={viewMode} onViewChange={setViewMode} />
            </div>
          </div>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          ) : (
            <div className="w-full max-w-6xl mx-auto space-y-4 px-4">
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCardList 
                  key={product.id} 
                  product={product} 
                  index={index}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default Products;
