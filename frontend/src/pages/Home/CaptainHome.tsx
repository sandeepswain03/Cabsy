import { homemap } from "@/assets/map";
import { motion } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import RidePopup from "@/components/Home/RidePopup";
import { useNavigate } from "react-router-dom";
import { CaptainContext } from "@/context/CaptainContext";
import { SocketContext } from "@/context/SocketContext";

const CaptainHome = () => {
  const [earnings, setEarnings] = useState(295.20);
  const [hoursOnline, setHoursOnline] = useState(10.2);
  const [showRidePopup, setShowRidePopup] = useState(true);

  const navigate = useNavigate();

  const { captain } = useContext(CaptainContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (captain) {
      socket.emit("join", {
        userId: captain._id,
        userType: "captain"
      });

      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            socket.emit("update-location-captain", {
              userId: captain._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude
              }
             
            });
          });

        }
      }
      setInterval(updateLocation, 10000)
      updateLocation();
    }
  }, [captain]);

  const handleCloseRidePopup = () => {
    setShowRidePopup(false);
  };

  const handleAcceptRide = () => {
    setShowRidePopup(false);
    navigate("/captain-riding");
  };

  return (
    <div className="h-screen relative bg-gray-50">
      <p className="absolute left-5 top-5 text-xl font-bold text-gray-900">
        Cabsy Driver
      </p>

      <div className="h-screen w-screen overflow-hidden">
        <img
          src={homemap || "/placeholder.svg"}
          alt="homemap"
          className="h-full w-full object-cover"
        />
      </div>

      <motion.div
        className="flex flex-col justify-end h-screen w-full absolute top-0"
        animate={{
          bottom: "0%",
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
            height: "30%",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          <div className="p-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-200" />
              <div>
                <h4 className="text-xl font-semibold">{captain?.fullname?.firstname} {captain?.fullname?.lastname}</h4>
                <p className="text-gray-600">₹{earnings} Earned</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-lg font-semibold">{hoursOnline}</span>
                <span className="text-sm text-gray-600">Hours Online</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-lg font-semibold">{hoursOnline}</span>
                <span className="text-sm text-gray-600">Hours Online</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-lg font-semibold">{hoursOnline}</span>
                <span className="text-sm text-gray-600">Hours Online</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <RidePopup
        isOpen={showRidePopup}
        onClose={handleCloseRidePopup}
        onAccept={handleAcceptRide}
      />
    </div>
  );
};

export default CaptainHome;
