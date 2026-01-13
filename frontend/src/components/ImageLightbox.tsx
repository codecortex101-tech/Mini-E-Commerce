import { motion, AnimatePresence } from "framer-motion";

type ImageLightboxProps = {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  alt?: string;
};

const ImageLightbox = ({ imageUrl, isOpen, onClose, alt = "Product image" }: ImageLightboxProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition z-10"
            >
              ✕
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={imageUrl}
              alt={alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
