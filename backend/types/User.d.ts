export interface User {
  userId: string;
  name?: string;
  joinedAt?: string | Date;
  leaveAt?: string | Date;
  connected?: boolean;
}

export type UserMap = {
  [userId: string]: User;
};
