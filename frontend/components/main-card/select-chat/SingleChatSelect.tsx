"use client";

import { Chip, User } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { SocketContext } from "../../../context/SocketProvider";
import { IMessage } from "@/types/mongo-types";
import { getDate } from "@/utils/get-date";
import Link from "next/link";

interface Props {
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  chatId: string;
  latestMessage?: IMessage;
}

const SingleChatSelect: React.FC<Props> = ({ user, chatId, latestMessage }) => {
  const { chatId: urlChatId } = useParams();
  const { onlineUsers, getLatestMessage } = useContext(SocketContext);
  latestMessage = getLatestMessage(chatId) || latestMessage;

  return (
    <Link href={`/chat/${chatId}`}>
      <div
        className={`p-3 cursor-pointer hover:bg-foreground-200 duration-200 ${
          chatId === urlChatId && "bg-foreground-200"
        }`}
      >
        <User
          name={user.name}
          description={
            latestMessage ? (
              <p className="flex flex-col items-start gap-1 px-1">
                <span className="font-bold">
                  {latestMessage.sender._id.toString() === user._id
                    ? latestMessage.sender.name
                    : "You"}
                  {" : "}
                  <span className="font-normal">
                    {latestMessage.text!.length > 20
                      ? latestMessage.text?.substring(0, 20) + "..."
                      : latestMessage.text}
                  </span>
                </span>
                <span className="font-bold block">
                  {getDate(new Date(latestMessage.createdAt))}
                </span>
              </p>
            ) : (
              <Chip color="primary" variant="flat">
                New chat!
              </Chip>
            )
          }
          avatarProps={{
            src: `${process.env.AWS}${user.avatar}`,
            className: "w-14 h-14",
            color: onlineUsers.includes(user._id.toString()) ? "success" : "danger",
            isBordered: true,
          }}
          classNames={{ name: "text-lg" }}
        />
      </div>
    </Link>
  );
};

export default SingleChatSelect;
