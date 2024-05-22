"use client";

import { SocketContext } from "@/context/SocketProvider";
import { IMessage } from "@/types/mongo-types";
import { Button, Textarea } from "@nextui-org/react";
import { Send } from "lucide-react";
import React, { useContext, useRef, useState } from "react";

interface Props {
  chatId: string;
  token: string;
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

const MessageInput: React.FC<Props> = ({ chatId, token, setMessages }) => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setLatestMessage } = useContext(SocketContext);

  async function sendMessageHandler(e: any) {
    try {
      if (e.key === "Enter" && !e.shiftKey && text && text.trim()) {
        await sendMessage();
      }
    } catch (error) {}
  }

  async function sendMessage() {
    try {
      setText("");
      setLoading(true);
      const response = await fetch(`${process.env.API}/message/send/${chatId}`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const responseData = await response.json();
      setMessages(prev => [...prev, responseData.newMessage as IMessage]);
      setLatestMessage(chatId, responseData.newMessage);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-3">
      <Textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={sendMessageHandler}
        variant="bordered"
        placeholder="Message"
        classNames={{ input: "text-lg" }}
        isDisabled={loading}
        endContent={
          <Button color="primary" type="submit" onClick={sendMessage} isLoading={loading}>
            <Send />
          </Button>
        }
        rows={1}
        minRows={1}
      />
    </div>
  );
};

export default MessageInput;
