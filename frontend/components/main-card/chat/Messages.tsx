"use client";
import { IMessage } from "@/types/mongo-types";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../../context/SocketProvider";
import { Avatar, Card } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { getDate } from "@/utils/get-date";

interface Props {
  messages: IMessage[];
}

const Messages: React.FC<Props> = ({ messages }) => {
  const { data: session } = useSession();

  return (
    <div className="overflow-y-scroll flex-1 flex-col-reverse flex p-3">
      <div className="flex flex-col gap-5">
        {messages.map(message => (
          <Card
            key={message._id.toString()}
            className={`w-3/4 px-4 py-2 ${
              message.sender._id.toString() === session?.user.id
                ? "bg-primary ms-auto"
                : "bg-foreground-200"
            }`}
          >
            <header className="flex justify-between lg:items-center lg:flex-row flex-col items-start">
              <h1 className="flex items-center gap-3">
                <Avatar src={`${process.env.AWS}${message.sender.avatar}`} />
                <p className="font-bold text-lg">{message.sender.name}</p>
              </h1>
              <h3>{getDate(new Date(message.createdAt))}</h3>
            </header>
            <div className="mt-3 text-lg">
              {message.text?.split("\n").map((line, index) => (
                <p key={`${message._id.toString()}-${index}`}>{line}</p>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Messages;
