import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/axiosInstance";
import { useNavigate } from "react-router-dom";

interface RidePopupProps {
    isOpen: boolean;
    ride: {
        _id: string;
        pickup: string;
        destination: string;
        fare: number;
        status: string;
        user: {
            fullname: {
                firstname: string;
                lastname: string;
            };
            email: string;
        };
        createdAt: string;
    };
    acceptRide: () => void;
    onClose: () => void;
}

const RidePopup: React.FC<RidePopupProps> = ({
    isOpen,
    ride,
    acceptRide,
    onClose,
}) => {
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleAccept = () => {
        acceptRide();
        setShowOtp(true);
    };

    const handleConfirm = async () => {
        if (otp) {
            try {
                const response = await axiosInstance.get(`/riding/start-ride?rideId=${ride._id}&otp=${otp}`);

                if (response.status === 200) {
                    navigate('/captain-riding', { state: { ride: ride } });
                    setShowOtp(false);
                    onClose();
                }
            } catch (error) {
                console.error("Error starting ride:", error);
            }
        }
    };

    const handleReject = () => {
        setShowOtp(false);
        onClose();
    };

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 bg-white px-4 py-5 rounded-b-2xl shadow-lg z-20"
            initial={{ y: "-100%" }}
            animate={{ y: isOpen ? "0%" : "-100%" }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
            }}
        >
            {!showOtp ? (
                <motion.div
                    className="space-y-4"
                    key="ride-details"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">New Ride Request!</h3>
                        <span className="text-sm text-gray-500">
                            {new Date(ride?.createdAt).toLocaleTimeString()}
                        </span>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-4 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xl">
                            {ride?.user?.fullname?.firstname?.[0]?.toUpperCase()}
                        </div>
                        <div>
                            <h4 className="font-medium capitalize">
                                {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
                            </h4>
                            <p className="text-sm text-gray-600">{ride?.user?.email}</p>
                        </div>
                    </div>

                    <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-6 w-6 text-green-600 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Pickup Location</p>
                                <p className="font-medium text-xs">{ride?.pickup}</p>
                            </div>
                        </div>

                        <div className="flex items-start justify-between gap-3">
                            <MapPin className="h-4 w-4 text-red-600 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Drop Location</p>
                                <p className="font-medium text-xs">{ride?.destination}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-2 bg-green-50 px-4 rounded-xl">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-green-700">₹{ride?.fare}</span>
                            <span className="text-sm text-gray-600">Estimated Fare</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={handleAccept}
                            className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Accept Ride
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Decline
                        </button>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className="space-y-4"
                    key="otp-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <h3 className="text-xl font-semibold">Verify OTP</h3>
                    <p className="text-sm text-gray-600">Enter the OTP sent to passenger</p>
                    <Input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="text-center text-lg"
                        maxLength={6}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            onClick={handleConfirm}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
                        >
                            Verify & Start
                        </Button>
                        <Button
                            onClick={handleReject}
                            variant="secondary"
                            className="w-full "
                        >
                            Cancel
                        </Button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default RidePopup;
