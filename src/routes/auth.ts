import express, { NextFunction, Request, Response } from "express";
import {
  handleLogin,
  handleRegister,
  handleDeleteAccount,
  editAccount,
} from "@controllers/auth";
import { isLoggedIn } from "@middlewares/auth";
import errorMiddleware from "@errorHandlers/errorMiddleware";
import invalidRouteMiddleware from "@errorHandlers/invalidRouteMiddleware";

export const authRoute = express.Router();

// authentication routes
authRoute.post("/login", handleLogin);
authRoute.post("/register", handleRegister);

// isLoggedIn() middleware checks whether user is logged in or not
// they can change username, email or password
// and delete the user account
authRoute
  .route("/editacc")
  .patch(isLoggedIn, editAccount)
  .delete(isLoggedIn, handleDeleteAccount);

// to delete the user account
// authRoute.delete("/deleteacc", isLoggedIn, handleDeleteAccount);

authRoute.all("*", invalidRouteMiddleware);

// every error will be thrown here and err will contain error messages
authRoute.use(errorMiddleware);
