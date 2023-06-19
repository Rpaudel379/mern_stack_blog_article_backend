"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, req, res, next) => {
    console.log("~~~~~~~~", err);
    // splits into two values seperated by = /// 404=error message
    const [code, message] = err.message.split("=");
    res.status(parseInt(code)).json({ message });
};
