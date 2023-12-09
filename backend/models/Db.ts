import { User } from "../types/User";
import { Nodes, Room, WssMapping } from "../types/websocket";

export const userList: Nodes[] = [];
export const userMapping: WssMapping = {};
export const Rooms: Room = {};
export let user: User = {};
export let roomIds: string[] = [];

export let uniqueId: string;
export let roomId: string;
