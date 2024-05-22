"use client";

import { IMessage } from "@/types/mongo-types";
import React, { createContext, useEffect, useState } from "react";
import openSocket, { Socket } from "socket.io-client";

export const SocketContext = createContext<{
  socket: Socket | null;
  onlineUsers: string[];
  getLatestMessage: (chatId: string) => IMessage | null;
  setLatestMessage: (chatId: string, message: IMessage) => void;
}>({
  socket: null,
  onlineUsers: [],
  getLatestMessage: () => null,
  setLatestMessage: () => {},
});

interface Props {
  children: React.ReactNode;
  token: string;
}

interface LatestMessages {
  [chatId: string]: IMessage;
}

const SocketWrapper: React.FC<Props> = ({ children, token }) => {
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [latestMessages, setLatestMessages] = useState<LatestMessages>({});

  useEffect(() => {
    const socket = openSocket(process.env.API as string, { query: { token } });
    setSocket(socket);

    socket.on("getOnlineUsers", users => {
      setOnlineUsers(users);
    });

    return () => {
      socket.close();
    };
  }, [token]);

  function getLatestMessage(chatId: string) {
    return latestMessages[chatId];
  }

  function setLatestMessage(chatId: string, message: IMessage) {
    setLatestMessages((prev: LatestMessages) => ({ ...prev, [chatId]: message }));
  }

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, getLatestMessage, setLatestMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketWrapper;
