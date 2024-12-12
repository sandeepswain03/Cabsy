import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import { validationResult } from "express-validator";
import { Captain } from "../models/captain.model.js";

const generateAccessTokenandRefreshToken = async (captainId) => {
    try {
        const captain = await Captain.findById(captainId);
        const accessToken = captain.generateAccessToken();
        const refreshToken = captain.generateRefreshToken();

        captain.refreshToken = refreshToken;
        await captain.save({ validateBeforeSave: false });
        return {
            accessToken,
            refreshToken
        };
    } catch (error) {
        throw new apiError(500, "Error generating tokens");
    }
};

const registerCaptain = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new apiError(400, {
            message: "Validation Error",
            errors: errors.array()
        });
    }

    const { fullname, email, password, vehicle } = req.body;

    if (!fullname || !email || !password || !vehicle) {
        throw new apiError(400, "All fields are required");
    }

    const captianExist = await Captain.findOne({ email });
    if (captianExist) throw new apiError(400, "Captian already exist");

    const captain = await Captain.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    });

    const createdCaptain = await Captain.findById(captain._id).select(
        "-password"
    );

    if (!createdCaptain) throw new apiError(500, "Error registering captian");

    return res
        .status(201)
        .json(
            new apiResponse(201, createdCaptain, "User registered Successfully")
        );
});

const loginCaptain = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation Error", errors.array());
    }

    const { email, password } = req.body;

    if (!email || !password) {
        throw new apiError(400, "All fields are required");
    }

    const captain = await Captain.findOne({ email });
    if (!captain) throw new apiError(400, "captain not found");

    const isPasswordCorrect = await captain.isPasswordCorrect(password);
    if (!isPasswordCorrect) throw new apiError(400, "Password is incorrect");

    const { accessToken, refreshToken } =
        await generateAccessTokenandRefreshToken(captain._id);
    const loggedInCaptain = await Captain.findById(captain._id).select(
        "-password"
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                200,
                {
                    accessToken,
                    refreshToken,
                    loggedInCaptain
                },
                "Captian Login Successfully",
                []
            )
        );
});

const logoutCaptain = asyncHandler(async (req, res) => {
    await Captain.findByIdAndUpdate(
        req.user._id,
        { refreshToken: null },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    };

    return res
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(new apiResponse(200, null, "Captian Logout Successfully", []));
});

const getCaptainProfile = asyncHandler(async (req, res) => {
    const captain = await Captain.findById(req.user._id).select("-password");
    return res.json(new apiResponse(200, captain, "Captian Profile", []));
});

export { registerCaptain, loginCaptain, logoutCaptain, getCaptainProfile };
