import SelectChat from "@/components/main-card/select-chat/SelectChat";
import Chat from "@/models/Chat";
import { IChat } from "@/types/mongo-types";
import { authOptions } from "@/utils/authOptions";
import { connectDB } from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const ChatUsersPage = async () => {
  unstable_noStore();

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth?mode=login");
  }

  await connectDB();

  const chats: IChat[] = await Chat.find({ participants: session.user.id })
    .populate({
      path: "participants",
      select: "name avatar",
    })
    .populate({
      path: "messages",
      options: { sort: { createdAt: -1 }, limit: 1 },
      populate: { path: "sender", select: "name" },
    })
    .lean();

  return (
    <div className="overflow-y-scroll">
      <SelectChat chats={chats} userId={session.user.id} />
    </div>
  );
};

export default ChatUsersPage;
