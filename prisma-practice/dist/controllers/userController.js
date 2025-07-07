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
exports.logOut = exports.logIn = exports.signUp = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const cookieToken_1 = __importDefault(require("../utils/cookieToken"));
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = yield req.body;
        if (!name || !email || !password) {
            throw new Error("Please provide all credentials.");
        }
        const user = yield prisma_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            }
        });
        (0, cookieToken_1.default)(user, res);
    }
    catch (error) {
        if (error instanceof Error) {
            next(error);
        }
        else {
            next(new Error("Unknown error occurred."));
        }
    }
});
exports.signUp = signUp;
const logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = yield req.body;
        if (email) {
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    email: email,
                }
            });
            if (user) {
                if (user.password === password) {
                    (0, cookieToken_1.default)(user, res);
                }
                else {
                    throw new Error("Password is incorrect.");
                }
            }
            else {
                throw new Error("User not found in database.");
            }
        }
        else {
            throw new Error("Please provide email and password.");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            next(error);
        }
        else {
            throw new Error("Unknown error occurred.");
        }
    }
});
exports.logIn = logIn;
const logOut = (req, res, next) => {
    try {
        res.clearCookie("token");
        res.json({ success: true });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error);
        }
        else {
            throw new Error("Unknown error occurred.");
        }
    }
};
exports.logOut = logOut;
