import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_KEY as string,
      async (err: any, decodedToken: any) => {
        if (err) {
          throw new Error("401=invalid token");
        } else {
          res.locals.user = decodedToken;
          next();
        }
      }
    );
  } else {
    throw new Error("401=User not logged in");
    // res.status(400).json({ validation: false, message: "User not logged in" });
  }
};
