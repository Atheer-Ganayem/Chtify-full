"use client";

import { Button, Card } from "@nextui-org/react";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ChatCard = ({ children }: { children: React.ReactNode }) => {
  const { chatId } = useParams();

  return (
    <>
      <Card className="grid-cols-3 h-[80vh] hidden lg:grid">{children}</Card>
      <div className="block lg:hidden">
        {chatId && (
          <Button className="w-fit mb-5" as={Link} href="/chat">
            <ArrowBigLeft />
          </Button>
        )}
        <Card>
          {children
            ? chatId
              ? (children as React.ReactNode[])[1]
              : (children as React.ReactNode[])[0]
            : null}
        </Card>
      </div>
    </>
  );
};

export default ChatCard;
