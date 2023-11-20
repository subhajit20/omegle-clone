import { WebSocketServer } from "ws";
import { User, UserMap } from "./User";

export interface Nodes extends WebSocketServer {
  [userId: string]: User;
  send?: any;
}

export interface WssMapping {
  [userId: string]: Nodes;
}

type roomMembers = [string?, string?];

export interface Room {
  [roodId: string]: roomMembers;
}
