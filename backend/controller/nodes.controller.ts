import { Request, Response } from "express";

function getallNodes(req: Request, res: Response) {
  let allnodes = req.allconnectedNodes;
  try {
  } catch (e) {
    res.status(400).json({
      error: e,
    });
  }
}
