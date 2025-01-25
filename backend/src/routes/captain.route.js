import { Router } from "express";
import { body } from "express-validator";
import {
    registerCaptain,
    loginCaptain,
    logoutCaptain,
    getCaptainProfile
} from "../controllers/captain.controller.js";

import checkAuth from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Email is not valid"),
        body("fullname.firstname")
            .isLength({ min: 3 })
            .withMessage("First name must be at least 3 characters"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
        body("vehicle.color")
            .isLength({ min: 3 })
            .withMessage("Color must be at least 3 characters long"),
        body("vehicle.plate")
            .isLength({ min: 3 })
            .withMessage("Plate must be at least 3 characters long"),
        body("vehicle.capacity")
            .isInt({ min: 1 })
            .withMessage("Capacity must be at least 1"),
        body("vehicle.vehicleType")
            .isIn(["car", "motorcycle", "auto"])
            .withMessage("Invalid vehicle type")
    ],
    registerCaptain
);
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Email is not valid"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters")
    ],
    loginCaptain
);
router.post("/logout", checkAuth, logoutCaptain);
router.get("/captainprofile", checkAuth, getCaptainProfile);

export default router;
