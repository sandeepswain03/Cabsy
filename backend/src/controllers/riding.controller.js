import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import { validationResult } from "express-validator";
import { sendMessageToSocketId } from "../socket.js";
import { Ride } from "../models/ride.modal.js";
import {
    createRideService,
    getFareService,
    confirmRideService,
    startRideService,
    endRideService
} from "../services/riding.service.js";
import {
    getAddressCoordinates,
    getcaptainInRadius
} from "../services/map.service.js";

const createRide = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation Error", errors.array());
    }

    const { pickup, destination, vehicleType } = req.body;

    if (!pickup || !destination || !vehicleType) {
        throw new apiError(400, "All fields are required");
    }

    try {
        const ride = await createRideService({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });
        res.json(new apiResponse(200, ride, "Ride Created", []));

        const pickupCoordinates = await getAddressCoordinates(pickup);
        const captainInRadius = await getcaptainInRadius(
            pickupCoordinates.ltd,
            pickupCoordinates.lng,
            2
        );
        ride.otp = "";
        const rideWithUser = await Ride.findOne({ _id: ride._id }).populate(
            "user"
        );
        captainInRadius.map((captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser
            });
        });
    } catch (error) {
        throw new apiError(500, error.message || "Error creating ride");
    }
});

const getFare = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation Error", errors.array());
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getFareService(pickup, destination);
        return res.json(
            new apiResponse(200, fare, "Fare calculated successfully", [])
        );
    } catch (error) {
        throw new apiError(500, error.message || "Error calculating fare");
    }
});

const confirmRide = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation Error", errors.array());
    }

    const { rideId, captain } = req.body;

    try {
        const ride = await confirmRideService({ rideId, captain: captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-confirmed",
            data: ride
        });
        return res.json(
            new apiResponse(200, ride, "Ride confirmed successfully", [])
        );
    } catch (error) {
        throw new apiError(500, error.message || "Error confirming ride");
    }
});

const startRide = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation Error", errors.array());
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await startRideService({
            rideId,
            otp
        });

        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-started",
            data: ride
        });

        return res.json(
            new apiResponse(200, ride, "Ride started successfully", [])
        );
    } catch (error) {
        throw new apiError(500, error.message || "Error starting ride");
    }
});

const endRide = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation Error", errors.array());
    }

    const { rideId, captain } = req.body;

    try {
        const ride = await endRideService({ rideId, captain: captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-ended",
            data: ride
        });

        return res.json(
            new apiResponse(200, ride, "Ride ended successfully", [])
        );
    } catch (error) {
        throw new apiError(500, error.message || "Error ending ride");
    }
});

export { createRide, getFare, confirmRide, startRide, endRide };
