import express from "express";
import { signUp, logIn, logOut } from "../controllers/userController";

const router = express.Router();

router.route("/sign-up").post(signUp);
router.route("/log-in").post(logIn);
router.route("/log-out").get(logOut);

export default router;