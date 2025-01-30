import apiError from "../utils/apiError.js";
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

export { generateAccessTokenandRefreshToken };
