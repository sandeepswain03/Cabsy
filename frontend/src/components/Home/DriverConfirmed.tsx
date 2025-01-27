import type React from "react";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DriverConfirmedProps {
  driverName: string;
  vehicleName: string;
  vehicleImage: string;
  onTrackRide: () => void;
}

const DriverConfirmed: React.FC<DriverConfirmedProps> = ({
  driverName,
  vehicleName,
  vehicleImage,
  onTrackRide,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-lg z-20"
    >
      <h3 className="text-xl font-semibold mb-4">Driver Confirmed</h3>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <UserRound className="w-10 h-10 text-gray-500" />
        </div>
        <div>
          <h4 className="font-medium text-lg">{driverName}</h4>
          <p className="text-sm text-gray-600">{vehicleName}</p>
        </div>
      </div>
      <div className="mb-4">
        <img
          src={vehicleImage || "/placeholder.svg"}
          alt={vehicleName}
          className="w-full h-32 object-contain"
        />
      </div>
      <Button onClick={onTrackRide} className="w-full text-white">
        Track Your Ride
      </Button>
    </motion.div>
  );
};

export default DriverConfirmed;
