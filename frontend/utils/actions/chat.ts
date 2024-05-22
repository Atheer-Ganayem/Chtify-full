"use server";

import { getServerSession } from "next-auth";
import { Res, notAuthenticated, notAuthorized, notFound, serverSideError } from "../http-helpers";
import { authOptions } from "../authOptions";
import Chat from "@/models/Chat";
import { IChat } from "@/types/mongo-types";
import User from "@/models/User";
import { connectDB } from "../connectDB";

interface CreateChatRes extends Res {
  chatId?: string;
}

export async function createChat(targetUserId: string): Promise<CreateChatRes> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return notAuthenticated();
    }
    await connectDB();
    const clientUser = await User.findById(session.user.id).select("_id");
    const targetUser = await User.findById(targetUserId).select("_id");
    if (!clientUser || !targetUser) {
      return notFound();
    }

    const existingChat = (await Chat.findOne({
      participants: { $all: [targetUserId, session.user.id] },
    }).select("participants")) as IChat;

    if (existingChat) {
      return {
        error: false,
        code: 409,
        message: "Chat already exists",
        chatId: existingChat._id.toString(),
      };
    }

    const chat = await Chat.create({ participants: [session.user.id, targetUserId] });

    return { error: false, code: 201, message: "Chat created.", chatId: chat._id };
  } catch (error) {
    return serverSideError();
  }
}
