import { NextFunction, Request } from "express";
import { decode } from "next-auth/jwt";
import { HttpError } from "../utils/http-helpers";

export const isAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization") as string;
    if (!authHeader) {
      throw new HttpError("Not authenticated.", 401);
    }
    const token = authHeader.split(" ")[1];
    let decodedToken: any;
    try {
      decodedToken = await decode({ token, secret: process.env.authSecret as string });
    } catch (err) {
      throw new HttpError("An error occurred in authentication", 500);
    }
    if (!decodedToken) {
      throw new HttpError("Not authenticated.", 401);
    }
    req.userId = decodedToken.id;
    next();
  } catch (err) {
    next(err);
  }
};
