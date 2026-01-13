import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { getProductById } from "../utils/products";
import type { Product } from "../utils/products";

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const recentIds = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const products = recentIds
      .map((id: number) => getProductById(id))
      .filter((p: Product | undefined): p is Product => p !== undefined)
      .slice(0, 8);
    setRecentProducts(products);
  }, []);

  if (recentProducts.length === 0) return null;

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Recently Viewed
        </h2>
        <Link
          to="/products"
          className="text-emerald-600 hover:text-emerald-700 font-semibold transition"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
