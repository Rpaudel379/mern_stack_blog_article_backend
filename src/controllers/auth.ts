import { NextFunction, Request, Response } from "express";
// import sendEmail from "@controllers/sendEmail";
import {
  filterAPIRegister,
  filterAPILogin,
  filterAPIUpdate,
} from "@controllers/handleAuthValidation";
import User from "@models/User";
import handleMongoError from "@root/src/controllers/handleMongoErrors";
import createToken from "@controllers/createToken";
import handleMongoErrors from "@root/src/controllers/handleMongoErrors";
import Blog from "../models/Blog";

//? ==============================================================================================
//? ==============================================================================================
// POST login
export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;

  // filters each fields
  const filtered = filterAPILogin({ username, password });
  if (!filtered.validation) {
    return next(Error(filtered.message));
  }

  try {
    const user = await User.login(username, password);

    const token = createToken(user!._id);

    /*  res.cookie("auth", token, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
      
    }); */
    res.status(202).send({
      message: "logged in succesfully, now redirecting",
      success: true,
      user,
      token,
    });
  } catch (error: any) {
    return next(error);
  }
};

//? ==============================================================================================
//? ==============================================================================================

// register
export const handleRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;

  // filters each fields
  // checks wheather the email is valid or not
  // checks if the password contains atleast one Uppercase and a digit
  const filtered = filterAPIRegister({
    username,
    password,
  });

  if (!filtered.validation) {
    // Error thrown here will get catched by error handling middleware at routes directory
    return next(Error(filtered.message));
  }

  try {
    const user = await User.create({ username, password });
    console.log(user, "dai");

    // uses nodemailer to send account details
    // sendEmail({ username, email, password }, { message: "" });
    res.status(201).send({ message: "registered successfully", success: true });
  } catch (err: any) {
    const error = handleMongoError(err);
    return next(Error(error));
  }
};

//? ==============================================================================================
//? ==============================================================================================

// edit account
export const editAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password, userId } = req.body;

  // sendEmail({ username, email }, { message: "" });

  // filters each fields
  // checks wheather the email is valid or not
  // checks if the password contains atleast one Uppercase and a digit
  const filtered = filterAPIUpdate({
    username,
    password,
  });

  if (!filtered.validation) {
    // Error thrown here will get catched by error handling middleware at routes directory
    return next(Error(filtered.message));
  }

  interface Update {
    username?: string;
    password?: string;
  }

  const update: Update = {};

  if (username) {
    update.username = username;
  }
  if (password) {
    update.password = password;
  }

  try {
    await User.updateOne(
      { _id: userId },
      {
        $set: update,
      },
      { runValidators: true }
    );

    res.status(200).send({ message: "updated", success: true });
  } catch (err: any) {
    const error = handleMongoError(err);
    return next(Error(error));
  }

  // res.status(200).send({ message: "regi", cred: req.body });
};

//? ==============================================================================================
//? ==============================================================================================

// delete account
export const handleDeleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.body;

  try {
    await User.findByIdAndDelete(userId);
    await Blog.deleteMany({ userId });

    res.status(200).json({ message: "deleted", success: true });
  } catch (err: any) {
    const error = handleMongoErrors(err);
    return next(Error(error));
  }
};
