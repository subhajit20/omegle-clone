import { WebSocketServer } from "ws";
import { User, UserMap } from "./User";

export interface Nodes extends WebSocketServer {
  [userId: string]: User;
  send?: any;
}

export type AllNodes = {
  [userId: string]: Nodes;
};
