"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require("./User");
const objectId = mongoose_1.Schema.Types.ObjectId;
const messageSchema = new mongoose_1.Schema({
    sender: { ref: "User", type: objectId },
    recipient: { ref: "User", type: objectId },
    text: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });
const Message = mongoose_1.models.Message || (0, mongoose_1.model)("Message", messageSchema);
exports.default = Message;
