import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import { randomUUID } from "crypto";
import { UserMap } from "../types/User";
const app: Application = express();

const PORT = process.env.PORT || 1726;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const userMapping: UserMap = {};

app.get("/", (req, res) => {
  let id = randomUUID();

  userMapping[id] = {
    userId: id,
    joinedAt: new Date(),
  };

  res.json({
    msg: userMapping[id],
  });
});

app.post(
  "/getuser",
  (req: Request<any, any, { userId: string }>, res: Response) => {
    const { userId } = req.body;
    if (userMapping[userId]) {
      console.log(userMapping[userId].joinedAt?.toLocaleString());
      res.json({
        msg: userMapping[userId],
      });
    } else {
      res.json({
        error: "No user exist",
      });
    }
  }
);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
