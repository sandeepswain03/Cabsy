import { Router } from "express";
import { getCoordinates, getDistanceTime, getSuggestions } from "../controllers/map.controller.js";
import { query } from "express-validator";

import checkAuth from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
    "/get-coordinates",
    query("address").isString().isLength({ min: 3 }),
    checkAuth,
    getCoordinates
);

router.get(
    "/get-distance-time",
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
    checkAuth,
    getDistanceTime
);

router.get(
    "/get-suggestions",
    query("input").isString().isLength({ min: 3 }),
    checkAuth,
    getSuggestions
);

export default router;
