import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SplashScreen as FirstSplashScreen } from "@/components/FirstSplashScreen";
import { AnimatePresence } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  const handleSplashComplete = () => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <AnimatePresence mode="wait">
      <FirstSplashScreen onComplete={handleSplashComplete} />
    </AnimatePresence>
  );
};

export default Index;
