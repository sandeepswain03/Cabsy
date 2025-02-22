import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SplashScreen as FirstSplashScreen } from "@/components/FirstSplashScreen";
import { AnimatePresence } from "framer-motion";
import { UserContext } from "@/context/UserContext";
import { CaptainContext } from "@/context/CaptainContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { captain } = useContext(CaptainContext);
  console.log(user, captain);

  const handleSplashComplete = () => {
    if (user) {
      navigate("/home");
    }
    else if (captain) {
      navigate("/captain-home");
    }
    else {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    return () => { };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <FirstSplashScreen onComplete={handleSplashComplete} />
    </AnimatePresence>
  );
};

export default Index;
