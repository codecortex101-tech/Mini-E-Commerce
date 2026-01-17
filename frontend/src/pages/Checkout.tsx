import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
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

  const [showConfetti, setShowConfetti] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("standard");

  const { register, getValues } = useForm<CheckoutFormData>();

  const subtotal = getTotal();
  const shippingPrice =
    SHIPPING_OPTIONS.find((s) => s.id === shippingMethod)?.price || 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shippingPrice + tax;

  const handlePromoApply = (code: string, percent: number) => {
    setPromoCode(code);
    setDiscount((subtotal * percent) / 100);
  };

  const handlePromoRemove = () => {
    setPromoCode("");
    setDiscount(0);
  };

  const handlePaymentSubmit = (paymentData: PaymentFormData) => {
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
        address: getValues("address"),
      },
      payment: paymentData,
      promoCode,
      date: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    clearCart();
    setShowConfetti(true);
    showToast("Order placed successfully 🎉", "success");

    setTimeout(() => navigate("/orders"), 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen p-6">
        <EmptyState
          title="Your cart is empty"
          message="Add some products before checkout"
          buttonText="Continue Shopping"
          buttonLink="/dashboard"
          icon="🛒"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <Breadcrumbs
                items={[
                  { label: "Dashboard", path: "/dashboard" },
                  { label: "Cart", path: "/cart" },
                  { label: "Checkout" },
                ]}
              />

              <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>

              <form className="space-y-4">
                <input {...register("fullName")} placeholder="Full Name" className="input-primary" />
                <input {...register("email")} placeholder="Email" className="input-primary" />
                <input {...register("address")} placeholder="Address" className="input-primary" />
                <input {...register("city")} placeholder="City" className="input-primary" />
                <input {...register("zipCode")} placeholder="Zip Code" className="input-primary" />
                <input {...register("phone")} placeholder="Phone" className="input-primary" />
              </form>
            </div>

            <ShippingOptions selected={shippingMethod} onSelect={setShippingMethod} />
            <PaymentForm onSubmit={handlePaymentSubmit} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <PromoCodeInput
              appliedCode={promoCode}
              onApply={handlePromoApply}
              onRemove={handlePromoRemove}
            />

            <div className="mt-4 font-bold text-lg">
              Total: ${total.toFixed(2)}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
