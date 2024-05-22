import { Request } from "express";
import { JwtPayload as originalJwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export interface JwtPayload extends originalJwtPayload {
  id: string;
  name: string;
  avatar: String;
  email: string;
}
