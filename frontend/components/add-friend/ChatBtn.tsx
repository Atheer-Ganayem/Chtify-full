"use client";

import { createChat } from "@/utils/actions/chat";
import { Button } from "@nextui-org/react";
import { MessageSquareMore } from "lucide-react";
import React, { useState } from "react";
import ErrorAlert from "../UI/ErrorAlert";
import { useRouter } from "next/navigation";

const ChatBtn = ({ userId }: { userId: string }) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onClickHandler() {
    setLoading(true);
    setError("");
    try {
      const result = await createChat(userId);

      if (result.code === 409 || result.code === 201) {
        router.push("/chat/" + result.chatId);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An error occured, please try again leter.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-3">
      <Button color="primary" onClick={onClickHandler} className="w-fit" isLoading={loading}>
        <MessageSquareMore />
      </Button>
      {error && <ErrorAlert text={error} />}
    </div>
  );
};

export default ChatBtn;
