import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const captainSchema = new Schema(
    {
        fullname: {
            firstname: {
                type: String,
                required: true,
                trim: true,
                minlength: [3, "Firstname at least 3 characters"],
                maxlength: 50
            },
            lastname: {
                type: String,
                trim: true,
                minlength: [3, "Lastname at least 3 characters"],
                maxlength: 50
            }
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        soketId: {
            type: String
        },
        refreshToken: {
            type: String
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive"
        },
        vehicle: {
            color: {
                type: String,
                required: true,
                minlength: [3, "Color must be at least 3 characters long"]
            },
            plate: {
                type: String,
                required: true,
                minlength: [3, "Plate must be at least 3 characters long"]
            },
            capacity: {
                type: Number,
                required: true,
                min: [1, "Capacity must be at least 1"]
            },
            vehicleType: {
                type: String,
                required: true,
                enum: ["car", "motorcycle", "auto"]
            }
        },
        location: {
            ltd: {
                type: Number
            },
            lng: {
                type: Number
            }
        }
    },
    { timestamps: true }
);

captainSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

captainSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.methods.generateAccessToken = function () {
    return jsonwebtoken.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

captainSchema.methods.generateRefreshToken = function () {
    return jsonwebtoken.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const Captain = model("Captain", captainSchema);
