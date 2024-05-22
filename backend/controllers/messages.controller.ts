import { NextFunction, Request, Response } from "express";
import Chat from "../models/Chat";
import { IChat } from "../types/mongo-types";
import { HttpError } from "../utils/http-helpers";
import { isValidObjectId } from "mongoose";
import Message from "../models/Message";
import { userSocketMap } from "../app";

interface SendMessageBody {
  text: string;
}

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const { text } = req.body as SendMessageBody;

    const chatId: string = req.params.chatId;
    if (!chatId || !isValidObjectId(chatId) || !text || !text.trim()) {
      throw new HttpError("Invalid chat id or input", 422);
    }

    const chat = (await Chat.findById(chatId)) as IChat;
    if (!chat) {
      throw new HttpError("Chat not found", 404);
    }

    const recipient =
      chat.participants[0].toString() === userId ? chat.participants[1] : chat.participants[0];
    const message = await Message.create({ sender: userId, recipient, text });
    chat.messages.push(message._id);

    await chat.save();

    const newMessage = await Message.findById(message._id).populate({
      path: "sender",
      select: "name avatar",
    });

    const receiverId = userSocketMap[recipient.toString()];
    if (receiverId) {
      const io = require("../socket").getIo();
      io.to(receiverId).emit("newMessage", { newMessage, chatId });
    }

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    next(error);
  }
};
