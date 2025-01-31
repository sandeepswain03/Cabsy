import { useContext, useState } from "react";
import { homemap } from "@/assets/map";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign } from "lucide-react";
import { CaptainContext } from "@/context/CaptainContext";
import { axiosInstance } from "@/axiosInstance";

const CaptainRiding = () => {
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const rideData = location.state?.ride;
    console.log(rideData);
    const { captain } = useContext(CaptainContext);

    const handleFinishRide = async () => {
        try {
            await axiosInstance.post("/riding/end-ride", {
                rideId: rideData._id,
                captain: captain
            });
            navigate("/captain-home");
        } catch (error) {
            console.error("Error ending ride:", error);
        }
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
                    top: showDetails ? "0%" : "auto",
                    bottom: showDetails ? "auto" : "0%",
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                }}
            >
                <motion.div
                    className="bg-white rounded-t-2xl flex flex-col"
                    animate={{
                        height: showDetails ? "60%" : "12%",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                    }}
                >
                    {!showDetails ? (
                        <div className="p-4 space-y-1">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="text-base font-semibold">Current Ride</h4>
                                    <p className="text-xs text-gray-500">In Progress</p>
                                </div>
                                <Button
                                    onClick={() => setShowDetails(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white text-sm py-1"
                                >
                                    Finish Ride
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 space-y-4 h-full flex flex-col">
                            <h3 className="text-xl font-semibold">Ride Details</h3>

                            <div className="bg-yellow-50 rounded-lg p-3 flex items-center gap-2">
                                <div className="h-10 w-10 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-lg">
                                    {rideData?.user?.fullname?.firstname?.[0]?.toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-medium capitalize text-sm">
                                        {rideData?.user?.fullname?.firstname} {rideData?.user?.fullname?.lastname}
                                    </h4>
                                    <p className="text-xs text-gray-600">{rideData?.user?.email}</p>
                                </div>
                            </div>

                            <div className="space-y-3 flex-grow">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Started At</p>
                                        <p className="text-sm font-medium">{new Date(rideData?.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Fare</p>
                                        <p className="text-sm font-medium">₹{rideData?.fare}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">Pickup</p>
                                            <p className="text-sm font-medium">{rideData?.pickup}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">Drop-off</p>
                                            <p className="text-sm font-medium">{rideData?.destination}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDetails(false)}
                                    className="text-sm flex-1"
                                >
                                    Back
                                </Button>
                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white text-sm flex-1"
                                    onClick={handleFinishRide}
                                >
                                    Complete Ride
                                </Button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CaptainRiding;
