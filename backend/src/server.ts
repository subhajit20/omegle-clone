import dotenv from "dotenv";
dotenv.config();
import express, { Application, NextFunction, Request, Response } from "express";
import { WebSocketServer } from "ws";
import userRouter from "../routes/user.route";
import { UserMap, User } from "../types/User";
import { Nodes, AllNodes } from "../types/websocket";
import global from "../types/global";
import { randomUUID } from "crypto";
import { count } from "console";
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
const userList: Nodes[] = [];
const wsNodesMapping: AllNodes = {};

let uniqueId: string;

// setting websocket connection
let connect = 0;
wss.on("connection", (ws: Nodes) => {
  console.log("Connected...");
  uniqueId = randomUUID();
  connect++;
  console.log(connect);

  ws[uniqueId] = {
    userId: uniqueId,
    joinedAt: new Date(),
    connected: true,
  };

  userList.push(ws);
  wsNodesMapping[uniqueId] = ws;

  // sending userdetails to the frontend app
  ws.send(
    JSON.stringify({
      user: ws[uniqueId],
    })
  );

  ws.on("message", (data) => {
    const incommingData = JSON.parse(data);

    if (incommingData.left) {
      const { id } = incommingData.left;
      console.log(wsNodesMapping[id]);
      delete wsNodesMapping[id];
      const updatedUserList = userList.filter((uList) => {
        return uList.userId !== id;
      });
      userList.forEach((uList) => {
        uList.send(
          JSON.stringify({
            connectedUserList: updatedUserList,
          })
        );
      });
    } else if (incommingData.offer) {
      const { from, to, offer } = incommingData.offer;
      console.log(from, to, offer);
    }
  });

  ws.on("close", () => {
    connect--;
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
