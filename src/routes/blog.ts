import express, { NextFunction, Request, Response } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  userBlogs,
} from "@controllers/blog";
import { isLoggedIn } from "@middlewares/auth";
import invalidRouteMiddleware from "@errorHandlers/invalidRouteMiddleware";
import errorMiddleware from "@errorHandlers/errorMiddleware";

import multer from "multer";
export const blogRoute = express.Router();

// get all blogs from collection
blogRoute.get("/", getAllBlogs);
blogRoute.get("/:id", getSingleBlog);

// this middleware checks whether user is logged in or not
// blogRoute.use(isLoggedIn);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// blogRoute.post("/createblog", isLoggedIn, createBlog);
// blogRoute.post("/createblog", upload.single("image"), createBlog);
blogRoute.post("/createblog", isLoggedIn, multer().none(), createBlog);

blogRoute
  .route("/:id")
  .post(isLoggedIn, userBlogs)
  .patch(isLoggedIn, multer().none(), updateBlog)
  .delete(isLoggedIn, deleteBlog);

blogRoute.all("*", invalidRouteMiddleware);

// every error will be thrown here and err will contain error messages
blogRoute.use(errorMiddleware);
