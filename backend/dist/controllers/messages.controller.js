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
exports.sendMessage = void 0;
const Chat_1 = __importDefault(require("../models/Chat"));
const http_helpers_1 = require("../utils/http-helpers");
const mongoose_1 = require("mongoose");
const Message_1 = __importDefault(require("../models/Message"));
const app_1 = require("../app");
const sendMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { text } = req.body;
        const chatId = req.params.chatId;
        if (!chatId || !(0, mongoose_1.isValidObjectId)(chatId) || !text || !text.trim()) {
            throw new http_helpers_1.HttpError("Invalid chat id or input", 422);
        }
        const chat = (yield Chat_1.default.findById(chatId));
        if (!chat) {
            throw new http_helpers_1.HttpError("Chat not found", 404);
        }
        const recipient = chat.participants[0].toString() === userId ? chat.participants[1] : chat.participants[0];
        const message = yield Message_1.default.create({ sender: userId, recipient, text });
        chat.messages.push(message._id);
        yield chat.save();
        const newMessage = yield Message_1.default.findById(message._id).populate({
            path: "sender",
            select: "name avatar",
        });
        const receiverId = app_1.userSocketMap[recipient.toString()];
        if (receiverId) {
            const io = require("../socket").getIo();
            io.to(receiverId).emit("newMessage", { newMessage, chatId });
        }
        res.status(201).json({ message: "Message sent successfully", newMessage });
    }
    catch (error) {
        next(error);
    }
});
exports.sendMessage = sendMessage;
