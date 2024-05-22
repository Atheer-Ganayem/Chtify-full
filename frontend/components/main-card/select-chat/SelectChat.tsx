"use client";

import { IChat } from "@/types/mongo-types";
import React, { useState } from "react";
import SingleChatSelect from "./SingleChatSelect";
import SearchChat from "./SearchChat";

interface Props {
  chats: IChat[];
  userId: string;
}

const SelectChat: React.FC<Props> = ({ chats, userId }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  function onSearch(term: string) {
    setSearchTerm(term);
  }

  let filteredChats: IChat[] = [];
  if (searchTerm) {
    filteredChats = chats.filter(chat => {
      const participant =
        chat.participants[0]._id.toString() === userId
          ? chat.participants[1]
          : chat.participants[0];

      return participant.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
    });
  } else {
    filteredChats = chats;
  }

  return (
    <div>
      <SearchChat value={searchTerm} onSearch={onSearch} />
      {filteredChats.map(chat => (
        <SingleChatSelect
          key={chat._id.toString()}
          user={
            chat.participants[0]._id.toString() === userId
              ? chat.participants[1]
              : chat.participants[0]
          }
          chatId={chat._id.toString()}
          latestMessage={chat.messages[0]}
        />
      ))}
    </div>
  );
};

export default SelectChat;
