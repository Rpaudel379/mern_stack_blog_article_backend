import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  console.log("come");
  next(Error("404=invalid route"));
};
