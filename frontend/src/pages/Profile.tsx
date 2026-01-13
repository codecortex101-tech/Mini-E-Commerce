import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";

type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      address: "123 Main St",
      city: "New York",
      zipCode: "10001",
    },
  });

  const onSubmit = async (_data: ProfileFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      showToast("Profile updated successfully!", "success");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-emerald-100"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-4 py-2 rounded-xl transition-all font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
            >
              ← Back
            </motion.button>
          </div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              👤 My Profile
            </h2>
            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                ✏️ Edit Profile
              </motion.button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.name ? "border-red-500" : "border-green-200"
                } ${!isEditing ? "bg-green-50" : ""}`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Email
              </label>
              <input
                type="email"
                disabled={!isEditing}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.email ? "border-red-500" : "border-green-200"
                } ${!isEditing ? "bg-green-50" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                disabled={!isEditing}
                {...register("phone", { required: "Phone is required" })}
                className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.phone ? "border-red-500" : "border-green-200"
                } ${!isEditing ? "bg-green-50" : ""}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Address
              </label>
              <input
                type="text"
                disabled={!isEditing}
                {...register("address", { required: "Address is required" })}
                className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.address ? "border-red-500" : "border-green-200"
                } ${!isEditing ? "bg-green-50" : ""}`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                      <label className="block text-sm font-medium text-green-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        {...register("city", { required: "City is required" })}
                        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                          errors.city ? "border-red-500" : "border-green-200"
                        } ${!isEditing ? "bg-green-50" : ""}`}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                )}
              </div>

              <div>
                      <label className="block text-sm font-medium text-green-700 mb-1">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        {...register("zipCode", { required: "Zip code is required" })}
                        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                          errors.zipCode ? "border-red-500" : "border-green-200"
                        } ${!isEditing ? "bg-green-50" : ""}`}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
                >
                  {isLoading ? <LoadingSpinner size="sm" /> : "💾 Save Changes"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-emerald-100 text-emerald-700 py-4 rounded-2xl hover:bg-emerald-200 transition-all font-semibold text-lg"
                >
                  Cancel
                </motion.button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
