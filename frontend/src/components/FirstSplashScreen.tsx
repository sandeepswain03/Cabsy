import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const SplashScreen = ({ onComplete }: { onComplete?: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      clearInterval(timer);
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) {
          onComplete();
        }
      }, 1000);
      return 100;
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center z-50 max-w-[722px]  mx-auto bg-primary"
    >
      {/* Tagline */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-[48px] font-extrabold text-white font-mulish italic mb-8"
      >
        Cabsy
      </motion.p>
    </motion.div>
  );
};
