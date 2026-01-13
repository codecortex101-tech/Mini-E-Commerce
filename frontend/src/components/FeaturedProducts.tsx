import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../utils/products";
import type { Product } from "../utils/products";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products = getProducts();
    // Get products with highest ratings and reviews
    const featured = products
      .filter((p) => (p.rating || 0) >= 4.5 && (p.reviewCount || 0) > 0)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 8);
    setFeaturedProducts(featured);
  }, []);

  if (featuredProducts.length === 0) return null;

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          ⭐ Featured Products
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
