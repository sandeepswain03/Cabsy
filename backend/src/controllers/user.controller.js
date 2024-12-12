import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import { validationResult } from "express-validator";
import { User } from "../models/user.model.js";

const generateAccessTokenandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return {
            accessToken,
            refreshToken
        };
    } catch (error) {
        throw new apiError(500, "Error generating tokens");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation Error", errors.array());
    }

    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        throw new apiError(400, "All fields are required");
    }

    const userExist = await User.findOne({ email });
    if (userExist) throw new apiError(400, "User already exist");

    const user = await User.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) throw new apiError(500, "Error registering user");

    return res
        .status(201)
        .json(
            new apiResponse(201, createdUser, "User registered Successfully")
        );
});

const loginUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation Error", errors.array());
    }

    const { email, password } = req.body;

    if (!email || !password) {
        throw new apiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) throw new apiError(400, "user not found");

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) throw new apiError(400, "Password is incorrect");

    const { accessToken, refreshToken } =
        await generateAccessTokenandRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password");

    return res.status(200).json(
        new apiResponse(
            200,
            {
                accessToken,
                refreshToken,
                loggedInUser
            },
            "Login Success",
            []
        )
    );
});

export { registerUser, loginUser };
