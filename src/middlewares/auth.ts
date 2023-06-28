import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import User from "@models/User";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const token = req.cookies.auth;
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_KEY as Secret
      ) as JwtPayload;

      // throws an error if decodedToken.id is not the objectId
      await User.findById(decodedToken.id);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "User not logged in" });
  }
};
