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
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handlePanelToggle = () => {
    setPanelOpen(!panelOpen);
  };

  const handleVehiclePanelClose = () => {
    setVehiclePanel(false);
  };

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
              <div className="absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-900 rounded-full" />
              <div className="space-y-4">
                <Input
                  className="bg-gray-100 px-12 py-2 text-base rounded-lg w-full focus:ring-2 focus:ring-primary"
                  onClick={() => setPanelOpen(true)}
                  type="text"
                  placeholder="Enter Pick-up Location"
                  {...register("pickupLocation")}
                />
                <Input
                  className="bg-gray-100 px-12 py-2 text-base rounded-lg w-full focus:ring-2 focus:ring-primary"
                  onClick={() => setPanelOpen(true)}
                  type="text"
                  placeholder="Enter Destination"
                  {...register("destination")}
                />
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
