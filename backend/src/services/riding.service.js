import apiError from "../utils/apiError.js";
import { Ride } from "../models/ride.modal.js";
import { getDistance } from "./map.service.js";

const getOtp = async (length) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length);
    const otp = Math.floor(Math.random() * (max - min) + min).toString();
    return otp;
};

const getFareService = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new apiError(400, "All fields are required");
    }

    const distanceTime = await getDistance(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    const fare = {
        auto: Math.round(
            baseFare.auto +
                (distanceTime.distance.value / 1000) * perKmRate.auto +
                (distanceTime.duration.value / 60) * perMinuteRate.auto
        ),
        car: Math.round(
            baseFare.car +
                (distanceTime.distance.value / 1000) * perKmRate.car +
                (distanceTime.duration.value / 60) * perMinuteRate.car
        ),
        motorcycle: Math.round(
            baseFare.motorcycle +
                (distanceTime.distance.value / 1000) * perKmRate.motorcycle +
                (distanceTime.duration.value / 60) * perMinuteRate.motorcycle
        )
    };

    return fare;
};

const createRideService = async ({
    user,
    pickup,
    destination,
    vehicleType
}) => {
    const fare = await getFare(pickup, destination);
    const otp = await getOtp(6);
    const ride = Ride.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp
    });
    return ride;
};

const confirmRideService = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new apiError(400, "Invalid ride id");
    }

    await Ride.findByIdAndUpdate(
        { _id: rideId },
        { status: "accepted", captain: captain._id }
    );

    const ride = await Ride.findOne({ _id: rideId })
        .populate("user")
        .populate("captain")
        .select("+otp");

    if (!ride) {
        throw new apiError(400, "Ride not found");
    }

    return ride;
};

const startRideService = async ({ rideId, otp, captain }) => {
    if (!rideId) {
        throw new apiError(400, "Invalid ride id");
    }

    if (!otp) {
        throw new apiError(400, "Invalid OTP");
    }

    const ride = await Ride.findOne({ _id: rideId })
        .populate("user")
        .populate("captain")
        .select("+otp");

    if (!ride) {
        throw new apiError(400, "Ride not found");
    }

    if (ride.status !== "accepted") {
        throw new apiError(400, "Ride is not accepted");
    }

    if (ride.otp !== otp) {
        throw new apiError(400, "OTP is not valid");
    }

    await Ride.findByIdAndUpdate(
        {
            _id: rideId
        },
        {
            status: "ongoing"
        }
    );

    return ride;
};

const endRideService = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new apiError(400, "Invalid ride id");
    }

    const ride = await Ride.findOne({ _id: rideId, captain: captain._id })
        .populate("user")
        .populate("captain")
        .select("+otp");

    if (!ride) {
        throw new apiError(400, "Ride not found");
    }

    if (ride.status !== "ongoing") {
        throw new apiError(400, "Ride is not ongoing");
    }

    await Ride.findByIdAndUpdate(
        {
            _id: rideId
        },
        {
            status: "completed"
        }
    );

    return ride;
};

export {
    createRideService,
    getFareService,
    confirmRideService,
    startRideService,
    endRideService
};
