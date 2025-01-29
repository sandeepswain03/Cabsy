import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RidePopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
}

const RidePopup: React.FC<RidePopupProps> = ({
    isOpen,
    onClose,
    onAccept,
}) => {
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");

    const handleAccept = () => {
        setShowOtp(true);
    };

    const handleConfirm = () => {
        if (otp) {
            onAccept();
            setShowOtp(false);
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
                    <h3 className="text-xl font-semibold">New Ride Available!</h3>

                    <div className="bg-yellow-100 rounded-xl p-4 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden">
                            <img
                                src="/placeholder.svg"
                                alt="Customer"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="font-medium">Harshi Pateliya</h4>
                            <p className="text-sm text-gray-600">2.2 KM</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                            <div>
                                <p className="font-medium">562/11-A</p>
                                <p className="text-sm text-gray-600">Kankariya Talab, Bhopal</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                            <div>
                                <p className="font-medium">562/11-A</p>
                                <p className="text-sm text-gray-600">Kankariya Talab, Bhopal</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold">₹193.20</span>
                            <span className="text-sm text-gray-600">Cash Cash</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={handleAccept}
                            className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Accept
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Ignore
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
                    <h3 className="text-xl font-semibold">Enter OTP</h3>
                    <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="text-center text-lg"
                        maxLength={6}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            onClick={handleConfirm}
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            Confirm
                        </Button>
                        <Button
                            onClick={handleReject}
                            variant="secondary"
                            className="w-full"
                        >
                            Reject
                        </Button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default RidePopup;
