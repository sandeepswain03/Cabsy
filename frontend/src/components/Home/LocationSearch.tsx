import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const LOCATIONS = [
  {
    id: 1,
    address: "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
  },
  {
    id: 2,
    address: "15A, Lake View Road, Crystal Plaza Mall, Bhopal",
  },
  {
    id: 3,
    address: "42C, MP Nagar Zone 1, Behind City Mall, Bhopal",
  },
  {
    id: 4,
    address: "78D, Arera Colony, Near State Bank, Bhopal",
  },
  {
    id: 5,
    address: "56E, New Market, Opposite Central Library, Bhopal",
  },
  {
    id: 6,
    address: "91F, Shahpura Lake View, Pearl Heights, Bhopal",
  },
  {
    id: 7,
    address: "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
  },
  {
    id: 8,
    address: "15A, Lake View Road, Crystal Plaza Mall, Bhopal",
  },
  {
    id: 9,
    address: "42C, MP Nagar Zone 1, Behind City Mall, Bhopal",
  },
  {
    id: 10,
    address: "78D, Arera Colony, Near State Bank, Bhopal",
  },
  {
    id: 11,
    address: "56E, New Market, Opposite Central Library, Bhopal",
  },
  {
    id: 12,
    address: "91F, Shahpura Lake View, Pearl Heights, Bhopal",
  },
];

interface LocationSearchProps {
  setVehiclePanel: (value: boolean) => void;
  setPanelOpen: (value: boolean) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ setVehiclePanel, setPanelOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto px-5"
    >
      <div className="space-y-4">
        {LOCATIONS.map((location) => (
          <motion.div
            onClick={() => {
              setVehiclePanel(true);
              setPanelOpen(false);
            }}
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-2 active:bg-gray-50 rounded-lg cursor-pointer"
          >
            <div className="bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <h4 className="text-gray-900 flex-1">{location.address}</h4>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LocationSearch;
