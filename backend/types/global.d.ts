import { UserMap } from "./User";
import { AllNodes } from "./websocket";

declare global {
  declare namespace Express {
    export interface Request extends Request {
      allusers?: UserMap;
      allconnectedNodes?: AllNodes;
    }
  }
}

export default global;
