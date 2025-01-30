import type React from "react";
import { motion } from "framer-motion";
import { X, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Vehicle {
  id: number;
  name: string;
  image: string;
  capacity: number;
  eta: string;
  description: string;
  price: string;
}

interface ConfirmedVehicleProps {
  vehicle: Vehicle;
  pickup: string;
  destination: string;
  fare: {
    auto: number;
    car: number;
    motorcycle: number;
  };
  onClose: () => void;
  onConfirmRide: () => void;
}

const ConfirmedVehicle: React.FC<ConfirmedVehicleProps> = ({
  vehicle,
  fare,
  pickup,
  destination,
  onClose,
  onConfirmRide,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-lg z-20"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Confirm Your Ride</h3>
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={vehicle.image || "/placeholder.svg"}
          alt={vehicle.name}
          className="w-16 h-16 object-contain"
        />
        <div>
          <h4 className="font-medium text-lg">{vehicle.name}</h4>
          <p className="flex flex-center items-center gap-1">
            <UserRound className="w-4 h-4 mr-1" />
            <p className="text-sm text-gray-600">{vehicle.capacity}</p>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Pickup</p>
          <p className="font-medium">{pickup}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Destination</p>
          <p className="font-medium">{destination}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Price</p>
          <p className="font-medium">₹{fare[vehicle.type]}</p>
        </div>
      </div>
      <Button onClick={onConfirmRide} className="w-full text-white">
        Confirm Ride
      </Button>
    </motion.div>
  );
};

export default ConfirmedVehicle;
