import { useContext, useState } from "react";
import { homemap } from "@/assets/map";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Car, House } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "@/context/SocketContext";

const PANEL_ANIMATION = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

const Riding = () => {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rideData = location.state?.ride;
  console.log(rideData);

  const { socket } = useContext(SocketContext);

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return (
    <div className="relative h-screen bg-gray-50">
      <header className="absolute left-5 top-5 z-8">
        <div
          className="text-xl font-bold text-gray-900 bg-white p-2 rounded-full cursor-pointer"
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
          top: showPaymentDetails ? "0%" : "auto",
          bottom: showPaymentDetails ? "auto" : "0%",
        }}
        transition={PANEL_ANIMATION}
      >
        <motion.div
          className="bg-white rounded-t-2xl shadow-lg"
          animate={{
            height: showPaymentDetails ? "70%" : "22%",
          }}
          transition={PANEL_ANIMATION}
        >
          <Card className="border-0 shadow-none h-full">
            <CardContent className="p-5 h-full">
              {!showPaymentDetails ? (
                // Compact View
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <Car className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {rideData?.captain?.fullname?.firstname} {rideData?.captain?.fullname?.lastname}
                      </h3>
                      <p className="text-gray-600">{rideData?.captain?.vehicle?.plate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold">₹{rideData?.fare}</p>
                      <p className="text-sm text-gray-500">Cash Payment</p>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl"
                    onClick={() => setShowPaymentDetails(true)}
                  >
                    Make a Payment
                  </Button>
                </div>
              ) : (
                // Expanded View
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <h2 className="text-2xl font-semibold ml-2">Payment Details</h2>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowPaymentDetails(false)}
                      className="px-4"
                    >
                      View Map
                    </Button>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-100 rounded-xl">
                        <Car className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">
                          {rideData?.captain?.fullname?.firstname} {rideData?.captain?.fullname?.lastname}
                        </h3>
                        <p className="text-gray-600">{rideData?.captain?.vehicle?.plate}</p>
                        <p className="text-sm text-gray-500">
                          {rideData?.captain?.vehicle?.vehicleType} • {rideData?.captain?.vehicle?.color}
                        </p>
                      </div>
                      <div className="bg-gray-100 px-3 py-1 rounded-full">
                        <p className="text-sm">OTP: {rideData?.otp}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">Pickup</p>
                          <p className="text-sm text-gray-500">{rideData?.pickup}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">Destination</p>
                          <p className="text-sm text-gray-500">{rideData?.destination}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Ride Fare</span>
                        <span>₹{rideData?.fare}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl mt-4"
                      onClick={() => console.log("Payment confirmed")}
                    >
                      Confirm Payment
                    </Button>
                  </div>


                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Riding;
