import type React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";

interface LookingForDriverProps {
  onClose: () => void;
  onDriverFound: () => void;
}

const LookingForDriver: React.FC<LookingForDriverProps> = ({
  onClose,
  onDriverFound,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDriverFound();
    }, 5000); // Simulate finding a driver after 5 seconds

    return () => clearTimeout(timer);
  }, [onDriverFound]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-lg z-10"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Looking for a Driver</h3>
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-lg text-center">
          Searching for available drivers...
        </p>
        <p className="text-sm text-gray-500">This may take a few moments</p>
      </div>
    </motion.div>
  );
};

export default LookingForDriver;
