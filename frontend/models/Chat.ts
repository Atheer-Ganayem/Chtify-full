import { IChat } from "@/types/mongo-types";
import { Schema, model, models } from "mongoose";
require("./Message");

const objectId = Schema.Types.ObjectId;

const chatSchema: Schema<IChat> = new Schema({
  participants: [{ ref: "User", type: objectId }],
  messages: [{ ref: "Message", type: objectId }],
});

const Chat = models.Chat || model("Chat", chatSchema);
export default Chat;
