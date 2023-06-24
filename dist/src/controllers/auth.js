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
exports.handleDeleteAccount = exports.editAccount = exports.handleRegister = exports.handleLogin = void 0;
// import sendEmail from "./sendEmail";
const handleAuthValidation_1 = require("./handleAuthValidation");
const User_1 = __importDefault(require("../models/User"));
const handleMongoErrors_1 = __importDefault(require("../../src/controllers/handleMongoErrors"));
const createToken_1 = __importDefault(require("./createToken"));
const handleMongoErrors_2 = __importDefault(require("../../src/controllers/handleMongoErrors"));
const Blog_1 = __importDefault(require("../models/Blog"));
//? ==============================================================================================
//? ==============================================================================================
// POST login
const handleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // filters each fields
    const filtered = (0, handleAuthValidation_1.filterAPILogin)({ username, password });
    if (!filtered.validation) {
        return next(Error(filtered.message));
    }
    try {
        const user = yield User_1.default.login(username, password);
        const token = (0, createToken_1.default)(user._id);
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
    }
    catch (error) {
        return next(error);
    }
});
exports.handleLogin = handleLogin;
//? ==============================================================================================
//? ==============================================================================================
// register
const handleRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // filters each fields
    // checks wheather the email is valid or not
    // checks if the password contains atleast one Uppercase and a digit
    const filtered = (0, handleAuthValidation_1.filterAPIRegister)({
        username,
        password,
    });
    if (!filtered.validation) {
        // Error thrown here will get catched by error handling middleware at routes directory
        return next(Error(filtered.message));
    }
    try {
        const user = yield User_1.default.create({ username, password });
        console.log(user, "dai");
        // uses nodemailer to send account details
        // sendEmail({ username, email, password }, { message: "" });
        res.status(201).send({ message: "registered successfully", success: true });
    }
    catch (err) {
        const error = (0, handleMongoErrors_1.default)(err);
        return next(Error(error));
    }
});
exports.handleRegister = handleRegister;
//? ==============================================================================================
//? ==============================================================================================
// edit account
const editAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, userId } = req.body;
    // sendEmail({ username, email }, { message: "" });
    // filters each fields
    // checks wheather the email is valid or not
    // checks if the password contains atleast one Uppercase and a digit
    const filtered = (0, handleAuthValidation_1.filterAPIUpdate)({
        username,
        password,
    });
    if (!filtered.validation) {
        // Error thrown here will get catched by error handling middleware at routes directory
        return next(Error(filtered.message));
    }
    const update = {};
    if (username) {
        update.username = username;
    }
    if (password) {
        update.password = password;
    }
    try {
        yield User_1.default.updateOne({ _id: userId }, {
            $set: update,
        }, { runValidators: true });
        res.status(200).send({ message: "updated", success: true });
    }
    catch (err) {
        const error = (0, handleMongoErrors_1.default)(err);
        return next(Error(error));
    }
    // res.status(200).send({ message: "regi", cred: req.body });
});
exports.editAccount = editAccount;
//? ==============================================================================================
//? ==============================================================================================
// delete account
const handleDeleteAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        yield User_1.default.findByIdAndDelete(userId);
        yield Blog_1.default.deleteMany({ userId });
        res.status(200).json({ message: "deleted", success: true });
    }
    catch (err) {
        const error = (0, handleMongoErrors_2.default)(err);
        return next(Error(error));
    }
});
exports.handleDeleteAccount = handleDeleteAccount;
