import { homemap } from "@/assets/map";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import LocationSearch from "@/components/Home/LocationSearch";
import VehicleSelect from "@/components/Home/VehicleSelect";

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handlePanelToggle = () => {
    setPanelOpen(!panelOpen);
  };

  const handleVehiclePanelClose = () => {
    setVehiclePanel(false);
  };

  const pickupLocation = watch("pickupLocation");
  const destination = watch("destination");

  return (
    <div className="h-screen relative bg-gray-50">
      <p className="absolute left-5 top-5 text-xl font-bold text-gray-900">
        Cabsy
      </p>

      <div className="h-screen w-screen overflow-hidden">
        <img
          src={homemap}
          alt="homemap"
          className="h-full w-full object-cover"
        />
      </div>

      <motion.div
        className="flex flex-col justify-end h-screen w-full absolute top-0"
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
            height: panelOpen ? "100%" : "30%",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <AnimatePresence mode="wait">
                {!panelOpen && (
                  <motion.h4
                    className="text-2xl font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Find a trip
                  </motion.h4>
                )}
                {panelOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={handlePanelToggle}
                  >
                    <ArrowDown className="w-6 h-6" />
                    <span className="text-xl font-semibold">
                      Select location
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="relative py-2">
              <div className="absolute h-12 w-0.5 top-[50%] left-[5%] -translate-y-1/2 bg-gray-900 rounded-full z-10" />
              <div className="space-y-6">
                <div className="relative flex items-center">
                  <div className="absolute left-3">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        pickupLocation
                          ? "bg-gray-900"
                          : "border-2 border-gray-900"
                      }`}
                    />
                  </div>
                  <Input
                    className="pl-10 py-3 bg-gray-50 border-gray-200 rounded-lg w-full hover:bg-gray-100 transition-colors"
                    onClick={() => setPanelOpen(true)}
                    type="text"
                    placeholder="Enter Pick-up Location"
                    {...register("pickupLocation")}
                  />
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-3">
                    <div
                      className={`h-3 w-3 rounded-sm ${
                        destination ? "bg-gray-900" : "border-2 border-gray-900"
                      }`}
                    />
                  </div>
                  <Input
                    className="pl-10 py-3 bg-gray-50 border-gray-200 rounded-lg w-full hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    onClick={() => setPanelOpen(true)}
                    type="text"
                    placeholder="Enter Destination"
                    {...register("destination")}
                  />
                </div>
              </div>
            </form>
          </div>

          {panelOpen && (
            <LocationSearch
              setVehiclePanel={setVehiclePanel}
              setPanelOpen={setPanelOpen}
            />
          )}
        </motion.div>
      </motion.div>

      <VehicleSelect isOpen={vehiclePanel} onClose={handleVehiclePanelClose} />
    </div>
  );
};

export default Home;
