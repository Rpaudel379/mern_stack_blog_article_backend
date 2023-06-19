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
exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isLoggedIn = (req, res, next) => {
    const token = req.cookies.auth;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                throw new Error("401=invalid token");
            }
            else {
                res.locals.user = decodedToken;
                next();
            }
        }));
    }
    else {
        throw new Error("401=User not logged in");
        // res.status(400).json({ validation: false, message: "User not logged in" });
    }
};
exports.isLoggedIn = isLoggedIn;
