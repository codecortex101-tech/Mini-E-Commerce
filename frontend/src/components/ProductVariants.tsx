import { motion } from "framer-motion";

type VariantOption = {
  id: string;
  label: string;
  value: string;
  available?: boolean;
};

type Props = {
  variants: {
    size?: VariantOption[];
    color?: VariantOption[];
  };
  selectedSize?: string;
  selectedColor?: string;
  onSizeChange?: (s: string) => void;
  onColorChange?: (c: string) => void;
};

const ProductVariants = ({
  variants,
  selectedSize,
  onSizeChange,
  onColorChange,
}: Props) => (
  <div className="space-y-4">
    {variants.size?.map((s) => (
      <motion.button
        key={s.id}
        onClick={() => onSizeChange?.(s.value)}
        className={selectedSize === s.value ? "bg-emerald-500" : ""}
      >
        {s.label}
      </motion.button>
    ))}

    {variants.color?.map((c) => (
      <motion.button
        key={c.id}
        onClick={() => onColorChange?.(c.value)}
        style={{ backgroundColor: c.value }}
        className="w-10 h-10 rounded-full"
      />
    ))}
  </div>
);

export default ProductVariants;
