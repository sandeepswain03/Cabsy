import type React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { car, auto, bike } from "@/assets/rides";

interface RideType {
  captain: {
    fullname: {
      firstname: string;
      lastname: string;
    };
    vehicle: {
      color: string;
      plate: string;
      vehicleType: string;
    };
  };
  otp: string;
  pickup: string;
  destination: string;
  fare: number;
}

interface DriverConfirmedProps {
  driverName: string;
  vehicleName: string;
  vehicleImage: string;
  ride: RideType;
  onTrackRide: () => void;
}

const DriverConfirmed: React.FC<DriverConfirmedProps> = ({
  onTrackRide,
  ride,
}) => {
  const driverName = `${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname}`;
  const vehicle = ride.captain.vehicle;

  const getVehicleImage = (type: string) => {
    switch (type.toLowerCase()) {
      case 'car':
        return car;
      case 'auto':
        return auto;
      case 'bike':
        return bike;
      default:
        return car;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-lg z-20"
    >
      <h3 className="text-xl font-semibold mb-4">Driver Confirmed</h3>

      <div className="flex items-center space-x-4 mb-4">
        <img
          src={getVehicleImage(vehicle.vehicleType)}
          alt={vehicle.vehicleType}
          className="w-16 h-16 object-contain"
        />
        <div className="flex-1">
          <h4 className="font-medium text-lg capitalize">{driverName}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="capitalize">{vehicle.vehicleType} • {vehicle.color}</span>
          </div>
          <p className="text-sm text-gray-600">{vehicle.plate}</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded-lg">
          <p className="text-sm font-semibold">OTP</p>
          <p className="text-xl font-bold text-yellow-800">{ride.otp}</p>
        </div>
      </div>

      <div className="space-y-2 bg-gray-50 p-3 rounded-lg mb-4">
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 text-green-600 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Pickup</p>
            <p className="text-sm font-medium">{ride.pickup}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 text-red-600 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Destination</p>
            <p className="text-sm font-medium">{ride.destination}</p>
          </div>
        </div>
      </div>

      <Button onClick={onTrackRide} className="w-full text-white">
        Track Your Ride
      </Button>
    </motion.div>
  );
};

export default DriverConfirmed;
