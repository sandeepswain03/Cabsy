import {
    createRide,
    getFare,
    confirmRide,
    startRide,
    endRide
} from "../controllers/riding.route.js";
import { body, query } from "express-validator";
import { Router } from "express";

import checkAuth from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/create",
    body("pickup")
        .isString()
        .isLength({ min: 3 })
        .withMessage("Invalid pickup address"),
    body("destination")
        .isString()
        .isLength({ min: 3 })
        .withMessage("Invalid destination address"),
    body("vehicleType")
        .isString()
        .isIn(["auto", "car", "motorcycle"])
        .withMessage("Invalid vehicle type"),
    checkAuth,
    createRide
);

router.get(
    "/get-fare",
    query("pickup")
        .isString()
        .isLength({ min: 3 })
        .withMessage("Invalid pickup address"),
    query("destination")
        .isString()
        .isLength({ min: 3 })
        .withMessage("Invalid destination address"),
    checkAuth,
    getFare
);

router.post(
    "/confirm",
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    checkAuth,
    confirmRide
);

router.get(
    "/start-ride",
    query("rideId").isMongoId().withMessage("Invalid ride id"),
    query("otp")
        .isString()
        .isLength({ min: 6, max: 6 })
        .withMessage("Invalid OTP"),
    startRide
);

router.post(
    "/end-ride",
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    checkAuth,
    endRide
);

export default router;
