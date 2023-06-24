import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";

// routes
import { authRoute } from "@routes/auth";
import { blogRoute } from "@routes/blog";

const app = express();
dotenv.config();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());
//? TODO disable if not sent request from API

//? TODO disable if not sent request from API

// default route for backend
app.get("/", (req, res) => {
  console.log(req.headers["user-agent"]);

  res.send("this is backend of the app");
});

// app.use(isLoggedIn);

// route to user related requests like login, register, edit and delete
app.use("/api/auth", multer().none(), authRoute);

// route to blog related request like getting all blogs, single blogs, user blogs, delete, edit
app.use("/api/blog", blogRoute);

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("database connected");

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

//     "dev": "ts-node-dev --respawn --transpile-only index.ts",
//     "dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpile-only ./src/index.ts",

// const enco = req.headers.authorization?.split(" ")[1];
// const cred = Buffer.from(enco as any, "base64").toString("ascii");
// console.log(cred);

export default app;
