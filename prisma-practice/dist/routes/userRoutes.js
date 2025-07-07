"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.route("/sign-up").post(userController_1.signUp);
router.route("/log-in").post(userController_1.logIn);
router.route("/log-out").get(userController_1.logOut);
exports.default = router;
