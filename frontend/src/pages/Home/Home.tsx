import { useState, useEffect } from "react";
import { homemap } from "@/assets/map";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LocationSearch from "@/components/Home/LocationSearch";
import VehicleSelect from "@/components/Home/VehicleSelect";
import ConfirmedVehicle from "@/components/Home/ConfirmedVehicle";
import LookingForDriver from "@/components/Home/LookingForDriver";
import DriverConfirmed from "@/components/Home/DriverConfirmed";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/axiosInstance";

interface FormInputs {
  pickupLocation: string;
  destination: string;
}

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [driverConfirmed, setDriverConfirmed] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([]);
  const [activeField, setActiveField] = useState<'pickup' | 'destination' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fare, setFare] = useState({});

  const { watch, setValue } = useForm<FormInputs>();
  const navigate = useNavigate();

  const pickupLocation = watch("pickupLocation");
  const destination = watch("destination");

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!activeField) return;

      const input = activeField === 'pickup' ? pickupLocation : destination;
      if (!input || input.length < 3) {
        if (activeField === 'pickup') {
          setPickupSuggestions([]);
        } else {
          setDestinationSuggestions([]);
        }
        return;
      }

      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/map/get-suggestions?input=${encodeURIComponent(input)}`, {
        });

        const data = response.data.data;
        if (activeField === 'pickup') {
          setPickupSuggestions(data);
        } else {
          setDestinationSuggestions(data);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [pickupLocation, destination, activeField]);

  const findTrip = async () => {
    if (pickupLocation && destination) {
      setPanelOpen(false);
      setVehiclePanel(true);
    }

    const response = await axiosInstance.get(`/riding/get-fare?pickup=${pickupLocation}&destination=${destination}`);
    setFare(response.data.data);
  };

  const createRide = async () => {
    const response = await axiosInstance.post(`/riding/create`, {
      pickup: pickupLocation,
      destination: destination,
      vehicleType: selectedVehicle?.type
    });
    console.log(response.data.data);
  }

  return (
    <div className="h-screen relative bg-gray-50">
      <p className="absolute left-5 top-5 text-xl font-bold text-gray-900">
        Cabsy
      </p>

      <div className="h-screen w-screen overflow-hidden">
        <img
          src={homemap}
          alt="map"
          className="h-full w-full object-cover"
        />
      </div>

      <motion.div
        className="flex flex-col justify-end h-screen w-full absolute top-0"
        initial={false}
        animate={{
          top: panelOpen ? "0%" : "auto",
          bottom: panelOpen ? "auto" : "0%",
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <motion.div
          className="bg-white rounded-t-2xl flex flex-col shadow-lg"
          animate={{
            height: panelOpen ? "100%" : "auto",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          <div className="p-5">
            {panelOpen && (
              <div
                className="flex items-center gap-2 cursor-pointer mb-4"
                onClick={() => {
                  setPanelOpen(false);
                  setActiveField(null);
                }}
              >
                <ArrowDown className="w-6 h-6" />
                <span className="text-xl font-semibold">Back</span>
              </div>
            )}

            <div className="relative py-2">
              <div className="absolute h-12 w-0.5 top-[33%] left-[5%] -translate-y-1/2 bg-gray-900 rounded-full z-10" />
              <div className="space-y-6">
                <div className="relative flex items-center">
                  <div className="absolute left-3">
                    <div
                      className={`h-3 w-3 rounded-full ${pickupLocation
                        ? "bg-gray-900"
                        : "border-2 border-gray-900"
                        }`}
                    />
                  </div>
                  <Input
                    className="pl-10 py-3 bg-gray-50 border-gray-200 rounded-lg w-full hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setPanelOpen(true);
                      setActiveField('pickup');
                    }}
                    value={pickupLocation}
                    onChange={(e) => setValue("pickupLocation", e.target.value)}
                    type="text"
                    placeholder="Enter Pick-up Location"
                  />
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-3">
                    <div
                      className={`h-3 w-3 rounded-sm ${destination ? "bg-gray-900" : "border-2 border-gray-900"
                        }`}
                    />
                  </div>
                  <Input
                    className="pl-10 py-3 bg-gray-50 border-gray-200 rounded-lg w-full hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setPanelOpen(true);
                      setActiveField('destination');
                    }}
                    value={destination}
                    onChange={(e) => setValue("destination", e.target.value)}
                    type="text"
                    placeholder="Enter Destination"
                  />
                </div>
                <Button
                  onClick={findTrip}
                  type="button"
                  className="w-full bg-black text-white hover:bg-gray-800"
                  disabled={!pickupLocation || !destination}
                >
                  Find Trip
                </Button>
              </div>
            </div>
          </div>

          {panelOpen && (
            <LocationSearch
              isLoading={isLoading}
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              activeField={activeField}
              setPickup={(value: string) => {
                setValue("pickupLocation", value);
              }}
              setDestination={(value: string) => {
                setValue("destination", value);
              }}
            />
          )}
        </motion.div>
      </motion.div>

      <VehicleSelect
        fare={fare}
        isOpen={vehiclePanel}
        onClose={() => setVehiclePanel(false)}
        onSelectVehicle={setSelectedVehicle}
      />

      <AnimatePresence>
        {selectedVehicle && (
          <ConfirmedVehicle
            pickup={pickupLocation}
            destination={destination}
            fare={fare}
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
            onConfirmRide={() => {
              setSelectedVehicle(null);
              setLookingForDriver(true);
              createRide();
            }}
          />
        )}
        {lookingForDriver && (
          <LookingForDriver
            onClose={() => setLookingForDriver(false)}
            onDriverFound={() => {
              setLookingForDriver(false);
              setDriverConfirmed(true);
            }}
          />
        )}
        {driverConfirmed && (
          <DriverConfirmed
            driverName="John Doe"
            vehicleName={selectedVehicle?.name || "car"}
            vehicleImage={selectedVehicle?.image || "/placeholder.svg"}
            onTrackRide={() => navigate("/riding")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;