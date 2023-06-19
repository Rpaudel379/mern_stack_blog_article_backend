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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        minLength: [3, "must be atleast 3 chars"],
        maxLength: [20, "must be atmost 20 chars"],
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt();
        this.password = yield bcrypt_1.default.hash(this.password, salt);
        next();
    });
});
userSchema.pre("updateOne", function (next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        const password = (_a = update.$set) === null || _a === void 0 ? void 0 : _a.password;
        if (password) {
            const salt = yield bcrypt_1.default.genSalt();
            update.$set.password = yield bcrypt_1.default.hash(password, salt);
        }
        next();
    });
});
userSchema.statics.login = function (username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ username });
        if (user) {
            const auth = yield bcrypt_1.default.compare(password, user.password.toString());
            if (auth) {
                const _a = user.toObject(), { password } = _a, info = __rest(_a, ["password"]);
                return info;
            }
            else {
                throw Error("400=incorrect password");
            }
        }
        else {
            throw Error("400=incorrect username");
        }
    });
};
exports.default = mongoose_1.default.model("User", userSchema);
/*  email: {
      type: String,
      required: true,
      minLength: [3, "must be atleast 3 chars"],
      maxLength: [20, "must be atmost 20 chars"],
      unique: true,
    },
 */
