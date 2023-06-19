"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        minLength: [5, "must be atleast 5 chars"],
        maxLength: [75, "must be atmost 75 chars"],
        required: true,
        trim: true,
    },
    content: {
        type: String,
        minLength: [5, "must be atleast 5 chars"],
        maxLength: [10000, "maximum characters is 10000 chars"],
        required: true,
    },
    coverImage: String,
}, { timestamps: true });
exports.default = mongoose_1.default.model("Blog", blogSchema);
