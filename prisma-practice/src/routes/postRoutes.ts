import express from "express";
import { createPost, updatePost, deletePost, getAllPosts } from "../controllers/postController";
import isLoggedIn from "../middlewares/isLoggedIn";

const router = express.Router();

router.route("/post/create").post(isLoggedIn, createPost);
router.route("/post/update/:id").put(isLoggedIn, updatePost);
router.route("/post/delete/:id").delete(isLoggedIn, deletePost);
router.route("/post/get").get(getAllPosts);

export default router;