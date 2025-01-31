import { createContext, ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance, setupAxiosInterceptors } from "../axiosInstance";

interface Captain {
  _id?: string;
  fullname?: {
    firstname: string;
    lastname: string;
  };
  email?: string;
  vehicle?: {
    color: string;
    plate: string;
    capacity: number;
    vehicleType: string;
  };
}

interface CaptainContextType {
  captain: Captain | null;
  setCaptain: (captain: Captain | null) => void;
  isLoading: boolean;
}

const CaptainContext = createContext<CaptainContextType>({
  captain: null,
  setCaptain: () => {},
  isLoading: false,
});

const CaptainContextProvider = ({ children }: { children: ReactNode }) => {
  const [captain, setCaptain] = useState<Captain | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCurrentCaptain = async () => {
    try {
      const response = await axiosInstance.get("/captain/captainprofile");
      setCaptain(response.data.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutCallback = () => {
    setCaptain(null);
    navigate("/captain-sign-in");
  };

  useEffect(() => {
    setupAxiosInterceptors(logoutCallback);
    fetchCurrentCaptain();
  }, []);

  return (
    <CaptainContext.Provider value={{ captain, setCaptain, isLoading }}>
      {children}
    </CaptainContext.Provider>
  );
};

export { CaptainContext, CaptainContextProvider };
