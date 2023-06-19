"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
// routes
const auth_1 = require("./routes/auth");
const blog_1 = require("./routes/blog");
const app = (0, express_1.default)();
dotenv_1.default.config();
// app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: process.env.frontend, credentials: true }));
app.use((0, cookie_parser_1.default)());
//? TODO disable if not sent request from API
//? TODO disable if not sent request from API
// default route for backend
app.get("/", (req, res) => {
    console.log(req.headers["user-agent"]);
    res.send("this is backend of the app");
});
// route to user related requests like login, register, edit and delete
app.use("/api/auth", (0, multer_1.default)().none(), auth_1.authRoute);
// route to blog related request like getting all blogs, single blogs, user blogs, delete, edit
app.use("/api/blog", blog_1.blogRoute);
const port = process.env.PORT;
mongoose_1.default.connect(process.env.MONGO_URL).then(() => {
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
exports.default = app;
