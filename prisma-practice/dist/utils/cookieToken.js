"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getJwtToken_1 = __importDefault(require("../helpers/getJwtToken"));
const cookieToken = (user, res) => {
    if (user) {
        const token = (0, getJwtToken_1.default)(user.id);
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        user.password = "";
        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user
        });
    }
};
exports.default = cookieToken;
