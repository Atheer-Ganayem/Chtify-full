import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { unstable_noStore } from "next/cache";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { cookies } from "next/headers";
import { connectDB } from "@/utils/connectDB";
import { isValidObjectId } from "mongoose";
import { IChat, IMessage } from "@/types/mongo-types";
import ChatSchema from "@/models/Chat";
import ChatContainer from "@/components/main-card/chat/ChatContainer";
import Message from "@/models/Message";

export async function generateMetadata({ params }: { params: { chatId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/auth?mode=login");
    }

    await connectDB();

    const chat = (await ChatSchema.findById(params.chatId)
      .select("participants")
      .populate({ path: "participants", select: "name" })
      .lean()) as IChat;
    if (!chat) {
      return {
        title: "Chatify | Not found",
      };
    }

    const recipientName =
      chat.participants[0]._id.toString() === session.user.id
        ? chat.participants[1].name
        : chat.participants[0].name;

    return {
      title: "Chatify | " + recipientName,
    };
  } catch (error) {
    return {
      title: "Chatify",
    };
  }
}

interface Props {
  params: { chatId: string };
}

const ChatByIdPage: React.FC<Props> = async ({ params }) => {
  unstable_noStore();

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth?mode=login");
  }

  const token = cookies().get("next-auth.session-token")?.value || "";

  await connectDB();
  if (!isValidObjectId(params.chatId)) {
    notFound();
  }
  const chat = (await ChatSchema.findById(params.chatId).lean()) as IChat;

  if (!chat) {
    notFound();
  } else if (
    chat.participants[0].toString() !== session.user.id &&
    chat.participants[1].toString() !== session.user.id
  ) {
    notFound();
  }
  const messages = (await Message.find({ _id: chat.messages })
    .select("-recipient")
    .populate({ path: "sender", select: "avatar name" })
    .lean()) as IMessage[];

  return <ChatContainer chatId={params.chatId} messages={messages} token={token} />;
};

export default ChatByIdPage;
