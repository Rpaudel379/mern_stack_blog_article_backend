import { NextFunction, Request, Response } from "express";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("~~~~~~~~", err);

  // splits into two values seperated by = /// 404=error message
  const [code, message] = err.message.split("=");

  res.status(parseInt(code)).json({ message });
};
 