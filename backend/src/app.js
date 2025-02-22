import express from "express";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";
import logger from "./utils/logger.js";
import cookieParser from "cookie-parser";
import apiError from "./utils/apiError.js";
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    })
);
const morganFormat = ":method :url :status :response-time ms";
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3]
                };
                const coloredLogObject = {
                    method: chalk.red.bold(logObject.method),
                    url: chalk.blue.bold(logObject.url),
                    status: chalk.yellow.bold(logObject.status),
                    responseTime: chalk.green.bold(logObject.responseTime)
                };
                logger.info(
                    `Method: ${coloredLogObject.method}, URL: ${coloredLogObject.url}, Status: ${coloredLogObject.status}, Response Time: ${coloredLogObject.responseTime}`
                );
            }
        }
    })
);
//common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//import routes
import userRoutes from "./routes/user.route.js";
import captainRoutes from "./routes/captain.route.js";
import mapRoutes from "./routes/map.route.js";
import riding from "./routes/riding.route.js";

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/captain", captainRoutes);
app.use("/api/v1/map", mapRoutes);
app.use("/api/v1/riding", riding);

app.use((err, req, res, next) => {
    // Check if it's an instance of your custom ApiError
    if (err instanceof apiError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    // Generic fallback for unknown errors
    console.error(err.stack);
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

export default app;
