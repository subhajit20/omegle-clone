import { WebSocketServer } from "ws";
import { User, UserMap } from "./User";

export interface Nodes extends WebSocketServer {
  [userId: string]: User;
  send?: any;
}

type TwoNode = [Nodes?, Nodes?];

export interface Room {
  [roomId: string]: TwoNode;
}

export type AllNodes = {
  [userId: string]: Nodes;
};
