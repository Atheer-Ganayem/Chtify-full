import { IUser } from "@/types/mongo-types";
import { Schema, model, models } from "mongoose";

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
});

const User = models.User || model("User", userSchema);
export default User;
