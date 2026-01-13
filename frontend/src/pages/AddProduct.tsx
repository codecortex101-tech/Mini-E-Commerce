import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToast } from "../context/ToastContext";
import { addProduct, getProductById, updateProduct } from "../utils/products";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

type AddProductFormData = {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  rating?: number;
  reviewCount?: number;
};

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const isEditMode = !!id;
  const productId = id ? Number(id) : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AddProductFormData>({
    defaultValues: {
      category: "Electronics",
      stock: 0,
      rating: 0,
      reviewCount: 0,
    },
  });

  // Load product data if editing
  useEffect(() => {
    if (isEditMode && productId) {
      const product = getProductById(productId);
      if (product) {
        setValue("name", product.name);
        setValue("price", product.price);
        setValue("description", product.description || "");
        setValue("category", product.category || "Electronics");
        setValue("stock", product.stock || 0);
        setValue("rating", product.rating || 0);
        setValue("reviewCount", product.reviewCount || 0);
        if (product.image) {
          setImagePreview(product.image);
        }
      } else {
        showToast("Product not found", "error");
        navigate("/products");
      }
    }
  }, [isEditMode, productId, setValue, navigate, showToast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast("Image size should be less than 5MB", "error");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        showToast("Please select a valid image file", "error");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: AddProductFormData) => {
    setIsLoading(true);

    try {
      // Convert image to base64 for localStorage
      let imageBase64 = null;
      if (imageFile) {
        const reader = new FileReader();
        imageBase64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      }

      // Create product object
      const productData = {
        ...data,
        image: imageBase64 || (isEditMode && imagePreview ? imagePreview : undefined),
      };

      if (isEditMode && productId) {
        // Update existing product
        updateProduct(productId, productData);
        showToast("Product updated successfully!", "success");
      } else {
        // Add new product
        addProduct(productData);
        showToast("Product added successfully!", "success");
      }
      
      // Reset form
      reset();
      setImagePreview(null);
      setImageFile(null);

      // Trigger products update event
      window.dispatchEvent(new Event("productsUpdated"));

      // Redirect to products page after 1 second
      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (error) {
      showToast("Failed to add product. Please try again.", "error");
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white p-4 md:p-6 flex flex-col">
      <div className="max-w-3xl mx-auto flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border-2 border-emerald-100"
        >
          <Breadcrumbs
            items={[
              { label: "Dashboard", path: "/dashboard" },
              { label: isEditMode ? "Edit Product" : "Add Product" },
            ]}
          />

          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 mt-4 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                {...register("name", {
                  required: "Product name is required",
                  minLength: {
                    value: 2,
                    message: "Product name must be at least 2 characters",
                  },
                })}
                className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:border-emerald-400 bg-emerald-50/50 shadow-sm ${
                  errors.name ? "border-red-500" : "border-emerald-200"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0.01, message: "Price must be greater than 0" },
                  })}
                  className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:border-emerald-400 bg-emerald-50/50 shadow-sm ${
                    errors.price ? "border-red-500" : "border-emerald-200"
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register("stock", {
                    required: "Stock quantity is required",
                    min: { value: 0, message: "Stock cannot be negative" },
                    valueAsNumber: true,
                  })}
                  className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:border-emerald-400 bg-emerald-50/50 shadow-sm ${
                    errors.stock ? "border-red-500" : "border-emerald-200"
                  }`}
                />
                {errors.stock && (
                  <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register("category", {
                  required: "Category is required",
                })}
                className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:border-emerald-400 bg-emerald-50/50 shadow-sm ${
                  errors.category ? "border-red-500" : "border-emerald-200"
                }`}
              >
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Enter product description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
                className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:border-emerald-400 bg-emerald-50/50 shadow-sm resize-none ${
                  errors.description ? "border-red-500" : "border-emerald-200"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Rating and Review Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="0.0"
                  {...register("rating", {
                    min: { value: 0, message: "Rating cannot be negative" },
                    max: { value: 5, message: "Rating cannot exceed 5" },
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-2.5 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:border-emerald-400 bg-emerald-50/50 shadow-sm"
                />
                {errors.rating && (
                  <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Review Count
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register("reviewCount", {
                    min: { value: 0, message: "Review count cannot be negative" },
                    valueAsNumber: true,
                  })}
                  className="w-full px-4 py-2.5 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:border-emerald-400 bg-emerald-50/50 shadow-sm"
                />
                {errors.reviewCount && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.reviewCount.message}
                  </p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Product Image
              </label>
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2.5 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:border-emerald-400 bg-emerald-50/50 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 cursor-pointer"
                />
                {imagePreview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-3"
                  >
                    <p className="text-sm text-emerald-700 mb-2">Preview:</p>
                    <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-emerald-200">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImageFile(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all text-sm font-semibold shadow-lg"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
              {isEditMode && imagePreview && !imageFile && (
                <p className="text-xs text-emerald-600 mt-1 font-medium">
                  Current image will be kept. Upload a new image to replace it.
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Upload a product image (Max size: 5MB, Supported formats: JPG, PNG, GIF)
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate("/products")}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                {isLoading ? <LoadingSpinner size="sm" /> : isEditMode ? "Update Product" : "Add Product"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
