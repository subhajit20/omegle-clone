import dotenv from "dotenv";
dotenv.config();
import express, { Application, NextFunction, Request, Response } from "express";
import { WebSocketServer } from "ws";
import userRouter from "../routes/user.route";
import { UserMap, User } from "../types/User";
import { Nodes, AllNodes, Room } from "../types/websocket";
import global from "../types/global";
import { randomInt, randomUUID } from "crypto";
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
const Rooms: Room = {};
let roomIds: string[] = [];

let uniqueId: string;
let roomId: string;

console.log(randomUUID().substring(0, 8));

// setting websocket connection
let connect = 0;
wss.on("connection", (ws: Nodes) => {
  console.log("Connected...");
  uniqueId = randomUUID();
  roomId = randomUUID().substring(0, 8);
  connect++;
  console.log(connect);

  ws[uniqueId] = {
    userId: uniqueId,
    joinedAt: new Date(),
    connected: true,
  };

  userList.push(ws);
  wsNodesMapping[uniqueId] = ws;

  // if roomid is there already then generate that again
  if (Rooms[roomId]) {
    roomId = randomUUID().substring(0, 8);
  }

  Rooms[roomId] = [];

  // if the room has less than 2 memebers then push user to the room

  ws.on("message", (data) => {
    const incommingData = JSON.parse(data);

    if (incommingData.join) {
      const { userId } = incommingData.join;
      try {
        roomIds.forEach((rIds) => {
          if (Rooms[rIds].length > 0 && Rooms[rIds].length < 2) {
            Rooms[rIds][0] = userId;
            if (Rooms[rIds].length > 0) {
              Rooms[rIds].forEach((m) => {
                wsNodesMapping[userId].send(
                  JSON.stringify({
                    roomInfo: Rooms[rIds],
                  })
                );
              });
            }
          } else if (Rooms[rIds].length > 1) {
            Rooms[rIds][1] = incommingData.id;
          } else {
            return;
          }
        });
      } catch (e) {
        console.log(e);
      }
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
