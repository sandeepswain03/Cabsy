import { useState } from "react";
import { homemap } from "@/assets/map";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign } from "lucide-react";

const CaptainRiding = () => {
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    const handleFinishRide = () => {
        navigate("/captain-home");
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
                    className="bg-white rounded-t-2xl flex flex-col shadow-lg"
                    animate={{
                        height: showDetails ? "60%" : "20%",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                    }}
                >
                    {!showDetails ? (
                        <div className="p-5 space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="text-lg font-semibold">Current Ride</h4>
                                    <p className="text-sm text-gray-500">2.2 km remaining</p>
                                </div>
                                <Button
                                    onClick={() => setShowDetails(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Finish Ride
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-5 space-y-6">
                            <h3 className="text-2xl font-semibold">Ride Details</h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="font-medium">25 mins</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Fare</p>
                                        <p className="font-medium">₹193.20</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Pickup</p>
                                            <p className="font-medium">Kankariya Talab, Bhopal</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Drop-off</p>
                                            <p className="font-medium">MP Nagar, Bhopal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDetails(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={handleFinishRide}
                                >
                                    Confirm Finish
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
