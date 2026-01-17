import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export type PaymentFormData = {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  paymentMethod: "card" | "paypal" | "applepay" | "googlepay";
};

type PaymentFormProps = {
  onSubmit: (data: PaymentFormData) => void;
};

const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
  const { register, handleSubmit, setValue } = useForm<PaymentFormData>({
    defaultValues: { paymentMethod: "card" },
  });

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("cardNumber")}
        onChange={(e) => setValue("cardNumber", formatCard(e.target.value))}
        placeholder="1234 5678 9012 3456"
        className="input-primary"
      />

      <input {...register("cardName")} placeholder="Cardholder Name" className="input-primary" />

      <div className="grid grid-cols-2 gap-3">
        <input {...register("expiryDate")} placeholder="MM/YY" className="input-primary" />
        <input {...register("cvv")} placeholder="CVV" className="input-primary" />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        className="w-full bg-emerald-500 text-white py-2 rounded"
      >
        Pay Now
      </motion.button>
    </form>
  );
};

export default PaymentForm;
