import { useState } from "react";
import { homemap } from "@/assets/map";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, MapPin, Car, Clock, House } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RIDE_DETAILS = {
  driverName: "Sarthak",
  vehicleNumber: "MP04 AB 1234",
  vehicleModel: "Maruti Suzuki Alto",
  pickupAddress: "562/11-A",
  pickupLocation: "Kankariya Talab, Bhopal",
  fare: "193.20",
  arrivalTime: "9 min",
};

const PANEL_ANIMATION = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const navigate = useNavigate();

  const handlePanelToggle = () => setPanelOpen(!panelOpen);

  return (
    <div className="relative h-screen bg-gray-50">
      <header className="absolute left-5 top-5 z-10">
        <div
          className="text-xl font-bold text-gray-900 bg-white p-2 rounded-full"
          onClick={() => {
            navigate("/home");
          }}
        >
          <House />
        </div>
      </header>
      <div className="h-screen w-screen overflow-hidden">
        <img
          src={homemap}
          alt="Map view"
          className="h-full w-full object-cover"
        />
      </div>
      <motion.div
        className="absolute inset-x-0 flex flex-col justify-end h-screen"
        animate={{
          top: panelOpen ? "0%" : "auto",
          bottom: panelOpen ? "auto" : "0%",
        }}
        transition={PANEL_ANIMATION}
      >
        <motion.div
          className="bg-white rounded-t-2xl shadow-lg"
          animate={{
            height: panelOpen ? "100%" : "auto",
          }}
          transition={PANEL_ANIMATION}
        >
          <Card className="border-0 shadow-none">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <AnimatePresence mode="wait">
                  {!panelOpen ? (
                    <motion.h2
                      key="find-trip"
                      className="text-2xl font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Find a trip
                    </motion.h2>
                  ) : (
                    <motion.button
                      key="select-location"
                      className="flex items-center gap-2"
                      onClick={handlePanelToggle}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ArrowDown className="w-6 h-6" />
                      <span className="text-xl font-semibold">
                        Select location
                      </span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <Car className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {RIDE_DETAILS.driverName}
                    </h3>
                    <p className="text-gray-600">
                      {RIDE_DETAILS.vehicleNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      {RIDE_DETAILS.vehicleModel}
                    </p>
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{RIDE_DETAILS.arrivalTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{RIDE_DETAILS.pickupAddress}</p>
                    <p className="text-sm text-gray-500">
                      {RIDE_DETAILS.pickupLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="text-2xl font-semibold">
                      ₹{RIDE_DETAILS.fare}
                    </p>
                    <p className="text-sm text-gray-500">Cash Payment</p>
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl"
                  onClick={() => console.log("Payment initiated")}
                >
                  Make a Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
