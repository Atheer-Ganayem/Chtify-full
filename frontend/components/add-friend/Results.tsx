import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import React from "react";
import { Button, User as NextUIUser } from "@nextui-org/react";
import { IUser } from "@/types/mongo-types";
import { MessageSquareMore } from "lucide-react";
import { useFormState } from "react-dom";
import { createChat } from "@/utils/actions/chat";
import ChatBtn from "./ChatBtn";

interface Props {
  searchKey: string;
  userId: string;
}

const Results: React.FC<Props> = async ({ searchKey, userId }) => {
  let results: IUser[] = [];
  if (searchKey) {
    await connectDB();
    results = await User.find({
      name: { $regex: searchKey, $options: "i" },
      _id: { $ne: userId },
    })
      .select("name email avatar")
      .lean();
  }

  return (
    <div className="mt-10 flex flex-col gap-8">
      {results.length > 0 ? (
        results.map(user => (
          <div key={user._id.toString()} className="flex items-center justify-between">
            <NextUIUser
              name={user.name}
              description={user.email}
              avatarProps={{
                src: process.env.AWS + user.avatar,
                className: "h-14 w-14",
              }}
              classNames={{
                name: "text-xl",
                description: "text-md",
              }}
            />
            <ChatBtn userId={user._id.toString()} />
          </div>
        ))
      ) : searchKey ? (
        <p>No results found for {`"${searchKey}"`}</p>
      ) : (
        <p>Please type something to search</p>
      )}
    </div>
  );
};

export default Results;
