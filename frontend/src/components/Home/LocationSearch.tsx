import React from "react";
import { motion } from "framer-motion";
import { MapPin, Loader2 } from "lucide-react";

interface LocationSearchProps {
  suggestions: {
    description: string;
  };
  setPanelOpen: (value: boolean) => void;
  setVehiclePanel: (value: boolean) => void;
  setPickup: (value: string) => void;
  setDestination: (value: string) => void;
  activeField: 'pickup' | 'destination' | null;
  isLoading: boolean;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  suggestions,
  setPickup,
  setDestination,
  activeField,
  isLoading
}) => {
  const handleSuggestionClick = (suggestion: string) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
    } else if (activeField === 'destination') {
      setDestination(suggestion);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto px-5"
    >
      {isLoading ? (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      ) : suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((location, index) => (
            <motion.div
              onClick={() => handleSuggestionClick(location.description)}
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 active:bg-gray-100 rounded-lg cursor-pointer"
            >
              <div className="bg-gray-100 h-8 w-8 flex items-center justify-center rounded-full">
                <MapPin className="w-4 h-4 text-gray-900" />
              </div>
              <h4 className="text-gray-900 flex-1">{location.description}</h4>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          {activeField && 'Type at least 3 characters to see suggestions'}
        </div>
      )}
    </motion.div>
  );
};

export default LocationSearch;