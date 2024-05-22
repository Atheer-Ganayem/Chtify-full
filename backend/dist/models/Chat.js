"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const objectId = mongoose_1.Schema.Types.ObjectId;
const chatSchema = new mongoose_1.Schema({
    participants: [{ ref: "User", type: objectId }],
    messages: [{ ref: "Message", type: objectId }],
});
const Chat = mongoose_1.models.Chat || (0, mongoose_1.model)("Chat", chatSchema);
exports.default = Chat;
