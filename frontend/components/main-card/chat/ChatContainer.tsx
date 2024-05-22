"use client";

import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { IMessage } from "@/types/mongo-types";
import { useReceiveMessage } from "@/hooks/useReceiveMessage";

interface Props {
  token: string;
  messages: IMessage[];
  chatId: string;
}

const ChatContainer: React.FC<Props> = ({ chatId, messages: fetchedMessages, token }) => {
  const { messages, setMessages } = useReceiveMessage(chatId, fetchedMessages);

  return (
    <div className="flex flex-col h-[80vh]">
      <Messages messages={messages} />
      <MessageInput chatId={chatId} token={token} setMessages={setMessages} />
    </div>
  );
};

export default ChatContainer;
