import { useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainContext } from "@/context/CaptainContext";

interface AuthLayoutProps {
  children: ReactNode;
  authentication: boolean;
}

function AuthLayout({ children, authentication }: AuthLayoutProps) {
  const { captain, isLoading } = useContext(CaptainContext);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (authentication && !captain) {
    navigate("/captain-sign-in");
    return null;
  } else if (!authentication && captain) {
    navigate("/home");
    return null;
  }

  return children;
}

export default AuthLayout;
