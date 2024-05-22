import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import { isAuth } from "./middlewares/auth";
import mongoose from "mongoose";
import { Socket } from "socket.io";
import cors from "cors";
import { HttpError } from "./utils/http-helpers";
import { decode } from "next-auth/jwt";
import messageRoutes from "./routes/message.routes";
import helmet from "helmet";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.znjli.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({ origin: process.env.frontend_domain, credentials: true, optionsSuccessStatus: 200 })
);
app.use(helmet());

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.frontend_domain as string);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use(isAuth as any);

app.use("/message", messageRoutes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode || 500).json({ message: err.message || "error" });
});

type SocketMap = { [key: string]: string };
export const userSocketMap: SocketMap = {};

mongoose
  .connect(MONGODB_URL)
  .then(result => {
    const server = app.listen(PORT);
    console.log(`app listeing on port ${PORT} and mongodb connected`);

    const io = require("./socket").init(server);
    io.on("connection", async (socket: Socket) => {
      try {
        console.log("Client connected");
        const token = socket.handshake.query.token as string;
        const decodedToken = await decode({ token, secret: process.env.authSecret as string });
        if (!decodedToken) {
          throw new HttpError("Not authenticated", 403);
        }
        userSocketMap[decodedToken.id as string] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
          console.log("user disconnected", socket.id);
          delete userSocketMap[decodedToken.id as string];
          io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
      } catch (error) {
        socket.disconnect(true);
      }
    });
  })
  .catch(err => console.log(err));
