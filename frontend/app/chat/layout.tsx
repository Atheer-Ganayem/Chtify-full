import SocketProvider from "@/context/SocketProvider";
import { cookies } from "next/headers";
import { Suspense } from "react";
import SelectChatLoader from "@/components/main-card/select-chat/SelectChatLoader";
import { Metadata } from "next";
import ChatCard from "@/components/main-card/ChatCard";

export const metadata: Metadata = {
  title: "Chatify | Chats",
};

export default function RootLayout({
  chat,
  users,
}: Readonly<{
  chat: React.ReactNode;
  users: React.ReactNode;
}>) {
  const token = cookies().get("next-auth.session-token")?.value || "";

  return (
    <SocketProvider token={token}>
      <ChatCard>
        <Suspense fallback={<SelectChatLoader />}>{users}</Suspense>
        <Suspense fallback={<p>Loading chat....</p>}>
          <div className="col-span-2">{chat}</div>
        </Suspense>
      </ChatCard>
    </SocketProvider>
  );
}
