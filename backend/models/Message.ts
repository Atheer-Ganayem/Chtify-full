import { Schema, model, models } from "mongoose";
require("./User");

const objectId = Schema.Types.ObjectId;

const messageSchema = new Schema(
  {
    sender: { ref: "User", type: objectId },
    recipient: { ref: "User", type: objectId },
    text: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Message = models.Message || model("Message", messageSchema);
export default Message;
