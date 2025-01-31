import apiError from "../utils/apiError.js";
import { Captain } from "../models/captain.model.js";
import axios from "axios";

const getAddressCoordinates = async (address) => {
    const apikey = process.env.GOOGLE_MAPS_API;
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
        )}&key=${apikey}`
    );
    try {
        if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new apiError(
                400,
                "Could not find coordinates for the given address"
            );
        }
    } catch (error) {
        if (error instanceof apiError) {
            throw error;
        }
        throw new apiError(
            500,
            "Error getting coordinates from Google Maps API"
        );
    }
};

const getDistance = async (origin, destination) => {
    const apikey = process.env.GOOGLE_MAPS_API;
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
            origin
        )}&destinations=${encodeURIComponent(destination)}&key=${apikey}`
    );
    try {
        if (response.data.status === "OK") {
            return response.data.rows[0].elements[0];
        } else {
            throw new apiError(
                400,
                "Could not find coordinates for the given address"
            );
        }
    } catch (error) {
        if (error instanceof apiError) {
            throw error;
        }
        throw new apiError(
            500,
            "Error getting coordinates from Google Maps API"
        );
    }
};

const getSuggestionsForInput = async (input) => {
    const apikey = process.env.GOOGLE_MAPS_API;
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            input
        )}&key=${apikey}`
    );
    try {
        if (response.data.status === "OK") {
            const suggestions = response.data.predictions.map((prediction) => {
                return prediction;
            });
            return suggestions;
        } else {
            throw new apiError(
                400,
                "Could not find coordinates for the given address"
            );
        }
    } catch (error) {
        if (error instanceof apiError) {
            throw error;
        }
        throw new apiError(
            500,
            "Error getting coordinates from Google Maps API"
        );
    }
};

const getcaptainInRadius = async (lng, ltd, radius) => {
    const captains = await Captain.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, ltd], radius / 6371]
            }
        },
    });
    return captains;
};

export {
    getAddressCoordinates,
    getDistance,
    getSuggestionsForInput,
    getcaptainInRadius
};
