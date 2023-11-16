import express from "express";
import { getAllUser, getUserById } from "../controller/user.controller";

const userRouter = express.Router();

userRouter.get("/getalluser", getAllUser);
userRouter.post("/getuserbyid", getUserById);

export default userRouter;
