"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSocketMap = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const auth_1 = require("./middlewares/auth");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const http_helpers_1 = require("./utils/http-helpers");
const jwt_1 = require("next-auth/jwt");
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const helmet_1 = __importDefault(require("helmet"));
require("dotenv").config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.znjli.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({ origin: process.env.frontend_domain, credentials: true, optionsSuccessStatus: 200 }));
app.use((0, helmet_1.default)());
app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.frontend_domain);
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});
app.use(auth_1.isAuth);
app.use("/message", message_routes_1.default);
app.use((err, _req, res, _next) => {
    res.status(err.statusCode || 500).json({ message: err.message || "error" });
});
exports.userSocketMap = {};
mongoose_1.default
    .connect(MONGODB_URL)
    .then(result => {
    const server = app.listen(PORT);
    console.log(`app listeing on port ${PORT} and mongodb connected`);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Client connected");
            const token = socket.handshake.query.token;
            const decodedToken = yield (0, jwt_1.decode)({ token, secret: process.env.authSecret });
            if (!decodedToken) {
                throw new http_helpers_1.HttpError("Not authenticated", 403);
            }
            exports.userSocketMap[decodedToken.id] = socket.id;
            io.emit("getOnlineUsers", Object.keys(exports.userSocketMap));
            socket.on("disconnect", () => {
                console.log("user disconnected", socket.id);
                delete exports.userSocketMap[decodedToken.id];
                io.emit("getOnlineUsers", Object.keys(exports.userSocketMap));
            });
        }
        catch (error) {
            socket.disconnect(true);
        }
    }));
})
    .catch(err => console.log(err));
