import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

type CartDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartDropdown = ({ isOpen, onClose }: CartDropdownProps) => {
  const { cart, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate();
  const total = getTotal();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed right-4 top-20 w-96 bg-white rounded-2xl shadow-2xl z-50 border-2 border-emerald-100 max-h-[600px] overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
              <h3 className="font-bold text-lg">Shopping Cart ({cart.length})</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Link
                    to="/dashboard"
                    onClick={onClose}
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      {(item as any).image && (
                        <img
                          src={(item as any).image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-800 line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-emerald-600 font-bold">${item.price}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-lg"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-emerald-600">${total.toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="flex-1 text-center bg-emerald-100 text-emerald-700 py-2 rounded-lg hover:bg-emerald-200 transition font-semibold"
                  >
                    View Cart
                  </Link>
                  <button
                    onClick={handleCheckout}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition font-semibold"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDropdown;
