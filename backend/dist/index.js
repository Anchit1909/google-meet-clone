"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});
app.use((0, cors_1.default)());
io.on("connection", (socket) => {
    console.log("server is connected");
    socket.on("join-room", (roomId, userId) => {
        console.log(`a new user ${userId} joined room ${roomId}`);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-connected", userId);
    });
    socket.on("user-toggle-audio", (userId, roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
    });
    socket.on("user-toggle-video", (userId, roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-toggle-video", userId);
    });
    socket.on("user-leave", (userId, roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-leave", userId);
    });
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
