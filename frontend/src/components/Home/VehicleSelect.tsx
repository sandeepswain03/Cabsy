import { car, bike, auto } from "@/assets/rides";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, UserRound } from "lucide-react";

const VEHICLES = [
  {
    id: 1,
    name: "UberGo",
    image: car,
    capacity: 4,
    eta: "2 mins away",
    description: "Affordable, compact rides",
    type: "car"
  },
  {
    id: 2,
    name: "Moto",
    image: bike,
    capacity: 1,
    eta: "3 mins away",
    description: "Affordable motorcycle rides",
    type: "motorcycle"
  },
  {
    id: 3,
    name: "UberAuto",
    image: auto,
    capacity: 3,
    eta: "3 mins away",
    description: "Affordable Auto rides",
    type: "auto"
  },
];

interface VehicleSelectProps {
  isOpen: boolean;
  fare: {
    auto: number;
    car: number;
    motorcycle: number;
  };
  onClose: () => void;
  onSelectVehicle: (vehicle: (typeof VEHICLES)[0]) => void;
}

const VehicleSelect: React.FC<VehicleSelectProps> = ({
  isOpen,
  fare,
  onClose,
  onSelectVehicle,
}) => {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white px-3 py-6 rounded-t-2xl shadow-lg z-20"
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <div className="relative">
        <button
          className="absolute -top-8 left-1/2 -translate-x-1/2 p-2 hover:bg-gray-50 rounded-full transition-colors"
          onClick={onClose}
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </button>

        <h3 className="text-2xl font-semibold mb-6 mt-3">Choose a Vehicle</h3>

        <div className="space-y-3">
          <AnimatePresence>
            {VEHICLES.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex border-2 hover:border-black transition-colors rounded-xl p-3 items-center justify-between cursor-pointer"
                onClick={() => {
                  onSelectVehicle(vehicle);
                  onClose();
                }}
              >
                <img
                  className="h-12 w-12 object-contain"
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                />

                <div className="flex-1 mx-4">
                  <div className="flex items-center gap-1">
                    <h4 className="font-medium text-base">{vehicle.name}</h4>
                    <UserRound className="h-3 w-3" />
                    <span className="text-xs text-gray-900">
                      {vehicle.capacity}
                    </span>
                  </div>
                  <h5 className="font-medium text-sm text-primary">
                    {vehicle.eta}
                  </h5>
                  <p className="text-xs text-gray-600">{vehicle.description}</p>
                </div>

                <div className="text-lg font-semibold">₹{fare[vehicle.type]}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleSelect;
