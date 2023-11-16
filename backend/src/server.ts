import dotenv from "dotenv";
dotenv.config();
import express, { Application, NextFunction, Request, Response } from "express";
import { WebSocketServer } from "ws";
import userRouter from "../routes/user.route";
import { UserMap, User } from "../types/User";
import { Nodes, AllNodes } from "../types/websocket";
import global from "../types/global";
import { randomUUID } from "crypto";
const app: Application = express();

const PORT = process.env.PORT || 1726;

const wss = new WebSocketServer({
  port: 8080,
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// databases as mapping
const userMapping: UserMap = {};
const wsNodesMapping: AllNodes = {};

let uniqueId: string;

// setting websocket connection
wss.on("connection", (ws: Nodes) => {
  console.log("Connected...");
  uniqueId = randomUUID();

  ws[uniqueId] = {
    userId: uniqueId,
    joinedAt: new Date(),
    connected: true,
  };
  wsNodesMapping[uniqueId] = ws;

  ws.send(JSON.stringify(ws[uniqueId]));

  ws.on("message", (data) => {
    const { from, to, msg } = JSON.parse(data);
    console.log(wsNodesMapping[to][to]);
    console.log(from, to, msg);
    wsNodesMapping[to].send(
      JSON.stringify({
        from: from,
        msg: msg,
      })
    );
  });

  ws.on("close", () => {
    console.log("Left");
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  req.allusers = userMapping;
  req.allconnectedNodes = wsNodesMapping;
  next();
});

app.use("/v1", userRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
