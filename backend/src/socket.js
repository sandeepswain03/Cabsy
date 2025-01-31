import { Server } from "socket.io";
import { User } from "./models/user.model.js";
import { Captain } from "./models/captain.model.js";

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`🟢 Socket connected: ${socket.id}`);

        socket.on("join", async (data) => {
            const { userId, userType } = data;
            if (userType === "user") {
                await User.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === "captain") {
                await Captain.findByIdAndUpdate(userId, {
                    socketId: socket.id
                });
            }
        });

        socket.on("update-location-captain", async (data) => {
            const { userId, location } = data;
            if (!location || !location.ltd || !location.lng || !userId) {
                return socket.emit("error", {
                    message: "Invalid location data or userId"
                });
            }
            await Captain.findByIdAndUpdate(userId, {
                location: { ltd: location.ltd, lng: location.lng }
            });
        });

        socket.on("disconnect", () => {
            console.log(`🔴 Socket disconnected: ${socket.id}`);
        });
    });
};

const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        // console.log(messageObject, socketId)
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log("⚠️ Socket.io not initialized.");
    }
};

export { initializeSocket, sendMessageToSocketId };
