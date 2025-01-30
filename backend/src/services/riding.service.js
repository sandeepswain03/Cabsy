import apiError from "../utils/apiError.js";
import { Ride } from "../models/ride.modal.js";
import { getDistanceTime } from "./map.service.js";
import { bcrypt } from "bcrypt";
import { crypto } from "crypto";

const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new apiError(400, "All fields are required");
    }

    const distanceTime = await getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
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
        moto: Math.round(
            baseFare.moto +
                (distanceTime.distance.value / 1000) * perKmRate.moto +
                (distanceTime.duration.value / 60) * perMinuteRate.moto
        )
    };

    return fare;
};

function getOtp(length) {
    const otp = crypto
        .randomInt(Math.pow(10, length - 1), Math.pow(10, length))
        .toString();
    return otp;
}

const createRide = async ({ user, pickup, destination, vehicleType }) => {
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

const confirmRide = async ({ rideId, captain }) => {
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

const startRide = async ({ rideId, otp, captain }) => {
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

const endRide = async ({ rideId, captain }) => {
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

export { createRide, getFare, confirmRide, startRide, endRide };
