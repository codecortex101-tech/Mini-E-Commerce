import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import PromoCodeInput from "../components/PromoCodeInput";
import ShippingOptions, { SHIPPING_OPTIONS } from "../components/ShippingOptions";
import PaymentForm from "../components/PaymentForm";
import Confetti from "../components/Confetti";

type CheckoutFormData = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
};

type PaymentFormData = {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  paymentMethod: "card" | "paypal" | "applepay" | "googlepay";
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, getTotal } = useCart();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [shippingMethod, setShippingMethod] = useState<string>("standard");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const subtotal = getTotal();
  const shippingPrice = SHIPPING_OPTIONS.find((s) => s.id === shippingMethod)?.price || 0;
  const taxRate = 0.08; // 8% tax
  const tax = (subtotal - discount) * taxRate;
  const total = subtotal - discount + shippingPrice + tax;

  const handlePromoApply = (code: string, discountPercent: number) => {
    setPromoCode(code);
    setDiscount((subtotal * discountPercent) / 100);
  };

  const handlePromoRemove = () => {
    setPromoCode("");
    setDiscount(0);
  };

  const handlePaymentSubmit = async (paymentData: PaymentFormData) => {
    setIsLoading(true);
    
    // Simulate order placement
    setTimeout(() => {
      const order = {
        id: Date.now(),
        items: cart,
        subtotal,
        discount,
        shipping: shippingPrice,
        tax,
        total,
        shippingInfo: {
          method: shippingMethod,
          address: (document.querySelector('input[name="address"]') as HTMLInputElement)?.value || "",
        },
        payment: paymentData,
        promoCode,
        status: "pending",
        date: new Date().toISOString(),
      };

      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      clearCart();
      setIsLoading(false);
      setShowConfetti(true);
      showToast("Order placed successfully! 🎉", "success");
      
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    }, 1500);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    // This will be handled by payment form
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <EmptyState
            title="Your cart is empty"
            message="Add some products to your cart before checkout"
            buttonText="Continue Shopping"
            buttonLink="/dashboard"
            icon="🛒"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border-2 border-emerald-100 dark:border-gray-700">
              <Breadcrumbs
                items={[
                  { label: "Dashboard", path: "/dashboard" },
                  { label: "Cart", path: "/cart" },
                  { label: "Checkout" },
                ]}
              />
              <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mt-6">
                📦 Shipping Information
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("fullName", { required: "Name is required" })}
                    className={`input-primary ${
                      errors.fullName ? "border-red-500 focus:ring-red-400 focus:border-red-500" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`input-primary ${
                      errors.email ? "border-red-500 focus:ring-red-400 focus:border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    {...register("address", { required: "Address is required" })}
                    className={`input-primary ${
                      errors.address ? "border-red-500 focus:ring-red-400 focus:border-red-500" : ""
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      {...register("city", { required: "City is required" })}
                      className={`input-primary ${
                        errors.city ? "border-red-500 focus:ring-red-400 focus:border-red-500" : ""
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      {...register("zipCode", { required: "Zip code is required" })}
                      className={`input-primary ${
                        errors.zipCode ? "border-red-500 focus:ring-red-400 focus:border-red-500" : ""
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    {...register("phone", { required: "Phone is required" })}
                    className={`input-primary ${
                      errors.phone ? "border-red-500 focus:ring-red-400 focus:border-red-500" : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </form>
            </div>

            {/* Shipping Options */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border-2 border-emerald-100 dark:border-gray-700">
              <ShippingOptions selected={shippingMethod} onSelect={setShippingMethod} />
            </div>

            {/* Payment Form */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border-2 border-emerald-100 dark:border-gray-700">
              <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                💳 Payment Information
              </h2>
              <PaymentForm onSubmit={handlePaymentSubmit} isLoading={isLoading} />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit sticky top-4">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-gray-100">${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                  <span>Discount ({promoCode})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-gray-100">
                  {shippingPrice === 0 ? "FREE" : `$${shippingPrice.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="text-gray-900 dark:text-gray-100">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
              <PromoCodeInput
                onApply={handlePromoApply}
                appliedCode={promoCode}
                onRemove={handlePromoRemove}
              />
            </div>

            <div className="border-t-2 border-emerald-500 dark:border-emerald-600 pt-4">
              <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-gray-100">
                <span>Total</span>
                <span className="text-emerald-600 dark:text-emerald-400">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
