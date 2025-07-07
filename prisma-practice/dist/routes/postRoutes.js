"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const isLoggedIn_1 = __importDefault(require("../middlewares/isLoggedIn"));
const router = express_1.default.Router();
router.route("/post/create").post(isLoggedIn_1.default, postController_1.createPost);
router.route("/post/update/:id").put(isLoggedIn_1.default, postController_1.updatePost);
router.route("/post/delete/:id").delete(isLoggedIn_1.default, postController_1.deletePost);
router.route("/post/get").get(postController_1.getAllPosts);
exports.default = router;
