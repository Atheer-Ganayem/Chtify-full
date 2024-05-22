import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const ChatPage = () => {
  return (
    <div className="flex flex-col justify-center gap-8 items-center h-full">
      <p className="text-2xl">{"Don't"} have anyone to chat with?</p>
      <Button as={Link} href="/search-users" color="primary" size="lg">
        Search Users
      </Button>
    </div>
  );
};

export default ChatPage;
