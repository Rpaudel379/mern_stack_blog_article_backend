"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middlewares/auth");
const errorMiddleware_1 = __importDefault(require("../errorHandlers/errorMiddleware"));
const invalidRouteMiddleware_1 = __importDefault(require("../errorHandlers/invalidRouteMiddleware"));
exports.authRoute = express_1.default.Router();
// authentication routes
exports.authRoute.post("/login", auth_1.handleLogin);
exports.authRoute.post("/register", auth_1.handleRegister);
// isLoggedIn() middleware checks whether user is logged in or not
// they can change username, email or password
// and delete the user account
exports.authRoute
    .route("/editacc")
    .patch(auth_2.isLoggedIn, auth_1.editAccount)
    .delete(auth_2.isLoggedIn, auth_1.handleDeleteAccount);
// to delete the user account
// authRoute.delete("/deleteacc", isLoggedIn, handleDeleteAccount);
exports.authRoute.all("*", invalidRouteMiddleware_1.default);
// every error will be thrown here and err will contain error messages
exports.authRoute.use(errorMiddleware_1.default);
