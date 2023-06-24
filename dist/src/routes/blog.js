"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = __importDefault(require("express"));
const blog_1 = require("../controllers/blog");
const auth_1 = require("../middlewares/auth");
const invalidRouteMiddleware_1 = __importDefault(require("../errorHandlers/invalidRouteMiddleware"));
const errorMiddleware_1 = __importDefault(require("../errorHandlers/errorMiddleware"));
const multer_1 = __importDefault(require("multer"));
exports.blogRoute = express_1.default.Router();
// get all blogs from collection
exports.blogRoute.get("/", blog_1.getAllBlogs);
exports.blogRoute.get("/:id", blog_1.getSingleBlog);
// this middleware checks whether user is logged in or not
// blogRoute.use(isLoggedIn);
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// blogRoute.post("/createblog", isLoggedIn, createBlog);
// blogRoute.post("/createblog", upload.single("image"), createBlog);
exports.blogRoute.post("/createblog", auth_1.isLoggedIn, (0, multer_1.default)().none(), blog_1.createBlog);
exports.blogRoute
    .route("/:id")
    .post(auth_1.isLoggedIn, blog_1.userBlogs)
    .patch(auth_1.isLoggedIn, (0, multer_1.default)().none(), blog_1.updateBlog)
    .delete(auth_1.isLoggedIn, blog_1.deleteBlog);
exports.blogRoute.all("*", invalidRouteMiddleware_1.default);
// every error will be thrown here and err will contain error messages
exports.blogRoute.use(errorMiddleware_1.default);
