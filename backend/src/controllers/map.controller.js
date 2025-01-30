import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import { validationResult } from "express-validator";
import { getAddressCoordinates, getDistance, getSuggestionsForInput } from "../services/map.service.js";

const getCoordinates = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation Error", errors.array());
    }
    const { address } = req.query;
    try {
        const coordinates = await getAddressCoordinates(address);
        return res.json(
            new apiResponse(200, coordinates, "Coordinates Found", [])
        );
    } catch (error) {
        if (error instanceof apiError) {
            throw error;
        }
        throw new apiError(500, "Error getting coordinates");
    }
});

const getDistanceTime = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation Error", errors.array());
    }
    const { origin, destination } = req.query;
    try {
        const distance = await getDistance(origin, destination);
        return res.json(
            new apiResponse(200, distance, "Distance and Time Found", [])
        );
    } catch (error) {
        if (error instanceof apiError) {
            throw error;
        }
        throw new apiError(500, "Error getting distance and time");
    }
});

const getSuggestions = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation Error", errors.array());
    }
    const { input } = req.query;
    try {
        const suggestions = await getSuggestionsForInput(input);
        return res.json(
            new apiResponse(200, suggestions, "Suggestions Found", [])
        );
    } catch (error) {
        if (error instanceof apiError) {
            throw error;
        }
        throw new apiError(500, "Error getting suggestions");
    }
});

export { getCoordinates, getDistanceTime, getSuggestions };
