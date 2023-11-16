import { Request, Response } from "express";

export function getAllUser(req: Request, res: Response) {
  const users = req.allusers;
  try {
    if (users) {
      return res.status(200).json({
        users: users,
      });
    }
  } catch (e) {
    return res.status(400).json({
      error: "No User are there",
      data: users,
    });
  }
}

export function getUserById(req: Request, res: Response) {
  const {
    userId,
  }: {
    userId: string;
  } = req.body;
  try {
    if (req.allusers![userId]) {
      return res.status(200).json({
        users: req.allusers![userId],
      });
    } else {
      throw "No User are there";
    }
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
}
