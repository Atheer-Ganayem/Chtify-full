"use client";

import { useToast } from "@/components/UI/use-toast";
import { SocketContext } from "@/context/SocketProvider";
import { IMessage } from "@/types/mongo-types";
import React, { useContext, useEffect, useState } from "react";

type HookType = (
  chatId: string,
  fetchedMessages: IMessage[]
) => { messages: IMessage[]; setMessages: React.Dispatch<React.SetStateAction<IMessage[]>> };

export const useReceiveMessage: HookType = (chatId, fetchedMessages) => {
  const { socket, setLatestMessage } = useContext(SocketContext);
  const [messages, setMessages] = useState(fetchedMessages);
  const { toast } = useToast();

  useEffect(() => {
    socket?.on("newMessage", (data: { newMessage: IMessage; chatId: string }) => {
      if (data.chatId === chatId) {
        setMessages([...messages, data.newMessage]);
      } else {
        toast({
          title: `New message from ${data.newMessage.sender.name}`,
          description: `Message: ${data.newMessage.text}`,
        });
      }
      setLatestMessage(data.chatId, data.newMessage);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages, chatId, setLatestMessage, toast]);

  return { messages, setMessages };
};
