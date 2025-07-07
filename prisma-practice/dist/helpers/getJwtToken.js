"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getJwtToken = (userId) => {
    const user = { userId: userId };
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in .env file!");
    }
    return jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, { expiresIn: "1 day" });
};
exports.default = getJwtToken;
