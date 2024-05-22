import { Document } from "mongoose";

// Interface for user document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

// Interface for message document
interface IMessage extends Document {
  sender: IUser["_id"];
  recipient: IUser["_id"];
  text?: string;
  file?: string;
  createdAt: string;
}

// Interface for conversation document
interface IChat extends Document {
  participants: Array<IUser["_id"]>;
  messages: Array<IMessage["_id"]>;
}
