"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.userBlogs = exports.updateBlog = exports.getSingleBlog = exports.getAllBlogs = exports.createBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const filterBlog_1 = require("../utilities/filterBlog");
const handleMongoErrors_1 = __importDefault(require("./handleMongoErrors"));
const perPage = 4;
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, title, content, coverImage } = req.body;
    const filtered = (0, filterBlog_1.filterBlog)({ userId, title, content });
    if (!filtered.validation) {
        return next(Error(filtered.message));
    }
    try {
        let newBlog;
        if (coverImage) {
            newBlog = yield Blog_1.default.create({ userId, title, content, coverImage });
        }
        else {
            newBlog = yield Blog_1.default.create({ userId, title, content });
        }
        res
            .status(200)
            .json({ message: "blog created succesfully", newBlog, success: true });
    }
    catch (err) {
        const error = (0, handleMongoErrors_1.default)(err);
        return next(Error(error));
    }
});
exports.createBlog = createBlog;
const getAllBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pageNo = parseInt(req.query.pageNo);
    console.log(pageNo);
    const skip = (pageNo - 1) * perPage;
    const totalBlogs = yield Blog_1.default.countDocuments();
    try {
        const blogs = yield Blog_1.default.find()
            .populate("userId", "username")
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(perPage);
        res.status(200).json({ blogs, totalBlogs });
    }
    catch (error) {
        return next(Error("500=something went wrong. try again"));
    }
});
exports.getAllBlogs = getAllBlogs;
const getSingleBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const blog = yield Blog_1.default.findById(id).populate("userId", "username");
        if (!blog) {
            throw Error();
        }
        res.status(200).json({ blog });
    }
    catch (error) {
        return next(Error("404=Blog not found"));
    }
});
exports.getSingleBlog = getSingleBlog;
const updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, title, content, coverImage } = req.body;
    const blogId = req.params.id;
    const filtered = (0, filterBlog_1.filterBlog)({ userId, title, content });
    if (!filtered.validation) {
        return next(Error(filtered.message));
    }
    const update = coverImage
        ? { $set: { title, content, coverImage } }
        : { $set: { title, content } };
    try {
        /*    const newBlog = await Blog.updateOne(
          { _id: blogId },
          {
            $set: {
              title,
              content,
            },
          }
        ); */
        const updatedBlog = yield Blog_1.default.findByIdAndUpdate(blogId, update);
        res.status(200).json({
            message: "blog updated succesfully",
            updatedBlog,
            success: true,
        });
    }
    catch (err) {
        const error = (0, handleMongoErrors_1.default)(err);
        return next(Error(error));
    }
});
exports.updateBlog = updateBlog;
const userBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const pageNo = parseInt(req.body.pageNo);
    console.log(pageNo);
    const skip = (pageNo - 1) * perPage;
    const totalBlogs = yield Blog_1.default.find({ userId }).countDocuments();
    try {
        const blogs = yield Blog_1.default.find({ userId })
            .populate("userId", "username")
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(perPage);
        if (!blogs) {
            throw Error();
        }
        res.status(200).json({ blogs, totalBlogs });
    }
    catch (error) {
        return next(Error("500=something went wrong. try again"));
    }
});
exports.userBlogs = userBlogs;
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    try {
        yield Blog_1.default.findByIdAndDelete(blogId);
        res
            .status(200)
            .json({ message: "blog deleted succesfully", success: true });
    }
    catch (err) {
        const error = (0, handleMongoErrors_1.default)(err);
        return next(Error(error));
    }
});
exports.deleteBlog = deleteBlog;
